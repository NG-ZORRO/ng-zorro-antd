import {
  Component,
  ElementRef,
  Input,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { NzUpdateHostClassService } from '../core/services/update-host-class.service';

// tslint:disable-next-line:no-any
export type StepNgClassType = string | string[] | Set<string> | { [klass: string]: any; };

@Component({
  selector           : 'nz-step',
  providers          : [ NzUpdateHostClassService ],
  preserveWhitespaces: false,
  template           : `
    <div class="ant-steps-item-tail" *ngIf="last !== true"></div>
    <div class="ant-steps-item-icon">
      <ng-template [ngIf]="!showProcessDot">
        <span class="ant-steps-icon anticon anticon-check" *ngIf="nzStatus === 'finish' && !nzIcon"></span>
        <span class="ant-steps-icon anticon anticon-cross" *ngIf="nzStatus === 'error'"></span>
        <span class="ant-steps-icon" *ngIf="(nzStatus === 'process' || nzStatus === 'wait') && !nzIcon">{{ index + 1 }}</span>
        <span class="ant-steps-icon" *ngIf="nzIcon">
          <ng-container *ngIf="isIconString; else iconTemplate">
            <i [ngClass]="nzIcon"></i>
          </ng-container>
          <ng-template #iconTemplate>
          <ng-template [ngTemplateOutlet]="nzIcon"></ng-template>
        </ng-template>
        </span>
      </ng-template>
      <ng-template [ngIf]="showProcessDot">
        <span class="ant-steps-icon">
          <ng-template #processDotTemplate>
            <span class="ant-steps-icon-dot"></span>
          </ng-template>
          <ng-template [ngTemplateOutlet]="customProcessTemplate||processDotTemplate" [ngTemplateOutletContext]="{ $implicit: processDotTemplate, status:nzStatus, index:index }"></ng-template>
        </span>
      </ng-template>
    </div>
    <div class="ant-steps-item-content">
      <div class="ant-steps-item-title">
        <ng-container *ngIf="isTitleString; else titleTemplate">{{ nzTitle }}</ng-container>
        <ng-template #titleTemplate>
          <ng-template [ngTemplateOutlet]="nzTitle"></ng-template>
        </ng-template>
      </div>
      <div class="ant-steps-item-description">
        <ng-container *ngIf="isDescriptionString; else nzDescription">{{ nzDescription }}</ng-container>
        <ng-template #descriptionTemplate>
          <ng-template [ngTemplateOutlet]="nzDescription"></ng-template>
        </ng-template>
      </div>
    </div>
  `
})
export class NzStepComponent {
  private _status = 'wait';
  private _currentIndex = 0;
  private _description: string | TemplateRef<void>;
  private _icon: StepNgClassType | TemplateRef<void>;
  private _title: string | TemplateRef<void>;
  private el: HTMLElement;
  isCustomStatus = false;
  isDescriptionString = true;
  isTitleString = true;
  isIconString = true;
  last = false;
  showProcessDot = false;
  direction = 'horizontal';
  outStatus = 'process';
  index = 0;
  @ViewChild('processDotTemplate') processDotTemplate: TemplateRef<void>;
  customProcessTemplate: TemplateRef<{ $implicit: TemplateRef<void>, status: string, index: number }>;

  @Input()
  set nzTitle(value: string | TemplateRef<void>) {
    this.isTitleString = !(value instanceof TemplateRef);
    this._title = value;
  }

  get nzTitle(): string | TemplateRef<void> {
    return this._title;
  }

  @Input()
  set nzIcon(value: StepNgClassType | TemplateRef<void>) {
    this.isIconString = !(value instanceof TemplateRef);
    this._icon = value;
  }

  get nzIcon(): StepNgClassType | TemplateRef<void> {
    return this._icon;
  }

  @Input()
  set nzStatus(status: string) {
    this._status = status;
    this.isCustomStatus = true;
    this.updateClassMap();
  }

  get nzStatus(): string {
    return this._status;
  }

  @Input()
  set nzDescription(value: string | TemplateRef<void>) {
    this.isDescriptionString = !(value instanceof TemplateRef);
    this._description = value;
  }

  get nzDescription(): string | TemplateRef<void> {
    return this._description;
  }

  get currentIndex(): number {
    return this._currentIndex;
  }

  set currentIndex(current: number) {
    this._currentIndex = current;
    if (!this.isCustomStatus) {
      if (current > this.index) {
        this._status = 'finish';
      } else if (current === this.index) {
        if (this.outStatus) {
          this._status = this.outStatus;
        }
      } else {
        this._status = 'wait';
      }
    }
    this.updateClassMap();
  }

  updateClassMap(): void {
    const classMap = {
      [ 'ant-steps-item' ]        : true,
      [ `ant-steps-item-wait` ]   : this.nzStatus === 'wait',
      [ `ant-steps-item-process` ]: this.nzStatus === 'process',
      [ `ant-steps-item-finish` ] : this.nzStatus === 'finish',
      [ `ant-steps-item-error` ]  : this.nzStatus === 'error',
      [ 'ant-steps-custom' ]      : !!this.nzIcon,
      [ 'ant-steps-next-error' ]  : (this.outStatus === 'error') && (this.currentIndex === this.index + 1)
    };
    this.nzUpdateHostClassService.updateHostClass(this.el, classMap);
  }

  constructor(private elementRef: ElementRef, private nzUpdateHostClassService: NzUpdateHostClassService) {
    this.el = elementRef.nativeElement;
  }
}
