/** Name of the Material version that is shipped together with the schematics. */
export const cdkVersion = loadPackageVersionGracefully('@angular/cdk');

export const zorroVersion = loadPackageVersionGracefully('ng-zorro-antd');

/**
 * Range of Angular versions that can be used together with the Angular Material version
 * that provides these schematics.
 */
export const requiredAngularVersionRange = '0.0.0-NG';

/** HammerJS version that should be installed if gestures will be set up. */
export const hammerjsVersion = '^2.0.8';

/** Loads the full version from the given Angular package gracefully. */
function loadPackageVersionGracefully(packageName: string): string | null {
  try {
    return require(`${packageName}/package.json`).version;
  } catch {
    return null;
  }
}