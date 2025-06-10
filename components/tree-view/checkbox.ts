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
  Output,
  booleanAttribute,
  inject,
  DestroyRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';

@Component({
  selector: 'nz-tree-node-checkbox:not([builtin])',
  template: `<span class="ant-tree-checkbox-inner"></span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ant-tree-checkbox',
    '[class.ant-tree-checkbox-checked]': `nzChecked`,
    '[class.ant-tree-checkbox-indeterminate]': `nzIndeterminate`,
    '[class.ant-tree-checkbox-disabled]': `nzDisabled`
  }
})
export class NzTreeNodeCheckboxComponent implements OnInit {
  private ngZone = inject(NgZone);
  private ref = inject(ChangeDetectorRef);
  private el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
  private destroyRef = inject(DestroyRef);

  @Input({ transform: booleanAttribute }) nzChecked?: boolean;
  @Input({ transform: booleanAttribute }) nzIndeterminate?: boolean;
  @Input({ transform: booleanAttribute }) nzDisabled?: boolean;
  @Output() readonly nzClick = new EventEmitter<MouseEvent>();

  ngOnInit(): void {
    fromEventOutsideAngular<MouseEvent>(this.el, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => {
        if (!this.nzDisabled && this.nzClick.observers.length) {
          this.ngZone.run(() => {
            this.nzClick.emit(event);
            this.ref.markForCheck();
          });
        }
      });
  }
}
