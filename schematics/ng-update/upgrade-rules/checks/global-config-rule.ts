import { TargetVersion } from '@angular/cdk/schematics';
import { InjectionTokenRule } from './injection-token-rule';

export class GlobalConfigRule extends InjectionTokenRule {
  enabled = this.targetVersion === TargetVersion.V9;
  tokens = ['NZ_MESSAGE_CONFIG', 'NZ_NOTIFICATION_CONFIG', 'NZ_DEFAULT_EMPTY_CONTENT', 'NZ_ICON_DEFAULT_TWOTONE_COLOR'];
  getFailure(token: string): string {
    return `Found deprecated symbol "${token}" which has been removed. Use global config to instead please.`;
  }
}
