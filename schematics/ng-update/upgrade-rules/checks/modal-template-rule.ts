import {
  findInputsOnElementWithTag,
  Migration,
  ResolvedResource,
  TargetVersion,
  UpgradeData
} from '@angular/cdk/schematics';

export class ModalTemplateRule extends Migration<UpgradeData> {

  enabled = this.targetVersion === TargetVersion.V11;

  visitTemplate(template: ResolvedResource): void {
    findInputsOnElementWithTag(template.content, 'nzGetContainer', ['nz-modal'])
      .forEach(offset => {
        this.failures.push({
          filePath: template.filePath,
          position: template.getCharacterAndLineOfPosition(offset),
          message: `Found deprecated input '[nzGetContainer]'. Please manually remove this input.`
        });
      })
  }
}
