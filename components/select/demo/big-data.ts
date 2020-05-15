import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-select-big-data',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nz-select nzMode="multiple" nzPlaceHolder="Please select" [nzOptions]="listOfOption" [(ngModel)]="listOfSelectedValue"> </nz-select>
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
  listOfOption: Array<{ value: string; label: string }> = [];
  listOfSelectedValue = ['a10', 'c12'];

  ngOnInit(): void {
    const children: string[] = [];
    for (let i = 10; i < 10000; i++) {
      children.push(`${i.toString(36)}${i}`);
    }
    this.listOfOption = children.map(item => {
      return {
        value: item,
        label: item
      };
    });
  }
}
