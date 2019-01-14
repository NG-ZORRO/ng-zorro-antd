import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-result-custom',
  template: `
    <nz-result [nzIcon]="iconTpl" [nzTitle]="'Greate, we have done all the operators!'" [nzExtra]="extraTpl">
      <ng-template #iconTpl>
        <i nz-icon type="smile" theme="twotone"></i>
      </ng-template>
      <ng-template #extraTpl>
        <button nz-button nzType="primary">Next</button>
      </ng-template>
    </nz-result>
  `
})
export class NzDemoResultCustomComponent {
}
