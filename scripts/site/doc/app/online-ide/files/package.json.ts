/**
 * Generate package.json content
 * @param nzVersion version of ng-zorro-antd
 * @param ngVersion version of Angular
 */
export default (nzVersion: string, ngVersion: string) => {
  return {
    name: 'ng-zorro-demo',
    private: true,
    scripts: {
      ng: 'ng',
      start: 'ng serve',
      build: 'ng build'
    },
    dependencies: {
      '@angular/core': ngVersion,
      '@angular/forms': ngVersion,
      '@angular/common': ngVersion,
      '@angular/router': ngVersion,
      '@angular/compiler': ngVersion,
      '@angular/platform-browser': ngVersion,
      '@angular/cdk': ngVersion,
      '@angular/platform-browser-dynamic': ngVersion,
      '@ant-design/icons-angular': ngVersion,
      'date-fns': '^2.16.1',
      rxjs: '~7.8.1',
      tslib: '^2.0.0',
      'ng-zorro-antd': nzVersion,
      // demo needs
      d3: '^6.3.1',
      dagre: '^0.8.5',
      'dagre-compound': '^0.0.8',
      'cron-parser': '^4.6.0',
      'monaco-editor': '^0.33.0'
    },
    devDependencies: {
      '@angular/build': ngVersion,
      '@angular/cli': ngVersion,
      '@angular/compiler-cli': ngVersion,
      typescript: '~5.9.2'
    }
  };
};
