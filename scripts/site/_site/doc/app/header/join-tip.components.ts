import { Platform } from '@angular/cdk/platform';
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
      🔥 阿里云开源大数据平台前端工程师火热招聘中，<a (click)="navigateToJoin()">点击查看</a>
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

  hideJoin = false;

  constructor(private router: Router, private platform: Platform) {
    if (this.platform.isBrowser) {
      this.isHideJoin();
    }
  }

  isHideJoin(): void {
    this.hideJoin = localStorage.getItem('hideJoin') === 'true';
  }

  navigateToJoin(): void {
    localStorage.setItem('hideJoin', 'true');
    this.router.navigate(['/docs/join/zh']).then();
  }
}
