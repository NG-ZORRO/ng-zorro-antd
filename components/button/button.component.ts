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
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';

import { IndexableObject, InputBoolean, NzConfigService, WithConfig } from 'ng-zorro-antd/core';
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
  @Input() @InputBoolean() nzBlock: boolean = false;
  @Input() @InputBoolean() nzGhost: boolean = false;
  @Input() @InputBoolean() nzSearch: boolean = false;
  @Input() @InputBoolean() nzLoading: boolean = false;
  @Input() @InputBoolean() nzDanger: boolean = false;
  @Input() nzType: NzButtonType = null;
  @Input() nzShape: NzButtonShape = null;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 'default') nzSize: NzButtonSize;
  private destroy$ = new Subject<void>();
  private loading$ = new Subject<boolean>();
  hostClassMap: IndexableObject = {};

  updateHostClassMap(): void {
    this.hostClassMap = {
      ['ant-btn']: true,
      ['ant-btn-primary']: this.nzType === 'primary',
      ['ant-btn-dashed']: this.nzType === 'dashed',
      ['ant-btn-link']: this.nzType === 'link',
      ['ant-btn-danger']: this.nzType === 'danger',
      ['ant-btn-circle']: this.nzShape === 'circle',
      ['ant-btn-round']: this.nzShape === 'round',
      ['ant-btn-lg']: this.nzSize === 'large',
      ['ant-btn-sm']: this.nzSize === 'small',
      ['ant-btn-dangerous']: this.nzDanger,
      ['ant-btn-loading']: this.nzLoading,
      ['ant-btn-background-ghost']: this.nzGhost,
      ['ant-btn-block']: this.nzBlock,
      ['ant-input-search-button']: this.nzSearch
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
    public nzConfigService: NzConfigService
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
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateHostClassMap();
    const { nzLoading } = changes;
    if (nzLoading) {
      this.loading$.next(this.nzLoading);
    }
  }

  ngAfterViewInit(): void {
    this.insertSpan(this.elementRef.nativeElement.childNodes, this.renderer);
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
