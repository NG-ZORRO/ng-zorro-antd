import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-skeleton-children',
  template: `
    <div class="article">
      <nz-skeleton [nzLoading]="loading">
        <h4>Ant Design, a design language</h4>
        <p>
          We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people
          create their product prototypes beautifully and efficiently.
        </p>
      </nz-skeleton>
      <button nz-button (click)="showSkeleton()" [disabled]="loading">
        Show Skeleton
      </button>
    </div>
  `,
  styles: [
    `
      .article h4 {
        margin-bottom: 16px;
      }
      .article button {
        margin-top: 16px;
      }
    `
  ]
})
export class NzDemoSkeletonChildrenComponent {
  loading = false;

  showSkeleton(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
}
