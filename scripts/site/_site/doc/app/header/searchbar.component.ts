import {
  ChangeDetectionStrategy,
  Component,
  effect,
  ElementRef,
  inject,
  output,
  signal,
  viewChild,
  ViewEncapsulation
} from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

import { loadScript } from '../utils/load-script';
import { APP_LANGUAGE } from '../app.token';
import { AppService } from '../app.service';

declare const docsearch: any;

@Component({
  selector: 'div[app-searchbar]',
  imports: [NzIconModule, NzInputModule],
  template: `
    <nz-icon nzType="search" />
    <input
      nz-input
      #searchInput
      (focus)="triggerFocus(true)"
      (blur)="triggerFocus(false)"
      [placeholder]="language() == 'zh' ? '在 ng.ant.design 中搜索' : 'Search in ng.ant.design'"
    />
  `,
  host: {
    id: 'search-box',
    '[class.focused]': 'focused',
    '[class.narrow-mode]': 'app.responsive()',
    '(document:keyup.s)': 'onKeyUp($any($event))'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class SearchbarComponent {
  protected readonly language = inject(APP_LANGUAGE);
  protected readonly app = inject(AppService);

  readonly searchInput = viewChild.required<ElementRef<HTMLInputElement>>('searchInput');
  readonly focusChange = output<boolean>();

  focused = signal(false);
  docsearch: any = null;

  constructor() {
    effect(() => {
      if (this.docsearch) {
        this.docsearch.algoliaOptions = { hitsPerPage: 5, facetFilters: [`tags:${this.language()}`] };
      }
    });
  }

  triggerFocus(focus: boolean): void {
    if (this.docsearch) {
      this.focused.set(focus);
      this.focusChange.emit(focus);
    } else {
      this.init();
    }
  }

  onKeyUp(event: KeyboardEvent): void {
    if (this.searchInput().nativeElement && event.target === document.body) {
      this.searchInput().nativeElement.focus();
    }
  }

  init(): void {
    loadScript('https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js').then(() => {
      this.docsearch = docsearch({
        appId: 'BH4D9OD16A',
        apiKey: '9f7d9d6527ff52ec484e90bb1f256971',
        indexName: 'ng_zorro',
        inputSelector: '#search-box input',
        algoliaOptions: { hitsPerPage: 5, facetFilters: [`tags:${this.language()}`] },
        transformData(hits: any): void {
          hits.forEach((hit: any) => {
            hit.url = hit.url.replace('ng.ant.design', location.host);
            hit.url = hit.url.replace('https:', location.protocol);
          });
          return hits;
        },
        debug: false
      });
      this.searchInput().nativeElement.focus();
    });
  }
}
