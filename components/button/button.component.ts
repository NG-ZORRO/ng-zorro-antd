/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Direction, Directionality } from '@angular/cdk/bidi';
import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  DestroyRef,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  signal
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { filter, startWith } from 'rxjs/operators';

import { NzConfigKey, onConfigChangeEventForComponent, WithConfig } from 'ng-zorro-antd/core/config';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';
import { NzIconDirective, NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_SPACE_COMPACT_ITEM_TYPE, NZ_SPACE_COMPACT_SIZE, NzSpaceCompactItemDirective } from 'ng-zorro-antd/space';

export type NzButtonType = 'primary' | 'default' | 'dashed' | 'link' | 'text' | null;
export type NzButtonShape = 'circle' | 'round' | null;
export type NzButtonSize = NzSizeLDSType;

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'button';

@Component({
  selector: 'button[nz-button], a[nz-button]',
  exportAs: 'nzButton',
  imports: [NzIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  template: `
    @if (nzLoading) {
      <nz-icon nzType="loading" />
    }
    <ng-content></ng-content>
  `,
  host: {
    class: 'ant-btn',
    '[class.ant-btn-default]': `nzType === 'default'`,
    '[class.ant-btn-primary]': `nzType === 'primary'`,
    '[class.ant-btn-dashed]': `nzType === 'dashed'`,
    '[class.ant-btn-link]': `nzType === 'link'`,
    '[class.ant-btn-text]': `nzType === 'text'`,
    '[class.ant-btn-circle]': `nzShape === 'circle'`,
    '[class.ant-btn-round]': `nzShape === 'round'`,
    '[class.ant-btn-lg]': `finalSize() === 'large'`,
    '[class.ant-btn-sm]': `finalSize() === 'small'`,
    '[class.ant-btn-dangerous]': `nzDanger`,
    '[class.ant-btn-loading]': `nzLoading`,
    '[class.ant-btn-background-ghost]': `nzGhost`,
    '[class.ant-btn-block]': `nzBlock`,
    '[class.ant-input-search-button]': `nzSearch`,
    '[class.ant-btn-rtl]': `dir === 'rtl'`,
    '[class.ant-btn-icon-only]': `iconOnly`,
    '[attr.tabindex]': 'disabled ? -1 : (tabIndex === null ? null : tabIndex)',
    '[attr.disabled]': 'disabled || null'
  },
  hostDirectives: [NzSpaceCompactItemDirective],
  providers: [{ provide: NZ_SPACE_COMPACT_ITEM_TYPE, useValue: 'btn' }]
})
export class NzButtonComponent implements OnChanges, AfterViewInit, AfterContentInit, OnInit {
  private elementRef = inject(ElementRef);
  private cdr = inject(ChangeDetectorRef);
  private renderer = inject(Renderer2);
  private directionality = inject(Directionality);
  private destroyRef = inject(DestroyRef);
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  @ContentChild(NzIconDirective, { read: ElementRef }) nzIconDirectiveElement!: ElementRef;
  @Input({ transform: booleanAttribute }) nzBlock: boolean = false;
  @Input({ transform: booleanAttribute }) nzGhost: boolean = false;
  @Input({ transform: booleanAttribute }) nzSearch: boolean = false;
  @Input({ transform: booleanAttribute }) nzLoading: boolean = false;
  @Input({ transform: booleanAttribute }) nzDanger: boolean = false;
  @Input({ transform: booleanAttribute }) disabled: boolean = false;
  @Input() tabIndex: number | string | null = null;
  @Input() nzType: NzButtonType = null;
  @Input() nzShape: NzButtonShape = null;
  @Input() @WithConfig() nzSize: NzButtonSize = 'default';
  dir: Direction = 'ltr';

  protected finalSize = computed(() => {
    if (this.compactSize) {
      return this.compactSize();
    }
    return this.size();
  });

  private size = signal<NzSizeLDSType>(this.nzSize);
  private compactSize = inject(NZ_SPACE_COMPACT_SIZE, { optional: true });
  private loading$ = new Subject<boolean>();

  insertSpan(nodes: NodeList, renderer: Renderer2): void {
    nodes.forEach(node => {
      if (node.nodeName === '#text') {
        const span = renderer.createElement('span');
        const parent = renderer.parentNode(node);
        renderer.insertBefore(parent, span, node);
        renderer.appendChild(span, node);
      }
    });
  }

  public get iconOnly(): boolean {
    const listOfNode = Array.from((this.elementRef?.nativeElement as HTMLButtonElement)?.childNodes || []);
    const noText = listOfNode.every(node => node.nodeName !== '#text');
    // ignore icon and comment
    const noSpan =
      listOfNode.filter(node => {
        return !(node.nodeName === '#comment' || !!(node as HTMLElement)?.classList?.contains('anticon'));
      }).length == 0;
    return !!this.nzIconDirectiveElement && noSpan && noText;
  }

  constructor() {
    onConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME, () => {
      this.size.set(this.nzSize);
      this.cdr.markForCheck();
    });
  }

  ngOnInit(): void {
    this.size.set(this.nzSize);

    this.directionality.change?.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((direction: Direction) => {
      this.dir = direction;
      this.cdr.detectChanges();
    });

    this.dir = this.directionality.value;

    // Caretaker note: this event listener could've been added through `host.click` or `HostListener`.
    // The compiler generates the `ɵɵlistener` instruction which wraps the actual listener internally into the
    // function, which runs `markDirty()` before running the actual listener (the decorated class method).
    // Since we're preventing the default behavior and stopping event propagation this doesn't require Angular to run the change detection.
    fromEventOutsideAngular<MouseEvent>(this.elementRef.nativeElement, 'click', { capture: true })
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(event => {
        if ((this.disabled && (event.target as HTMLElement)?.tagName === 'A') || this.nzLoading) {
          event.preventDefault();
          event.stopImmediatePropagation();
        }
      });
  }

  ngOnChanges({ nzLoading, nzSize }: SimpleChanges): void {
    if (nzLoading) {
      this.loading$.next(this.nzLoading);
    }
    if (nzSize) {
      this.size.set(nzSize.currentValue);
    }
  }

  ngAfterViewInit(): void {
    this.insertSpan(this.elementRef.nativeElement.childNodes, this.renderer);
  }

  ngAfterContentInit(): void {
    this.loading$
      .pipe(
        startWith(this.nzLoading),
        filter(() => !!this.nzIconDirectiveElement),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(loading => {
        const nativeElement = this.nzIconDirectiveElement.nativeElement;
        if (loading) {
          this.renderer.setStyle(nativeElement, 'display', 'none');
        } else {
          this.renderer.removeStyle(nativeElement, 'display');
        }
      });
  }
}
