/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { fadeMotion, InputNumber, NzConfigService, NzScrollService, WithConfig } from 'ng-zorro-antd/core';
import { fromEvent, Subscription } from 'rxjs';
import { distinctUntilChanged, throttleTime } from 'rxjs/operators';

const NZ_CONFIG_COMPONENT_NAME = 'backTop';

@Component({
  selector: 'nz-back-top',
  exportAs: 'nzBackTop',
  animations: [fadeMotion],
  templateUrl: './nz-back-top.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false
})
export class NzBackTopComponent implements OnInit, OnDestroy {
  private scroll$: Subscription | null = null;
  private target: HTMLElement | null = null;

  visible: boolean = false;

  @Input() nzTemplate: TemplateRef<void>;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 400) @InputNumber() nzVisibilityHeight: number;

  @Input()
  set nzTarget(el: string | HTMLElement) {
    this.target = typeof el === 'string' ? this.doc.querySelector(el) : el;
    this.registerScrollEvent();
  }

  @Output() readonly nzClick: EventEmitter<boolean> = new EventEmitter();

  constructor(
    public nzConfigService: NzConfigService,
    private scrollSrv: NzScrollService,
    // tslint:disable-next-line:no-any
    @Inject(DOCUMENT) private doc: any,
    private platform: Platform,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!this.scroll$) {
      this.registerScrollEvent();
    }
  }

  clickBackTop(): void {
    this.scrollSrv.scrollTo(this.getTarget(), 0);
    this.nzClick.emit(true);
  }

  private getTarget(): HTMLElement | Window {
    return this.target || window;
  }

  private handleScroll(): void {
    if (this.visible === this.scrollSrv.getScroll(this.getTarget()) > this.nzVisibilityHeight) {
      return;
    }
    this.visible = !this.visible;
    this.cd.markForCheck();
  }

  private removeListen(): void {
    if (this.scroll$) {
      this.scroll$.unsubscribe();
    }
  }

  private registerScrollEvent(): void {
    if (!this.platform.isBrowser) {
      return;
    }
    this.removeListen();
    this.handleScroll();
    this.scroll$ = fromEvent(this.getTarget(), 'scroll')
      .pipe(
        throttleTime(50),
        distinctUntilChanged()
      )
      .subscribe(() => this.handleScroll());
  }

  ngOnDestroy(): void {
    this.removeListen();
  }
}
