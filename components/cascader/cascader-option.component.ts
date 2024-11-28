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
  ViewEncapsulation,
  numberAttribute,
  inject,
  Output,
  EventEmitter,
  booleanAttribute
} from '@angular/core';

import { NzCascaderService } from 'ng-zorro-antd/cascader/cascader.service';
import { NzHighlightModule } from 'ng-zorro-antd/core/highlight';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzCascaderOption } from './typings';
import { getOptionKey } from './utils';

@Component({
  standalone: true,
  selector: '[nz-cascader-option]',
  exportAs: 'nzCascaderOption',
  imports: [NgTemplateOutlet, NzHighlightModule, NzIconModule, NzOutletModule],
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzCascaderOptionComponent implements OnInit {
  @Input() optionTemplate: TemplateRef<NzCascaderOption> | null = null;
  @Input() option!: NzCascaderOption;
  @Input() activated = false;
  @Input() highlightText!: string;
  @Input() nzLabelProperty = 'label';
  @Input({ transform: numberAttribute }) columnIndex!: number;
  @Input() expandIcon: string | TemplateRef<void> = '';
  @Input() dir: Direction = 'ltr';
  @Input({ transform: booleanAttribute }) checkable?: boolean = false;

  @Output() readonly check = new EventEmitter<void>();

  // public key!: string;
  public readonly nativeElement: HTMLElement = inject(ElementRef).nativeElement;
  private cascaderService = inject(NzCascaderService);

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.expandIcon === '' && this.dir === 'rtl') {
      this.expandIcon = 'left';
    } else if (this.expandIcon === '') {
      this.expandIcon = 'right';
    }
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   const { option, prevValuePath } = changes;
  //   if ((option || prevValuePath) && option?.currentValue && prevValuePath?.currentValue) {
  //     const fullPath = [...prevValuePath.currentValue, this.cascaderService.getOptionValue(option.currentValue)];
  //     this.key = toPathKey(fullPath);
  //   }
  // }

  get checked(): boolean {
    return this.cascaderService.checkedOptionsKeySet.has(getOptionKey(this.option));
  }

  get halfChecked(): boolean {
    return this.cascaderService.halfCheckedOptionsKeySet.has(getOptionKey(this.option));
  }

  get disabled(): boolean {
    return false;
  }

  get optionLabel(): string {
    return this.option[this.nzLabelProperty];
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }

  onCheckboxClick(event: MouseEvent): void {
    event.preventDefault();
    if (!this.checkable) {
      return;
    }
    this.check.emit();
  }
}
