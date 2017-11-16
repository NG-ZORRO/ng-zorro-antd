import {
  Component,
  ViewEncapsulation,
  Input
} from '@angular/core';
import { FadeAnimation } from '../core/animation/fade-animations';
import { NzToolTipComponent } from '../tooltip/nz-tooltip.component';
@Component({
  selector     : 'nz-popover',
  encapsulation: ViewEncapsulation.None,
  animations   : [
    FadeAnimation
  ],
  template     : `
    <ng-content></ng-content>
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="overlayOrigin"
      [cdkConnectedOverlayHasBackdrop]="_hasBackdrop"
      (backdropClick)="hide()"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayOpen]="visible$ | async">
      <div class="ant-popover" [ngClass]="_classMap" [ngStyle]="nzOverlayStyle" [@fadeAnimation]="''+(visible$ | async)"
        (@fadeAnimation.done)="_afterVisibilityAnimation($event)">
        <div class="ant-popover-content">
          <div class="ant-popover-arrow"></div>
          <div class="ant-popover-inner">
            <div class="ant-popover-title" *ngIf="nzTitle" [innerHTML]="nzTitle"></div>
            <div class="ant-popover-inner-content">
              <span *ngIf="!nzTemplate">{{nzContent}}</span>
              <ng-template
                *ngIf="nzTemplate"
                [ngTemplateOutlet]="nzTemplate">
              </ng-template>
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
export class NzPopoverComponent extends NzToolTipComponent {
  _prefix = 'ant-popover-placement';
  @Input() nzContent;
}
