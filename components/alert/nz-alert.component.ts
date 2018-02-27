import { NgClass } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef
} from '@angular/core';

import { fadeAnimation } from '../core/animation/fade-animations';
import { toBoolean } from '../core/util/convert';

@Component({
  selector           : 'nz-alert',
  animations         : [ fadeAnimation ],
  preserveWhitespaces: false,
  template           : `
    <div [ngClass]="classMap" *ngIf="display" [@fadeAnimation]>
      <ng-container *ngIf="nzShowIcon">
        <i [ngClass]="nzIconType" *ngIf="nzIconType; else iconTemplate"></i>
        <ng-template #iconTemplate>
          <i
            class="ant-alert-icon anticon"
            [class.anticon-cross-circle-o]="nzType==='error'"
            [class.anticon-check-circle-o]="nzType==='success'"
            [class.anticon-info-circle-o]="nzType==='info'"
            [class.anticon-exclamation-circle-o]="nzType==='warning'">
          </i>
        </ng-template>
      </ng-container>
      <span class="ant-alert-message" *ngIf="nzMessage">
        <ng-container *ngIf="isMessageString; else nzMessage">{{ nzMessage }}</ng-container>
      </span>
      <span class="ant-alert-description" *ngIf="nzDescription">
        <ng-container *ngIf="isDescriptionString; else nzDescription">{{ nzDescription }}</ng-container>
      </span>
      <a
        *ngIf="nzCloseable || nzCloseText"
        (click)="closeAlert($event)"
        class="ant-alert-close-icon">
        <ng-template #closeTemplate>
          <i class="anticon anticon-cross"></i>
        </ng-template>
        <ng-container *ngIf="nzCloseText; else closeTemplate">
          <ng-container *ngIf="isCloseTextString; else nzCloseText">{{ nzCloseText }}</ng-container>
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
export class NzAlertComponent {
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
  classMap;
  @Output() nzOnClose: EventEmitter<boolean> = new EventEmitter();
  @Input() nzIconType: NgClass;

  @Input()
  set nzDescription(value: string | TemplateRef<void>) {
    this.isDescriptionString = !(value instanceof TemplateRef);
    this._description = value;
    this.updateClassMap();
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
    this.updateClassMap();
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
    this.updateClassMap();
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
    this.updateClassMap();
  }

  get nzShowIcon(): boolean {
    return this._showIcon;
  }

  closeAlert(): void {
    this.display = false;
    this.nzOnClose.emit(true);
  }

  updateClassMap(): void {
    this.classMap = {
      [ `${this.prefixClass}` ]                 : true,
      [ `${this.prefixClass}-${this.nzType}` ]  : true,
      [ `${this.prefixClass}-no-icon` ]         : !this.nzShowIcon,
      [ `${this.prefixClass}-banner` ]          : this.nzBanner,
      [ `${this.prefixClass}-with-description` ]: !!this.nzDescription
    };
  }
}
