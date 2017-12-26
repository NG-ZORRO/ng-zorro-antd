import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { fadeAnimation } from '../core/animation/fade-animations';
import { toBoolean } from '../util/convert';

@Component({
  selector     : 'nz-alert',
  encapsulation: ViewEncapsulation.None,
  animations   : [ fadeAnimation ],
  template     : `
    <div [ngClass]="_classMap" *ngIf="_display" [@fadeAnimation]>
      <i
        class="ant-alert-icon anticon"
        [class.anticon-cross-circle-o]="nzType==='error'"
        [class.anticon-check-circle-o]="nzType==='success'"
        [class.anticon-info-circle-o]="nzType==='info'"
        [class.anticon-exclamation-circle-o]="nzType==='warning'"
        *ngIf="nzShowIcon&&nzDescription"></i>
      <i
        class="ant-alert-icon anticon"
        [class.anticon-cross-circle]="nzType==='error'"
        [class.anticon-check-circle]="nzType==='success'"
        [class.anticon-info-circle]="nzType==='info'"
        [class.anticon-exclamation-circle]="nzType==='warning'"
        *ngIf="nzShowIcon&&!nzDescription"></i>
      <ng-template [ngIf]="nzMessage">
        <span class="ant-alert-message">{{ nzMessage }}</span>
      </ng-template>
      <ng-template [ngIf]="!nzMessage">
        <ng-content select="[alert-body]"></ng-content>
      </ng-template>
      <ng-template [ngIf]="nzDescription">
        <span class="ant-alert-description">{{ nzDescription }}</span>
      </ng-template>
      <ng-template [ngIf]="!nzDescription">
        <ng-content select="alert-description"></ng-content>
      </ng-template>
      <ng-template [ngIf]="nzCloseable || nzCloseText">
        <a *ngIf="nzCloseable" (click)="closeAlert($event)" class="ant-alert-close-icon">
          <i class="anticon anticon-cross"></i>
        </a>
        <a *ngIf="nzCloseText" class="ant-alert-close-icon" (click)="closeAlert()">{{ nzCloseText }}</a>
      </ng-template>
    </div>
  `,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzAlertComponent implements OnChanges {
  private _banner = false;
  private _closeable = false;
  private _showIcon = false;
  _display = true;
  antAlert = 'ant-alert';
  @Input() nzType = 'info';
  @Input() nzDescription: string;
  @Input() nzCloseText: string;
  @Input() nzMessage: string;
  @Output() nzOnClose: EventEmitter<boolean> = new EventEmitter();

  @Input()
  set nzBanner(value: boolean) {
    this._banner = toBoolean(value);
  }

  get nzBanner(): boolean {
    return this._banner;
  }

  @Input()
  set nzCloseable(value: boolean) {
    this._closeable = toBoolean(value);
  }

  get nzCloseable(): boolean {
    return this._closeable;
  }

  @Input()
  set nzShowIcon(value: boolean) {
    this._showIcon = toBoolean(value);
  }

  get nzShowIcon(): boolean {
    return this._showIcon;
  }

  _classMap = {
    [`${this.antAlert}`]                 : true,
    [`${this.antAlert}-${this.nzType}`]  : true,
    [`${this.antAlert}-no-icon`]         : !this.nzShowIcon,
    [`${this.antAlert}-banner`]          : this.nzBanner,
    [`${this.antAlert}-with-description`]: !!this.nzDescription
  };

  closeAlert(): void {
    this._display = false;
    this.nzOnClose.emit(true);
  }

  ngOnChanges(): void {
    this._classMap = {
      [`${this.antAlert}`]                 : true,
      [`${this.antAlert}-${this.nzType}`]  : true,
      [`${this.antAlert}-no-icon`]         : !this.nzShowIcon,
      [`${this.antAlert}-banner`]          : this.nzBanner,
      [`${this.antAlert}-with-description`]: !!this.nzDescription
    };
  }
}
