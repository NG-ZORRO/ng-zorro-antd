# @ng-zorro/schematics

Optional demo component generators for `ng-zorro-antd`. Install this development dependency only when you want to generate the examples shown on the NG-ZORRO website.

Install the beta release:

```bash
npm install --save-dev @ng-zorro/schematics@beta
ng generate @ng-zorro/schematics:form-normal-login login
```

The initial `22.0.0-beta.0` release uses examples from `ng-zorro-antd 22.1.0` and requires `ng-zorro-antd ^22.1.0`. The generator package has its own prerelease version; use its peer dependencies to check library compatibility. Run the generation command inside an Angular CLI workspace. Use `--project` to select a project in a workspace with multiple projects.

Example names and options are retained, including `--inline-template`, `--inline-style`, `--style`, `--flat`, and `--skip-tests`. Demo components are standalone. Generated tests import the component into TestBed.

Examples use the same code as the website. Configure any providers needed by your chosen example in the application and its tests, such as icon registration, routing or HTTP services. The generator does not configure these application-specific dependencies.

## Migration

Replace the collection prefix in existing demo commands:

```diff
-ng generate ng-zorro-antd:form-normal-login login
+ng generate @ng-zorro/schematics:form-normal-login login
```

Also update demo-specific defaults in `angular.json` from `ng-zorro-antd:<demo>` to `@ng-zorro/schematics:<demo>`. If the optional package was added to `cli.schematicCollections`, remove that entry when uninstalling it.

`ng add ng-zorro-antd`, `ng update ng-zorro-antd`, and the main package's `component`, `sidemenu`, `topnav`, and `add-icon-assets` generators remain in `ng-zorro-antd`. The main package neither depends on nor forwards to this package.

To remove the demo generators from your dependencies and your IDE's schematic collection list:

```bash
npm uninstall --save-dev @ng-zorro/schematics
```

Generated application files remain in your project.

## Development

From the repository root:

```bash
npm run build:schematics-demo
npm run test:schematics
npm pack ./dist/antd-schematics --pack-destination ./dist
```

The publishable package is built in `dist/antd-schematics`, separately from the main package in `publish`. Its version and default npm tag are defined in `schematics-demo/package.json`; the source manifest is deliberately private. Library compatibility is derived from `components/package.json`. The generators use the same source demos as the website, and a build-time copy of the component helper. There is no runtime import of private files from `ng-zorro-antd`.

Azure CI includes this directory as `antd-schematics/` in `build.tgz`. The Azure release definition must publish that directory as a separate public npm package, using the version and distribution tag declared by this package. The release definition is managed outside this repository; adding a build artifact does not configure its publication. The initial standalone beta can be published from a validated tarball with `npm publish <tarball> --access public --tag beta --registry=https://registry.npmjs.org/` when authorized by a maintainer.
