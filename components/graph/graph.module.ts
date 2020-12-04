/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCustomGraphNodeDirective } from './custom-graph-node.directive';
import { NzGraphDefsComponent } from './graph-defs.component';
import { NzGraphEdgeDirective } from './graph-edge.directive';
import { NzGraphMinimapComponent } from './graph-minimap.component';
import { NzGraphNodeDirective } from './graph-node.directive';
import { NzGraphZoomDirective } from './graph-zoom.directive';
import { NzGraphComponent } from './graph.component';

const COMPONENTS = [
  NzGraphComponent,
  NzGraphEdgeDirective,
  NzGraphNodeDirective,
  NzGraphMinimapComponent,
  NzGraphDefsComponent,
  NzCustomGraphNodeDirective,
  // Refactor
  NzGraphZoomDirective
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, NzIconModule, NzSpinModule],
  exports: [...COMPONENTS]
})
export class NzGraphModule {}
