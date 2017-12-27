import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-select-template',
  template: `
    <nz-select style="width: 120px;" [(ngModel)]="selectedOption" nzAllowClear>
      <nz-option *ngFor="let option of options" [nzLabel]="option.label" [nzValue]="option">
        <ng-template #nzOptionTemplate><i class="anticon" [ngClass]="'anticon-'+option.label"></i> {{option.label}}</ng-template>
      </nz-option>
    </nz-select>
  `,
  styles  : []
})
export class NzDemoSelectTemplateComponent {
  options = [
    { value: 'android', label: 'android' },
    { value: 'apple', label: 'apple' },
    { value: 'windows', label: 'windows' },
    { value: 'ie', label: 'ie' },
    { value: 'chrome', label: 'chrome' },
    { value: 'github', label: 'github' },
    { value: 'aliwangwang', label: 'aliwangwang' },
    { value: 'dingding', label: 'dingding' },
  ];
  selectedOption = this.options[ 0 ];
}


