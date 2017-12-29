import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-affix',
  template: `
    <nz-input [nzType]="'text'" [nzPlaceHolder]="'Enter your userName'">
      <ng-template #prefix>
        <i class="anticon anticon-user"></i>
      </ng-template>
    </nz-input>
  `,
  styles  : []
})
export class NzDemoInputAffixComponent { }
