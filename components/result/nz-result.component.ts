import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

export type NzResultIcon = 'success' | 'error' | 'info' | 'warning';

export const IconMap = {
  success: 'check-circle',
  error  : 'close-circle',
  info   : 'exclamation-circle',
  warning: 'warning'
};

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation  : ViewEncapsulation.None,
  selector       : 'nz-result',
  templateUrl    : './nz-result.component.html',
  host           : {
    class: 'ant-result'
  },
  styles         : [
      `
      nz-result, nz-result-title, nz-result-subtitle, nz-result-extra, nz-result-content {
        display: block;
      }
    `
  ]
})
export class NzResultComponent implements OnChanges {
  @Input() nzIcon: NzResultIcon | TemplateRef<void>;
  @Input() nzTitle: string | TemplateRef<void>;
  @Input() nzSubTitle: string | TemplateRef<void>;
  @Input() nzExtra: string | TemplateRef<void>;

  iconName = '';
  iconCls = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzIcon) {
      const icon = changes.nzIcon.currentValue;
      if (typeof icon === 'string') {
        this.iconName = IconMap[ changes.nzIcon.currentValue ];
        this.iconCls = { [ changes.nzIcon.currentValue ]: true };
      } else {
        this.iconName = '';
        this.iconCls = {};
      }
    }
  }
}
