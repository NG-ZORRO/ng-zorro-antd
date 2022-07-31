/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
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
import { fromEvent, Subject } from 'rxjs';
import { filter, startWith, takeUntil } from 'rxjs/operators';

import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzIconDirective } from 'ng-zorro-antd/icon';

export type NzButtonType = 'primary' | 'default' | 'dashed' | 'link' | 'text' | null;
export type NzButtonShape = 'circle' | 'round' | null;
export type NzButtonSize = 'large' | 'default' | 'small';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'button';

@Component({
  selector: 'button[nz-button], a[nz-button]',
  exportAs: 'nzButton',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <span nz-icon nzType="loading" *ngIf="nzLoading"></span>
    <ng-content></ng-content>
  `,
  host: {
    class: 'ant-btn',
    '[class.ant-btn-primary]': `nzType === 'primary'`,
    '[class.ant-btn-dashed]': `nzType === 'dashed'`,
    '[class.ant-btn-link]': `nzType === 'link'`,
    '[class.ant-btn-text]': `nzType === 'text'`,
    '[class.ant-btn-circle]': `nzShape === 'circle'`,
    '[class.ant-btn-round]': `nzShape === 'round'`,
    '[class.ant-btn-lg]': `nzSize === 'large'`,
    '[class.ant-btn-sm]': `nzSize === 'small'`,
    '[class.ant-btn-dangerous]': `nzDanger`,
    '[class.ant-btn-loading]': `nzLoading`,
    '[class.ant-btn-background-ghost]': `nzGhost`,
    '[class.ant-btn-block]': `nzBlock`,
    '[class.ant-input-search-button]': `nzSearch`,
    '[class.ant-btn-rtl]': `dir === 'rtl'`,
    '[attr.tabindex]': 'disabled ? -1 : (tabIndex === null ? null : tabIndex)',
    '[attr.disabled]': 'disabled || null'
  }
})
export class NzButtonComponent implements OnDestroy, OnChanges, AfterViewInit, AfterContentInit, OnInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;
  static ngAcceptInputType_nzBlock: BooleanInput;
  static ngAcceptInputType_nzGhost: BooleanInput;
  static ngAcceptInputType_nzSearch: BooleanInput;
  static ngAcceptInputType_nzLoading: BooleanInput;
  static ngAcceptInputType_nzDanger: BooleanInput;
  static ngAcceptInputType_disabled: BooleanInput;

  @ContentChild(NzIconDirective, { read: ElementRef }) nzIconDirectiveElement!: ElementRef;
  @Input() @InputBoolean() nzBlock: boolean = false;
  @Input() @InputBoolean() nzGhost: boolean = false;
  @Input() @InputBoolean() nzSearch: boolean = false;
  @Input() @InputBoolean() nzLoading: boolean = false;
  @Input() @InputBoolean() nzDanger: boolean = false;
  @Input() @InputBoolean() disabled: boolean = false;
  @Input() tabIndex: number | string | null = null;
  @Input() nzType: NzButtonType = null;
  @Input() nzShape: NzButtonShape = null;
  @Input() @WithConfig() nzSize: NzButtonSize = 'default';
  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();
  private loading$ = new Subject<boolean>();

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

  assertIconOnly(element: HTMLButtonElement, renderer: Renderer2): void {
    const listOfNode = Array.from(element.childNodes);
    const iconCount = listOfNode.filter(node => {
      const iconChildNodes = Array.from(node.childNodes || []);
      return node.nodeName === 'SPAN' && iconChildNodes.length > 0 && iconChildNodes.every(ic => ic.nodeName === 'svg');
    }).length;
    const noText = listOfNode.every(node => node.nodeName !== '#text');
    // ignore icon
    const noSpan = listOfNode
      .filter(node => {
        const iconChildNodes = Array.from(node.childNodes || []);
        return !(
          node.nodeName === 'SPAN' &&
          iconChildNodes.length > 0 &&
          iconChildNodes.every(ic => ic.nodeName === 'svg')
        );
      })
      .every(node => node.nodeName !== 'SPAN');
    const isIconOnly = noSpan && noText && iconCount >= 1;
    if (isIconOnly) {
      renderer.addClass(element, 'ant-btn-icon-only');
    }
  }

  constructor(
    private ngZone: NgZone,
    private elementRef: ElementRef,
    private cdr: ChangeDetectorRef,
    private renderer: Renderer2,
    public nzConfigService: NzConfigService,
    @Optional() private directionality: Directionality
  ) {
    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;

    this.ngZone.runOutsideAngular(() => {
      // Caretaker note: this event listener could've been added through `host.click` or `HostListener`.
      // The compiler generates the `ɵɵlistener` instruction which wraps the actual listener internally into the
      // function, which runs `markDirty()` before running the actual listener (the decorated class method).
      // Since we're preventing the default behavior and stopping event propagation this doesn't require Angular to run the change detection.
      fromEvent<MouseEvent>(this.elementRef.nativeElement, 'click', { capture: true })
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          if ((this.disabled && (event.target as HTMLElement)?.tagName === 'A') || this.nzLoading) {
            event.preventDefault();
            event.stopImmediatePropagation();
          }
        });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzLoading } = changes;
    if (nzLoading) {
      this.loading$.next(this.nzLoading);
    }
  }

  ngAfterViewInit(): void {
    this.assertIconOnly(this.elementRef.nativeElement, this.renderer);
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
