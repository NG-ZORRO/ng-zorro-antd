import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  HostBinding,
  Input,
  QueryList,
  TemplateRef
} from '@angular/core';
import { toBoolean } from '../core/util/convert';
import { trimWhiteSpace } from '../core/util/trim-whitespace';

import { NzInputDirective } from './nz-input.directive';
// tslint:disable-next-line:no-any
export type TInputGroupIconClass = string | string[] | Set<string> | { [klass: string]: any; };
export type NzInputGroupSizeType = 'large' | 'default' | 'small';

@Component({
  selector           : 'nz-input-group',
  preserveWhitespaces: false,
  template           : `
    <span class="ant-input-wrapper ant-input-group" *ngIf="isAddOn">
      <span class="ant-input-group-addon" *ngIf="nzAddOnBefore || nzAddOnBeforeIcon">
        <i [ngClass]="nzAddOnBeforeIcon" *ngIf="nzAddOnBeforeIcon"></i>
        <ng-container *ngIf="isAddOnBeforeString; else addOnBeforeTemplate">{{ nzAddOnBefore }}</ng-container>
        <ng-template #addOnBeforeTemplate>
          <ng-template [ngTemplateOutlet]="nzAddOnBefore"></ng-template>
        </ng-template>
      </span>
      <ng-template *ngTemplateOutlet="contentTemplate"></ng-template>
      <span class="ant-input-group-addon" *ngIf="nzAddOnAfter || nzAddOnAfterIcon">
        <i [ngClass]="nzAddOnAfterIcon" *ngIf="nzAddOnAfterIcon"></i>
        <ng-container *ngIf="isAddOnAfterString; else addOnAfterTemplate">{{ nzAddOnAfter }}</ng-container>
        <ng-template #addOnAfterTemplate>
          <ng-template [ngTemplateOutlet]="nzAddOnAfter"></ng-template>
        </ng-template>
      </span>
    </span>
    <ng-template [ngIf]="isAffix">
      <span class="ant-input-prefix" *ngIf="nzPrefix || nzPrefixIcon">
        <i [ngClass]="nzPrefixIcon" *ngIf="nzPrefixIcon"></i>
        <ng-container *ngIf="isPrefixString; else prefixTemplate">{{ nzPrefix }}</ng-container>
        <ng-template #prefixTemplate>
          <ng-template [ngTemplateOutlet]="nzPrefix"></ng-template>
        </ng-template>
      </span>
      <ng-template *ngTemplateOutlet="contentTemplate"></ng-template>
      <span class="ant-input-suffix" *ngIf="nzSuffix || nzSuffixIcon">
        <i [ngClass]="nzSuffixIcon" *ngIf="nzSuffixIcon"></i>
        <ng-container *ngIf="isSuffixString; else suffixTemplate">{{ nzSuffix }}</ng-container>
        <ng-template #suffixTemplate>
          <ng-template [ngTemplateOutlet]="nzSuffix"></ng-template>
        </ng-template>
      </span>
    </ng-template>
    <ng-template [ngIf]="isGroup" *ngTemplateOutlet="contentTemplate"></ng-template>
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `
})

export class NzInputGroupComponent implements AfterViewInit, AfterContentInit {
  private _addOnBefore: string | TemplateRef<void> = '';
  private _addOnAfter: string | TemplateRef<void> = '';
  private _prefix: string | TemplateRef<void> = '';
  private _suffix: string | TemplateRef<void> = '';
  private _size: NzInputGroupSizeType = 'default';
  private _compact = false;
  private _search = false;
  private isAddOnBeforeString: boolean;
  private isAddOnAfterString: boolean;
  private isPrefixString: boolean;
  private isSuffixString: boolean;
  @ContentChildren(NzInputDirective) nzInputDirectiveQueryList: QueryList<NzInputDirective>;
  @Input() nzAddOnBeforeIcon: TInputGroupIconClass;
  @Input() nzAddOnAfterIcon: TInputGroupIconClass;
  @Input() nzPrefixIcon: TInputGroupIconClass;
  @Input() nzSuffixIcon: TInputGroupIconClass;

  @Input() set nzSize(value: NzInputGroupSizeType) {
    this._size = value;
    this.updateChildrenInputSize();
  }

