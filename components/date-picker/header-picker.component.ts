/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';

import { valueFunctionProp, CandyDate, FunctionProp, NzNoAnimationDirective } from 'ng-zorro-antd/core';
import { DateHelperService, NzI18nService } from 'ng-zorro-antd/i18n';

import { AbstractPickerComponent } from './abstract-picker.component';
import { PanelMode } from './standard-types';

/**
 * The base picker for header panels, current support: Year/Month
 */

@Component({
  template: ``
})
export class HeaderPickerComponent extends AbstractPickerComponent implements OnInit, OnChanges {
  @Input() nzPlaceHolder: string;

  @Input() nzRenderExtraFooter: FunctionProp<TemplateRef<void> | string>;
  @Input() nzDefaultValue: CandyDate;
  @Input() nzFormat: string; // [Canmplemented by sub class] The output format

  endPanelMode: SupportHeaderPanel; // [Implemented by sub class] The final panel for picking a date
  panelMode: PanelMode; // Current panel mode
  extraFooter: TemplateRef<void> | string;

  private supportPanels: PanelMode[];

  constructor(
    i18n: NzI18nService,
    cdr: ChangeDetectorRef,
    dateHelper: DateHelperService,
    noAnimation?: NzNoAnimationDirective
  ) {
    super(i18n, cdr, dateHelper, noAnimation);
  }

  ngOnInit(): void {
    super.ngOnInit();

    this.panelMode = this.endPanelMode;

    const allHeaderPanels: PanelMode[] = ['decade', 'year', 'month'];
    this.supportPanels = allHeaderPanels.slice(0, allHeaderPanels.indexOf(this.endPanelMode) + 1);
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);

    if (changes.nzRenderExtraFooter) {
      this.extraFooter = valueFunctionProp(this.nzRenderExtraFooter);
    }
  }

  onPanelModeChange(mode: PanelMode): void {
    if (this.supportPanels.indexOf(mode) > -1) {
      this.panelMode = mode;
    } else {
      // Since the default "click year" logic can be "year panel" -> "date panel", we need force to the end panel otherwise
      this.panelMode = this.endPanelMode;
    }
  }

  onChooseValue(mode: SupportHeaderPanel, value: CandyDate): void {
    if (this.endPanelMode === mode) {
      super.onValueChange(value);

      this.closeOverlay();
    }
  }

  onOpenChange(open: boolean): void {
    if (!open) {
      this.cleanUp();
    }
    this.nzOnOpenChange.emit(open);
  }

  // Restore some initial props to let open as new in next time
  private cleanUp(): void {
    this.panelMode = this.endPanelMode;
  }
}

export type SupportHeaderPanel = 'year' | 'month';
