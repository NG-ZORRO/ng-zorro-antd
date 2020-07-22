/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

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
      <div
        class="ant-table-expanded-row-fixed"
        *ngIf="enableAutoMeasure$ | async; else contentTemplate"
        style="position: sticky; left: 0px; overflow: hidden;"
        [style.width.px]="hostWidth$ | async"
      >
        <ng-template [ngTemplateOutlet]="contentTemplate"></ng-template>
      </div>
    </td>
    <ng-template #contentTemplate><ng-content></ng-content></ng-template>
  `
})
export class NzTableFixedRowComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('tdElement') tdElement!: ElementRef;
  hostWidth$ = new BehaviorSubject<number | null>(null);
  enableAutoMeasure$ = new BehaviorSubject<boolean>(false);
  private destroy$ = new Subject();
  constructor(private nzTableStyleService: NzTableStyleService, private renderer: Renderer2) {}
  ngOnInit(): void {
    if (this.nzTableStyleService) {
      const { enableAutoMeasure$, hostWidth$ } = this.nzTableStyleService;
      enableAutoMeasure$.subscribe(this.enableAutoMeasure$);
      hostWidth$.subscribe(this.hostWidth$);
    }
  }
  ngAfterViewInit(): void {
    this.nzTableStyleService.columnCount$.pipe(takeUntil(this.destroy$)).subscribe(count => {
      this.renderer.setAttribute(this.tdElement.nativeElement, 'colspan', `${count}`);
    });
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
