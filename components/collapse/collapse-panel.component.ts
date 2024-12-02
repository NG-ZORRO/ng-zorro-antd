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
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  inject
} from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';

import { collapseMotion } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzCollapseComponent } from './collapse.component';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'collapsePanel';

@Component({
  selector: 'nz-collapse-panel',
  exportAs: 'nzCollapsePanel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  animations: [collapseMotion],
  template: `
    <div #collapseHeader role="button" [attr.aria-expanded]="nzActive" class="ant-collapse-header">
      @if (nzShowArrow) {
        <div>
          <ng-container *nzStringTemplateOutlet="nzExpandedIcon; let expandedIcon">
            <span
              nz-icon
              [nzType]="expandedIcon || 'right'"
              class="ant-collapse-arrow"
              [nzRotate]="nzActive ? 90 : 0"
            ></span>
          </ng-container>
        </div>
      }
      <span class="ant-collapse-header-text">
        <ng-container *nzStringTemplateOutlet="nzHeader">{{ nzHeader }}</ng-container>
      </span>
      @if (nzExtra) {
        <div class="ant-collapse-extra">
          <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
        </div>
      }
    </div>
    <div
      class="ant-collapse-content"
      [class.ant-collapse-content-active]="nzActive"
      [@.disabled]="!!noAnimation?.nzNoAnimation"
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
    '[class.ant-collapse-item-disabled]': 'nzDisabled'
  },
  providers: [NzDestroyService],
  imports: [NzOutletModule, NzIconModule]
})
export class NzCollapsePanelComponent implements OnInit, OnDestroy {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  @Input({ transform: booleanAttribute }) nzActive = false;
  @Input({ transform: booleanAttribute }) nzDisabled = false;
  @Input({ transform: booleanAttribute }) @WithConfig() nzShowArrow: boolean = true;
  @Input() nzExtra?: string | TemplateRef<void>;
  @Input() nzHeader?: string | TemplateRef<void>;
  @Input() nzExpandedIcon?: string | TemplateRef<void>;
  @Output() readonly nzActiveChange = new EventEmitter<boolean>();

  @ViewChild('collapseHeader', { static: true }) collapseHeader!: ElementRef<HTMLElement>;

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  private nzCollapseComponent = inject(NzCollapseComponent, { host: true });
  noAnimation = inject(NzNoAnimationDirective, { optional: true });

  constructor(
    public nzConfigService: NzConfigService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private destroy$: NzDestroyService
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

    fromEventOutsideAngular(this.collapseHeader.nativeElement, 'click')
      .pipe(
        filter(() => !this.nzDisabled),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.ngZone.run(() => {
          this.nzCollapseComponent.click(this);
          this.cdr.markForCheck();
        });
      });
  }

  ngOnDestroy(): void {
    this.nzCollapseComponent.removePanel(this);
  }
}
