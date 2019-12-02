import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-select-automatic-tokenization',
  template: `
    <nz-select [(ngModel)]="listOfTagOptions" nzMode="tags" [nzTokenSeparators]="[',']" nzPlaceHolder="automatic tokenization">
      <nz-option *ngFor="let option of listOfOption" [nzLabel]="option.label" [nzValue]="option.value"></nz-option>
    </nz-select>
  `,
  styles: [
    `
      nz-select {
        width: 100%;
      }
    `
  ]
})
export class NzDemoSelectAutomaticTokenizationComponent implements OnInit {
  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];

  ngOnInit(): void {
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }
}
