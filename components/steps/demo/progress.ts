import { Component, signal } from '@angular/core';
import { merge, Observable, timer } from 'rxjs';
import { delay, finalize, map, scan } from 'rxjs/operators';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzStepsModule } from 'ng-zorro-antd/steps';

interface SyncStep {
  id: number;
  title: string;
  description: string;
  async: false;
  percentage: null;
}

interface AsyncStep {
  id: number;
  title: string;
  description: string;
  async: true;
  percentage: number;
}

type Step = SyncStep | AsyncStep;

function mockAsyncStep(): Observable<number> {
  const subStep1 = timer(600).pipe(map(() => 25));
  const subStep2 = subStep1.pipe(delay(600));
  const subStep3 = subStep2.pipe(delay(600));
  const subStep4 = subStep3.pipe(delay(600));
  return merge(subStep1, subStep2, subStep3, subStep4).pipe(scan((a, b) => a + b));
}

@Component({
  selector: 'nz-demo-steps-progress',
  imports: [NzButtonModule, NzStepsModule],
  template: `
    <nz-steps [nzCurrent]="current()">
      @for (step of steps(); track step.id) {
        <nz-step
          [nzTitle]="step.title"
          [nzDescription]="step.description"
          [nzPercentage]="step.async ? step.percentage : null"
        />
      }
    </nz-steps>
    <div class="steps-action">
      @if (current() > 0) {
        <button nz-button nzType="default" (click)="pre()">
          <span>Previous</span>
        </button>
      }
      @if (current() < 2) {
        <button nz-button nzType="default" (click)="next()" [nzLoading]="processing()">
          <span>Next</span>
        </button>
      }
      @if (current() === 2) {
        <button nz-button nzType="primary" (click)="done()" [nzLoading]="processing()">
          <span>Done</span>
        </button>
      }
    </div>
  `,
  styles: `
    .steps-action {
      margin-top: 36px;
    }

    button {
      margin-right: 8px;
    }
  `
})
export class NzDemoStepsProgressComponent {
  readonly steps = signal<Step[]>([
    {
      id: 1,
      title: `Step 1`,
      description: `This step is synchronous.`,
      async: false,
      percentage: null
    },
    {
      id: 2,
      title: `Step 2`,
      description: `This step is asynchronous.`,
      async: true,
      percentage: 0
    },
    {
      id: 3,
      title: `Step 3`,
      description: `This step is asynchronous.`,
      async: true,
      percentage: 0
    }
  ]);
  readonly current = signal(0);
  readonly processing = signal(false);

  pre(): void {
    this.current.update(current => current - 1);
  }

  next(): void {
    this.loadingAndStep();
  }

  done(): void {
    this.loadingAndStep();
    console.log('done');
  }

  loadingAndStep(): void {
    if (this.current() < this.steps().length) {
      const step = this.steps()[this.current()];
      if (step.async) {
        this.processing.set(true);
        mockAsyncStep()
          .pipe(
            finalize(() => {
              this.updatePercentage(step.id, 0);
              this.processing.set(false);
              this.current.update(current => current + 1);
            })
          )
          .subscribe(p => {
            this.updatePercentage(step.id, p);
          });
      } else {
        this.current.update(current => current + 1);
      }
    }
  }

  private updatePercentage(id: number, percentage: number): void {
    this.steps.update(steps => steps.map(step => (step.id === id && step.async ? { ...step, percentage } : step)));
  }
}
