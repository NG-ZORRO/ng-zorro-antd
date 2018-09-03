import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';

import { InputBoolean } from '../core/util/convert';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  selector           : 'nz-tab',
  preserveWhitespaces: false,
  template           : '<ng-template><ng-content></ng-content></ng-template>',
  host               : {
    '[class.ant-tabs-tabpane]': 'true'
  }
})
export class NzTabComponent {
  @ViewChild(TemplateRef) content: TemplateRef<void>;

  /** If this tab is disabled. Disabled tab could not be clicked and set active. */
  @Input() @InputBoolean() nzDisabled = false;

  /** Identifier of a tab. */
  @Input() nzPathOrParam: string;

  @Input()
  get nzTitle(): string | TemplateRef<void> { return this._title; }
  set nzTitle(value: string | TemplateRef<void>) {
    this.isTitleString = !(value instanceof TemplateRef);
    this._title = value;
  }

  isTitleString: boolean;
  private _title: string | TemplateRef<void>;

  @Output() readonly nzClick = new EventEmitter<void>();
  @Output() readonly nzSelect = new EventEmitter<void>();
  @Output() readonly nzDeselect = new EventEmitter<void>();

  position: number | null = null;
  origin: number | null = null;
}
