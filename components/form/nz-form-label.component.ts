/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Host,
  Input,
  OnDestroy,
  Optional,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

import { toBoolean, InputBoolean, NzUpdateHostClassService } from 'ng-zorro-antd/core';
import { NzColDirective, NzRowDirective } from 'ng-zorro-antd/grid';

import { NzFormItemComponent } from './nz-form-item.component';

@Component({
  selector: 'nz-form-label',
  exportAs: 'nzFormLabel',
  providers: [NzUpdateHostClassService],
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './nz-form-label.component.html'
})
export class NzFormLabelComponent extends NzColDirective implements OnDestroy, AfterViewInit {
  @Input() nzFor: string;
  @Input() @InputBoolean() nzRequired = false;
  @Input()
  set nzNoColon(value: boolean) {
    this.noColon = toBoolean(value);
  }
  get nzNoColon(): boolean {
    return !!this.noColon;
  }

  defaultNoColon: boolean = false;
  noColon: boolean | string = 'default';

  constructor(
    nzUpdateHostClassService: NzUpdateHostClassService,
    elementRef: ElementRef,
    @Optional() @Host() nzFormItemComponent: NzFormItemComponent,
    @Optional() @Host() nzRowDirective: NzRowDirective,
    renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) {
    super(nzUpdateHostClassService, elementRef, nzFormItemComponent || nzRowDirective, renderer);
    renderer.addClass(elementRef.nativeElement, 'ant-form-item-label');
  }

  setDefaultNoColon(value: boolean): void {
    this.defaultNoColon = toBoolean(value);
    this.cdr.markForCheck();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
  }
}
