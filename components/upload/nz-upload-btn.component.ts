/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ENTER } from '@angular/cdk/keycodes';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Optional,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { of, Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { warn, NzUpdateHostClassService } from 'ng-zorro-antd/core';

import { UploadFile, UploadXHRArgs, ZipButtonOptions } from './interface';

@Component({
  selector: '[nz-upload-btn]',
  exportAs: 'nzUploadBtn',
  templateUrl: './nz-upload-btn.component.html',
  host: {
    '[attr.tabindex]': '"0"',
    '[attr.role]': '"button"'
  },
  providers: [NzUpdateHostClassService],
  preserveWhitespaces: false,
  encapsulation: ViewEncapsulation.None
})
export class NzUploadBtnComponent implements OnInit, OnChanges, OnDestroy {
  reqs: { [key: string]: Subscription } = {};
  private inited = false;
  private destroy = false;

  @ViewChild('file', { static: false }) file: ElementRef;

  // #region fields
  @Input() classes: {} = {};
  @Input() options: ZipButtonOptions;

  // #endregion

  @HostListener('click')
  onClick(): void {
    if (this.options.disabled || !this.options.openFileDialogOnClick) {
      return;
    }
    (this.file.nativeElement as HTMLInputElement).click();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if (this.options.disabled) {
      return;
    }
    if (e.key === 'Enter' || e.keyCode === ENTER) {
      this.onClick();
    }
  }

  @HostListener('drop', ['$event'])
  @HostListener('dragover', ['$event'])
  // skip safari bug
  // tslint:disable-next-line:no-any
  onFileDrop(e: any): void {
    if (this.options.disabled || e.type === 'dragover') {
      e.preventDefault();
      return;
    }
    if (this.options.directory) {
      this.traverseFileTree(e.dataTransfer!.items);
    } else {
      const files: File[] = Array.prototype.slice
        .call(e.dataTransfer!.files)
        .filter((file: File) => this.attrAccept(file, this.options.accept));
      if (files.length) {
        this.uploadFiles(files);
      }
    }

    e.preventDefault();
  }

  onChange(e: Event): void {
    if (this.options.disabled) {
      return;
    }
    const hie = e.target as HTMLInputElement;
    this.uploadFiles(hie.files!);
    hie.value = '';
  }

  private traverseFileTree(files: DataTransferItemList): void {
    // tslint:disable-next-line:no-any
    const _traverseFileTree = (item: any, path: string) => {
      if (item.isFile) {
        item.file((file: File) => {
          if (this.attrAccept(file, this.options.accept)) {
            this.uploadFiles([file]);
          }
        });
      } else if (item.isDirectory) {
        const dirReader = item.createReader();

        // tslint:disable-next-line:no-any
        dirReader.readEntries((entries: any) => {
          for (const entrieItem of entries) {
            _traverseFileTree(entrieItem, `${path}${item.name}/`);
          }
        });
      }
    };
    // tslint:disable-next-line:no-any
    for (const file of files as any) {
      _traverseFileTree(file.webkitGetAsEntry(), '');
    }
  }

  private attrAccept(file: File, acceptedFiles?: string | string[]): boolean {
    if (file && acceptedFiles) {
      const acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(',');
      const fileName = '' + file.name;
      const mimeType = '' + file.type;
      const baseMimeType = mimeType.replace(/\/.*$/, '');

      return acceptedFilesArray.some(type => {
        const validType = type.trim();
        if (validType.charAt(0) === '.') {
          return (
            fileName
              .toLowerCase()
              .indexOf(validType.toLowerCase(), fileName.toLowerCase().length - validType.toLowerCase().length) !== -1
          );
        } else if (/\/\*$/.test(validType)) {
          // This is something like a image/* mime type
          return baseMimeType === validType.replace(/\/.*$/, '');
        }
        return mimeType === validType;
      });
    }
    return true;
  }

  private attachUid(file: UploadFile): UploadFile {
    if (!file.uid) {
      file.uid = Math.random()
        .toString(36)
        .substring(2);
    }
    return file;
  }

  uploadFiles(fileList: FileList | File[]): void {
    let filters$: Observable<UploadFile[]> = of(Array.prototype.slice.call(fileList));
    if (this.options.filters) {
      this.options.filters.forEach(f => {
        filters$ = filters$.pipe(
          switchMap(list => {
            const fnRes = f.fn(list);
            return fnRes instanceof Observable ? fnRes : of(fnRes);
          })
        );
      });
    }
    filters$.subscribe(
      list => {
        list.forEach((file: UploadFile) => {
          this.attachUid(file);
          this.upload(file, list);
        });
      },
      e => {
        warn(`Unhandled upload filter error`, e);
      }
    );
  }

  private upload(file: UploadFile, fileList: UploadFile[]): void {
    if (!this.options.beforeUpload) {
      return this.post(file);
    }
    const before = this.options.beforeUpload(file, fileList);
    if (before instanceof Observable) {
      before.subscribe(
        (processedFile: UploadFile) => {
          const processedFileType = Object.prototype.toString.call(processedFile);
          if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
            this.attachUid(processedFile);
            this.post(processedFile);
          } else if (typeof processedFile === 'boolean' && processedFile !== false) {
            this.post(file);
          }
        },
        e => {
          warn(`Unhandled upload beforeUpload error`, e);
        }
      );
    } else if (before !== false) {
      return this.post(file);
    }
  }

  private post(file: UploadFile): void {
    if (this.destroy) {
      return;
    }
    const opt = this.options;
    const { uid } = file;
    let { data, headers } = opt;
    if (typeof data === 'function') {
      data = (data as (file: UploadFile) => {})(file);
    }
    if (typeof headers === 'function') {
      headers = (headers as (file: UploadFile) => {})(file);
    }
    const args: UploadXHRArgs = {
      action: opt.action,
      name: opt.name,
      headers,
      file,
      data,
      withCredentials: opt.withCredentials,
      onProgress: opt.onProgress
        ? e => {
            opt.onProgress!(e, file);
          }
        : undefined,
      onSuccess: (ret, xhr) => {
        this.clean(uid);
        opt.onSuccess!(ret, file, xhr);
      },
      onError: xhr => {
        this.clean(uid);
        opt.onError!(xhr, file);
      }
    };
    const req$ = (opt.customRequest || this.xhr).call(this, args);
    if (!(req$ instanceof Subscription)) {
      warn(`Must return Subscription type in '[nzCustomRequest]' property`);
    }
    this.reqs[uid] = req$;
    opt.onStart!(file);
  }

  private xhr(args: UploadXHRArgs): Subscription {
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append(args.name!, args.file as any);
    if (args.data) {
      Object.keys(args.data).map(key => {
        formData.append(key, args.data![key]);
      });
    }
    if (!args.headers) {
      args.headers = {};
    }
    if (args.headers['X-Requested-With'] !== null) {
      args.headers['X-Requested-With'] = `XMLHttpRequest`;
    } else {
      delete args.headers['X-Requested-With'];
    }
    const req = new HttpRequest('POST', args.action!, formData, {
      reportProgress: true,
      withCredentials: args.withCredentials,
      headers: new HttpHeaders(args.headers)
    });
    return this.http.request(req).subscribe(
      // tslint:disable-next-line no-any
      (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          args.onProgress!(event, args.file);
        } else if (event instanceof HttpResponse) {
          args.onSuccess!(event.body, args.file, event);
        }
      },
      err => {
        this.abort(args.file);
        args.onError!(err, args.file);
      }
    );
  }

  private clean(uid: string): void {
    const req$ = this.reqs[uid];
    if (req$ instanceof Subscription) {
      req$.unsubscribe();
    }
    delete this.reqs[uid];
  }

  abort(file?: UploadFile): void {
    if (file) {
      this.clean(file && file.uid);
    } else {
      Object.keys(this.reqs).forEach(uid => this.clean(uid));
    }
  }

  // #region styles

  private prefixCls = 'ant-upload';

  private setClassMap(): void {
    const classMap = {
      [this.prefixCls]: true,
      [`${this.prefixCls}-disabled`]: this.options.disabled,
      ...this.classes
    };
    this.updateHostClassService.updateHostClass(this.el.nativeElement, classMap);
  }

  // #endregion

  constructor(
    @Optional() private http: HttpClient,
    private el: ElementRef,
    private updateHostClassService: NzUpdateHostClassService
  ) {
    if (!http) {
      throw new Error(`Not found 'HttpClient', You can import 'HttpClientModule' in your root module.`);
    }
  }

  ngOnInit(): void {
    this.inited = true;
    this.setClassMap();
  }

  ngOnChanges(): void {
    if (this.inited) {
      this.setClassMap();
    }
  }

  ngOnDestroy(): void {
    this.destroy = true;
    this.abort();
  }
}
