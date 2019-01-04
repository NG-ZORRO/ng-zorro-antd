import {
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { NzOptionComponent } from './nz-option.component';

@Component({
  selector       : 'nz-option-group',
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl    : './nz-option-group.component.html'
})
export class NzOptionGroupComponent {
  @ContentChildren(NzOptionComponent) listOfNzOptionComponent: QueryList<NzOptionComponent>;
  @Input() nzLabel: string | TemplateRef<void>;

  get isLabelString(): boolean {
    return !(this.nzLabel instanceof TemplateRef);
  }
}
