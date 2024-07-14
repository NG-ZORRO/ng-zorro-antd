/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewEncapsulation
} from '@angular/core';

export interface NzTourStep {
  title: string;
  content: string;
  target: string | ElementRef;
}

@Component({
  standalone: true,
  selector: 'nz-tour',
  exportAs: 'nzTour',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: ``,
  preserveWhitespaces: false
})
export class NzTourComponent {
  @Input({ required: true }) nzSteps: NzTourStep[] = [];
  @Input({ transform: booleanAttribute }) nzOpen = false;

  constructor() {}
}
