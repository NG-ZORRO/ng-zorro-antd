import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  Input, NgZone, OnDestroy,
  Output,
  QueryList,
  TemplateRef,
  ViewChild, ViewChildren, ViewEncapsulation
} from '@angular/core';
import { defer, merge, Observable, Subscription } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

import { slideMotion } from '../core/animation/slide';
import { NzDropDownPosition } from '../core/types/drop-down-position';
import { InputBoolean } from '../core/util/convert';
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
  encapsulation      : ViewEncapsulation.None,
  templateUrl        : './nz-autocomplete.component.html',
  animations         : [
    slideMotion
  ],
  styles             : [
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
export class NzAutocompleteComponent implements AfterViewInit, OnDestroy {

  @Input() nzWidth: number;
  @Input() nzOverlayClassName = '';
  @Input() nzOverlayStyle: { [ key: string ]: string } = {};
  @Input() @InputBoolean() nzDefaultActiveFirstOption = true;
  @Input() @InputBoolean() nzBackfill = false;
  @Input() nzDataSource: AutocompleteDataSource;
  @Output() readonly selectionChange: EventEmitter<NzAutocompleteOptionComponent> = new EventEmitter<NzAutocompleteOptionComponent>();

  showPanel: boolean = false;
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
  @ContentChildren(NzAutocompleteOptionComponent, { descendants: true }) fromContentOptions: QueryList<NzAutocompleteOptionComponent>;
  /** Provided by dataSource */
  @ViewChildren(NzAutocompleteOptionComponent) fromDataSourceOptions: QueryList<NzAutocompleteOptionComponent>;

  /** cdk-overlay */
  @ViewChild(TemplateRef) template: TemplateRef<{}>;
  @ViewChild('panel') panel: ElementRef;
  @ViewChild('content') content: ElementRef;

  private activeItemIndex: number = -1;
  private selectionChangeSubscription = Subscription.EMPTY;
  private dataSourceChangeSubscription = Subscription.EMPTY;
  /** Options changes listener */
  readonly optionSelectionChanges: Observable<NzOptionSelectionChange> = defer(() => {
    if (this.options) {
      return merge(...this.options.map(option => option.selectionChange));
    }
    return this.ngZone.onStable
    .asObservable()
    .pipe(take(1), switchMap(() => this.optionSelectionChanges));
  });

  constructor(private changeDetectorRef: ChangeDetectorRef, private ngZone: NgZone) {
  }

  ngAfterViewInit(): void {
    this.optionsInit();
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
    this.selectionChangeSubscription.unsubscribe();
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
