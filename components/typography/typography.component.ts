/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { cancelRequestAnimationFrame, reqAnimFrame } from 'ng-zorro-antd/core/polyfill';
import { NzResizeService } from 'ng-zorro-antd/core/services';
import { BooleanInput, NumberInput, NzSafeAny, NzTSType } from 'ng-zorro-antd/core/types';
import { InputBoolean, InputNumber, isStyleSupport, measure } from 'ng-zorro-antd/core/util';

import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzI18nService, NzTextI18nInterface } from 'ng-zorro-antd/i18n';

import { Direction, Directionality } from '@angular/cdk/bidi';
import { NzTextCopyComponent } from './text-copy.component';
import { NzTextEditComponent } from './text-edit.component';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'typography';
const EXPAND_ELEMENT_CLASSNAME = 'ant-typography-expand';

@Component({
  selector: `
  nz-typography,
  [nz-typography],
  p[nz-paragraph],
  span[nz-text],
  h1[nz-title], h2[nz-title], h3[nz-title], h4[nz-title]
  `,
  exportAs: 'nzTypography',
  template: `
    <ng-template #contentTemplate let-content="content">
      <ng-content *ngIf="!content"></ng-content>
      {{ content }}
    </ng-template>
    <ng-container *ngIf="!editing">
      <ng-container
        *ngIf="
          expanded ||
            (!hasOperationsWithEllipsis && nzEllipsisRows === 1 && !hasEllipsisObservers) ||
            canCssEllipsis ||
            (nzSuffix && expanded);
          else jsEllipsis
        "
      >
        <ng-template [ngTemplateOutlet]="contentTemplate" [ngTemplateOutletContext]="{ content: nzContent }"></ng-template>
        <ng-container *ngIf="nzSuffix">{{ nzSuffix }}</ng-container>
      </ng-container>
      <ng-template #jsEllipsis>
        <span #ellipsisContainer></span>
        <ng-container *ngIf="isEllipsis">{{ ellipsisStr }}</ng-container>
        <ng-container *ngIf="nzSuffix">{{ nzSuffix }}</ng-container>
        <a #expandable *ngIf="nzExpandable && isEllipsis" class="ant-typography-expand" (click)="onExpand()">{{ locale?.expand }}</a>
      </ng-template>
    </ng-container>

    <nz-text-edit
      *ngIf="nzEditable"
      [text]="nzContent"
      [icon]="nzEditIcon"
      [tooltip]="nzEditTooltip"
      (endEditing)="onEndEditing($event)"
      (startEditing)="onStartEditing()"
    ></nz-text-edit>

    <nz-text-copy
      *ngIf="nzCopyable && !editing"
      [text]="copyText"
      [tooltips]="nzCopyTooltips"
      [icons]="nzCopyIcons"
      (textCopy)="onTextCopy($event)"
    ></nz-text-copy>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  host: {
    '[class.ant-typography]': '!editing',
    '[class.ant-typography-rtl]': 'dir === "rtl"',
    '[class.ant-typography-edit-content]': 'editing',
    '[class.ant-typography-secondary]': 'nzType === "secondary"',
    '[class.ant-typography-warning]': 'nzType === "warning"',
    '[class.ant-typography-danger]': 'nzType === "danger"',
    '[class.ant-typography-success]': 'nzType === "success"',
    '[class.ant-typography-disabled]': 'nzDisabled',
    '[class.ant-typography-ellipsis]': 'nzEllipsis && !expanded',
    '[class.ant-typography-ellipsis-single-line]': 'canCssEllipsis && nzEllipsisRows === 1',
    '[class.ant-typography-ellipsis-multiple-line]': 'canCssEllipsis && nzEllipsisRows > 1',
    '[style.-webkit-line-clamp]': '(canCssEllipsis && nzEllipsisRows > 1) ? nzEllipsisRows : null'
  }
})
export class NzTypographyComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  static ngAcceptInputType_nzCopyable: BooleanInput;
  static ngAcceptInputType_nzEditable: BooleanInput;
  static ngAcceptInputType_nzDisabled: BooleanInput;
  static ngAcceptInputType_nzExpandable: BooleanInput;
  static ngAcceptInputType_nzEllipsis: BooleanInput;
  static ngAcceptInputType_nzEllipsisRows: NumberInput;

  @Input() @InputBoolean() nzCopyable = false;
  @Input() @InputBoolean() nzEditable = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzExpandable = false;
  @Input() @InputBoolean() nzEllipsis = false;
  @Input() @WithConfig() nzCopyTooltips?: [NzTSType, NzTSType] | null = undefined;
  @Input() @WithConfig() nzCopyIcons: [NzTSType, NzTSType] = ['copy', 'check'];
  @Input() @WithConfig() nzEditTooltip?: null | NzTSType = undefined;
  @Input() @WithConfig() nzEditIcon: NzTSType = 'edit';
  @Input() nzContent?: string;
  @Input() @WithConfig() @InputNumber() nzEllipsisRows: number = 1;
  @Input() nzType: 'secondary' | 'warning' | 'danger' | 'success' | undefined;
  @Input() nzCopyText: string | undefined;
  @Input() nzSuffix: string | undefined;
  @Output() readonly nzContentChange = new EventEmitter<string>();
  @Output() readonly nzCopy = new EventEmitter<string>();
  @Output() readonly nzExpandChange = new EventEmitter<void>();
  // This is not a two-way binding output with {@link nzEllipsis}
  @Output() readonly nzOnEllipsis = new EventEmitter<boolean>();

  @ViewChild(NzTextEditComponent, { static: false }) textEditRef?: NzTextEditComponent;
  @ViewChild(NzTextCopyComponent, { static: false }) textCopyRef?: NzTextCopyComponent;
  @ViewChild('ellipsisContainer', { static: false }) ellipsisContainer?: ElementRef<HTMLSpanElement>;
  @ViewChild('expandable', { static: false }) expandableBtn?: ElementRef<HTMLSpanElement>;
  @ViewChild('contentTemplate', { static: false }) contentTemplate?: TemplateRef<{ content: string }>;

  locale!: NzTextI18nInterface;
  document: Document;
  expandableBtnElementCache: HTMLElement | null = null;
  editing = false;
  ellipsisText: string | undefined;
  cssEllipsis: boolean = false;
  isEllipsis: boolean = true;
  expanded: boolean = false;
  ellipsisStr = '...';
  dir: Direction = 'ltr';

  get hasEllipsisObservers(): boolean {
    return this.nzOnEllipsis.observers.length > 0;
  }

  get canCssEllipsis(): boolean {
    return this.nzEllipsis && this.cssEllipsis && !this.expanded && !this.hasEllipsisObservers;
  }

  get hasOperationsWithEllipsis(): boolean {
    return (this.nzCopyable || this.nzEditable || this.nzExpandable) && this.nzEllipsis;
  }

  private viewInit = false;
  private rfaId: number = -1;
  private destroy$ = new Subject();
  private windowResizeSubscription = Subscription.EMPTY;
  get copyText(): string {
    return (typeof this.nzCopyText === 'string' ? this.nzCopyText : this.nzContent)!;
  }

  constructor(
    public nzConfigService: NzConfigService,
    private host: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
    private platform: Platform,
    private i18n: NzI18nService,
    @Inject(DOCUMENT) document: NzSafeAny,
    private resizeService: NzResizeService,
    @Optional() private directionality: Directionality
  ) {
    this.document = document;
  }

  onTextCopy(text: string): void {
    this.nzCopy.emit(text);
  }

  onStartEditing(): void {
    this.editing = true;
  }

  onEndEditing(text: string): void {
    this.editing = false;
    this.nzContentChange.emit(text);
    if (this.nzContent === text) {
      this.renderOnNextFrame();
    }
    this.cdr.markForCheck();
  }

  onExpand(): void {
    this.isEllipsis = false;
    this.expanded = true;
    this.nzExpandChange.emit();
    this.nzOnEllipsis.emit(false);
  }

  canUseCSSEllipsis(): boolean {
    if (this.nzEditable || this.nzCopyable || this.nzExpandable || this.nzSuffix) {
      return false;
    }
    // make sure {@link nzOnEllipsis} works, will force use JS to calculations
    if (this.hasEllipsisObservers) {
      return false;
    }
    if (this.nzEllipsisRows === 1) {
      return isStyleSupport('textOverflow');
    } else {
      return isStyleSupport('webkitLineClamp');
    }
  }

  renderOnNextFrame(): void {
    cancelRequestAnimationFrame(this.rfaId);
    if (!this.viewInit || !this.nzEllipsis || this.nzEllipsisRows < 0 || this.expanded || !this.platform.isBrowser) {
      return;
    }
    this.rfaId = reqAnimFrame(() => {
      this.syncEllipsis();
    });
  }

  getOriginContentViewRef(): { viewRef: EmbeddedViewRef<{ content: string }>; removeView(): void } {
    const viewRef = this.viewContainerRef.createEmbeddedView<{ content: string }>(this.contentTemplate!, {
      content: this.nzContent!
    });
    viewRef.detectChanges();
    return {
      viewRef,
      removeView: () => {
        this.viewContainerRef.remove(this.viewContainerRef.indexOf(viewRef));
      }
    };
  }

  syncEllipsis(): void {
    if (this.cssEllipsis) {
      return;
    }
    const { viewRef, removeView } = this.getOriginContentViewRef();
    const fixedNodes = [this.textCopyRef, this.textEditRef].filter(e => e && e.nativeElement).map(e => e!.nativeElement);
    const expandableBtnElement = this.getExpandableBtnElement();
    if (expandableBtnElement) {
      fixedNodes.push(expandableBtnElement);
    }
    const { contentNodes, text, ellipsis } = measure(
      this.host.nativeElement,
      this.nzEllipsisRows,
      viewRef.rootNodes,
      fixedNodes,
      this.ellipsisStr,
      this.nzSuffix
    );

    removeView();

    this.ellipsisText = text;
    if (ellipsis !== this.isEllipsis) {
      this.isEllipsis = ellipsis;
      this.nzOnEllipsis.emit(ellipsis);
    }
    const ellipsisContainerNativeElement = this.ellipsisContainer!.nativeElement;
    while (ellipsisContainerNativeElement.firstChild) {
      this.renderer.removeChild(ellipsisContainerNativeElement, ellipsisContainerNativeElement.firstChild);
    }
    contentNodes.forEach(n => {
      this.renderer.appendChild(ellipsisContainerNativeElement, n.cloneNode(true));
    });
    this.cdr.markForCheck();
  }

  // Need to create the element for calculation size before view init
  private getExpandableBtnElement(): HTMLElement | null {
    if (this.nzExpandable) {
      const expandText = this.locale ? this.locale.expand : '';
      const cache = this.expandableBtnElementCache;
      if (!cache || cache.innerText === expandText) {
        const el = this.document.createElement('a');
        el.className = EXPAND_ELEMENT_CLASSNAME;
        el.innerText = expandText;
        this.expandableBtnElementCache = el;
      }
      return this.expandableBtnElementCache;
    } else {
      this.expandableBtnElementCache = null;
      return null;
    }
  }

  private renderAndSubscribeWindowResize(): void {
    if (this.platform.isBrowser) {
      this.windowResizeSubscription.unsubscribe();
      this.cssEllipsis = this.canUseCSSEllipsis();
      this.renderOnNextFrame();
      this.windowResizeSubscription = this.resizeService
        .subscribe()
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => this.renderOnNextFrame());
    }
  }

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Text');
      this.cdr.markForCheck();
    });

    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  ngAfterViewInit(): void {
    this.viewInit = true;
    this.renderAndSubscribeWindowResize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzCopyable, nzEditable, nzExpandable, nzEllipsis, nzContent, nzEllipsisRows, nzSuffix } = changes;
    if (nzCopyable || nzEditable || nzExpandable || nzEllipsis || nzContent || nzEllipsisRows || nzSuffix) {
      if (this.nzEllipsis) {
        if (this.expanded) {
          this.windowResizeSubscription.unsubscribe();
        } else {
          this.renderAndSubscribeWindowResize();
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.expandableBtnElementCache = null;
    this.windowResizeSubscription.unsubscribe();
  }
}
