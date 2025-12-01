import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  signal,
  viewChild,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { APP_LANGUAGE } from '../app.token';
import { ROUTER_LIST } from '../router';

@Component({
  selector: 'app-components-overview',
  imports: [
    RouterLink,
    NzAffixModule,
    NzCardModule,
    NzButtonModule,
    NzTagModule,
    NzGridModule,
    NzTypographyModule,
    NzDividerModule,
    NzIconModule,
    NzInputModule
  ],
  templateUrl: './components-overview.component.html',
  styleUrl: './components-overview.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export default class ComponentsOverviewComponent {
  protected readonly language = inject(APP_LANGUAGE);
  readonly routerList = signal(ROUTER_LIST.components);
  affixed = false;
  readonly searchValue = signal('');
  readonly searchChange$ = new Subject<string>();

  readonly componentsList = viewChild.required<ElementRef<HTMLElement>>('componentsList');
  readonly searchBox = viewChild.required<ElementRef<HTMLInputElement>>('searchBox');

  readonly displayedComponents = computed(() => {
    const routerList = JSON.parse(JSON.stringify(ROUTER_LIST.components)) as typeof ROUTER_LIST['components'];
    const language = this.language();
    const searchValue = this.searchValue();

    const groups = routerList.filter(group => group.language === language);
    if (searchValue) {
      for (const group of groups) {
        group.children = group.children.filter(
          component => component.label.toLowerCase().includes(searchValue) || component.zh.includes(searchValue)
        );
      }
    }

    return groups.filter(g => g.children.length > 0);
  });

  constructor() {
    this.searchChange$
      .asObservable()
      .pipe(debounceTime(20), takeUntilDestroyed())
      .subscribe(searchValue => this.searchValue.set(searchValue));

    effect(() => {
      if (this.affixed && this.displayedComponents()) {
        this.scrollIntoView();
      }
    });

    // autofocus
    afterNextRender(() => {
      this.searchBox().nativeElement.focus();
    });
  }

  onSearchAffixed(affixed: boolean): void {
    this.affixed = affixed;
  }

  onSearch(searchValue: string): void {
    this.searchChange$.next(searchValue.toLowerCase());
  }

  private scrollIntoView(): void {
    this.componentsList().nativeElement.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
  }
}
