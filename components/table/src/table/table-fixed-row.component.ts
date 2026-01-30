/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AsyncPipe, NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

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
          <ng-template [ngTemplateOutlet]="contentTemplate" />
        </div>
      } @else {
        <ng-template [ngTemplateOutlet]="contentTemplate" />
      }
    </td>
    <ng-template #contentTemplate>
      <ng-content />
    </ng-template>
  `,
  imports: [AsyncPipe, NgTemplateOutlet]
})
export class NzTableFixedRowComponent implements OnInit, AfterViewInit {
  private nzTableStyleService = inject(NzTableStyleService);
  private renderer = inject(Renderer2);
  private destroyRef = inject(DestroyRef);

  @ViewChild('tdElement', { static: true }) tdElement!: ElementRef;
  hostWidth$ = new BehaviorSubject<number | null>(null);
  enableAutoMeasure$ = new BehaviorSubject<boolean>(false);

  ngOnInit(): void {
    if (this.nzTableStyleService) {
      const { enableAutoMeasure$, hostWidth$ } = this.nzTableStyleService;
      enableAutoMeasure$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(this.enableAutoMeasure$);
      hostWidth$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(this.hostWidth$);
    }
  }

  ngAfterViewInit(): void {
    this.nzTableStyleService.columnCount$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(count => {
      this.renderer.setAttribute(this.tdElement.nativeElement, 'colspan', `${count}`);
    });
  }
}
