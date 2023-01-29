import { Component } from '@angular/core';
import { merge, Observable, timer } from 'rxjs';
import { delay, finalize, map, scan } from 'rxjs/operators';

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
  template: `
    <nz-steps [nzCurrent]="current">
      <nz-step
        *ngFor="let step of this.steps; trackBy: trackById"
        [nzTitle]="step.title"
        [nzDescription]="step.description"
        [nzPercentage]="step.async ? step.percentage : null"
      ></nz-step>
    </nz-steps>
    <div class="steps-action">
      <button nz-button nzType="default" (click)="pre()" *ngIf="current > 0">
        <span>Previous</span>
      </button>
      <button nz-button nzType="default" (click)="next()" [nzLoading]="processing" *ngIf="current < 2">
        <span>Next</span>
      </button>
      <button nz-button nzType="primary" (click)="done()" [nzLoading]="processing" *ngIf="current === 2">
        <span>Done</span>
      </button>
    </div>
  `,
  styles: [
    `
      .steps-action {
        margin-top: 36px;
      }

      button {
        margin-right: 8px;
      }
    `
  ]
})
export class NzDemoStepsProgressComponent {
  steps: Step[] = [
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
  ];
  current = 0;
  processing = false;

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    this.loadingAndStep();
  }

  done(): void {
    this.loadingAndStep();
    console.log('done');
  }

  trackById(_: number, item: Step): number {
    return item.id;
  }

  loadingAndStep(): void {
    if (this.current < this.steps.length) {
      const step = this.steps[this.current];
      if (step.async) {
        this.processing = true;
        mockAsyncStep()
          .pipe(
            finalize(() => {
              step.percentage = 0;
              this.processing = false;
              this.current += 1;
            })
          )
          .subscribe(p => {
            step.percentage = p;
          });
      } else {
        this.current += 1;
      }
    }
  }
}
