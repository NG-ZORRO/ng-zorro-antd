/**
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
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { collapseMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

import { NzCollapseComponent } from './collapse.component';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'collapsePanel';

@Component({
  selector: 'nz-collapse-panel',
  exportAs: 'nzCollapsePanel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [collapseMotion],
  template: `
    <div
      #collapseHeader
      role="button"
      [attr.aria-expanded]="nzActive"
      class="ant-collapse-header"
      [class.ant-collapse-header-collapsible-only]="nzCollapsible === 'header'"
    >
      <div *ngIf="nzShowArrow">
        <ng-container *nzStringTemplateOutlet="nzExpandedIcon; let expandedIcon">
          <i nz-icon [nzType]="expandedIcon || 'right'" class="ant-collapse-arrow" [nzRotate]="nzActive ? 90 : 0"></i>
        </ng-container>
      </div>
      <span #collapseHeaderText class="ant-collapse-header-text">
        <ng-container *nzStringTemplateOutlet="nzHeader">
          {{ nzHeader }}
        </ng-container>
      </span>
      <div class="ant-collapse-extra" *ngIf="nzExtra">
        <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
      </div>
    </div>
    <div
      class="ant-collapse-content"
      [class.ant-collapse-content-active]="nzActive"
      [@.disabled]="noAnimation?.nzNoAnimation"
      [@collapseMotion]="nzActive ? 'expanded' : 'hidden'"
    >
      <div class="ant-collapse-content-box">
        <ng-content></ng-content>
      </div>
    </div>
  `,

  host: {
    class: 'ant-collapse-item',
    '[class.ant-collapse-no-arrow]': '!nzShowArrow',
    '[class.ant-collapse-item-active]': 'nzActive',
    '[class.ant-collapse-item-disabled]': 'nzDisabled || nzCollapsible === "disabled"'
  },
  providers: [NzDestroyService]
})
export class NzCollapsePanelComponent implements OnInit, OnDestroy {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;
  static ngAcceptInputType_nzActive: BooleanInput;
  static ngAcceptInputType_nzDisabled: BooleanInput;
  static ngAcceptInputType_nzShowArrow: BooleanInput;

  @Input() @InputBoolean() nzActive = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @WithConfig() @InputBoolean() nzShowArrow: boolean = true;
  @Input() nzExtra?: string | TemplateRef<void>;
  @Input() nzHeader?: string | TemplateRef<void>;
  @Input() nzExpandedIcon?: string | TemplateRef<void>;
  @Input() nzCollapsible?: 'disabled' | 'header';
  @Output() readonly nzActiveChange = new EventEmitter<boolean>();

  @ViewChild('collapseHeader', { static: true }) collapseHeader!: ElementRef<HTMLElement>;
  @ViewChild('collapseHeaderText', { static: true }) collapseHeaderText!: ElementRef<HTMLElement>;

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  constructor(
    public nzConfigService: NzConfigService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private destroy$: NzDestroyService,
    @Host() private nzCollapseComponent: NzCollapseComponent,
    @Optional() public noAnimation?: NzNoAnimationDirective
  ) {
    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    this.nzCollapseComponent.addPanel(this);
    const target = this.nzCollapsible === 'header' ? this.collapseHeaderText : this.collapseHeader;

    this.ngZone.runOutsideAngular(() =>
      fromEvent(target.nativeElement, 'click')
        .pipe(
          filter(() => !this.nzDisabled && this.nzCollapsible !== 'disabled'),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.ngZone.run(() => {
            this.nzCollapseComponent.click(this);
            this.cdr.markForCheck();
          });
        })
    );
  }

  ngOnDestroy(): void {
    this.nzCollapseComponent.removePanel(this);
  }
}
