/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Platform } from '@angular/cdk/platform';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EmbeddedViewRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation
} from '@angular/core';

import { Subject, Subscription } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import {
  cancelRequestAnimationFrame,
  isStyleSupport,
  measure,
  reqAnimFrame,
  InputBoolean,
  InputNumber,
  NzConfigService,
  NzDomEventService,
  WithConfig
} from 'ng-zorro-antd/core';
import { NzI18nService } from 'ng-zorro-antd/i18n';

import { NzTextCopyComponent } from './nz-text-copy.component';
import { NzTextEditComponent } from './nz-text-edit.component';

const NZ_CONFIG_COMPONENT_NAME = 'typography';

@Component({
  selector: `
  nz-typography,
  [nz-typography],
  p[nz-paragraph],
  span[nz-text],
  h1[nz-title], h2[nz-title], h3[nz-title], h4[nz-title]
  `,
  exportAs: 'nzTypography',
  templateUrl: './nz-typography.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  host: {
    '[class.ant-typography]': '!editing',
    '[class.ant-typography-edit-content]': 'editing',
    '[class.ant-typography-secondary]': 'nzType === "secondary"',
    '[class.ant-typography-warning]': 'nzType === "warning"',
    '[class.ant-typography-danger]': 'nzType === "danger"',
    '[class.ant-typography-disabled]': 'nzDisabled',
    '[class.ant-typography-ellipsis]': 'nzEllipsis && !expanded',
    '[class.ant-typography-ellipsis-single-line]': 'canCssEllipsis && nzEllipsisRows === 1',
    '[class.ant-typography-ellipsis-multiple-line]': 'canCssEllipsis && nzEllipsisRows > 1',
    '[style.-webkit-line-clamp]': '(canCssEllipsis && nzEllipsisRows > 1) ? nzEllipsisRows : null'
  }
})
export class NzTypographyComponent implements OnInit, AfterViewInit, OnDestroy, OnChanges {
  @Input() @InputBoolean() nzCopyable = false;
  @Input() @InputBoolean() nzEditable = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzExpandable = false;
  @Input() @InputBoolean() nzEllipsis = false;
  @Input() nzContent: string;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 1) @InputNumber() nzEllipsisRows: number;
  @Input() nzType: 'secondary' | 'warning' | 'danger' | undefined;
  @Input() nzCopyText: string | undefined;
  @Output() readonly nzContentChange = new EventEmitter<string>();
  @Output() readonly nzCopy = new EventEmitter<string>();
  @Output() readonly nzExpandChange = new EventEmitter<void>();

  @ViewChild(NzTextEditComponent, { static: false }) textEditRef: NzTextEditComponent;
  @ViewChild(NzTextCopyComponent, { static: false }) textCopyRef: NzTextCopyComponent;
  @ViewChild('ellipsisContainer', { static: false }) ellipsisContainer: ElementRef<HTMLSpanElement>;
  @ViewChild('expandable', { static: false }) expandableBtn: ElementRef<HTMLSpanElement>;
  @ViewChild('contentTemplate', { static: false }) contentTemplate: TemplateRef<{ content: string }>;

  // tslint:disable-next-line:no-any
  locale: any = {};
  editing = false;
  ellipsisText: string | undefined;
  cssEllipsis: boolean = false;
  isEllipsis: boolean = false;
  expanded: boolean = false;
  ellipsisStr = '...';

  get canCssEllipsis(): boolean {
    return this.nzEllipsis && this.cssEllipsis && !this.expanded;
  }

  private viewInit = false;
  private rfaId: number = -1;
  private destroy$ = new Subject();
  private windowResizeSubscription = Subscription.EMPTY;
  get copyText(): string {
    return typeof this.nzCopyText === 'string' ? this.nzCopyText : this.nzContent;
  }

  constructor(
    public nzConfigService: NzConfigService,
    private host: ElementRef<HTMLElement>,
    private cdr: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef,
    private renderer: Renderer2,
    private platform: Platform,
    private i18n: NzI18nService,
    private nzDomEventService: NzDomEventService
  ) {}

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
  }

  onExpand(): void {
    this.expanded = true;
    this.nzExpandChange.emit();
  }

  canUseCSSEllipsis(): boolean {
    if (this.nzEditable || this.nzCopyable || this.nzExpandable) {
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
    const viewRef = this.viewContainerRef.createEmbeddedView<{ content: string }>(this.contentTemplate, {
      content: this.nzContent
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
    const fixedNodes = [this.textCopyRef, this.textEditRef, this.expandableBtn]
      .filter(e => e && e.nativeElement)
      .map(e => e.nativeElement);

    const { contentNodes, text, ellipsis } = measure(
      this.host.nativeElement,
      this.nzEllipsisRows,
      viewRef.rootNodes,
      fixedNodes,
      this.ellipsisStr
    );

    removeView();

    this.ellipsisText = text;
    this.isEllipsis = ellipsis;
    const ellipsisContainerNativeElement = this.ellipsisContainer.nativeElement;
    while (ellipsisContainerNativeElement.firstChild) {
      this.renderer.removeChild(ellipsisContainerNativeElement, ellipsisContainerNativeElement.firstChild);
    }
    contentNodes.forEach(n => {
      this.renderer.appendChild(ellipsisContainerNativeElement, n.cloneNode(true));
    });
    this.cdr.markForCheck();
  }

  private renderAndSubscribeWindowResize(): void {
    if (this.platform.isBrowser) {
      this.windowResizeSubscription.unsubscribe();
      this.cssEllipsis = this.canUseCSSEllipsis();
      this.renderOnNextFrame();
      this.windowResizeSubscription = this.nzDomEventService
        .registerResizeListener()
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.nzDomEventService.unregisterResizeListener())
        )
        .subscribe(() => this.renderOnNextFrame());
    }
  }

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('Text');
      this.cdr.markForCheck();
    });
  }

  ngAfterViewInit(): void {
    this.viewInit = true;
    this.renderAndSubscribeWindowResize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzCopyable, nzEditable, nzExpandable, nzEllipsis, nzContent, nzEllipsisRows } = changes;
    if (nzCopyable || nzEditable || nzExpandable || nzEllipsis || nzContent || nzEllipsisRows) {
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
    this.windowResizeSubscription.unsubscribe();
  }
}
