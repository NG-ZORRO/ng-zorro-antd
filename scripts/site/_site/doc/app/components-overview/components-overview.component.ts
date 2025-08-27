import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
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

import { ROUTER_LIST } from '../router';
import { APP_LANGUAGE } from '../app.token';

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
export class ComponentsOverviewComponent {
  protected readonly language = inject(APP_LANGUAGE);
  readonly routerList = signal(ROUTER_LIST.components);
  affixed = false;
  readonly searchChange$ = new Subject<string>();
  readonly componentsList = viewChild.required<ElementRef<HTMLElement>>('componentsList');
  readonly searchBox = viewChild.required<ElementRef<HTMLInputElement>>('searchBox');

  constructor() {
    this.searchChange$
      .asObservable()
      .pipe(debounceTime(20), takeUntilDestroyed())
      .subscribe(searchValue => {
        this.filterComponents(searchValue);
        if (this.affixed) {
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

  filterComponents(searchValue: string): void {
    const routerList = JSON.parse(JSON.stringify(ROUTER_LIST.components)) as typeof ROUTER_LIST['components'];
    const groups = routerList.filter(({ language }) => language === this.language());
    if (searchValue) {
      for (const group of groups) {
        group.children = group.children.filter(
          component => component.label.toLowerCase().includes(searchValue) || component.zh.includes(searchValue)
        );
      }
    }
    this.routerList.set(groups.filter(g => g.children.length > 0));
  }

  private scrollIntoView(): void {
    this.componentsList().nativeElement.scrollIntoView({
      block: 'start',
      behavior: 'smooth'
    });
  }
}
