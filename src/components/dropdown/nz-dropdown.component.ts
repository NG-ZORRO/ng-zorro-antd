import {
  Component,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  Input,
  Renderer2,
  ContentChild,
  Output,
  EventEmitter, AfterViewInit
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { NzMenuComponent } from '../menu/nz-menu.component';
import { DropDownAnimation } from '../core/animation/dropdown-animations';
import { NzDropDownDirective } from './nz-dropdown.directive';
import { POSITION_MAP, DEFAULT_DROPDOWN_POSITIONS } from '../core/overlay/overlay-position-map';
import { ConnectionPositionPair } from '../core/overlay';

export type NzPlacement = 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight';

@Component({
  selector     : 'nz-dropdown',
  encapsulation: ViewEncapsulation.None,
  animations   : [
    DropDownAnimation
  ],
  template     : `
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
        <ng-content select="[nz-menu]"></ng-content>
      </div>
    </ng-template>`,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})

export class NzDropDownComponent implements OnInit, OnDestroy, AfterViewInit {
  _triggerWidth = 0;
  _$mouseSubject = new Subject();
  _placement: NzPlacement = 'bottomLeft';
  _dropDownPosition: 'top' | 'bottom' = 'bottom';
  _positions: ConnectionPositionPair[] = [ ...DEFAULT_DROPDOWN_POSITIONS ];
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

  _show() {
    this._$mouseSubject.next(true);
  }

  _hide() {
    this._$mouseSubject.next(false);
  }

  ngOnInit() {
    debounceTime.call(this._$mouseSubject, 300).subscribe((data: boolean) => {
      this.nzVisible = data;
      if (this.nzVisible) {
        if (!this._triggerWidth) {
          this._setTriggerWidth();
        }
      }
      this.nzVisibleChange.emit(this.nzVisible);
    });
    this._nzMenu.setDropDown(true);
  }

  ngOnDestroy() {
    this._$mouseSubject.unsubscribe();
  }


  ngAfterViewInit() {
    if (this.nzTrigger === 'hover') {
      this._renderer.listen(this._nzOrigin.elementRef.nativeElement, 'mouseenter', () => this._show());
      this._renderer.listen(this._nzOrigin.elementRef.nativeElement, 'mouseleave', () => this._hide());
    }
    if (this.nzTrigger === 'click') {
      this._renderer.listen(this._nzOrigin.elementRef.nativeElement, 'click', (e) => {
        e.preventDefault();
        this._show()
      });
    }
  }

  get _hasBackdrop() {
    return this.nzTrigger === 'click';
  }

  constructor(private _renderer: Renderer2) {
  }
}
