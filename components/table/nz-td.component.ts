import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2
} from '@angular/core';

import { isNotNil } from '../core/util/check';
import { toBoolean } from '../core/util/convert';

@Component({
  // tslint:disable-next-line:component-selector
  selector   : 'td:not(.nz-disable-td)',
  templateUrl: './nz-td.component.html'
})
export class NzTdComponent {
  private _showExpand = false;
  private _indentSize: number;
  private _expand = false;
  private _showCheckbox = false;
  isIndentSizeSet = false;
  el: HTMLElement = this.elementRef.nativeElement;
  @Input() nzChecked = false;
  @Input() nzDisabled = false;
  @Input() nzIndeterminate = false;
  @Output() nzCheckedChange = new EventEmitter<boolean>();
  @Output() nzExpandChange = new EventEmitter<boolean>();

  @Input()
  set nzIndentSize(value: number) {
    this._indentSize = value;
    this.isIndentSizeSet = isNotNil(value);
    this.updateExpandIconClass();
  }

  get nzIndentSize(): number {
    return this._indentSize;
  }

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
    this.updateExpandIconClass();
  }

  get nzShowExpand(): boolean {
    return this._showExpand;
  }

  @Input()
  set nzShowCheckbox(value: boolean) {
    this._showCheckbox = toBoolean(value);
    if (this._showCheckbox) {
      this.renderer.addClass(this.el, 'ant-table-selection-column');
    } else {
      this.renderer.removeClass(this.el, 'ant-table-selection-column');
    }
  }

  get nzShowCheckbox(): boolean {
    return this._showCheckbox;
  }

  @Input()
  set nzLeft(value: string) {
    if (isNotNil(value)) {
      this.renderer.addClass(this.el, 'ant-table-td-left-sticky');
      this.renderer.setStyle(this.el, 'left', value);
    } else {
      this.renderer.removeClass(this.el, 'ant-table-td-left-sticky');
      this.renderer.removeStyle(this.el, 'left');
    }
  }

  @Input()
  set nzRight(value: string) {
    if (isNotNil(value)) {
      this.renderer.addClass(this.el, 'ant-table-td-right-sticky');
      this.renderer.setStyle(this.el, 'right', value);
    } else {
      this.renderer.removeClass(this.el, 'ant-table-td-right-sticky');
      this.renderer.removeStyle(this.el, 'right');
    }
  }

  updateExpandIconClass(): void {
    if (this.nzShowExpand && !this.isIndentSizeSet) {
      this.renderer.addClass(this.el, 'ant-table-row-expand-icon-cell');
    } else {
      this.renderer.removeClass(this.el, 'ant-table-row-expand-icon-cell');
    }
  }

  expandChange(): void {
    this.nzExpand = !this.nzExpand;
    this.nzExpandChange.emit(this.nzExpand);
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }
}
