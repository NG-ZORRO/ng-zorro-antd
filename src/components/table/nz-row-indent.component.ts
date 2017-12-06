import {
  Component,
  Input,
  HostBinding,
} from '@angular/core';

@Component({
  selector: 'nz-row-indent',
  template: ``,
  host: {
    '[class.ant-table-row-indent]': 'true'
  }
})
export class NzRowIndentComponent {
  @Input() nzIndentSize;

  @HostBinding(`style.paddingLeft.px`)
  get paddingLeft() {
    return this.nzIndentSize * 20;
  }

  constructor() {
  }
}
