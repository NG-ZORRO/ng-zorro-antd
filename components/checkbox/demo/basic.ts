import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-checkbox-basic',
  template: `
    <label nz-checkbox [(ngModel)]="checked" (ngModelChange)="log($event)" nzAutoFocus>
      <span>Checkbox</span>
    </label>`,
  styles  : []
})
export class NzDemoCheckboxBasicComponent {
  checked = true;

  log(value: boolean): void {
    console.log(value);
  }
}
