import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  QueryList,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { InputBoolean, InputNumber } from '../core/util';
import { NzDescriptionItemRenderProps, NzDescriptionListSize } from './nz-descriptions-definition';
import { NzDescriptionsItemComponent } from './nz-descriptions-item.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation  : ViewEncapsulation.None,
  selector       : 'nz-descriptions',
  templateUrl    : './nz-descriptions.component.html',
  host           : {
    'class'         : 'ant-descriptions',
    '[class.border]': 'nzBorder',
    '[class.middle]': 'nzSize === "middle"',
    '[class.small]' : 'nzSize === "small"'
  },
  styles         : [ `
    nz-descriptions {
      display: block;
    }
  ` ]
})
export class NzDescriptionsComponent implements OnDestroy, AfterContentInit {
  @ContentChildren(NzDescriptionsItemComponent) items: QueryList<NzDescriptionsItemComponent>;
  @Input() @InputBoolean() nzBorder = false;
  @Input() @InputNumber() nzColumn = 3;
  @Input() nzSize: NzDescriptionListSize = 'small';
  @Input() nzTitle: string | TemplateRef<void> = '';

  itemMatrix: NzDescriptionItemRenderProps[][] = [];

  private destroy$ = new Subject<void>();

  constructor(private cdr: ChangeDetectorRef) {
  }

  ngAfterContentInit(): void {
    this.items.changes.pipe(
      startWith(this.items),
      takeUntil(this.destroy$)
    ).subscribe(items => {
      this.prepareMatrix(items.toArray());
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Prepare the render matrix according to description items' spans.
   */
  private prepareMatrix(items: NzDescriptionsItemComponent[]): void {
    let currentRow: NzDescriptionItemRenderProps[] = [];
    let width = 0;
    const matrix: NzDescriptionItemRenderProps[][] = [];
    const flushRow = () => {
      matrix.push(currentRow);
      currentRow = [];
      width = 0;
    };

    items.forEach(item => {
      const { nzTitle: title, content, nzSpan: span } = item;

      currentRow.push({ title, content, span });
      width += span;

      // If the last item make the row's length exceeds `nzColumn`, the last
      // item should take all the space left. This logic is implemented in the template.
      // Warn user about that.
      if (width >= this.nzColumn) {
        if (width > this.nzColumn) {
          console.warn(`"nzColumn" is ${this.nzColumn} but we have row length ${width}`);
        }
        flushRow();
      }
    });

    if (currentRow.length) {
      flushRow();
    }

    this.itemMatrix = matrix;
  }
}
