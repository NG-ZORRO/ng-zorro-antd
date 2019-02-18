import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { slideMotion } from '../core/animation/slide';
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

  constructor(renderer: Renderer2, cdr: ChangeDetectorRef, nzMenuDropdownService: NzMenuDropdownService) {
    super(renderer, cdr, nzMenuDropdownService);
  }

  /** rewrite afterViewInit hook */
  ngAfterContentInit(): void {
    this.startSubscribe(this.visible$);
  }
}
