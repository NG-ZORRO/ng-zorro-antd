/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Host,
  Input,
  Optional,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { isNotNil, zoomBigMotion, NzNoAnimationDirective } from 'ng-zorro-antd/core';
import { NzToolTipComponent } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'nz-popover',
  exportAs: 'nzPopoverComponent',
  animations: [zoomBigMotion],
  templateUrl: './nz-popover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  styles: [
    `
      .ant-popover {
        position: relative;
      }
    `
  ]
})
export class NzPopoverComponent extends NzToolTipComponent {
  _prefix = 'ant-popover-placement';

  /** Used to remove NzToolTipComponent @ContentChild('nzTemplate') */
  @Input() @ContentChild('neverUsedTemplate') nzTitle: string | TemplateRef<void>;
  @Input() @ContentChild('nzTemplate') nzContent: string | TemplateRef<void>;

  constructor(cdr: ChangeDetectorRef, @Host() @Optional() public noAnimation?: NzNoAnimationDirective) {
    super(cdr, noAnimation);
  }

  protected isContentEmpty(): boolean {
    const isTitleEmpty = this.nzTitle instanceof TemplateRef ? false : this.nzTitle === '' || !isNotNil(this.nzTitle);
    const isContentEmpty =
      this.nzContent instanceof TemplateRef ? false : this.nzContent === '' || !isNotNil(this.nzContent);
    return isTitleEmpty && isContentEmpty;
  }
}
