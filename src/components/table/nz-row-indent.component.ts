import {
  Component,
  HostBinding,
  Input,
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
  get paddingLeft(): number {
    return this.nzIndentSize * 20;
  }
}
