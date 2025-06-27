/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
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

import { NzPresetColor } from 'ng-zorro-antd/core/color';
import { NzConfigKey, NzConfigService, WithConfig } from 'ng-zorro-antd/core/config';
import { NzSafeAny, NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { fromEventOutsideAngular } from 'ng-zorro-antd/core/util';
import { NzIconDirective, NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_SPACE_COMPACT_ITEM_TYPE, NZ_SPACE_COMPACT_SIZE, NzSpaceCompactItemDirective } from 'ng-zorro-antd/space';

export type NzButtonType = 'primary' | 'default' | 'dashed' | 'link' | 'text' | null;
export type NzButtonShape = 'circle' | 'round' | null;
export type NzButtonSize = NzSizeLDSType;
export type NzButtonColor = 'primary' | 'default' | 'danger' | NzPresetColor | null;
export type NzButtonVariant = 'outlined' | 'dashed' | 'solid' | 'filled' | 'text' | 'link' | null;

type NzColorVariantPair = [color: NonNullable<NzButtonColor>, variant: NonNullable<NzButtonVariant>];

const NZ_CONFIG_MODULE_NAME: NzConfigKey = 'button';
const NZ_BUTTON_DEFAULT_COLOR: NonNullable<NzButtonColor> = 'default';
const NZ_BUTTON_DEFAULT_VARIANT: NonNullable<NzButtonVariant> = 'outlined';
const NZ_BUTTON_TYPE_MAP: Record<NonNullable<NzButtonType>, NzColorVariantPair> = {
  default: [NZ_BUTTON_DEFAULT_COLOR, NZ_BUTTON_DEFAULT_VARIANT],
  primary: ['primary', 'solid'],
  dashed: ['default', 'dashed'],
  // `link` is not a real color but should be compatible
  link: ['link' as NzSafeAny, 'link'],
  text: ['default', 'text']
};

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
    '[class]': 'class()',
    '[class.ant-btn-circle]': `nzShape === 'circle'`,
    '[class.ant-btn-round]': `nzShape === 'round'`,
    '[class.ant-btn-lg]': `finalSize() === 'large'`,
    '[class.ant-btn-sm]': `finalSize() === 'small'`,
    '[class.ant-btn-dangerous]': `nzDanger`,
    '[class.ant-btn-loading]': `nzLoading`,
    '[class.ant-btn-background-ghost]': `nzGhost && !isUnBorderedButtonVariant(variant())`,
    '[class.ant-btn-block]': `nzBlock`,
    '[class.ant-input-search-button]': `nzSearch`,
    '[class.ant-btn-rtl]': `dir() === 'rtl'`,
    '[class.ant-btn-icon-only]': `iconOnly`,
    '[attr.tabindex]': 'disabled ? -1 : (tabIndex === null ? null : tabIndex)',
    '[attr.disabled]': 'disabled || null'
  },
  hostDirectives: [NzSpaceCompactItemDirective],
  providers: [{ provide: NZ_SPACE_COMPACT_ITEM_TYPE, useValue: 'btn' }]
})
export class NzButtonComponent implements OnChanges, AfterViewInit, AfterContentInit, OnInit {
  readonly _nzModuleName: NzConfigKey = NZ_CONFIG_MODULE_NAME;

  private readonly elementRef = inject(ElementRef);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly renderer = inject(Renderer2);
  public readonly nzConfigService = inject(NzConfigService);
  protected readonly dir = inject(Directionality).valueSignal;
  private readonly destroyRef = inject(DestroyRef);

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
  @Input() nzColor: NzButtonColor = null;
  @Input() nzVariant: NzButtonVariant = null;

  protected finalSize = computed(() => {
    if (this.compactSize) {
      return this.compactSize();
    }
    return this.size();
  });

  protected readonly type = signal<NzButtonType>('default');
  protected readonly color = signal<NzButtonColor | undefined>(undefined);
  protected readonly variant = signal<NzButtonVariant | undefined>(undefined);
  private size = signal<NzSizeLDSType>(this.nzSize);
  private compactSize = inject(NZ_SPACE_COMPACT_SIZE, { optional: true });
  private loading$ = new Subject<boolean>();

  protected readonly class = computed(() => {
    const type = this.type();
    const prefixCls = 'ant-btn';
    const classes: string[] = [prefixCls];
    classes.push(`${prefixCls}-${type}`);

    const color = this.color();
    const isDanger = color === 'danger';
    const mergedColor = isDanger ? 'dangerous' : color || NZ_BUTTON_DEFAULT_COLOR;
    classes.push(`${prefixCls}-color-${mergedColor}`);

    const variant = this.variant() || NZ_BUTTON_DEFAULT_VARIANT;
    classes.push(`${prefixCls}-variant-${variant}`);

    return classes;
  });

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

  get iconOnly(): boolean {
    const listOfNode = Array.from((this.elementRef?.nativeElement as HTMLButtonElement)?.childNodes || []);
    const noText = listOfNode.every(node => node.nodeName !== '#text');
    // ignore icon and comment
    const noSpan =
      listOfNode.filter(node => {
        return !(node.nodeName === '#comment' || !!(node as HTMLElement)?.classList?.contains('anticon'));
      }).length == 0;
    return !!this.nzIconDirectiveElement && noSpan && noText;
  }

  ngOnInit(): void {
    this.size.set(this.nzSize);
    this.nzConfigService
      .getConfigChangeEventForComponent(NZ_CONFIG_MODULE_NAME)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.size.set(this.nzSize);
        this.cdr.markForCheck();
      });

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

  ngOnChanges(changes: SimpleChanges): void {
    const { nzLoading, nzSize, nzType, nzColor, nzVariant, nzDanger } = changes;
    if (nzLoading) {
      this.loading$.next(this.nzLoading);
    }
    if (nzSize) {
      this.size.set(nzSize.currentValue);
    }
    if (nzType) {
      this.type.set(nzType.currentValue || 'default');
    }
    if (nzType || nzColor || nzVariant || nzDanger) {
      const [color, variant] = this.calcColorAndVariant({
        type: this.nzType,
        color: this.nzColor,
        variant: this.nzVariant,
        danger: this.nzDanger
      });
      this.color.set(color);
      this.variant.set(variant);
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

  private calcColorAndVariant(
    deps: Partial<{
      color: NzButtonColor;
      variant: NzButtonVariant;
      type: NzButtonType;
      danger: boolean;
    }>
  ): NzColorVariantPair {
    const { color, variant, type = 'default', danger } = deps;
    if (color && variant) {
      return [color, variant];
    }

    if (type || danger) {
      const mergedType = type || 'default';
      const colorVariantPair = NZ_BUTTON_TYPE_MAP[mergedType];
      if (danger) {
        return ['danger', colorVariantPair[1]];
      }
      return colorVariantPair;
    }

    return [NZ_BUTTON_DEFAULT_COLOR, NZ_BUTTON_DEFAULT_VARIANT];
  }

  protected isUnBorderedButtonVariant(variant?: NzButtonVariant): boolean {
    return variant === 'text' || variant === 'link';
  }
}
