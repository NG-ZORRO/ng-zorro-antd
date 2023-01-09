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
import { Observable, Subject, timer } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import { toCanvas, toDataURL } from 'qrcode';

import { NzQRCodeI18nInterface, NzI18nService } from 'ng-zorro-antd/i18n';
import { nzQRCodeColor } from 'ng-zorro-antd/qr-code/typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'nz-qrcode',
  exportAs: 'nzQrCode',
  template: `
    <div class="ant-qrcode-mask" *ngIf="nzStatus !== 'active'">
      <nz-spin *ngIf="nzStatus === 'loading'"></nz-spin>
      <div *ngIf="nzStatus === 'expired'">
        <p [style.color]="nzColor.dark">{{ locale.qrCodeError }}</p>
        <button nz-button nzType="link" (click)="reloadQRCode()">
          <span nz-icon nzType="reload" nzTheme="outline"></span>
          <span>{{ locale.reload }}</span>
        </button>
      </div>
    </div>
    <div class="ant-qrcode-content" [style.background-color]="nzColor.light">
      <canvas #canvas [width]="nzSize" [height]="nzSize"></canvas>
      <img #img [src]="nzIcon" [attr.key]="nzIcon" [style.display]="'none'" crossOrigin="anonymous" [alt]="nzIcon" />
    </div>
  `,
  host: {
    '[class.ant-qrcode]': `true`,
    '[class.ant-qrcode-border]': `nzBordered`
  }
})
export class NzQrCodeComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @ViewChild('canvas', { static: false }) canvas!: ElementRef;
  @ViewChild('img', { static: false }) img!: ElementRef;
  @Input() nzValue: string = '';
  @Input() nzColor: nzQRCodeColor = { dark: '#000', light: '#fff' };
  @Input() nzSize: number = 160;
  @Input() nzIcon: string = '';
  @Input() nzIconSize: number = 40;
  @Input() nzBordered: boolean = true;
  @Input() nzStatus: 'active' | 'expired' | 'loading' = 'active';
  @Input() nzErrorLevel: 'L' | 'M' | 'Q' | 'H' = 'M';

  @Output() readonly nzRefresh = new EventEmitter<boolean>();

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
    const { nzValue, nzIcon, nzErrorLevel } = changes;
    if ((nzValue || nzIcon || nzErrorLevel) && this.canvas) {
      this.drawQRCode();
    }
  }

  ngAfterViewInit(): void {
    this.drawQRCode();
  }

  reloadQRCode(): void {
    this.drawQRCode();
    this.nzRefresh.emit(true);
  }

  drawQRCode(): void {
    if (!this.nzValue) {
      return;
    }

    const options = {
      errorCorrectionLevel: this.nzErrorLevel,
      margin: 0,
      width: this.nzSize,
      color: this.nzColor
    };

    if (!this.nzIcon) {
      toCanvas(<HTMLCanvasElement>this.canvas.nativeElement, this.nzValue, options).then(_ => {
        // console.log(err)
      });
      return;
    }

    toDataURL(this.nzValue, options).then(url => {
      const imgQRCode = new Image();
      imgQRCode.src = url;
      imgQRCode.crossOrigin = 'anonymous';

      this.canvasService().subscribe(context => {
        context.clearRect(0, 0, this.nzSize, this.nzSize);
        context.drawImage(imgQRCode, 0, 0, imgQRCode.width, imgQRCode.height, 0, 0, this.nzSize, this.nzSize);

        const iconCoordinate = this.nzSize / 2 - this.nzIconSize / 2;

        context.fillStyle = '#fff';

        context.fillRect(
          this.nzSize / 2 - this.nzIconSize / 2,
          this.nzSize / 2 - this.nzIconSize / 2,
          this.nzIconSize,
          this.nzIconSize
        );
        context.drawImage(this.img.nativeElement, iconCoordinate, iconCoordinate, this.nzIconSize, this.nzIconSize);
      });
    });
  }

  canvasService(): Observable<CanvasRenderingContext2D> {
    // @ts-ignore
    return timer(500).pipe(map(() => (<HTMLCanvasElement>this.canvas.nativeElement).getContext('2d')));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
