import { AfterViewInit, Component, TemplateRef } from '@angular/core';

import { dropDownAnimation } from '../core/animation/dropdown-animations';

import { NzDropdownService } from './nz-dropdown.service';

@Component({
  selector  : 'nz-dropdown-context',
  animations: [
    dropDownAnimation
  ],
  template  : `
    <div class="ant-dropdown ant-dropdown-placement-bottomLeft" [@dropDownAnimation]="dropDownPosition" (@dropDownAnimation.done)="afterAnimation()" *ngIf="open">
      <ng-template [ngTemplateOutlet]="template"></ng-template>
    </div>
  `,
  styles    : [
      `
      .ant-dropdown {
        top: 100%;
        left: 0;
        position: relative;
        width: 100%;
        margin-top: 4px;
        margin-bottom: 4px;
      }
    `
  ]
})
export class NzDropdownContextComponent implements AfterViewInit {
  dropDownPosition: 'top' | 'bottom' = 'bottom';
  control: NzDropdownService;
  template: TemplateRef<void>;
  open = true;

  setTemplateRef(value: TemplateRef<void>): void {
    this.template = value;
  }

  setControl(value: NzDropdownService): void {
    this.control = value;
  }

  setDropDownPosition(value: 'top' | 'bottom'): void {
    this.dropDownPosition = value;
  }

  close(): void {
    this.open = false;
  }

  afterAnimation(): void {
    if (!this.open) {
      this.control.close();
    }
  }

  ngAfterViewInit(): void {
    // TODO auto set dropdown class after the bug resolved
    /** https://github.com/angular/angular/issues/14842 **/
  }
}
