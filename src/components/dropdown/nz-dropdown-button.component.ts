import {
  Component,
  ViewEncapsulation,
  OnInit,
  OnDestroy,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';
import { DropDownAnimation } from '../core/animation/dropdown-animations';
import { NzDropDownDirective } from './nz-dropdown.directive';
import { NzDropDownComponent } from './nz-dropdown.component';

@Component({
  selector     : 'nz-dropdown-button',
  encapsulation: ViewEncapsulation.None,
  animations   : [
    DropDownAnimation
  ],
  template     : `
    <div class="ant-btn-group ant-dropdown-button" nz-dropdown>
      <button
        type="button"
        nz-button
        [disabled]="nzDisable"
        [nzType]="nzType"
        [nzSize]="nzSize"
        (click)="nzClick.emit($event)">
        <span><ng-content></ng-content></span></button><button
        [nzType]="nzType"
        [nzSize]="nzSize"
        nz-button type="button"
        class="ant-dropdown-trigger"
        [disabled]="nzDisable"
        (click)="_onClickEvent()"
        (mouseenter)="_onMouseEnterEvent($event)"
        (mouseleave)="_onMouseLeaveEvent($event)">
        <i class="anticon anticon-down"></i></button>
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
    </ng-template>    `,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})

export class NzDropDownButtonComponent extends NzDropDownComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() nzDisable = false;
  @Input() nzSize = 'default';
  @Input() nzType = 'default';
  @ViewChild('content') content;
  @Output() nzClick = new EventEmitter();
  @ViewChild(NzDropDownDirective) _nzOrigin;

  _onVisibleChange = (visible: boolean) => {
    if (this.nzDisable) {
      return;
    }
    if (visible) {
      if (!this._triggerWidth) {
        this._setTriggerWidth();
      }
    }
    this.nzVisible = visible;
    this._changeDetector.markForCheck();
  }

  /** rewrite afterViewInit hook */
  ngAfterViewInit() {
    this._startSubscribe(this.nzVisibleChange.asObservable());
  }
}
