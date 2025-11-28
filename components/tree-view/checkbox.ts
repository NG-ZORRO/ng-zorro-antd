/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnInit,
  booleanAttribute,
  inject,
  DestroyRef,
  input,
  output
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';

@Component({
  selector: 'nz-tree-node-checkbox:not([builtin])',
  template: `<span class="ant-tree-checkbox-inner"></span>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ant-tree-checkbox',
    '[class.ant-tree-checkbox-checked]': `nzChecked()`,
    '[class.ant-tree-checkbox-indeterminate]': `nzIndeterminate()`,
    '[class.ant-tree-checkbox-disabled]': `nzDisabled()`
  }
})
export class NzTreeNodeCheckboxComponent implements OnInit {
  readonly nzChecked = input(false, { transform: booleanAttribute });
  readonly nzIndeterminate = input(false, { transform: booleanAttribute });
  readonly nzDisabled = input(false, { transform: booleanAttribute });
  readonly nzClick = output<MouseEvent>();

  protected readonly cdr = inject(ChangeDetectorRef);
  protected readonly destroyRef = inject(DestroyRef);
  protected readonly elementRef = inject(ElementRef);
  protected readonly ngZone = inject(NgZone);

  ngOnInit(): void {
    fromEventOutsideAngular<MouseEvent>(this.elementRef.nativeElement, 'click')
      .pipe(
        filter(() => !this.nzDisabled()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event: MouseEvent) => {
        this.ngZone.run(() => {
          this.nzClick.emit(event);
        });
      });
  }
}
