/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import { DOWN_ARROW, ENTER, ESCAPE, LEFT_ARROW, RIGHT_ARROW, TAB, UP_ARROW } from '@angular/cdk/keycodes';
import {
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { NgTemplateOutlet } from '@angular/common';
import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  contentChild,
  ContentChild,
  DestroyRef,
  DOCUMENT,
  effect,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  NgZone,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge, of as observableOf, Subscription } from 'rxjs';
import { distinctUntilChanged, map, startWith, switchMap, withLatestFrom } from 'rxjs/operators';

import { NzFormItemFeedbackIconComponent, NzFormNoStatusService, NzFormStatusService } from 'ng-zorro-antd/core/form';
import { DEFAULT_MENTION_BOTTOM_POSITIONS, DEFAULT_MENTION_TOP_POSITIONS } from 'ng-zorro-antd/core/overlay';
import { NgClassInterface, NzSafeAny, NzStatus, NzValidateStatus } from 'ng-zorro-antd/core/types';
import {
  fromEventOutsideAngular,
  getCaretCoordinates,
  getMentions,
  getStatusClassNames
} from 'ng-zorro-antd/core/util';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NZ_MENTION_CONFIG } from './config';
import { NzMentionSuggestionDirective } from './mention-suggestions';
import { NzMentionTriggerDirective } from './mention-trigger';

export interface MentionOnSearchTypes {
  value: string;
  prefix: string;
}

export interface Mention {
  startPos: number;
  endPos: number;
  mention: string;
}

export type MentionPlacement = 'top' | 'bottom';

