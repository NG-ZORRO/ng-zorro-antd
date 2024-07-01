import { Platform } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'nz-github-btn',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './github-btn.component.html',
  styleUrls: ['./github-btn.component.less']
})
export class NzGithubBtnComponent implements OnInit {
  starCount = 0;
  org = 'NG-ZORRO';
  repo = 'ng-zorro-antd';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef, private platform: Platform) {}

  getStar(): void {
    this.http
      .get<{ stargazers_count: number }>(`https://api.github.com/repos/${this.org}/${this.repo}`)
      .subscribe((res: { stargazers_count: number }) => {
        this.starCount = res.stargazers_count;
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    this.getStar();
  }
}
