import { animate, state, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter, Host,
  HostBinding,
  Input, OnDestroy, OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { InputBoolean } from '../core/util/convert';
import { NzCollapseComponent } from './nz-collapse.component';

@Component({
  selector       : 'nz-collapse-panel',
  templateUrl    : './nz-collapse-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation  : ViewEncapsulation.None,
  animations     : [
    trigger('collapseState', [
      state('inactive', style({
        opacity: '0',
        height : 0
      })),
      state('active', style({
        opacity: '1',
        height : '*'
      })),
      transition('inactive => active', animate('150ms ease-in')),
      transition('active => inactive', animate('150ms ease-out'))
    ])
  ],
  styles         : [
      ` nz-collapse-panel {
      display: block
    }`
  ],
  host           : {
    '[class.ant-collapse-item]'    : 'true',
    '[class.ant-collapse-no-arrow]': '!nzShowArrow'
  }
})

export class NzCollapsePanelComponent implements OnInit, OnDestroy {
  @Input() @InputBoolean() @HostBinding('class.ant-collapse-item-active') nzActive = false;
  @Input() @InputBoolean() @HostBinding('class.ant-collapse-item-disabled') nzDisabled = false;
  @Input() @InputBoolean() nzShowArrow = true;
  @Input() nzHeader: string | TemplateRef<void>;
  @Output() readonly nzActiveChange = new EventEmitter<boolean>();

  clickHeader(): void {
    if (!this.nzDisabled) {
      this.nzCollapseComponent.click(this);
    }
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  constructor(private cdr: ChangeDetectorRef, @Host() private nzCollapseComponent: NzCollapseComponent) {
  }

  ngOnInit(): void {
    this.nzCollapseComponent.addPanel(this);
  }

  ngOnDestroy(): void {
    this.nzCollapseComponent.removePanel(this);
  }
}
