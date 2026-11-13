# Optional schematics across the NG-ZORRO ecosystem

## Package boundaries

| Owning repository | Runtime package | Optional example generators       | Version source               |
| ----------------- | --------------- | --------------------------------- | ---------------------------- |
| ng-zorro-antd     | ng-zorro-antd   | @ng-zorro/schematics              | schematics-demo/package.json |
| ng-zorro-x        | ng-zorro-x      | @ng-zorro/x-schematics (proposed) | X components/package.json    |

Use the existing `@ng-zorro/schematics` package for the antd example collection. Keep the proposed X collection in `@ng-zorro/x-schematics`; do not turn the antd package into an umbrella package that installs both collections. Installing a UI library must not download optional generators. Installing one example package must not download the other library's example package.

Keep `ng-add` and upgrade migrations with the runtime package: automatic installation and upgrades must work without optional tooling. Keep existing lightweight application-layout generators in their current collection. Example generation is an explicitly installed development tool.

Each example collection owns its names: `@ng-zorro/schematics:form-normal-login`, and potentially `@ng-zorro/x-schematics:bubble-basic`. Names such as `bubble-basic` do not require an ecosystem-wide prefix or registry. Explicit collection names remain unambiguous when both packages are installed.

## Versions and dependencies

Publish each example package from the same source revision as its owning component library, with its own package version and an explicit peer dependency on the supported library. The initial `@ng-zorro/schematics@22.0.0-beta.0` release uses antd 22.1.0 examples and therefore declares `ng-zorro-antd ^22.1.0`. Declare the corresponding library as a peer and the Angular DevKit, Angular schematics, CDK, and TypeScript used by the generator as actual tool dependencies. Do not infer Angular's version from the library's major number: the inspected X repository is `0.5.0-beta.0` on Angular 21, while antd is `22.1.0` on Angular 22.

The two repositories release independently. A user combining X with antd must choose mutually compatible library versions first; adding an example package must not introduce a second library version or silently upgrade Angular. X's future example package should inherit the Angular and antd compatibility constraints from its own library manifest.

Do not add either optional example package to the runtime package's dependencies, optionalDependencies, or ng-update.packageGroup: doing so would undermine explicit installation or couple independent release trains. Document compatible-version installation and upgrades instead.

## Implementation and reuse

The antd example package is generated in a separate build target and output directory. Its collection contains only demo entries. The component helper is shared as source during the build and shipped inside the example package, so it does not rely on unexported paths in the runtime package.

For X, adopt the same package layout and build contract in its own repository, reading its own demo sources and package metadata. No sibling-directory dependency should appear in published files or CI; either repository must build from a standalone checkout. X currently has no schematic implementation despite advertising schematic paths in its manifest. Those fields should only be wired to real files when X implements its installation/migration tooling.

Keep the generator build scripts local until X has an implementation and both libraries have demonstrated stable common needs. At that point, extract a small shared build utility accepting demo source directory, output directory, collection name, and library metadata. It must contain no example catalog and must not depend on either runtime library. Avoid publishing a shared abstraction before there is a second consumer.

## Compatibility and rollout

Moving the old `ng-zorro-antd:<demo>` commands is a breaking CLI change. Ship the removal in a major release, with bilingual migration instructions and website commands pointing to the optional package. Do not retain hundreds of forwarding entries in the main collection; IDEs would continue discovering them.

Build and test both artifacts in CI. The main package must have no `schematics/demo` directory, demo registrations, or dependency on the optional package. Validate the independently packed example package through Angular CLI, including ESM applications. Publish the optional package using its own version and tag through the approved release process; the initial beta uses the `beta` tag and leaves the legacy `latest` tag unchanged. Provisioning access to the new scoped npm package and adding the publication step to the external Azure release definition are release setup tasks, not effects of this source change.

X is a future consumer of this design. This change does not publish an X example package or imply that one is already available.
