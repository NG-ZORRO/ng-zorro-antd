import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';

import { toBoolean } from '../core/util/convert';

import { NzTabSetComponent } from './nz-tabset.component';

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
  selector           : 'nz-tab',
  preserveWhitespaces: false,
  templateUrl        : './nz-tab.component.html',
  host               : {
    '[class.ant-tabs-tabpane]': 'true'
  }
})
export class NzTabComponent implements OnDestroy, OnInit {
  @ViewChild(TemplateRef) content: TemplateRef<void>;

  @Input() nzPathOrParam: string; // Identifier of a tab.

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  private _disabled = false;

  @Input()
  set nzTitle(value: string | TemplateRef<void>) {
    this.isTitleString = !(value instanceof TemplateRef);
    this._title = value;
  }

  get nzTitle(): string | TemplateRef<void> {
    return this._title;
  }

  isTitleString: boolean;
  private _title: string | TemplateRef<void>;

  @Output() readonly nzClick = new EventEmitter<void>();
  @Output() readonly nzSelect = new EventEmitter<void>();
  @Output() readonly nzDeselect = new EventEmitter<void>();

  position: number | null = null;
  origin: number | null = null;

  constructor(private nzTabSetComponent: NzTabSetComponent) {
  }

  ngOnInit(): void {
    this.nzTabSetComponent.addTab(this);
  }

  ngOnDestroy(): void {
    this.nzTabSetComponent.removeTab(this);
  }
}
