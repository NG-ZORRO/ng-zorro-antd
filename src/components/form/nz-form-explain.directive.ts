import { Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { NzFormItemDirective } from './nz-form-item.directive';

@Component({
  selector     : '[nz-form-explain]',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <ng-content></ng-content>
  `,
  styles       : []
})
export class NzFormExplainComponent implements OnDestroy, OnInit {
  @HostBinding(`class.ant-form-explain`) _nzFormExplain = true;

  constructor(private _nzFormItem: NzFormItemDirective) {
  }

  ngOnDestroy(): any {
    this._nzFormItem.disableHelp();
  }

  ngOnInit() {
    this._nzFormItem.enableHelp();
  }
}
