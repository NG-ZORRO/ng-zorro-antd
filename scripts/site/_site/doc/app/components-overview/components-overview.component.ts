import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { ROUTER_LIST } from '../router';

@Component({
  selector: 'app-components-overview',
  templateUrl: './components-overview.component.html',
  styleUrls: ['./components-overview.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ComponentsOverviewComponent implements OnInit {
  routerList = ROUTER_LIST;
  language = 'en';
  searchChange$ = new BehaviorSubject('');
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
      });

    // autofocus
    Promise.resolve().then(() => {
      this.searchBox.nativeElement.focus();
    });
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
}
