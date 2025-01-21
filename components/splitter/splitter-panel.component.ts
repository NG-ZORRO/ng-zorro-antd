/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { input, TemplateRef, Component, ViewEncapsulation, viewChild } from '@angular/core';

import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { NzSplitterCollapsible } from './typings';

@Component({
  selector: 'nz-splitter-panel',
  exportAs: 'nzSplitterPanel',
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #contentTemplate>
      <ng-content></ng-content>
    </ng-template>
  `,
  host: {
    class: 'ant-splitter-panel'
  }
})
export class NzSplitterPanelComponent {
  readonly nzDefaultSize = input<number | string>();
  readonly nzMin = input<number | string>();
  readonly nzMax = input<number | string>();
  readonly nzSize = input<number | string>();
  readonly nzCollapsible = input<NzSplitterCollapsible>(false);
  readonly nzResizable = input<boolean>(true);
  readonly contentTemplate = viewChild.required<TemplateRef<NzSafeAny>>('contentTemplate');

  // private readonly splitterCmp = inject(NzSplitterComponent, { host: true, optional: true });
  // private readonly panels = inject(NZ_SPLITTER_PANEL_LIST, { host: true, optional: true });
  // private readonly elementRef = inject(ElementRef);
  //
  // private get parentElement(): HTMLElement | null {
  //   return this.elementRef.nativeElement?.parentElement;
  // }
  //
  // constructor() {
  //   if (!this.splitterCmp || !this.panels) return;
  //
  //   afterNextRender(() => {
  //     // Ensure that the injected ancestor component's elements are parent elements
  //     if (this.splitterCmp!.elementRef.nativeElement === this.parentElement) {
  //       const index = Array.from(this.parentElement.children).indexOf(this.elementRef.nativeElement);
  //       this.panels!.update(panels => {
  //         const newPanels = panels.slice();
  //         newPanels.splice(index, 0, this);
  //         return newPanels;
  //       });
  //     }
  //   });
  // }
  //
  // ngOnDestroy(): void {
  //   this.panels?.update(panels => panels.filter(panel => panel !== this));
  // }
}
