import {
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  Output,
} from '@angular/core';
import { toBoolean } from '../util/convert';

@Component({
  selector: 'nz-row-expand-icon',
  template: ``,
  host: {
    '[class.ant-table-row-expand-icon]': 'true'
  }
})
export class NzRowExpandIconComponent {
  private _expand = false;
  private _showExpand = true;

  @Output() nzExpandChange = new EventEmitter();

  @Input()
  set nzExpand(value: boolean) {
    this._expand = toBoolean(value);
  }

  get nzExpand(): boolean {
    return this._expand;
  }

  @Input()
  set nzShowExpand(value: boolean) {
    this._showExpand = toBoolean(value);
  }

  get nzShowExpand(): boolean {
    return this._showExpand;
  }

  @HostBinding('class.ant-table-row-spaced')
  get hidden(): boolean {
    return !this.nzShowExpand;
  }

  @HostBinding(`class.ant-table-row-expanded`)
  get expanded(): boolean {
    return this.nzShowExpand && this.nzExpand;
  }

  @HostBinding(`class.ant-table-row-collapsed`)
  get collapsed(): boolean {
    return this.nzShowExpand && !this.nzExpand;
  }

  @HostListener('click')
  onClick(): void {
    this.nzExpand = !this.nzExpand;
    this.nzExpandChange.emit(this.nzExpand);
  }
}
