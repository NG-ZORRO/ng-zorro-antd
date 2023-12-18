/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzCascaderOption } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: '[nz-cascader-option]',
  exportAs: 'nzCascaderOption',
  template: `
    @if (optionTemplate) {
      <ng-template
        [ngTemplateOutlet]="optionTemplate"
        [ngTemplateOutletContext]="{ $implicit: option, index: columnIndex }"
      />
    } @else {
      <div
        class="ant-cascader-menu-item-content"
        [innerHTML]="optionLabel | nzHighlight: highlightText : 'g' : 'ant-cascader-menu-item-keyword'"
      ></div>
    }

    @if (!option.isLeaf || option.children?.length || option.loading) {
      <div class="ant-cascader-menu-item-expand-icon">
        @if (option.loading) {
          <span nz-icon nzType="loading"></span>
        } @else {
          <ng-container *nzStringTemplateOutlet="expandIcon">
            <span nz-icon [nzType]="$any(expandIcon)"></span>
          </ng-container>
        }
      </div>
    }
  `,
  host: {
    class: 'ant-cascader-menu-item ant-cascader-menu-item-expanded',
    '[attr.title]': 'option.title || optionLabel',
    '[class.ant-cascader-menu-item-active]': 'activated',
    '[class.ant-cascader-menu-item-expand]': '!option.isLeaf',
    '[class.ant-cascader-menu-item-disabled]': 'option.disabled'
  },
  imports: [NgTemplateOutlet, NzHighlightModule, NzIconModule, NzOutletModule],
  standalone: true
})
export class NzCascaderOptionComponent implements OnInit {
  @Input() optionTemplate: TemplateRef<NzCascaderOption> | null = null;
  @Input() option!: NzCascaderOption;
  @Input() activated = false;
  @Input() highlightText!: string;
  @Input() nzLabelProperty = 'label';
  @Input() columnIndex!: number;
  @Input() expandIcon: string | TemplateRef<void> = '';
  @Input() dir: Direction = 'ltr';

  readonly nativeElement: HTMLElement;

  constructor(
    private cdr: ChangeDetectorRef,
    elementRef: ElementRef
  ) {
    this.nativeElement = elementRef.nativeElement;
  }
  ngOnInit(): void {
    if (this.expandIcon === '' && this.dir === 'rtl') {
      this.expandIcon = 'left';
    } else if (this.expandIcon === '') {
      this.expandIcon = 'right';
    }
  }

  get optionLabel(): string {
    return this.option[this.nzLabelProperty];
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }
}
