/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { BooleanInput, NzSafeAny } from 'ng-zorro-antd/core/types';
import { InputBoolean, scrollIntoView } from 'ng-zorro-antd/core/util';

import { NzAutocompleteOptgroupComponent } from './autocomplete-optgroup.component';

export class NzOptionSelectionChange {
  constructor(public source: NzAutocompleteOptionComponent, public isUserInput: boolean = false) {}
}

@Component({
  selector: 'nz-auto-option',
  exportAs: 'nzAutoOption',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <div class="ant-select-item-option-content">
      <ng-content></ng-content>
    </div>
  `,
  host: {
    role: 'menuitem',
    class: 'ant-select-item ant-select-item-option',
    '[class.ant-select-item-option-grouped]': 'nzAutocompleteOptgroupComponent',
    '[class.ant-select-item-option-selected]': 'selected',
    '[class.ant-select-item-option-active]': 'active',
    '[class.ant-select-item-option-disabled]': 'nzDisabled',
    '[attr.aria-selected]': 'selected.toString()',
    '[attr.aria-disabled]': 'nzDisabled.toString()',
    '(click)': 'selectViaInteraction()'
  }
})
export class NzAutocompleteOptionComponent implements OnInit, OnDestroy {
  static ngAcceptInputType_nzDisabled: BooleanInput;

  @Input() nzValue: NzSafeAny;
  @Input() nzLabel?: string;
  @Input() @InputBoolean() nzDisabled = false;
  @Output() readonly selectionChange = new EventEmitter<NzOptionSelectionChange>();
  @Output() readonly mouseEntered = new EventEmitter<NzAutocompleteOptionComponent>();

  active = false;
  selected = false;

  private destroy$ = new Subject<void>();

  constructor(
    private ngZone: NgZone,
    private changeDetectorRef: ChangeDetectorRef,
    private element: ElementRef<HTMLElement>,
    @Optional()
    public nzAutocompleteOptgroupComponent: NzAutocompleteOptgroupComponent
  ) {}

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.element.nativeElement, 'mouseenter')
        .pipe(
          filter(() => this.mouseEntered.observers.length > 0),
          takeUntil(this.destroy$)
        )
        .subscribe(() => {
          this.ngZone.run(() => this.mouseEntered.emit(this));
        });

      fromEvent(this.element.nativeElement, 'mousedown')
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => event.preventDefault());
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  select(emit: boolean = true): void {
    this.selected = true;
    this.changeDetectorRef.markForCheck();
    if (emit) {
      this.emitSelectionChangeEvent();
    }
  }

  deselect(): void {
    this.selected = false;
    this.changeDetectorRef.markForCheck();
    this.emitSelectionChangeEvent();
  }

  /** Git display label */
  getLabel(): string {
    return this.nzLabel || this.nzValue.toString();
  }

  /** Set active (only styles) */
  setActiveStyles(): void {
    if (!this.active) {
      this.active = true;
      this.changeDetectorRef.markForCheck();
    }
  }

  /** Unset active (only styles) */
  setInactiveStyles(): void {
    if (this.active) {
      this.active = false;
      this.changeDetectorRef.markForCheck();
    }
  }

  scrollIntoViewIfNeeded(): void {
    scrollIntoView(this.element.nativeElement);
  }

  selectViaInteraction(): void {
    if (!this.nzDisabled) {
      this.selected = !this.selected;
      if (this.selected) {
        this.setActiveStyles();
      } else {
        this.setInactiveStyles();
      }
      this.emitSelectionChangeEvent(true);
      this.changeDetectorRef.markForCheck();
    }
  }

  private emitSelectionChangeEvent(isUserInput: boolean = false): void {
    this.selectionChange.emit(new NzOptionSelectionChange(this, isUserInput));
  }
}
