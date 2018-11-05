import { Component, Input, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { classMapToString } from '../core/style/map';
import { CascaderOption } from './types';

const prefixCls = 'ant-cascader-menu-item';

@Component({
  selector   : '[nz-cascader-option]',
  templateUrl: './nz-cascader-li.component.html',
  host       : {
    '[attr.title]': 'option.title || getOptionLabel()',
    '[class]'     : 'getOptionClassString()'
  }
})
export class NzCascaderOptionComponent {
  @Input() option: CascaderOption;
  @Input() activated = false;
  @Input() highlightText: string;
  @Input() nzLabelProperty = 'label';

  getOptionLabel(): string {
    return this.option ? this.option[ this.nzLabelProperty ] : '';
  }

  getOptionClassString(): string {
    return classMapToString({
      [ `${prefixCls}` ]         : true,
      [ `${prefixCls}-active` ]  : this.activated,
      [ `${prefixCls}-expand` ]  : !this.option.isLeaf,
      [ `${prefixCls}-disabled` ]: this.option.disabled
    });
  }

  renderHighlightString(str: string): string {
    const safeHtml = this.sanitizer.sanitize(
      SecurityContext.HTML, `<span class="ant-cascader-menu-item-keyword">${this.highlightText}</span>`
    );
    if (!safeHtml) {
      throw new Error(`[NG-ZORRO] Input value "${this.highlightText}" is not considered security.`);
    }
    return str.replace(new RegExp(this.highlightText, 'g'), safeHtml);
  }

  constructor(private sanitizer: DomSanitizer) {
  }
}
