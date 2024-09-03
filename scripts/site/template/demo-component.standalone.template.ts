import { Component, QueryList, ViewChildren } from '@angular/core';
import { NzCodeBoxComponent } from '../codebox/codebox.component';
import { ShareModule } from '../share/share.module';

{{imports}}

@Component({
  selector     : 'nz-demo-{{component}}',
  standalone   : true,
  imports      : [
    ShareModule,
{{declarations}}
  ],
  preserveWhitespaces: false,
  templateUrl  : './{{language}}.html'
})
export class {{componentName}} {
  expanded = false;
  @ViewChildren(NzCodeBoxComponent) codeBoxes!: QueryList<NzCodeBoxComponent>;

  goLink(link: string): void {
    if (window) {
      window.location.hash = link;
    }
  }

  expandAllCode(): void {
    this.expanded = !this.expanded;
    this.codeBoxes.forEach(code => code.expandCode(this.expanded));
  }
}
