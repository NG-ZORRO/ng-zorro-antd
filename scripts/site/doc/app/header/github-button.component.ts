import { Platform } from '@angular/cdk/platform';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { AppService } from '../app.service';

@Component({
  selector: 'app-github-btn',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a
      class="gh-btn"
      tabindex="-1"
      [attr.href]="'https://github.com/' + repo"
      target="_blank"
      rel="noopener"
      aria-hidden="true"
    >
      <span class="gh-ico" aria-hidden="true"></span>
      <span class="gh-text">Star</span>
    </a>
    <a
      class="gh-count"
      target="_blank"
      rel="noopener"
      style="display: block"
      [attr.href]="'https://github.com/' + repo + '/stargazers'"
    >
      {{ starCount() }}
    </a>
  `,
  host: {
    id: 'github-btn',
    class: 'github-btn',
    '[class.responsive-mode]': 'responsive()',
    '[class.responsive-narrow]': 'responsive() === "narrow"',
    '[class.responsive-crowded]': 'responsive() === "crowded"'
  }
})
export class GithubButtonComponent implements OnInit {
  readonly starCount = signal(0);
  readonly repo = 'NG-ZORRO/ng-zorro-antd';

  private readonly http = inject(HttpClient);
  private readonly platform = inject(Platform);
  protected readonly responsive = inject(AppService).responsive;

  ngOnInit(): void {
    if (this.platform.isBrowser) {
      this.getStar();
    }
  }

  private getStar(): void {
    this.http
      .get<{ stargazers_count: number }>(`https://api.github.com/repos/${this.repo}`)
      .subscribe(res => this.starCount.set(res.stargazers_count));
  }
}
