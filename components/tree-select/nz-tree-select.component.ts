import { BACKSPACE } from '@angular/cdk/keycodes';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedOverlayPositionChange
} from '@angular/cdk/overlay';
import {
  forwardRef,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  merge,
  of as observableOf,
  Subscription
} from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { slideMotion } from '../core/animation/slide';
import { zoomMotion } from '../core/animation/zoom';
import { InputBoolean } from '../core/util/convert';
import { NzFormatEmitEvent } from '../tree/interface';
import { NzTreeNode, NzTreeNodeOptions } from '../tree/nz-tree-node';
import { NzTreeComponent } from '../tree/nz-tree.component';
import { NzTreeSelectService } from './nz-tree-select.service';

@Component({
  selector   : 'nz-tree-select',
  animations : [ slideMotion, zoomMotion ],
  templateUrl: './nz-tree-select.component.html',
  providers  : [
    NzTreeSelectService,
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzTreeSelectComponent),
      multi      : true
    }
  ],
  host       : {
    '[class.ant-select-lg]'         : 'nzSize==="large"',
    '[class.ant-select-sm]'         : 'nzSize==="small"',
    '[class.ant-select-enabled]'    : '!nzDisabled',
    '[class.ant-select-disabled]'   : 'nzDisabled',
    '[class.ant-select-allow-clear]': 'nzAllowClear',
    '[class.ant-select-open]'       : 'nzOpen',
    '(click)'                       : 'trigger()'
  },
  styles     : [ `
    .ant-select-dropdown {
      top: 100%;
      left: 0;
      position: relative;
      width: 100%;
      margin-top: 4px;
      margin-bottom: 4px;
      overflow: auto;
    }
  ` ]
})
export class NzTreeSelectComponent implements ControlValueAccessor, OnInit, OnDestroy, OnChanges {

  @Input() @InputBoolean() nzAllowClear = true;
  @Input() @InputBoolean() nzShowExpand = true;
  @Input() @InputBoolean() nzDropdownMatchSelectWidth = true;
  @Input() @InputBoolean() nzCheckable = false;
  @Input() @InputBoolean() nzShowSearch = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Input() @InputBoolean() nzShowLine = false;
  @Input() @InputBoolean() nzAsyncData = false;
  @Input() @InputBoolean() nzMultiple = false;
  @Input() @InputBoolean() nzDefaultExpandAll = false;
  @Input() nzNotFoundContent: string;
  @Input() nzNodes: Array<NzTreeNode | NzTreeNodeOptions> = [];
  @Input() nzOpen = false;
  @Input() nzSize = 'default';
  @Input() nzPlaceHolder = '';
  @Input() nzDropdownStyle: { [ key: string ]: string; };
  @Input() nzDefaultExpandedKeys: string[] = [];
  @Input() nzDisplayWith: (node: NzTreeNode) => string = (node: NzTreeNode) => node.title;
  @Output() readonly nzOpenChange = new EventEmitter<boolean>();
  @Output() readonly nzCleared = new EventEmitter<void>();
  @Output() readonly nzRemoved = new EventEmitter<NzTreeNode>();
  @Output() readonly nzExpandChange = new EventEmitter<NzFormatEmitEvent>();
  @Output() readonly nzTreeClick = new EventEmitter<NzFormatEmitEvent>();
  @Output() readonly nzTreeCheckBoxChange = new EventEmitter<NzFormatEmitEvent>();

  @ViewChild('inputElement') inputElement: ElementRef;
  @ViewChild('treeRef') treeRef: NzTreeComponent;
  @ViewChild(CdkOverlayOrigin) cdkOverlayOrigin: CdkOverlayOrigin;
  @ViewChild(CdkConnectedOverlay) cdkConnectedOverlay: CdkConnectedOverlay;

  triggerWidth: number;
  isComposing = false;
  isDestroy = true;
  isNotFound = false;
  inputValue = '';
  dropDownPosition: 'top' | 'center' | 'bottom' = 'bottom';
  selectionChangeSubscription: Subscription;
  selectedNodes: NzTreeNode[] = [];
  value: string[] = [];

  onChange: (value: string[] | string) => void;
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

  get selectedValueDisplay(): { [ key: string ]: string } {
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
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private nzTreeService: NzTreeSelectService,
    private elementRef: ElementRef) {
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
    if (value) {
      if (this.isMultiple && Array.isArray(value)) {
        this.value = value;
      } else {
        this.value = [ (value as string) ];
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

  registerOnChange(fn: (_: string[] | string) => void): void {
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
    if (
      this.isMultiple &&
      !eventTarget.value &&
      keyCode === BACKSPACE
    ) {
      e.preventDefault();
      if (this.selectedNodes.length) {
        this.removeSelected(this.selectedNodes[ this.selectedNodes.length - 1 ]);
      }
    }
  }

  onExpandedKeysChange(value: NzFormatEmitEvent): void {
    this.nzExpandChange.emit(value);
    this.nzDefaultExpandedKeys = [ ...value.keys ];
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
      this.nzTreeService.setCheckedNodeList(node);
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
          const node = event.node;
          if (this.nzCheckable && !node.isDisabled && !node.isDisableCheckbox) {
            node.isChecked = !node.isChecked;
            this.nzTreeService.conduct(node);
            this.nzTreeService.setCheckedNodeList(node);
          }
          if (this.nzCheckable) {
            node.isSelected = false;
          }
        }),
        filter((event: NzFormatEmitEvent) => {
          return this.nzCheckable ? (!event.node.isDisabled && !event.node.isDisableCheckbox) : !event.node.isDisabled;
        })
      ),
      this.nzCheckable ? this.nzTreeCheckBoxChange : observableOf(),
      this.nzCleared,
      this.nzRemoved
    ).subscribe(() => {
      this.updateSelectedNodes();
      const value = this.selectedNodes.map(node => node.key);
      this.value = [ ...value ];
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
        this.onChange(value.length ? value[ 0 ] : null);
      }

    });
  }

  updateSelectedNodes(init: boolean = false): void {
    if (init) {
      const nodes = this.nzNodes.map(item => new NzTreeNode(item));
      this.nzTreeService.initTree(nodes);
      if (this.nzCheckable) {
        this.nzTreeService.calcCheckedKeys(this.value, nodes);
      } else {
        this.nzTreeService.calcSelectedKeys(this.value, nodes);
      }
    }
    this.selectedNodes = [ ...(this.nzCheckable ? this.nzTreeService.getCheckedNodeList() : this.nzTreeService.getSelectedNodeList()) ];
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
        this.renderer.setStyle(this.inputElement.nativeElement, 'width', `${this.inputElement.nativeElement.scrollWidth}px`);
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
      this.isNotFound = (this.nzShowSearch || this.isMultiple)
        && this.inputValue
        && $event.matchedKeys.length === 0;
    });
  }

  updateCdkConnectedOverlayStatus(): void {
    this.triggerWidth = this.cdkOverlayOrigin.elementRef.nativeElement.getBoundingClientRect().width;
  }

  trackValue(_index: number, option: NzTreeNode): string {
    return option.key;
  }
}
