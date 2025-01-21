/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { InjectionToken, WritableSignal } from '@angular/core';

import { NzSplitterPanelComponent } from 'ng-zorro-antd/splitter/splitter-panel.component';

export const NZ_SPLITTER_PANEL_LIST = new InjectionToken<WritableSignal<NzSplitterPanelComponent[]>>(
  'NZ_SPLITTER_PANEL_LIST'
);
