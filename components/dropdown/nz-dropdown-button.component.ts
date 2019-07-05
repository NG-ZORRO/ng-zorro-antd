/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Host,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  Optional,
  Output,
  Self,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import {
  slideMotion,
  warnDeprecation,
  NzDropdownHigherOrderServiceToken,
  NzNoAnimationDirective
} from 'ng-zorro-antd/core';

import { menuServiceFactory, NzDropDownComponent } from './nz-dropdown.component';
import { NzDropDownDirective } from './nz-dropdown.directive';
import { NzMenuDropdownService } from './nz-menu-dropdown.service';

@Component({
  selector: 'nz-dropdown-button',
  exportAs: 'nzDropdownButton',
  preserveWhitespaces: false,
  animations: [slideMotion],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    NzMenuDropdownService,
    {
      provide: NzDropdownHigherOrderServiceToken,
      useFactory: menuServiceFactory,
      deps: [[new Self(), Injector]]
    }
  ],
  templateUrl: './nz-dropdown-button.component.html',
  styles: [
    `
      nz-dropdown-button {
        position: relative;
        display: inline-block;
      }

      :root .ant-dropdown {
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
/**
 * @deprecated Use `NzDropdownDirective` instead, will remove in 9.0.0.
 */
export class NzDropDownButtonComponent extends NzDropDownComponent implements OnDestroy, AfterContentInit, OnChanges {
  @Input() nzSize = 'default';
  @Input() nzType = 'default';
  @Input() nzIcon: string | TemplateRef<void> = 'ellipsis';
  @Output() readonly nzClick = new EventEmitter<MouseEvent>();
  @ViewChild(NzDropDownDirective, { static: true }) nzDropDownDirective: NzDropDownDirective;

  constructor(
    cdr: ChangeDetectorRef,
    nzMenuDropdownService: NzMenuDropdownService,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {
    super(cdr, nzMenuDropdownService, noAnimation);
    warnDeprecation(
      `'nz-dropdown-button' Component is going to be removed in 9.0.0. Please use 'nz-dropdown-menu' instead. Read https://ng.ant.design/components/dropdown/en`
    );
  }

  /** rewrite afterViewInit hook */
  ngAfterContentInit(): void {
    this.startSubscribe(this.visible$);
  }
}
