import { Component, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector     : 'nz-demo-transfer',
  encapsulation: ViewEncapsulation.None,
  templateUrl  : './nz-demo-transfer.html'
})
export class NzDemoTransferComponent {
  NzDemoTransferBasicCode = require('!!raw-loader!./nz-demo-transfer-basic.component');
  NzDemoTransferSearchCode = require('!!raw-loader!./nz-demo-transfer-search.component');
  NzDemoTransferAdvancedCode = require('!!raw-loader!./nz-demo-transfer-advanced.component');
  NzDemoTransferCustomItemCode = require('!!raw-loader!./nz-demo-transfer-custom-item.component');
}
