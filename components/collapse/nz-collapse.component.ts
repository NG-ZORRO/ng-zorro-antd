import {
  Component,
  Input
} from '@angular/core';

import { toBoolean } from '../core/util/convert';

import { NzCollapsePanelComponent } from './nz-collapse-panel.component';

@Component({
  selector   : 'nz-collapse',
  templateUrl: './nz-collapse.component.html',
  styles     : [
    `:host {
      display: block;
    }`
  ]
})
export class NzCollapseComponent {
  private _accordion = false;
  private _bordered = true;
  private listOfPanel: NzCollapsePanelComponent[] = [];

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

  click(collapse: NzCollapsePanelComponent): void {
    if (this.nzAccordion) {
      this.listOfPanel.forEach(item => {
        const active = collapse === item;
        if (item.nzActive !== active) {
          item.nzActive = active;
          item.nzActiveChange.emit(item.nzActive);
        }
      });
    } else {
      collapse.nzActive = !collapse.nzActive;
      collapse.nzActiveChange.emit(collapse.nzActive);
    }
  }

  addCollapse(collapse: NzCollapsePanelComponent): void {
    this.listOfPanel.push(collapse);
  }

  removeCollapse(collapse: NzCollapsePanelComponent): void {
    this.listOfPanel.splice(this.listOfPanel.indexOf(collapse), 1);
  }
}
