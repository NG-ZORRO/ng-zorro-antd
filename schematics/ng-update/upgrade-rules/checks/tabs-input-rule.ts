import { findInputsOnElementWithTag, Migration, ResolvedResource, TargetVersion, UpgradeData } from '@angular/cdk/schematics';

export class TabsInputRule extends Migration<UpgradeData> {

  enabled = this.targetVersion === TargetVersion.V11;

  visitTemplate(template: ResolvedResource): void {

    findInputsOnElementWithTag(template.content, 'nzShowPagination', ['nz-tabset'])
      .forEach(offset => {
        this.failures.push({
          filePath: template.filePath,
          position: template.getCharacterAndLineOfPosition(offset),
          message: `Found deprecated input '[nzShowPagination]'. Please manually remove this input.`
        });
      })

  }
}
