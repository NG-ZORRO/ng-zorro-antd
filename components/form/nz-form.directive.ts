/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  ContentChildren,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { InputBoolean, NzConfigService, NzUpdateHostClassService, WithConfig } from 'ng-zorro-antd/core';

import { NzFormControlComponent } from './nz-form-control.component';
import { NzFormLabelComponent } from './nz-form-label.component';

const NZ_CONFIG_COMPONENT_NAME = 'form';
export type NzFormLayoutType = `horizontal` | `vertical` | `inline`;
@Directive({
  selector: '[nz-form]',
  exportAs: 'nzForm',
  providers: [NzUpdateHostClassService]
})
export class NzFormDirective implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  @Input() nzLayout: NzFormLayoutType = 'horizontal';
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzNoColon: boolean;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzAutoErrorTip: boolean;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzUseI18n: boolean;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 'errorTip') nzErrorTipKey: string | Record<string, string>;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, {}) nzErrorTipMap: Record<string, string> | Record<string, Record<string, string>>;

  @ContentChildren(NzFormLabelComponent, { descendants: true }) nzFormLabelComponent: QueryList<NzFormLabelComponent>;
  @ContentChildren(NzFormControlComponent, { descendants: true }) nzFormControlComponent: QueryList<NzFormControlComponent>;

  destroy$ = new Subject();

  setClassMap(): void {
    this.nzUpdateHostClassService.updateHostClass(this.elementRef.nativeElement, {
      [`ant-form-${this.nzLayout}`]: this.nzLayout
    });
  }

  updateItemsDefaultColon(): void {
    if (this.nzFormLabelComponent) {
      this.nzFormLabelComponent.forEach(item => item.setDefaultNoColon(this.nzNoColon));
    }
  }

  updateItemsDefaultAutoErrorConf(): void {
    if (this.nzFormControlComponent) {
      this.nzFormControlComponent.forEach(item =>
        item.setDefaultAutoErrorConf(this.nzAutoErrorTip, this.nzUseI18n, this.nzErrorTipKey, this.nzErrorTipMap)
      );
    }
  }

  constructor(
    public nzConfigService: NzConfigService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private nzUpdateHostClassService: NzUpdateHostClassService
  ) {
    this.renderer.addClass(elementRef.nativeElement, 'ant-form');
  }

  ngOnInit(): void {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('nzLayout')) {
      this.setClassMap();
    }

    if (changes.hasOwnProperty('nzNoColon')) {
      this.updateItemsDefaultColon();
    }

    if (
      changes.hasOwnProperty('nzAutoErrorTip') ||
      changes.hasOwnProperty('nzUseI18n') ||
      changes.hasOwnProperty('nzErrorTipKey') ||
      changes.hasOwnProperty('nzErrorTipMap')
    ) {
      this.updateItemsDefaultAutoErrorConf();
    }
  }

  ngAfterContentInit(): void {
    this.nzFormLabelComponent.changes.pipe(startWith(null), takeUntil(this.destroy$)).subscribe(() => {
      this.updateItemsDefaultColon();
    });

    this.nzFormControlComponent.changes.pipe(startWith(null), takeUntil(this.destroy$)).subscribe(() => {
      this.updateItemsDefaultAutoErrorConf();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
