import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
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
  styleUrls: ['./components-overview.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ComponentsOverviewComponent implements OnInit {
  routerList = ROUTER_LIST;
  language = 'en';
  affixed = false;
  searchChange$ = new BehaviorSubject('');
  @ViewChild('componentsList', { static: true }) componentsList!: ElementRef<HTMLElement>;
  @ViewChild('searchBox', { static: true }) searchBox!: ElementRef<HTMLInputElement>;

  constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      this.language = url[0].path;
      this.cdr.detectChanges();
    });

    this.searchChange$
      .asObservable()
      .pipe(debounceTime(20))
      .subscribe((searchValue: string) => {
        this.filterComponents(searchValue);
        if (this.affixed) {
          this.scrollIntoView();
        }
      });

    // autofocus
    Promise.resolve().then(() => {
      this.searchBox.nativeElement.focus();
    });
  }

  onSearchAffixed(affixed: boolean): void {
    this.affixed = affixed;
  }

  onSearch(searchValue: string): void {
    this.searchChange$.next(searchValue.toLowerCase());
  }

  filterComponents(searchValue: string): void {
    this.routerList = JSON.parse(JSON.stringify(ROUTER_LIST));
    if (searchValue) {
      for (const group of this.routerList.components) {
        group.children = group.children.filter(component => {
          return component.label.toLowerCase().includes(searchValue) || component.zh.includes(searchValue);
        });
      }
    }
    this.cdr.detectChanges();
  }

  private scrollIntoView(): void {
    if (this.componentsList) {
      this.componentsList.nativeElement.scrollIntoView({
        block: 'start',
        behavior: 'smooth'
      });
    }
  }
}
