/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DestroyRef,
  DOCUMENT,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  inject,
  Input,
  numberAttribute,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subscription } from 'rxjs';

import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { cancelAnimationFrame, requestAnimationFrame } from 'ng-zorro-antd/core/polyfill';
import { NzResizeService } from 'ng-zorro-antd/core/services';
import { NzTSType } from 'ng-zorro-antd/core/types';
import { isStyleSupport, measure } from 'ng-zorro-antd/core/util';
import { NzI18nService, NzTextI18nInterface } from 'ng-zorro-antd/i18n';

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
      @if (!content) {
        <ng-content></ng-content>
      }
      {{ content }}
    </ng-template>
    @if (!editing) {
      @if (
        expanded ||
        (!hasOperationsWithEllipsis && nzEllipsisRows === 1 && !hasEllipsisObservers) ||
        canCssEllipsis ||
        (nzSuffix && expanded)
      ) {
        <ng-template
          [ngTemplateOutlet]="contentTemplate"
          [ngTemplateOutletContext]="{ content: nzContent }"
        ></ng-template>
        @if (nzSuffix) {
          {{ nzSuffix }}
        }
      } @else {
        <span #ellipsisContainer></span>
        @if (isEllipsis) {
          {{ ellipsisStr }}
        }
        @if (nzSuffix) {
          {{ nzSuffix }}
        }
        @if (nzExpandable && isEllipsis) {
          <a #expandable class="ant-typography-expand" (click)="onExpand()">
            {{ locale?.expand }}
          </a>
        }
      }
    }

    @if (nzEditable) {
      <nz-text-edit
        [text]="nzContent"
        [icon]="nzEditIcon"
        [tooltip]="nzEditTooltip"
        (endEditing)="onEndEditing($event)"
        (startEditing)="onStartEditing()"
      ></nz-text-edit>
    }

    @if (nzCopyable && !editing) {
      <nz-text-copy
        [text]="copyText"
        [tooltips]="nzCopyTooltips"
        [icons]="nzCopyIcons"
        (textCopy)="onTextCopy($event)"
      ></nz-text-copy>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
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
    '[class.ant-typography-single-line]': 'nzEllipsis && nzEllipsisRows === 1',
    '[class.ant-typography-ellipsis-single-line]': 'canCssEllipsis && nzEllipsisRows === 1',
    '[class.ant-typography-ellipsis-multiple-line]': 'canCssEllipsis && nzEllipsisRows > 1',
    '[style.-webkit-line-clamp]': '(canCssEllipsis && nzEllipsisRows > 1) ? nzEllipsisRows : null'
  },
  imports: [NgTemplateOutlet, NzTextEditComponent, NzTextCopyComponent]
})
export class NzTypographyComponent implements OnInit, AfterViewInit, OnChanges {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  nzConfigService = inject(NzConfigService);
  private el: HTMLElement = inject(ElementRef<HTMLElement>).nativeElement;
  private cdr = inject(ChangeDetectorRef);
  private viewContainerRef = inject(ViewContainerRef);
  private renderer = inject(Renderer2);
  private platform = inject(Platform);
  private i18n = inject(NzI18nService);
  private resizeService = inject(NzResizeService);
  private directionality = inject(Directionality);
  private document: Document = inject(DOCUMENT);
  private destroyRef = inject(DestroyRef);

  @Input({ transform: booleanAttribute }) nzCopyable = false;
  @Input({ transform: booleanAttribute }) nzEditable = false;
  @Input({ transform: booleanAttribute }) nzDisabled = false;
  @Input({ transform: booleanAttribute }) nzExpandable = false;
  @Input({ transform: booleanAttribute }) nzEllipsis = false;
  @Input() @WithConfig() nzCopyTooltips?: [NzTSType, NzTSType] | null = undefined;
  @Input() @WithConfig() nzCopyIcons: [NzTSType, NzTSType] = ['copy', 'check'];
  @Input() @WithConfig() nzEditTooltip?: null | NzTSType = undefined;
  @Input() @WithConfig() nzEditIcon: NzTSType = 'edit';
  @Input() nzContent?: string;
  @Input({ transform: numberAttribute }) @WithConfig() nzEllipsisRows: number = 1;
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
  private requestId: number = -1;
  private windowResizeSubscription = Subscription.EMPTY;

  get copyText(): string {
    return (typeof this.nzCopyText === 'string' ? this.nzCopyText : this.nzContent)!;
  }

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.expandableBtnElementCache = null;
      this.windowResizeSubscription.unsubscribe();
    });
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
    cancelAnimationFrame(this.requestId);
    if (!this.viewInit || !this.nzEllipsis || this.nzEllipsisRows < 0 || this.expanded || !this.platform.isBrowser) {
      return;
    }
    this.requestId = requestAnimationFrame(() => this.syncEllipsis());
  }

  getOriginContentViewRef(): { viewRef: EmbeddedViewRef<{ content: string }>; removeView(): void } {
    const viewRef = this.viewContainerRef.createEmbeddedView<{ content: string }>(this.contentTemplate!, {
      content: this.nzContent!
    });
    viewRef.detectChanges();
    return {
      viewRef,
      removeView: () => this.viewContainerRef.remove(this.viewContainerRef.indexOf(viewRef))
    };
  }

  syncEllipsis(): void {
    if (this.cssEllipsis) {
      return;
    }
    const { viewRef, removeView } = this.getOriginContentViewRef();
    const fixedNodes = [this.textCopyRef, this.textEditRef]
      .filter(e => e && e.nativeElement)
      .map(e => e!.nativeElement);
    const expandableBtnElement = this.getExpandableBtnElement();
    if (expandableBtnElement) {
      fixedNodes.push(expandableBtnElement);
    }
    const { contentNodes, text, ellipsis } = measure(
      this.el,
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
        .connect()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(() => this.renderOnNextFrame());
    }
  }

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Text');
      this.cdr.markForCheck();
    });

    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
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
}
