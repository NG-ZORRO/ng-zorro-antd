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

import { drawCanvas, ERROR_LEVEL_MAP, plotQRCodeData } from './qrcode';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-qrcode',
  exportAs: 'nzQRCode',
  template: `
    <div class="ant-qrcode-mask" *ngIf="nzStatus !== 'active'">
      <nz-spin *ngIf="nzStatus === 'loading'"></nz-spin>
      <div *ngIf="nzStatus === 'expired'">
        <p class="ant-qrcode-expired">{{ locale.expired }}</p>
        <button nz-button nzType="link" (click)="reloadQRCode()">
          <span nz-icon nzType="reload" nzTheme="outline"></span>
          <span>{{ locale.refresh }}</span>
        </button>
      </div>
    </div>
    <canvas #canvas></canvas>
  `,
  host: {
    class: 'ant-qrcode',
    '[class.ant-qrcode-border]': `nzBordered`
  }
})
export class NzQRCodeComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  @Input() nzValue: string = '';
  @Input() nzColor: string = '#000000';
  @Input() nzSize: number = 160;
  @Input() nzIcon: string = '';
  @Input() nzIconSize: number = 40;
  @Input() nzBordered: boolean = true;
  @Input() nzStatus: 'active' | 'expired' | 'loading' = 'active';
  @Input() nzLevel: keyof typeof ERROR_LEVEL_MAP = 'M';

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
    const { nzValue, nzIcon, nzLevel, nzSize, nzIconSize, nzColor } = changes;
    if ((nzValue || nzIcon || nzLevel || nzSize || nzIconSize || nzColor) && this.canvas) {
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
      this.canvas.nativeElement,
      plotQRCodeData(this.nzValue, this.nzLevel),
      this.nzSize,
      10,
      this.nzColor,
      this.nzIconSize,
      this.nzIcon
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
