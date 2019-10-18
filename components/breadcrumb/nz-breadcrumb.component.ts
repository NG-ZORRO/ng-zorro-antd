/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

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
import { ActivatedRoute, NavigationEnd, Params, PRIMARY_OUTLET, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';

import { InputBoolean, PREFIX } from 'ng-zorro-antd/core';

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
  @Input() @InputBoolean() nzAutoGenerate = false;
  @Input() nzSeparator: string | TemplateRef<void> = '/';
  @Input() nzRouteLabel: string = 'breadcrumb';

  breadcrumbs: BreadcrumbOption[] | undefined = [];

  private destroy$ = new Subject<void>();

  constructor(
    private injector: Injector,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    elementRef: ElementRef,
    renderer: Renderer2
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-breadcrumb');
  }

  ngOnInit(): void {
    if (this.nzAutoGenerate) {
      this.registerRouterChange();
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

  private registerRouterChange(): void {
    try {
      const router = this.injector.get(Router);
      const activatedRoute = this.injector.get(ActivatedRoute);
      router.events
        .pipe(
          filter(e => e instanceof NavigationEnd),
          takeUntil(this.destroy$),
          startWith(true) // Trigger initial render.
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
        const breadcrumbLabel = child.snapshot.data[this.nzRouteLabel];
        // If have data, go to generate a breadcrumb for it.
        if (routeURL && breadcrumbLabel) {
          const breadcrumb: BreadcrumbOption = {
            label: breadcrumbLabel,
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
