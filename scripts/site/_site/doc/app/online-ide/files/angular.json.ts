export default {
  $schema: './node_modules/@angular/cli/lib/config/schema.json',
  version: 1,
  newProjectRoot: 'projects',
  projects: {
    demo: {
      root: '',
      sourceRoot: 'src',
      projectType: 'application',
      prefix: 'app',
      architect: {
        build: {
          builder: '@angular-devkit/build-angular:browser',
          options: {
            outputPath: 'dist/demo',
            index: 'src/index.html',
            main: 'src/main.ts',
            polyfills: 'zone.js',
            tsConfig: 'tsconfig.app.json',
            assets: [
              'src/favicon.ico',
              'src/assets',
              {
                glob: '**/*',
                input: 'node_modules/monaco-editor/min/vs',
                output: 'assets/vs'
              }
            ],
            styles: [
              'node_modules/ng-zorro-antd/src/ng-zorro-antd.min.css',
              'node_modules/ng-zorro-antd/resizable/style/index.min.css',
              'node_modules/ng-zorro-antd/code-editor/style/index.min.css',
              'node_modules/ng-zorro-antd/graph/style/index.min.css',
              'src/styles.css'
            ]
          },
          configurations: {
            production: {
              budgets: [
                {
                  type: 'initial',
                  maximumWarning: '500kB',
                  maximumError: '1MB'
                },
                {
                  type: 'anyComponentStyle',
                  maximumWarning: '2kB',
                  maximumError: '4kB'
                }
              ],
              outputHashing: 'all'
            },
            development: {
              optimization: false,
              extractLicenses: false,
              sourceMap: true
            }
          },
          defaultConfiguration: 'production'
        },
        serve: {
          builder: '@angular-devkit/build-angular:dev-server',
          configurations: {
            production: {
              buildTarget: 'demo:build:production'
            },
            development: {
              buildTarget: 'demo:build:development'
            }
          },
          defaultConfiguration: 'development'
        }
      }
    }
  }
};
