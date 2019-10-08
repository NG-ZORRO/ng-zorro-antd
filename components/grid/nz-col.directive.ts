/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterViewInit,
  Directive,
  ElementRef,
  Host,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2
} from '@angular/core';
import { isNotNil, NgClassInterface, NzUpdateHostClassService } from 'ng-zorro-antd/core';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { NzRowDirective } from './nz-row.directive';

export interface EmbeddedProperty {
  span?: number;
  pull?: number;
  push?: number;
  offset?: number;
  order?: number;
}

@Directive({
  selector: '[nz-col],nz-col',
  exportAs: 'nzCol',
  providers: [NzUpdateHostClassService]
})
export class NzColDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  private el: HTMLElement = this.elementRef.nativeElement;
  private prefixCls = 'ant-col';
  protected destroy$ = new Subject();

  @Input() nzSpan: number;
  @Input() nzOrder: number;
  @Input() nzOffset: number;
  @Input() nzPush: number;
  @Input() nzPull: number;
  @Input() nzXs: number | EmbeddedProperty;
  @Input() nzSm: number | EmbeddedProperty;
  @Input() nzMd: number | EmbeddedProperty;
  @Input() nzLg: number | EmbeddedProperty;
  @Input() nzXl: number | EmbeddedProperty;
  @Input() nzXXl: number | EmbeddedProperty;

  /** temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289*/
  setClassMap(): void {
    const classMap = {
      [`${this.prefixCls}`]: true,
      [`${this.prefixCls}-${this.nzSpan}`]: isNotNil(this.nzSpan),
      [`${this.prefixCls}-order-${this.nzOrder}`]: isNotNil(this.nzOrder),
      [`${this.prefixCls}-offset-${this.nzOffset}`]: isNotNil(this.nzOffset),
      [`${this.prefixCls}-pull-${this.nzPull}`]: isNotNil(this.nzPull),
      [`${this.prefixCls}-push-${this.nzPush}`]: isNotNil(this.nzPush),
      ...this.generateClass()
    };
    this.nzUpdateHostClassService.updateHostClass(this.el, classMap);
  }

  generateClass(): object {
    const listOfSizeInputName: Array<keyof NzColDirective> = ['nzXs', 'nzSm', 'nzMd', 'nzLg', 'nzXl', 'nzXXl'];
    const listClassMap: NgClassInterface = {};
    listOfSizeInputName.forEach(name => {
      const sizeName = name.replace('nz', '').toLowerCase();
      if (isNotNil(this[name])) {
        if (typeof this[name] === 'number' || typeof this[name] === 'string') {
          listClassMap[`${this.prefixCls}-${sizeName}-${this[name]}`] = true;
        } else {
          const embedded = this[name] as EmbeddedProperty;
          const prefixArray: Array<keyof EmbeddedProperty> = ['span', 'pull', 'push', 'offset', 'order'];
          prefixArray.forEach(prefix => {
            const prefixClass = prefix === 'span' ? '-' : `-${prefix}-`;
            listClassMap[`${this.prefixCls}-${sizeName}${prefixClass}${embedded[prefix]}`] =
              embedded && isNotNil(embedded[prefix]);
          });
        }
      }
    });
    return listClassMap;
  }

  constructor(
    private nzUpdateHostClassService: NzUpdateHostClassService,
    private elementRef: ElementRef,
    @Optional() @Host() public nzRowDirective: NzRowDirective,
    public renderer: Renderer2
  ) {}

  ngOnChanges(): void {
    this.setClassMap();
  }

  ngAfterViewInit(): void {
    if (this.nzRowDirective) {
      this.nzRowDirective.actualGutter$
        .pipe(
          startWith(this.nzRowDirective.actualGutter),
          takeUntil(this.destroy$)
        )
        .subscribe(actualGutter => {
          this.renderer.setStyle(this.el, 'padding-left', `${actualGutter / 2}px`);
          this.renderer.setStyle(this.el, 'padding-right', `${actualGutter / 2}px`);
        });
    }
  }

  ngOnInit(): void {
    this.setClassMap();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
