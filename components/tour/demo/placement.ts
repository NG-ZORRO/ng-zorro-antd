import { Component, computed, ElementRef, inject, viewChild } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTourModule, NzTourService, NzTourStep } from 'ng-zorro-antd/tour';

@Component({
  selector: 'nz-demo-tour-placement',
  imports: [NzButtonModule, NzTourModule],
  template: `<button #trigger nz-button (click)="start()">Begin Tour</button>`
})
export class NzDemoTourPlacementComponent {
  readonly nzTourService = inject(NzTourService);

  private btn = viewChild('trigger', { read: ElementRef });
  readonly steps = computed<NzTourStep[]>(() => [
    {
      title: 'Center',
      description: 'Displayed in the center of screen',
      target: null
    },
    {
      title: 'Right',
      description: 'On the right of target',
      target: this.btn(),
      placement: 'right'
    },
    {
      title: 'Top',
      description: 'On the top of target',
      target: this.btn(),
      placement: 'top'
    }
  ]);

  start(): void {
    this.nzTourService.start({ steps: this.steps() });
  }
}
