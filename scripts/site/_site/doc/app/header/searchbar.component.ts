import { Platform } from '@angular/cdk/platform';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { loadScript } from '../utils/load-script';

// tslint:disable-next-line:no-any
declare const docsearch: any;

@Component({
  selector: 'div[app-searchbar]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span nz-icon nzType="search"></span>
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
    '[class.narrow-mode]': 'responsive'
  },
  encapsulation: ViewEncapsulation.None
})
export class SearchbarComponent implements OnChanges {
  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;
  @Input() language: 'zh' | 'en' = 'zh';
  @Input() responsive: null | 'narrow' | 'crowded' = null;
  @Output() focusChange = new EventEmitter<boolean>();

  focused = false;
  // tslint:disable-next-line:no-any
  docsearch: any = null;

  get useDocsearch(): boolean {
    if (!this.platform.isBrowser) {
      return false;
    }
    return window && window.location.href.indexOf('/version') === -1;
  }

  constructor(private cdr: ChangeDetectorRef, private platform: Platform) {}

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

  @HostListener('document:keyup.s', ['$event'])
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
        // tslint:disable-next-line:no-any
        transformData(hits: any): void {
          // tslint:disable-next-line:no-any
          hits.forEach((hit: any) => {
            // tslint:disable-line:no-any
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
