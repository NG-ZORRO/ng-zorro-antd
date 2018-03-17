import { Overlay } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  EventEmitter,
  Inject,
  Injector,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { measureScrollbar } from '../core/util/mesure-scrollbar';
import { NzI18nService } from '../i18n/nz-i18n.service';

import ModalUtil from './modal-util';
import { NzModalRef } from './nz-modal-ref.class';
import { ModalButtonOptions, ModalOptions, ModalType, OnClickCallback } from './nz-modal.type';

export const MODAL_ANIMATE_DURATION = 200; // Duration when perform animations (ms)

interface ClassMap {
  [index: string]: boolean;
}

type AnimationState = 'enter' | 'leave' | null;

@Component({
  selector   : 'nz-modal',
  templateUrl: './nz-modal.component.html'
})

// tslint:disable-next-line:no-any
export class NzModalComponent<T = any, R = any> extends NzModalRef<T, R> implements OnInit, OnChanges, AfterViewInit, ModalOptions {
  @Input() nzModalType: ModalType = 'default';
  @Input() nzContent: string | TemplateRef<{}> | Type<T>; // [STATIC] If not specified, will use <ng-content>
  @Input() nzComponentParams: object; // [STATIC] ONLY avaliable when nzContent is a component
  @Input() nzFooter: string | TemplateRef<{}> | Array<ModalButtonOptions<T>>; // [STATIC] Default Modal ONLY
  @Input() nzGetContainer: HTMLElement | (() => HTMLElement) = () => this.overlay.create().overlayElement; // [STATIC]

  @Input() nzVisible = false;
  @Output() nzVisibleChange = new EventEmitter<boolean>();
  @Input() nzZIndex: number = 1000;
  @Input() nzWidth: number | string = 520;
  @Input() nzWrapClassName: string;
  @Input() nzClassName: string;
  @Input() nzStyle: object;
  @Input() nzIconType: string = 'question-circle'; // Confirm Modal ONLY
  @Input() nzTitle: string | TemplateRef<{}>;
  @Input() nzClosable = true;
  @Input() nzMask = true;
  @Input() nzMaskClosable = true;
  @Input() nzMaskStyle: object;
  @Input() nzBodyStyle: object;
  @Output() nzAfterClose = new EventEmitter<R | undefined>(); // Trigger when modal is hidden

  // --- Predefined OK & Cancel buttons
  @Input() nzOkText: string;
  @Input() nzOkType = 'primary';
  @Input() nzOkLoading = false;
  @Input() @Output() nzOnOk: EventEmitter<T | undefined> | OnClickCallback<T | undefined> = new EventEmitter<T | undefined>();
  @ViewChild('autoFocusButtonOk', { read: ElementRef }) autoFocusButtonOk: ElementRef; // Only aim to focus the ok button that needs to be auto focused
  @Input() nzCancelText: string;
  @Input() nzCancelLoading = false;
  @Input() @Output() nzOnCancel: EventEmitter<T | undefined> | OnClickCallback<T | undefined> = new EventEmitter<T | undefined>();

  @ViewChild('modalContainer') modalContainer: ElementRef;
  @ViewChild('bodyContainer', { read: ViewContainerRef }) bodyContainer: ViewContainerRef;

  get hidden(): boolean {
    return !this.nzVisible && !this.animationState;
  } // Indicate whether this dialog should hidden
  maskAnimationClassMap: object;
  modalAnimationClassMap: object;
  transformOrigin = '0px 0px 0px'; // The origin point that animation based on

  private contentComponentRef: ComponentRef<T>; // Handle the reference when using nzContent as Component
  private animationState: AnimationState; // Current animation state

  constructor(private overlay: Overlay,
              private locale: NzI18nService,
              private renderer: Renderer2,
              private cfr: ComponentFactoryResolver,
              private elementRef: ElementRef,
              private viewContainer: ViewContainerRef,
              @Inject(DOCUMENT) private document: any // tslint:disable-line:no-any
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.isComponent(this.nzContent)) {
      this.createDynamicComponent(this.nzContent as Type<T>); // Create component along without View
    }

    if (this.isModalButtons(this.nzFooter)) { // Setup default button options
      this.nzFooter = this.formatModalButtons(this.nzFooter as Array<ModalButtonOptions<T>>);
    }

