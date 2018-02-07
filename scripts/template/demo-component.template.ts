import { Component, QueryList, ViewChildren } from '@angular/core';
import { NzCodeBoxComponent } from '../share/nz-codebox/nz-codebox.component';

@Component({
  selector     : 'nz-demo-{{component}}',
  preserveWhitespaces: false,
  templateUrl  : './{{language}}.html'
})
export class {{componentName}} {
  @ViewChildren(NzCodeBoxComponent) codeBoxes: QueryList<NzCodeBoxComponent>;

  goLink(link: string) {
    window.location.hash = link;
  }

  expandAllCode(): void {
    this.codeBoxes.forEach(code => {
      code.nzExpanded = !code.nzExpanded;
    });
  }
{{code}}
}
