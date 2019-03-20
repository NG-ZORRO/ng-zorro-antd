import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter, Host,
  Input,
  OnChanges,
  OnDestroy, Optional,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { slideMotion } from '../core/animation/slide';
import { NzNoAnimationDirective } from '../core/no-animation/nz-no-animation.directive';
import { NzDropDownComponent } from './nz-dropdown.component';
import { NzDropDownDirective } from './nz-dropdown.directive';
import { NzMenuDropdownService } from './nz-menu-dropdown.service';

@Component({
  selector           : 'nz-dropdown-button',
  preserveWhitespaces: false,
  animations         : [ slideMotion ],
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  providers          : [ NzMenuDropdownService ],
  templateUrl        : './nz-dropdown-button.component.html',
  styles             : [ `
    nz-dropdown-button {
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

export class NzDropDownButtonComponent extends NzDropDownComponent implements OnDestroy, AfterContentInit, OnChanges {
  @Input() nzSize = 'default';
  @Input() nzType = 'default';
  @Output() readonly nzClick = new EventEmitter<MouseEvent>();
  @ViewChild(NzDropDownDirective) nzDropDownDirective: NzDropDownDirective;

  constructor(cdr: ChangeDetectorRef, nzMenuDropdownService: NzMenuDropdownService,
              @Host() @Optional() public noAnimation?: NzNoAnimationDirective) {
    super(cdr, nzMenuDropdownService, noAnimation);
  }

  /** rewrite afterViewInit hook */
  ngAfterContentInit(): void {
    this.startSubscribe(this.visible$);
  }
}
