import { Component } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzStepsModule } from 'ng-zorro-antd/steps';

@Component({
  selector: 'nz-demo-steps-step-next',
  imports: [NzButtonModule, NzStepsModule],
  template: `
    <nz-steps [nzCurrent]="current">
      <nz-step nzTitle="Finished" />
      <nz-step nzTitle="In Progress" />
      <nz-step nzTitle="Waiting" />
    </nz-steps>

    <div class="steps-content">{{ index }}</div>
    <div class="steps-action">
      @if (current > 0) {
        <button nz-button nzType="default" (click)="pre()">
          <span>Previous</span>
        </button>
      }
      @if (current < 2) {
        <button nz-button nzType="default" (click)="next()">
          <span>Next</span>
        </button>
      }
      @if (current === 2) {
        <button nz-button nzType="primary" (click)="done()">
          <span>Done</span>
        </button>
      }
    </div>
  `,
  styles: `
    .steps-content {
      margin-top: 16px;
      border: 1px dashed #e9e9e9;
      border-radius: 6px;
      background-color: #fafafa;
      min-height: 200px;
      text-align: center;
      padding-top: 80px;
    }

    .steps-action {
      margin-top: 24px;
    }

    button {
      margin-right: 8px;
    }
  `
})
export class NzDemoStepsStepNextComponent {
  current = 0;

  index = 'First-content';

  pre(): void {
    this.current -= 1;
    this.changeContent();
  }

  next(): void {
    this.current += 1;
    this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  changeContent(): void {
    switch (this.current) {
      case 0: {
        this.index = 'First-content';
        break;
      }
      case 1: {
        this.index = 'Second-content';
        break;
      }
      case 2: {
        this.index = 'third-content';
        break;
      }
      default: {
        this.index = 'error';
      }
    }
  }
}
