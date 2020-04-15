import * as Lint from 'tslint';
import * as tsutils from 'tsutils';
import * as ts from 'typescript';

const TYPE_ACCEPT_MEMBER_PREFIX = 'ngAcceptInputType_';

type TypeCheckerWithRelationApi = ts.TypeChecker & {
  getNullType(): ts.Type;
  getUndefinedType(): ts.Type;
  isTypeAssignableTo(a: ts.Type, b: ts.Type): boolean;
};

export class Rule extends Lint.Rules.TypedRule {
  applyWithProgram(sourceFile: ts.SourceFile, program: ts.Program): Lint.RuleFailure[] {
    const walker = new Walker(sourceFile, this.getOptions(), program.getTypeChecker() as TypeCheckerWithRelationApi);
    return this.applyWithWalker(walker);
  }
}

class Walker extends Lint.RuleWalker {
  constructor(sourceFile: ts.SourceFile, options: Lint.IOptions, private typeChecker: TypeCheckerWithRelationApi) {
    super(sourceFile, options);
  }

  visitPropertyDeclaration(node: ts.PropertyDeclaration): void {
    if (ts.isIdentifier(node.name) && node.name.text.startsWith(TYPE_ACCEPT_MEMBER_PREFIX)) {
      this.lintCoercionMember(node);
    }
    super.visitPropertyDeclaration(node);
  }

  visitClassDeclaration(node: ts.ClassDeclaration): void {
    if (this.shouldLintClass(node)) {
      this.lintClass(node, node, true);
      this.lintSuperClasses(node);
    }
    super.visitClassDeclaration(node);
  }

  private lintClass(node: ts.ClassDeclaration, sourceClass: ts.ClassDeclaration, expectDeclaredMembers: boolean): void {
    node.members.forEach(member => {
      if (ts.isPropertyDeclaration(member) && usesCoercionDecorators(member)) {
        this.checkStaticMember(sourceClass, member.name.getText(), expectDeclaredMembers);
      }
      if (ts.isSetAccessor(member) && usesCoercion(member) && this.shouldCheckSetter(member)) {
        this.checkStaticMember(sourceClass, member.name.getText(), expectDeclaredMembers);
      }
    });
  }

  private checkStaticMember(node: ts.ClassDeclaration, setterName: string, expectDeclaredMembers: boolean): void {
    const { memberName, memberNode } = this.lookupStaticMember(node, setterName);
    if (expectDeclaredMembers && !memberNode) {
      this.addFailureAtNode(node.name || node, `Class must declare static coercion ` + `property called ${memberName}.`);
    } else if (!expectDeclaredMembers && memberNode) {
      this.addFailureAtNode(
        node.name || node,
        `Class should not declare static coercion ` + `property called ${memberName}. Acceptance members are inherited.`,
        Lint.Replacement.deleteText(memberNode.getFullStart(), memberNode.getFullWidth())
      );
    }
  }

  private lookupStaticMember(node: ts.ClassDeclaration, propName: string): { memberName: string; memberNode?: ts.PropertyDeclaration } {
    const coercionPropertyName = `${TYPE_ACCEPT_MEMBER_PREFIX}${propName}`;
    const correspondingCoercionProperty = node.members.find((member): member is ts.PropertyDeclaration => {
      return (
        ts.isPropertyDeclaration(member) &&
        tsutils.hasModifier(member.modifiers, ts.SyntaxKind.StaticKeyword) &&
        member.name.getText() === coercionPropertyName
      );
    });
    return { memberName: coercionPropertyName, memberNode: correspondingCoercionProperty };
  }

  private lintSuperClasses(node: ts.ClassDeclaration): void {
    let currentClass: ts.ClassDeclaration | null = node;

    while (currentClass) {
      const baseType = getBaseTypeIdentifier(currentClass);

      if (!baseType) {
        break;
      }

      const symbol = this.typeChecker.getTypeAtLocation(baseType).getSymbol();
      currentClass = symbol && ts.isClassDeclaration(symbol.valueDeclaration) ? symbol.valueDeclaration : null;

      if (currentClass) {
        // Acceptance members should not be re-declared in the derived class. This
        // is because acceptance members are inherited.
        this.lintClass(currentClass, node, false);
      }
    }
  }

