import { AnimationEvent } from '@angular/animations';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange,
  ConnectionPositionPair
} from '@angular/cdk/overlay';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { fadeAnimation } from '../core/animation/fade-animations';
import { DEFAULT_4_POSITIONS, POSITION_MAP } from '../core/overlay/overlay-position-map';
import { isNotNil } from '../core/util/check';
import { toBoolean } from '../core/util/convert';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  selector           : 'nz-tooltip',
  animations         : [ fadeAnimation ],
  templateUrl        : './nz-tooltip.component.html',
  preserveWhitespaces: false,
  styles             : [ `
    .ant-tooltip {
      position: relative;
    }
  ` ]
})
export class NzToolTipComponent implements OnChanges {
  _hasBackdrop = false;
  _prefix = 'ant-tooltip-placement';
  _positions: ConnectionPositionPair[] = [ ...DEFAULT_4_POSITIONS ];
  _classMap = {};
  _placement = 'top';
  _trigger = 'hover';
  overlayOrigin: CdkOverlayOrigin;
  visibleSource = new BehaviorSubject<boolean>(false);
  visible$: Observable<boolean> = this.visibleSource.asObservable();
  @ViewChild('overlay') overlay: CdkConnectedOverlay;

  @Input() @ContentChild('nzTemplate') nzTitle: string | TemplateRef<void>;
  @Input() nzOverlayClassName = '';
  @Input() nzOverlayStyle: { [ key: string ]: string } = {};
  @Input() nzMouseEnterDelay = 0.15; // second
  @Input() nzMouseLeaveDelay = 0.1; // second

  @Input()
  set nzVisible(value: boolean) {
    const visible = toBoolean(value);
    if (this.visibleSource.value !== visible) {
      this.visibleSource.next(visible);
      this.nzVisibleChange.emit(visible);
    }
  }

  get nzVisible(): boolean { return this.visibleSource.value; }

  @Input()
  set nzTrigger(value: string) {
    this._trigger = value;
    this._hasBackdrop = this._trigger === 'click';
  }

  get nzTrigger(): string { return this._trigger; }

  @Input()
  set nzPlacement(value: string) {
    if (value !== this._placement) {
      this._placement = value;
      this._positions.unshift(POSITION_MAP[ this.nzPlacement ] as ConnectionPositionPair);
    }
  }

  get nzPlacement(): string { return this._placement; }

  @Output() readonly nzVisibleChange = new EventEmitter<boolean>();

  constructor(public cdr: ChangeDetectorRef) {}

  ngOnChanges(): void {
    Promise.resolve().then(() => {
      this.updatePosition();
    });
  }

  // Manually force updating current overlay's position
  updatePosition(): void {
    if (this.overlay && this.overlay.overlayRef) {
      this.overlay.overlayRef.updatePosition();
    }
  }

  onPositionChange($event: ConnectedOverlayPositionChange): void {
    for (const key in POSITION_MAP) {
      if (JSON.stringify($event.connectionPair) === JSON.stringify(POSITION_MAP[ key ])) {
        this.nzPlacement = key;
        break;
      }
    }
    this.setClassMap();
    this.cdr.detectChanges(); // TODO: performance?
  }

  show(): void {
    if (!this.isContentEmpty()) {
      this.nzVisible = true;
    }
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

  setClassMap(): void {
    this._classMap = {
      [ this.nzOverlayClassName ]             : true,
      [ `${this._prefix}-${this._placement}` ]: true
    };
  }

  setOverlayOrigin(origin: CdkOverlayOrigin): void {
    this.overlayOrigin = origin;
  }

  protected isContentEmpty(): boolean {
    return this.nzTitle instanceof TemplateRef ? false : (this.nzTitle === '' || !isNotNil(this.nzTitle));
  }
}
