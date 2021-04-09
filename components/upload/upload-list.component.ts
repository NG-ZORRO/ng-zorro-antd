/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { animate, style, transition, trigger } from '@angular/animations';
import { Direction } from '@angular/cdk/bidi';
import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  NgZone,
  OnChanges,
  ViewEncapsulation
} from '@angular/core';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { Observable } from 'rxjs';

import { NzIconRenderTemplate, NzShowUploadList, NzUploadFile, NzUploadListType } from './interface';

const isImageFileType = (type: string): boolean => !!type && type.indexOf('image/') === 0;

const MEASURE_SIZE = 200;

type UploadListIconType = '' | 'uploading' | 'thumbnail';

interface UploadListFile extends NzUploadFile {
  isImageUrl?: boolean;
  isUploading?: boolean;
  iconType?: UploadListIconType;
  showDownload?: boolean;
}

@Component({
  selector: 'nz-upload-list',
  exportAs: 'nzUploadList',
  templateUrl: './upload-list.component.html',
  animations: [
    trigger('itemState', [
      transition(':enter', [style({ height: '0', width: '0', opacity: 0 }), animate(150, style({ height: '*', width: '*', opacity: 1 }))]),
      transition(':leave', [animate(150, style({ height: '0', width: '0', opacity: 0 }))])
    ])
  ],
  host: {
    '[class.ant-upload-list-rtl]': `dir === 'rtl'`,
    '[class.ant-upload-list-text]': `listType === 'text'`,
    '[class.ant-upload-list-picture]': `listType === 'picture'`,
    '[class.ant-upload-list-picture-card]': `listType === 'picture-card'`
  },
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzUploadListComponent implements OnChanges {
  list: UploadListFile[] = [];

  private get showPic(): boolean {
    return this.listType === 'picture' || this.listType === 'picture-card';
  }

  @Input() locale: NzSafeAny = {};
  @Input() listType!: NzUploadListType;
  @Input()
  set items(list: NzUploadFile[]) {
    this.list = list;
  }
  @Input() icons!: NzShowUploadList;
  @Input() onPreview?: (file: NzUploadFile) => void;
  @Input() onRemove!: (file: NzUploadFile) => void;
  @Input() onDownload?: (file: NzUploadFile) => void;
  @Input() previewFile?: (file: NzUploadFile) => Observable<string>;
  @Input() previewIsImage?: (file: NzUploadFile) => boolean;
  @Input() iconRender: NzIconRenderTemplate | null = null;
  @Input() dir: Direction = 'ltr';

  private genErr(file: NzUploadFile): string {
    if (file.response && typeof file.response === 'string') {
      return file.response;
    }
    return (file.error && file.error.statusText) || this.locale.uploadError;
  }

  private extname(url: string): string {
    const temp = url.split('/');
    const filename = temp[temp.length - 1];
    const filenameWithoutSuffix = filename.split(/#|\?/)[0];
    return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
  }

  isImageUrl(file: NzUploadFile): boolean {
    if (isImageFileType(file.type!)) {
      return true;
    }
    const url: string = (file.thumbUrl || file.url || '') as string;
    if (!url) {
      return false;
    }
    const extension = this.extname(url);
    if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|jfif|bmp|dpg)$/i.test(extension)) {
      return true;
    } else if (/^data:/.test(url)) {
      // other file types of base64
      return false;
    } else if (extension) {
      // other file types which have extension
      return false;
    }
    return true;
  }

  private getIconType(file: UploadListFile): UploadListIconType {
    if (!this.showPic) {
      return '';
    }
    if (file.isUploading || (!file.thumbUrl && !file.url)) {
      return 'uploading';
    } else {
      return 'thumbnail';
    }
  }

  private previewImage(file: File | Blob): Promise<string> {
    return new Promise(resolve => {
      if (!isImageFileType(file.type)) {
        resolve('');
        return;
      }
      this.ngZone.runOutsideAngular(() => {
        const canvas = this.doc.createElement('canvas');
        canvas.width = MEASURE_SIZE;
        canvas.height = MEASURE_SIZE;
        canvas.style.cssText = `position: fixed; left: 0; top: 0; width: ${MEASURE_SIZE}px; height: ${MEASURE_SIZE}px; z-index: 9999; display: none;`;
        this.doc.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = () => {
          const { width, height } = img;

          let drawWidth = MEASURE_SIZE;
          let drawHeight = MEASURE_SIZE;
          let offsetX = 0;
          let offsetY = 0;

          if (width < height) {
            drawHeight = height * (MEASURE_SIZE / width);
            offsetY = -(drawHeight - drawWidth) / 2;
          } else {
            drawWidth = width * (MEASURE_SIZE / height);
            offsetX = -(drawWidth - drawHeight) / 2;
          }

          try {
            ctx!.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
          } catch {}
          const dataURL = canvas.toDataURL();
          this.doc.body.removeChild(canvas);

          resolve(dataURL);
        };
        img.src = window.URL.createObjectURL(file);
      });
    });
  }

  private genThumb(): void {
    if (!this.platform.isBrowser) {
      return;
    }

    const win = window as NzSafeAny;
    if (!this.showPic || typeof document === 'undefined' || typeof win === 'undefined' || !win.FileReader || !win.File) {
      return;
    }
    this.list
      .filter(file => file.originFileObj instanceof File && file.thumbUrl === undefined)
      .forEach(file => {
        file.thumbUrl = '';
        (this.previewFile ? this.previewFile(file).toPromise() : this.previewImage(file.originFileObj!)).then(dataUrl => {
          file.thumbUrl = dataUrl;
          this.detectChanges();
        });
      });
  }

  private showDownload(file: NzUploadFile): boolean {
    return !!(this.icons.showDownloadIcon && file.status === 'done');
  }

  private fixData(): void {
    this.list.forEach(file => {
      file.isUploading = file.status === 'uploading';
      file.message = this.genErr(file);
      file.linkProps = typeof file.linkProps === 'string' ? JSON.parse(file.linkProps) : file.linkProps;
      file.isImageUrl = this.previewIsImage ? this.previewIsImage(file) : this.isImageUrl(file);
      file.iconType = this.getIconType(file);
      file.showDownload = this.showDownload(file);
    });
  }

  handlePreview(file: NzUploadFile, e: Event): void {
    if (!this.onPreview) {
      return;
    }

    e.preventDefault();
    return this.onPreview(file);
  }

  handleRemove(file: NzUploadFile, e: Event): void {
    e.preventDefault();
    if (this.onRemove) {
      this.onRemove(file);
    }
    return;
  }

  handleDownload(file: NzUploadFile): void {
    if (typeof this.onDownload === 'function') {
      this.onDownload(file);
    } else if (file.url) {
      window.open(file.url);
    }
  }

  // #endregion

  constructor(
    private cdr: ChangeDetectorRef,
    @Inject(DOCUMENT) private doc: NzSafeAny,
    private ngZone: NgZone,
    private platform: Platform,
    private elementRef: ElementRef
  ) {
    // TODO: move to host after View Engine deprecation
    this.elementRef.nativeElement.classList.add('ant-upload-list');
  }

  detectChanges(): void {
    this.fixData();
    this.cdr.detectChanges();
  }

  ngOnChanges(): void {
    this.fixData();
    this.genThumb();
  }
}
