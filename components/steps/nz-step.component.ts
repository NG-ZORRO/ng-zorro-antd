import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef,
  ViewChild
} from '@angular/core';

@Component({
  selector           : 'nz-step',
  preserveWhitespaces: false,
  template           : `
    <div class="ant-steps-item-tail" #stepsTail *ngIf="last !== true"></div>
    <div class="ant-steps-item-icon">
      <ng-template [ngIf]="!showProcessDot">
        <span class="ant-steps-icon anticon anticon-check" *ngIf="_status === 'finish' && !nzIcon"></span>
        <span class="ant-steps-icon anticon anticon-cross" *ngIf="_status === 'error'"></span>
        <span class="ant-steps-icon" *ngIf="(_status === 'process' || _status === 'wait') && !nzIcon">{{ index + 1 }}</span>
        <span class="ant-steps-icon" *ngIf="nzIcon">
          <ng-container *ngIf="isIconString; else nzIcon">
            <i [class]="nzIcon"></i>
          </ng-container>
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
        <ng-container *ngIf="isTitleString; else nzTitle">{{ nzTitle }}</ng-container>
      </div>
      <div class="ant-steps-item-description">
        <ng-container *ngIf="isDescriptionString; else nzDescription">{{ nzDescription }}</ng-container>
      </div>
    </div>
  `
})
export class NzStepComponent {
  private _status = 'wait';
  private _currentIndex = 0;
  private _description: string | TemplateRef<void> = '';
  private _icon: string | TemplateRef<void> = '';
  private _title: string | TemplateRef<void> = '';
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
  stepStatusClass = {};
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
  set nzIcon(value: string | TemplateRef<void>) {
    this.isIconString = !(value instanceof TemplateRef);
    this._icon = value;
  }

  get nzIcon(): string | TemplateRef<void> {
    return this._icon;
  }

  @Input()
  set nzStatus(status: string) {
    this._status = status;
    this.isCustomStatus = true;
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
    this.initClassMap();
  }

  initClassMap(): void {
    this.stepStatusClass = {
      [ 'ant-steps-item' ]        : true,
      [ `ant-steps-item-wait` ]   : this.nzStatus === 'wait',
      [ `ant-steps-item-process` ]: this.nzStatus === 'process',
      [ `ant-steps-item-finish` ] : this.nzStatus === 'finish',
      [ `ant-steps-item-error` ]  : this.nzStatus === 'error',
      [ 'ant-steps-item-last' ]   : this.last,
      [ 'ant-steps-custom' ]      : !!this.nzIcon,
      [ 'ant-steps-next-error' ]  : (this.outStatus === 'error' && this.currentIndex === this.index - 1)
    };
    for (const i in this.stepStatusClass) {
      if (this.stepStatusClass[ i ]) {
        this.renderer.addClass(this.el, i);
      } else {
        this.renderer.removeClass(this.el, i);
      }
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2, public cdr: ChangeDetectorRef) {
    this.el = elementRef.nativeElement;
  }
}
