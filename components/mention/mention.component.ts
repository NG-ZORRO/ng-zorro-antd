/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

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

import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { DEFAULT_MENTION_BOTTOM_POSITIONS, DEFAULT_MENTION_TOP_POSITIONS } from 'ng-zorro-antd/core/overlay';
import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { getCaretCoordinates, getMentions, InputBoolean } from 'ng-zorro-antd/core/util';

import { fromEvent, merge, Subscription } from 'rxjs';
import { NzMentionSuggestionDirective } from './mention-suggestions';
import { NzMentionTriggerDirective } from './mention-trigger';
import { NzMentionService } from './mention.service';

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
      <ul class="ant-mention-dropdown">
        <li
          class="ant-mention-dropdown-item"
          *ngFor="let suggestion of filteredSuggestions; let i = index"
          [class.focus]="i === activeIndex"
          (mousedown)="$event.preventDefault()"
          (click)="selectSuggestion(suggestion)"
        >
          <ng-container *ngIf="suggestionTemplate; else defaultSuggestion">
            <ng-container *ngTemplateOutlet="suggestionTemplate; context: { $implicit: suggestion }"></ng-container>
          </ng-container>
          <ng-template #defaultSuggestion>{{ nzValueWith(suggestion) }}</ng-template>
        </li>
        <li class="ant-mention-dropdown-notfound ant-mention-dropdown-item" *ngIf="filteredSuggestions.length === 0">
          <span *ngIf="nzLoading"><i nz-icon nzType="loading"></i></span>
          <span *ngIf="!nzLoading">{{ nzNotFoundContent }}</span>
        </li>
      </ul>
    </ng-template>
  `,
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NzMentionService]
})
export class NzMentionComponent implements OnDestroy, OnInit, OnChanges {
  static ngAcceptInputType_nzLoading: BooleanInput;

  @Input() nzValueWith: (value: NzSafeAny) => string = value => value;
  @Input() nzPrefix: string | string[] = '@';
  @Input() @InputBoolean() nzLoading = false;
  @Input() nzNotFoundContent: string = '无匹配结果，轻敲空格完成输入';
  @Input() nzPlacement: MentionPlacement = 'bottom';
  @Input() nzSuggestions: NzSafeAny[] = [];
  @Output() readonly nzOnSelect: EventEmitter<NzSafeAny> = new EventEmitter();
  @Output() readonly nzOnSearchChange: EventEmitter<MentionOnSearchTypes> = new EventEmitter();

  trigger!: NzMentionTriggerDirective;
  @ViewChild(TemplateRef, { static: false }) suggestionsTemp?: TemplateRef<void>;

  @ContentChild(NzMentionSuggestionDirective, { static: false, read: TemplateRef })
  set suggestionChild(value: TemplateRef<{ $implicit: NzSafeAny }>) {
    if (value) {
      this.suggestionTemplate = value;
    }
  }

  isOpen = false;
  filteredSuggestions: string[] = [];
  suggestionTemplate: TemplateRef<{ $implicit: NzSafeAny }> | null = null;
  activeIndex = -1;

  private previousValue: string | null = null;
  private cursorMention: string | null = null;
  private cursorMentionStart?: number;
  private cursorMentionEnd?: number;
  private overlayRef: OverlayRef | null = null;
  private portal?: TemplatePortal<void>;
  private positionStrategy!: FlexibleConnectedPositionStrategy;
  private overlayBackdropClickSubscription!: Subscription;

  private get triggerNativeElement(): HTMLTextAreaElement | HTMLInputElement {
    return this.trigger.el.nativeElement;
  }

  constructor(
    @Optional() @Inject(DOCUMENT) private ngDocument: NzSafeAny,
    private cdr: ChangeDetectorRef,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef,
    private nzMentionService: NzMentionService
  ) {}

  ngOnInit(): void {
    this.nzMentionService.triggerChanged().subscribe(trigger => {
      this.trigger = trigger;
      this.bindTriggerEvents();
      this.closeDropdown();
      this.overlayRef = null;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('nzSuggestions')) {
      if (this.isOpen) {
        this.previousValue = null;
        this.activeIndex = -1;
        this.resetDropdown(false);
      }
    }
  }

  ngOnDestroy(): void {
    this.closeDropdown();
  }

  closeDropdown(): void {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
      this.overlayBackdropClickSubscription.unsubscribe();
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
    return this.trigger ? getMentions(this.trigger.value!, this.nzPrefix) : [];
  }

  selectSuggestion(suggestion: string | {}): void {
    const value = this.nzValueWith(suggestion);
    this.trigger.insertMention({
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
    this.trigger.onChange(target.value);
    this.trigger.value = target.value;
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
    this.resetDropdown();
  }

  private bindTriggerEvents(): void {
    this.trigger.onInput.subscribe((e: KeyboardEvent) => this.handleInput(e));
    this.trigger.onKeydown.subscribe((e: KeyboardEvent) => this.handleKeydown(e));
    this.trigger.onClick.subscribe(() => this.handleClick());
  }

  private suggestionsFilter(value: string, emit: boolean): void {
    const suggestions = value.substring(1);
    if (this.previousValue === value) {
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
    this.filteredSuggestions = this.nzSuggestions.filter(suggestion => this.nzValueWith(suggestion).toLowerCase().includes(searchValue));
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
  }

  private setPreviousItemActive(): void {
    this.activeIndex = this.activeIndex - 1 < 0 ? this.filteredSuggestions.length - 1 : this.activeIndex - 1;
    this.cdr.markForCheck();
  }

  private canOpen(): boolean {
    const element: HTMLInputElement | HTMLTextAreaElement = this.triggerNativeElement;
    return !element.readOnly && !element.disabled;
  }

  private resetCursorMention(): void {
    const value = this.triggerNativeElement.value.replace(/[\r\n]/g, ' ') || '';
    const selectionStart = this.triggerNativeElement.selectionStart!;
    const prefix = typeof this.nzPrefix === 'string' ? [this.nzPrefix] : this.nzPrefix;
    let i = prefix.length;
    while (i >= 0) {
      const startPos = value.lastIndexOf(prefix[i], selectionStart);
      const endPos = value.indexOf(' ', selectionStart) > -1 ? value.indexOf(' ', selectionStart) : value.length;
      const mention = value.substring(startPos, endPos);
      if ((startPos > 0 && value[startPos - 1] !== ' ') || startPos < 0 || mention.includes(prefix[i], 1) || mention.includes(' ')) {
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

  private subscribeOverlayBackdropClick(): Subscription {
    return merge<MouseEvent | TouchEvent>(
      fromEvent<MouseEvent>(this.ngDocument, 'click'),
      fromEvent<TouchEvent>(this.ngDocument, 'touchend')
    ).subscribe((event: MouseEvent | TouchEvent) => {
      const clickTarget = event.target as HTMLElement;
      if (
        this.isOpen &&
        clickTarget !== this.trigger.el.nativeElement &&
        !!this.overlayRef &&
        !this.overlayRef.overlayElement.contains(clickTarget)
      ) {
        this.closeDropdown();
      }
    });
  }

  private attachOverlay(): void {
    if (!this.overlayRef) {
      this.portal = new TemplatePortal(this.suggestionsTemp!, this.viewContainerRef);
      this.overlayRef = this.overlay.create(this.getOverlayConfig());
    }
    if (this.overlayRef && !this.overlayRef.hasAttached()) {
      this.overlayRef.attach(this.portal);
      this.overlayBackdropClickSubscription = this.subscribeOverlayBackdropClick();
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
      .flexibleConnectedTo(this.trigger.el)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(false);
    return this.positionStrategy;
  }
}
