import {
  Component,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  Input,
  Renderer2,
  ContentChild,
  Output,
  EventEmitter,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { merge } from 'rxjs/observable/merge';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Observer } from 'rxjs/Observer'
import { NzMenuComponent } from '../menu/nz-menu.component';
import { DropDownAnimation } from '../core/animation/dropdown-animations';
import { NzDropDownDirective } from './nz-dropdown.directive';
import { POSITION_MAP, DEFAULT_DROPDOWN_POSITIONS } from '../core/overlay/overlay-position-map';
import { ConnectionPositionPair } from '../core/overlay/index';

export type NzPlacement = 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight';

@Component({
  selector       : 'nz-dropdown',
  encapsulation  : ViewEncapsulation.None,
  animations     : [
    DropDownAnimation
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template       : `
    <div>
      <ng-content></ng-content>
    </div>
    <ng-template
      nz-connected-overlay
      [hasBackdrop]="_hasBackdrop"
      [positions]="_positions"
      [origin]="_nzOrigin"
      (backdropClick)="_hide()"
      (detach)="_hide()"
      [minWidth]="_triggerWidth"
      (positionChange)="_onPositionChange($event)"
      [open]="nzVisible">
      <div
        class="{{'ant-dropdown ant-dropdown-placement-'+nzPlacement}}"
        [@dropDownAnimation]="_dropDownPosition"
        (mouseenter)="_onMouseEnterEvent($event)"
        (mouseleave)="_onMouseLeaveEvent($event)"
        [style.minWidth.px]="_triggerWidth"
        (click)="_clickDropDown($event)">
        <div [class.ant-table-filter-dropdown]="hasFilterButton">
          <ng-content select="[nz-menu]"></ng-content>
          <ng-content select="[nz-table-filter]"></ng-content>
        </div>
        <ng-content select="[nz-dropdown-custom]"></ng-content>
      </div>
    </ng-template>`,
  styleUrls      : [
    './style/index.less',
    './style/patch.less'
  ]
})

export class NzDropDownComponent implements OnInit, OnDestroy, AfterViewInit {
  hasFilterButton = false;
  _triggerWidth = 0;
  _placement: NzPlacement = 'bottomLeft';
  _dropDownPosition: 'top' | 'bottom' = 'bottom';
  _positions: ConnectionPositionPair[] = [ ...DEFAULT_DROPDOWN_POSITIONS ];
  _subscription: Subscription;
  @ContentChild(NzDropDownDirective) _nzOrigin;
  @ContentChild(NzMenuComponent) _nzMenu;
  @Input() nzTrigger: 'click' | 'hover' = 'hover';
  @Input() nzClickHide = true;
  @Input() nzVisible = false;
  @Output() nzVisibleChange: EventEmitter<boolean> = new EventEmitter();

  @Input()
  set nzPlacement(value: NzPlacement) {
    this._placement = value;
    this._dropDownPosition = (this.nzPlacement.indexOf('top') !== -1) ? 'top' : 'bottom';
    this._positions.unshift(POSITION_MAP[ this._placement ] as ConnectionPositionPair);
  };

  get nzPlacement(): NzPlacement {
    return this._placement;
  }

  _onClickEvent() {
    if (this.nzTrigger === 'click') {
      this._show();
    }
  }

  _onMouseEnterEvent(e) {
    if (this.nzTrigger === 'hover') {
      this._show();
    }
  }

  _onMouseLeaveEvent(e) {
    if (this.nzTrigger === 'hover') {
      this._hide();
    }
  }

  _hide() {
    this.nzVisibleChange.emit(false);
  }

  _show() {
    this.nzVisibleChange.emit(true);
  }

  _onPositionChange(position) {
    this._dropDownPosition = position.connectionPair.originY;
  }

  _clickDropDown($event) {
    $event.stopPropagation();
    if (this.nzClickHide) {
      this.nzVisible = false;
    }
  }

  _setTriggerWidth(): void {
    this._triggerWidth = this._nzOrigin.elementRef.nativeElement.getBoundingClientRect().width;
  }

  _onVisibleChange = (visible: boolean) => {
    if (visible) {
      if (!this._triggerWidth) {
        this._setTriggerWidth();
      }
    }
    this.nzVisible = visible;
    this._changeDetector.markForCheck();
  }

  _startSubscribe(observable$: Observable<boolean>) {
    this._subscription = debounceTime.call(observable$, 300)
      .subscribe(this._onVisibleChange)
  }

  ngOnInit() {
    if (this._nzMenu) {
      this._nzMenu.setDropDown(true);
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  ngAfterViewInit() {
    let mouse$: Observable<boolean>
    if (this.nzTrigger === 'hover') {
      mouse$ = Observable.create((observer: Observer<boolean>) => {
        const disposeMouseEnter = this._renderer.listen(this._nzOrigin.elementRef.nativeElement, 'mouseenter', () => {
          observer.next(true);
        });
        const disposeMouseLeave = this._renderer.listen(this._nzOrigin.elementRef.nativeElement, 'mouseleave', () => {
          observer.next(false);
        });
        return () => {
          disposeMouseEnter();
          disposeMouseLeave();
        }
      });
    }
    if (this.nzTrigger === 'click') {
      mouse$ = Observable.create((observer: Observer<boolean>) => {
        const dispose = this._renderer.listen(this._nzOrigin.elementRef.nativeElement, 'click', (e) => {
          e.preventDefault();
          observer.next(true);
        });
        return () => dispose();
      });
    }
    const observable$ = merge(
      mouse$,
      this.nzVisibleChange.asObservable()
    );
    this._startSubscribe(observable$);
  }

  get _hasBackdrop() {
    return this.nzTrigger === 'click';
  }

  constructor(private _renderer: Renderer2, protected _changeDetector: ChangeDetectorRef) {
  }
}
