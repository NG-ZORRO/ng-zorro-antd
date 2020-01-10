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
  Host,
  OnDestroy,
  Optional,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzNoAnimationDirective, zoomBigMotion } from 'ng-zorro-antd/core';
import { NzToolTipComponent, NzTooltipTrigger } from 'ng-zorro-antd/tooltip';
import { Subject } from 'rxjs';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-popconfirm',
  exportAs: 'nzPopconfirmComponent',
  preserveWhitespaces: false,
  animations: [zoomBigMotion],
  templateUrl: './nz-popconfirm.component.html',
  styles: [
    `
      .ant-popover {
        position: relative;
      }
    `
  ]
})
export class NzPopconfirmComponent extends NzToolTipComponent implements OnDestroy {
  nzCancelText: string;
  nzCondition = false;
  nzIcon: string | TemplateRef<void>;
  nzOkText: string;
  nzOkType: string = 'primary';

  readonly nzOnCancel = new Subject<void>();
  readonly nzOnConfirm = new Subject<void>();

  protected _trigger: NzTooltipTrigger = 'click';

  _prefix = 'ant-popover-placement';
  _hasBackdrop = true;

  constructor(cdr: ChangeDetectorRef, @Host() @Optional() public noAnimation?: NzNoAnimationDirective) {
    super(cdr, noAnimation);
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();

    this.nzOnCancel.complete();
    this.nzOnConfirm.complete();
  }

  show(): void {
    if (!this.nzCondition) {
      super.show();
    } else {
      this.onConfirm();
    }
  }

  onCancel(): void {
    this.nzOnCancel.next();
    super.hide();
  }

  onConfirm(): void {
    this.nzOnConfirm.next();
    super.hide();
  }
}
