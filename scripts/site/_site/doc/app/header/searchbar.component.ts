import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

import { loadScript } from '../utils/load-script';

declare const docsearch: any;

@Component({
  selector: 'div[app-searchbar]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NzIconModule, NzInputModule],
  template: `
    <nz-icon nzType="search" />
    <input
      nz-input
      #searchInput
      (focus)="triggerFocus(true)"
      (blur)="triggerFocus(false)"
      [placeholder]="language == 'zh' ? '在 ng.ant.design 中搜索' : 'Search in ng.ant.design'"
    />
  `,
  host: {
    id: 'search-box',
    '[class.focused]': 'focused',
    '[class.narrow-mode]': 'responsive',
    '(document:keyup.s)': 'onKeyUp($any($event))'
  },
  encapsulation: ViewEncapsulation.None
})
export class SearchbarComponent implements OnChanges {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @Input() language: 'zh' | 'en' = 'zh';
  @Input() responsive: null | 'narrow' | 'crowded' = null;
  @Output() focusChange = new EventEmitter<boolean>();

  focused = false;
  docsearch: any = null;

  constructor(private cdr: ChangeDetectorRef) {}

  triggerFocus(focus: boolean): void {
    if (this.docsearch) {
      this.focused = focus;
      this.focusChange.emit(focus);
      this.cdr.markForCheck();
    }

    if (!this.docsearch) {
      this.initDocsearch();
    }
  }

  onKeyUp(event: KeyboardEvent): void {
    if (this.searchInput.nativeElement && event.target === document.body) {
      this.searchInput.nativeElement.focus();
    }
  }

  initDocsearch(): void {
    loadScript('https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js').then(() => {
      this.docsearch = docsearch({
        appId: 'BH4D9OD16A',
        apiKey: '9f7d9d6527ff52ec484e90bb1f256971',
        indexName: 'ng_zorro',
        inputSelector: '#search-box input',
        algoliaOptions: { hitsPerPage: 5, facetFilters: [`tags:${this.language}`] },
        transformData(hits: any): void {
          hits.forEach((hit: any) => {
            hit.url = hit.url.replace('ng.ant.design', location.host);
            hit.url = hit.url.replace('https:', location.protocol);
          });
          return hits;
        },
        debug: false
      });
      this.searchInput.nativeElement.focus();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { language } = changes;
    if (language && this.docsearch) {
      this.docsearch!.algoliaOptions = { hitsPerPage: 5, facetFilters: [`tags:${this.language}`] };
    }
  }
}
