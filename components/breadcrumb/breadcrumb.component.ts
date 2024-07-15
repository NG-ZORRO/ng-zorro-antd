/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute
} from '@angular/core';
import { ActivatedRoute, NavigationEnd, PRIMARY_OUTLET, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';

import { PREFIX } from 'ng-zorro-antd/core/logger';

import { NzBreadcrumb } from './breadcrumb';
import { NzBreadCrumbItemComponent } from './breadcrumb-item.component';

export interface BreadcrumbOption {
  label: string;
  params: Params;
  url: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-breadcrumb',
  exportAs: 'nzBreadcrumb',
  preserveWhitespaces: false,
  providers: [{ provide: NzBreadcrumb, useExisting: NzBreadCrumbComponent }],
  standalone: true,
  imports: [NzBreadCrumbItemComponent],
  template: `
    <ng-content />
    @if (nzAutoGenerate && breadcrumbs.length) {
      @for (breadcrumb of breadcrumbs; track breadcrumb.url) {
        <nz-breadcrumb-item>
          <a [attr.href]="breadcrumb.url" (click)="navigate(breadcrumb.url, $event)">{{ breadcrumb.label }}</a>
        </nz-breadcrumb-item>
      }
    }
  `,
  host: {
    class: 'ant-breadcrumb'
  }
})
export class NzBreadCrumbComponent implements OnInit, OnDestroy, NzBreadcrumb {
  @Input({ transform: booleanAttribute }) nzAutoGenerate = false;
  @Input() nzSeparator: string | TemplateRef<void> | null = '/';
  @Input() nzRouteLabel: string = 'breadcrumb';
  @Input() nzRouteLabelFn: (label: string) => string = label => label;
  @Input() nzRouteFn: (route: string) => string = route => route;

  breadcrumbs: BreadcrumbOption[] = [];
  dir: Direction = 'ltr';

  private destroy$ = new Subject<void>();

  constructor(
    private injector: Injector,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    @Optional() private directionality: Directionality
  ) {}

  ngOnInit(): void {
    if (this.nzAutoGenerate) {
      this.registerRouterChange();
    }

    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.prepareComponentForRtl();
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
    this.prepareComponentForRtl();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  navigate(url: string, e: MouseEvent): void {
    e.preventDefault();
    this.injector.get(Router).navigateByUrl(url);
  }

  private registerRouterChange(): void {
    try {
      const router = this.injector.get(Router);
      const activatedRoute = this.injector.get(ActivatedRoute);
      router.events
        .pipe(
          filter(e => e instanceof NavigationEnd),
          takeUntil(this.destroy$),
          startWith(true) // trigger initial render
        )
        .subscribe(() => {
          this.breadcrumbs = this.getBreadcrumbs(activatedRoute.root);
          this.cdr.markForCheck();
        });
    } catch (e) {
      throw new Error(`${PREFIX} You should import RouterModule if you want to use 'NzAutoGenerate'.`);
    }
  }

  private getBreadcrumbs(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: BreadcrumbOption[] = []
  ): BreadcrumbOption[] {
    const children: ActivatedRoute[] = route.children;

    // If there's no sub root, then stop the recurse and returns the generated breadcrumbs.
    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      if (child.outlet === PRIMARY_OUTLET) {
        // Only parse components in primary router-outlet (in another word, router-outlet without a specific name).
        // Parse this layer and generate a breadcrumb item.
        const routeUrl: string = child.snapshot.url
          .map(segment => segment.path)
          .filter(path => path)
          .join('/');

        // Do not change nextUrl if routeUrl is falsy. This happens when it's a route lazy loading other modules.
        const nextUrl = routeUrl ? `${url}/${routeUrl}` : url;
        const breadcrumbLabel = this.nzRouteLabelFn(child.snapshot.data[this.nzRouteLabel]);
        const shapedUrl = this.nzRouteFn(nextUrl);
        // If have data, go to generate a breadcrumb for it.
        if (routeUrl && breadcrumbLabel) {
          const breadcrumb: BreadcrumbOption = {
            label: breadcrumbLabel,
            params: child.snapshot.params,
            url: shapedUrl
          };
          breadcrumbs.push(breadcrumb);
        }

        return this.getBreadcrumbs(child, nextUrl, breadcrumbs);
      }
    }

    return breadcrumbs;
  }

  private prepareComponentForRtl(): void {
    if (this.dir === 'rtl') {
      this.renderer.addClass(this.elementRef.nativeElement, 'ant-breadcrumb-rtl');
    } else {
      this.renderer.removeClass(this.elementRef.nativeElement, 'ant-breadcrumb-rtl');
    }
  }
}
