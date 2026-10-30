/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';

import { NzCollapseModule } from 'ng-zorro-antd/collapse';

import { NzColor, NzPresetColor } from '../typings';
import type { Color } from './interfaces/color';
import { NgAntdColorBlockComponent } from './ng-antd-color-block.component';
import { generateColor } from './util/util';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'ng-antd-color-preset',
  imports: [NzCollapseModule, NgAntdColorBlockComponent],
  template: `
    <div class="ant-color-picker-presets">
      <nz-collapse nzGhost>
        @for (preset of presets; track preset.key || $index) {
          <nz-collapse-panel
            [nzActive]="openPresets().has($index)"
            (nzActiveChange)="onPanelActiveChange($index, $event)"
            [nzHeader]="preset.label"
          >
            <div class="ant-color-picker-presets-items">
              @for (color of preset.colors; track $index) {
                <ng-antd-color-block
                  [value]="value"
                  [color]="getColorString(color)"
                  (nzOnClick)="selectPresetColor(color)"
                />
              }
            </div>
          </nz-collapse-panel>
        }
      </nz-collapse>
    </div>
  `,
  host: {
    class: 'ant-color-picker-presets-wrapper'
  }
})
export class NgAntdColorPresetComponent implements OnInit {
  protected readonly openPresets = signal(new Set<string | number>());

  @Input() presets: NzPresetColor[] = [];
  @Input() value: Color | null = null;
  @Output() readonly presetSelect = new EventEmitter<NzColor>();

  ngOnInit(): void {
    const openPresets = new Set<string | number>();
    this.presets.forEach((preset, index) => {
      if (preset.defaultOpen) {
        openPresets.add(index);
      }
    });
    this.openPresets.set(openPresets);
  }

  onPanelActiveChange(index: number, active: boolean): void {
    this.openPresets.update(openPresets => {
      const updatedOpenPresets = new Set(openPresets);
      if (active) {
        updatedOpenPresets.add(index);
      } else {
        updatedOpenPresets.delete(index);
      }
      return updatedOpenPresets;
    });
  }

  selectPresetColor(color: string | NzColor): void {
    const colorInstance = typeof color === 'string' ? generateColor(color) : color;
    this.presetSelect.emit(colorInstance);
  }

  getColorString(color: string | NzColor): string {
    if (typeof color === 'string') {
      return color;
    }
    return color.toRgbString();
  }
}
