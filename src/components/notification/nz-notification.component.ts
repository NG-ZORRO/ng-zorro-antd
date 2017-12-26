import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, ViewEncapsulation } from '@angular/core';
import { NzMessageComponent } from '../message/nz-message.component';
import { NzNotificationContainerComponent } from './nz-notification-container.component';

@Component({
  selector     : 'nz-notification',
  encapsulation: ViewEncapsulation.None,
  animations   : [
    trigger('enterLeave', [
      state('enter', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('* => enter', [
        style({ opacity: 0, transform: 'translateX(5%)' }),
        animate('100ms linear')
      ]),
      state('leave', style({ opacity: 0, transform: 'translateY(-10%)' })),
      transition('* => leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('100ms linear')
      ]),
    ])
  ],
  template     : `
    <div class="ant-notification-notice ant-notification-notice-closable"
      [@enterLeave]="nzMessage.state"
      (mouseenter)="onEnter()"
      (mouseleave)="onLeave()">
      <div *ngIf="!nzMessage.html" class="ant-notification-notice-content">
        <div class="ant-notification-notice-content" [ngClass]="{ 'ant-notification-notice-with-icon': nzMessage.type !== 'blank' }">
          <ng-container [ngSwitch]="nzMessage.type">
            <i *ngSwitchCase="'success'" class="ant-notification-notice-icon ant-notification-notice-icon-success anticon anticon-check-circle-o"></i>
            <i *ngSwitchCase="'info'" class="ant-notification-notice-icon ant-notification-notice-icon-info anticon anticon-info-circle-o"></i>
            <i *ngSwitchCase="'warning'" class="ant-notification-notice-icon ant-notification-notice-icon-warning anticon anticon-exclamation-circle-o"></i>
            <i *ngSwitchCase="'error'" class="ant-notification-notice-icon ant-notification-notice-icon-error anticon anticon-cross-circle-o"></i>
          </ng-container>
          <div class="ant-notification-notice-message">{{ nzMessage.title }}</div>
          <div class="ant-notification-notice-description">{{ nzMessage.content }}</div>
        </div>
      </div>
      <div *ngIf="nzMessage.html" [innerHTML]="nzMessage.html"></div>
      <a tabindex="0" class="ant-notification-notice-close" (click)="onClickClose()">
        <span class="ant-notification-notice-close-x"></span>
      </a>
    </div>
  `,
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzNotificationComponent extends NzMessageComponent {
  constructor(container: NzNotificationContainerComponent) {
    super(container);
  }

  onClickClose(): void {
    this._destroy();
  }
}
