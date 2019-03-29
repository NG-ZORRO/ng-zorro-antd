import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injector,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { ActivatedRoute, Params, PRIMARY_OUTLET, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export const NZ_ROUTE_DATA_BREADCRUMB = 'breadcrumb';

export interface BreadcrumbOption {
  label: string;
  params: Params;
  url: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-breadcrumb',
  preserveWhitespaces: false,
  templateUrl: './nz-breadcrumb.component.html',
  styles: [
    `
      nz-breadcrumb {
        display: block;
      }
    `
  ]
})
export class NzBreadCrumbComponent implements OnInit, OnDestroy {
  @Input() nzAutoGenerate = false;
  @Input() nzSeparator: string | TemplateRef<void> = '/';

  breadcrumbs: BreadcrumbOption[] | undefined = [];

  private destroy$ = new Subject<void>();

  constructor(
    private injector: Injector,
    private ngZone: NgZone,
    private cd: ChangeDetectorRef,
    elementRef: ElementRef,
    renderer: Renderer2
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-breadcrumb');
  }

  ngOnInit(): void {
    if (this.nzAutoGenerate) {
      try {
        const activatedRoute = this.injector.get(ActivatedRoute);
        activatedRoute.url.pipe(takeUntil(this.destroy$)).subscribe(() => {
          this.breadcrumbs = this.getBreadcrumbs(activatedRoute.root);
          this.cd.markForCheck();
        });
      } catch (e) {
        throw new Error('[NG-ZORRO] You should import RouterModule if you want to use NzAutoGenerate');
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigate(url: string, e: MouseEvent): void {
    e.preventDefault();
    this.ngZone
      .run(() =>
        this.injector
          .get(Router)
          .navigateByUrl(url)
          .then()
      )
      .then();
  }

  private getBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadcrumbOption[] = []
  ): BreadcrumbOption[] | undefined {
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
            label: child.snapshot.data[NZ_ROUTE_DATA_BREADCRUMB] || 'Breadcrumb',
            params: child.snapshot.params,
            url: nextUrl
          };
          breadcrumbs.push(breadcrumb);
        }
        return this.getBreadcrumbs(child, nextUrl, breadcrumbs);
      }
    }
  }
}
