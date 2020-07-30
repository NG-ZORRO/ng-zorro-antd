/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, ElementRef, Input, OnChanges, OnDestroy, Renderer2, SimpleChange, SimpleChanges } from '@angular/core';

import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { BooleanInput, InputObservable } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'form';

export type NzFormLayoutType = 'horizontal' | 'vertical' | 'inline';

@Directive({
  selector: '[nz-form]',
  exportAs: 'nzForm',
  host: {
    '[class.ant-form-horizontal]': `nzLayout === 'horizontal'`,
    '[class.ant-form-vertical]': `nzLayout === 'vertical'`,
    '[class.ant-form-inline]': `nzLayout === 'inline'`
  }
})
export class NzFormDirective implements OnChanges, OnDestroy, InputObservable {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;
  static ngAcceptInputType_nzNoColon: BooleanInput;
  static ngAcceptInputType_nzDisableAutoTips: BooleanInput;

  @Input() nzLayout: NzFormLayoutType = 'horizontal';
  @Input() @WithConfig() @InputBoolean() nzNoColon: boolean = false;
  @Input() @WithConfig() nzAutoTips: Record<string, Record<string, string>> = {};
  @Input() @InputBoolean() nzDisableAutoTips = false;

  destroy$ = new Subject();
  private inputChanges$ = new Subject<SimpleChanges>();

  getInputObservable<K extends keyof this>(changeType: K): Observable<SimpleChange> {
    return this.inputChanges$.pipe(
      filter(changes => changeType in changes),
      map(value => value[changeType as string])
    );
  }

  constructor(public nzConfigService: NzConfigService, elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(elementRef.nativeElement, 'ant-form');
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.inputChanges$.next(changes);
  }

  ngOnDestroy(): void {
    this.inputChanges$.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }
}
