/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzNoAnimationModule } from 'ng-zorro-antd/core/no-animation';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { NzGraphDefsComponent } from './graph-defs.component';
import { NzGraphEdgeComponent } from './graph-edge.component';
import { NzGraphEdgeDirective } from './graph-edge.directive';
import { NzGraphGroupNodeDirective } from './graph-group-node.directive';
import { NzGraphMinimapComponent } from './graph-minimap.component';
import { NzGraphNodeComponent } from './graph-node.component';
import { NzGraphNodeDirective } from './graph-node.directive';
import { NzGraphComponent } from './graph.component';
import { NzSvgContainerDirective } from './svg-container';
import { NzSvgGZoomDirective } from './svg-zoom.directive';

const COMPONENTS = [
  NzGraphComponent,
  NzGraphMinimapComponent,
  NzGraphDefsComponent,
  NzGraphNodeDirective,
  NzGraphGroupNodeDirective,
  NzGraphNodeComponent,
  NzGraphEdgeComponent,
  NzGraphEdgeDirective,
  NzSvgContainerDirective,
  NzSvgGZoomDirective
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, NzIconModule, NzSpinModule, NzNoAnimationModule],
  exports: [...COMPONENTS]
})
export class NzGraphModule {}
