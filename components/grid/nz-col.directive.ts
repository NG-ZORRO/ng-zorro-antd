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
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { NgClassInterface } from '../core/types/ng-class';
import { isNotNil } from '../core/util/check';

import { NzRowDirective } from './nz-row.directive';

export interface EmbeddedProperty {
  span: number;
  pull: number;
  push: number;
  offset: number;
  order: number;
}

@Directive({
  selector: '[nz-col],nz-col',
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

  [property: string]: any; // tslint:disable-line:no-any

  /** temp solution since no method add classMap to host https://github.com/angular/angular/issues/7289*/
  setClassMap(): void {
    const classMap = {
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
    const listOfSizeInputName = ['nzXs', 'nzSm', 'nzMd', 'nzLg', 'nzXl', 'nzXXl'];
    const listClassMap: NgClassInterface = {};
    listOfSizeInputName.forEach(name => {
      const sizeName = name.replace('nz', '').toLowerCase();
      if (isNotNil(this[name])) {
        if (typeof this[name] === 'number' || typeof this[name] === 'string') {
          listClassMap[`${this.prefixCls}-${sizeName}-${this[name]}`] = true;
        } else {
          listClassMap[`${this.prefixCls}-${sizeName}-${this[name].span}`] = this[name] && isNotNil(this[name].span);
          listClassMap[`${this.prefixCls}-${sizeName}-pull-${this[name].pull}`] =
            this[name] && isNotNil(this[name].pull);
          listClassMap[`${this.prefixCls}-${sizeName}-push-${this[name].push}`] =
            this[name] && isNotNil(this[name].push);
          listClassMap[`${this.prefixCls}-${sizeName}-offset-${this[name].offset}`] =
            this[name] && isNotNil(this[name].offset);
          listClassMap[`${this.prefixCls}-${sizeName}-order-${this[name].order}`] =
            this[name] && isNotNil(this[name].order);
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
