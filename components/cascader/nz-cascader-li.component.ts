import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input, Renderer2,
  SecurityContext,
  ViewEncapsulation
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CascaderOption } from './types';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation  : ViewEncapsulation.None,
  selector       : '[nz-cascader-option]',
  templateUrl    : './nz-cascader-li.component.html',
  host           : {
    '[attr.title]'                           : 'option.title || getOptionLabel()',
    '[class.ant-cascader-menu-item-active]'  : 'activated',
    '[class.ant-cascader-menu-item-expand]'  : '!option.isLeaf',
    '[class.ant-cascader-menu-item-disabled]': 'option.disabled'
  }
})
export class NzCascaderOptionComponent {
  @Input() option: CascaderOption;
  @Input() activated = false;
  @Input() highlightText: string;
  @Input() nzLabelProperty = 'label';

  constructor(private sanitizer: DomSanitizer, private cdr: ChangeDetectorRef, elementRef: ElementRef, renderer: Renderer2) {
    renderer.addClass(elementRef.nativeElement, 'ant-cascader-menu-item');
  }

  getOptionLabel(): string {
    return this.option ? this.option[ this.nzLabelProperty ] : '';
  }

  renderHighlightString(str: string): string {
    const safeHtml = this.sanitizer.sanitize(SecurityContext.HTML, `<span class="ant-cascader-menu-item-keyword">${this.highlightText}</span>`);
    if (!safeHtml) {
      throw new Error(`[NG-ZORRO] Input value "${this.highlightText}" is not considered security.`);
    }
    return str.replace(new RegExp(this.highlightText, 'g'), safeHtml);
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }
}
