import { Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NzFormItemDirective } from './nz-form-item.directive';

@Component({
  selector     : '[nz-form-explain]',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ng-content></ng-content>
  `,
  styles       : [],
  host: {
    '[class.ant-form-explain]': 'true'
  }
})
export class NzFormExplainComponent implements OnDestroy, OnInit {
  constructor(private _nzFormItem: NzFormItemDirective) {
  }

  ngOnDestroy(): void {
    this._nzFormItem.disableHelp();
  }

  ngOnInit(): void {
    this._nzFormItem.enableHelp();
  }
}
