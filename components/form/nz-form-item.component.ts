/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { MediaMatcher } from '@angular/cdk/layout';
import { Platform } from '@angular/cdk/platform';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { InputBoolean, NzUpdateHostClassService } from 'ng-zorro-antd/core';
import { NzRowDirective } from 'ng-zorro-antd/grid';

import { NzFormExplainComponent } from './nz-form-explain.component';

/** should add nz-row directive to host, track https://github.com/angular/angular/issues/8785 **/
@Component({
  selector: 'nz-form-item',
  exportAs: 'nzFormItem',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [NzUpdateHostClassService],
  templateUrl: './nz-form-item.component.html',
  host: {
    '[class.ant-form-item-with-help]': 'listOfNzFormExplainComponent && (listOfNzFormExplainComponent.length > 0)'
  },
  styles: [
    `
      nz-form-item {
        display: block;
      }
    `
  ]
})
export class NzFormItemComponent extends NzRowDirective implements AfterContentInit, OnDestroy, OnChanges {
  @Input() @InputBoolean() nzFlex: boolean = false;

  @ContentChildren(NzFormExplainComponent, { descendants: true })
  listOfNzFormExplainComponent: QueryList<NzFormExplainComponent>;

  constructor(
    elementRef: ElementRef,
    renderer: Renderer2,
    nzUpdateHostClassService: NzUpdateHostClassService,
    mediaMatcher: MediaMatcher,
    ngZone: NgZone,
    platform: Platform,
    private cdr: ChangeDetectorRef
  ) {
    super(elementRef, renderer, nzUpdateHostClassService, mediaMatcher, ngZone, platform);
    renderer.addClass(elementRef.nativeElement, 'ant-form-item');
  }

  ngAfterContentInit(): void {
    if (this.listOfNzFormExplainComponent) {
      this.listOfNzFormExplainComponent.changes.pipe(takeUntil(this.destroy$)).subscribe(() => {
        this.cdr.markForCheck();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes.hasOwnProperty('nzFlex')) {
      const flex = changes.nzFlex.currentValue;
      if (flex) {
        this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
      } else {
        this.renderer.removeStyle(this.elementRef.nativeElement, 'display');
      }
    }
  }
}
