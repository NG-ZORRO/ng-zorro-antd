import { Component, signal } from '@angular/core';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'nz-demo-button-loading',
  imports: [NzButtonModule, NzIconModule],
  template: `
    <button nz-button nzType="primary" nzLoading>
      <nz-icon nzType="poweroff" />
      Loading
    </button>
    <button nz-button nzType="primary" nzSize="small" nzLoading>Loading</button>
    <br />
    <button nz-button nzType="primary" [nzLoading]="loadings()[0]" (click)="enterLoading(0)">Click me!</button>
    <button nz-button nzType="primary" [nzLoading]="loadings()[1]" (click)="enterLoading(1)">
      <nz-icon nzType="poweroff" />
      Click me!
    </button>
    <br />
    <button nz-button nzLoading nzShape="circle"></button>
    <button nz-button nzLoading nzType="primary" nzShape="circle"></button>
  `,
  styles: `
    [nz-button] {
      margin-right: 8px;
      margin-bottom: 12px;
    }
  `
})
export class NzDemoButtonLoadingComponent {
  readonly loadings = signal<boolean[]>([false, false]);

  enterLoading(index: number): void {
    const update = (index: number, loading: boolean): void => {
      this.loadings.update(loadings => loadings.map((item, i) => (i === index ? loading : item)));
    };

    update(index, true);
    setTimeout(() => update(index, false), 3000);
  }
}
