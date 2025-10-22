/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DOWN_ARROW, LEFT_ARROW, RIGHT_ARROW, UP_ARROW } from '@angular/cdk/keycodes';
import { NgTemplateOutlet } from '@angular/common';
import {
  booleanAttribute,
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  OnInit,
  signal,
  TemplateRef,
  viewChild,
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
    <input
      class="ant-segmented-item-input"
      type="radio"
      [disabled]="finalDisabled()"
      [checked]="isChecked()"
      [attr.name]="name()"
      (click)="$event.stopPropagation()"
    />
    <div class="ant-segmented-item-label" [attr.aria-selected]="isChecked()">
      @if (nzIcon(); as icon) {
        <span class="ant-segmented-item-icon">
          <nz-icon [nzType]="icon" />
        </span>
        @if (hasLabel()) {
          <span>
            <ng-template [ngTemplateOutlet]="content" />
          </span>
        }
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
    '[class.ant-segmented-item-selected]': 'isChecked()',
    '[class.ant-segmented-item-disabled]': 'finalDisabled()',
    '(click)': 'handleClick()',
    '(keydown)': 'handleKeydown($event)'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzSegmentedItemComponent implements OnInit {
  private readonly service = inject(NzSegmentedService);
  private readonly elementRef = inject(ElementRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly templateRef = viewChild.required('content', { read: TemplateRef });

  readonly nzValue = input.required<string | number>();
  readonly nzIcon = input<string>();
  readonly nzDisabled = input(false, { transform: booleanAttribute });
  readonly hasLabel = computed(() =>
    this.templateRef()
      .createEmbeddedView({})
      .rootNodes.some(node => node.textContent.trim().length > 0)
  );

  protected readonly name = this.service.name.asReadonly();
  protected readonly isChecked = signal(false);
  protected readonly parentDisabled = toSignal(this.service.disabled$, { initialValue: false });
  readonly finalDisabled = computed(() => this.nzDisabled() || this.parentDisabled());

  ngOnInit(): void {
    this.service.selected$
      .pipe(
        tap(value => {
          this.isChecked.set(false);
          if (value === this.nzValue()) {
            this.service.activated$.next(this.elementRef.nativeElement);
          }
        }),
        switchMap(value =>
          this.service.animationDone$.pipe(
            filter(event => event.toState === 'to' || event.toState === 'toVertical'),
            take(1),
            map(() => value)
          )
        ),
        filter(value => value === this.nzValue()),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => this.isChecked.set(true));
  }

  handleClick(): void {
    if (!this.nzDisabled() && !this.parentDisabled()) {
      this.service.selected$.next(this.nzValue());
      this.service.change$.next(this.nzValue());
    }
  }

  handleKeydown(event: KeyboardEvent): void {
    if (this.finalDisabled()) {
      return;
    }
    if (
      event.keyCode === LEFT_ARROW ||
      event.keyCode === RIGHT_ARROW ||
      event.keyCode === UP_ARROW ||
      event.keyCode === DOWN_ARROW
    ) {
      this.service.keydown$.next(event);
    }
  }
}
