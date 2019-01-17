import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';

import { slideMotion } from '../core/animation/slide';

import { NzDropDownComponent } from './nz-dropdown.component';
import { NzDropDownDirective } from './nz-dropdown.directive';

@Component({
  selector           : 'nz-dropdown-button',
  preserveWhitespaces: false,
  animations         : [
    slideMotion
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
  @Output() readonly nzClick = new EventEmitter<MouseEvent>();
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

  constructor(renderer: Renderer2, changeDetector: ChangeDetectorRef) {
    super(renderer, changeDetector);
  }

  /** rewrite afterViewInit hook */
  ngAfterViewInit(): void {
    this.startSubscribe(this.$visibleChange);
  }
}
