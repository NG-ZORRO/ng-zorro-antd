/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzTableStyleService } from '../table-style.service';

@Component({
  selector: 'tr[nz-table-fixed-row], tr[nzExpand]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <td class="nz-disable-td ant-table-cell" #tdElement>
      @if (enableAutoMeasure$ | async) {
        <div
          class="ant-table-expanded-row-fixed"
          style="position: sticky; left: 0; overflow: hidden;"
          [style.width.px]="hostWidth$ | async"
        >
          <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
        </div>
      } @else {
        <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
      }
    </td>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
  imports: [AsyncPipe, NgTemplateOutlet]
})
export class NzTableFixedRowComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tdElement', { static: true }) tdElement!: ElementRef;
  hostWidth$ = new BehaviorSubject<number | null>(null);
  enableAutoMeasure$ = new BehaviorSubject<boolean>(false);
  private destroy$ = new Subject<boolean>();

  constructor(
    private nzTableStyleService: NzTableStyleService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    if (this.nzTableStyleService) {
      const { enableAutoMeasure$, hostWidth$ } = this.nzTableStyleService;
      enableAutoMeasure$.pipe(takeUntil(this.destroy$)).subscribe(this.enableAutoMeasure$);
      hostWidth$.pipe(takeUntil(this.destroy$)).subscribe(this.hostWidth$);
    }
  }

  ngAfterViewInit(): void {
    this.nzTableStyleService.columnCount$.pipe(takeUntil(this.destroy$)).subscribe(count => {
      this.renderer.setAttribute(this.tdElement.nativeElement, 'colspan', `${count}`);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
