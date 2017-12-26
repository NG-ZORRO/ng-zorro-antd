import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { dropDownAnimation } from '../core/animation/dropdown-animations';
import { toBoolean } from '../util/convert';
import { NzDropDownComponent } from './nz-dropdown.component';
import { NzDropDownDirective } from './nz-dropdown.directive';

@Component({
  selector     : 'nz-dropdown-button',
  encapsulation: ViewEncapsulation.None,
  animations   : [
    dropDownAnimation
  ],
  template     : `
    <div class="ant-btn-group ant-dropdown-button" nz-dropdown>
      <button
        type="button"
        nz-button
        [disabled]="nzDisabled"
        [nzType]="nzType"
        [nzSize]="nzSize"
        (click)="nzClick.emit($event)">
        <span><ng-content></ng-content></span></button><button
        [nzType]="nzType"
        [nzSize]="nzSize"
        nz-button type="button"
        class="ant-dropdown-trigger"
        [disabled]="nzDisabled"
        (click)="_onClickEvent()"
        (mouseenter)="_onMouseEnterEvent($event)"
        (mouseleave)="_onMouseLeaveEvent($event)">
        <i class="anticon anticon-down"></i></button>
    </div>
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayHasBackdrop]="_hasBackdrop"
      [cdkConnectedOverlayPositions]="_positions"
      [cdkConnectedOverlayOrigin]="_nzOrigin"
      (backdropClick)="_hide()"
      (detach)="_hide()"
      [cdkConnectedOverlayMinWidth]="_triggerWidth"
      (positionChange)="_onPositionChange($event)"
      [cdkConnectedOverlayOpen]="nzVisible"
    >
      <div
        class="{{'ant-dropdown ant-dropdown-placement-'+nzPlacement}}"
        [@dropDownAnimation]="_dropDownPosition"
        (mouseenter)="_onMouseEnterEvent($event)"
        (mouseleave)="_onMouseLeaveEvent($event)"
        [style.minWidth.px]="_triggerWidth"
        (click)="_clickDropDown($event)">
        <ng-content select="[nz-menu]"></ng-content>
      </div>
    </ng-template>    `,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})

export class NzDropDownButtonComponent extends NzDropDownComponent implements OnInit, OnDestroy, AfterViewInit {
  _disabled = false;
  @Input() nzSize = 'default';
  @Input() nzType = 'default';
  @ViewChild('content') content;
  @Output() nzClick = new EventEmitter();
  @ViewChild(NzDropDownDirective) _nzOrigin;

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  _onVisibleChange = (visible: boolean) => {
    if (this.nzDisabled) {
      return;
    }
    if (visible) {
      this._setTriggerWidth();
    }
    if (this.nzVisible !== visible) {
      this.nzVisible = visible;
      this.nzVisibleChange.emit(this.nzVisible);
    }
    this._changeDetector.markForCheck();
  }

  /** rewrite afterViewInit hook */
  ngAfterViewInit(): void {
    this._startSubscribe(this._visibleChange);
  }
}
