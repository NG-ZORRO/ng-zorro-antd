/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { isNotNil, InputBoolean, NzUpdateHostClassService } from 'ng-zorro-antd/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'td:not(.nz-disable-td):not([mat-cell])',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NzUpdateHostClassService],
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './nz-td.component.html',
  host: {
    '[style.left]': 'nzLeft',
    '[style.right]': 'nzRight',
    '[style.text-align]': 'nzAlign',
    '[style.word-break]': `nzBreakWord ? 'break-all' : ''`
  }
})
export class NzTdComponent implements OnChanges {
  @Input() nzChecked = false;
  @Input() nzDisabled = false;
  @Input() nzIndeterminate = false;
  @Input() nzLeft: string;
  @Input() nzRight: string;
  @Input() nzAlign: 'left' | 'right' | 'center';
  @Input() nzIndentSize: number;
  @Input() @InputBoolean() nzExpand = false;
  @Input() @InputBoolean() nzShowExpand = false;
  @Input() @InputBoolean() nzShowCheckbox = false;
  @Input() @InputBoolean() nzBreakWord = false;
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();
  @Output() readonly nzExpandChange = new EventEmitter<boolean>();

  expandChange(e: Event): void {
    e.stopPropagation();
    this.nzExpand = !this.nzExpand;
    this.nzExpandChange.emit(this.nzExpand);
  }

  setClassMap(): void {
    this.nzUpdateHostClassService.updateHostClass(this.elementRef.nativeElement, {
      [`ant-table-row-expand-icon-cell`]: this.nzShowExpand && !isNotNil(this.nzIndentSize),
      [`ant-table-selection-column`]: this.nzShowCheckbox,
      [`ant-table-td-left-sticky`]: isNotNil(this.nzLeft),
      [`ant-table-td-right-sticky`]: isNotNil(this.nzRight)
    });
  }

  constructor(private elementRef: ElementRef, private nzUpdateHostClassService: NzUpdateHostClassService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzIndentSize || changes.nzShowExpand || changes.nzShowCheckbox || changes.nzRight || changes.nzLeft) {
      this.setClassMap();
    }
  }
}
