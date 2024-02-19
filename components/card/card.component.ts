/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { NgStyle, NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  QueryList,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { BooleanInput, NgStyleInterface, NzSizeDSType } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

import { NzCardGridDirective } from './card-grid.directive';
import { NzCardLoadingComponent } from './card-loading.component';
import { NzCardTabComponent } from './card-tab.component';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'card';

@Component({
  selector: 'nz-card',
  exportAs: 'nzCard',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (nzTitle || nzExtra || listOfNzCardTabComponent) {
      <div class="ant-card-head">
        <div class="ant-card-head-wrapper">
          @if (nzTitle) {
            <div class="ant-card-head-title">
              <ng-container *nzStringTemplateOutlet="nzTitle">{{ nzTitle }}</ng-container>
            </div>
          }
          @if (nzExtra) {
            <div class="ant-card-extra">
              <ng-container *nzStringTemplateOutlet="nzExtra">{{ nzExtra }}</ng-container>
            </div>
          }
        </div>
        @if (listOfNzCardTabComponent) {
          <ng-template [ngTemplateOutlet]="listOfNzCardTabComponent.template" />
        }
      </div>
    }

    @if (nzCover) {
      <div class="ant-card-cover">
        <ng-template [ngTemplateOutlet]="nzCover" />
      </div>
    }

    <div class="ant-card-body" [ngStyle]="nzBodyStyle">
      @if (!nzLoading) {
        <ng-content />
      } @else {
        <nz-card-loading />
      }
    </div>
    @if (nzActions.length) {
      <ul class="ant-card-actions">
        @for (action of nzActions; track $index) {
          <li [style.width.%]="100 / nzActions.length">
            <span><ng-template [ngTemplateOutlet]="action" /></span>
          </li>
        }
      </ul>
    }
  `,
  host: {
    class: 'ant-card',
    '[class.ant-card-loading]': 'nzLoading',
    '[class.ant-card-bordered]': 'nzBorderless === false && nzBordered',
    '[class.ant-card-hoverable]': 'nzHoverable',
    '[class.ant-card-small]': 'nzSize === "small"',
    '[class.ant-card-contain-grid]': 'listOfNzCardGridDirective && listOfNzCardGridDirective.length',
    '[class.ant-card-type-inner]': 'nzType === "inner"',
    '[class.ant-card-contain-tabs]': '!!listOfNzCardTabComponent',
    '[class.ant-card-rtl]': `dir === 'rtl'`
  },
  imports: [NzOutletModule, NgTemplateOutlet, NgStyle, NzCardLoadingComponent],
  standalone: true
})
export class NzCardComponent implements OnDestroy, OnInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;
  static ngAcceptInputType_nzBordered: BooleanInput;
  static ngAcceptInputType_nzBorderless: BooleanInput;
  static ngAcceptInputType_nzLoading: BooleanInput;
  static ngAcceptInputType_nzHoverable: BooleanInput;

  @Input() @WithConfig() @InputBoolean() nzBordered: boolean = true;
  @Input() @WithConfig() @InputBoolean() nzBorderless: boolean = false;
  @Input() @InputBoolean() nzLoading = false;
  @Input() @WithConfig() @InputBoolean() nzHoverable: boolean = false;
  @Input() nzBodyStyle: NgStyleInterface | null = null;
  @Input() nzCover?: TemplateRef<void>;
  @Input() nzActions: Array<TemplateRef<void>> = [];
  @Input() nzType: string | 'inner' | null = null;
  @Input() @WithConfig() nzSize: NzSizeDSType = 'default';
  @Input() nzTitle?: string | TemplateRef<void>;
  @Input() nzExtra?: string | TemplateRef<void>;
  @ContentChild(NzCardTabComponent, { static: false }) listOfNzCardTabComponent?: NzCardTabComponent;
  @ContentChildren(NzCardGridDirective) listOfNzCardGridDirective!: QueryList<NzCardGridDirective>;
  dir: Direction = 'ltr';

  private destroy$ = new Subject<boolean>();

  constructor(
    public nzConfigService: NzConfigService,
    private cdr: ChangeDetectorRef,
    @Optional() private directionality: Directionality
  ) {
    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }
}
