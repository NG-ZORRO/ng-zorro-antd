/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { Directive, Input, OnChanges, OnDestroy, SimpleChange, SimpleChanges, booleanAttribute } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';

import { ThemeType } from '@ant-design/icons-angular';

import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { InputObservable } from 'ng-zorro-antd/core/types';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'form';

export type NzFormLayoutType = 'horizontal' | 'vertical' | 'inline';

export type NzLabelAlignType = 'left' | 'right';

export const DefaultTooltipIcon = {
  type: 'question-circle',
  theme: 'outline'
} as const;

@Directive({
  selector: '[nz-form]',
  exportAs: 'nzForm',
  host: {
    class: 'ant-form',
    '[class.ant-form-horizontal]': `nzLayout === 'horizontal'`,
    '[class.ant-form-vertical]': `nzLayout === 'vertical'`,
    '[class.ant-form-inline]': `nzLayout === 'inline'`,
    '[class.ant-form-rtl]': `dir === 'rtl'`
  }
})
export class NzFormDirective implements OnChanges, OnDestroy, InputObservable {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  @Input() nzLayout: NzFormLayoutType = 'horizontal';
  @Input({ transform: booleanAttribute }) @WithConfig() nzNoColon: boolean = false;
  @Input() @WithConfig() nzAutoTips: Record<string, Record<string, string>> = {};
  @Input({ transform: booleanAttribute }) nzDisableAutoTips = false;
  @Input() @WithConfig() nzTooltipIcon: string | { type: string; theme: ThemeType } = DefaultTooltipIcon;
  @Input() nzLabelAlign: NzLabelAlignType = 'right';
  @Input({ transform: booleanAttribute }) @WithConfig() nzLabelWrap: boolean = false;

  dir: Direction = 'ltr';
  destroy$ = new Subject<boolean>();
  private inputChanges$ = new Subject<SimpleChanges>();

  getInputObservable<K extends keyof this>(changeType: K): Observable<SimpleChange> {
    return this.inputChanges$.pipe(
      filter(changes => changeType in changes),
      map(value => value[changeType as string])
    );
  }

  constructor(
    public nzConfigService: NzConfigService,
    private directionality: Directionality
  ) {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.inputChanges$.next(changes);
  }

  ngOnDestroy(): void {
    this.inputChanges$.complete();
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
