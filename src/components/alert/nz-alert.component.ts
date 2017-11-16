import {
  Component,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter, OnChanges, OnInit
} from '@angular/core';
import { FadeAnimation } from '../core/animation/fade-animations';

@Component({
  selector     : 'nz-alert',
  encapsulation: ViewEncapsulation.None,
  animations   : [ FadeAnimation ],
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
        <span class="ant-alert-message">{{nzMessage}}</span>
      </ng-template>
      <ng-template [ngIf]="!nzMessage">
        <ng-content select="[alert-body]"></ng-content>
      </ng-template>
      <ng-template [ngIf]="nzDescription">
        <span class="ant-alert-description">{{nzDescription}}</span>
      </ng-template>
      <ng-template [ngIf]="!nzDescription">
        <ng-content select="alert-description"></ng-content>
      </ng-template>
      <ng-template [ngIf]="nzCloseable || nzCloseText">
        <a *ngIf="nzCloseable" (click)="closeAlert($event)" class="ant-alert-close-icon">
          <i class="anticon anticon-cross"></i>
        </a>
        <a *ngIf="nzCloseText" class="ant-alert-close-icon" (click)="closeAlert()">{{nzCloseText}}</a>
      </ng-template>
    </div>
  `,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})

export class NzAlertComponent implements OnChanges {
  _display = true;
  antAlert = 'ant-alert';
  @Input() nzType = 'info';
  @Input() nzBanner = false;
  @Input() nzCloseable = false;
  @Input() nzDescription: string;
  @Input() nzShowIcon = false;
  @Input() nzCloseText: string;
  @Input() nzMessage: string;
  @Output() nzOnClose: EventEmitter<boolean> = new EventEmitter();
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

  ngOnChanges() {
    this._classMap = {
      [`${this.antAlert}`]                 : true,
      [`${this.antAlert}-${this.nzType}`]  : true,
      [`${this.antAlert}-no-icon`]         : !this.nzShowIcon,
      [`${this.antAlert}-banner`]          : this.nzBanner,
      [`${this.antAlert}-with-description`]: !!this.nzDescription
    };
  }

  constructor() {
  }

}
