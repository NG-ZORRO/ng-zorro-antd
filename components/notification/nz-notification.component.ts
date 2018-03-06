import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component } from '@angular/core';

import { NzMessageComponent } from '../message/nz-message.component';

import { NzNotificationContainerComponent } from './nz-notification-container.component';

@Component({
  selector           : 'nz-notification',
  preserveWhitespaces: false,
  animations         : [
    trigger('enterLeave', [
      state('enterRight', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('* => enterRight', [
        style({ opacity: 0, transform: 'translateX(5%)' }),
        animate('100ms linear')
      ]),
      state('enterLeft', style({ opacity: 1, transform: 'translateX(0)' })),
      transition('* => enterLeft', [
        style({ opacity: 0, transform: 'translateX(-5%)' }),
        animate('100ms linear')
      ]),
      state('leave', style({
        opacity        : 0,
        transform      : 'scaleY(0.8)',
        transformOrigin: '0% 0%'
      })),
      transition('* => leave', [
        style({
          opacity        : 1,
          transform      : 'scaleY(1)',
          transformOrigin: '0% 0%'
        }),
        animate('100ms linear')
      ])
    ])
  ],
  template           : `
    <div class="ant-notification-notice ant-notification-notice-closable"
      [ngStyle]="nzMessage.options.nzStyle"
      [ngClass]="nzMessage.options.nzClass"
      [@enterLeave]="state"
      (mouseenter)="onEnter()"
      (mouseleave)="onLeave()">
      <div *ngIf="!nzMessage.template" class="ant-notification-notice-content">
        <div class="ant-notification-notice-content" [ngClass]="{ 'ant-notification-notice-with-icon': nzMessage.type !== 'blank' }">
          <div [class.ant-notification-notice-with-icon]="nzMessage.type !== 'blank'">
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
      </div>
      <ng-template [ngIf]="nzMessage.template" [ngTemplateOutlet]="nzMessage.template" [ngTemplateOutletContext]="{ $implicit: this }"></ng-template>
      <a tabindex="0" class="ant-notification-notice-close" (click)="close()">
        <span class="ant-notification-notice-close-x"></span>
      </a>
    </div>
  `
})
export class NzNotificationComponent extends NzMessageComponent {
  constructor(private container: NzNotificationContainerComponent) {
    super(container);
  }

  close(): void {
    this._destroy();
  }

  get state(): string {
    if (this.nzMessage.state === 'enter') {
      if ((this.container.config.nzPlacement === 'topLeft') || (this.container.config.nzPlacement === 'bottomLeft')) {
        return 'enterLeft';
      } else {
        return 'enterRight';
      }
    } else {
      return this.nzMessage.state;
    }

  }
}
