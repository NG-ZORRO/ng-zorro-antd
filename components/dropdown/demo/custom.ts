import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-dropdown-custom',
  template: `
    <nz-dropdown [nzTrigger]="'click'">
      <button nz-button nz-dropdown><span>Dropdown with tag select</span></button>
      <nz-select nzMode="tags" style="width: 300px;" nzPlaceHolder="Tag Mode" [(ngModel)]="listOfTagOptions">
        <nz-option *ngFor="let option of listOfOption" [nzLabel]="option.label" [nzValue]="option.value">
        </nz-option>
      </nz-select>
    </nz-dropdown>`,
  styles  : []
})
export class NzDemoDropdownCustomComponent implements OnInit {
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
