import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'good-select-demo-basic',
  template: `
    <good-select [(ngModel)]="value"></good-select>
    <button (click)="handle()">手动阀</button>
  `,
  styles  : []
})
export class GoodSelectDemoBasicComponent implements OnInit {
  options = [];
  selectedOption;
  value: string = "";
  ngOnInit() {

  }

  handle() {
    console.log(this.value)
  }
}


