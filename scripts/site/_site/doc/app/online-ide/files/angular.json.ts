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
            polyfills: 'src/polyfills.ts',
            tsConfig: 'src/tsconfig.app.json',
            assets: ['src/favicon.ico', 'src/assets'],
            styles: [
              'node_modules/ng-zorro-antd/src/ng-zorro-antd.min.css',
              'node_modules/ng-zorro-antd/resizable/style/index.min.css',
              'src/styles.css'
            ]
          }
        }
      }
    }
  },
  defaultProject: 'demo'
};
