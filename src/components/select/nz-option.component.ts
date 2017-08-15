import {
  Component,
  ViewEncapsulation,
  Input,
  OnDestroy
} from '@angular/core';

import { NzSelectComponent } from './nz-select.component';

@Component({
  selector     : 'nz-option',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ng-content></ng-content>
  `,
  styleUrls    : []
})
export class NzOptionComponent implements OnDestroy {
  _value: string;
  _label: string;
  _disabled = false;

  @Input()
  get nzValue(): string {
    return this._value;
  };

  set nzValue(value: string) {
    if (this._value === value) {
      return;
    }
    this._value = value;
  }

  @Input()
  get nzLabel(): string {
    return this._label;
  };

  set nzLabel(value: string) {
    if (this._label === value) {
      return;
    }
    this._label = value;
  }

  @Input()
  get nzDisabled(): boolean {
    return this._disabled;
  };

  set nzDisabled(value: boolean) {
    this._disabled = value;
  }

  constructor(private _nzSelect: NzSelectComponent) {
    this._nzSelect.addOption(this);
  }

  ngOnDestroy() {
    this._nzSelect.removeOption(this);
  }
}
