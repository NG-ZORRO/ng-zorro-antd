import {
  Migration,
  ResolvedResource,
  UpgradeData
} from '@angular/cdk/schematics';
import { findElementWithTag } from '../../../utils/ng-update/elements';

export class TooltipLikeTemplateRule extends Migration<UpgradeData> {

  enabled = true;

  visitTemplate(template: ResolvedResource): void {

    const deprecatedComponent = (deprecated: string, instead: string) => {
      findElementWithTag(template.content, deprecated)
      .forEach(offset => {
        this.failures.push({
          filePath: template.filePath,
          position: template.getCharacterAndLineOfPosition(offset),
          message: `Found deprecated "<${deprecated}>" component. Use "${instead}" to instead please.`
        });
      })
    };

    deprecatedComponent('nz-tooltip', '[nz-tooltip]');
    deprecatedComponent('nz-popover', '[nz-popover]');
    deprecatedComponent('nz-popconfirm', '[nz-popconfirm]');

  }
}
