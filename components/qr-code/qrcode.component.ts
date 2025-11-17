/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  input,
  output,
  PLATFORM_ID,
  signal,
  Signal,
  TemplateRef
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzStringTemplateOutletDirective } from 'ng-zorro-antd/core/outlet';
import { NzI18nService, NzQRCodeI18nInterface } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';

import { NzQrcodeCanvasComponent } from './qrcode-canvas.component';
import { createQRCodeData } from './qrcode-data';
import { NzQrcodeSvgComponent } from './qrcode-svg.component';
import { CrossOrigin, ErrorCorrectionLevel, Excavation, ImageSettings, Modules } from './typing';
import { DEFAULT_BACKGROUND_COLOR, DEFAULT_FRONT_COLOR, DEFAULT_MINVERSION } from './utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-qrcode',
  exportAs: 'nzQRCode',
  template: `
    @if (!!nzStatusRender()) {
      <div class="ant-qrcode-mask">
        <ng-container *nzStringTemplateOutlet="nzStatusRender()">{{ nzStatusRender() }}</ng-container>
      </div>
    } @else if (nzStatus() !== 'active') {
      <div class="ant-qrcode-mask">
        @switch (nzStatus()) {
          @case ('loading') {
            <nz-spin />
          }
          @case ('expired') {
            <div>
              <p class="ant-qrcode-expired">{{ locale().expired }}</p>
              <button nz-button nzType="link" (click)="reloadQRCode()">
                <nz-icon nzType="reload" nzTheme="outline" />
                <span>{{ locale().refresh }}</span>
              </button>
            </div>
          }
          @case ('scanned') {
            <div>
              <p class="ant-qrcode-expired">{{ locale().scanned }}</p>
            </div>
          }
        }
      </div>
    }

    @if (isBrowser) {
      @switch (nzType()) {
        @case ('canvas') {
          <nz-qrcode-canvas
            [icon]="nzIcon()"
            [margin]="margin()"
            [cells]="cells()"
            [numCells]="numCells()"
            [calculatedImageSettings]="calculatedImageSettings()"
            [size]="nzSize()"
            [color]="nzColor()"
            [bgColor]="nzBgColor()"
          >
          </nz-qrcode-canvas>
        }
        @case ('svg') {
          <nz-qrcode-svg
            [color]="nzColor()"
            [bgColor]="nzBgColor()"
            [icon]="nzIcon()"
            [margin]="margin()"
            [cells]="cells()"
            [numCells]="numCells()"
            [imageSettings]="imageSettings()"
            [calculatedImageSettings]="
              calculatedImageSettings() || { x: 0, y: 0, h: 0, w: 0, excavation: null, opacity: 1, crossOrigin: '' }
            "
            [size]="nzSize()"
          ></nz-qrcode-svg>
        }
      }
    }
  `,
  host: {
    class: 'ant-qrcode',
    '[class.ant-qrcode-border]': `nzBordered()`,
    '[style.background-color]': `nzBgColor()`
  },
  imports: [
    NzSpinModule,
    NzButtonModule,
    NzIconModule,
    NzStringTemplateOutletDirective,
    NzQrcodeSvgComponent,
    NzQrcodeCanvasComponent
  ]
})
export class NzQRCodeComponent {
  private i18n = inject(NzI18nService);
  locale = toSignal<NzQRCodeI18nInterface>(this.i18n.localeChange.pipe(map(() => this.i18n.getLocaleData('QRCode'))), {
    requireSync: true
  });
  // https://github.com/angular/universal-starter/issues/538#issuecomment-365518693
  // canvas is not supported by the SSR DOM
  protected isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly nzValue = input<string | string[]>('');
  readonly nzType = input<'svg' | 'canvas'>('canvas');
  readonly nzColor = input<string>(DEFAULT_FRONT_COLOR);
  readonly nzBgColor = input<string>(DEFAULT_BACKGROUND_COLOR);
  readonly nzSize = input<number>(160);
  readonly nzIcon = input<string>('');
  readonly nzIconSize = input<number>(40);
  readonly nzBordered = input<boolean>(true);
  readonly nzStatus = input<'active' | 'expired' | 'loading' | 'scanned'>('active');
  readonly nzLevel = input<ErrorCorrectionLevel>('M');
  readonly nzStatusRender = input<TemplateRef<void> | string | null>(null);
  readonly nzBoostLevel = input<boolean>(true);
  readonly nzPadding = input<number>(0);

  readonly nzRefresh = output<string>();

  margin = signal<number>(0);
  cells = signal<Modules>([]);
  numCells = signal<number>(0);
  calculatedImageSettings = signal<null | {
    x: number;
    y: number;
    h: number;
    w: number;
    excavation: Excavation | null;
    opacity: number;
    crossOrigin: CrossOrigin;
  }>(null);

  protected imageSettings: Signal<ImageSettings> = computed(() => {
    return {
      src: this.nzIcon(),
      x: undefined,
      y: undefined,
      height: this.nzIconSize() ?? 40,
      width: this.nzIconSize() ?? 40,
      excavate: true,
      crossOrigin: 'anonymous'
    };
  });

  constructor() {
    effect(() => {
      this.updateQRCodeData();
    });
  }

  reloadQRCode(): void {
    this.updateQRCodeData();
    this.nzRefresh.emit('refresh');
  }

  updateQRCodeData(): void {
    const { margin, cells, numCells, calculatedImageSettings } = createQRCodeData(
      this.nzValue(),
      this.nzLevel(),
      DEFAULT_MINVERSION,
      this.nzSize(),
      this.nzBoostLevel(),
      this.nzPadding(),
      this.imageSettings()
    );
    this.margin.set(margin);
    this.cells.set(cells);
    this.numCells.set(numCells);
    this.calculatedImageSettings.set(calculatedImageSettings);
  }
}
