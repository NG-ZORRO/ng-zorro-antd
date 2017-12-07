import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  Input,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector     : 'nz-step',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="ant-steps-tail" #stepsTail *ngIf="_last !== true">
      <i></i>
    </div>
    <div class="ant-steps-step">
      <div class="ant-steps-head" #stepsHead>
        <div class="ant-steps-head-inner">
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
      </div>
      <div class="ant-steps-main" #stepsMain>
        <div class="ant-steps-title" [innerHTML]="nzTitle"></div>
        <div class="ant-steps-description">
          <ng-container *ngIf="_description; else _descriptionTpl">{{ _description }}</ng-container>
        </div>
      </div>
    </div>
  `,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzStepComponent implements AfterViewInit {
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
          this._status = 'error';
        } else {
          this._status = 'process';
        }
      } else {
        this._status = 'wait';
      }
    }
    this.initClassMap();
  }

  initClassMap(): void {
    this.stepStatusClass = {
      ['ant-steps-item']          : true,
      [`ant-steps-status-wait`]   : this._status === 'wait',
      [`ant-steps-status-process`]: this._status === 'process',
      [`ant-steps-status-finish`] : this._status === 'finish',
      [`ant-steps-status-error`]  : this._status === 'error',
      ['ant-steps-item-last']     : this._last,
      ['ant-steps-custom']        : !!this.nzIcon,
      ['ant-steps-next-error']    : (this._outStatus === 'error' && this._current === this.index - 1)
    };
    for (const i in this.stepStatusClass) {
      if (this.stepStatusClass[ i ]) {
        this._renderer.addClass(this._el, i);
      } else {
        this._renderer.removeClass(this._el, i);
      }
    }
  }

  updateLastWidth(): void {
    let width = this._stepsHead.nativeElement.offsetWidth + this._stepsMain.nativeElement.offsetWidth;
    /** remove left padding if not first**/
    if (!this._first) {
      width = width - 10;
    }
    this._renderer.setStyle(this.erf.nativeElement, 'width', (100 / (this._totalCount - 1)) + '%');
    this._renderer.setStyle(this.erf.nativeElement, 'margin-right', (-(width / (this._totalCount - 1) + 5)) + 'px');
    if (this._direction === 'horizontal') {
      if (this._stepsTail && this._stepsTail.nativeElement) {
        this._renderer.setStyle(this._stepsTail.nativeElement, 'padding-right', ((width / (this._totalCount - 1) + 5)) + 'px');
      }
    }
  }

  constructor(private erf: ElementRef, private _renderer: Renderer2, public cdr: ChangeDetectorRef) {
    this._el = erf.nativeElement;
  }

  ngAfterViewInit(): void {
    if (!this._last) {
      this.updateLastWidth();
    }
  }
}
