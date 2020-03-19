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

import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { NzFormControlComponent } from './form-control.component';
import { NzFormLabelComponent } from './form-label.component';

const NZ_CONFIG_COMPONENT_NAME = 'form';

@Directive({
  selector: '[nz-form]',
  exportAs: 'nzForm',
  host: { '[class]': 'hostClassMap' }
})
export class NzFormDirective implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  static ngAcceptInputType_nzNoColon: BooleanInput;
  static ngAcceptInputType_nzDisableAutoTips: BooleanInput;

  @Input() nzLayout = 'horizontal';
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzNoColon: boolean;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, {}) nzTipOptions: Record<string, Record<string, string>>;
  @Input() @InputBoolean() nzDisableAutoTips = false;

  hostClassMap = {};

  @ContentChildren(NzFormLabelComponent, { descendants: true }) nzFormLabelComponent: QueryList<NzFormLabelComponent>;
  @ContentChildren(NzFormControlComponent, { descendants: true }) nzFormControlComponent: QueryList<NzFormControlComponent>;

  destroy$ = new Subject();

  setClassMap(): void {
    this.hostClassMap = {
      [`ant-form-${this.nzLayout}`]: this.nzLayout
    };
  }

  updateItemsDefaultColon(): void {
    if (this.nzFormLabelComponent) {
      this.nzFormLabelComponent.forEach(item => item.setDefaultNoColon(this.nzNoColon));
    }
  }

  updateItemsDefaultAutoTipConf(): void {
    if (this.nzFormControlComponent) {
      this.nzFormControlComponent.forEach(item => item.setDefaultAutoTipConf(this.nzTipOptions, this.nzDisableAutoTips));
    }
  }

  constructor(public nzConfigService: NzConfigService, elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(elementRef.nativeElement, 'ant-form');
  }

  ngOnInit(): void {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzLayout, nzNoColon, nzTipOptions, nzDisableAutoTips } = changes;
    if (nzLayout) {
      this.setClassMap();
    }
    if (nzNoColon) {
      this.updateItemsDefaultColon();
    }
    if (nzTipOptions || nzDisableAutoTips) {
      this.updateItemsDefaultAutoTipConf();
    }
  }

  ngAfterContentInit(): void {
    this.nzFormLabelComponent.changes.pipe(startWith(null), takeUntil(this.destroy$)).subscribe(() => {
      this.updateItemsDefaultColon();
    });

    this.nzFormControlComponent.changes.pipe(startWith(null), takeUntil(this.destroy$)).subscribe(() => {
      this.updateItemsDefaultAutoTipConf();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
