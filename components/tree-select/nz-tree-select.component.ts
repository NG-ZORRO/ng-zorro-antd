/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BACKSPACE } from '@angular/cdk/keycodes';
import { CdkConnectedOverlay, CdkOverlayOrigin, ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import {
  forwardRef,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Host,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  Self,
  SimpleChanges,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { merge, of as observableOf, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import {
  isNotNil,
  slideMotion,
  warnDeprecation,
  zoomMotion,
  InputBoolean,
  NzConfigService,
  NzFormatEmitEvent,
  NzNoAnimationDirective,
  NzSizeLDSType,
  NzTreeBase,
  NzTreeBaseService,
  NzTreeHigherOrderServiceToken,
  NzTreeNode,
  NzTreeNodeOptions,
  WithConfig
} from 'ng-zorro-antd/core';
import { NzTreeComponent } from 'ng-zorro-antd/tree';

import { NzTreeSelectService } from './nz-tree-select.service';

export function higherOrderServiceFactory(injector: Injector): NzTreeBaseService {
  return injector.get(NzTreeSelectService);
}

const NZ_CONFIG_COMPONENT_NAME = 'treeSelect';

@Component({
  selector: 'nz-tree-select',
  exportAs: 'nzTreeSelect',
  animations: [slideMotion, zoomMotion],
  templateUrl: './nz-tree-select.component.html',
  providers: [
    NzTreeSelectService,
    {
      provide: NzTreeHigherOrderServiceToken,
      useFactory: higherOrderServiceFactory,
      deps: [[new Self(), Injector]]
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzTreeSelectComponent),
      multi: true
    }
  ],
  host: {
    '[class.ant-select-lg]': 'nzSize==="large"',
    '[class.ant-select-sm]': 'nzSize==="small"',
    '[class.ant-select-enabled]': '!nzDisabled',
    '[class.ant-select-disabled]': 'nzDisabled',
    '[class.ant-select-allow-clear]': 'nzAllowClear',
    '[class.ant-select-open]': 'nzOpen',
    '(click)': 'trigger()'
  },
  styles: [
    `
      .ant-select-dropdown {
        top: 100%;
        left: 0;
        position: relative;
        width: 100%;
        margin-top: 4px;
        margin-bottom: 4px;
        overflow: auto;
      }
    `
  ]
})
export class NzTreeSelectComponent extends NzTreeBase implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {
  @Input() @InputBoolean() nzAllowClear: boolean = true;
  @Input() @InputBoolean() nzShowExpand: boolean = true;
  @Input() @InputBoolean() nzShowLine: boolean = false;
  @Input() @InputBoolean() @WithConfig(NZ_CONFIG_COMPONENT_NAME, true) nzDropdownMatchSelectWidth: boolean;
  @Input() @InputBoolean() nzCheckable: boolean = false;
  @Input() @InputBoolean() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) nzHideUnMatched: boolean;
  @Input() @InputBoolean() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) nzShowIcon: boolean;
  @Input() @InputBoolean() nzShowSearch: boolean = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzAsyncData = false;
  @Input() @InputBoolean() nzMultiple = false;
  @Input() @InputBoolean() nzDefaultExpandAll = false;
  @Input() @InputBoolean() nzCheckStrictly = false;
  @Input() nzExpandedIcon: TemplateRef<{ $implicit: NzTreeNode }>;
  @Input() nzNotFoundContent: string;
  @Input() nzNodes: Array<NzTreeNode | NzTreeNodeOptions> = [];
  @Input() nzOpen = false;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, 'default') nzSize: NzSizeLDSType;
  @Input() nzPlaceHolder = '';
  @Input() nzDropdownStyle: { [key: string]: string };
  /**
   * @deprecated 9.0.0 - use `nzExpandedKeys` instead.
   */
  @Input()
  set nzDefaultExpandedKeys(value: string[]) {
    warnDeprecation(`'nzDefaultExpandedKeys' would be removed in 9.0.0. Please use 'nzExpandedKeys' instead.`);
    this.expandedKeys = value;
  }
  get nzDefaultExpandedKeys(): string[] {
    return this.expandedKeys;
  }

  @Input()
  set nzExpandedKeys(value: string[]) {
    this.expandedKeys = value;
  }
  get nzExpandedKeys(): string[] {
    return this.expandedKeys;
  }

  @Input() nzDisplayWith: (node: NzTreeNode) => string | undefined = (node: NzTreeNode) => node.title;
  @Input() nzMaxTagCount: number;
  @Input() nzMaxTagPlaceholder: TemplateRef<{ $implicit: NzTreeNode[] }>;
  @Output() readonly nzOpenChange = new EventEmitter<boolean>();
  @Output() readonly nzCleared = new EventEmitter<void>();
  @Output() readonly nzRemoved = new EventEmitter<NzTreeNode>();
  @Output() readonly nzExpandChange = new EventEmitter<NzFormatEmitEvent>();
  @Output() readonly nzTreeClick = new EventEmitter<NzFormatEmitEvent>();
  @Output() readonly nzTreeCheckBoxChange = new EventEmitter<NzFormatEmitEvent>();

  @ViewChild('inputElement', { static: false }) inputElement: ElementRef<HTMLInputElement>;
  @ViewChild('treeRef', { static: false }) treeRef: NzTreeComponent;
  @ViewChild(CdkOverlayOrigin, { static: true }) cdkOverlayOrigin: CdkOverlayOrigin;
  @ViewChild(CdkConnectedOverlay, { static: false }) cdkConnectedOverlay: CdkConnectedOverlay;

  @Input() nzTreeTemplate: TemplateRef<{ $implicit: NzTreeNode }>;
  @ContentChild('nzTreeTemplate', { static: true }) nzTreeTemplateChild: TemplateRef<{ $implicit: NzTreeNode }>;
  get treeTemplate(): TemplateRef<{ $implicit: NzTreeNode }> {
    return this.nzTreeTemplate || this.nzTreeTemplateChild;
  }

  triggerWidth: number;
  isComposing = false;
  isDestroy = true;
  isNotFound = false;
  inputValue = '';
  dropDownPosition: 'top' | 'center' | 'bottom' = 'bottom';
  selectionChangeSubscription: Subscription;
  selectedNodes: NzTreeNode[] = [];
  expandedKeys: string[] = [];
  value: string[] = [];

  onChange: (value: string[] | string | null) => void;
  onTouched: () => void = () => null;

  get placeHolderDisplay(): string {
    return this.inputValue || this.isComposing || this.selectedNodes.length ? 'none' : 'block';
  }

  get searchDisplay(): string {
    return this.nzOpen ? 'block' : 'none';
  }

  get isMultiple(): boolean {
    return this.nzMultiple || this.nzCheckable;
  }

  get selectedValueDisplay(): { [key: string]: string } {
    let showSelectedValue = false;
    let opacity = 1;
    if (!this.nzShowSearch) {
      showSelectedValue = true;
    } else {
      if (this.nzOpen) {
        showSelectedValue = !(this.inputValue || this.isComposing);
        if (showSelectedValue) {
          opacity = 0.4;
        }
      } else {
        showSelectedValue = true;
      }
    }
    return {
      display: showSelectedValue ? 'block' : 'none',
      opacity: `${opacity}`
    };
  }

  constructor(
    nzTreeService: NzTreeSelectService,
    public nzConfigService: NzConfigService,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private elementRef: ElementRef,
    @Host() @Optional() public noAnimation?: NzNoAnimationDirective
  ) {
    super(nzTreeService);
    this.renderer.addClass(this.elementRef.nativeElement, 'ant-select');
  }

  ngOnInit(): void {
    this.isDestroy = false;
    this.selectionChangeSubscription = this.subscribeSelectionChange();
  }

  ngOnDestroy(): void {
    this.isDestroy = true;
    this.closeDropDown();
    this.selectionChangeSubscription.unsubscribe();
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
    this.closeDropDown();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('nzNodes')) {
      this.updateSelectedNodes(true);
    }
  }

  writeValue(value: string[] | string): void {
    if (isNotNil(value)) {
      if (this.isMultiple && Array.isArray(value)) {
        this.value = value;
      } else {
        this.value = [value as string];
      }
      this.updateSelectedNodes(true);
    } else {
      this.value = [];
      this.selectedNodes.forEach(node => {
        this.removeSelected(node, false);
      });
      this.selectedNodes = [];
    }
    this.cdr.markForCheck();
  }

  registerOnChange(fn: (_: string[] | string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  trigger(): void {
    if (this.nzDisabled || (!this.nzDisabled && this.nzOpen)) {
      this.closeDropDown();
    } else {
      this.openDropdown();
      if (this.nzShowSearch || this.isMultiple) {
        this.focusOnInput();
      }
    }
  }

  openDropdown(): void {
    if (!this.nzDisabled) {
      this.nzOpen = true;
      this.nzOpenChange.emit(this.nzOpen);
      this.updateCdkConnectedOverlayStatus();
      this.updatePosition();
    }
  }

  closeDropDown(): void {
    this.onTouched();
    this.nzOpen = false;
    this.nzOpenChange.emit(this.nzOpen);
    this.cdr.markForCheck();
  }

  onKeyDownInput(e: KeyboardEvent): void {
    const keyCode = e.keyCode;
    const eventTarget = e.target as HTMLInputElement;
    if (this.isMultiple && !eventTarget.value && keyCode === BACKSPACE) {
      e.preventDefault();
      if (this.selectedNodes.length) {
        const removeNode = this.selectedNodes[this.selectedNodes.length - 1];
        this.removeSelected(removeNode);
        this.nzTreeService!.triggerEventChange$!.next({
          eventName: 'removeSelect',
          node: removeNode
        });
      }
    }
  }

  onExpandedKeysChange(value: NzFormatEmitEvent): void {
    this.nzExpandChange.emit(value);
    this.expandedKeys = [...value.keys!];
  }

  setInputValue(value: string): void {
    this.inputValue = value;
    this.updateInputWidth();
    this.updatePosition();
  }

  removeSelected(node: NzTreeNode, emit: boolean = true, event?: MouseEvent): void {
    node.isSelected = false;
    node.isChecked = false;
    if (this.nzCheckable) {
      this.nzTreeService.conduct(node);
    } else {
      this.nzTreeService.setSelectedNodeList(node, this.nzMultiple);
    }

    if (emit) {
      this.nzRemoved.emit(node);
    }

    // Do not trigger the popup
    if (event && event.stopPropagation) {
      event.stopPropagation();
    }
  }

  focusOnInput(): void {
    setTimeout(() => {
      if (this.inputElement) {
        this.inputElement.nativeElement.focus();
      }
    });
  }

  subscribeSelectionChange(): Subscription {
    return merge(
      this.nzTreeClick.pipe(
        tap((event: NzFormatEmitEvent) => {
          const node = event.node!;
          if (this.nzCheckable && !node.isDisabled && !node.isDisableCheckbox) {
            node.isChecked = !node.isChecked;
            node.isHalfChecked = false;
            if (!this.nzCheckStrictly) {
              this.nzTreeService.conduct(node);
            }
          }
          if (this.nzCheckable) {
            node.isSelected = false;
          }
        }),
        filter((event: NzFormatEmitEvent) => {
          const node = event.node!;
          return this.nzCheckable ? !node.isDisabled && !node.isDisableCheckbox : !node.isDisabled && node.isSelectable;
        })
      ),
      this.nzCheckable ? this.nzTreeCheckBoxChange : observableOf(),
      this.nzCleared,
      this.nzRemoved
    ).subscribe(() => {
      this.updateSelectedNodes();
      const value = this.selectedNodes.map(node => node.key!);
      this.value = [...value];
      if (this.nzShowSearch || this.isMultiple) {
        this.inputValue = '';
        this.isNotFound = false;
      }
      if (this.isMultiple) {
        this.onChange(value);
        this.focusOnInput();
        this.updatePosition();
      } else {
        this.closeDropDown();
        this.onChange(value.length ? value[0] : null);
      }
    });
  }

  updateSelectedNodes(init: boolean = false): void {
    if (init) {
      const nodes = this.coerceTreeNodes(this.nzNodes);
      this.nzTreeService.isMultiple = this.isMultiple;
      this.nzTreeService.isCheckStrictly = this.nzCheckStrictly;
      this.nzTreeService.initTree(nodes);
      if (this.nzCheckable) {
        this.nzTreeService.calcCheckedKeys(this.value, nodes, this.nzCheckStrictly);
      } else {
        this.nzTreeService.calcSelectedKeys(this.value, nodes, this.isMultiple);
      }
    }

    this.selectedNodes = [...(this.nzCheckable ? this.getCheckedNodeList() : this.getSelectedNodeList())];
  }

  updatePosition(): void {
    setTimeout(() => {
      if (this.cdkConnectedOverlay && this.cdkConnectedOverlay.overlayRef) {
        this.cdkConnectedOverlay.overlayRef.updatePosition();
      }
    });
  }

  onPositionChange(position: ConnectedOverlayPositionChange): void {
    this.dropDownPosition = position.connectionPair.originY;
  }

  updateInputWidth(): void {
    if (this.isMultiple && this.inputElement) {
      if (this.inputValue || this.isComposing) {
        this.renderer.setStyle(
          this.inputElement.nativeElement,
          'width',
          `${this.inputElement.nativeElement.scrollWidth}px`
        );
      } else {
        this.renderer.removeStyle(this.inputElement.nativeElement, 'width');
      }
    }
  }

  onClearSelection($event: MouseEvent): void {
    $event.stopPropagation();
    $event.preventDefault();
    this.selectedNodes.forEach(node => {
      this.removeSelected(node, false);
    });
    this.nzCleared.emit();
  }

  setSearchValues($event: NzFormatEmitEvent): void {
    Promise.resolve().then(() => {
      this.isNotFound = (this.nzShowSearch || this.isMultiple) && !!this.inputValue && $event.matchedKeys!.length === 0;
    });
  }

  updateCdkConnectedOverlayStatus(): void {
    this.triggerWidth = this.cdkOverlayOrigin.elementRef.nativeElement.getBoundingClientRect().width;
  }

  trackValue(_index: number, option: NzTreeNode): string {
    return option.key!;
  }
}
