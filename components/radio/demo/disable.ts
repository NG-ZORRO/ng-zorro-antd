import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-radio-disable',
  template: `
    <div>
      <label nz-radio [nzDisabled]="disabled">
        <span>Disabled</span>
      </label>
      <br>
      <label nz-radio [nzDisabled]="disabled">
        <span>Disabled</span>
      </label>
      <div style="margin-top:20px;">
        <button nz-button nzType="primary" (click)="disabled=!disabled">Toggle disabled</button>
      </div>
    </div>

  `,
  styles  : []
})
export class NzDemoRadioDisableComponent {
  disabled = true;
}
