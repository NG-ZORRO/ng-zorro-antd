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
  OnInit,
  QueryList,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { startWith, takeUntil } from 'rxjs/operators';

import { InputBoolean, NzDomEventService, NzUpdateHostClassService } from 'ng-zorro-antd/core';
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
export class NzFormItemComponent extends NzRowDirective
  implements AfterContentInit, OnDestroy, OnChanges, OnInit, OnDestroy {
  @Input() @InputBoolean() nzFlex: boolean = false;
  @ContentChildren(NzFormExplainComponent, { descendants: true })
  listOfNzFormExplainComponent: QueryList<NzFormExplainComponent>;
  withHelpClass = false;
  tipsMode = false;

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

  constructor(
    elementRef: ElementRef,
    renderer: Renderer2,
    nzUpdateHostClassService: NzUpdateHostClassService,
    mediaMatcher: MediaMatcher,
    ngZone: NgZone,
    platform: Platform,
    nzDomEventService: NzDomEventService,
    private cdr: ChangeDetectorRef
  ) {
    super(elementRef, renderer, nzUpdateHostClassService, mediaMatcher, ngZone, platform, nzDomEventService);
    renderer.addClass(elementRef.nativeElement, 'ant-form-item');
  }

  ngAfterContentInit(): void {
    if (!this.tipsMode) {
      this.listOfNzFormExplainComponent.changes
        .pipe(
          startWith(true),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.withHelpClass = this.listOfNzFormExplainComponent && this.listOfNzFormExplainComponent.length > 0;
          this.cdr.markForCheck();
        });
    }
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.updateFlexStyle();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes.hasOwnProperty('nzFlex')) {
      this.updateFlexStyle();
    }
  }
}
