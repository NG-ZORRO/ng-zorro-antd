/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  EventEmitter,
  InjectionToken,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  inject
} from '@angular/core';
import { Subject } from 'rxjs';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { TabTemplateContext } from './interfaces';
import { NzTabLinkDirective, NzTabLinkTemplateDirective } from './tab-link.directive';
import { NzTabDirective } from './tab.directive';

/**
 * Used to provide a tab set to a tab without causing a circular dependency.
 */
export const NZ_TAB_SET = new InjectionToken<NzSafeAny>(typeof ngDevMode !== 'undefined' && ngDevMode ? 'nz-tabs' : '');

@Component({
  selector: 'nz-tab',
  exportAs: 'nzTab',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-template #tabLinkTemplate>
      <ng-content select="[nz-tab-link]" />
    </ng-template>
    <ng-template #contentTemplate>
      <ng-content />
    </ng-template>
  `
})
export class NzTabComponent implements OnChanges, OnDestroy {
  @Input() nzTitle: string | TemplateRef<TabTemplateContext> = '';
  @Input({ transform: booleanAttribute }) nzClosable = false;
  @Input() nzCloseIcon: string | TemplateRef<NzSafeAny> = 'close';
  @Input({ transform: booleanAttribute }) nzDisabled = false;
  @Input({ transform: booleanAttribute }) nzForceRender = false;
  @Output() readonly nzSelect = new EventEmitter<void>();
  @Output() readonly nzDeselect = new EventEmitter<void>();
  @Output() readonly nzClick = new EventEmitter<void>();
  @Output() readonly nzContextmenu = new EventEmitter<MouseEvent>();

  @ContentChild(NzTabLinkTemplateDirective, { static: false }) nzTabLinkTemplateDirective!: NzTabLinkTemplateDirective;
  @ContentChild(NzTabDirective, { static: false, read: TemplateRef }) template: TemplateRef<void> | null = null;
  @ContentChild(NzTabLinkDirective, { static: false }) linkDirective!: NzTabLinkDirective;
  @ViewChild('contentTemplate', { static: true }) contentTemplate!: TemplateRef<NzSafeAny>;

  isActive: boolean = false;
  hasBeenActive = false;
  position: number | null = null;
  origin: number | null = null;
  closestTabSet = inject(NZ_TAB_SET);

  readonly stateChanges = new Subject<void>();

  get content(): TemplateRef<NzSafeAny> {
    return this.template || this.contentTemplate;
  }

  get label(): string | TemplateRef<NzSafeAny> {
    return this.nzTitle || this.nzTabLinkTemplateDirective?.templateRef;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzTitle, nzDisabled, nzForceRender } = changes;
    if (nzTitle || nzDisabled || nzForceRender) {
      this.stateChanges.next();
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }

  setActive(active: boolean): void {
    this.isActive = active;
    if (active) {
      this.hasBeenActive = true;
    }
  }
}
