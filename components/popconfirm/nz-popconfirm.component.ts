import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { fadeAnimation } from '../core/animation/fade-animations';
import { InputBoolean } from '../core/util/convert';
import { NzToolTipComponent } from '../tooltip/nz-tooltip.component';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  selector           : 'nz-popconfirm',
  preserveWhitespaces: false,
  animations         : [ fadeAnimation ],
  templateUrl        : './nz-popconfirm.component.html',
  styles             : [ `
    .ant-popover {
      position: relative;
    }
  ` ]
})
export class NzPopconfirmComponent extends NzToolTipComponent {
  _prefix = 'ant-popover-placement';
  _trigger = 'click';
  _hasBackdrop = true;

  @Input() nzOkText: string;
  @Input() nzOkType: string = 'primary';
  @Input() nzCancelText: string;
  @Input() @InputBoolean() nzCondition = false;

  @Output() readonly nzOnCancel: EventEmitter<void> = new EventEmitter();
  @Output() readonly nzOnConfirm: EventEmitter<void> = new EventEmitter();

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

  show(): void {
    if (!this.nzCondition) {
      this.nzVisible = true;
    } else {
      this.onConfirm();
    }
  }

  onCancel(): void {
    this.nzOnCancel.emit();
    this.nzVisible = false;
  }

  onConfirm(): void {
    this.nzOnConfirm.emit();
    this.nzVisible = false;
  }
}
