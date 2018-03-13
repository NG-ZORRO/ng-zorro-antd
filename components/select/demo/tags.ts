import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-select-tags',
  template: `
    <nz-select nzMode="tags" style="width: 100%;" nzPlaceHolder="Tag Mode" [(ngModel)]="listOfTagOptions">
      <nz-option *ngFor="let option of listOfOption" [nzLabel]="option.label" [nzValue]="option.value">
      </nz-option>
    </nz-select>
  `
})
export class NzDemoSelectTagsComponent implements OnInit {
  listOfOption = [];
  listOfTagOptions = [];

  ngOnInit(): void {
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }
}
