import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, Input } from '@angular/core';

import { NzMessageComponent } from '../message/nz-message.component';

import { NzNotificationContainerComponent } from './nz-notification-container.component';
import { NzNotificationDataFilled } from './nz-notification.definitions';

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
  templateUrl         : './nz-notification.component.html'
})
export class NzNotificationComponent extends NzMessageComponent {
  @Input() nzMessage: NzNotificationDataFilled;

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
