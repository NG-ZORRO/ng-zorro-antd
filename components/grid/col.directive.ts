/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  DestroyRef,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  inject,
  type AfterViewInit
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NgClassInterface } from 'ng-zorro-antd/core/types';
import { isNotNil } from 'ng-zorro-antd/core/util';

import { NzRowDirective } from './row.directive';

export interface EmbeddedProperty {
  span?: number;
  pull?: number;
  push?: number;
  offset?: number;
  order?: number;
}

@Directive({
  selector: '[nz-col],nz-col,nz-form-control,nz-form-label',
  exportAs: 'nzCol',
  host: {
    '[style.flex]': 'hostFlexStyle'
  }
})
export class NzColDirective implements OnInit, OnChanges, AfterViewInit {
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private directionality = inject(Directionality);
  private destroyRef = inject(DestroyRef);
  private classMap: Record<string, boolean> = {};
  hostFlexStyle: string | null = null;
  dir: Direction = 'ltr';
  @Input() nzFlex: string | number | null = null;
  @Input() nzSpan: string | number | null = null;
  @Input() nzOrder: string | number | null = null;
  @Input() nzOffset: string | number | null = null;
  @Input() nzPush: string | number | null = null;
  @Input() nzPull: string | number | null = null;
  @Input() nzXs: string | number | EmbeddedProperty | null = null;
  @Input() nzSm: string | number | EmbeddedProperty | null = null;
  @Input() nzMd: string | number | EmbeddedProperty | null = null;
  @Input() nzLg: string | number | EmbeddedProperty | null = null;
  @Input() nzXl: string | number | EmbeddedProperty | null = null;
  @Input() nzXXl: string | number | EmbeddedProperty | null = null;

  setHostClassMap(): void {
    const hostClassMap = {
      ['ant-col']: true,
      [`ant-col-${this.nzSpan}`]: isNotNil(this.nzSpan),
      [`ant-col-order-${this.nzOrder}`]: isNotNil(this.nzOrder),
      [`ant-col-offset-${this.nzOffset}`]: isNotNil(this.nzOffset),
      [`ant-col-pull-${this.nzPull}`]: isNotNil(this.nzPull),
      [`ant-col-push-${this.nzPush}`]: isNotNil(this.nzPush),
      ['ant-col-rtl']: this.dir === 'rtl',
      ...this.generateClass()
    };
    for (const i in this.classMap) {
      if (this.classMap.hasOwnProperty(i)) {
        this.renderer.removeClass(this.elementRef.nativeElement, i);
      }
    }
    this.classMap = { ...hostClassMap };
    for (const i in this.classMap) {
      if (this.classMap.hasOwnProperty(i) && this.classMap[i]) {
        this.renderer.addClass(this.elementRef.nativeElement, i);
      }
    }
  }

  setHostFlexStyle(): void {
    this.hostFlexStyle = this.parseFlex(this.nzFlex);
  }

  parseFlex(flex: number | string | null): string | null {
    if (typeof flex === 'number') {
      return `${flex} ${flex} auto`;
    } else if (typeof flex === 'string') {
      if (/^\d+(\.\d+)?(px|em|rem|%)$/.test(flex)) {
        return `0 0 ${flex}`;
      }
    }
    return flex;
  }

  generateClass(): object {
    const listOfSizeInputName: Array<keyof NzColDirective> = ['nzXs', 'nzSm', 'nzMd', 'nzLg', 'nzXl', 'nzXXl'];
    const listClassMap: NgClassInterface = {};
    listOfSizeInputName.forEach(name => {
      const sizeName = name.replace('nz', '').toLowerCase();
      if (isNotNil(this[name])) {
        if (typeof this[name] === 'number' || typeof this[name] === 'string') {
          listClassMap[`ant-col-${sizeName}-${this[name]}`] = true;
        } else {
          const embedded = this[name] as EmbeddedProperty;
          const prefixArray: Array<keyof EmbeddedProperty> = ['span', 'pull', 'push', 'offset', 'order'];
          prefixArray.forEach(prefix => {
            const prefixClass = prefix === 'span' ? '-' : `-${prefix}-`;
            listClassMap[`ant-col-${sizeName}${prefixClass}${embedded[prefix]}`] =
              embedded && isNotNil(embedded[prefix]);
          });
        }
      }
    });
    return listClassMap;
  }

  nzRowDirective = inject(NzRowDirective, { host: true, optional: true });

  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
      this.dir = direction;
      this.setHostClassMap();
    });

    this.setHostClassMap();
    this.setHostFlexStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setHostClassMap();
    const { nzFlex } = changes;
    if (nzFlex) {
      this.setHostFlexStyle();
    }
  }

  ngAfterViewInit(): void {
    if (this.nzRowDirective) {
      this.nzRowDirective.actualGutter$
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(([horizontalGutter, verticalGutter]) => {
          const renderGutter = (name: string, gutter: number | null): void => {
            const nativeElement = this.elementRef.nativeElement;
            if (gutter !== null) {
              this.renderer.setStyle(nativeElement, name, `${gutter / 2}px`);
            }
          };
          renderGutter('padding-left', horizontalGutter);
          renderGutter('padding-right', horizontalGutter);
          renderGutter('padding-top', verticalGutter);
          renderGutter('padding-bottom', verticalGutter);
        });
    }
  }
}
