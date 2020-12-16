import { Migration, ResolvedResource, TargetVersion, UpgradeData } from '@angular/cdk/schematics';
import { findElementWithoutStructuralDirective } from '../../../utils/ng-update/elements';

export class TabsTemplateRule extends Migration<UpgradeData> {

  enabled = this.targetVersion === TargetVersion.V11;

  visitTemplate(template: ResolvedResource): void {

    findElementWithoutStructuralDirective(template.content, 'a', 'nzTabLink', 'nz-tab-link')
      .forEach(offset => {
        this.failures.push({
          filePath: template.filePath,
          position: template.getCharacterAndLineOfPosition(offset),
          message: `Found deprecated selector 'a[nz-tab-link]', please use 'ng-template[nzTabLink] > a[nz-tab-link]' instead.`
        });
      })

  }
}
