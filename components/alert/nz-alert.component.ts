import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';

// tslint:disable-next-line:no-any
export type NgClassType = string | string[] | Set<string> | { [klass: string]: any; };

import { fadeAnimation } from '../core/animation/fade-animations';
import { toBoolean } from '../core/util/convert';

@Component({
  selector           : 'nz-alert',
  animations         : [ fadeAnimation ],
  preserveWhitespaces: false,
  template           : `
    <div [ngClass]="outerClassMap" *ngIf="display" [@fadeAnimation]>
      <ng-container *ngIf="nzShowIcon">
        <i class="ant-alert-icon" [ngClass]="nzIconType" *ngIf="nzIconType; else iconTemplate"></i>
        <ng-template #iconTemplate>
          <i class="ant-alert-icon anticon" [ngClass]="iconClassMap">
          </i>
        </ng-template>
      </ng-container>
      <span class="ant-alert-message" *ngIf="nzMessage">
        <ng-container *ngIf="isMessageString; else messageTemplate">{{ nzMessage }}</ng-container>
        <ng-template #messageTemplate>
          <ng-template [ngTemplateOutlet]="nzMessage"></ng-template>
        </ng-template>
      </span>
      <span class="ant-alert-description" *ngIf="nzDescription">
        <ng-container *ngIf="isDescriptionString; else descriptionTemplate">{{ nzDescription }}</ng-container>
        <ng-template #descriptionTemplate>
          <ng-template [ngTemplateOutlet]="nzDescription"></ng-template>
        </ng-template>
      </span>
      <a
        *ngIf="nzCloseable || nzCloseText"
        (click)="closeAlert($event)"
        class="ant-alert-close-icon">
        <ng-template #closeDefaultTemplate>
          <i class="anticon anticon-cross"></i>
        </ng-template>
        <ng-container *ngIf="nzCloseText; else closeDefaultTemplate">
          <ng-container *ngIf="isCloseTextString; else closeTextTemplate">{{ nzCloseText }}</ng-container>
          <ng-template #closeTextTemplate>
            <ng-template [ngTemplateOutlet]="nzCloseText"></ng-template>
          </ng-template>
        </ng-container>
      </a>
    </div>
  `,
  styles             : [
      `:host {
      display: block;
    }`
  ]
})
export class NzAlertComponent implements OnInit {
  private _banner = false;
  private _closeable = false;
  private _showIcon = false;
  private _type = 'info';
  private _description: string | TemplateRef<void>;
  private _message: string | TemplateRef<void>;
  private _closeText: string | TemplateRef<void>;
  display = true;
  isTypeSet = false;
  isShowIconSet = false;
  prefixClass = 'ant-alert';
  isDescriptionString: boolean;
  isMessageString: boolean;
  isCloseTextString: boolean;
  outerClassMap;
  iconClassMap;
  @Output() nzOnClose: EventEmitter<boolean> = new EventEmitter();
  @Input() nzIconType: NgClassType;

  @Input()
  set nzDescription(value: string | TemplateRef<void>) {
    this.isDescriptionString = !(value instanceof TemplateRef);
    this._description = value;
    this.updateOuterClassMap();
    this.updateIconClassMap();
  }

  get nzDescription(): string | TemplateRef<void> {
    return this._description;
  }

  @Input()
  set nzCloseText(value: string | TemplateRef<void>) {
    this.isCloseTextString = !(value instanceof TemplateRef);
    this._closeText = value;
  }

  get nzCloseText(): string | TemplateRef<void> {
    return this._closeText;
  }

  @Input()
  set nzMessage(value: string | TemplateRef<void>) {
    this.isMessageString = !(value instanceof TemplateRef);
    this._message = value;
  }

  get nzMessage(): string | TemplateRef<void> {
    return this._message;
  }

  @Input()
  set nzType(value: string) {
    this._type = value;
    this.isTypeSet = true;
    this.updateOuterClassMap();
    this.updateIconClassMap();
  }

  get nzType(): string {
    return this._type;
  }

  @Input()
  set nzBanner(value: boolean) {
    this._banner = toBoolean(value);
    if (!this.isTypeSet) {
      this.nzType = 'warning';
    }
    if (!this.isShowIconSet) {
      this.nzShowIcon = true;
    }
    this.updateOuterClassMap();
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
    this.isShowIconSet = true;
    this.updateOuterClassMap();
  }

  get nzShowIcon(): boolean {
    return this._showIcon;
  }

  closeAlert(): void {
    this.display = false;
    this.nzOnClose.emit(true);
  }

  updateOuterClassMap(): void {
    this.outerClassMap = {
      [ `${this.prefixClass}` ]                 : true,
      [ `${this.prefixClass}-${this.nzType}` ]  : true,
      [ `${this.prefixClass}-no-icon` ]         : !this.nzShowIcon,
      [ `${this.prefixClass}-banner` ]          : this.nzBanner,
      [ `${this.prefixClass}-with-description` ]: !!this.nzDescription
    };
  }

  updateIconClassMap(): void {
    this.iconClassMap = {
      'anticon-cross-circle-o'      : this.nzDescription && this.nzType === 'error',
      'anticon-check-circle-o'      : this.nzDescription && this.nzType === 'success',
      'anticon-info-circle-o'       : this.nzDescription && this.nzType === 'info',
      'anticon-exclamation-circle-o': this.nzDescription && this.nzType === 'warning',
      'anticon-cross-circle'        : (!this.nzDescription) && this.nzType === 'error',
      'anticon-check-circle'        : (!this.nzDescription) && this.nzType === 'success',
      'anticon-info-circle'         : (!this.nzDescription) && this.nzType === 'info',
      'anticon-exclamation-circle'  : (!this.nzDescription) && this.nzType === 'warning'
    };
  }

  ngOnInit(): void {
    this.updateIconClassMap();
    this.updateOuterClassMap();
  }
}
