import {
  Component,
  ViewEncapsulation,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  AfterViewInit,
  ChangeDetectorRef,
  ContentChild,
  ViewChild
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import {
  AnimationEvent,
} from '@angular/animations';
import { FadeAnimation } from '../core/animation/fade-animations';
import {
  OverlayOrigin,
  ConnectionPositionPair,
  ConnectedOverlayDirective
} from '@angular/cdk/overlay';
import { POSITION_MAP, DEFAULT_4_POSITIONS } from '../core/overlay/overlay-position-map';

@Component({
  selector     : 'nz-tooltip',
  encapsulation: ViewEncapsulation.None,
  animations   : [
    FadeAnimation
  ],
  template     : `
    <ng-content></ng-content>
    <ng-template
      #overlay="cdkConnectedOverlay"
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="overlayOrigin"
      [cdkConnectedOverlayHasBackdrop]="_hasBackdrop"
      (backdropClick)="hide()"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayOpen]="visible$ | async">
      <div class="ant-tooltip" [ngClass]="_classMap" [ngStyle]="nzOverlayStyle" [@fadeAnimation]="''+(visible$ | async)"
        (@fadeAnimation.done)="_afterVisibilityAnimation($event)">
        <div class="ant-tooltip-content">
          <div class="ant-tooltip-arrow"></div>
          <div class="ant-tooltip-inner">
            <span *ngIf="!nzTemplate">{{nzTitle}}</span>
            <ng-template
              *ngIf="nzTemplate"
              [ngTemplateOutlet]="nzTemplate">
            </ng-template>
          </div>
        </div>
      </div>
    </ng-template>`,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})
export class NzToolTipComponent {
  @Input() nzTitle: string;
  @Input() nzOverlayClassName = '';
  @Input() nzOverlayStyle = {};
  @Output() nzVisibleChange: EventEmitter<any> = new EventEmitter();
  @ContentChild('nzTemplate') nzTemplate: TemplateRef<any>;
  @ViewChild('overlay') overlay: ConnectedOverlayDirective;

  overlayOrigin: OverlayOrigin;

  @Input()
  set nzVisible(value) {
    if (this.visibleSource.value !== value) {
      this.visibleSource.next(value);
      this.nzVisibleChange.emit(value);
    }
  };

  get nzVisible() {
    return this.visibleSource.value;
  }

  visibleSource = new BehaviorSubject<boolean>(false);
  visible$ = this.visibleSource.asObservable();

  @Input()
  set nzTrigger(value) {
    this._trigger = value;
    this._hasBackdrop = this._trigger === 'click';
  }
  get nzTrigger() {
    return this._trigger;
  }

  _prefix = 'ant-tooltip-placement';
  _positions: ConnectionPositionPair[] = [ ...DEFAULT_4_POSITIONS ];
  _classMap = {};
  _placement = 'top';
  _trigger = 'hover';
  _hasBackdrop = false;

  @Input()
  get nzPlacement() {
    return this._placement;
  }

  set nzPlacement(value) {
    if (value !== this._placement) {
      this._placement = value;
      this._positions.unshift(POSITION_MAP[ this.nzPlacement ] as ConnectionPositionPair);
    }
  }

  // Manually force updating current overlay's position
  updatePosition() {
    if (this.overlay && this.overlay.overlayRef) {
      this.overlay.overlayRef.updatePosition();
    }
  }

  onPositionChange($event) {
    for (const key in POSITION_MAP) {
      if (JSON.stringify($event.connectionPair) === JSON.stringify(POSITION_MAP[ key ])) {
        this.nzPlacement = key;
        break;
      }
    }
    this.setClassMap();
    /** TODO may cause performance problem */
    this._cdr.detectChanges();
  }

  show(): void {
    this.nzVisible = true;
  }

  hide(): void {
    this.nzVisible = false;
  }

  _afterVisibilityAnimation(e: AnimationEvent): void {
    if (e.toState === 'false' && !this.nzVisible) {
      this.nzVisibleChange.emit(false);
    }
    if (e.toState === 'true' && this.nzVisible) {
      this.nzVisibleChange.emit(true);
    }
  }

  setClassMap() {
    this._classMap = {
      [this.nzOverlayClassName]             : true,
      [`${this._prefix}-${this._placement}`]: true
    };
  }

  setOverlayOrigin(origin: OverlayOrigin) {
    this.overlayOrigin = origin;
  }

  constructor(private _cdr: ChangeDetectorRef) { }
}
