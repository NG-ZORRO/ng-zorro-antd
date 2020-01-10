import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-popover-basic',
  template: `
    <button nz-button nz-popover nzType="primary" nzPopoverTitle="Title" nzPopoverContent="Content">
      Hover me
    </button>
  `
})
export class NzDemoPopoverBasicComponent {}
