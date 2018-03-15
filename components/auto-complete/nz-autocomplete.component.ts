import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input, NgZone,
  Output,
  QueryList,
  TemplateRef,
  ViewChild, ViewChildren
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { defer } from 'rxjs/observable/defer';
import { merge } from 'rxjs/observable/merge';
import { filter } from 'rxjs/operators/filter';
import { switchMap } from 'rxjs/operators/switchMap';
import { take } from 'rxjs/operators/take';

import { toBoolean } from '../core/util/convert';

import { dropDownAnimation } from '../core/animation/dropdown-animations';
import { NzAutocompleteOptionComponent, NzOptionSelectionChange } from './nz-autocomplete-option.component';

export interface AutocompleteDataSourceItem {
  value: string;
  label: string;
}

export type AutocompleteDataSource = AutocompleteDataSourceItem[] | string[] | number[];

@Component({
  selector           : 'nz-autocomplete',
  preserveWhitespaces: false,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  animations         : [
    dropDownAnimation
  ],
  template           : `
    <ng-template>
      <div class="ant-select-dropdown ant-select-dropdown--single ant-select-dropdown-placement-bottomLeft"
        #panel
        [@dropDownAnimation]="dropDownPosition"
        [class.ant-select-dropdown-hidden]="!showPanel">
        <div style="overflow: auto;">
          <ul class="ant-select-dropdown-menu  ant-select-dropdown-menu-root ant-select-dropdown-menu-vertical"
            role="menu"
            aria-activedescendant>
            <ng-template *ngTemplateOutlet="nzDataSource ? optionsTemplate : contentTemplate"></ng-template>
          </ul>
        </div>
      </div>
      <ng-template #contentTemplate>
        <ng-content></ng-content>
      </ng-template>
      <ng-template #optionsTemplate>
        <nz-auto-option *ngFor="let option of nzDataSource" [nzValue]="option">{{option}}</nz-auto-option>
      </ng-template>
    </ng-template>
  `,
  styles             : [
      `
      :host {
        position: relative;
        display: inline-block;
      }

      .ant-select-dropdown {
        top: 100%;
        left: 0;
        position: relative;
        width: 100%;
        margin-top: 4px;
        margin-bottom: 4px;
      }
    `
  ]
})
export class NzAutocompleteComponent implements AfterViewInit {
  private activeItemIndex: number = -1;
  private selectionChangeSubscription: Subscription;

  showPanel: boolean = false;
  isOpen: boolean = false;
  activeItem: NzAutocompleteOptionComponent;
  dropDownPosition: 'top' | 'center' | 'bottom' = 'bottom';

  /** 组件支持设置 dataSource 和 content 设置 options
   *  这个属性为其提供方便的访问方式 */
  get options(): QueryList<NzAutocompleteOptionComponent> {
    // 优先使用 dataSource
    if (this.nzDataSource) {
      return this.fromDataSourceOptions;
    } else {
      return this.fromContentOptions;
    }
  }

  /** 提供给 cdk-overlay 用于渲染 */
  @ViewChild(TemplateRef) template: TemplateRef<{}>;

  @ViewChild('panel') panel: ElementRef;
  @ViewChild('content') content: ElementRef;

  /** 由 Content 提供 options */
  @ContentChildren(NzAutocompleteOptionComponent, { descendants: true }) fromContentOptions: QueryList<NzAutocompleteOptionComponent>;

  /** 由 nzDataSource 提供 options */
  @ViewChildren(NzAutocompleteOptionComponent) fromDataSourceOptions: QueryList<NzAutocompleteOptionComponent>;

  /** 自定义宽度单位 px */
  @Input() nzWidth: number | void;

  /** 是否默认高亮第一个选项，默认 `true` */
  @Input()
  get nzDefaultActiveFirstOption(): boolean {
    return this._defaultActiveFirstOption;
  }

  set nzDefaultActiveFirstOption(value: boolean) {
    this._defaultActiveFirstOption = toBoolean(value);
  }

