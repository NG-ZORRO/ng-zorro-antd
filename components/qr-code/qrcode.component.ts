/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges,
  ViewChild,
  SimpleChanges,
  Output,
  EventEmitter,
  OnInit,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { NzQRCodeI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';

import { drawCanvas, plotQrCodeData } from './qrcode';
import { NzQRCodeColor } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-qrcode',
  exportAs: 'nzQrCode',
  template: `
    <div class="ant-qrcode-mask" *ngIf="nzStatus !== 'active'">
      <nz-spin *ngIf="nzStatus === 'loading'"></nz-spin>
      <div *ngIf="nzStatus === 'expired'">
        <p class="ant-qrcode-expired">{{ locale.qrCodeError }}</p>
        <button nz-button nzType="link" (click)="reloadQRCode()">
          <span nz-icon nzType="reload" nzTheme="outline"></span>
          <span>{{ locale.reload }}</span>
        </button>
      </div>
    </div>
    <div class="ant-qrcode-content" [style.background-color]="nzColor.light">
      <canvas #canvas></canvas>
      <img
        *ngIf="!!nzIcon"
        [src]="nzIcon"
        [attr.key]="nzIcon"
        style="display: none;"
        crossOrigin="anonymous"
        [alt]="nzIcon"
      />
    </div>
  `,
  host: {
    class: 'ant-qrcode',
    '[class.ant-qrcode-border]': `nzBordered`
  }
})
export class NzQrCodeComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('canvas', { static: false }) canvas!: ElementRef;
  @Input() nzValue: string = '';
  @Input() nzColor: NzQRCodeColor = { dark: '#000', light: '#fff' };
  @Input() nzSize: number = 160;
  @Input() nzIcon: string = '';
  @Input() nzIconSize: number = 40;
  @Input() nzBordered: boolean = true;
  @Input() nzStatus: 'active' | 'expired' | 'loading' = 'active';
  @Input() nzErrorLevel: 'L' | 'M' | 'Q' | 'H' = 'M';

  @Output() readonly nzRefresh = new EventEmitter<string>();

  locale!: NzQRCodeI18nInterface;
  private destroy$ = new Subject<void>();

  constructor(private i18n: NzI18nService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.i18n.localeChange.pipe(takeUntil(this.destroy$)).subscribe(() => {
      this.locale = this.i18n.getLocaleData('QRCode');
      this.cdr.markForCheck();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzValue, nzIcon, nzErrorLevel, nzSize, nzIconSize, nzColor } = changes;
    if ((nzValue || nzIcon || nzErrorLevel || nzSize || nzIconSize || nzColor) && this.canvas) {
      this.drawCanvasQRCode();
    }
  }

  ngAfterViewInit(): void {
    this.drawCanvasQRCode();
  }

  reloadQRCode(): void {
    this.drawCanvasQRCode();
    this.nzRefresh.emit('refresh');
  }

  drawCanvasQRCode(): void {
    drawCanvas(
      this.canvas,
      plotQrCodeData(this.nzValue, this.nzErrorLevel),
      this.nzSize,
      10,
      this.nzColor.light,
      this.nzColor.dark,
      this.nzIconSize,
      this.nzIcon
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
