/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  input,
  linkedSignal,
  NgZone,
  output,
  TemplateRef,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

import { NzAnimationCollapseDirective } from 'ng-zorro-antd/core/animation';
import { NzConfigKey, onConfigChangeEventForComponent, WithConfig } from 'ng-zorro-antd/core/config';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzCollapseComponent } from './collapse.component';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'collapsePanel';

@Component({
  selector: 'nz-collapse-panel',
  exportAs: 'nzCollapsePanel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      #collapseHeader
      role="button"
      [attr.aria-expanded]="active()"
      [attr.aria-disabled]="nzDisabled || nzCollapsible === 'disabled'"
      [attr.tabindex]="nzDisabled || nzCollapsible === 'disabled' ? -1 : 0"
      class="ant-collapse-header"
      [class.ant-collapse-collapsible-icon]="nzCollapsible === 'icon'"
      [class.ant-collapse-collapsible-header]="nzCollapsible === 'header'"
    >
      @if (nzShowArrow) {
        <div role="button" #collapseIcon class="ant-collapse-expand-icon">
          <ng-container *nzStringTemplateOutlet="nzExpandedIcon; let expandedIcon">
            <nz-icon [nzType]="expandedIcon || 'right'" class="ant-collapse-arrow" [nzRotate]="active() ? 90 : 0" />
          </ng-container>
        </div>
      }
      <span class="ant-collapse-title">
        <ng-container *nzStringTemplateOutlet="nzHeader">{{ nzHeader }}</ng-container>
      </span>
      @if (nzExtra) {
        <div class="ant-collapse-extra">
          <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
        </div>
      }
    </div>
    <div
      class="ant-collapse-panel"
      [class.ant-collapse-panel-active]="active()"
      animation-collapse
      [open]="active()"
      leavedClassName="ant-collapse-panel-hidden"
    >
      <div class="ant-collapse-body">
        <ng-content />
      </div>
    </div>
  `,
  host: {
    class: 'ant-collapse-item',
    '[class.ant-collapse-no-arrow]': '!nzShowArrow',
    '[class.ant-collapse-item-active]': 'active()',
    '[class.ant-collapse-item-disabled]': `nzDisabled || nzCollapsible === 'disabled'`
  },
  imports: [NzOutletModule, NzIconModule, NzAnimationCollapseDirective]
})
export class NzCollapsePanelComponent implements AfterViewInit {
  private readonly ngZone = inject(NgZone);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly nzCollapseComponent = inject(NzCollapseComponent, { host: true });

  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  readonly nzActive = input(false, { transform: booleanAttribute });
  /**
   * @deprecated Will be removed in v22, please use `nzCollapsible` with the value `'disabled'` instead.
   */
  @Input({ transform: booleanAttribute }) nzDisabled = false;
  @Input({ transform: booleanAttribute }) @WithConfig() nzShowArrow: boolean = true;
  @Input() nzExtra?: string | TemplateRef<void>;
  @Input() nzHeader?: string | TemplateRef<void>;
  @Input() nzExpandedIcon?: string | TemplateRef<void>;
  @Input() nzCollapsible?: 'disabled' | 'header' | 'icon';
  readonly nzActiveChange = output<boolean>();

  /**
   * @description Actual active state of the panel.
   */
  readonly active = linkedSignal(() => this.nzActive());

  readonly collapseHeader = viewChild.required('collapseHeader', { read: ElementRef });
  readonly collapseIcon = viewChild('collapseIcon', { read: ElementRef });

  constructor() {
    onConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME, () => this.cdr.markForCheck());

    this.nzCollapseComponent.addPanel(this);
    this.destroyRef.onDestroy(() => {
      this.nzCollapseComponent.removePanel(this);
    });
  }

  ngAfterViewInit(): void {
    const icon = this.collapseIcon();
    const header = this.collapseHeader();
    const element =
      this.nzShowArrow && this.nzCollapsible === 'icon' && icon
        ? (icon.nativeElement as HTMLElement)
        : (header.nativeElement as HTMLElement);
    fromEventOutsideAngular(element, 'click')
      .pipe(
        filter(() => !this.nzDisabled && this.nzCollapsible !== 'disabled'),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.ngZone.run(() => {
          this.nzCollapseComponent.click(this);
        });
      });
  }

  activate(active: boolean): void {
    this.active.set(active);
    this.nzActiveChange.emit(active);
  }
}
