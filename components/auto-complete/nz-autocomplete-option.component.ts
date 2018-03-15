import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter,
  Input, Output
} from '@angular/core';

import { toBoolean } from '../core/util/convert';

export class NzOptionSelectionChange {
  constructor(
    public source: NzAutocompleteOptionComponent,
    public isUserInput: boolean = false
  ) { }
}

@Component({
  selector: 'nz-auto-option',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  template           : `<ng-content></ng-content>`,
  host               : {
    'role'                                          : 'menuitem',
    'class'                                         : 'ant-select-dropdown-menu-item',
    '[class.ant-select-dropdown-menu-item-selected]': 'selected',
    '[class.ant-select-dropdown-menu-item-active]'  : 'active',
    '[class.ant-select-dropdown-menu-item-disabled]': 'nzDisabled',
    '[attr.aria-selected]'                          : 'selected.toString()',
    '[attr.aria-disabled]'                          : 'nzDisabled.toString()',
    '(click)'                                       : 'selectViaInteraction()'
  }
})
export class NzAutocompleteOptionComponent {
  private disabled = false;

  active = false;
  selected = false;

  @Input() nzValue: {};
  @Input() nzLabel: string;

  @Input()
  get nzDisabled(): boolean { return this.disabled; }
  set nzDisabled(value: boolean) { this.disabled = toBoolean(value); }

  @Output() selectionChange = new EventEmitter<NzOptionSelectionChange>();

  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  /** 选择 */
  select(): void {
    this.selected = true;
    this.changeDetectorRef.markForCheck();
    this.emitSelectionChangeEvent();
  }

  /** 取消选择 */
  deselect(): void {
    this.selected = false;
    this.changeDetectorRef.markForCheck();
    this.emitSelectionChangeEvent();
  }

  /** 获取用于显示的 label */
  getLabel(): string {
    return this.nzLabel || this.nzValue.toString();
  }

  /** 设置激活样式 (仅限样式) */
  setActiveStyles(): void {
    if (!this.active) {
      this.active = true;
      this.changeDetectorRef.markForCheck();
    }
  }

  /** 设置非激活样式 (仅限样式) */
  setInactiveStyles(): void {
    if (this.active) {
      this.active = false;
      this.changeDetectorRef.markForCheck();
    }
  }

  private emitSelectionChangeEvent(isUserInput: boolean = false): void {
    this.selectionChange.emit(new NzOptionSelectionChange(this, isUserInput));
  }

  selectViaInteraction(): void {
    if (!this.disabled) {
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

}
