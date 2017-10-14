import {
  Component,
  Input,
  Output,
  HostListener,
  HostBinding,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'nz-row-expand-icon',
  template: ``
})
export class NzRowExpandIconComponent {
  @Input() nzExpand = false;
  @Input() nzShowExpand = true;
  @Output() nzExpandChange = new EventEmitter();

  @HostBinding('class.ant-table-row-spaced')
  get hidden() {
    return !this.nzShowExpand;
  }

  @HostBinding(`class.ant-table-row-expanded`)
  get expanded() {
    return this.nzShowExpand && this.nzExpand;
  }

  @HostBinding(`class.ant-table-row-collapsed`)
  get collapsed() {
    return this.nzShowExpand && !this.nzExpand;
  }

  @HostBinding(`class.ant-table-row-expand-icon`) _expandIcon = true;


  @HostListener('click')
  onClick() {
    this.nzExpand = !this.nzExpand;
    this.nzExpandChange.emit(this.nzExpand);
  }

  constructor() {
  }
}
