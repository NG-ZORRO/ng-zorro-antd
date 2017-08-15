import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'nz-demo-checkbox-basic',
  template: `
    <label nz-checkbox [(ngModel)]="_checked" (ngModelChange)="_console($event)">
      <span>Checkbox</span>
    </label>`,
  styles  : []
})
export class NzDemoCheckboxBasicComponent implements OnInit {
  _checked = true;

  _console(value) {
    console.log(value);
  }

  constructor() {
  }

  ngOnInit() {
  }
}