  _defaultActiveFirstOption: boolean = true;

  /** 使用键盘选择选项的时候把选中项回填到输入框中，默认 `false` */
  @Input()
  get nzBackfill(): boolean {
    return this._backfill;
  }

  set nzBackfill(value: boolean) {
    this._backfill = toBoolean(value);
  }

  _backfill: boolean = false;

  /** 自动完成的数据源 */
  @Input()
  get nzDataSource(): AutocompleteDataSource {
    return this._dataSource;
  }

  set nzDataSource(value: AutocompleteDataSource) {
    this._dataSource = value;
  }

  _dataSource: AutocompleteDataSource;

  /** 选择时发出的事件 */
  @Output() selectionChange: EventEmitter<NzAutocompleteOptionComponent> = new EventEmitter<NzAutocompleteOptionComponent>();

  /** 用于组件内部监听 options 的选择变化 */
  readonly optionSelectionChanges: Observable<NzOptionSelectionChange> = defer(() => {
    if (this.options) {
      return merge(...this.options.map(option => option.selectionChange));
    }
    return this._ngZone.onStable
    .asObservable()
    .pipe(take(1), switchMap(() => this.optionSelectionChanges));
  });

  constructor(private changeDetectorRef: ChangeDetectorRef, private _ngZone: NgZone) {
  }

  ngAfterViewInit(): void {
    this.optionsInit();
  }

  setVisibility(): void {
    this.showPanel = !!this.options.length;
    this.changeDetectorRef.markForCheck();
  }

  setActiveItem(index: number): void {
    const activeItem = this.options.toArray()[ index ];
    if (activeItem && !activeItem.active) {
      this.activeItem = activeItem;
      this.activeItemIndex = index;
      this.clearSelectedOptions(this.activeItem);
      this.activeItem.setActiveStyles();
      this.changeDetectorRef.markForCheck();
    }
  }

  setNextItemActive(): void {
    const nextIndex = this.activeItemIndex + 1 <= this.options.length - 1 ? this.activeItemIndex + 1 : 0;
    this.setActiveItem(nextIndex);
  }

  setPreviousItemActive(): void {
    const previousIndex = this.activeItemIndex - 1 < 0 ? this.options.length - 1 : this.activeItemIndex - 1;
    this.setActiveItem(previousIndex);
  }

  getOptionIndex(option: NzAutocompleteOptionComponent): number | undefined {
    return this.options.reduce((result: number, current: NzAutocompleteOptionComponent, index: number) => {
      return result === undefined ? (option === current ? index : undefined) : result;
    }, undefined);
  }

  private optionsInit(): void {
    this.setVisibility();
    this.subscribeOptionChanges();
    const changes = this.nzDataSource ? this.fromDataSourceOptions.changes : this.fromContentOptions.changes;

    // 用于处理动态/异步的 options
    changes.subscribe(e => {
      if (!e.dirty && this.isOpen) {
        setTimeout(_ => this.setVisibility());
      }
      this.subscribeOptionChanges();
    });
  }

  /**
   * 清除 Options 的激活状态
   * @param {NzAutocompleteOptionComponent} skip
   * @param {boolean} deselect
   */
  private clearSelectedOptions(skip?: NzAutocompleteOptionComponent, deselect: boolean = false): void {
    this.options.forEach(option => {
      if (option !== skip) {
        if (deselect) {
          option.deselect();
        }
        option.setInactiveStyles();
      }
    });
  }

  private subscribeOptionChanges(): void {
    this.selectionChangeSubscription = this.optionSelectionChanges
    .pipe(filter((event: NzOptionSelectionChange) => event.isUserInput))
    .subscribe((event: NzOptionSelectionChange) => {
      event.source.select();
      event.source.setActiveStyles();
      this.activeItem = event.source;
      this.activeItemIndex = this.getOptionIndex(this.activeItem);
      this.clearSelectedOptions(event.source, true);
      this.selectionChange.emit(event.source);
    });
  }
}
