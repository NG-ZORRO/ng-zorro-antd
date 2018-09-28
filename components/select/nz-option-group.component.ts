import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { NzOptionComponent } from './nz-option.component';

@Component({
  selector   : 'nz-option-group',
  templateUrl: './nz-option-group.component.html'
})
export class NzOptionGroupComponent {
  _label: string | TemplateRef<void>;
  isLabelString: boolean;
  @ContentChildren(NzOptionComponent) listOfNzOptionComponent: QueryList<NzOptionComponent>;

  @Input()
  set nzLabel(value: string | TemplateRef<void>) {
    this.isLabelString = !(value instanceof TemplateRef);
    this._label = value;
  }

  get nzLabel(): string | TemplateRef<void> {
    return this._label;
  }

}
