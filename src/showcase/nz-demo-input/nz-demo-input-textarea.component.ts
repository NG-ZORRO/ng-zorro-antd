import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-input-textarea',
  template: `
    <nz-input [(ngModel)]="inputValue" [nzType]="'textarea'" [nzRows]="'4'" [nzPlaceHolder]="''"></nz-input>`,
  styles  : []
})
export class NzDemoInputTextareaComponent implements OnInit {
  inputValue: string;

  constructor() {
  }

  ngOnInit() {
  }
}

