import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { fadeAnimation } from '../core/animation/fade-animations';
import { toBoolean } from '../core/util/convert';
import { NzI18nService } from '../i18n/nz-i18n.service';
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
  private _condition = false;
  _prefix = 'ant-popover-placement';
  _trigger = 'click';
  _hasBackdrop = true;
  @Input() nzContent;
  @Input() nzOkText: string;
  @Input() nzCancelText: string;

  @Input()
  set nzCondition(value: boolean) {
    this._condition = toBoolean(value);
  }

  // get nzCondition(): boolean {
  //   return this._condition;
  // }

  @Output() nzOnCancel: EventEmitter<void> = new EventEmitter();
  @Output() nzOnConfirm: EventEmitter<void> = new EventEmitter();

  constructor(cdr: ChangeDetectorRef, private _locale: NzI18nService) {
    super(cdr);
  }

  show(): void {
    if (!this._condition) {
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
