import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-select-big-data',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-select nzMode="multiple" nzPlaceHolder="Please select" [(ngModel)]="listOfSelectedValue">
      <nz-option *ngFor="let item of listOfOption" [nzLabel]="item" [nzValue]="item"></nz-option>
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
export class NzDemoSelectBigDataComponent implements OnInit {
  listOfOption: string[] = [];
  listOfSelectedValue = ['a10', 'c12'];

  ngOnInit(): void {
    const children: string[] = [];
    for (let i = 10; i < 10000; i++) {
      children.push(`${i.toString(36)}${i}`);
    }
    this.listOfOption = children;
  }
}
