/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { coerceCssPixelValue } from '@angular/cdk/coercion';
import { computed, Directive, inject, input } from '@angular/core';

import { responsiveArray, type ResponsiveLike } from 'ng-zorro-antd/core/services';
import type { NgStyleInterface } from 'ng-zorro-antd/core/types';
import { generateClassName, isNotNil, isNumber, isPlainObject } from 'ng-zorro-antd/core/util';

import { NzRowDirective } from './row.directive';

export type ColSpanType = number | string;

export interface ColSize {
  span?: ColSpanType;
  pull?: ColSpanType;
  push?: ColSpanType;
  offset?: ColSpanType;
  order?: ColSpanType;
}

/**
 * @deprecated intended to be removed in v22, please use {@link ColSize} instead
 */
export type EmbeddedProperty = ColSize;

const CLASS_NAME = 'ant-col';

@Directive({
  selector: '[nz-col],nz-col,nz-form-control,nz-form-label',
  exportAs: 'nzCol',
  host: {
    '[class]': 'hostClass()',
    '[class.ant-col-rtl]': `dir() === 'rtl'`,
    '[style]': 'gutterPaddingStyle()',
    '[style.flex]': 'flexStyle()'
  }
})
export class NzColDirective {
  private readonly nzRowDirective = inject(NzRowDirective, { host: true, optional: true });
  protected readonly dir = inject(Directionality).valueSignal;

  readonly nzFlex = input<ColSpanType | null>();
  readonly nzSpan = input<ColSpanType | null>();
  readonly nzOrder = input<ColSpanType | null>();
  readonly nzOffset = input<ColSpanType | null>();
  readonly nzPush = input<ColSpanType | null>();
  readonly nzPull = input<ColSpanType | null>();
  readonly nzXs = input<ColSpanType | ColSize | null>();
  readonly nzSm = input<ColSpanType | ColSize | null>();
  readonly nzMd = input<ColSpanType | ColSize | null>();
  readonly nzLg = input<ColSpanType | ColSize | null>();
  readonly nzXl = input<ColSpanType | ColSize | null>();
  readonly nzXXl = input<ColSpanType | ColSize | null>();

  protected readonly responsiveClass = computed(() => {
    const xs = this.nzXs();
    const sm = this.nzSm();
    const md = this.nzMd();
    const lg = this.nzLg();
    const xl = this.nzXl();
    const xxl = this.nzXXl();
    return this.generateClassList({ xs, sm, md, lg, xl, xxl });
  });

  protected readonly hostClass = computed(() => {
    const span = this.nzSpan();
    const order = this.nzOrder();
    const offset = this.nzOffset();
    const push = this.nzPush();
    const pull = this.nzPull();

    const classes = [CLASS_NAME];

    if (isNotNil(span)) {
      classes.push(this.generateClass(`${span}`));
    }

    if (order) {
      classes.push(this.generateClass(`order-${order}`));
    }

    if (offset) {
      classes.push(this.generateClass(`offset-${offset}`));
    }

    if (push) {
      classes.push(this.generateClass(`push-${push}`));
    }

    if (pull) {
      classes.push(this.generateClass(`pull-${pull}`));
    }

    return classes.concat(this.responsiveClass());
  });

  protected readonly flexStyle = computed(() => {
    const flex = this.nzFlex();
    if (typeof flex === 'number') {
      return `${flex} ${flex} auto`;
    } else if (typeof flex === 'string') {
      if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
        return `0 0 ${flex}`;
      }
    }
    return flex;
  });

  protected readonly gutterPaddingStyle = computed<NgStyleInterface>(() => {
    if (!this.nzRowDirective) {
      return {};
    }
    const [gutterH] = this.nzRowDirective.gutter();
    const style: NgStyleInterface = {};

    // Horizontal gutter use padding
    if (gutterH) {
      const horizontalGutter = isNumber(gutterH) ? coerceCssPixelValue(gutterH / 2) : `calc(${gutterH} / 2)`;
      style['padding-inline'] = horizontalGutter;
    }

    return style;
  });

  private generateClassList(props: Partial<ResponsiveLike<ColSpanType | ColSize | null>>): string[] {
    const classes: string[] = [];

    responsiveArray.forEach(size => {
      let sizeProps: ColSize = {};
      const propSize = props[size];
      if (isNumber(propSize) || typeof propSize === 'string') {
        sizeProps.span = propSize;
      } else if (isPlainObject(propSize)) {
        sizeProps = propSize || {};
      }

      const { span, pull, push, offset, order } = sizeProps;

      if (isNotNil(span)) {
        classes.push(this.generateClass(`${size}-${span}`));
      }

      if (order || order === 0) {
        classes.push(this.generateClass(`${size}-order-${order}`));
      }

      if (offset || offset === 0) {
        classes.push(this.generateClass(`${size}-offset-${offset}`));
      }

      if (push || push === 0) {
        classes.push(this.generateClass(`${size}-push-${push}`));
      }

      if (pull || pull === 0) {
        classes.push(this.generateClass(`${size}-pull-${pull}`));
      }
    });

    return classes;
  }

  private generateClass(suffix: string): string {
    return generateClassName(CLASS_NAME, suffix);
  }
}
