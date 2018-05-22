import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';

import { dropDownAnimation } from '../core/animation/dropdown-animations';

import { NzDropDownComponent } from './nz-dropdown.component';
import { NzDropDownDirective } from './nz-dropdown.directive';

@Component({
  selector           : 'nz-dropdown-button',
  preserveWhitespaces: false,
  animations         : [
    dropDownAnimation
  ],
  template           : `
    <div class="ant-btn-group ant-dropdown-button" nz-dropdown>
      <button
        type="button"
        nz-button
        [disabled]="nzDisabled"
        [nzType]="nzType"
        [nzSize]="nzSize"
        (click)="nzClick.emit($event)">
        <span><ng-content></ng-content></span></button>
      <button
        [nzType]="nzType"
        [nzSize]="nzSize"
        nz-button type="button"
        class="ant-dropdown-trigger"
        [disabled]="nzDisabled"
        (click)="onClickEvent()"
        (mouseenter)="onMouseEnterEvent()"
        (mouseleave)="onMouseLeaveEvent()">
        <i class="anticon anticon-down"></i></button>
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
      [cdkConnectedOverlayOpen]="nzVisible"
    >
      <div
        class="{{'ant-dropdown ant-dropdown-placement-'+nzPlacement}}"
        [@dropDownAnimation]="dropDownPosition"
        (mouseenter)="onMouseEnterEvent()"
        (mouseleave)="onMouseLeaveEvent()"
        [style.minWidth.px]="triggerWidth">
        <ng-content select="[nz-menu]"></ng-content>
      </div>
    </ng-template>`,
  styles             : [ `
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
  ` ]
})

export class NzDropDownButtonComponent extends NzDropDownComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() nzSize = 'default';
  @Input() nzType = 'default';
  @ViewChild('content') content;
  @Output() nzClick = new EventEmitter();
  @ViewChild(NzDropDownDirective) nzOrigin;

  onVisibleChange = (visible: boolean) => {
    if (this.nzDisabled) {
      return;
    }
    if (visible) {
      this.setTriggerWidth();
    }
    if (this.nzVisible !== visible) {
      this.nzVisible = visible;
      this.nzVisibleChange.emit(this.nzVisible);
    }
    this.changeDetector.markForCheck();
  }

  /** rewrite afterViewInit hook */
  ngAfterViewInit(): void {
    this.startSubscribe(this.$visibleChange);
  }
}
