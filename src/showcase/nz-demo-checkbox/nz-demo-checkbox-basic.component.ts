import {Component} from '@angular/core';

@Component({
  selector: 'nz-demo-checkbox-basic',
  template: `
    <label nz-checkbox [(ngModel)]="_checked" (ngModelChange)="_console($event)">
      <span>Checkbox</span>
    </label>`,
  styles  : []
})
export class NzDemoCheckboxBasicComponent {
  _checked = true;

  _console(value) {
    console.log(value);
  }
}

