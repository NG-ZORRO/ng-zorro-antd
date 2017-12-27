import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-basic',
  template: `
    <nz-input [(ngModel)]="inputValue" [nzPlaceHolder]="'Basic usage'" (ngModelChange)="_console($event)"></nz-input>
    <p>{{inputValue}}</p>`,

  styles: []
})
export class NzDemoInputBasicComponent {
  inputValue: string;

  _console(value) {
    console.log(value);
  }
}
