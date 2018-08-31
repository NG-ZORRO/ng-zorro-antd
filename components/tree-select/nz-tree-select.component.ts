import { BACKSPACE } from '@angular/cdk/keycodes';
import {
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  OverlayRef,
  PositionStrategy
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  forwardRef,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Output,
  Renderer2,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  merge,
  of as observableOf,
  Subscription
} from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { selectDropDownAnimation } from '../core/animation/select-dropdown-animations';
import { selectTagAnimation } from '../core/animation/select-tag-animations';
import { InputBoolean } from '../core/util/convert';
import { NzFormatEmitEvent } from '../tree/interface';
import { NzTreeNode } from '../tree/nz-tree-node';
import { NzTreeComponent } from '../tree/nz-tree.component';

@Component({
  selector   : 'nz-tree-select',
  animations : [ selectDropDownAnimation, selectTagAnimation ],
  templateUrl: './nz-tree-select.component.html',
  providers  : [
    {
      provide    : NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NzTreeSelectComponent),
      multi      : true
    }
  ],
  host       : {
    '[class.ant-select]'            : 'true',
    '[class.ant-select-lg]'         : 'nzSize==="large"',
    '[class.ant-select-sm]'         : 'nzSize==="small"',
    '[class.ant-select-enabled]'    : '!nzDisabled',
    '[class.ant-select-disabled]'   : 'nzDisabled',
    '[class.ant-select-allow-clear]': 'nzAllowClear',
    '[class.ant-select-open]'       : 'nzOpen'
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
export class NzTreeSelectComponent implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {

  private nodes = [];
  isComposing = false;
  isDestroy = true;
  inputValue = '';
  dropDownClassMap: { [ className: string ]: boolean };
  dropDownPosition: 'top' | 'center' | 'bottom' = 'bottom';
  overlayRef: OverlayRef;
  portal: TemplatePortal<{}>;
  positionStrategy: FlexibleConnectedPositionStrategy;
  overlayBackdropClickSubscription: Subscription;
  selectionChangeSubscription: Subscription;

  selectedNodes: NzTreeNode[] = [];
  value: string[] = [];

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
  @Input() nzOpen = false;
  @Input() nzSize = 'default';
  @Input() nzPlaceHolder = '';
  @Input() nzDropdownStyle: { [ key: string ]: string; };
  @Input() nzDefaultExpandedKeys: string[] = [];
  @Input() nzDisplayWith: (node: NzTreeNode) => string = (node: NzTreeNode) => node.title;
  @Output() nzOpenChange = new EventEmitter<boolean>();
  @Output() nzCleared = new EventEmitter<void>();
  @Output() nzRemoved = new EventEmitter<NzTreeNode>();
  @Output() nzExpandChange = new EventEmitter<NzFormatEmitEvent>();
  @Output() nzTreeClick = new EventEmitter<NzFormatEmitEvent>();
  @Output() nzTreeCheckBoxChange = new EventEmitter<NzFormatEmitEvent>();

  @Input()
  set nzNodes(value: NzTreeNode[]) {
    this.nodes = value;
    if (this.treeRef) {
      setTimeout(() => this.updateSelectedNodes(), 0);
    }
  }

  get nzNodes(): NzTreeNode[] {
    return this.nodes;
  }

  @ViewChild('inputElement') inputElement: ElementRef;
  @ViewChild('treeSelect') treeSelect: ElementRef;
  @ViewChild('dropdownTemplate', { read: TemplateRef }) dropdownTemplate;
  @ViewChild('treeRef') treeRef: NzTreeComponent;

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
    @Optional() @Inject(DOCUMENT) private document: any, // tslint:disable-line:no-any
    @Optional() private element: ElementRef,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private overlay: Overlay,
    private viewContainerRef: ViewContainerRef) {
  }

  @HostListener('click')
  trigger(): void {
    if (this.nzDisabled || (!this.nzDisabled && this.nzOpen)) {
      this.closeDropDown();
    } else {
      this.openDropdown();
      if (this.nzShowSearch) {
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
      this.updateDropDownClassMap();
    }
  }

  closeDropDown(): void {
    this.onTouched();
    this.nzOpen = false;
    this.nzOpenChange.emit(this.nzOpen);
    this.updateCdkConnectedOverlayStatus();
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

  setInputValue(value: string): void {
    this.inputValue = value;
    this.updateInputWidth();
    this.updatePosition();
  }

  detachOverlay(): void {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.overlayRef.detach();
      this.overlayBackdropClickSubscription.unsubscribe();
      this.onTouched();
      this.nzOpen = false;
      this.nzOpenChange.emit(this.nzOpen);
    }
  }

  removeSelected(node: NzTreeNode, emit: boolean = true): void {
    node.isSelected = false;
    node.isChecked = false;
    if (this.nzCheckable) {
      this.treeRef.nzTreeService.conduct(node);
      this.treeRef.nzTreeService.setCheckedNodeList(node);
    } else {
      this.treeRef.nzTreeService.setSelectedNodeList(node, this.nzMultiple);
    }
    if (emit) {
      this.nzRemoved.emit(node);
    }
  }

  focusOnInput(): void {
    setTimeout(() => {
      if (this.inputElement) {
        this.inputElement.nativeElement.focus();
      }
    });
  }

  attachOverlay(): void {
    this.portal = new TemplatePortal(this.dropdownTemplate, this.viewContainerRef);
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.portal);
    this.cdr.detectChanges();
    this.overlayBackdropClickSubscription = this.subscribeOverlayBackdropClick();
  }

  getOverlayConfig(): OverlayConfig {
    const overlayWidth = this.treeSelect.nativeElement.getBoundingClientRect().width;
    return new OverlayConfig({
      positionStrategy                                          : this.getOverlayPosition(),
      scrollStrategy                                            : this.overlay.scrollStrategies.reposition(),
      [ this.nzDropdownMatchSelectWidth ? 'width' : 'minWidth' ]: overlayWidth,
      hasBackdrop                                               : true
    });
  }

  getOverlayPosition(): PositionStrategy {
    const positions = [
      new ConnectionPositionPair({ originX: 'start', originY: 'bottom' }, { overlayX: 'start', overlayY: 'top' }),
      new ConnectionPositionPair({ originX: 'start', originY: 'top' }, { overlayX: 'start', overlayY: 'bottom' })
    ];
    this.positionStrategy = this.overlay.position()
    .flexibleConnectedTo(this.treeSelect)
    .withPositions(positions)
    .withFlexibleDimensions(false)
    .withPush(false);
    return this.positionStrategy;
  }

  subscribeOverlayBackdropClick(): Subscription {
    return this.overlayRef.backdropClick()
    .subscribe(() => {
      this.closeDropDown();
    });
  }

  subscribeSelectionChange(): Subscription {
    return merge(
      this.nzTreeClick.pipe(
        tap((event: NzFormatEmitEvent) => {
          const node = event.node;
          if (this.nzCheckable && !node.isDisabled && !node.isDisableCheckbox) {
            node.isChecked = !node.isChecked;
            this.treeRef.nzTreeService.conduct(node);
            this.treeRef.nzTreeService.setCheckedNodeList(node);
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
      if (this.nzShowSearch) {
        this.inputValue = '';
      }
      if (this.isMultiple) {
        this.onChange(value);
        if (this.nzShowSearch) {
          this.focusOnInput();
        }
      } else {
        this.closeDropDown();
        this.onChange(value.length ? value[ 0 ] : null);
      }

    });
  }

  updateSelectedNodes(): void {
    this.selectedNodes = [ ...(this.nzCheckable ? this.treeRef.getCheckedNodeList() : this.treeRef.getSelectedNodeList()) ];
  }

  updatePosition(): void {
    this.overlayRef.updatePosition();
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

  onClearSelection(): void {
    this.selectedNodes.forEach(node => {
      this.removeSelected(node, false);
    });
    this.nzCleared.emit();
    this.closeDropDown();
  }

  updateDropDownClassMap(): void {
    if (this.treeRef && !this.treeRef.nzTreeClass[ 'ant-select-tree' ]) {
      this.treeRef.nzTreeClass = { ...this.treeRef.nzTreeClass, [ 'ant-select-tree' ]: true };
    }
    this.dropDownClassMap = {
      [ 'ant-select-dropdown' ]                     : true,
      [ 'ant-select-tree-dropdown' ]                : true,
      [ `ant-select-dropdown--single` ]             : !this.nzMultiple,
      [ `ant-select-dropdown--multiple` ]           : this.nzMultiple,
      [ `ant-select-dropdown-placement-bottomLeft` ]: this.dropDownPosition === 'bottom',
      [ `ant-select-dropdown-placement-topLeft` ]   : this.dropDownPosition === 'top'
    };
  }

  updateCdkConnectedOverlayStatus(): void {
    const overlayWidth = this.treeSelect.nativeElement.getBoundingClientRect().width;
    if (this.nzDropdownMatchSelectWidth) {
      this.overlayRef.updateSize({ width: overlayWidth });
    } else {
      this.overlayRef.updateSize({ minWidth: overlayWidth });
    }

    if (this.nzOpen) {
      this.renderer.removeStyle(this.overlayRef.backdropElement, 'display');
    } else {
      this.renderer.setStyle(this.overlayRef.backdropElement, 'display', 'none');
    }
  }

  writeValue(value: string[] | string): void {
    if (value) {
      if (this.isMultiple && Array.isArray(value)) {
        this.value = value;
      } else {
        this.value = [ (value as string) ];
      }
      setTimeout(() => this.updateSelectedNodes(), 100);
    } else {
      this.value = [];
      this.selectedNodes.forEach(node => {
        this.removeSelected(node, false);
      });
      this.selectedNodes = [];
    }
  }

  registerOnChange(fn: (_: string[] | string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
  }

  ngOnInit(): void {
    this.isDestroy = false;
    this.selectionChangeSubscription = this.subscribeSelectionChange();
    Promise.resolve().then(() => {
      this.updateDropDownClassMap();
      this.updateCdkConnectedOverlayStatus();
    });
  }

  ngOnDestroy(): void {
    this.isDestroy = true;
    this.detachOverlay();
    this.selectionChangeSubscription.unsubscribe();
    this.overlayBackdropClickSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.attachOverlay();
  }

  setDisabledState(isDisabled: boolean): void {
    this.nzDisabled = isDisabled;
    this.closeDropDown();
  }
}
