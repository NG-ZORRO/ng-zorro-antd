import { Component, computed, effect, ElementRef, inject, model, signal, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzTourModule, NzTourService } from 'ng-zorro-antd/tour';
import { NzTourRef } from 'ng-zorro-antd/tour/tour-ref';

@Component({
  selector: 'nz-demo-tour-gap',
  standalone: true,
  imports: [FormsModule, NzButtonModule, NzDividerModule, NzGridModule, NzSliderModule, NzTourModule],
  template: `
    <button nz-button nzType="primary" (click)="start()">Begin Tour</button>
    <nz-divider></nz-divider>
    <div #trigger>
      <nz-row>
        <label nz-col nzSpan="6">Radius:</label>
        <nz-col nzSpan="12">
          <nz-slider [(ngModel)]="radius"></nz-slider>
        </nz-col>
      </nz-row>
      <nz-row>
        <label nz-col nzSpan="6">Offset:</label>
        <nz-col nzSpan="12">
          <nz-slider [(ngModel)]="offset" nzMax="50" (ngModelChange)="offsetDirection.set('both')"></nz-slider>
        </nz-col>
      </nz-row>
      <nz-row>
        <label nz-col nzSpan="6">Horizontal Offset:</label>
        <nz-col nzSpan="12">
          <nz-slider [(ngModel)]="offsetX" nzMax="50" (ngModelChange)="offsetDirection.set('individual')"></nz-slider>
        </nz-col>
      </nz-row>
      <nz-row>
        <label nz-col nzSpan="6">Vertical Offset:</label>
        <nz-col nzSpan="12">
          <nz-slider [(ngModel)]="offsetY" nzMax="50" (ngModelChange)="offsetDirection.set('individual')"></nz-slider>
        </nz-col>
      </nz-row>
    </div>
  `
})
export class NzDemoTourGapComponent {
  readonly nzTourService = inject(NzTourService);
  tourRef?: NzTourRef;

  radius = model(8);
  offsetX = model(2);
  offsetY = model(2);
  offset = model(2);
  offsetDirection = signal<'both' | 'individual'>('individual');

  readonly offsetGap = computed(() =>
    this.offsetDirection() === 'both'
      ? { offset: this.offset() }
      : { offset: [this.offsetX(), this.offsetY()] as [number, number] }
  );
  readonly gapProps = computed(() => ({
    ...this.offsetGap(),
    radius: this.radius()
  }));

  private target = viewChild('trigger', { read: ElementRef });
  readonly steps = [
    {
      title: 'Upload',
      description: 'Put your files here.',
      cover: 'https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png',
      target: () => this.target() as ElementRef
    }
  ];

  constructor() {
    effect(() => this.tourRef?.updateMaskGap(this.gapProps()));
  }

  start(): void {
    this.tourRef = this.nzTourService.start({
      steps: this.steps,
      gap: this.gapProps()
    });
  }
}
