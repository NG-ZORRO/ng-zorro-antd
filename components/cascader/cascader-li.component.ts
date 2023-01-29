/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction } from '@angular/cdk/bidi';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzCascaderOption } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: '[nz-cascader-option]',
  exportAs: 'nzCascaderOption',
  template: `
    <ng-container *ngIf="optionTemplate; else defaultOptionTemplate">
      <ng-template
        [ngTemplateOutlet]="optionTemplate"
        [ngTemplateOutletContext]="{ $implicit: option, index: columnIndex }"
      ></ng-template>
    </ng-container>
    <ng-template #defaultOptionTemplate>
      <div
        class="ant-cascader-menu-item-content"
        [innerHTML]="optionLabel | nzHighlight: highlightText:'g':'ant-cascader-menu-item-keyword'"
      ></div>
    </ng-template>
    <div *ngIf="!option.isLeaf || option.children?.length || option.loading" class="ant-cascader-menu-item-expand-icon">
      <span *ngIf="option.loading; else icon" nz-icon nzType="loading"></span>
      <ng-template #icon>
        <ng-container *nzStringTemplateOutlet="expandIcon">
          <span nz-icon [nzType]="$any(expandIcon)"></span>
        </ng-container>
      </ng-template>
    </div>
  `,
  host: {
    '[attr.title]': 'option.title || optionLabel',
    '[class.ant-cascader-menu-item-active]': 'activated',
    '[class.ant-cascader-menu-item-expand]': '!option.isLeaf',
    '[class.ant-cascader-menu-item-disabled]': 'option.disabled'
  }
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

  constructor(private cdr: ChangeDetectorRef, elementRef: ElementRef, renderer: Renderer2) {
    renderer.addClass(elementRef.nativeElement, 'ant-cascader-menu-item');
    renderer.addClass(elementRef.nativeElement, 'ant-cascader-menu-item-expanded');
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
