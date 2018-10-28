import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';

import { toBoolean } from '../core/util/convert';

import { NzTabSetComponent } from './nz-tabset.component';

@Component({
  selector           : 'nz-tab',
  preserveWhitespaces: false,
  templateUrl        : './nz-tab.component.html',
  host               : {
    '[class.ant-tabs-tabpane]': 'true'
  }
})
export class NzTabComponent implements OnDestroy, OnInit {
  private _title: string | TemplateRef<void>;
  private _disabled = false;
  position: number | null = null;
  origin: number | null = null;
  isTitleString: boolean;

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  @Output() readonly nzClick = new EventEmitter<void>();
  @Output() readonly nzSelect = new EventEmitter<void>();
  @Output() readonly nzDeselect = new EventEmitter<void>();
  @ViewChild(TemplateRef) content: TemplateRef<void>;

  @Input()
  set nzTitle(value: string | TemplateRef<void>) {
    this.isTitleString = !(value instanceof TemplateRef);
    this._title = value;
  }

  get nzTitle(): string | TemplateRef<void> {
    return this._title;
  }

  constructor(private nzTabSetComponent: NzTabSetComponent) {
  }

  ngOnInit(): void {
    this.nzTabSetComponent.addTab(this);
  }

  ngOnDestroy(): void {
    this.nzTabSetComponent.removeTab(this);
  }

}
