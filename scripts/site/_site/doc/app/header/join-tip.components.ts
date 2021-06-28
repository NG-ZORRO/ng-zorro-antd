import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join',
  template: `
    <nz-alert
      [class.hide]="hideJoin"
      nzBanner
      [nzMessage]="messageTemplate"
      nzCloseable
      [nzShowIcon]="false"
    ></nz-alert>
    <ng-template #messageTemplate>
      🔥阿里云实时计算部前端工程师火热招聘中，<a (click)="navigateToJoin()">点击查看</a>
    </ng-template>
  `,
  styles: [
    `
      :host {
        text-align: center;
      }

      .hide {
        display: none;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JoinTipComponent {

  constructor(private router: Router) {
  }

  get hideJoin(): boolean {
    return localStorage.getItem('hideJoin') === 'true';
  }

  navigateToJoin(): void {
    localStorage.setItem('hideJoin', 'true');
    this.router.navigate(['/docs/join/zh']).then();
  }
}
