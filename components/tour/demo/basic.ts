import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';

import { NzTourStep } from 'ng-zorro-antd/tour';

@Component({
  selector: 'nz-demo-tour-basic',
  template: `
    <button nz-button (click)="startTour()">Begin Tour</button>
    <nz-divider></nz-divider>
    <button #upload nz-button>Upload</button>
    <button #save nz-button nzType="primary">Save</button>
    <button #otherActions nz-button>
      <span nz-icon nzType="ellipsis" nzTheme="outline"></span>
    </button>

    <nz-tour [nzOpen]="open" [nzSteps]="steps"></nz-tour>
  `
})
export class NzDemoTourBasicComponent {
  open = false;

  @ViewChild('upload') private uploadBtn!: ElementRef;
  @ViewChild('save') private saveBtn!: ElementRef;
  @ViewChild('otherActions') private otherActionsBtn!: ElementRef;

  readonly steps: NzTourStep[] = [
    {
      title: 'Upload',
      content: 'Click here to upload your files.',
      target: this.uploadBtn
    },
    {
      title: 'Save',
      content: 'Click here to save your files.',
      target: this.saveBtn
    },
    {
      title: 'Other Actions',
      content: 'Click here to see more actions.',
      target: this.otherActionsBtn
    }
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  startTour(): void {
    this.open = true;
    this.cdr.markForCheck();
  }
}
