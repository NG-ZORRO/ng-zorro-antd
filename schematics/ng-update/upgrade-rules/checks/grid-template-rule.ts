import {
  findInputsOnElementWithAttr,
  findInputsOnElementWithTag,
  Migration,
  ResolvedResource,
  TargetVersion,
  UpgradeData
} from '@angular/cdk/schematics';

export class GridTemplateRule extends Migration<UpgradeData> {

  enabled = this.targetVersion === TargetVersion.V10;

  visitTemplate(template: ResolvedResource): void {

    const offsets = []

    offsets.push(...findInputsOnElementWithAttr(template.content, 'nzType', ['nz-row']))
    offsets.push(...findInputsOnElementWithTag(template.content, 'nzType', ['nz-form-item', 'nz-row']))

    offsets.forEach(offset => {
      this.failures.push({
        filePath: template.filePath,
        position: template.getCharacterAndLineOfPosition(offset),
          message: `Found deprecated input '[nzType]'. Please manually remove this input.`
      });
    })

    findInputsOnElementWithTag(template.content, 'nzFlex', ['nz-form-item']).forEach(offset => {
      this.failures.push({
        filePath: template.filePath,
        position: template.getCharacterAndLineOfPosition(offset),
        message: `Found deprecated input '[nzFlex]'. Please manually remove this input.`
      });
    })

  }
}
