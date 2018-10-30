import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injector,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  TemplateRef
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

export const NZ_ROUTE_DATA_BREADCRUMB = 'breadcrumb';

export interface BreadcrumbOption {
  label: string;
  params: Params;
  url: string;
}

@Component({
  changeDetection    : ChangeDetectionStrategy.OnPush,
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
  private separator: string | TemplateRef<void> = '/';
  private $destroy = new Subject();
  breadcrumbs: BreadcrumbOption[] = [];
  isTemplateRef = false;

  @Input() nzAutoGenerate = false;

  @Input()
  set nzSeparator(value: string | TemplateRef<void>) {
    this.separator = value;
    this.isTemplateRef = value instanceof TemplateRef;
  }

  get nzSeparator(): string | TemplateRef<void> {
    return this.separator;
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbOption[] = []): BreadcrumbOption[] {
    const children: ActivatedRoute[] = route.children;
    // If there's no sub root, then stop the recurse and returns the generated breadcrumbs.
    if (children.length === 0) {
      return breadcrumbs;
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
    e.preventDefault();
    // FIXME: A workaround to https://github.com/angular/angular/issues/25837.
    const router = this.injector.get(Router);
    this.ngZone.run(() => router.navigateByUrl(url).then()).then();
  }

  constructor(private injector: Injector, private ngZone: NgZone, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    if (this.nzAutoGenerate) {
      try {
        const activatedRoute = this.injector.get(ActivatedRoute);
        const router = this.injector.get(Router);
        router.events.pipe(filter(e => e instanceof NavigationEnd), takeUntil(this.$destroy)).subscribe(() => {
          // Build the breadcrumb tree from root route.
          this.breadcrumbs = this.getBreadcrumbs(activatedRoute.root);
          this.cd.detectChanges();
        });
      } catch (e) {
        throw new Error('[NG-ZORRO] You should import RouterModule if you want to use NzAutoGenerate');
      }
    }
  }

  ngOnDestroy(): void {
    this.$destroy.complete();
  }
}
