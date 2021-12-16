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
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { warnDeprecation } from 'ng-zorro-antd/core/logger';
import { NzDestroyService } from 'ng-zorro-antd/core/services';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { NzDropDownDirective, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'filterTrigger';

@Component({
  selector: 'nz-filter-trigger',
  exportAs: `nzFilterTrigger`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  template: `
    <span
      nz-dropdown
      class="ant-table-filter-trigger"
      nzTrigger="click"
      nzPlacement="bottomRight"
      [nzBackdrop]="nzBackdrop || nzHasBackdrop"
      [nzClickHide]="false"
      [nzDropdownMenu]="nzDropdownMenu"
      [class.active]="nzActive"
      [class.ant-table-filter-open]="nzVisible"
      [nzVisible]="nzVisible"
      (nzVisibleChange)="onVisibleChange($event)"
    >
      <ng-content></ng-content>
    </span>
  `,
  providers: [NzDestroyService]
})
export class NzFilterTriggerComponent implements OnChanges, OnInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  static ngAcceptInputType_nzBackdrop: BooleanInput;
  static ngAcceptInputType_nzHasBackdrop: BooleanInput;

  @Input() nzActive = false;
  @Input() nzDropdownMenu!: NzDropdownMenuComponent;
  @Input() nzVisible = false;

  /**
   * @deprecated Not supported, use `nzBackdrop` instead.
   * @breaking-change 13.0.0
   */
  @Input() @InputBoolean() nzHasBackdrop = false;
  @Input() @WithConfig<boolean>() @InputBoolean() nzBackdrop = false;

  @Output() readonly nzVisibleChange = new EventEmitter<boolean>();

  @ViewChild(NzDropDownDirective, { static: true, read: ElementRef }) nzDropdown!: ElementRef<HTMLElement>;

  onVisibleChange(visible: boolean): void {
    this.nzVisible = visible;
    this.nzVisibleChange.next(visible);
  }

  hide(): void {
    this.nzVisible = false;
    this.cdr.markForCheck();
  }

  show(): void {
    this.nzVisible = true;
    this.cdr.markForCheck();
  }

  constructor(
    public readonly nzConfigService: NzConfigService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private destroy$: NzDestroyService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { nzHasBackdrop } = changes;
    if (nzHasBackdrop) {
      warnDeprecation(
        '`nzHasBackdrop` in nz-filter-trigger component will be removed in 13.0.0, please use `nzBackdrop` instead.'
      );
    }
  }

  ngOnInit(): void {
    this.ngZone.runOutsideAngular(() => {
      fromEvent(this.nzDropdown.nativeElement, 'click')
        .pipe(takeUntil(this.destroy$))
        .subscribe(event => {
          event.stopPropagation();
        });
    });
  }
}
