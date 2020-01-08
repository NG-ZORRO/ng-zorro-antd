import { HttpClient } from "@angular/common/http";
import { ChangeDetectorRef, Component, Input, OnInit, ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'app-github-btn',
  template: `
    <a class="gh-btn" [href]="'https://github.com/' + org + '/' + repo" target="_blank">
      <span class="gh-ico" aria-hidden="true"></span>
      <span class="gh-text">Star</span>
    </a>
    <a class="gh-count"
       target="_blank"
       [href]="'https://github.com/' + org + '/' + repo + '/stargazers'"
       style="display: block;">
      {{starCount}}
    </a>
  `,
  host: {
    id: 'github-btn',
    class: 'github-btn',
    '[class.responsive-mode]': 'responsive',
    '[class.responsive-narrow]': 'responsive === "narrow"',
    '[class.responsive-crowded]': 'responsive === "crowded"'
  },
  encapsulation: ViewEncapsulation.None
})
export class GithubButtonComponent implements OnInit {

  starCount = 0;
  org = 'NG-ZORRO';
  repo = 'ng-zorro-antd';
  @Input() responsive: null | 'narrow' | 'crowded' = null;

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {
  }

  getStar(): void {
    this.http.get<{ stargazers_count: number }>(`https://api.github.com/repos/${this.org}/${this.repo}`)
    .subscribe((res: { stargazers_count: number }) => {
      this.starCount = res.stargazers_count;
      this.cdr.markForCheck();
    })
  }

  ngOnInit(): void {
    this.getStar();
  }

}
