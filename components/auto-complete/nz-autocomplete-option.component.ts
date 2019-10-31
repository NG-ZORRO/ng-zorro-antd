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
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { scrollIntoView, InputBoolean } from 'ng-zorro-antd/core';

export class NzOptionSelectionChange {
  constructor(public source: NzAutocompleteOptionComponent, public isUserInput: boolean = false) {}
}

@Component({
  selector: 'nz-auto-option',
  exportAs: 'nzAutoOption',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './nz-autocomplete-option.component.html',
  host: {
    role: 'menuitem',
    class: 'ant-select-dropdown-menu-item',
    '[class.ant-select-dropdown-menu-item-selected]': 'selected',
    '[class.ant-select-dropdown-menu-item-active]': 'active',
    '[class.ant-select-dropdown-menu-item-disabled]': 'nzDisabled',
    '[attr.aria-selected]': 'selected.toString()',
    '[attr.aria-disabled]': 'nzDisabled.toString()',
    '(click)': 'selectViaInteraction()',
    '(mousedown)': '$event.preventDefault()'
  }
})
export class NzAutocompleteOptionComponent {
  /* tslint:disable-next-line:no-any */
  @Input() nzValue: any;
  @Input() nzLabel: string;
  @Input() @InputBoolean() nzDisabled = false;
  @Output() readonly selectionChange = new EventEmitter<NzOptionSelectionChange>();

  active = false;
  selected = false;

  constructor(private changeDetectorRef: ChangeDetectorRef, private element: ElementRef) {}

  select(emit: boolean = true): void {
    this.selected = true;
    this.changeDetectorRef.markForCheck();
    if (emit) {
      this.emitSelectionChangeEvent();
    }
  }

  deselect(): void {
    this.selected = false;
    this.changeDetectorRef.markForCheck();
    this.emitSelectionChangeEvent();
  }

  /** Git display label */
  getLabel(): string {
    return this.nzLabel || this.nzValue.toString();
  }

  /** Set active (only styles) */
  setActiveStyles(): void {
    if (!this.active) {
      this.active = true;
      this.changeDetectorRef.markForCheck();
    }
  }

  /** Unset active (only styles) */
  setInactiveStyles(): void {
    if (this.active) {
      this.active = false;
      this.changeDetectorRef.markForCheck();
    }
  }

  scrollIntoViewIfNeeded(): void {
    scrollIntoView(this.element.nativeElement);
  }

  selectViaInteraction(): void {
    if (!this.nzDisabled) {
      this.selected = !this.selected;
      if (this.selected) {
        this.setActiveStyles();
      } else {
        this.setInactiveStyles();
      }
      this.emitSelectionChangeEvent(true);
      this.changeDetectorRef.markForCheck();
    }
  }

  private emitSelectionChangeEvent(isUserInput: boolean = false): void {
    this.selectionChange.emit(new NzOptionSelectionChange(this, isUserInput));
  }
}
