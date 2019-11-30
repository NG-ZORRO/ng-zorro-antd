import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-carousel-autoplay',
  template: `
    <nz-carousel nzAutoPlay [nzAutoPlaySpeed]="speed">
      <div nz-carousel-content *ngFor="let index of array">
        <h3>{{ index }}</h3>
      </div>
    </nz-carousel>

    <br />

    <button nz-button (click)="changeSpeed()">Change Speed</button>
  `,
  styles: [
    `
      [nz-carousel-content] {
        text-align: center;
        height: 160px;
        line-height: 160px;
        background: #364d79;
        color: #fff;
        overflow: hidden;
      }

      h3 {
        color: #fff;
      }
    `
  ]
})
export class NzDemoCarouselAutoplayComponent {
  speed = 3000;
  array = [1, 2, 3, 4];

  changeSpeed(): void {
    this.speed = this.speed === 3000 ? 1000 : 3000;
  }
}
