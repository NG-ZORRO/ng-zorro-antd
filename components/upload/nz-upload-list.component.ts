/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { animate, style, transition, trigger } from '@angular/animations';
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
import { Observable } from 'rxjs';

import { NgClassType, NzUpdateHostClassService } from 'ng-zorro-antd/core';

import { ShowUploadListInterface, UploadFile, UploadListType } from './interface';

const isImageFileType = (type: string): boolean => !!type && type.indexOf('image/') === 0;

const MEASURE_SIZE = 200;

@Component({
  selector: 'nz-upload-list',
  exportAs: 'nzUploadList',
  templateUrl: './nz-upload-list.component.html',
  providers: [NzUpdateHostClassService],
  animations: [
    trigger('itemState', [
      transition(':enter', [
        style({ height: '0', width: '0', opacity: 0 }),
        animate(150, style({ height: '*', width: '*', opacity: 1 }))
      ]),
      transition(':leave', [animate(150, style({ height: '0', width: '0', opacity: 0 }))])
    ])
  ],
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NzUploadListComponent implements OnChanges {
  private _items: UploadFile[];

  get showPic(): boolean {
    return this.listType === 'picture' || this.listType === 'picture-card';
  }

  getIconType(file: UploadFile): string {
    if (!this.showPic) {
      return '';
    }
    if (this.listType === 'picture-card' && file.status === 'uploading') {
      return 'loading';
    } else if (!file.thumbUrl && !file.url) {
      return 'thumbnail';
    } else {
      return 'default';
    }
  }

  // #region fields

  // tslint:disable-next-line:no-any
  @Input() locale: any = {};
  @Input() listType: UploadListType;
  @Input()
  set items(list: UploadFile[]) {
    list.forEach(file => {
      file.linkProps = typeof file.linkProps === 'string' ? JSON.parse(file.linkProps) : file.linkProps;
    });
    this._items = list;
  }
  get items(): UploadFile[] {
    return this._items;
  }
  @Input() icons: ShowUploadListInterface;
  @Input() onPreview: (file: UploadFile) => void;
  @Input() onRemove: (file: UploadFile) => void;
  @Input() onDownload: (file: UploadFile) => void;
  @Input() previewFile: (file: UploadFile) => Observable<string>;

  // #endregion

  // #region styles

  private prefixCls = 'ant-upload-list';

  private setClassMap(): void {
    const classMap = {
      [this.prefixCls]: true,
      [`${this.prefixCls}-${this.listType}`]: true
    };
    this.updateHostClassService.updateHostClass(this.el.nativeElement, classMap);
  }

  // #endregion

  // #region render

  private extname(url: string): string {
    const temp = url.split('/');
    const filename = temp[temp.length - 1];
    const filenameWithoutSuffix = filename.split(/#|\?/)[0];
    return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [''])[0];
  }

  isImageUrl(file: UploadFile): boolean {
    if (isImageFileType(file.type)) {
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
    // tslint:disable-next-line:no-any
    const win = window as any;
    if (
      !this.showPic ||
      typeof document === 'undefined' ||
      typeof win === 'undefined' ||
      !win.FileReader ||
      !win.File
    ) {
      return;
    }
    this.items
      .filter(file => file.originFileObj instanceof File && file.thumbUrl === undefined)
      .forEach(file => {
        file.thumbUrl = '';
        (this.previewFile ? this.previewFile(file).toPromise() : this.previewImage(file.originFileObj!)).then(
          dataUrl => {
            file.thumbUrl = dataUrl;
            this.detectChanges();
          }
        );
      });
  }

  listItemNameClass(file: UploadFile): NgClassType {
    const count = [this.showDownload(file), this.icons.showRemoveIcon].filter(x => x).length;
    return {
      [`${this.prefixCls}-item-name`]: true,
      [`${this.prefixCls}-item-name-icon-count-${count}`]: true
    };
  }

  showDownload(file: UploadFile): boolean {
    return this.icons.showDownloadIcon && file.status === 'done' ? true : false;
  }

  handlePreview(file: UploadFile, e: Event): void {
    if (!this.onPreview) {
      return;
    }

    e.preventDefault();
    return this.onPreview(file);
  }

  handleRemove(file: UploadFile, e: Event): void {
    e.preventDefault();
    if (this.onRemove) {
      this.onRemove(file);
    }
    return;
  }

  handleDownload(file: UploadFile): void {
    if (typeof this.onDownload === 'function') {
      this.onDownload(file);
    } else if (file.url) {
      window.open(file.url);
    }
  }

  // #endregion

  constructor(
    private el: ElementRef,
    private cdr: ChangeDetectorRef,
    private updateHostClassService: NzUpdateHostClassService,
    @Inject(DOCUMENT) private doc: any, // tslint:disable-line no-any
    private ngZone: NgZone,
    private platform: Platform
  ) {}

  detectChanges(): void {
    this.cdr.detectChanges();
  }

  ngOnChanges(): void {
    this.setClassMap();
    this.genThumb();
  }
}
