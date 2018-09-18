import { chain, noop, Rule, SchematicsException, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import * as ts from 'typescript';
import { addModuleImportToRootModule, getSourceFile } from '../utils/ast';
import { createCustomTheme } from '../utils/custom-theme';
import {
  addSymbolToNgModuleMetadata,
  findNodes,
  getDecoratorMetadata,
  insertAfterLastOccurrence
} from '../utils/devkit-utils/ast-utils';
import { Change, InsertChange, ReplaceChange } from '../utils/devkit-utils/change';
import { getProjectFromWorkspace, getWorkspace, Project, Workspace } from '../utils/devkit-utils/config';
import { getAppModulePath } from '../utils/devkit-utils/ng-ast-utils';
import { insertImport } from '../utils/devkit-utils/route-utils';
import { zorroVersion } from '../utils/lib-versions';
import { addPackageToPackageJson } from '../utils/package';
import { getProjectTargetOptions } from '../utils/project-targets';
import { Schema } from './schema';

const ADD_CONFIG = {
  LESS_VERSION: '^2.7.3',
  CUSTOM_THEME_PATH: 'src/theme.less',
  COMPILED_THEME_PATH: 'node_modules/ng-zorro-antd/ng-zorro-antd.min.css',
  BOOT_PAGE_PATH: 'src/app/app.component.html',
  BOOT_PAGE_HTML: `<!-- NG-ZORRO -->
<a href="https://github.com/NG-ZORRO/ng-zorro-antd" target="_blank" style="display: flex;align-items: center;justify-content: center;height: 100%;width: 100%;">
  <img height="300" src="https://img.alicdn.com/tfs/TB1NvvIwTtYBeNjy1XdXXXXyVXa-89-131.svg">
</a>`
};

export default function (options: Schema): Rule {
  return chain([
    options && options.skipPackageJson ? noop() : addZorroToPackageJson(),
    options && options.theme ? downgradeLess() : noop(),
    setBootstrapPage(),
    addThemeToAppStyles(options),
    addModulesToAppModule(options),
    addI18n(options),
    (options && !options.skipPackageJson) || (options && !options.theme) ? installNodeDeps() : noop()
  ]);
}

/** 添加 i18n 配置, 取决于 options.i18n */
function addI18n(options: Schema): (host: Tree) => Tree {
  return function (host: Tree): Tree {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    const modulePath = getAppModulePath(host, getProjectTargetOptions(project, 'build').main);
    const moduleSource = getSourceFile(host, modulePath);
    const locale = options.i18n;
    const localePrefix = locale.split('_')[0];

    if (!moduleSource) {
      throw new SchematicsException(`Module not found: ${modulePath}`);
    }

    if (!locale) {
      throw new SchematicsException(`Invalid locale-symbol`);
    }

    const changes = [
      insertImport(moduleSource, modulePath, 'NZ_I18N', 'ng-zorro-antd'),
      insertImport(moduleSource, modulePath, locale, 'ng-zorro-antd'),
      insertImport(moduleSource, modulePath, 'registerLocaleData', '@angular/common'),
      insertImport(moduleSource, modulePath, localePrefix, `@angular/common/locales/${localePrefix}`, true),
      registerLocaleData(moduleSource, modulePath, localePrefix),
      ...insertI18nTokenProvide(moduleSource, modulePath, locale)
    ];

    const recorder = host.beginUpdate(modulePath);
    changes.forEach((change) => {
      if (change instanceof InsertChange) {
        recorder.insertLeft(change.pos, change.toAdd);
      }

      if (change instanceof ReplaceChange) {
        recorder.remove(change.pos, change.oldText.length);
        recorder.insertLeft(change.pos, change.newText);
      }

    });

    host.commitUpdate(recorder);
    return host;
  };
}

function insertI18nTokenProvide(moduleSource: ts.SourceFile, modulePath: string, locale: string): Change[] {
  const metadataField = 'providers';
  const nodes = getDecoratorMetadata(moduleSource, 'NgModule', '@angular/core');
  const addProvide = addSymbolToNgModuleMetadata(moduleSource, modulePath, 'providers', `{ provide: NZ_I18N, useValue: ${locale} }`, null);
  let node: any = nodes[0];  // tslint:disable-line:no-any

  if (!node) {
    return [];
  }

  const matchingProperties: ts.ObjectLiteralElement[] =
          (node as ts.ObjectLiteralExpression).properties
          .filter(prop => prop.kind === ts.SyntaxKind.PropertyAssignment)
          .filter((prop: ts.PropertyAssignment) => {
            const name = prop.name;
            switch (name.kind) {
              case ts.SyntaxKind.Identifier:
                return (name as ts.Identifier).getText(moduleSource) === metadataField;
              case ts.SyntaxKind.StringLiteral:
                return (name as ts.StringLiteral).text === metadataField;
            }

            return false;
          });

  if (!matchingProperties) {
    return [];
  }

  if (matchingProperties.length) {
    const assignment = matchingProperties[0] as ts.PropertyAssignment;
    if (assignment.initializer.kind !== ts.SyntaxKind.ArrayLiteralExpression) {
      return [];
    }
    const arrLiteral = assignment.initializer as ts.ArrayLiteralExpression;
    if (arrLiteral.elements.length === 0) {
      return addProvide;
    } else {
      node = arrLiteral.elements.filter(e => e.getText && e.getText().includes('NZ_I18N'));
      if (node.length === 0) {
        return addProvide;
      }
      return node.map(e => new ReplaceChange(modulePath, e.getStart(), e.getText(), `{ provide: NZ_I18N, useValue: ${locale} }`));
    }
  } else {
    return addProvide;
  }

}

/** 注册 ng 国际化 */
function registerLocaleData(moduleSource: ts.SourceFile, modulePath: string, locale: string): Change {
  const allImports = findNodes(moduleSource, ts.SyntaxKind.ImportDeclaration);
  const allFun = findNodes(moduleSource, ts.SyntaxKind.ExpressionStatement);
  const registerLocaleDataFun = allFun.filter(node => {
    const fun = node.getChildren();
    return fun[0].getChildren()[0] && fun[0].getChildren()[0].getText() === 'registerLocaleData';
  });
  return  registerLocaleDataFun.length === 0
    ? insertAfterLastOccurrence(allImports, `\n\nregisterLocaleData(${locale});`, modulePath, 0)
    : new ReplaceChange(modulePath, registerLocaleDataFun[0].getStart(), registerLocaleDataFun[0].getText(), `registerLocaleData(${locale});`);
}

/** 降级 less */
function downgradeLess(): (host: Tree) => Tree {
  return (host: Tree) => {
    addPackageToPackageJson(host, 'dependencies', 'less', ADD_CONFIG.LESS_VERSION);
    return host;
  };
}

/** 添加 ng-zorro-antd 到 package.json 的 dependencies */
function addZorroToPackageJson(): (host: Tree) => Tree {
  return (host: Tree) => {
    addPackageToPackageJson(host, 'dependencies', 'ng-zorro-antd', zorroVersion);
    return host;
  };
}

/** 添加 BrowserAnimationsModule FormsModule HttpClientModule NgZorroAntdModule 到 app.module */
function addModulesToAppModule(options: Schema): (host: Tree) => Tree {
  return (host: Tree) => {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);

    addModuleImportToRootModule(host, 'BrowserAnimationsModule', '@angular/platform-browser/animations', project);
    addModuleImportToRootModule(host, 'FormsModule', '@angular/forms', project);
    addModuleImportToRootModule(host, 'HttpClientModule', '@angular/common/http', project);
    addModuleImportToRootModule(host, 'NgZorroAntdModule', 'ng-zorro-antd', project);

    return host;
  };
}

