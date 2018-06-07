import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { fadeAnimation } from '../core/animation/fade-animations';
import { toBoolean } from '../core/util/convert';
import { NzToolTipComponent } from '../tooltip/nz-tooltip.component';

@Component({
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
  _condition = false;
  _prefix = 'ant-popover-placement';
  _trigger = 'click';
  _hasBackdrop = true;
  @Output() nzOnCancel: EventEmitter<void> = new EventEmitter();
  @Output() nzOnConfirm: EventEmitter<void> = new EventEmitter();

  @Input() nzOkText: string;
  @Input() nzOkType: string = 'primary';
  @Input() nzCancelText: string;

  @Input()
  set nzCondition(value: boolean) {
    this._condition = toBoolean(value);
  }

  get nzCondition(): boolean {
    return this._condition;
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

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

}