@Component({
  selector: 'nz-mention',
  exportAs: 'nzMention',
  template: `
    <ng-content></ng-content>
    <ng-template #suggestions>
      <div class="ant-mentions-dropdown">
        <ul class="ant-mentions-dropdown-menu" role="menu" tabindex="0">
          @for (suggestion of filteredSuggestions; track suggestion) {
            <li
              #items
              class="ant-mentions-dropdown-menu-item"
              role="menuitem"
              tabindex="-1"
              [class.ant-mentions-dropdown-menu-item-active]="$index === activeIndex"
              [class.ant-mentions-dropdown-menu-item-selected]="$index === activeIndex"
              (click)="selectSuggestion(suggestion)"
            >
              @if (suggestionTemplate) {
                <ng-container *ngTemplateOutlet="suggestionTemplate; context: { $implicit: suggestion }" />
              } @else {
                {{ nzValueWith(suggestion) }}
              }
            </li>
          }

          @if (filteredSuggestions.length === 0) {
            <li class="ant-mentions-dropdown-menu-item ant-mentions-dropdown-menu-item-disabled">
              @if (nzLoading) {
                <span><nz-icon nzType="loading" /></span>
              } @else {
                <span>
                  <nz-embed-empty nzComponentName="select" [specificContent]="nzNotFoundContent!" />
                </span>
              }
            </li>
          }
        </ul>
      </div>
    </ng-template>
    @if (hasFeedback && !!status) {
      <nz-form-item-feedback-icon class="ant-mentions-suffix" [status]="status" />
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ant-mentions',
    '[class.ant-mentions-rtl]': `dir === 'rtl'`
  },
  imports: [NgTemplateOutlet, NzIconModule, NzEmptyModule, NzFormItemFeedbackIconComponent]
})
export class NzMentionComponent implements OnInit, AfterViewInit, OnChanges {
  private ngZone = inject(NgZone);
  private directionality = inject(Directionality);
  private cdr = inject(ChangeDetectorRef);
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private elementRef = inject(ElementRef);
  private renderer = inject(Renderer2);
  private destroyRef = inject(DestroyRef);
  @Input() nzValueWith: (value: NzSafeAny) => string = value => value;
  @Input() nzPrefix: string | string[] = '@';
  @Input({ transform: booleanAttribute }) nzLoading = false;
  @Input() nzNotFoundContent: string = '无匹配结果，轻敲空格完成输入';
  @Input() nzPlacement: MentionPlacement = 'bottom';
  @Input() nzSuggestions: NzSafeAny[] = [];
  @Input() nzStatus: NzStatus = '';
  @Output() readonly nzOnSelect = new EventEmitter<NzSafeAny>();
  @Output() readonly nzOnSearchChange = new EventEmitter<MentionOnSearchTypes>();

  @ViewChild(TemplateRef, { static: false }) suggestionsTemp?: TemplateRef<void>;
  @ViewChildren('items', { read: ElementRef })
  items!: QueryList<ElementRef>;

  @ContentChild(NzMentionSuggestionDirective, { static: false, read: TemplateRef })
  set suggestionChild(value: TemplateRef<{ $implicit: NzSafeAny }>) {
    if (value) {
      this.suggestionTemplate = value;
    }
  }

  readonly trigger = contentChild.required(NzMentionTriggerDirective);

  isOpen = false;
  filteredSuggestions: string[] = [];
  suggestionTemplate: TemplateRef<{ $implicit: NzSafeAny }> | null = null;
  activeIndex = -1;
  dir: Direction = 'ltr';
  // status
  prefixCls: string = 'ant-mentions';
  statusCls: NgClassInterface = {};
  status: NzValidateStatus = '';
  hasFeedback: boolean = false;

  private previousValue: string | null = null;
  private cursorMention: string | null = null;
  private cursorMentionStart?: number;
  private cursorMentionEnd?: number;
  private overlayRef: OverlayRef | null = null;
  private portal?: TemplatePortal<void>;
  private positionStrategy!: FlexibleConnectedPositionStrategy;
  private overlayOutsideClickSubscription!: Subscription;
  private document: Document = inject(DOCUMENT);

  private get triggerNativeElement(): HTMLTextAreaElement | HTMLInputElement {
    return this.trigger().elementRef.nativeElement;
  }

  private get focusItemElement(): HTMLElement | null {
    const itemArr = this.items?.toArray();
    if (itemArr && itemArr[this.activeIndex]) {
      return itemArr[this.activeIndex].nativeElement;
    }
    return null;
  }

  private nzFormStatusService = inject(NzFormStatusService, { optional: true });
  private nzFormNoStatusService = inject(NzFormNoStatusService, { optional: true });

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.closeDropdown();
    });

    effect(() => {
      const trigger = this.trigger();
      if (trigger) {
        this.bindTriggerEvents();
        this.closeDropdown();
        this.overlayRef = null;
      }
    });
  }

  ngOnInit(): void {
    this.nzFormStatusService?.formStatusChanges
      .pipe(
        distinctUntilChanged((pre, cur) => {
          return pre.status === cur.status && pre.hasFeedback === cur.hasFeedback;
        }),
        withLatestFrom(this.nzFormNoStatusService ? this.nzFormNoStatusService.noFormStatus : observableOf(false)),
        map(([{ status, hasFeedback }, noStatus]) => ({ status: noStatus ? '' : status, hasFeedback })),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(({ status, hasFeedback }) => {
        this.setStatusStyles(status, hasFeedback);
      });
    this.dir = this.directionality.value;
    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(direction => {
      this.dir = direction;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzSuggestions, nzStatus } = changes;
    if (nzSuggestions) {
      if (this.isOpen) {
        this.previousValue = null;
        this.activeIndex = -1;
        this.resetDropdown(false);
      }
    }
    if (nzStatus) {
      this.setStatusStyles(this.nzStatus, this.hasFeedback);
    }
  }

  ngAfterViewInit(): void {
    this.items.changes
      .pipe(
        startWith(this.items),
        switchMap(() => {
          const items = this.items.toArray();
          return merge(...items.map(item => fromEventOutsideAngular<MouseEvent>(item.nativeElement, 'mousedown')));
        })
      )
      .subscribe(event => {
        event.preventDefault();
      });
  }

  closeDropdown(): void {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
      this.overlayOutsideClickSubscription.unsubscribe();
      this.isOpen = false;
      this.cdr.markForCheck();
    }
  }

  openDropdown(): void {
    this.attachOverlay();
    this.isOpen = true;
    this.cdr.markForCheck();
  }

  getMentions(): string[] {
    return this.trigger() ? getMentions(this.trigger().value!, this.nzPrefix) : [];
  }

  selectSuggestion(suggestion: string | {}): void {
    const value = this.nzValueWith(suggestion);
    this.trigger().insertMention({
      mention: value,
      startPos: this.cursorMentionStart!,
      endPos: this.cursorMentionEnd!
    });
    this.nzOnSelect.emit(suggestion);
    this.closeDropdown();
    this.activeIndex = -1;
  }

  private handleInput(event: KeyboardEvent): void {
    const target = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.trigger().onChange(target.value);
    this.trigger().value = target.value;
    this.resetDropdown();
  }

  private handleKeydown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;
    if (this.isOpen && keyCode === ENTER && this.activeIndex !== -1 && this.filteredSuggestions.length) {
      this.selectSuggestion(this.filteredSuggestions[this.activeIndex]);
      event.preventDefault();
    } else if (keyCode === LEFT_ARROW || keyCode === RIGHT_ARROW) {
      this.resetDropdown();
      event.stopPropagation();
    } else {
      if (this.isOpen && (keyCode === TAB || keyCode === ESCAPE)) {
        this.closeDropdown();
        return;
      }

      if (this.isOpen && keyCode === UP_ARROW) {
        this.setPreviousItemActive();
        event.preventDefault();
        event.stopPropagation();
      }

      if (this.isOpen && keyCode === DOWN_ARROW) {
        this.setNextItemActive();
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }

  private handleClick(): void {
    this.resetDropdown(false);
  }

  private bindTriggerEvents(): void {
    this.trigger().onInput.subscribe((e: KeyboardEvent) => this.handleInput(e));
    this.trigger().onKeydown.subscribe((e: KeyboardEvent) => this.handleKeydown(e));
    this.trigger().onClick.subscribe(() => this.handleClick());
  }

  private suggestionsFilter(value: string, emit: boolean): void {
    const suggestions = value.substring(1);
    /**
     * Should always emit (nzOnSearchChange) when value empty
     *
     * @[something]... @[empty]... @[empty]
     *     ^             ^           ^
     * preValue        preValue  (should emit)
     */
    if (this.previousValue === value && value !== this.cursorMention![0]) {
      return;
    }
    this.previousValue = value;
    if (emit) {
      this.nzOnSearchChange.emit({
        value: this.cursorMention!.substring(1),
        prefix: this.cursorMention![0]
      });
    }
    const searchValue = suggestions.toLowerCase();
    this.filteredSuggestions = this.nzSuggestions.filter(suggestion =>
      this.nzValueWith(suggestion).toLowerCase().includes(searchValue)
    );
  }

  private resetDropdown(emit: boolean = true): void {
    this.resetCursorMention();
    if (typeof this.cursorMention !== 'string' || !this.canOpen()) {
      this.closeDropdown();
      return;
    }
    this.suggestionsFilter(this.cursorMention, emit);
    const activeIndex = this.filteredSuggestions.indexOf(this.cursorMention.substring(1));
    this.activeIndex = activeIndex >= 0 ? activeIndex : 0;
    this.openDropdown();
  }

  private setNextItemActive(): void {
    this.activeIndex = this.activeIndex + 1 <= this.filteredSuggestions.length - 1 ? this.activeIndex + 1 : 0;
    this.cdr.markForCheck();
    this.scrollToFocusItem();
  }

  private setPreviousItemActive(): void {
    this.activeIndex = this.activeIndex - 1 < 0 ? this.filteredSuggestions.length - 1 : this.activeIndex - 1;
    this.cdr.markForCheck();
    this.scrollToFocusItem();
  }

  private scrollToFocusItem(): void {
    if (this.focusItemElement) {
      this.focusItemElement.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
  }

  private canOpen(): boolean {
    const element: HTMLInputElement | HTMLTextAreaElement = this.triggerNativeElement;
    return !element.readOnly && !element.disabled;
  }

  private resetCursorMention(): void {
    const value = this.triggerNativeElement.value.replace(/[\r\n]/g, NZ_MENTION_CONFIG.split) || '';
    const selectionStart = this.triggerNativeElement.selectionStart!;
    const prefix = typeof this.nzPrefix === 'string' ? [this.nzPrefix] : this.nzPrefix;
    let i = prefix.length;
    while (i >= 0) {
      const startPos = value.lastIndexOf(prefix[i], selectionStart);
      const endPos =
        value.indexOf(NZ_MENTION_CONFIG.split, selectionStart) > -1
          ? value.indexOf(NZ_MENTION_CONFIG.split, selectionStart)
          : value.length;
      const mention = value.substring(startPos, endPos);
      if (
        (startPos > 0 && value[startPos - 1] !== NZ_MENTION_CONFIG.split) ||
        startPos < 0 ||
        mention.includes(prefix[i], 1) ||
        mention.includes(NZ_MENTION_CONFIG.split)
      ) {
        this.cursorMention = null;
        this.cursorMentionStart = -1;
        this.cursorMentionEnd = -1;
      } else {
        this.cursorMention = mention;
        this.cursorMentionStart = startPos;
        this.cursorMentionEnd = endPos;
        return;
      }
      i--;
    }
  }

  private updatePositions(): void {
    const coordinates = getCaretCoordinates(this.triggerNativeElement, this.cursorMentionStart!);
    const top =
      coordinates.top -
      this.triggerNativeElement.getBoundingClientRect().height -
      this.triggerNativeElement.scrollTop +
      (this.nzPlacement === 'bottom' ? coordinates.height - 6 : -6);
    const left = coordinates.left - this.triggerNativeElement.scrollLeft;
    this.positionStrategy.withDefaultOffsetX(left).withDefaultOffsetY(top);
    if (this.nzPlacement === 'bottom') {
      this.positionStrategy.withPositions([...DEFAULT_MENTION_BOTTOM_POSITIONS]);
    }
    if (this.nzPlacement === 'top') {
      this.positionStrategy.withPositions([...DEFAULT_MENTION_TOP_POSITIONS]);
    }
    this.positionStrategy.apply();
  }

  private subscribeOverlayOutsideClick(): Subscription {
    const canCloseDropdown = (event: MouseEvent | TouchEvent): boolean => {
      const clickTarget = event.target as HTMLElement;
      return (
        this.isOpen &&
        clickTarget !== this.triggerNativeElement &&
        !this.overlayRef?.overlayElement.contains(clickTarget)
      );
    };

    const subscription = new Subscription();

    subscription.add(
      this.overlayRef!.outsidePointerEvents().subscribe(event => canCloseDropdown(event) && this.closeDropdown())
    );

    subscription.add(
      fromEventOutsideAngular<TouchEvent>(this.document, 'touchend').subscribe(
        event => canCloseDropdown(event) && this.ngZone.run(() => this.closeDropdown())
      )
    );

    return subscription;
  }

  private attachOverlay(): void {
    if (!this.overlayRef) {
      this.portal = new TemplatePortal(this.suggestionsTemp!, this.viewContainerRef);
      this.overlayRef = this.overlay.create(this.getOverlayConfig());
    }
    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.portal);
      this.overlayOutsideClickSubscription = this.subscribeOverlayOutsideClick();
    }
    this.updatePositions();
  }

  private getOverlayConfig(): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this.getOverlayPosition(),
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      disposeOnNavigation: true
    });
  }

  private getOverlayPosition(): PositionStrategy {
    const positions = [
      new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
      new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
    ];
    this.positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.trigger().elementRef)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(false);
    return this.positionStrategy;
  }

  private setStatusStyles(status: NzValidateStatus, hasFeedback: boolean): void {
    // set inner status
    this.status = status;
    this.hasFeedback = hasFeedback;
    this.cdr.markForCheck();
    // render status if nzStatus is set
    this.statusCls = getStatusClassNames(this.prefixCls, status, hasFeedback);
    Object.keys(this.statusCls).forEach(status => {
      if (this.statusCls[status]) {
        this.renderer.addClass(this.elementRef.nativeElement, status);
      } else {
        this.renderer.removeClass(this.elementRef.nativeElement, status);
      }
    });
  }
}
