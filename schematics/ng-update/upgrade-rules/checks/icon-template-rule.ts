import { MigrationRule, ResolvedResource, TargetVersion } from '@angular/cdk/schematics';
import { findElementWithClassName } from '../../../utils/ng-update/elements';

export class IconTemplateRule extends MigrationRule<null> {

  ruleEnabled = this.targetVersion === TargetVersion.V9;

  visitTemplate(template: ResolvedResource): void {

    findElementWithClassName(template.content, 'anticon', 'i')
      .forEach(offset => {
        this.failures.push({
          filePath: template.filePath,
          position: template.getCharacterAndLineOfPosition(offset),
          message: `Found deprecated css selector "i.anticon" component. Use "i[nz-icon]" to instead please.`
        });
      })

  }
}
