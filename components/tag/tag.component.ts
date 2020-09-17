/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { BooleanInput } from 'ng-zorro-antd/core/types';
import { InputBoolean } from 'ng-zorro-antd/core/util';

@Component({
  selector: 'nz-tag',
  exportAs: 'nzTag',
  preserveWhitespaces: false,
  template: `
    <ng-content></ng-content>
    <i nz-icon nzType="close" class="ant-tag-close-icon" *ngIf="nzMode === 'closeable'" tabindex="-1" (click)="closeTag($event)"></i>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[style.background-color]': `isPresetColor ? '' : nzColor`,
    '[class]': `isPresetColor ? ('ant-tag-' + nzColor) : ''`,
    '[class.ant-tag]': `true`,
    '[class.ant-tag-has-color]': `nzColor && !isPresetColor`,
    '[class.ant-tag-checkable]': `nzMode === 'checkable'`,
    '[class.ant-tag-checkable-checked]': `nzChecked`,
    '(click)': 'updateCheckedStatus()'
  }
})
export class NzTagComponent implements OnChanges {
  static ngAcceptInputType_nzChecked: BooleanInput;
  isPresetColor = false;
  @Input() nzMode: 'default' | 'closeable' | 'checkable' = 'default';
  @Input() nzColor?: string;
  @Input() @InputBoolean() nzChecked = false;
  @Output() readonly nzOnClose = new EventEmitter<MouseEvent>();
  @Output() readonly nzCheckedChange = new EventEmitter<boolean>();

  updateCheckedStatus(): void {
    if (this.nzMode === 'checkable') {
      this.nzChecked = !this.nzChecked;
      this.nzCheckedChange.emit(this.nzChecked);
    }
  }

  closeTag(e: MouseEvent): void {
    this.nzOnClose.emit(e);
    if (!e.defaultPrevented) {
      this.renderer.removeChild(this.renderer.parentNode(this.elementRef.nativeElement), this.elementRef.nativeElement);
    }
  }

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    const { nzColor } = changes;
    if (nzColor) {
      if (!this.nzColor) {
        this.isPresetColor = false;
      } else {
        this.isPresetColor =
          /^(pink|red|yellow|orange|cyan|green|blue|purple|geekblue|magenta|volcano|gold|lime)(-inverse)?$/.test(this.nzColor) ||
          /^(success|processing|error|default|warning)$/.test(this.nzColor);
      }
    }
  }
}
