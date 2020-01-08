/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  HostBinding,
  Inject,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { ANIMATION_MODULE_TYPE } from '@angular/platform-browser/animations';

import { InputBoolean, NZ_WAVE_GLOBAL_CONFIG, NzConfigService, NzWaveConfig, NzWaveDirective, WithConfig } from 'ng-zorro-antd/core';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';

export type NzButtonType = 'primary' | 'dashed' | 'danger' | 'link' | null;
export type NzButtonShape = 'circle' | 'round' | null;
export type NzButtonSize = 'large' | 'default' | 'small';

const NZ_CONFIG_COMPONENT_NAME = 'button';

@Component({
  selector: 'button[nz-button], a[nz-button]',
  exportAs: 'nzButton',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: { '[class]': 'hostClassMap' },
  template: `
    <i nz-icon nzType="loading" *ngIf="nzLoading"></i>
    <ng-content></ng-content>
  `
})
export class NzButtonComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit, AfterContentInit {
  @ContentChild(NzIconDirective, { read: ElementRef }) nzIconDirectiveElement: ElementRef;
  @HostBinding('attr.nz-wave') nzWave = new NzWaveDirective(this.ngZone, this.elementRef, this.waveConfig, this.animationType);
  @Input() @InputBoolean() nzBlock: boolean = false;
  @Input() @InputBoolean() nzGhost: boolean = false;
  @Input() @InputBoolean() nzSearch: boolean = false;
  @Input() @InputBoolean() nzLoading: boolean = false;
  @Input() @InputBoolean() nzDanger: boolean = false;
  @Input() nzType: NzButtonType = null;
  @Input() nzShape: NzButtonShape = null;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 'default') nzSize: NzButtonSize;
  readonly nativeElement: HTMLElement = this.elementRef.nativeElement;
  private destroy$ = new Subject<void>();
  private loading$ = new Subject<boolean>();
  hostClassMap = {};

  updateHostClassMap(): void {
    const prefixCls = 'ant-btn';
    this.hostClassMap = {
      [`${prefixCls}`]: true,
      [`${prefixCls}-primary`]: this.nzType === 'primary',
      [`${prefixCls}-dashed`]: this.nzType === 'dashed',
      [`${prefixCls}-link`]: this.nzType === 'link',
      [`${prefixCls}-danger`]: this.nzType === 'danger',
      [`${prefixCls}-circle`]: this.nzShape === 'circle',
      [`${prefixCls}-round`]: this.nzShape === 'round',
      [`${prefixCls}-lg`]: this.nzSize === 'large',
      [`${prefixCls}-sm`]: this.nzSize === 'small',
      [`${prefixCls}-dangerous`]: this.nzDanger,
      [`${prefixCls}-loading`]: this.nzLoading,
      [`${prefixCls}-background-ghost`]: this.nzGhost,
      [`${prefixCls}-block`]: this.nzBlock,
      [`ant-input-search-button`]: this.nzSearch
    };
    this.cdr.markForCheck();
  }

  insertSpan(nodes: NodeList, renderer: Renderer2): void {
    nodes.forEach(node => {
      if (node.nodeName === '#text') {
        const span = renderer.createElement('span');
        const parent = renderer.parentNode(node);
        renderer.insertBefore(parent, span, node);
        renderer.appendChild(span, node);
      }
    });
  }

  constructor(
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    private ngZone: NgZone,
    public nzConfigService: NzConfigService,
    @Optional() @Inject(NZ_WAVE_GLOBAL_CONFIG) private waveConfig: NzWaveConfig,
    @Optional() @Inject(ANIMATION_MODULE_TYPE) private animationType: string
  ) {
    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_COMPONENT_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateHostClassMap();
      });
  }

  ngOnInit(): void {
    this.updateHostClassMap();
    this.nzWave.ngOnInit();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.nzWave.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClassMap();
    const { nzType, nzLoading } = changes;
    if (nzLoading) {
      this.loading$.next(this.nzLoading);
    }
    if (nzType && nzType.currentValue === 'link') {
      this.nzWave.disable();
    } else {
      this.nzWave.enable();
    }
  }

  ngAfterViewInit(): void {
    this.insertSpan(this.nativeElement.childNodes, this.renderer);
  }

  ngAfterContentInit(): void {
    this.loading$
      .pipe(
        startWith(this.nzLoading),
        filter(() => !!this.nzIconDirectiveElement),
        takeUntil(this.destroy$)
      )
      .subscribe(loading => {
        const nativeElement = this.nzIconDirectiveElement.nativeElement;
        if (loading) {
          this.renderer.setStyle(nativeElement, 'display', 'none');
        } else {
          this.renderer.removeStyle(nativeElement, 'display');
        }
      });
  }
}
