import { Component, computed, ElementRef, inject, viewChild } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTourModule, NzTourStep, NzTourService } from 'ng-zorro-antd/tour';

@Component({
  selector: 'nz-demo-tour-mask',
  imports: [NzButtonModule, NzDividerModule, NzIconModule, NzSpaceModule, NzTourModule],
  template: `
    <button nz-button (click)="start()">Begin Tour</button>
    <nz-divider></nz-divider>
    <nz-space>
      <button *nzSpaceItem #upload nz-button>Upload</button>
      <button *nzSpaceItem #save nz-button nzType="primary">Save</button>
      <button *nzSpaceItem #otherActions nz-button>
        <nz-icon nzType="ellipsis" nzTheme="outline" />
      </button>
    </nz-space>
  `
})
export class NzDemoTourMaskComponent {
  readonly nzTourService = inject(NzTourService);

  private uploadBtn = viewChild('upload', { read: ElementRef });
  private saveBtn = viewChild('save', { read: ElementRef });
  private otherActionsBtn = viewChild('otherActions', { read: ElementRef });

  readonly steps = computed<NzTourStep[]>(() => [
    {
      title: 'Upload',
      description: 'Click here to upload your files.',
      cover: 'https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png',
      target: this.uploadBtn()
    },
    {
      title: 'Save',
      description: 'Click here to save your files.',
      target: this.saveBtn(),
      mask: {
        color: 'rgba(40, 0, 255, .4)'
      }
    },
    {
      title: 'Other Actions',
      description: 'Click here to see more actions.',
      target: this.otherActionsBtn(),
      mask: false
    }
  ]);

  start(): void {
    this.nzTourService.start({
      steps: this.steps(),
      mask: {
        color: 'rgba(80, 255, 255, .4)'
      }
    });
  }
}
