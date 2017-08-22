import { Component, OnInit, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { NzStepConnectService } from './nz-step-connect.service';

export type NzDirection = 'horizontal' | 'vertical';

@Component({
  selector     : 'nz-steps',
  encapsulation: ViewEncapsulation.None,
  providers    : [ NzStepConnectService ],
  template     : `
    <div class="ant-steps" [ngClass]="_stepsClassMap">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls    : [
    './style/index.less'
  ]
})
export class NzStepsComponent implements OnInit, OnDestroy {
  _status: string;
  _current: number;
  _stepsClassMap: Object;
  _progressDot = false;
  _direction: NzDirection = 'horizontal';

  @Input()
  set nzDirection(value: NzDirection) {
    this._direction = value;
    this.nzStepConnectService.direction = value;
    this.nzStepConnectService.directionEvent.next(value);
  }

  get nzDirection(): NzDirection {
    return this._direction;
  }

  @Input() nzSize: 'default' | 'small';

  @Input()
  set nzProgressDot(value: boolean | string) {
    if (value === '') {
      this._progressDot = true;
    } else {
      this._progressDot = value as boolean;
    }
    this.nzStepConnectService.processDot = true;
    this.nzStepConnectService.processDotEvent.next(true);
    this.setDirectionClass();
  }

  get nzProgressDot() {
    return this._progressDot;
  }

  @Input()
  set nzStatus(status: string) {
    this._status = status;
    this.nzStepConnectService.errorIndex = this._status;
    this.nzStepConnectService.errorIndexObject.next(this._status);
  }

  @Input()
  set nzCurrent(current: number) {
    this._current = current;
    this.nzStepConnectService.current = current;
    this.nzStepConnectService.currentEvent.next(current);
  }

  get nzCurrent(): number {
    return this._current;
  }


  setDirectionClass() {
    this._stepsClassMap = {
      [`ant-steps-${this.nzDirection}`]      : true,
      [`ant-steps-label-${this.nzDirection}`]: true,
      [`ant-steps-dot`]                      : this.nzProgressDot,
      ['ant-steps-small']                    : this.nzSize === 'small'
    };
  }

  constructor(private nzStepConnectService: NzStepConnectService) {
  }

  ngOnInit() {
    this.setDirectionClass();
    if (this._status) {
      this.nzStepConnectService.errorIndex = this._status;
      this.nzStepConnectService.errorIndexObject.next(this._status);
    }
  }

  ngOnDestroy() {
    this.nzStepConnectService.itemIndex = 0;
  }
}
