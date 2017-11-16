import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  Input
} from '@angular/core';
import { NzMessageDataFilled, NzMessageDataOptions } from './nz-message.definitions';
import { NzMessageContainerComponent } from './nz-message-container.component';
import { NzMessageConfig } from './nz-message-config';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
@Component({
  selector     : 'nz-message',
  encapsulation: ViewEncapsulation.None,
  animations   : [
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
      ]),
    ])
  ],
  template     : `
    <div class="ant-message-notice"
      [@enterLeave]="nzMessage.state"
      (mouseenter)="onEnter()"
      (mouseleave)="onLeave()">
      <div class="ant-message-notice-content">
        <div *ngIf="!nzMessage.html" class="ant-message-custom-content" [ngClass]="'ant-message-' + nzMessage.type">
          <ng-container [ngSwitch]="nzMessage.type">
            <i *ngSwitchCase="'success'" class="anticon anticon-check-circle"></i>
            <i *ngSwitchCase="'info'" class="anticon anticon-info-circle"></i>
            <i *ngSwitchCase="'warning'" class="anticon anticon-exclamation-circle"></i>
            <i *ngSwitchCase="'error'" class="anticon anticon-cross-circle"></i>
            <i *ngSwitchCase="'loading'" class="anticon anticon-spin anticon-loading"></i>
          </ng-container>
          <span>{{nzMessage.content}}</span>
        </div>
        <div *ngIf="nzMessage.html" [innerHTML]="nzMessage.html"></div>
      </div>
    </div>
  `,
  styleUrls    : [
    './style/index.less'
  ]
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

  constructor(private _messageContainer: NzMessageContainerComponent) { }

  ngOnInit() {
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

  ngOnDestroy() {
    if (this._autoErase) {
      this._clearEraseTimeout();
    }
  }

  onEnter() {
    if (this._autoErase && this._options.nzPauseOnHover) {
      this._clearEraseTimeout();
      this._updateTTL();
    }
  }

  onLeave() {
    if (this._autoErase && this._options.nzPauseOnHover) {
      this._startEraseTimeout();
    }
  }

  // Remove self
  protected _destroy() {
    if (this._options.nzAnimate) {
      this.nzMessage.state = 'leave';
      setTimeout(() => this._messageContainer.removeMessage(this.nzMessage.messageId), 200);
    } else {
      this._messageContainer.removeMessage(this.nzMessage.messageId);
    }
  }

  private _initErase() {
    this._eraseTTL = this._options.nzDuration;
    this._eraseTimingStart = Date.now();
  }

  private _updateTTL() {
    if (this._autoErase) {
      this._eraseTTL -= Date.now() - this._eraseTimingStart;
    }
  }

  private _startEraseTimeout() {
    if (this._eraseTTL > 0) {
      this._clearEraseTimeout(); // To prevent calling _startEraseTimeout() more times to create more timer
      this._eraseTimer = window.setTimeout(() => this._destroy(), this._eraseTTL);
      this._eraseTimingStart = Date.now();
    } else {
      this._destroy();
    }
  }

  private _clearEraseTimeout() {
    if (this._eraseTimer !== null) {
      window.clearTimeout(this._eraseTimer);
      this._eraseTimer = null;
    }
  }
}
