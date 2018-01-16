import {
  Directive,
  HostBinding,
  Input,
} from '@angular/core';

@Directive({
  selector: '[nz-col]'
})
export class NzColDirective {
  _width: string;

  @Input()
  @HostBinding(`style.width`)
  @HostBinding(`style.min-width`)
  set nzWidth(value: string) {
    this._width = value;
  }

  get nzWidth(): string {
    return this._width;
  }

  constructor() {
  }
}
