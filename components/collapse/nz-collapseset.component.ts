import {
  Component,
  Input
} from '@angular/core';

import { toBoolean } from '../core/util/convert';

import { NzCollapseComponent } from './nz-collapse.component';

@Component({
  selector: 'nz-collapseset',
  template: `
    <div class="ant-collapse" [class.ant-collapse-borderless]="!nzBordered">
      <ng-content></ng-content>
    </div>
  `,
  styles  : [
      `:host {
      display: block;
    }`
  ]
})
export class NzCollapsesetComponent {
  private _accordion = false;
  private _bordered = true;
  // all child collapse
  panels: NzCollapseComponent[] = [];

  @Input()
  set nzAccordion(value: boolean) {
    this._accordion = toBoolean(value);
  }

  get nzAccordion(): boolean {
    return this._accordion;
  }

  @Input()
  set nzBordered(value: boolean) {
    this._bordered = toBoolean(value);
  }

  get nzBordered(): boolean {
    return this._bordered;
  }

  nzClick(collapse: NzCollapseComponent): void {
    if (this.nzAccordion) {
      this.panels.map((item, index) => {
        const curIndex = this.panels.indexOf(collapse);
        if (index !== curIndex) {
          item.nzActive = false;
        }
      });
    }
  }

  addTab(collapse: NzCollapseComponent): void {
    this.panels.push(collapse);
  }
}
