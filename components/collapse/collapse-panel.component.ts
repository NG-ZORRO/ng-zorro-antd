/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { _IdGenerator } from '@angular/cdk/a11y';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import {
  AfterViewInit,
  booleanAttribute,
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
  encapsulation: ViewEncapsulation.None,
  template: `
    <div
      #collapseHeader
      [attr.role]="iconTrigger ? null : 'button'"
      [attr.aria-expanded]="iconTrigger ? null : active()"
      [attr.aria-disabled]="iconTrigger ? null : disabled"
      [attr.tabindex]="iconTrigger ? null : disabled ? -1 : 0"
      class="ant-collapse-header"
      [class.ant-collapse-collapsible-icon]="nzCollapsible === 'icon'"
      [class.ant-collapse-collapsible-header]="nzCollapsible === 'header'"
    >
      @if (nzShowArrow) {
        <div
          #collapseIcon
          [attr.role]="iconTrigger ? 'button' : null"
          [attr.aria-expanded]="iconTrigger ? active() : null"
          [attr.aria-labelledby]="iconTrigger ? titleId : null"
          [attr.tabindex]="iconTrigger ? 0 : null"
          class="ant-collapse-expand-icon"
        >
          <ng-container *nzStringTemplateOutlet="nzExpandedIcon; let expandedIcon">
            <nz-icon [nzType]="expandedIcon || 'right'" class="ant-collapse-arrow" [nzRotate]="active() ? 90 : 0" />
          </ng-container>
        </div>
      }
      <span class="ant-collapse-title" [attr.id]="iconTrigger ? titleId : null">
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
    '[class.ant-collapse-item-disabled]': `disabled`
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
  @Input({ transform: booleanAttribute }) @WithConfig() nzShowArrow: boolean = true;
  @Input() nzExtra?: string | TemplateRef<void>;
  @Input() nzHeader?: string | TemplateRef<void>;
  @Input() nzExpandedIcon?: string | TemplateRef<void>;
  @Input() nzCollapsible?: 'disabled' | 'header' | 'icon';
  readonly nzActiveChange = output<boolean>();

  protected readonly titleId = inject(_IdGenerator).getId('nz-collapse-title-');

  protected get disabled(): boolean {
    return this.nzCollapsible === 'disabled';
  }

  /**
   * Whether the expand icon is the only trigger, in which case it carries the
   * button role, the tab stop and the keyboard handler instead of the header.
   */
  protected get iconTrigger(): boolean {
    return this.nzShowArrow && this.nzCollapsible === 'icon';
  }

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
      this.iconTrigger && icon ? (icon.nativeElement as HTMLElement) : (header.nativeElement as HTMLElement);
    const toggle = (): void => {
      this.ngZone.run(() => {
        this.nzCollapseComponent.click(this);
      });
    };
    fromEventOutsideAngular(element, 'click')
      .pipe(
        filter(() => !this.disabled),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(toggle);
    // The trigger is a `div`, which does not turn Enter or Space into a click
    // the way a `button` does.
    fromEventOutsideAngular<KeyboardEvent>(element, 'keydown')
      .pipe(
        filter(({ keyCode }) => !this.disabled && (keyCode === ENTER || keyCode === SPACE)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(event => {
        // Space would otherwise scroll the page.
        event.preventDefault();
        toggle();
      });
  }

  activate(active: boolean): void {
    this.active.set(active);
    this.nzActiveChange.emit(active);
  }
}
