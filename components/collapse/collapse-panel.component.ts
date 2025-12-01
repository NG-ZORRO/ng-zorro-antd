/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  NgZone,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  type AfterViewInit
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';

import { collapseMotion, NzNoAnimationDirective } from 'ng-zorro-antd/core/animation';
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
  animations: [collapseMotion],
  template: `
    <div
      #collapseHeader
      role="button"
      [attr.aria-expanded]="nzActive"
      class="ant-collapse-header"
      [class.ant-collapse-icon-collapsible-only]="nzCollapsible === 'icon'"
      [class.ant-collapse-header-collapsible-only]="nzCollapsible === 'header'"
    >
      @if (nzShowArrow) {
        <div role="button" #collapseIcon class="ant-collapse-expand-icon">
          <ng-container *nzStringTemplateOutlet="nzExpandedIcon; let expandedIcon">
            <nz-icon [nzType]="expandedIcon || 'right'" class="ant-collapse-arrow" [nzRotate]="nzActive ? 90 : 0" />
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
      [@.disabled]="!!noAnimation?.nzNoAnimation?.()"
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
  imports: [NzOutletModule, NzIconModule]
})
export class NzCollapsePanelComponent implements OnInit, AfterViewInit {
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);
  private nzCollapseComponent = inject(NzCollapseComponent, { host: true });
  noAnimation = inject(NzNoAnimationDirective, { optional: true });

  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  @Input({ transform: booleanAttribute }) nzActive = false;
  /**
   * @deprecated Use `nzCollapsible` instead with the value `'disabled'`.
   */
  @Input({ transform: booleanAttribute }) nzDisabled = false;
  @Input({ transform: booleanAttribute }) @WithConfig() nzShowArrow: boolean = true;
  @Input() nzExtra?: string | TemplateRef<void>;
  @Input() nzHeader?: string | TemplateRef<void>;
  @Input() nzExpandedIcon?: string | TemplateRef<void>;
  @Input() nzCollapsible?: 'disabled' | 'header' | 'icon';
  @Output() readonly nzActiveChange = new EventEmitter<boolean>();

  @ViewChild('collapseHeader') collapseHeader!: ElementRef<HTMLElement>;
  @ViewChild('collapseIcon') collapseIcon?: ElementRef<HTMLElement>;

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  constructor() {
    onConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME, () => this.cdr.markForCheck());

    this.destroyRef.onDestroy(() => {
      this.nzCollapseComponent.removePanel(this);
    });
  }

  ngOnInit(): void {
    this.nzCollapseComponent.addPanel(this);
  }

  ngAfterViewInit(): void {
    let fromEvent$ = fromEventOutsideAngular(this.collapseHeader.nativeElement, 'click');
    if (this.nzShowArrow && this.nzCollapsible === 'icon' && this.collapseIcon) {
      fromEvent$ = fromEventOutsideAngular(this.collapseIcon!.nativeElement, 'click');
    }
    fromEvent$
      .pipe(
        filter(() => !this.nzDisabled && this.nzCollapsible !== 'disabled'),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.ngZone.run(() => {
          this.nzCollapseComponent.click(this);
          this.cdr.markForCheck();
        });
      });
  }
}
