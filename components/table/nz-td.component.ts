import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';

import { isNotNil } from '../core/util/check';
import { InputBoolean, InputNumber } from '../core/util/convert';

@Component({
  // tslint:disable-next-line:component-selector
  selector           : 'td:not(.nz-disable-td)',
  changeDetection    : ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  encapsulation      : ViewEncapsulation.None,
  templateUrl        : './nz-td.component.html',
  host               : {
    '[style.left]' : 'nzLeft',
    '[style.right]': 'nzRight'
  }
})
export class NzTdComponent implements OnChanges {
  @Input() nzChecked = false;
  @Input() nzDisabled = false;
  @Input() nzIndeterminate = false;
  @Input() nzLeft: string;
  @Input() nzRight: string;
  @Input() @InputBoolean() nzExpand = false;
  @Input() @InputNumber() nzIndentSize: number;
  @Input() @InputBoolean() nzShowExpand = false;
  @Input() @InputBoolean() nzShowCheckbox = false;
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();
  @Output() readonly nzExpandChange = new EventEmitter<boolean>();

  expandChange(e: Event): void {
    e.stopPropagation();
    this.nzExpand = !this.nzExpand;
    this.nzExpandChange.emit(this.nzExpand);
  }

  setClassMap(): void {
    this.nzUpdateHostClassService.updateHostClass(this.elementRef.nativeElement, {
      [ `ant-table-row-expand-icon-cell` ]: this.nzShowExpand && !isNotNil(this.nzIndentSize),
      [ `ant-table-selection-column` ]    : this.nzShowCheckbox,
      [ `ant-table-td-left-sticky` ]      : isNotNil(this.nzLeft),
      [ `ant-table-td-right-sticky` ]     : isNotNil(this.nzRight)
    });
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private nzUpdateHostClassService: NzUpdateHostClassService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzIndentSize || changes.nzShowExpand || changes.nzShowCheckbox || changes.nzRight || changes.nzLeft) {
      this.setClassMap();
    }
  }
}
