import { ChangeDetectorRef, Component, Input, ViewEncapsulation } from '@angular/core';

import { notificationMotion } from '../core/animation/notification';
import { NzMessageComponent } from '../message/nz-message.component';

import { NzNotificationContainerComponent } from './nz-notification-container.component';
import { NzNotificationDataFilled } from './nz-notification.definitions';

@Component({
  encapsulation      : ViewEncapsulation.None,
  selector           : 'nz-notification',
  preserveWhitespaces: false,
  animations         : [ notificationMotion ],
  templateUrl        : './nz-notification.component.html'
})
export class NzNotificationComponent extends NzMessageComponent {
  @Input() nzMessage: NzNotificationDataFilled;

  constructor(private container: NzNotificationContainerComponent, protected cdr: ChangeDetectorRef) {
    super(container, cdr);
  }

  close(): void {
    this._destroy(true);
  }

  get state(): string | undefined {
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
