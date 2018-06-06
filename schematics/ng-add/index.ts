import { chain, noop, Rule, SchematicsException, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import * as ts from 'typescript';
import { addModuleImportToRootModule, getSourceFile } from '../utils/ast';
import { createCustomTheme } from '../utils/custom-theme';
import { addSymbolToNgModuleMetadata, findNodes, insertAfterLastOccurrence } from '../utils/devkit-utils/ast-utils';
import { InsertChange } from '../utils/devkit-utils/change';
import { getProjectFromWorkspace, getWorkspace, Project, Workspace } from '../utils/devkit-utils/config';
import { getAppModulePath } from '../utils/devkit-utils/ng-ast-utils';
import { insertImport } from '../utils/devkit-utils/route-utils';
import { zorroVersion } from '../utils/lib-versions';
import { addPackageToPackageJson } from '../utils/package';
import { Schema } from './schema';

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
    const modulePath = getAppModulePath(host, project.architect.build.options.main);
    const moduleSource = getSourceFile(host, modulePath);
    const locale = options.i18n;
    const localePrefix = locale.split('_')[0];

    if (!moduleSource) {
      throw new SchematicsException(`Module not found: ${modulePath}`);
    }

    if (!locale) {
      throw new SchematicsException(`Invalid locale-symbol`);
    }

    const allImports = findNodes(moduleSource, ts.SyntaxKind.ImportDeclaration);

    const changes = [
      insertImport(moduleSource, modulePath, 'NZ_I18N', 'ng-zorro-antd'),
      insertImport(moduleSource, modulePath, locale, 'ng-zorro-antd'),
      insertImport(moduleSource, modulePath, 'registerLocaleData', '@angular/common'),
      insertImport(moduleSource, modulePath, localePrefix, `@angular/common/locales/${localePrefix}`, true),
      ...addSymbolToNgModuleMetadata(moduleSource, modulePath, 'providers', `{ provide: NZ_I18N, useValue: ${locale} }`, null),
      insertAfterLastOccurrence(allImports, `\n\nregisterLocaleData(${localePrefix});`, modulePath, 0)
    ];

    const recorder = host.beginUpdate(modulePath);
    changes.forEach((change) => {
      if (change instanceof InsertChange) {
        recorder.insertLeft(change.pos, change.toAdd);
      }
    });

    host.commitUpdate(recorder);
    return host;
  };
}

/** 降级 less */
function downgradeLess(): (host: Tree) => Tree {
  return (host: Tree) => {
    addPackageToPackageJson(host, 'dependencies', 'less', '^2.7.3');
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
    addModuleImportToRootModule(host, 'NgZorroAntdModule.forRoot()', 'ng-zorro-antd', project);

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
  const themePath = 'src/theme.less';
  host.create(themePath, createCustomTheme());
  if (project.architect) {
    addStyleToTarget(project.architect.build, host, themePath, workspace);
    addStyleToTarget(project.architect.test, host, themePath, workspace);
  } else {
    throw new SchematicsException(`${project.name} does not have an architect configuration`);
  }
}

/** 设置引导页面到 app.component.ts */
function setBootstrapPage(): (host: Tree) => Tree {
  return (host: Tree) => {
    host.overwrite('src/app/app.component.html', `<a href="https://github.com/NG-ZORRO/ng-zorro-antd" target="_blank" style="display: flex;align-items: center;justify-content: center;height: 100%;width: 100%;">
  <img height="400" src="https://img.alicdn.com/tfs/TB1MGSRv21TBuNjy0FjXXajyXXa-89-131.svg">
</a>
`);
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
  const themePath = `node_modules/ng-zorro-antd/src/ng-zorro-antd.min.css`;

  if (project.architect) {
    addStyleToTarget(project.architect.build, host, themePath, workspace);
    addStyleToTarget(project.architect.test, host, themePath, workspace);
  } else {
    throw new SchematicsException(`${project.name} does not have an architect configuration`);
  }
}

/** Adds a style entry to the given target. */
function addStyleToTarget(target: any, host: Tree, asset: string, workspace: Workspace): void {
  const styleEntry = asset;

  // We can't assume that any of these properties are defined, so safely add them as we go
  // if necessary.
  if (!target.options) {
    target.options = { styles: [ styleEntry ] };
  } else if (!target.options.styles) {
    target.options.styles = [ styleEntry ];
  } else {
    const existingStyles = target.options.styles.map(s => typeof s === 'string' ? s : s.input);
    const hasGivenTheme = existingStyles.find(s => s.includes(asset));

    if (!hasGivenTheme) {
      target.options.styles.splice(0, 0, styleEntry);
    }
  }

  host.overwrite('angular.json', JSON.stringify(workspace, null, 2));
}
