/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { collapseMotion, InputBoolean, NzConfigService, WithConfig } from 'ng-zorro-antd/core';

import { NzCollapseComponent } from './nz-collapse.component';

const NZ_CONFIG_COMPONENT_NAME = 'collapsePanel';

@Component({
  selector: 'nz-collapse-panel',
  exportAs: 'nzCollapsePanel',
  templateUrl: './nz-collapse-panel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [collapseMotion],
  styles: [
    `
      nz-collapse-panel {
        display: block;
      }
    `
  ],
  host: {
    '[class.ant-collapse-no-arrow]': '!nzShowArrow',
    '[class.ant-collapse-item-active]': 'nzActive',
    '[class.ant-collapse-item-disabled]': 'nzDisabled'
  }
})
export class NzCollapsePanelComponent implements OnInit, OnDestroy {
  @Input() @InputBoolean() nzActive = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, true) @InputBoolean() nzShowArrow: boolean;
  @Input() nzExtra: string | TemplateRef<void>;
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

  constructor(
    public nzConfigService: NzConfigService,
    private cdr: ChangeDetectorRef,
    @Host() private nzCollapseComponent: NzCollapseComponent,
    elementRef: ElementRef,
    renderer: Renderer2
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-collapse-item');
  }

  ngOnInit(): void {
    this.nzCollapseComponent.addPanel(this);
  }

  ngOnDestroy(): void {
    this.nzCollapseComponent.removePanel(this);
  }
}
