import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const init_options = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
      isLeaf: true
    }],
  }, {
    value: 'ningbo',
    label: 'Ningbo',
    isLeaf: true
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
      isLeaf: true
    }],
  }],
}];

@Component({
  selector: 'nz-demo-cascader-reactive-form',
  template: `
    <form [formGroup]="_form" novalidate>
      <nz-cascader
        [class.class123]="true"
        [nzOptions]="_options"
        (nzChange)="_console($event)"
        [formControlName]="'name'">
      </nz-cascader>
    </form>
    <br>
    <button nz-button (click)="_reset()">Reset</button>
    `,
  styles  : [
    `

    `
  ]
})
export class NzDemoCascaderReactiveFormComponent implements OnInit {
  /** init data */
  _options = null;

  _value: any[] = null;

  _form: FormGroup;

  _console(value) {
    console.log(value);
  }

  constructor(private _fb: FormBuilder) {
    this._createForm();
  }

  ngOnInit() {
    this._options = init_options;
  }

  _createForm() {
    this._form = this._fb.group({
      name: [null, Validators.required ]
    });
  }

  _reset(): void {
    this._form.reset();
  }
}

