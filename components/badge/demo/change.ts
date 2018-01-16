import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-badge-change',
  template: `
    <div>
      <nz-badge [nzCount]="count" nzShowZero>
        <ng-template #content>
          <a class="head-example"></a>
        </ng-template>
      </nz-badge>
      <nz-button-group>
        <button nz-button [nzType]="'ghost'" (click)="minCount()"><i class="anticon anticon-minus"></i></button>
        <button nz-button [nzType]="'ghost'" (click)="addCount()"><i class="anticon anticon-plus"></i></button>
      </nz-button-group>
    </div>

    <div style="margin-top: 10px;">

      <nz-badge [nzDot]="dot">
        <ng-template #content>
          <a class="head-example"></a>
        </ng-template>
      </nz-badge>
      <nz-switch [(ngModel)]="dot"></nz-switch>
    </div>
  `,
  styles  : []
})
export class NzDemoBadgeChangeComponent {

  count = 5;
  dot = true;

  addCount(): void {
    this.count++;
  }

  minCount(): void {
    this.count--;
  }

  toggleShow(): void {
    this.dot = !this.dot;
  }
}
