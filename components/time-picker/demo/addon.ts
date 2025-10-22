import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';

@Component({
  selector: 'nz-demo-time-picker-addon',
  imports: [FormsModule, NzButtonModule, NzTimePickerModule],
  template: `
    <nz-time-picker [(ngModel)]="time" [nzAddOn]="addOnTemplate" #timePicker></nz-time-picker>
    <ng-template #addOnTemplate>
      <button nz-button nzSize="small" nzType="primary" (click)="timePicker.close()">Ok</button>
    </ng-template>
  `
})
export class NzDemoTimePickerAddonComponent {
  time: Date | null = null;
}
