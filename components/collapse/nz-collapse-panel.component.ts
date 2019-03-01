import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, ElementRef,
  EventEmitter, Host,
  HostBinding,
  Input, OnDestroy, OnInit,
  Output, Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { collapseMotion } from '../core/animation/collapse';

import { InputBoolean } from '../core/util/convert';
import { NzCollapseComponent } from './nz-collapse.component';

@Component({
  selector       : 'nz-collapse-panel',
  templateUrl    : './nz-collapse-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation  : ViewEncapsulation.None,
  animations     : [ collapseMotion ],
  styles         : [
      ` nz-collapse-panel {
      display: block
    }`
  ],
  host           : {
    '[class.ant-collapse-no-arrow]': '!nzShowArrow'
  }
})

export class NzCollapsePanelComponent implements OnInit, OnDestroy {
  @Input() @InputBoolean() @HostBinding('class.ant-collapse-item-active') nzActive = false;
  @Input() @InputBoolean() @HostBinding('class.ant-collapse-item-disabled') nzDisabled = false;
  @Input() @InputBoolean() nzShowArrow = true;
  @Input() nzHeader: string | TemplateRef<void>;
  @Input() nzExpandedIcon: string | TemplateRef<void>;
  @Output() readonly nzActiveChange = new EventEmitter<boolean>();

  clickHeader(): void {
    if (!this.nzDisabled) {
      this.nzCollapseComponent.click(this);
    }
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  constructor(private cdr: ChangeDetectorRef, @Host() private nzCollapseComponent: NzCollapseComponent, elementRef: ElementRef, renderer: Renderer2) {
    renderer.addClass(elementRef.nativeElement, 'ant-collapse-item');
  }

  ngOnInit(): void {
    this.nzCollapseComponent.addPanel(this);
  }

  ngOnDestroy(): void {
    this.nzCollapseComponent.removePanel(this);
  }
}
