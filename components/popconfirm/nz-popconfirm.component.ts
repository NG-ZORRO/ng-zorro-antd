import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Host,
  Input,
  Optional,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { zoomBigMotion } from '../core/animation/zoom';
import { NzNoAnimationDirective } from '../core/no-animation/nz-no-animation.directive';
import { InputBoolean } from '../core/util/convert';
import { NzToolTipComponent } from '../tooltip/nz-tooltip.component';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  selector           : 'nz-popconfirm',
  preserveWhitespaces: false,
  animations         : [ zoomBigMotion ],
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
  @Input() nzIcon: string | TemplateRef<void>;

  @Output() readonly nzOnCancel: EventEmitter<void> = new EventEmitter();
  @Output() readonly nzOnConfirm: EventEmitter<void> = new EventEmitter();

  constructor(cdr: ChangeDetectorRef, @Host() @Optional() public noAnimation?: NzNoAnimationDirective) {
    super(cdr, noAnimation);
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
