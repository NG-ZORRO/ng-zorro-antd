import {
  Component,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  ContentChild
} from '@angular/core';
import { NzPopconfirmDirective } from './nz-popconfirm.directive';
import { FadeAnimation } from '../core/animation/fade-animations';
import { NzToolTipComponent } from '../tooltip/nz-tooltip.component';

@Component({
  selector     : 'nz-popconfirm',
  encapsulation: ViewEncapsulation.None,
  animations   : [
    FadeAnimation
  ],
  template     : `
    <ng-content></ng-content>
    <ng-template
      nz-connected-overlay
      [origin]="nzOrigin"
      [hasBackdrop]="_hasBackdrop"
      (backdropClick)="hide()"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
      [positions]="_positions"
      [open]="visible$ | async">
      <div class="ant-popover" [ngClass]="_classMap" [ngStyle]="nzOverlayStyle" [@fadeAnimation]="''+(visible$ | async)"
        (@fadeAnimation.done)="_afterVisibilityAnimation($event)">
        <div class="ant-popover-content">
          <div class="ant-popover-arrow"></div>
          <div class="ant-popover-inner">
            <div>
              <div class="ant-popover-inner-content">
                <div class="ant-popover-message" *ngIf="!nzTemplate">
                  <i class="anticon anticon-exclamation-circle"></i>
                  <div class="ant-popover-message-title">{{nzTitle}}</div>
                </div>
                <div class="ant-popover-buttons" *ngIf="!nzTemplate">
                  <button nz-button [nzSize]="'small'" (click)="onCancel()"><span>{{nzCancelText}}</span></button>
                  <button nz-button [nzSize]="'small'" [nzType]="'primary'" (click)="onConfirm()">
                    <span>{{nzOkText}}</span></button>
                </div>
                <ng-template
                  *ngIf="nzTemplate"
                  [ngTemplateOutlet]="nzTemplate">
                </ng-template>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ng-template>`,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzPopconfirmComponent extends NzToolTipComponent {
  _prefix = 'ant-popover-placement';
  _trigger = 'click';
  _hasBackdrop = true;
  _condition = false;
  @Input() nzContent;
  @Input() nzOkText = '确定';
  @Input() nzCancelText = '取消';

  @Input() set nzCondition(value) {
    this._condition = value;
  }

  get nzCondition() {
    return this._condition;
  }

  @Output() nzOnCancel: EventEmitter<any> = new EventEmitter();
  @Output() nzOnConfirm: EventEmitter<any> = new EventEmitter();
  @ContentChild(NzPopconfirmDirective) nzOrigin;


  show(): void {
    if (!this._condition) {
      this.nzVisible = true;
    } else {
      this.onConfirm();
    }
  }

  onCancel() {
    this.nzOnCancel.emit();
    this.nzVisible = false;
  }

  onConfirm() {
    this.nzOnConfirm.emit();
    this.nzVisible = false;
  }
}
