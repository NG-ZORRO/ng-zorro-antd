/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Host,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { collapseMotion } from 'ng-zorro-antd/core/animation';

import { NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzCollapseComponent } from './collapse.component';

const NZ_CONFIG_COMPONENT_NAME = 'collapsePanel';

@Component({
  selector: 'nz-collapse-panel',
  exportAs: 'nzCollapsePanel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [collapseMotion],
  template: `
    <div role="tab" [attr.aria-expanded]="nzActive" class="ant-collapse-header" (click)="clickHeader()">
      <ng-container *ngIf="nzShowArrow">
        <ng-container *nzStringTemplateOutlet="nzExpandedIcon; let expandedIcon">
          <i nz-icon [nzType]="expandedIcon || 'right'" class="ant-collapse-arrow" [nzRotate]="nzActive ? 90 : 0"></i>
        </ng-container>
      </ng-container>
      <ng-container *nzStringTemplateOutlet="nzHeader">{{ nzHeader }}</ng-container>
      <div class="ant-collapse-extra" *ngIf="nzExtra">
        <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
      </div>
    </div>
    <div class="ant-collapse-content" [class.ant-collapse-content-active]="nzActive" [@collapseMotion]="nzActive ? 'expanded' : 'hidden'">
      <div class="ant-collapse-content-box">
        <ng-content></ng-content>
      </div>
    </div>
  `,

  host: {
    '[class.ant-collapse-item]': 'true',
    '[class.ant-collapse-no-arrow]': '!nzShowArrow',
    '[class.ant-collapse-item-active]': 'nzActive',
    '[class.ant-collapse-item-disabled]': 'nzDisabled'
  }
})
export class NzCollapsePanelComponent implements OnInit, OnDestroy {
  static ngAcceptInputType_nzActive: BooleanInput;
  static ngAcceptInputType_nzDisabled: BooleanInput;
  static ngAcceptInputType_nzShowArrow: BooleanInput;

  @Input() @InputBoolean() nzActive = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME) @InputBoolean() nzShowArrow: boolean = true;
  @Input() nzExtra?: string | TemplateRef<void>;
  @Input() nzHeader?: string | TemplateRef<void>;
  @Input() nzExpandedIcon?: string | TemplateRef<void>;
  @Output() readonly nzActiveChange = new EventEmitter<boolean>();
  private destroy$ = new Subject();
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
    @Host() private nzCollapseComponent: NzCollapseComponent
  ) {
    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    this.nzCollapseComponent.addPanel(this);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.nzCollapseComponent.removePanel(this);
  }
}