  private shouldCheckSetter(node: ts.SetAccessorDeclaration): boolean {
    const param = node.parameters[0];
    const types = this.typeChecker
      .typeToString(this.typeChecker.getTypeAtLocation(param))
      .split('|')
      .map(name => name.trim());
    // We shouldn't check setters which accept `any` or a `string`.
    return types.every(typeName => typeName !== 'any' && typeName !== 'string');
  }

  private lintCoercionMember(node: ts.PropertyDeclaration): void {
    if (!node.type) {
      this.addFailureAtNode(node, 'Acceptance member needs to have an explicit type.');
      return;
    }

    if (node.type.kind === ts.SyntaxKind.AnyKeyword) {
      // if the type is "any", then it can be "null" and "undefined" too.
      return;
    } else if (
      ts.isTypeReferenceNode(node.type) &&
      ts.isIdentifier(node.type.typeName) &&
      (node.type.typeName.text === 'BooleanInput' || node.type.typeName.text === 'NumberInput')
    ) {
      return;
    } else if (!ts.isUnionTypeNode(node.type)) {
      this.addFailureAtNode(
        node,
        'Acceptance member does not have an union type. The member ' + 'should use an union type to also accept "null" and "undefined".'
      );
      return;
    }

    let hasNull = false;
    let hasUndefined = false;
    for (const type of node.type.types) {
      if (type.kind === ts.SyntaxKind.NullKeyword) {
        hasNull = true;
      } else if (type.kind === ts.SyntaxKind.UndefinedKeyword) {
        hasUndefined = true;
      }
    }

    if (!hasNull && !hasUndefined) {
      this.addFailureAtNode(
        node,
        'Acceptance member has to accept "null" and "undefined".',
        this.appendText(node.type.getEnd(), ' | null | undefined')
      );
    } else if (!hasNull) {
      this.addFailureAtNode(node, 'Acceptance member has to accept "null".', this.appendText(node.type.getEnd(), ' | null'));
    } else if (!hasUndefined) {
      this.addFailureAtNode(node, 'Acceptance member has to accept "undefined".', this.appendText(node.type.getEnd(), ' | undefined'));
    }
  }

  private shouldLintClass(node: ts.ClassDeclaration): boolean {
    // We don't need to lint undecorated classes.
    if (!node.decorators) {
      return false;
    }

    if (!node.name || !node.name.text.startsWith('Nz')) {
      return false;
    }

    // If the class is a component,  we should lint it.
    if (node.decorators.some(decorator => isDecoratorCalled(decorator, 'Component'))) {
      return true;
    }
    // If the class is a directive, we should lint it.
    return node.decorators.some(decorator => isDecoratorCalled(decorator, 'Directive'));
  }
}

function usesCoercion(setter: ts.SetAccessorDeclaration): boolean {
  let coercionWasUsed = false;
  const coercionFunctions = new Set(['toBoolean', 'toNumber', 'toCssPixel']);
  setter.forEachChild(function walk(node: ts.Node): void {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && coercionFunctions.has(node.expression.text)) {
      coercionWasUsed = true;
    }

    // Don't check callback functions since coercion used
    // inside them most-likely won't need to be declared.
    if (!coercionWasUsed && !ts.isArrowFunction(node) && !ts.isFunctionExpression(node)) {
      node.forEachChild(walk);
    }
  });
  return coercionWasUsed;
}

function usesCoercionDecorators(node: ts.Node): boolean {
  if (!node.decorators) {
    return false;
  } else {
    return node.decorators.some(n => {
      return ['@InputBoolean()', '@InputCssPixel()', '@InputNumber()'].indexOf(n.getText()) !== -1;
    });
  }
}

function getBaseTypeIdentifier(node: ts.ClassDeclaration): ts.Identifier | null {
  if (node.heritageClauses) {
    for (const clause of node.heritageClauses) {
      if (clause.token === ts.SyntaxKind.ExtendsKeyword && clause.types.length && ts.isIdentifier(clause.types[0].expression)) {
        return clause.types[0].expression;
      }
    }
  }

  return null;
}

function isDecoratorCalled(node: ts.Decorator, name: string): boolean {
  return ts.isCallExpression(node.expression) && ts.isIdentifier(node.expression.expression) && node.expression.expression.text === name;
}
