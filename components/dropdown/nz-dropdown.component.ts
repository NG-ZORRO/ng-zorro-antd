import { CdkConnectedOverlay, ConnectedOverlayPositionChange, ConnectionPositionPair } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { combineLatest } from 'rxjs/operators/combineLatest';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/operators/distinctUntilChanged';
import { map } from 'rxjs/operators/map';
import { mapTo } from 'rxjs/operators/mapTo';
import { merge } from 'rxjs/operators/merge';

import { dropDownAnimation } from '../core/animation/dropdown-animations';
import { DEFAULT_DROPDOWN_POSITIONS, POSITION_MAP } from '../core/overlay/overlay-position-map';
import { toBoolean } from '../core/util/convert';
import { NzMenuDirective } from '../menu/nz-menu.directive';

import { NzDropDownDirective } from './nz-dropdown.directive';

export type NzPlacement = 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight';

@Component({
  selector           : 'nz-dropdown',
  preserveWhitespaces: false,
  animations         : [
    dropDownAnimation
  ],
  template           : `
    <div>
      <ng-content select="[nz-dropdown]"></ng-content>
    </div>
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="hasBackdrop"
      [cdkConnectedOverlayPositions]="positions"
      [cdkConnectedOverlayOrigin]="nzOrigin"
      (backdropClick)="hide()"
      (detach)="hide()"
      [cdkConnectedOverlayMinWidth]="triggerWidth"
      (positionChange)="onPositionChange($event)"
      [cdkConnectedOverlayOpen]="nzVisible">
      <div
        class="{{'ant-dropdown ant-dropdown-placement-'+nzPlacement}}"
        [@dropDownAnimation]="dropDownPosition"
        (mouseenter)="onMouseEnterEvent()"
        (mouseleave)="onMouseLeaveEvent()"
        [style.minWidth.px]="triggerWidth">
        <div [class.ant-table-filter-dropdown]="hasFilterButton">
          <ng-content select="[nz-menu]"></ng-content>
          <ng-content select=".ant-table-filter-dropdown-btns"></ng-content>
        </div>
        <ng-content></ng-content>
      </div>
    </ng-template>`,
  styles             : [
      `
      :host {
        position: relative;
        display: inline-block;
      }

      .ant-dropdown {
        top: 100%;
        left: 0;
        position: relative;
        width: 100%;
        margin-top: 4px;
        margin-bottom: 4px;
      }
    `
  ]
})

export class NzDropDownComponent implements OnInit, OnDestroy, AfterViewInit {
  private _clickHide = true;
  private _visible = false;
  private _disabled = false;
  @Input() hasFilterButton = false;
  triggerWidth = 0;
  placement: NzPlacement = 'bottomLeft';
  dropDownPosition: 'top' | 'center' | 'bottom' = 'bottom';
  positions: ConnectionPositionPair[] = [ ...DEFAULT_DROPDOWN_POSITIONS ];
  visibleSubscription: Subscription;
  $subOpen = new BehaviorSubject<boolean>(false);
  $visibleChange = new Subject<boolean>();
  @ContentChild(NzDropDownDirective) nzOrigin: NzDropDownDirective;
  @ContentChild(NzMenuDirective) nzMenu: NzMenuDirective;
  @Input() nzTrigger: 'click' | 'hover' = 'hover';
  @Output() nzVisibleChange: EventEmitter<boolean> = new EventEmitter();
  @ViewChild(CdkConnectedOverlay) cdkOverlay: CdkConnectedOverlay;

  @Input()
  set nzClickHide(value: boolean) {
    this._clickHide = toBoolean(value);
  }

  get nzClickHide(): boolean {
    return this._clickHide;
  }

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
    if (this._disabled) {
      this.renderer.setAttribute(this.nzOrigin.elementRef.nativeElement, 'disabled', '');
    } else {
      this.renderer.removeAttribute(this.nzOrigin.elementRef.nativeElement, 'disabled');
    }
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @Input()
  set nzVisible(value: boolean) {
    this._visible = toBoolean(value);
    /** handle nzVisible change with mouse event **/
    this.$visibleChange.next(this._visible);
  }

  get nzVisible(): boolean {
    return this._visible;
  }

  @Input()
  set nzPlacement(value: NzPlacement) {
    this.placement = value;
    this.dropDownPosition = (this.nzPlacement.indexOf('top') !== -1) ? 'top' : 'bottom';
    this.positions.unshift(POSITION_MAP[ this.placement ] as ConnectionPositionPair);
  }

  get nzPlacement(): NzPlacement {
    return this.placement;
  }

  onClickEvent(): void {
    if (this.nzTrigger === 'click') {
      this.show();
    }
  }

  onMouseEnterEvent(): void {
    if (this.nzTrigger === 'hover') {
      this.show();
    }
  }

  onMouseLeaveEvent(): void {
    if (this.nzTrigger === 'hover') {
      this.hide();
    }
  }

  hide(): void {
    this.$visibleChange.next(false);
  }

  show(): void {
    this.$visibleChange.next(true);
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.dropDownPosition = position.connectionPair.originY;
  }

  setTriggerWidth(): void {
    this.triggerWidth = this.nzOrigin.elementRef.nativeElement.getBoundingClientRect().width;
    /** should remove after https://github.com/angular/material2/pull/8765 merged **/
    if (this.cdkOverlay && this.cdkOverlay.overlayRef) {
      this.cdkOverlay.overlayRef.updateSize({
        minWidth: this.triggerWidth
      });
    }
  }

  startSubscribe(observable$: Observable<boolean>): void {
    let $pre = observable$;
    if (this.nzClickHide) {
      const $menuItemClick = this.nzMenu.nzClick.asObservable().pipe(mapTo(false));
      $pre = $pre.pipe(merge($menuItemClick));
    }
    const final$ = $pre.pipe(combineLatest(this.$subOpen), map(value => value[ 0 ] || value[ 1 ]), debounceTime(50), distinctUntilChanged());
    this.visibleSubscription = final$.subscribe(this.onVisibleChange);
  }

  onVisibleChange = (visible: boolean) => {
    if (visible) {
      this.setTriggerWidth();
    }
    if (this.nzVisible !== visible) {
      this.nzVisible = visible;
      this.nzVisibleChange.emit(this.nzVisible);
    }
    this.changeDetector.markForCheck();
  }

  ngOnInit(): void {
    if (this.nzMenu) {
      this.nzMenu.nzInDropDown = true;
    }
  }

  ngOnDestroy(): void {
    if (this.visibleSubscription) {
      this.visibleSubscription.unsubscribe();
      this.visibleSubscription = null;
    }
  }

  ngAfterViewInit(): void {
    let mouse$: Observable<boolean>;
    if (this.nzTrigger === 'hover') {
      const mouseEnterOrigin$ = this.nzOrigin.$mouseenter.pipe(mapTo(true));
      const mouseLeaveOrigin$ = this.nzOrigin.$mouseleave.pipe(mapTo(false));
      mouse$ = mouseEnterOrigin$.pipe(merge(mouseLeaveOrigin$));
    }
    if (this.nzTrigger === 'click') {
      mouse$ = this.nzOrigin.$click.pipe(mapTo(true));
    }
    const observable$ = mouse$.pipe(merge(this.$visibleChange));
    this.startSubscribe(observable$);
  }

  get hasBackdrop(): boolean {
    return this.nzTrigger === 'click';
  }

  constructor(private renderer: Renderer2, protected changeDetector: ChangeDetectorRef) {
  }
}
