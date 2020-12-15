/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { badgePresetColors } from './preset-colors';

@Component({
  selector: 'nz-ribbon',
  exportAs: 'nzRibbon',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-content></ng-content>
    <div
      class="ant-ribbon"
      [class]="presetColor && 'ant-ribbon-color-' + presetColor"
      [class.ant-ribbon-placement-end]="nzPlacement === 'end'"
      [class.ant-ribbon-placement-start]="nzPlacement === 'start'"
      [style.background-color]="!presetColor && nzColor"
    >
      <ng-container *nzStringTemplateOutlet="nzText">{{ nzText }}</ng-container>
      <div class="ant-ribbon-corner" [style.color]="!presetColor && nzColor"></div>
    </div>
  `
})
export class NzRibbonComponent implements OnChanges {
  @Input() nzColor: string | undefined;
  @Input() nzPlacement: 'start' | 'end' = 'end';
  @Input() nzText: string | TemplateRef<void> | null = null;
  presetColor: string | null = null;

  constructor(private elementRef: ElementRef) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('ant-ribbon-wrapper');
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzColor } = changes;
    if (nzColor) {
      this.presetColor = this.nzColor && badgePresetColors.indexOf(this.nzColor) !== -1 ? this.nzColor : null;
    }
  }
}
