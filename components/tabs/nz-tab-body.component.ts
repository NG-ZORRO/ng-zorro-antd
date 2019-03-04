import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewEncapsulation } from '@angular/core';

@Component({
  selector           : '[nz-tab-body]',
  preserveWhitespaces: false,
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  templateUrl        : './nz-tab-body.component.html',
  host               : {
    '[class.ant-tabs-tabpane-active]'  : 'active',
    '[class.ant-tabs-tabpane-inactive]': '!active'
  }
})
export class NzTabBodyComponent {
  @Input() content: TemplateRef<void>;
  @Input() active = false;
  @Input() forceRender = false;
}
