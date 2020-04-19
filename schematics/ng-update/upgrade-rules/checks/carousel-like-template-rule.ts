import { findInputsOnElementWithTag, MigrationRule, ResolvedResource, TargetVersion } from '@angular/cdk/schematics';

export class CarouselTemplateRule extends MigrationRule<null> {

  ruleEnabled = this.targetVersion === TargetVersion.V9;

  visitTemplate(template: ResolvedResource): void {

    findInputsOnElementWithTag(template.content, 'nzVertical', ['nz-carousel'])
    .forEach(offset => {
      this.failures.push({
        filePath: template.filePath,
        position: template.getCharacterAndLineOfPosition(offset),
        message: `Found deprecated "[nzVertical]" input. Use "[nzDotPosition]" to instead please.`
      });
    });

  }
}
