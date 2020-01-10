import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-time-picker-addon',
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
