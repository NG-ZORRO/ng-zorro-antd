import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import { dropDownAnimation } from '../core/animation/dropdown-animations';

import { NzDropDownComponent } from './nz-dropdown.component';
import { NzDropDownDirective } from './nz-dropdown.directive';

@Component({
  selector           : 'nz-dropdown-button',
  preserveWhitespaces: false,
  animations         : [
    dropDownAnimation
  ],
  templateUrl        : './nz-dropdown-button.component.html',
  styles             : [ `
    :host {
      position: relative;
      display: inline-block;
    }

    .ant-dropdown {
      top: 100%;
      left: 0;
      position: relative;
      width: 100%;
      margin-top: 4px;
      margin-bottom: 4px;
    }
  ` ]
})

export class NzDropDownButtonComponent extends NzDropDownComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() nzSize = 'default';
  @Input() nzType = 'default';
  @ViewChild('content') content;
  @Output() nzClick = new EventEmitter();
  @ViewChild(NzDropDownDirective) nzOrigin;

  onVisibleChange = (visible: boolean) => {
    if (this.nzDisabled) {
      return;
    }
    if (visible) {
      this.setTriggerWidth();
    }
    if (this.nzVisible !== visible) {
      this.nzVisible = visible;
      this.nzVisibleChange.emit(this.nzVisible);
    }
    this.changeDetector.markForCheck();
  }

  /** rewrite afterViewInit hook */
  ngAfterViewInit(): void {
    this.startSubscribe(this.$visibleChange);
  }
}
