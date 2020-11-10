/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Optional,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzCascaderOption } from './typings';
// tslint:disable-next-line: ordered-imports
import { Directionality, Direction } from '@angular/cdk/bidi';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: '[nz-cascader-option]',
  exportAs: 'nzCascaderOption',
  template: `
    <ng-container *ngIf="optionTemplate; else defaultOptionTemplate">
      <ng-template [ngTemplateOutlet]="optionTemplate" [ngTemplateOutletContext]="{ $implicit: option, index: columnIndex }"></ng-template>
    </ng-container>
    <ng-template #defaultOptionTemplate>
      <span [innerHTML]="optionLabel | nzHighlight: highlightText:'g':'ant-cascader-menu-item-keyword'"></span>
    </ng-template>
    <span *ngIf="!option.isLeaf || option.children?.length || option.loading" class="ant-cascader-menu-item-expand-icon">
      <i nz-icon [nzType]="option.loading ? 'loading' : getArrowByDirection()"></i>
    </span>
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
  dir: Direction = 'ltr';

  constructor(
    private cdr: ChangeDetectorRef,
    elementRef: ElementRef,
    renderer: Renderer2,
    @Optional() private directionality: Directionality
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-cascader-menu-item');
  }
  ngOnInit(): void {
    this.dir = this.directionality.value;
    this.directionality.change.subscribe((direction: Direction) => {
      this.dir = direction;
    });
  }

  get optionLabel(): string {
    return this.option[this.nzLabelProperty];
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }
  getArrowByDirection(): string {
    if (this.dir === 'rtl') {
      return 'left';
    }
    return 'right';
  }
}