  get nzSize(): NzInputGroupSizeType {
    return this._size;
  }

  @Input()
  @HostBinding(`class.ant-input-group-compact`)
  set nzCompact(value: boolean) {
    this._compact = toBoolean(value);
  }

  get nzCompact(): boolean {
    return this._compact;
  }

  @Input()
  set nzAddOnBefore(value: string | TemplateRef<void>) {
    this.isAddOnBeforeString = !(value instanceof TemplateRef);
    this._addOnBefore = value;
  }

  get nzAddOnBefore(): string | TemplateRef<void> {
    return this._addOnBefore;
  }

  @Input()
  set nzAddOnAfter(value: string | TemplateRef<void>) {
    this.isAddOnAfterString = !(value instanceof TemplateRef);
    this._addOnAfter = value;
  }

  get nzAddOnAfter(): string | TemplateRef<void> {
    return this._addOnAfter;
  }

  @Input()
  set nzPrefix(value: string | TemplateRef<void>) {
    this.isPrefixString = !(value instanceof TemplateRef);
    this._prefix = value;
  }

  get nzPrefix(): string | TemplateRef<void> {
    return this._prefix;
  }

  @Input()
  set nzSuffix(value: string | TemplateRef<void>) {
    this.isSuffixString = !(value instanceof TemplateRef);
    this._suffix = value;
  }

  get nzSuffix(): string | TemplateRef<void> {
    return this._suffix;
  }

  @Input()
  @HostBinding(`class.ant-input-search-enter-button`)
  @HostBinding(`class.ant-input-search`)
  set nzSearch(value: boolean) {
    this._search = toBoolean(value);
  }

  get nzSearch(): boolean {
    return this._search;
  }

  get isLarge(): boolean {
    return this.nzSize === 'large';
  }

  get isSmall(): boolean {
    return this.nzSize === 'small';
  }

  @HostBinding('class.ant-input-affix-wrapper')
  get isAffix(): boolean {
    return !!(this.nzSuffix || this.nzPrefix || this.nzPrefixIcon || this.nzSuffixIcon);
  }

  @HostBinding('class.ant-input-group-wrapper')
  get isAddOn(): boolean {
    return !!(this.nzAddOnAfter || this.nzAddOnBefore || this.nzAddOnAfterIcon || this.nzAddOnBeforeIcon);
  }

  @HostBinding('class.ant-input-group')
  get isGroup(): boolean {
    return (!this.isAffix) && (!this.isAddOn);
  }

  @HostBinding(`class.ant-input-group-lg`)
  get isLargeGroup(): boolean {
    return this.isGroup && this.isLarge;
  }

  @HostBinding(`class.ant-input-group-wrapper-lg`)
  get isLargeGroupWrapper(): boolean {
    return this.isAddOn && this.isLarge;
  }

  @HostBinding(`class.ant-input-affix-wrapper-lg`)
  get isLargeAffix(): boolean {
    return this.isAffix && this.isLarge;
  }

  @HostBinding(`class.ant-input-search-lg`)
  get isLargeSearch(): boolean {
    return this.nzSearch && this.isLarge;
  }

  @HostBinding(`class.ant-input-group-sm`)
  get isSmallGroup(): boolean {
    return this.isGroup && this.isSmall;
  }

  @HostBinding(`class.ant-input-affix-wrapper-sm`)
  get isSmallAffix(): boolean {
    return this.isAffix && this.isSmall;
  }

  @HostBinding(`class.ant-input-group-wrapper-sm`)
  get isSmallGroupWrapper(): boolean {
    return this.isAddOn && this.isSmall;
  }

  @HostBinding(`class.ant-input-search-sm`)
  get isSmallSearch(): boolean {
    return this.nzSearch && this.isSmall;
  }

  updateChildrenInputSize(): void {
    if (this.nzInputDirectiveQueryList) {
      this.nzInputDirectiveQueryList.forEach(item => item.nzSize = this.nzSize);
    }
  }

  constructor(private el: ElementRef) {

  }

  ngAfterContentInit(): void {
    this.updateChildrenInputSize();
  }

  ngAfterViewInit(): void {
    /** trim text node between button */
    trimWhiteSpace(this.el.nativeElement);
  }
}
