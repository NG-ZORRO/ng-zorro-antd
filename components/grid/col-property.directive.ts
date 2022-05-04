/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { toNumber, upperFirst } from 'ng-zorro-antd/core/util';

import { EmbeddedProperty, NzColDirective } from './col.directive';

export interface ColProperty extends EmbeddedProperty {
  xs?: string | number | EmbeddedProperty;
  sm?: string | number | EmbeddedProperty;
  md?: string | number | EmbeddedProperty;
  lg?: string | number | EmbeddedProperty;
  xl?: string | number | EmbeddedProperty;
  xxl?: string | number | EmbeddedProperty;
}

function convertColProperty(value?: string | number | ColProperty): ColProperty | undefined {
  return typeof value === 'number' || typeof value === 'string' ? { span: toNumber(value) } : value;
}

@Directive({
  selector: '[nzColProperty]'
})
export class NzColPropertyDirective extends NzColDirective implements OnChanges {
  @Input() nzColProperty?: string | number | ColProperty;

  private setProperty(): void {
    const property = convertColProperty(this.nzColProperty);
    if (!property) {
      return;
    }
    for (const key in property) {
      if (property.hasOwnProperty(key)) {
        const withPrefixKey = `nz${upperFirst(key)}`;
        (this as NzSafeAny)[withPrefixKey] = property[key as keyof typeof property];
      }
    }
  }

  override ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzColProperty) {
      this.setProperty();
    }
  }
}
