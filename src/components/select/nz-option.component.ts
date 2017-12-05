import {
  Component,
  ViewEncapsulation,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';

import { NzSelectComponent } from './nz-select.component';
import { toBoolean } from '../util/convert';

@Component({
  selector     : 'nz-option',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ng-content></ng-content>
  `,
  styleUrls    : []
})
export class NzOptionComponent implements OnDestroy, OnInit {
  private _disabled = false;

  _value: string;
  _label: string;

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

  ngOnDestroy() {
    this._nzSelect.removeOption(this);
  }
}
