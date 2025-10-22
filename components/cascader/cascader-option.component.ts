/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction } from '@angular/cdk/bidi';
import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation,
  booleanAttribute,
  inject,
  numberAttribute,
  ChangeDetectorRef
} from '@angular/core';

import { NzHighlightPipe } from 'ng-zorro-antd/core/highlight';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzTreeNode } from 'ng-zorro-antd/core/tree';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzCascaderOption } from './typings';

@Component({
  selector: '[nz-cascader-option]',
  exportAs: 'nzCascaderOption',
  imports: [NgTemplateOutlet, NzHighlightPipe, NzIconModule, NzOutletModule],
  template: `
    @if (checkable) {
      <span
        class="ant-cascader-checkbox"
        [class.ant-cascader-checkbox-checked]="checked"
        [class.ant-cascader-checkbox-indeterminate]="halfChecked"
        [class.ant-cascader-checkbox-disabled]="disabled"
        (click)="onCheckboxClick($event)"
      >
        <span class="ant-cascader-checkbox-inner"></span>
      </span>
    }

    @if (optionTemplate) {
      <ng-template
        [ngTemplateOutlet]="optionTemplate"
        [ngTemplateOutletContext]="{ $implicit: node.origin, index: columnIndex }"
      />
    } @else {
      <div
        class="ant-cascader-menu-item-content"
        [innerHTML]="node.title | nzHighlight: highlightText : 'g' : 'ant-cascader-menu-item-keyword'"
      ></div>
    }

    @if (!node.isLeaf || node.children?.length || node.isLoading) {
      <div class="ant-cascader-menu-item-expand-icon">
        @if (node.isLoading) {
          <nz-icon nzType="loading" />
        } @else {
          <ng-container *nzStringTemplateOutlet="expandIcon">
            <nz-icon [nzType]="$any(expandIcon)" />
          </ng-container>
        }
      </div>
    }
  `,
  host: {
    class: 'ant-cascader-menu-item ant-cascader-menu-item-expanded',
    '[attr.title]': 'node.title',
    '[class.ant-cascader-menu-item-active]': 'activated',
    '[class.ant-cascader-menu-item-expand]': '!node.isLeaf',
    '[class.ant-cascader-menu-item-disabled]': 'node.isDisabled'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzCascaderOptionComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);

  @Input() optionTemplate: TemplateRef<NzCascaderOption> | null = null;
  @Input() node!: NzTreeNode;
  @Input() activated = false;
  @Input() highlightText!: string;
  @Input() nzLabelProperty = 'label';
  @Input({ transform: numberAttribute }) columnIndex!: number;
  @Input() expandIcon: string | TemplateRef<void> = '';
  @Input() dir: Direction = 'ltr';
  @Input({ transform: booleanAttribute }) checkable?: boolean = false;

  @Output() readonly check = new EventEmitter<void>();

  public readonly nativeElement: HTMLElement = inject(ElementRef).nativeElement;

  ngOnInit(): void {
    if (this.expandIcon === '' && this.dir === 'rtl') {
      this.expandIcon = 'left';
    } else if (this.expandIcon === '') {
      this.expandIcon = 'right';
    }
  }

  get checked(): boolean {
    return this.node.isChecked;
  }

  get halfChecked(): boolean {
    return this.node.isHalfChecked;
  }

  get disabled(): boolean {
    return this.node.isDisabled || this.node.isDisableCheckbox;
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  onCheckboxClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
    if (!this.checkable) {
      return;
    }
    this.check.emit();
  }
}
