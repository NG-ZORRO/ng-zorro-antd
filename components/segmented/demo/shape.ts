import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';

@Component({
  selector: 'nz-demo-segmented-shape',
  imports: [NzSegmentedModule, FormsModule],
  template: `
    <nz-segmented [nzOptions]="optionsSize" (nzValueChange)="changeSize($event)" [ngModel]="currentSize()" />
    <nz-segmented [nzOptions]="options" nzShape="round" [nzSize]="currentSize()" />
  `,
  styles: `
    nz-segmented:first-child {
      display: block;
      width: fit-content;
      margin-bottom: 16px;
    }
  `
})
export class NzDemoSegmentedShapeComponent {
  currentSize = signal<NzSizeLDSType>('default');

  optionsSize = [
    { value: 'small', label: 'Small' },
    { value: 'default', label: 'Medium' },
    { value: 'large', label: 'Large' }
  ];
  options = [
    { value: 'List', icon: 'bars' },
    { value: 'Kanban', icon: 'appstore' }
  ];

  changeSize(value: string | number): void {
    this.currentSize.set(value as NzSizeLDSType);
  }
}
