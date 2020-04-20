/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Input, OnChanges, OnDestroy, OnInit, Renderer2, SimpleChange, SimpleChanges } from '@angular/core';

import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { BooleanInput, InputObservable } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const NZ_CONFIG_COMPONENT_NAME = 'form';

@Directive({
  selector: '[nz-form]',
  exportAs: 'nzForm',
  host: { '[class]': 'hostClassMap' }
})
export class NzFormDirective implements OnInit, OnChanges, OnDestroy, InputObservable {
  static ngAcceptInputType_nzNoColon: BooleanInput;
  static ngAcceptInputType_nzDisableAutoTips: BooleanInput;

  @Input() nzLayout = 'horizontal';
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzNoColon: boolean;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, {}) nzAutoTips: Record<string, Record<string, string>>;
  @Input() @InputBoolean() nzDisableAutoTips = false;

  hostClassMap = {};

  destroy$ = new Subject();
  private inputChanges$ = new Subject<SimpleChanges>();

  setClassMap(): void {
    this.hostClassMap = {
      [`ant-form-${this.nzLayout}`]: this.nzLayout
    };
  }

  getInputObservable<K extends keyof this>(changeType: K): Observable<SimpleChange> {
    return this.inputChanges$.pipe(
      filter(changes => changeType in changes),
      map(value => value[changeType as string])
    );
  }

  constructor(public nzConfigService: NzConfigService, elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(elementRef.nativeElement, 'ant-form');
  }

  ngOnInit(): void {
    this.setClassMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzLayout } = changes;
    if (nzLayout) {
      this.setClassMap();
    }
    this.inputChanges$.next(changes);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
