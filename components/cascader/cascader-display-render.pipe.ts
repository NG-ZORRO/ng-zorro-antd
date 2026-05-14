/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { inject, Pipe, PipeTransform } from '@angular/core';

import { NzTreeNode } from 'ng-zorro-antd/tree';

import { NzCascaderTreeService } from './cascader-tree.service';
import { NzCascaderService } from './cascader.service';
import { NzCascaderOption, NzDisplayRenderContext } from './typings';

export const defaultDisplayRender = (labels: string[]): string => labels.join(' / ');

@Pipe({
  name: 'nzDisplayRender'
})
export class NzDisplayRenderPipe implements PipeTransform {
  private cascaderService = inject(NzCascaderService);
  private cascaderTreeService = inject(NzCascaderTreeService);

  transform(node: NzTreeNode, deprecatedDisplayWith?: (nodes: NzCascaderOption[]) => string | undefined): string {
    const ancestors = this.cascaderTreeService.getAncestorNodeList(node);
    const selectedOptions = this.cascaderTreeService.toOptions(ancestors);
    const labels = selectedOptions.map(o => this.cascaderService.getOptionLabel(o));
    return deprecatedDisplayWith ? deprecatedDisplayWith(selectedOptions)! : defaultDisplayRender(labels);
  }
}

@Pipe({
  name: 'nzDisplayRenderContext'
})
export class NzDisplayRenderContextPipe implements PipeTransform {
  private cascaderService = inject(NzCascaderService);
  private cascaderTreeService = inject(NzCascaderTreeService);

  transform(node: NzTreeNode): NzDisplayRenderContext {
    const ancestors = this.cascaderTreeService.getAncestorNodeList(node);
    const selectedOptions = this.cascaderTreeService.toOptions(ancestors);
    const labels = selectedOptions.map(o => this.cascaderService.getOptionLabel(o));
    return {
      labels,
      selectedOptions
    };
  }
}
