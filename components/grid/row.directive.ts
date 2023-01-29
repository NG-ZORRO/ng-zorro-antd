/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { MediaMatcher } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { gridResponsiveMap, NzBreakpointKey, NzBreakpointService } from 'ng-zorro-antd/core/services';
import { IndexableObject } from 'ng-zorro-antd/core/types';

export type NzJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
export type NzAlign = 'top' | 'middle' | 'bottom';

@Directive({
  selector: '[nz-row],nz-row,nz-form-item',
  exportAs: 'nzRow',
  host: {
    class: 'ant-row',
    '[class.ant-row-top]': `nzAlign === 'top'`,
    '[class.ant-row-middle]': `nzAlign === 'middle'`,
    '[class.ant-row-bottom]': `nzAlign === 'bottom'`,
    '[class.ant-row-start]': `nzJustify === 'start'`,
    '[class.ant-row-end]': `nzJustify === 'end'`,
    '[class.ant-row-center]': `nzJustify === 'center'`,
    '[class.ant-row-space-around]': `nzJustify === 'space-around'`,
    '[class.ant-row-space-between]': `nzJustify === 'space-between'`,
    '[class.ant-row-space-evenly]': `nzJustify === 'space-evenly'`,
    '[class.ant-row-rtl]': `dir === "rtl"`
  }
})
export class NzRowDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() nzAlign: NzAlign | null = null;
  @Input() nzJustify: NzJustify | null = null;
  @Input() nzGutter: string | number | IndexableObject | [number, number] | [IndexableObject, IndexableObject] | null =
    null;

  readonly actualGutter$ = new ReplaySubject<[number | null, number | null]>(1);

  dir: Direction = 'ltr';
  private readonly destroy$ = new Subject();

  getGutter(): [number | null, number | null] {
    const results: [number | null, number | null] = [null, null];
    const gutter = this.nzGutter || 0;
    const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, null];
    normalizedGutter.forEach((g, index) => {
      if (typeof g === 'object' && g !== null) {
        results[index] = null;
        Object.keys(gridResponsiveMap).map((screen: string) => {
          const bp = screen as NzBreakpointKey;
          if (this.mediaMatcher.matchMedia(gridResponsiveMap[bp]).matches && g[bp]) {
            results[index] = g![bp] as number;
          }
        });
      } else {
        results[index] = Number(g) || null;
      }
    });
    return results;
  }

  setGutterStyle(): void {
    const [horizontalGutter, verticalGutter] = this.getGutter();
    this.actualGutter$.next([horizontalGutter, verticalGutter]);
    const renderGutter = (name: string, gutter: number | null): void => {
      const nativeElement = this.elementRef.nativeElement;
      if (gutter !== null) {
        this.renderer.setStyle(nativeElement, name, `-${gutter / 2}px`);
      }
    };
    renderGutter('margin-left', horizontalGutter);
    renderGutter('margin-right', horizontalGutter);
    renderGutter('margin-top', verticalGutter);
    renderGutter('margin-bottom', verticalGutter);
  }
  constructor(
    public elementRef: ElementRef,
    public renderer: Renderer2,
    public mediaMatcher: MediaMatcher,
    public ngZone: NgZone,
    public platform: Platform,
    private breakpointService: NzBreakpointService,
    @Optional() private directionality: Directionality
  ) {}

  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
    });

    this.setGutterStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzGutter) {
      this.setGutterStyle();
    }
  }

  ngAfterViewInit(): void {
    if (this.platform.isBrowser) {
      this.breakpointService
        .subscribe(gridResponsiveMap)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.setGutterStyle();
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
