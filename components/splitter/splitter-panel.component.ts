/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  input,
  TemplateRef,
  Component,
  ViewEncapsulation,
  viewChild,
  booleanAttribute,
  ChangeDetectionStrategy
} from '@angular/core';

import { NzSplitterCollapsible } from './typings';

@Component({
  selector: 'nz-splitter-panel',
  exportAs: 'nzSplitterPanel',
  template: `
    <ng-template #contentTemplate>
      <ng-content />
    </ng-template>
  `,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzSplitterPanelComponent {
  readonly nzDefaultSize = input<number | string>();
  readonly nzMin = input<number | string>();
  readonly nzMax = input<number | string>();
  readonly nzSize = input<number | string>();
  readonly nzCollapsible = input<NzSplitterCollapsible>(false);
  readonly nzResizable = input(true, { transform: booleanAttribute });
  readonly contentTemplate = viewChild.required<TemplateRef<void>>('contentTemplate');
}
