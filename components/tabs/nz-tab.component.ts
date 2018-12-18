import {
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { InputBoolean } from '../core/util/convert';

@Component({
  selector           : 'nz-tab',
  preserveWhitespaces: false,
  encapsulation      : ViewEncapsulation.None,
  templateUrl        : './nz-tab.component.html',
  host               : {
    '[class.ant-tabs-tabpane]': 'true'
  }
})
export class NzTabComponent {
  position: number | null = null;
  origin: number | null = null;
  @Input() nzTitle: string | TemplateRef<void>;
  @Input() nzPathOrParam: string = '';
  @Input() @InputBoolean() nzForceRender = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Output() readonly nzClick = new EventEmitter<void>();
  @Output() readonly nzSelect = new EventEmitter<void>();
  @Output() readonly nzDeselect = new EventEmitter<void>();
  @ViewChild(TemplateRef) content: TemplateRef<void>;
}
