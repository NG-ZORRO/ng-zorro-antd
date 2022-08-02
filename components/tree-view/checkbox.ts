/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnInit,
  Output
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

@Component({
  selector: 'nz-tree-node-checkbox:not([builtin])',
  template: ` <span class="ant-tree-checkbox-inner"></span> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  host: {
    class: 'ant-tree-checkbox',
    '[class.ant-tree-checkbox-checked]': `nzChecked`,
    '[class.ant-tree-checkbox-indeterminate]': `nzIndeterminate`,
    '[class.ant-tree-checkbox-disabled]': `nzDisabled`
  },
  providers: [NzDestroyService]
})
export class NzTreeNodeCheckboxComponent implements OnInit {
  static ngAcceptInputType_nzDisabled: BooleanInput;

  @Input() nzChecked?: boolean;
  @Input() nzIndeterminate?: boolean;
  @Input() @InputBoolean() nzDisabled?: boolean;
  @Output() readonly nzClick = new EventEmitter<MouseEvent>();

  constructor(
    private ngZone: NgZone,
    private ref: ChangeDetectorRef,
    private host: ElementRef<HTMLElement>,
    private destroy$: NzDestroyService
  ) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() =>
      fromEvent<MouseEvent>(this.host.nativeElement, 'click')
        .pipe(takeUntil(this.destroy$))
        .subscribe((event: MouseEvent) => {
          if (!this.nzDisabled && this.nzClick.observers.length) {
            this.ngZone.run(() => {
              this.nzClick.emit(event);
              this.ref.markForCheck();
            });
          }
        })
    );
  }
}
