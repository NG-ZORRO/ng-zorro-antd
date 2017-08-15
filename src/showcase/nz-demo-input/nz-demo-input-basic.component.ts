import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-input-basic',
  template: `
    <nz-input [(ngModel)]="inputValue" [nzPlaceHolder]="'Basic usage'" (ngModelChange)="_console($event)"></nz-input>
    <p>{{inputValue}}</p>`,

  styles: []
})
export class NzDemoInputBasicComponent implements OnInit {
  inputValue: string;

  _console(value) {
    console.log(value);
  }

  constructor() {
  }

  ngOnInit() {
  }
}

