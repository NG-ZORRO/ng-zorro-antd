/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { InputBoolean } from 'ng-zorro-antd/core';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';

import { NzFormExplainComponent } from './nz-form-explain.component';

/** should add nz-row directive to host, track https://github.com/angular/angular/issues/8785 **/
@Component({
  selector: 'nz-form-item',
  exportAs: 'nzFormItem',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './nz-form-item.component.html',
  host: {
    '[class.ant-form-item-with-help]': 'withHelpClass'
  },
  styles: [
    `
      nz-form-item {
        display: block;
      }
    `
  ]
})
export class NzFormItemComponent implements AfterContentInit, OnDestroy, OnChanges, OnDestroy {
  @Input() @InputBoolean() nzFlex: boolean = false;
  @ContentChildren(NzFormExplainComponent, { descendants: true })
  listOfNzFormExplainComponent: QueryList<NzFormExplainComponent>;
  withHelpClass = false;
  tipsMode = false;
  private destroy$ = new Subject();

  updateFlexStyle(): void {
    if (this.nzFlex) {
      this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'flex');
    } else {
      this.renderer.removeStyle(this.elementRef.nativeElement, 'display');
    }
  }

  setWithHelpViaTips(value: boolean): void {
    this.tipsMode = true;
    this.withHelpClass = value;
    this.cdr.markForCheck();
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private cdr: ChangeDetectorRef) {
    renderer.addClass(elementRef.nativeElement, 'ant-form-item');
  }

  ngAfterContentInit(): void {
    if (!this.tipsMode) {
      this.listOfNzFormExplainComponent.changes.pipe(startWith(true), takeUntil(this.destroy$)).subscribe(() => {
        this.withHelpClass = this.listOfNzFormExplainComponent && this.listOfNzFormExplainComponent.length > 0;
        this.cdr.markForCheck();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('nzFlex')) {
      this.updateFlexStyle();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
