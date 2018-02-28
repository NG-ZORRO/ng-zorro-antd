import { Directive, OnDestroy, OnInit } from '@angular/core';

import { NzFormItemDirective } from './nz-form-item.directive';

@Directive({
  selector: '[nz-form-explain]',
  host    : {
    '[class.ant-form-explain]': 'true'
  }
})
export class NzFormExplainDirective implements OnDestroy, OnInit {
  constructor(private _nzFormItem: NzFormItemDirective) {
  }

  ngOnDestroy(): void {
    this._nzFormItem.disableHelp();
  }

  ngOnInit(): void {
    this._nzFormItem.enableHelp();
  }
}
