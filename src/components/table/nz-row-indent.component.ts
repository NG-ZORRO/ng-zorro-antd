import {
  Component,
  Input,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'nz-row-indent',
  template: ``
})
export class NzRowIndentComponent {
  @Input() nzIndentSize;

  @HostBinding(`style.paddingLeft.px`)
  get paddingLeft() {
    return this.nzIndentSize * 20;
  }

  @HostBinding(`class.ant-table-row-indent`) _rowIndent = true;

  constructor() {
  }
}
