import { Component, computed, signal } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzStepsModule } from 'ng-zorro-antd/steps';

@Component({
  selector: 'nz-demo-steps-step-next',
  imports: [NzButtonModule, NzStepsModule],
  template: `
    <nz-steps [nzCurrent]="current()">
      <nz-step nzTitle="Finished" />
      <nz-step nzTitle="In Progress" />
      <nz-step nzTitle="Waiting" />
    </nz-steps>

    <div class="steps-content">{{ content() }}</div>
    <div class="steps-action">
      @if (current() > 0) {
        <button nz-button nzType="default" (click)="pre()">
          <span>Previous</span>
        </button>
      }
      @if (current() < 2) {
        <button nz-button nzType="default" (click)="next()">
          <span>Next</span>
        </button>
      }
      @if (current() === 2) {
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
  readonly current = signal(0);
  readonly content = computed(() => {
    switch (this.current()) {
      case 0:
        return 'First-content';
      case 1:
        return 'Second-content';
      case 2:
        return 'third-content';
      default:
        return 'error';
    }
  });

  pre(): void {
    this.current.update(current => current - 1);
  }

  next(): void {
    this.current.update(current => current + 1);
  }

  done(): void {
    console.log('done');
  }
}
