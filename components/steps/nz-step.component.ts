import {
  ChangeDetectorRef,
  Component,
  ContentChild,
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
    <div class="ant-steps-item-tail" #stepsTail *ngIf="_last !== true"></div>
    <div class="ant-steps-item-icon">
      <ng-template [ngIf]="!_processDot">
        <span class="ant-steps-icon anticon anticon-check" *ngIf="_status === 'finish' && !nzIcon"></span>
        <span class="ant-steps-icon anticon anticon-cross" *ngIf="_status === 'error'"></span>
        <span class="ant-steps-icon" *ngIf="(_status === 'process' || _status === 'wait') && !nzIcon">{{ index + 1 }}</span>
        <span class="ant-steps-icon" *ngIf="nzIcon">
          <ng-template [ngTemplateOutlet]="nzIcon"></ng-template>
        </span>
      </ng-template>
      <ng-template [ngIf]="_processDot">
        <span class="ant-steps-icon">
          <span class="ant-steps-icon-dot"></span>
        </span>
      </ng-template>
    </div>
    <div class="ant-steps-item-content">
      <div class="ant-steps-item-title" [innerHTML]="nzTitle"></div>
      <div class="ant-steps-item-description">
        <ng-container *ngIf="_description; else _descriptionTpl">{{ _description }}</ng-container>
      </div>
    </div>
  `
})
export class NzStepComponent {
  _status = 'wait';
  _ifCustomStatus = false;
  _totalCount = 1;
  _currentIndex = 0;
  _el;
  _last = false;
  _first = false;
  _processDot = false;
  _direction = 'horizontal';
  _outStatus = 'process';
  index = 0;
  stepStatusClass;
  @ContentChild('nzIcon') nzIcon: TemplateRef<void>;
  @ViewChild('stepsTail') _stepsTail: ElementRef;
  @ViewChild('stepsHead') _stepsHead: ElementRef;
  @ViewChild('stepsMain') _stepsMain: ElementRef;

  @Input()
  set nzStatus(status: string) {
    this._status = status;
    this._ifCustomStatus = true;
  }

  get nzStatus(): string {
    return this._status;
  }

  @Input() nzTitle: string;

  _description = '';
  _descriptionTpl: TemplateRef<void>;

  @Input()
  set nzDescription(value: string | TemplateRef<void>) {
    if (value instanceof TemplateRef) {
      this._descriptionTpl = value;
    } else {
      this._description = value as string;
    }
  }

  get _current(): number {
    return this._currentIndex;
  }

  set _current(current: number) {
    this._currentIndex = current;
    if (!this._ifCustomStatus) {
      if (current > this.index) {
        this._status = 'finish';
      } else if (current === this.index) {
        if (this._outStatus) {
          this._status = this._outStatus;
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
      [ `ant-steps-item-wait` ]   : this._status === 'wait',
      [ `ant-steps-item-process` ]: this._status === 'process',
      [ `ant-steps-item-finish` ] : this._status === 'finish',
      [ `ant-steps-item-error` ]  : this._status === 'error',
      [ 'ant-steps-item-last' ]   : this._last,
      [ 'ant-steps-custom' ]      : !!this.nzIcon,
      [ 'ant-steps-next-error' ]  : (this._outStatus === 'error' && this._current === this.index - 1)
    };
    for (const i in this.stepStatusClass) {
      if (this.stepStatusClass[ i ]) {
        this._renderer.addClass(this._el, i);
      } else {
        this._renderer.removeClass(this._el, i);
      }
    }
  }

  constructor(private erf: ElementRef, private _renderer: Renderer2, public cdr: ChangeDetectorRef) {
    this._el = erf.nativeElement;
  }
}