/** 添加样式配置 */
export function addThemeToAppStyles(options: Schema): (host: Tree) => Tree {
  return function (host: Tree): Tree {
    const workspace = getWorkspace(host);
    const project = getProjectFromWorkspace(workspace, options.project);
    if (options.theme) {
      insertCustomTheme(project, host, workspace);
    } else {
      insertCompiledTheme(project, host, workspace);
    }
    return host;
  };
}

/** 将预设样式写入 theme.less，并添加到 angular.json */
function insertCustomTheme(project: Project, host: Tree, workspace: Workspace): void {
  const themePath = ADD_CONFIG.CUSTOM_THEME_PATH;
  const customTheme = createCustomTheme();
  if (host.exists(themePath)) {
    const beforeContent = host.read(themePath).toString('utf8');
    if (beforeContent.indexOf(customTheme) === -1) {
      host.overwrite(themePath, `${customTheme}\n${beforeContent}`);
    }
  } else {
    host.create(themePath, createCustomTheme());
  }

  if ((project as any).targets || project.architect) {
    addStyleToTarget('build', host, workspace, project, themePath, ADD_CONFIG.COMPILED_THEME_PATH);
    addStyleToTarget('test', host, workspace, project, themePath, ADD_CONFIG.COMPILED_THEME_PATH);
  } else {
    throw new SchematicsException(`${project.name} does not have an architect or targets configuration`);
  }
}

/** 设置引导页面到 app.component.ts */
function setBootstrapPage(): (host: Tree) => Tree {
  return (host: Tree) => {
    host.overwrite(ADD_CONFIG.BOOT_PAGE_PATH, ADD_CONFIG.BOOT_PAGE_HTML);
    return host;
  };

}

/** 安装依赖 */
function installNodeDeps(): (host: Tree, context: SchematicContext) => void {
  return (host: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
  };
}

/** 将编译的 css 添加到 angular.json */
function insertCompiledTheme(project: Project, host: Tree, workspace: Workspace): void {
  const themePath = ADD_CONFIG.COMPILED_THEME_PATH;

  if ((project as any).targets || project.architect) {
    addStyleToTarget('build', host, workspace, project, themePath);
    addStyleToTarget('test', host, workspace, project, themePath);
  } else {
    throw new SchematicsException(`${project.name} does not have an architect or targets configuration`);
  }
}

/** Adds a style entry to the given target. */
function addStyleToTarget(targetName: string, host: Tree, workspace: Workspace, project: Project, asset: string, exclude: string = ''): void {
  const styleEntry = asset;
  const targetOptions = getProjectTargetOptions(project, targetName);
  // We can't assume that any of these properties are defined, so safely add them as we go
  // if necessary.
  if (!targetOptions.styles) {
    targetOptions.styles = [ styleEntry ];
  } else {
    const existingStyles = targetOptions.styles.map(s => typeof s === 'string' ? s : s.input);
    const hasGivenTheme = existingStyles.find(s => s.includes(asset));

    if (exclude) {
      const removeIndex = targetOptions.styles.indexOf(exclude);
      if (removeIndex >= 0) {
        targetOptions.styles.splice(removeIndex, 1);
      }
    }

    if (!hasGivenTheme) {
      targetOptions.styles.splice(0, 0, styleEntry);
    }
  }

  host.overwrite('angular.json', JSON.stringify(workspace, null, 2));
}
