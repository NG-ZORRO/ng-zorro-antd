import {
  Component,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { RouterModuleNotImportedError } from '../core/error/error';

export const NZ_ROUTE_DATA_BREADCRUMB = 'breadcrumb';

export interface BreadcrumbOption {
  label: string;
  params: Params;
  url: string;
}

@Component({
  selector           : 'nz-breadcrumb',
  preserveWhitespaces: false,
  templateUrl        : './nz-breadcrumb.component.html',
  host               : {
    '[class.ant-breadcrumb]': 'true'
  },
  styles             : [ `
    :host {
      display: block;
    }
  ` ]
})
export class NzBreadCrumbComponent implements OnInit, OnDestroy {
  @Input() nzAutoGenerate = false;

  @Input()
  set nzSeparator(value: string | TemplateRef<void>) {
    this._separator = value;
    this.isTemplateRef = value instanceof TemplateRef;
  }

  get nzSeparator(): string | TemplateRef<void> {
    return this._separator;
  }

  isTemplateRef = false;
  private _separator: string | TemplateRef<void> = '/';

  breadcrumbs: BreadcrumbOption[] = [];

  private unsubscribe$ = new Subject();

  getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbOption[] = []): BreadcrumbOption[] {
    const children: ActivatedRoute[] = route.children;
    if (children.length === 0) {
      return breadcrumbs; // If there's no sub root, then stop the recurse and returns the generated breadcrumbs.
    }
    for (const child of children) {
      if (child.outlet === PRIMARY_OUTLET) {
        // Only parse components in primary router-outlet (in another word, router-outlet without a specific name).
        // Parse this layer and generate a breadcrumb item.
        const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
        const nextUrl = url + `/${routeURL}`;
        // If have data, go to generate a breadcrumb for it.
        if (child.snapshot.data.hasOwnProperty(NZ_ROUTE_DATA_BREADCRUMB)) {
          const breadcrumb: BreadcrumbOption = {
            label : child.snapshot.data[ NZ_ROUTE_DATA_BREADCRUMB ] || 'Breadcrumb',
            params: child.snapshot.params,
            url   : nextUrl
          };
          breadcrumbs.push(breadcrumb);
        }
        return this.getBreadcrumbs(child, nextUrl, breadcrumbs);
      }
    }
  }

  navigate(url: string, e: MouseEvent): void {
    e.preventDefault(); // Stop browsers' default navigation behavior.
    const router = this._injector.get(Router);
    router.navigateByUrl(url);
  }

  constructor(private _injector: Injector) {
  }

  ngOnInit(): void {
    if (this.nzAutoGenerate) {
      try {
        const activatedRoute = this._injector.get(ActivatedRoute);
        const router = this._injector.get(Router);
        router.events.pipe(
          filter(e => e instanceof NavigationEnd),
          takeUntil(this.unsubscribe$)
        ).subscribe(() => {
          this.breadcrumbs = this.getBreadcrumbs(activatedRoute.root); // Build the breadcrumb tree from root route.
        });
      } catch (e) {
        throw RouterModuleNotImportedError(`'NzAutoGenerate'`);
      }
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
