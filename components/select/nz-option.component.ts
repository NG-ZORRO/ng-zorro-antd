import {
  Component,
  ContentChild,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef
} from '@angular/core';

import { toBoolean } from '../core/util/convert';
import { NzSelectComponent } from './nz-select.component';

@Component({
  selector           : 'nz-option',
  preserveWhitespaces: false,
  template           : `
    <ng-content></ng-content>
  `
})
export class NzOptionComponent implements OnDestroy, OnInit {
  private _disabled = false;

  _value: string;
  _label: string;
  @ContentChild('nzOptionTemplate') nzOptionTemplate: TemplateRef<void>;

  @Input()
  set nzValue(value: string) {
    if (this._value === value) {
      return;
    }
    this._value = value;
  }

  get nzValue(): string {
    return this._value;
  }

  @Input()
  set nzLabel(value: string) {
    if (this._label === value) {
      return;
    }
    this._label = value;
  }

  get nzLabel(): string {
    return this._label;
  }

  @Input()
  set nzDisabled(value: boolean) {
    this._disabled = toBoolean(value);
  }

  get nzDisabled(): boolean {
    return this._disabled;
  }

  constructor(private _nzSelect: NzSelectComponent) {
  }

  ngOnInit(): void {
    this._nzSelect.addOption(this);
  }

  ngOnDestroy(): void {
    this._nzSelect.removeOption(this);
  }
}
