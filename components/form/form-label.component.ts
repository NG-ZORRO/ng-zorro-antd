/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  Optional,
  Renderer2,
  SkipSelf,
  ViewEncapsulation
} from '@angular/core';
import { BooleanInput } from 'ng-zorro-antd/core/types';

import { InputBoolean, toBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { NzFormDirective } from './form.directive';

@Component({
  selector: 'nz-form-label',
  exportAs: 'nzFormLabel',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <label [attr.for]="nzFor" [class.ant-form-item-no-colon]="nzNoColon" [class.ant-form-item-required]="nzRequired">
      <ng-content></ng-content>
    </label>
  `
})
export class NzFormLabelComponent implements OnDestroy {
  static ngAcceptInputType_nzRequired: BooleanInput;
  static ngAcceptInputType_nzNoColon: BooleanInput;

  @Input() nzFor?: string;
  @Input() @InputBoolean() nzRequired = false;
  @Input()
  set nzNoColon(value: boolean) {
    this.noColon = toBoolean(value);
  }
  get nzNoColon(): boolean {
    return this.noColon !== 'default' ? this.noColon : this.nzFormDirective?.nzNoColon;
  }

  noColon: boolean | 'default' = 'default';

  private destroy$ = new Subject();

  constructor(
    elementRef: ElementRef,
    renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    @Optional() @SkipSelf() private nzFormDirective: NzFormDirective
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-form-item-label');

    if (this.nzFormDirective) {
      this.nzFormDirective
        .getInputObservable('nzNoColon')
        .pipe(
          filter(() => this.noColon === 'default'),
          takeUntil(this.destroy$)
        )
        .subscribe(() => this.cdr.markForCheck());
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
