import {
  Component,
  Input,
  TemplateRef
} from '@angular/core';

@Component({
  selector           : 'nz-breadcrumb',
  preserveWhitespaces: false,
  templateUrl        : './nz-breadcrumb.component.html',
  host               : {
    '[class.ant-breadcrumb]': 'true'
  },
  styles             : [ `
    :host {
      display: block;
    }
  ` ]
})
export class NzBreadCrumbComponent {
  private _separator: string | TemplateRef<void> = '/';
  isTemplateRef = false;

  @Input()
  set nzSeparator(value: string | TemplateRef<void>) {
    this._separator = value;
    this.isTemplateRef = value instanceof TemplateRef;
  }

  get nzSeparator(): string | TemplateRef<void> {
    return this._separator;
  }
}
