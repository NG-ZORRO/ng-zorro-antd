import {
  Component,
  ViewEncapsulation,
  Input
} from '@angular/core';
import { NzCollapseComponent } from './nz-collapse.component';

@Component({
  selector     : 'nz-collapseset',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="ant-collapse" [class.ant-collapse-borderless]="!nzBordered">
      <ng-content></ng-content>
    </div>
  `,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ]
})


export class NzCollapsesetComponent {
  // all child collapse
  panels: Array<NzCollapseComponent> = [];

  @Input() nzAccordion = false;

  @Input() nzBordered = true;

  nzClick(collapse) {
    if (this.nzAccordion) {
      this.panels.map((item, index) => {
        const curIndex = this.panels.indexOf(collapse);
        if (index !== curIndex) {
          item.nzActive = false;
        }
      });
    }
  }

  addTab(collapse: NzCollapseComponent) {
    this.panels.push(collapse);
  }

  constructor() {
  }
}
