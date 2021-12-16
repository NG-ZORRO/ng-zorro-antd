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
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';

import { NzCascaderService } from './cascader.service';
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
      <nz-cascader-option-checkbox
        builtin
        [isDisabled]="option.disabled"
        [nzSelectMode]="nzCheckable"
        [isChecked]="cascaderService.checkedOptionsKeySet.has(option.value)"
        [isHalfChecked]="cascaderService.halfCheckedOptionsKeySet.has(option.value)"
        (click)="clickCheckbox($event)"
      ></nz-cascader-option-checkbox>
      <span [innerHTML]="optionLabel | nzHighlight: highlightText:'g':'ant-cascader-menu-item-keyword'"></span>
    </ng-template>
    <span
      *ngIf="!option.isLeaf || option.children?.length || option.loading"
      class="ant-cascader-menu-item-expand-icon"
    >
      <i *ngIf="option.loading; else icon" nz-icon nzType="loading"></i>
      <ng-template #icon>
        <ng-container *nzStringTemplateOutlet="expandIcon">
          <i nz-icon [nzType]="$any(expandIcon)"></i>
        </ng-container>
      </ng-template>
    </span>
  `,
  host: {
    '[attr.title]': 'option.title || optionLabel',
    '[class.ant-cascader-menu-item-active]': 'activated',
    '[class.ant-cascader-menu-item-expand]': '!option.isLeaf',
    '[class.ant-cascader-menu-item-disabled]': 'option.disabled',
    '[class.ant-cascader-menu-item-checkable]': 'nzCheckable'
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
  @Input() nzCheckable: boolean = false;
  @Output() readonly nzCheckboxChange = new EventEmitter<MouseEvent>();

  readonly nativeElement: HTMLElement;

  constructor(
    private cdr: ChangeDetectorRef,
    elementRef: ElementRef,
    renderer: Renderer2,
    public cascaderService: NzCascaderService
  ) {
    renderer.addClass(elementRef.nativeElement, 'ant-cascader-menu-item');
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

  /**
   * check node
   *
   * @param event
   */
  clickCheckbox(event: MouseEvent): void {
    event.preventDefault();
    if (this.option.disabled) {
      return;
    }
    this.nzCheckboxChange.emit(event);
  }

  markForCheck(): void {
    this.cdr.markForCheck();
  }
}
