import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-select-multiple',
  template: `
    <nz-select [nzMaxTagCount]="3" [nzMaxTagPlaceholder]="tagPlaceHolder" style="width: 100%" nzMode="multiple" nzPlaceHolder="Please select" [(ngModel)]="listOfSelectedValue">
      <nz-option *ngFor="let option of listOfOption" [nzLabel]="option.label" [nzValue]="option.value"></nz-option>
    </nz-select>
    <ng-template #tagPlaceHolder let-selectedList>
      and {{selectedList.length}} more selected
    </ng-template>
  `
})
export class NzDemoSelectMultipleComponent implements OnInit {
  listOfOption = [];
  listOfSelectedValue = [ 'a10', 'c12' ];

  ngOnInit(): void {
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }
}
