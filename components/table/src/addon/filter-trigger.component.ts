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
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
  booleanAttribute,
  DestroyRef,
  inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';
import { NzDropdownDirective, NzDropdownModule, NzDropdownMenuComponent } from 'ng-zorro-antd/dropdown';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'filterTrigger';

@Component({
  selector: 'nz-filter-trigger',
  exportAs: `nzFilterTrigger`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    <span
      nz-dropdown
      class="ant-table-filter-trigger"
      nzTrigger="click"
      nzPlacement="bottomRight"
      [nzBackdrop]="nzBackdrop"
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
  imports: [NzDropdownModule]
})
export class NzFilterTriggerComponent implements OnInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  public readonly nzConfigService = inject(NzConfigService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly destroyRef = inject(DestroyRef);

  @Input() nzActive = false;
  @Input() nzDropdownMenu!: NzDropdownMenuComponent;
  @Input() nzVisible = false;

  @Input({ transform: booleanAttribute }) @WithConfig() nzBackdrop = false;

  @Output() readonly nzVisibleChange = new EventEmitter<boolean>();

  @ViewChild(NzDropdownDirective, { static: true, read: ElementRef }) nzDropdown!: ElementRef<HTMLElement>;

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

  ngOnInit(): void {
    fromEventOutsideAngular(this.nzDropdown.nativeElement, 'click')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => event.stopPropagation());
  }
}
