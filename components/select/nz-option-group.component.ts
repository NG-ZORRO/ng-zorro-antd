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
  isLabelString = false;
  label: string | TemplateRef<void>;
  @ContentChildren(NzOptionComponent) listOfNzOptionComponent: QueryList<NzOptionComponent>;

  @Input()
  set nzLabel(value: string | TemplateRef<void>) {
    this.label = value;
    this.isLabelString = !(this.nzLabel instanceof TemplateRef);
  }

  get nzLabel(): string | TemplateRef<void> {
    return this.label;
  }
}
