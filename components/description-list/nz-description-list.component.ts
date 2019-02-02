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
import { NzDescriptionItemRenderProps, NzDescriptionListSize } from './nz-description-list-definition';
import { NzDescriptionListItemComponent } from './nz-description-list-item.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation  : ViewEncapsulation.None,
  selector       : 'nz-description-list',
  templateUrl    : './nz-description-list.component.html',
  host           : {
    'class'                              : 'ant-description-list',
    '[class.border]'                     : 'nzBorder',
    '[class.ant-description-list-middle]': 'nzSize === "middle"',
    '[class.ant-description-list-small]' : 'nzSize === "small"'
  },
  styles         : [ `
    nz-description-list {
      display: block;
    }
  ` ]
})
export class NzDescriptionListComponent implements OnDestroy, AfterContentInit {
  @ContentChildren(NzDescriptionListItemComponent) items: QueryList<NzDescriptionListItemComponent>;
  @Input() @InputBoolean() nzBorder = false;
  @Input() @InputNumber() nzColumn = 3;
  @Input() nzSize: NzDescriptionListSize = 'default';
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
  private prepareMatrix(items: NzDescriptionListItemComponent[]): void {
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
