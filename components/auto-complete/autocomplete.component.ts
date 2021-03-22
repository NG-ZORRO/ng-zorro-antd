/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AnimationEvent } from '@angular/animations';
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
  OnInit,
  Optional,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { slideMotion } from 'ng-zorro-antd/core/animation';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { BooleanInput, CompareWith, NzSafeAny } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { defer, merge, Observable, Subject, Subscription } from 'rxjs';
import { filter, switchMap, take, takeUntil } from 'rxjs/operators';

import { Direction, Directionality } from '@angular/cdk/bidi';
import { NzAutocompleteOptionComponent, NzOptionSelectionChange } from './autocomplete-option.component';

export interface AutocompleteDataSourceItem {
  value: string;
  label: string;
}

export type AutocompleteDataSource = Array<AutocompleteDataSourceItem | string | number>;

@Component({
  selector: 'nz-autocomplete',
  exportAs: 'nzAutocomplete',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template>
      <div
        #panel
        class="ant-select-dropdown ant-select-dropdown-placement-bottomLeft"
        [class.ant-select-dropdown-hidden]="!showPanel"
        [class.ant-select-dropdown-rtl]="dir === 'rtl'"
        [ngClass]="nzOverlayClassName"
        [ngStyle]="nzOverlayStyle"
        [nzNoAnimation]="noAnimation?.nzNoAnimation"
        @slideMotion
        (@slideMotion.done)="onAnimationEvent($event)"
        [@.disabled]="noAnimation?.nzNoAnimation"
      >
        <div style="max-height: 256px; overflow-y: auto; overflow-anchor: none;">
          <div style="display: flex; flex-direction: column;">
            <ng-template *ngTemplateOutlet="nzDataSource ? optionsTemplate : contentTemplate"></ng-template>
          </div>
        </div>
      </div>
      <ng-template #contentTemplate>
        <ng-content></ng-content>
      </ng-template>
      <ng-template #optionsTemplate>
        <nz-auto-option
          *ngFor="let option of nzDataSource!"
          [nzValue]="option"
          [nzLabel]="option && $any(option).label ? $any(option).label : $any(option)"
        >
          {{ option && $any(option).label ? $any(option).label : $any(option) }}
        </nz-auto-option>
      </ng-template>
    </ng-template>
  `,
  animations: [slideMotion]
})
export class NzAutocompleteComponent implements AfterContentInit, AfterViewInit, OnDestroy, OnInit {
  static ngAcceptInputType_nzDefaultActiveFirstOption: BooleanInput;
  static ngAcceptInputType_nzBackfill: BooleanInput;

  @Input() nzWidth?: number;
  @Input() nzOverlayClassName = '';
  @Input() nzOverlayStyle: { [key: string]: string } = {};
  @Input() @InputBoolean() nzDefaultActiveFirstOption = true;
  @Input() @InputBoolean() nzBackfill = false;
  @Input() compareWith: CompareWith = (o1, o2) => o1 === o2;
  @Input() nzDataSource?: AutocompleteDataSource;
  @Output()
  readonly selectionChange: EventEmitter<NzAutocompleteOptionComponent> = new EventEmitter<NzAutocompleteOptionComponent>();

  showPanel: boolean = true;
  isOpen: boolean = false;
  activeItem!: NzAutocompleteOptionComponent;
  dir: Direction = 'ltr';
  private destroy$ = new Subject<void>();
  animationStateChange = new EventEmitter<AnimationEvent>();

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
  @ContentChildren(NzAutocompleteOptionComponent, { descendants: true })
  fromContentOptions!: QueryList<NzAutocompleteOptionComponent>;
  /** Provided by dataSource */
  @ViewChildren(NzAutocompleteOptionComponent) fromDataSourceOptions!: QueryList<NzAutocompleteOptionComponent>;

  /** cdk-overlay */
  @ViewChild(TemplateRef, { static: false }) template?: TemplateRef<{}>;
  @ViewChild('panel', { static: false }) panel?: ElementRef;
  @ViewChild('content', { static: false }) content?: ElementRef;

  private activeItemIndex: number = -1;
  private selectionChangeSubscription = Subscription.EMPTY;
  private optionMouseEnterSubscription = Subscription.EMPTY;
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
  readonly optionMouseEnter: Observable<NzAutocompleteOptionComponent> = defer(() => {
    if (this.options) {
      return merge<NzAutocompleteOptionComponent>(...this.options.map(option => option.mouseEntered));
    }
    return this.ngZone.onStable.asObservable().pipe(
      take(1),
      switchMap(() => this.optionMouseEnter)
    );
  });

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    @Optional() private directionality: Directionality,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {}
  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.changeDetectorRef.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  onAnimationEvent(event: AnimationEvent): void {
    this.animationStateChange.emit(event);
  }

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
    this.optionMouseEnterSubscription.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
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

  getOptionIndex(value: NzSafeAny): number {
    return this.options.reduce((result: number, current: NzAutocompleteOptionComponent, index: number) => {
      return result === -1 ? (this.compareWith(value, current.nzValue) ? index : -1) : result;
    }, -1)!;
  }

  getOption(value: NzSafeAny): NzAutocompleteOptionComponent | null {
    return this.options.find(item => this.compareWith(value, item.nzValue)) || null;
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

    this.optionMouseEnterSubscription.unsubscribe();
    this.optionMouseEnterSubscription = this.optionMouseEnter.subscribe((event: NzAutocompleteOptionComponent) => {
      event.setActiveStyles();
      this.activeItem = event;
      this.activeItemIndex = this.getOptionIndex(this.activeItem.nzValue);
      this.clearSelectedOptions(event);
    });
  }
}
