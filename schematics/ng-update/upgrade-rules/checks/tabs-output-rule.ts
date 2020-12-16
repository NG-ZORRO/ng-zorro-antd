import {
  findOutputsOnElementWithTag,
  Migration,
  ResolvedResource,
  TargetVersion,
  UpgradeData
} from '@angular/cdk/schematics';

export class TabsOutputRule extends Migration<UpgradeData> {

  enabled = this.targetVersion === TargetVersion.V11;

  visitTemplate(template: ResolvedResource): void {

    findOutputsOnElementWithTag(template.content, 'nzOnNextClick', ['nz-tabset'])
      .forEach(offset => {
        this.failures.push({
          filePath: template.filePath,
          position: template.getCharacterAndLineOfPosition(offset),
          message: `Found deprecated output '(nzOnNextClick)'. Please manually remove this output.`
        });
      })

    findOutputsOnElementWithTag(template.content, 'nzOnPrevClick', ['nz-tabset'])
      .forEach(offset => {
        this.failures.push({
          filePath: template.filePath,
          position: template.getCharacterAndLineOfPosition(offset),
          message: `Found deprecated output '(nzOnPrevClick)'. Please manually remove this output.`
        });
      })
  }
}
