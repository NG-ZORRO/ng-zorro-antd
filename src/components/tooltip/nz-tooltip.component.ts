import {
  Component,
  ViewEncapsulation,
  Input,
  TemplateRef,
  Output,
  Renderer2,
  EventEmitter,
  AfterViewInit,
  ChangeDetectorRef,
  ContentChild,
  ViewChild
} from '@angular/core';
import { NzTooltipDirective } from './nz-tooltip.directive';
import {
  AnimationEvent,
} from '@angular/animations';
import { FadeAnimation } from '../core/animation/fade-animations';
import {
  ConnectionPositionPair,
  ConnectedOverlayDirective
} from '../core/overlay';
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
      #overlay="nzConnectedOverlay"
      nz-connected-overlay
      [origin]="nzOrigin"
      [hasBackdrop]="_hasBackdrop"
      (backdropClick)="hide()"
      (detach)="hide()"
      (positionChange)="onPositionChange($event)"
      [positions]="_positions"
      [open]="nzVisible">
      <div class="ant-tooltip" [ngClass]="_classMap" [ngStyle]="nzOverlayStyle" [@fadeAnimation]="''+nzVisible"
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
export class NzToolTipComponent implements AfterViewInit {
  @Input() nzTitle: string;
  @Input() nzOverlayClassName = '';
  @Input() nzOverlayStyle = {};
  @Output() nzVisibleChange: EventEmitter<any> = new EventEmitter();
  @ContentChild(NzTooltipDirective) nzOrigin;
  @ContentChild('nzTemplate') nzTemplate: TemplateRef<any>;
  @ViewChild('overlay') overlay: ConnectedOverlayDirective;

  @Input()
  set nzVisible(value) {
    this._visible = value;
    if (this._visible !== value) {
      this.nzVisibleChange.emit(value);
    }
  };

  get nzVisible() {
    return this._visible;
  }

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
  _visible = false;

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
    this._visible = true;
    this.nzOrigin.isTooltipOpen = true;
  }

  hide(): void {
    this._visible = false;
    this.nzOrigin.isTooltipOpen = false;
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

  constructor(private _renderer: Renderer2, private _cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    if (this._trigger === 'hover') {
      this._renderer.listen(this.nzOrigin.elementRef.nativeElement, 'mouseenter', () => this.show());
      this._renderer.listen(this.nzOrigin.elementRef.nativeElement, 'mouseleave', () => this.hide());
    } else if (this._trigger === 'focus') {
      this._renderer.listen(this.nzOrigin.elementRef.nativeElement, 'focus', () => this.show());
      this._renderer.listen(this.nzOrigin.elementRef.nativeElement, 'blur', () => this.hide());
    } else if (this._trigger === 'click') {
      this._renderer.listen(this.nzOrigin.elementRef.nativeElement, 'click', (e) => {
        e.preventDefault();
        this.show()
      });
    }

  }
}
