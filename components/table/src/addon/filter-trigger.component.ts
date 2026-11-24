/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InteractivityChecker } from '@angular/cdk/a11y';
import {
  afterNextRender,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Injector,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  DestroyRef,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';
import { NzDropdownDirective, NzDropdownModule, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';
import { NzI18nService, NzTableI18nInterface } from 'ng-zorro-antd/i18n';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'filterTrigger';

@Component({
  selector: 'nz-filter-trigger',
  exportAs: `nzFilterTrigger`,
  encapsulation: ViewEncapsulation.None,
  template: `
    <span
      nz-dropdown
      class="ant-table-filter-trigger"
      role="button"
      tabindex="0"
      nzTrigger="click"
      nzPlacement="bottomRight"
      [nzBackdrop]="nzBackdrop"
      [nzClickHide]="false"
      [nzDropdownMenu]="nzDropdownMenu"
      [class.active]="nzActive"
      [class.ant-table-filter-open]="nzVisible"
      [nzVisible]="nzVisible"
      [attr.aria-label]="locale.filterTitle ?? 'Filter menu'"
      [attr.aria-expanded]="nzVisible"
      (keydown.enter)="onKeyDown($event)"
      (keydown.space)="onKeyDown($event)"
      (nzVisibleChange)="onVisibleChange($event)"
    >
      <ng-content />
    </span>
  `,
  imports: [NzDropdownModule]
})
export class NzFilterTriggerComponent implements OnChanges, OnInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  public readonly nzConfigService = inject(NzConfigService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);
  private readonly i18n = inject(NzI18nService);
  private readonly injector = inject(Injector);
  private readonly interactivityChecker = inject(InteractivityChecker);
  private isKeyboardTriggered = false;
  locale: NzTableI18nInterface = {};

  @Input() nzActive = false;
  @Input() nzDropdownMenu!: NzDropdownMenuComponent;
  @Input() nzVisible = false;

  @Input({ transform: booleanAttribute }) @WithConfig() nzBackdrop = false;

  @Output() readonly nzVisibleChange = new EventEmitter<boolean>();

  @ViewChild(NzDropdownDirective, { static: true, read: ElementRef }) nzDropdown!: ElementRef<HTMLElement>;

  onVisibleChange(visible: boolean): void {
    this.nzVisible = visible;
    if (visible && this.isKeyboardTriggered) {
      afterNextRender(() => this.focusPanel(), { injector: this.injector });
    } else if (!visible) {
      this.restoreFocus();
    }
    this.nzVisibleChange.next(visible);
  }

  onKeyDown(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.isKeyboardTriggered = true;
    this.nzDropdown.nativeElement.click();
  }

  private restoreFocus(): void {
    const trigger = this.nzDropdown.nativeElement;
    if (
      this.isKeyboardTriggered &&
      this.nzDropdownMenu.dropdownElement()?.nativeElement.contains(trigger.ownerDocument.activeElement)
    ) {
      trigger.focus();
    }
    this.isKeyboardTriggered = false;
  }

  private focusPanel(): void {
    const trigger = this.nzDropdown.nativeElement;
    if (!this.nzVisible || !this.isKeyboardTriggered || trigger.ownerDocument.activeElement !== trigger) {
      return;
    }
    const elements = this.nzDropdownMenu.dropdownElement()?.nativeElement.querySelectorAll<HTMLElement>('*');
    const firstTabbable =
      elements && Array.from(elements).find(element => this.interactivityChecker.isTabbable(element));
    firstTabbable?.focus();
  }

  hide(): void {
    this.nzVisible = false;
    this.restoreFocus();
    this.cdr.markForCheck();
  }

  show(): void {
    this.nzVisible = true;
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Table');
      this.cdr.markForCheck();
    });
    fromEventOutsideAngular(this.nzDropdown.nativeElement, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => event.stopPropagation());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzVisible && !this.nzVisible) {
      this.restoreFocus();
    }
  }
}
