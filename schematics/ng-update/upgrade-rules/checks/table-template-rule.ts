import {
  findInputsOnElementWithTag, findOutputsOnElementWithTag,
  Migration,
  ResolvedResource,
  TargetVersion,
  UpgradeData
} from '@angular/cdk/schematics';

export class TableTemplateRule extends Migration<UpgradeData> {

  enabled = this.targetVersion === TargetVersion.V10;

  visitTemplate(template: ResolvedResource): void {

    const content = template.content.replace('nz-table', 'table  ')
    findOutputsOnElementWithTag(content, 'nzSortChangeWithKey', ['th'])
      .forEach(offset => {
        this.failures.push({
          filePath: template.filePath,
          position: template.getCharacterAndLineOfPosition(offset),
          message: `Found deprecated output 'th(nzSortChangeWithKey)'. Please manually remove this output.`
        });
      });

    findInputsOnElementWithTag(content, 'nzSingleSort', ['thead'])
      .forEach(offset => {
        this.failures.push({
          filePath: template.filePath,
          position: template.getCharacterAndLineOfPosition(offset),
          message: `Found deprecated input 'thead[nzSingleSort]'. Please manually change to 'th[nzSortFn]'.`
        });
      });

    findInputsOnElementWithTag(content, 'nzSortKey', ['th'])
      .forEach(offset => {
        this.failures.push({
          filePath: template.filePath,
          position: template.getCharacterAndLineOfPosition(offset),
          message: `Found deprecated input 'th[nzSortKey]'. Please manually change to 'th[nzSortFn]'.`
        });
      });
  }
}
