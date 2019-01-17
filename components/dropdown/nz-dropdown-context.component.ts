import { AfterViewInit, Component, TemplateRef } from '@angular/core';

import { slideMotion } from '../core/animation/slide';

import { NzDropdownService } from './nz-dropdown.service';

@Component({
  selector   : 'nz-dropdown-context',
  animations : [
    slideMotion
  ],
  templateUrl: './nz-dropdown-context.component.html',
  styles     : [
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
