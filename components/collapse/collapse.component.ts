/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  ViewEncapsulation
} from '@angular/core';

import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzCollapsePanelComponent } from './collapse-panel.component';

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'collapse';

@Component({
  selector: 'nz-collapse',
  exportAs: 'nzCollapse',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: ` <ng-content></ng-content> `,
  host: {
    '[class.ant-collapse-icon-position-left]': `nzExpandIconPosition === 'left'`,
    '[class.ant-collapse-icon-position-right]': `nzExpandIconPosition === 'right'`,
    '[class.ant-collapse-ghost]': `nzGhost`,
    '[class.ant-collapse-borderless]': '!nzBordered',
    '[class.ant-collapse-rtl]': "dir === 'rtl'"
  }
})
export class NzCollapseComponent implements OnDestroy, OnInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;
  static ngAcceptInputType_nzAccordion: BooleanInput;
  static ngAcceptInputType_nzBordered: BooleanInput;
  static ngAcceptInputType_nzGhost: BooleanInput;

  @Input() @WithConfig() @InputBoolean() nzAccordion: boolean = false;
  @Input() @WithConfig() @InputBoolean() nzBordered: boolean = true;
  @Input() @WithConfig() @InputBoolean() nzGhost: boolean = false;
  @Input() nzExpandIconPosition: 'left' | 'right' = 'left';

  dir: Direction = 'ltr';

  private listOfNzCollapsePanelComponent: NzCollapsePanelComponent[] = [];
  private destroy$ = new Subject();
  constructor(
    public nzConfigService: NzConfigService,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    @Optional() private directionality: Directionality
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('ant-collapse');

    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  ngOnInit(): void {
    this.directionality.change?.pipe(takeUntil(this.destroy$)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;
  }

  addPanel(value: NzCollapsePanelComponent): void {
    this.listOfNzCollapsePanelComponent.push(value);
  }

  removePanel(value: NzCollapsePanelComponent): void {
    this.listOfNzCollapsePanelComponent.splice(this.listOfNzCollapsePanelComponent.indexOf(value), 1);
  }

  click(collapse: NzCollapsePanelComponent): void {
    if (this.nzAccordion && !collapse.nzActive) {
      this.listOfNzCollapsePanelComponent
        .filter(item => item !== collapse)
        .forEach(item => {
          if (item.nzActive) {
            item.nzActive = false;
            item.nzActiveChange.emit(item.nzActive);
            item.markForCheck();
          }
        });
    }
    collapse.nzActive = !collapse.nzActive;
    collapse.nzActiveChange.emit(collapse.nzActive);
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
