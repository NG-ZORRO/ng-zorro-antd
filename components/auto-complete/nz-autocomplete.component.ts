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
  ContentChildren,
  ElementRef,
  EventEmitter,
  Host,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { defer, merge, Observable, Subscription } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

import { slideMotion, CompareWith, InputBoolean, NzDropDownPosition, NzNoAnimationDirective } from 'ng-zorro-antd/core';

import { NzAutocompleteOptionComponent, NzOptionSelectionChange } from './nz-autocomplete-option.component';

export interface AutocompleteDataSourceItem {
  value: string;
  label: string;
}

export type AutocompleteDataSource = AutocompleteDataSourceItem[] | string[] | number[];

@Component({
  selector: 'nz-autocomplete',
  exportAs: 'nzAutocomplete',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './nz-autocomplete.component.html',
  animations: [slideMotion],
  styles: [
    `
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
export class NzAutocompleteComponent implements AfterContentInit, AfterViewInit, OnDestroy {
  @Input() nzWidth: number;
  @Input() nzOverlayClassName = '';
  @Input() nzOverlayStyle: { [key: string]: string } = {};
  @Input() @InputBoolean() nzDefaultActiveFirstOption = true;
  @Input() @InputBoolean() nzBackfill = false;
  @Input() compareWith: CompareWith = (o1, o2) => o1 === o2;
  @Input() nzDataSource: AutocompleteDataSource;
  @Output() readonly selectionChange: EventEmitter<NzAutocompleteOptionComponent> = new EventEmitter<
    NzAutocompleteOptionComponent
  >();

  showPanel: boolean = true;
  isOpen: boolean = false;
  activeItem: NzAutocompleteOptionComponent;
  dropDownPosition: NzDropDownPosition = 'bottom';

  /**
   * Options accessor, its source may be content or dataSource
   */
  get options(): QueryList<NzAutocompleteOptionComponent> {
    // first dataSource
    if (this.nzDataSource) {
      return this.fromDataSourceOptions;
    } else {
      return this.fromContentOptions;
    }
  }

  /** Provided by content */
  @ContentChildren(NzAutocompleteOptionComponent, { descendants: true }) fromContentOptions: QueryList<
    NzAutocompleteOptionComponent
  >;
  /** Provided by dataSource */
  @ViewChildren(NzAutocompleteOptionComponent) fromDataSourceOptions: QueryList<NzAutocompleteOptionComponent>;

  /** cdk-overlay */
  @ViewChild(TemplateRef, { static: false }) template: TemplateRef<{}>;
  @ViewChild('panel', { static: false }) panel: ElementRef;
  @ViewChild('content', { static: false }) content: ElementRef;

  private activeItemIndex: number = -1;
  private selectionChangeSubscription = Subscription.EMPTY;
  private dataSourceChangeSubscription = Subscription.EMPTY;
  /** Options changes listener */
  readonly optionSelectionChanges: Observable<NzOptionSelectionChange> = defer(() => {
    if (this.options) {
      return merge<NzOptionSelectionChange>(...this.options.map(option => option.selectionChange));
    }
    return this.ngZone.onStable.asObservable().pipe(
      take(1),
      switchMap(() => this.optionSelectionChanges)
    );
  });

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {}

  ngAfterContentInit(): void {
    if (!this.nzDataSource) {
      this.optionsInit();
    }
  }

  ngAfterViewInit(): void {
    if (this.nzDataSource) {
      this.optionsInit();
    }
  }

  ngOnDestroy(): void {
    this.dataSourceChangeSubscription.unsubscribe();
    this.selectionChangeSubscription.unsubscribe();
  }

  setVisibility(): void {
    this.showPanel = !!this.options.length;
    this.changeDetectorRef.markForCheck();
  }

  setActiveItem(index: number): void {
    const activeItem = this.options.toArray()[index];
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

  // tslint:disable-next-line:no-any
  getOptionIndex(value: any): number {
    return this.options.reduce((result: number, current: NzAutocompleteOptionComponent, index: number) => {
      return result === -1 ? (this.compareWith(value, current.nzValue) ? index : -1) : result;
    }, -1)!;
  }

  updatePosition(position: NzDropDownPosition): void {
    this.dropDownPosition = position;
    this.changeDetectorRef.markForCheck();
  }

  private optionsInit(): void {
    this.setVisibility();
    this.subscribeOptionChanges();
    const changes = this.nzDataSource ? this.fromDataSourceOptions.changes : this.fromContentOptions.changes;
    // async
    this.dataSourceChangeSubscription = changes.subscribe(e => {
      if (!e.dirty && this.isOpen) {
        setTimeout(() => this.setVisibility());
      }
      this.subscribeOptionChanges();
    });
  }

  /**
   * Clear the status of options
   */
  clearSelectedOptions(skip?: NzAutocompleteOptionComponent | null, deselect: boolean = false): void {
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
    this.selectionChangeSubscription.unsubscribe();
    this.selectionChangeSubscription = this.optionSelectionChanges
      .pipe(filter((event: NzOptionSelectionChange) => event.isUserInput))
      .subscribe((event: NzOptionSelectionChange) => {
        event.source.select();
        event.source.setActiveStyles();
        this.activeItem = event.source;
        this.activeItemIndex = this.getOptionIndex(this.activeItem.nzValue);
        this.clearSelectedOptions(event.source, true);
        this.selectionChange.emit(event.source);
      });
  }
}