    const container = typeof this.nzGetContainer === 'function' ? this.nzGetContainer() : this.nzGetContainer;
    if (container instanceof HTMLElement) {
      container.appendChild(this.elementRef.nativeElement);
    }
  }

  // [NOTE] NOT available when using by service!
  // Because ngOnChanges never be called when using by service,
  // here we can't support "nzContent"(Component) etc. as inputs that initialized dynamically.
  // BUT: User also can change "nzContent" dynamically to trigger UI changes (provided you don't use Component that needs initializations)
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzVisible) {
      this.changeBodyOverflow(this.nzVisible);
      if (!changes.nzVisible.firstChange) { // Do not trigger animation while initializing
        this.animateTo(this.nzVisible);
      }
    }
  }

  ngAfterViewInit(): void {
    // If using Component, it is the time to attach View while bodyContainer is ready
    if (this.contentComponentRef) {
      this.bodyContainer.insert(this.contentComponentRef.hostView);
    }

    if (this.autoFocusButtonOk) {
      (this.autoFocusButtonOk.nativeElement as HTMLButtonElement).focus();
    }
  }

  open(): void {
    this.changeVisibleFromInside(true);
  }

  close(result?: R): void {
    this.changeVisibleFromInside(false).then(() => this.nzAfterClose.emit(result));
  }

  destroy(result?: R): void { // Destroy equals Close
    this.close(result);
  }

  afterClose(): Observable<R | undefined> {
    return this.nzAfterClose.asObservable();
  }

  getInstance(): NzModalComponent {
    return this;
  }

  getContentComponentRef(): ComponentRef<T> {
    return this.contentComponentRef;
  }

  getContentComponent(): T {
    return this.contentComponentRef && this.contentComponentRef.instance;
  }

  getElement(): HTMLElement {
    return this.elementRef && this.elementRef.nativeElement;
  }

  onClickMask($event: MouseEvent): void {
    if (this.nzMask && this.nzMaskClosable && ($event.target as HTMLElement).classList.contains('ant-modal-wrap')) {
      this.onClickOkCancel('cancel');
    }
  }

  isModalType(type: ModalType): boolean {
    return this.nzModalType === type;
  }

  private onClickCloseBtn(): void {
    this.onClickOkCancel('cancel');
  }

  private onClickOkCancel(type: 'ok' | 'cancel'): void {
    const trigger = { 'ok': this.nzOnOk, 'cancel': this.nzOnCancel }[ type ];
    const loadingKey = { 'ok': 'nzOkLoading', 'cancel': 'nzCancelLoading' }[ type ];
    if (trigger instanceof EventEmitter) {
      trigger.emit(this.getContentComponent());
    } else if (typeof trigger === 'function') {
      const result = trigger(this.getContentComponent());
      const caseClose = (doClose: boolean | void | {}) => (doClose !== false) && this.close(); // Users can return "false" to prevent closing by default
      if (isPromise(result)) {
        this[ loadingKey ] = true;
        const handleThen = (doClose) => {
          this[ loadingKey ] = false;
          caseClose(doClose);
        };
        (result as Promise<void>).then(handleThen).catch(handleThen);
      } else {
        caseClose(result);
      }
    }
  }

  private isNonEmptyString(value: {}): boolean {
    return typeof value === 'string' && value !== '';
  }

  private isTemplateRef(value: {}): boolean {
    return value instanceof TemplateRef;
  }

  private isComponent(value: {}): boolean {
    return value instanceof Type;
  }

  private isModalButtons(value: {}): boolean {
    return Array.isArray(value) && value.length > 0;
  }

  // Lookup a button's property, if the prop is a function, call & then return the result, otherwise, return itself.
  private getButtonCallableProp(options: ModalButtonOptions<T>, prop: string): {} {
    const value = options[ prop ];
    const args = [];
    if (this.contentComponentRef) {
      args.push(this.contentComponentRef.instance);
    }
    return typeof value === 'function' ? value.apply(options, args) : value;
  }

  // On nzFooter's modal button click
  private onButtonClick(button: ModalButtonOptions<T>): void {
    const result = this.getButtonCallableProp(button, 'onClick'); // Call onClick directly
    if (isPromise(result)) {
      button.loading = true;
      (result as Promise<{}>).then(() => button.loading = false).catch(() => button.loading = false);
    }
  }

  // Change nzVisible from inside
  private changeVisibleFromInside(visible: boolean): Promise<void> {
    if (this.nzVisible !== visible) {
      // Change nzVisible value immediately
      this.nzVisible = visible;
      this.changeBodyOverflow(this.nzVisible);
      this.nzVisibleChange.emit(visible);
      return this.animateTo(visible);
    }
    return Promise.resolve();
  }

  private changeAnimationState(state: AnimationState): void {
    this.animationState = state;
    if (state) {
      this.maskAnimationClassMap = {
        [ `fade-${state}` ]       : true,
        [ `fade-${state}-active` ]: true
      };
      this.modalAnimationClassMap = {
        [ `zoom-${state}` ]       : true,
        [ `zoom-${state}-active` ]: true
      };
    } else {
      this.maskAnimationClassMap = this.modalAnimationClassMap = null;
    }
  }

  private animateTo(isVisible: boolean): Promise<void> {
    if (isVisible) { // Figure out the lastest click position when shows up
      window.setTimeout(() => this.updateTransformOrigin()); // [NOTE] Using timeout due to the document.click event is fired later than visible change, so if not postponed to next event-loop, we can't get the lastest click position
    }

    this.changeAnimationState(isVisible ? 'enter' : 'leave');
    return new Promise((resolve) => window.setTimeout(() => { // Return when animation is over
      this.changeAnimationState(null);
      resolve();
    }, MODAL_ANIMATE_DURATION));
  }

  private formatModalButtons(buttons: Array<ModalButtonOptions<T>>): Array<ModalButtonOptions<T>> {
    return buttons.map((button) => {
      const mixedButton = {
        ...{
          type       : 'default',
          size       : 'default',
          autoLoading: true,
          show       : true,
          loading    : false,
          disabled   : false
        },
        ...button
      };

      // if (mixedButton.autoLoading) { mixedButton.loading = false; } // Force loading to false when autoLoading=true

      return mixedButton;
    });
  }

  /**
   * Create a component dynamically but not attach to any View (this action will be executed when bodyContainer is ready)
   * @param component Component class
   */
  private createDynamicComponent(component: Type<T>): void {
    const factory = this.cfr.resolveComponentFactory(component);
    const childInjector = Injector.create({
      providers: [ { provide : NzModalRef, useValue: this } ],
      parent: this.viewContainer.parentInjector
    });
    this.contentComponentRef = factory.create(childInjector);
    if (this.nzComponentParams) {
      Object.assign(this.contentComponentRef.instance, this.nzComponentParams);
    }
    // Do the first change detection immediately (or we do detection at ngAfterViewInit, multi-changes error will be thrown)
    this.contentComponentRef.changeDetectorRef.detectChanges();
  }

  // Update transform-origin to the last click position on document
  private updateTransformOrigin(): void {
    const modalElement = this.modalContainer.nativeElement as HTMLElement;
    const lastPosition = ModalUtil.getLastClickPosition();
    if (lastPosition) {
      this.transformOrigin = `${lastPosition.x - modalElement.offsetLeft}px ${lastPosition.y - modalElement.offsetTop}px 0px`;
    }
    // else {
    //   this.transformOrigin = '0px 0px 0px';
    // }
  }

  private changeBodyOverflow(visible: boolean): void {
    const countKey = 'data-modal-count';
    let countValue = parseInt(this.document.body.attributes.getNamedItem(countKey) && this.document.body.attributes.getNamedItem('data-modal-count').value || 0, 10);
    if (visible) {
      countValue += 1;
    } else {
      countValue = (countValue - 1 >= 0) ? (countValue - 1) : 0;
    }
    if (countValue) {
      const scrollBarWidth = measureScrollbar();
      this.renderer.setStyle(this.document.body, 'padding-right', `${scrollBarWidth}px`);
      this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
    } else {
      this.renderer.removeStyle(this.document.body, 'padding-right');
      this.renderer.removeStyle(this.document.body, 'overflow');
    }
    this.renderer.setAttribute(this.document.body, countKey, `${countValue}`);
  }
}

////////////

function isPromise(obj: {} | void): boolean {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof (obj as Promise<{}>).then === 'function' && typeof (obj as Promise<{}>).catch === 'function';
}
