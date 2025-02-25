/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { Location } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation,
  inject
} from '@angular/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { PREFIX } from 'ng-zorro-antd/core/logger';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzPageHeaderBreadcrumbDirective, NzPageHeaderFooterDirective } from './page-header-cells';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'pageHeader';

@Component({
  selector: 'nz-page-header',
  exportAs: 'nzPageHeader',
  template: `
    <ng-content select="nz-breadcrumb[nz-page-header-breadcrumb]" />

    <div class="ant-page-header-heading">
      <div class="ant-page-header-heading-left">
        <!--back-->
        @if (nzBackIcon !== null) {
          <div (click)="onBack()" class="ant-page-header-back">
            <div role="button" tabindex="0" class="ant-page-header-back-button">
              <ng-container *nzStringTemplateOutlet="nzBackIcon; let backIcon">
                <nz-icon [nzType]="backIcon || getBackIcon()" nzTheme="outline" />
              </ng-container>
            </div>
          </div>
        }

        <!--avatar-->
        <ng-content select="nz-avatar[nz-page-header-avatar]" />
        <!--title-->
        @if (nzTitle) {
          <span class="ant-page-header-heading-title">
            <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
          </span>
        } @else {
          <ng-content select="nz-page-header-title, [nz-page-header-title]" />
        }

        <!--subtitle-->
        @if (nzSubtitle) {
          <span class="ant-page-header-heading-sub-title">
            <ng-container *nzStringTemplateOutlet="nzSubtitle">{{ nzSubtitle }}</ng-container>
          </span>
        } @else {
          <ng-content select="nz-page-header-subtitle, [nz-page-header-subtitle]" />
        }
        <ng-content select="nz-page-header-tags, [nz-page-header-tags]" />
      </div>

      <ng-content select="nz-page-header-extra, [nz-page-header-extra]" />
    </div>

    <ng-content select="nz-page-header-content, [nz-page-header-content]" />
    <ng-content select="nz-page-header-footer, [nz-page-header-footer]" />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'ant-page-header',
    '[class.has-footer]': 'nzPageHeaderFooter',
    '[class.ant-page-header-ghost]': 'nzGhost',
    '[class.has-breadcrumb]': 'nzPageHeaderBreadcrumb',
    '[class.ant-page-header-compact]': 'compact',
    '[class.ant-page-header-rtl]': `dir === 'rtl'`
  },
  imports: [NzOutletModule, NzIconModule]
})
export class NzPageHeaderComponent implements AfterViewInit, OnDestroy, OnInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  @Input() nzBackIcon: string | TemplateRef<void> | null = null;
  @Input() nzTitle?: string | TemplateRef<void>;
  @Input() nzSubtitle?: string | TemplateRef<void>;
  @Input() @WithConfig() nzGhost: boolean = true;
  @Output() readonly nzBack = new EventEmitter<void>();

  @ContentChild(NzPageHeaderFooterDirective, { static: false })
  nzPageHeaderFooter?: ElementRef<NzPageHeaderFooterDirective>;
  @ContentChild(NzPageHeaderBreadcrumbDirective, { static: false })
  nzPageHeaderBreadcrumb?: ElementRef<NzPageHeaderBreadcrumbDirective>;

  compact = false;
  destroy$ = new Subject<void>();
  dir: Direction = 'ltr';

  private location = inject(Location, { optional: true });

  constructor(
    public nzConfigService: NzConfigService,
    private elementRef: ElementRef,
    private nzResizeObserver: NzResizeObserver,
    private cdr: ChangeDetectorRef,
    private directionality: Directionality
  ) {}

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngAfterViewInit(): void {
    this.nzResizeObserver
      .observe(this.elementRef)
      .pipe(
        map(([entry]) => entry.contentRect.width),
        takeUntil(this.destroy$)
      )
      .subscribe((width: number) => {
        this.compact = width < 768;
        this.cdr.markForCheck();
      });
  }

  onBack(): void {
    if (this.nzBack.observers.length) {
      this.nzBack.emit();
    } else {
      if (!this.location) {
        throw new Error(
          `${PREFIX} you should import 'RouterModule' or register 'Location' if you want to use 'nzBack' default event!`
        );
      }
      this.location.back();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getBackIcon(): string {
    if (this.dir === 'rtl') {
      return 'arrow-right';
    }
    return 'arrow-left';
  }
}
