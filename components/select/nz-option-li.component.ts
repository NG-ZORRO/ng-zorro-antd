import { Component, ElementRef, Input } from '@angular/core';
import { isNotNil } from '../core/util/check';
import { NzOptionComponent } from './nz-option.component';

@Component({
  selector: '[nz-option-li]',
  template: `
    <ng-container *ngIf="nzOption.nzCustomContent">
      <ng-template [ngTemplateOutlet]="nzOption.template"></ng-template>
    </ng-container>
    <ng-container *ngIf="!nzOption.nzCustomContent">
      {{nzOption.nzLabel}}
    </ng-container>
  `,
  host    : {
    '[class.ant-select-dropdown-menu-item]'         : 'true',
    '[class.ant-select-dropdown-menu-item-selected]': 'selected && !nzOption.nzDisabled',
    '[class.ant-select-dropdown-menu-item-disabled]': 'nzOption.nzDisabled',
    '[class.ant-select-dropdown-menu-item-active]'  : 'active && !nzOption.nzDisabled && nzShowActive && !selected',
    '[attr.unselectable]'                           : '"unselectable"',
    '[style.user-select]'                           : '"none"'
  }
})
export class NzOptionLiComponent {
  el: Element;
  selected = false;
  active = false;
  @Input() nzOption: NzOptionComponent;
  @Input() nzShowActive = true;
  // tslint:disable-next-line:no-any
  @Input() compareWith: (o1: any, o2: any) => boolean;

  @Input()
  set nzActiveOption(value: NzOptionComponent) {
    if (value) {
      this.active = this.compareWith(value.nzValue, this.nzOption.nzValue);
    } else {
      this.active = false;
    }
  }

  @Input()
  // tslint:disable-next-line:no-any
  set nzListOfSelectedValue(valueList: any[]) {
    this.selected = isNotNil(valueList.find(v => this.compareWith(v, this.nzOption.nzValue)));
  }

  constructor(private elementRef: ElementRef) {
    this.el = elementRef.nativeElement;
  }
}
