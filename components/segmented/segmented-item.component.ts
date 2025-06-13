/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzSegmentedService } from './segmented.service';

@Component({
  selector: 'label[nz-segmented-item],label[nzSegmentedItem]',
  exportAs: 'nzSegmentedItem',
  imports: [NzIconModule, NgTemplateOutlet],
  template: `
    <input class="ant-segmented-item-input" type="radio" [checked]="isChecked" (click)="$event.stopPropagation()" />
    <div class="ant-segmented-item-label">
      @if (nzIcon) {
        <span class="ant-segmented-item-icon"><nz-icon [nzType]="nzIcon" /></span>
        <span>
          <ng-template [ngTemplateOutlet]="content" />
        </span>
      } @else {
        <ng-template [ngTemplateOutlet]="content" />
      }
    </div>

    <ng-template #content>
      <ng-content></ng-content>
    </ng-template>
  `,
  host: {
    class: 'ant-segmented-item',
    '[class.ant-segmented-item-selected]': 'isChecked',
    '[class.ant-segmented-item-disabled]': 'nzDisabled || parentDisabled()',
    '(click)': 'handleClick()'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzSegmentedItemComponent implements OnInit {
  private readonly service = inject(NzSegmentedService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly elementRef = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);

  @Input() nzIcon?: string;
  @Input() nzValue!: string | number;
  @Input() nzDisabled?: boolean;

  protected isChecked = false;
  readonly parentDisabled = toSignal(this.service.disabled$, { initialValue: false });

  ngOnInit(): void {
    this.service.selected$
      .pipe(
        tap(value => {
          this.isChecked = false;
          this.cdr.markForCheck();
          if (value === this.nzValue) {
            this.service.activated$.next(this.elementRef.nativeElement);
          }
        }),
        switchMap(value =>
          this.service.animationDone$.pipe(
            filter(event => event.toState === 'to'),
            take(1),
            map(() => value)
          )
        ),
        filter(value => value === this.nzValue),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.isChecked = true;
        this.cdr.markForCheck();
      });
  }

  handleClick(): void {
    if (!this.nzDisabled && !this.parentDisabled()) {
      this.service.selected$.next(this.nzValue);
      this.service.change$.next(this.nzValue);
    }
  }
}
