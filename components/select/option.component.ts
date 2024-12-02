/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  inject
} from '@angular/core';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzOptionGroupComponent } from './option-group.component';

@Component({
  selector: 'nz-option',
  exportAs: 'nzOption',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NzDestroyService],
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `
})
export class NzOptionComponent implements OnChanges, OnInit {
  changes = new Subject<void>();
  groupLabel?: string | number | TemplateRef<NzSafeAny> | null = null;
  @ViewChild(TemplateRef, { static: true }) template!: TemplateRef<NzSafeAny>;
  @Input() nzTitle?: string | number | null;
  @Input() nzLabel: string | number | null = null;
  @Input() nzValue: NzSafeAny | null = null;
  @Input() nzKey?: string | number;
  @Input({ transform: booleanAttribute }) nzDisabled = false;
  @Input({ transform: booleanAttribute }) nzHide = false;
  @Input({ transform: booleanAttribute }) nzCustomContent = false;

  private nzOptionGroupComponent = inject(NzOptionGroupComponent, { optional: true });

  constructor(private destroy$: NzDestroyService) {}

  ngOnInit(): void {
    if (this.nzOptionGroupComponent) {
      this.nzOptionGroupComponent.changes.pipe(startWith(true), takeUntil(this.destroy$)).subscribe(() => {
        this.groupLabel = this.nzOptionGroupComponent?.nzLabel;
      });
    }
  }

  ngOnChanges(): void {
    this.changes.next();
  }
}
