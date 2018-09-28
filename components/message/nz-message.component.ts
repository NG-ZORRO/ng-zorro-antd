import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';

import { NzMessageContainerComponent } from './nz-message-container.component';
import { NzMessageDataFilled, NzMessageDataOptions } from './nz-message.definitions';

@Component({
  selector           : 'nz-message',
  preserveWhitespaces: false,
  animations         : [
    trigger('enterLeave', [
      state('enter', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('* => enter', [
        style({ opacity: 0, transform: 'translateY(-50%)' }),
        animate('100ms linear')
      ]),
      state('leave', style({ opacity: 0, transform: 'translateY(-50%)' })),
      transition('* => leave', [
        style({ opacity: 1, transform: 'translateY(0)' }),
        animate('100ms linear')
      ])
    ])
  ],
  templateUrl         : './nz-message.component.html'
})
export class NzMessageComponent implements OnInit, OnDestroy {

  @Input() nzMessage: NzMessageDataFilled;
  @Input() nzIndex: number;

  protected _options: NzMessageDataOptions; // Shortcut reference to nzMessage.options

  // For auto erasing(destroy) self
  private _autoErase: boolean; // Whether record timeout to auto destroy self
  private _eraseTimer: number = null;
  private _eraseTimingStart: number;
  private _eraseTTL: number; // Time to live

  constructor(private _messageContainer: NzMessageContainerComponent) {
  }

  ngOnInit(): void {
    this._options = this.nzMessage.options;

    if (this._options.nzAnimate) {
      this.nzMessage.state = 'enter';
    }

    this._autoErase = this._options.nzDuration > 0;

    if (this._autoErase) {
      this._initErase();
      this._startEraseTimeout();
    }
  }

  ngOnDestroy(): void {
    if (this._autoErase) {
      this._clearEraseTimeout();
    }
  }

  onEnter(): void {
    if (this._autoErase && this._options.nzPauseOnHover) {
      this._clearEraseTimeout();
      this._updateTTL();
    }
  }

  onLeave(): void {
    if (this._autoErase && this._options.nzPauseOnHover) {
      this._startEraseTimeout();
    }
  }

  // Remove self
  protected _destroy(): void {
    if (this._options.nzAnimate) {
      this.nzMessage.state = 'leave';
      setTimeout(() => this._messageContainer.removeMessage(this.nzMessage.messageId), 200);
    } else {
      this._messageContainer.removeMessage(this.nzMessage.messageId);
    }
  }

  private _initErase(): void {
    this._eraseTTL = this._options.nzDuration;
    this._eraseTimingStart = Date.now();
  }

  private _updateTTL(): void {
    if (this._autoErase) {
      this._eraseTTL -= Date.now() - this._eraseTimingStart;
    }
  }

  private _startEraseTimeout(): void {
    if (this._eraseTTL > 0) {
      this._clearEraseTimeout(); // To prevent calling _startEraseTimeout() more times to create more timer
      this._eraseTimer = window.setTimeout(() => this._destroy(), this._eraseTTL);
      this._eraseTimingStart = Date.now();
    } else {
      this._destroy();
    }
  }

  private _clearEraseTimeout(): void {
    if (this._eraseTimer !== null) {
      window.clearTimeout(this._eraseTimer);
      this._eraseTimer = null;
    }
  }
}
