import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector     : 'nz-demo-modal',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-modal.html',
})
export class NzDemoModalComponent {
  NzDemoModalBasicCode = require('!!raw-loader!./nz-demo-modal-basic.component');
  NzDemoModalCustomizeCode = require('!!raw-loader!./nz-demo-modal-customize.component');
  NzDemoModalAsyncCode = require('!!raw-loader!./nz-demo-modal-async.component');
  NzDemoConfirmBasicCode = require('!!raw-loader!./nz-demo-confirm-basic.component');
  NzDemoConfirmAsyncCode = require('!!raw-loader!./nz-demo-confirm-async.component');
  NzDemoConfirmInfoCode = require('!!raw-loader!./nz-demo-confirm-info.component');
  NzDemoModalLocaleCode = require('!!raw-loader!./nz-demo-modal-locale.component');
  NzDemoModalStyleCode = require('!!raw-loader!./nz-demo-modal-style.component');
  NzDemoConfirmDestroyCode = require('!!raw-loader!./nz-demo-confirm-destroy.component');
  NzDemoModalServiceCode = require('!!raw-loader!./nz-demo-modal-service.component');
}
