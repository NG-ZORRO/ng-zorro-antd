/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  forwardRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

import { FocusMonitor } from '@angular/cdk/a11y';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NzRadioComponent } from './nz-radio.component';

@Component({
  selector: '[nz-radio-button]',
  exportAs: 'nzRadioButton',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzRadioComponent),
      multi: true
    },
    {
      provide: NzRadioComponent,
      useExisting: forwardRef(() => NzRadioButtonComponent)
    }
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  templateUrl: './nz-radio-button.component.html',
  host: {
    '[class.ant-radio-button-wrapper-checked]': 'checked',
    '[class.ant-radio-button-wrapper-disabled]': 'nzDisabled'
  }
})
export class NzRadioButtonComponent extends NzRadioComponent {
  /* tslint:disable-next-line:no-any */
  constructor(elementRef: ElementRef, renderer: Renderer2, cdr: ChangeDetectorRef, focusMonitor: FocusMonitor) {
    super(elementRef, renderer, cdr, focusMonitor);
    renderer.removeClass(elementRef.nativeElement, 'ant-radio-wrapper');
    renderer.addClass(elementRef.nativeElement, 'ant-radio-button-wrapper');
  }
}
