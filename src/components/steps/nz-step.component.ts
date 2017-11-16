import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  ElementRef,
  AfterViewInit,
  Renderer2,
  ContentChild,
  ViewChild,
  TemplateRef, OnDestroy
} from '@angular/core';
import { NzStepConnectService } from './nz-step-connect.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector     : 'nz-step',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="ant-steps-tail" #stepsTail *ngIf="_last !== true">
      <i></i>
    </div>
    <div class="ant-steps-step">
      <div class="ant-steps-head">
        <div class="ant-steps-head-inner">
          <ng-template [ngIf]="!_processDot">
            <span class="ant-steps-icon anticon anticon-check" *ngIf="_status === 'finish' && !nzIcon"></span>
            <span class="ant-steps-icon anticon anticon-cross" *ngIf="_status === 'error'"></span>
            <span class="ant-steps-icon" *ngIf="(_status === 'process' || _status === 'wait') && !nzIcon">{{index + 1}}</span>
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
      <div class="ant-steps-main">
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
export class NzStepComponent implements OnInit, AfterViewInit, OnDestroy {
  _status = 'wait';
  _ifCustomStatus = false;
  _currentIndex;
  _el;
  _last = false;
  _processDot = false;
  _direction = 'horizontal';
  _processDotEventSubscription: Subscription;
  _directionEventSubscription: Subscription;
  _currentEventSubscription: Subscription;
  _errorIndexObjectSubscription: Subscription;
  index: number;
  stepStatusClass;
  @ContentChild('nzIcon') nzIcon: TemplateRef<any>;
  @ViewChild('stepsTail') _stepsTail: ElementRef;

  @Input()
  set nzStatus(status) {
    this._status = status;
    this._ifCustomStatus = true;
  }

  get nzStatus() {
    return this._status;
  }

  @Input() nzTitle: string;

  _description = '';
  _descriptionTpl: TemplateRef<any>;
  @Input()
  set nzDescription(value: string | TemplateRef<any>) {
    if (value instanceof TemplateRef)
        this._descriptionTpl = value;
    else
        this._description = value;
  }

  get _current() {
    return this._currentIndex;
  }

  set _current(current) {
    this._currentIndex = current;
    if (!this._ifCustomStatus) {
      if (current > this.index) {
        this._status = 'finish';
      } else if (current === this.index) {
        if (this.nzStepConnectService.errorIndex) {
          this._status = 'error';
        } else {
          this._status = 'process';
        }
      } else {
        this._status = 'wait';
      }
    }
    this.initClassMap();
  };

  initClassMap() {
    this.stepStatusClass = {
      ['ant-steps-item']          : true,
      [`ant-steps-status-wait`]   : this._status === 'wait',
      [`ant-steps-status-process`]: this._status === 'process',
      [`ant-steps-status-finish`] : this._status === 'finish',
      [`ant-steps-status-error`]  : this._status === 'error',
      ['ant-steps-item-last']     : this._last,
      ['ant-steps-custom']        : !!this.nzIcon,
      ['ant-steps-next-error']    : (this.nzStepConnectService.errorIndex === 'error' && this._current === this.index - 1)
    };
    for (const i in this.stepStatusClass) {
      if (this.stepStatusClass[ i ]) {
        this._renderer.addClass(this._el, i);
      } else {
        this._renderer.removeClass(this._el, i);
      }
    }
  }

  init() {
    // 记录个数
    this.index = this.nzStepConnectService.itemIndex;
    this._processDot = this.nzStepConnectService.processDot;
    this._direction = this.nzStepConnectService.direction;
    this._current = this.nzStepConnectService.current;
    this._processDotEventSubscription = this.nzStepConnectService.processDotEvent.subscribe(data => {
      this._processDot = data;
    });
    this._directionEventSubscription = this.nzStepConnectService.directionEvent.subscribe(data => {
      this._direction = data;
    });
    this._currentEventSubscription = this.nzStepConnectService.currentEvent.subscribe(data => {
      this._current = data;
    });
    this._errorIndexObjectSubscription = this.nzStepConnectService.errorIndexObject.subscribe(data => {
      if (this._current === this.index) {
        this._status = data;
      }
    });
    this.initClassMap();
    this.nzStepConnectService.itemIndex += 1;
    /** judge if last step */
    if (!this.erf.nativeElement.nextElementSibling) {
      this._last = true;
    } else {
      this.nzStepConnectService.lastElementSizeEvent.subscribe(data => {
        const { count, width } = data;
        this._renderer.setStyle(this.erf.nativeElement, 'width', (100 / (count - 1)) + '%');
        this._renderer.setStyle(this.erf.nativeElement, 'margin-right', (-(width / (count - 1) + 5)) + 'px');
        if (this._direction === 'horizontal') {
          this._renderer.setStyle(this._stepsTail.nativeElement, 'padding-right', ((width / (count - 1) + 5)) + 'px');
        }
      });
    }
  }

  constructor(private erf: ElementRef,
              private nzStepConnectService: NzStepConnectService, private _renderer: Renderer2) {
    this._el = erf.nativeElement;
  }

  ngOnInit() {
    this.init();
  }

  ngAfterViewInit() {
    if (this._last) {
      setTimeout(_ => {
        this.nzStepConnectService.lastElementSizeEvent.next({
          count: this.erf.nativeElement.parentElement.childElementCount,
          width: this.erf.nativeElement.firstElementChild.offsetWidth
        });
      })
    }
  }

  ngOnDestroy() {
    if (this._processDotEventSubscription) {
      this._processDotEventSubscription.unsubscribe()
    }
    if (this._directionEventSubscription) {
      this._directionEventSubscription.unsubscribe()
    }
    if (this._currentEventSubscription) {
      this._currentEventSubscription.unsubscribe()
    }
    if (this._errorIndexObjectSubscription) {
      this._errorIndexObjectSubscription.unsubscribe()
    }
  }
}
