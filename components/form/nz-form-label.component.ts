import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Host,
  Input,
  Optional,
  ViewEncapsulation
} from '@angular/core';
import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { InputBoolean } from '../core/util/convert';
import { NzColComponent } from '../grid/nz-col.component';
import { NzRowDirective } from '../grid/nz-row.directive';
import { NzFormItemComponent } from './nz-form-item.component';

@Component({
  selector           : 'nz-form-label',
  providers          : [ NzUpdateHostClassService ],
  preserveWhitespaces: false,
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  templateUrl        : './nz-form-label.component.html',
  host               : {
    '[class.ant-form-item-label]': 'true'
  }
})
export class NzFormLabelComponent extends NzColComponent {
  @Input() nzFor: string;
  @Input() @InputBoolean() nzRequired = false;

  constructor(nzUpdateHostClassService: NzUpdateHostClassService, elementRef: ElementRef, @Optional() @Host() nzFormItemComponent: NzFormItemComponent, @Optional() @Host() nzRowDirective: NzRowDirective) {
    super(nzUpdateHostClassService, elementRef, nzFormItemComponent, nzRowDirective);
  }
}
