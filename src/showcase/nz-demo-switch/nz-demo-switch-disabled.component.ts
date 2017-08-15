import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-switch-disabled',
  template: `
    <nz-switch [(ngModel)]="switchValue" [nzDisabled]="isDisabled"></nz-switch>
    <div style="margin-top:8px;">
      <button nz-button [nzType]="'primary'" (click)="toggleDisabled()">Toggle disabled</button>
    </div>`,
  styles  : []
})
export class NzDemoSwitchDisabledComponent implements OnInit {
  switchValue = false;
  isDisabled = true;
  toggleDisabled = () => {
    this.isDisabled = !this.isDisabled;
  }

  constructor() {
  }

  ngOnInit() {
  }
}

