import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  Renderer2,
  ViewEncapsulation
} from '@angular/core';

import { NzCheckboxComponent } from './nz-checkbox.component';

@Component({
  selector: 'nz-checkbox-wrapper',
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: './nz-checkbox-wrapper.component.html'
})
export class NzCheckboxWrapperComponent {
  @Output() readonly nzOnChange = new EventEmitter<string[]>();
  private checkboxList: NzCheckboxComponent[] = [];

  addCheckbox(value: NzCheckboxComponent): void {
    this.checkboxList.push(value);
  }

  removeCheckbox(value: NzCheckboxComponent): void {
    this.checkboxList.splice(this.checkboxList.indexOf(value), 1);
  }

  outputValue(): string[] {
    const checkedList = this.checkboxList.filter(item => item.nzChecked);
    return checkedList.map(item => item.nzValue);
  }

  onChange(): void {
    this.nzOnChange.emit(this.outputValue());
  }

  constructor(renderer: Renderer2, elementRef: ElementRef) {
    renderer.addClass(elementRef.nativeElement, 'ant-checkbox-group');
  }
}
