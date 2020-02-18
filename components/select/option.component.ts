/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { InputBoolean } from 'ng-zorro-antd/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { NzOptionGroupComponent } from './option-group.component';

@Component({
  selector: 'nz-option',
  exportAs: 'nzOption',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class NzOptionComponent implements OnChanges, OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  changes = new Subject();
  groupLabel: string | TemplateRef<NzSafeAny> | null = null;
  @ViewChild(TemplateRef, { static: true }) template: TemplateRef<NzSafeAny>;
  @Input() nzLabel: string | null = null;
  @Input() nzValue: NzSafeAny | null = null;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzHide = false;
  @Input() @InputBoolean() nzCustomContent = false;

  constructor(@Optional() private nzOptionGroupComponent: NzOptionGroupComponent) {}

  ngOnInit(): void {
    if (this.nzOptionGroupComponent) {
      this.nzOptionGroupComponent.changes.pipe(startWith(true), takeUntil(this.destroy$)).subscribe(() => {
        this.changes.next();
        this.groupLabel = this.nzOptionGroupComponent.nzLabel;
      });
    }
  }

  ngOnChanges(): void {
    this.changes.next();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
