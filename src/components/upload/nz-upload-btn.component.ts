// tslint:disable:no-any ordered-imports
import { Component, ViewChild, ElementRef, HostListener, OnInit, OnChanges, OnDestroy, SimpleChange, SimpleChanges, ChangeDetectorRef, Input, Renderer2, Optional } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ZipButtonOptions } from './interface';

@Component({
  selector: '[nz-upload-btn]',
  template: `
  <input type="file" #file (change)="onChange($event)"
    [attr.accept]="options.accept" [multiple]="options.multiple" style="display: none;">
  <ng-content></ng-content>
  `,
  host: {
    '[class.ant-upload]': 'true',
    '[attr.tabindex]': '"0"',
    '[attr.role]': '"button"'
  },
  preserveWhitespaces: false
})
export class NzUploadBtnComponent implements OnInit, OnChanges, OnDestroy {
  private reqs: { [key: string]: Subscription } = {};
  private inited = false;
  private destroy = false;

  @ViewChild('file') file: ElementRef;

  // region: fields

  @Input() classes: string[] = [];
  @Input() options: ZipButtonOptions;

  // endregion

  @HostListener('click')
  onClick(): void {
    if (this.options.disabled || !this.file) return;
    (this.file.nativeElement as HTMLInputElement).click();
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(e: KeyboardEvent): void {
    if (this.options.disabled) return;
    if (e.key === 'Enter') {
      this.onClick();
    }
  }

  @HostListener('drop', ['$event'])
  @HostListener('dragover', ['$event'])
  onFileDrop(e: DragEvent): void {
    if (this.options.disabled) return;
    if (e.type === 'dragover') {
      e.preventDefault();
      return;
    }
    const files = Array.prototype.slice.call(e.dataTransfer.files).filter(
      file => this.attrAccept(file, this.options.accept)
    );
    this.uploadFiles(files);

    e.preventDefault();
  }

  onChange(e: any): void {
    if (this.options.disabled) return;
    this.uploadFiles(e.target.files);
    e.target.value = '';
  }

  private attrAccept(file: any, acceptedFiles: any): boolean {
    if (file && acceptedFiles) {
      const acceptedFilesArray = Array.isArray(acceptedFiles)
        ? acceptedFiles
        : acceptedFiles.split(',');
      const fileName = file.name || '';
      const mimeType = file.type || '';
      const baseMimeType = mimeType.replace(/\/.*$/, '');

      return acceptedFilesArray.some(type => {
        const validType = type.trim();
        if (validType.charAt(0) === '.') {
          return fileName.toLowerCase().indexOf(validType.toLowerCase(), fileName.toLowerCase().length - validType.toLowerCase().length) !== -1;
        } else if (/\/\*$/.test(validType)) {
          // This is something like a image/* mime type
          return baseMimeType === validType.replace(/\/.*$/, '');
        }
        return mimeType === validType;
      });
    }
    return true;
  }

  private uploadFiles(fileList: any[]): void {
    let postFiles: any[] = Array.prototype.slice.call(fileList);
    this.options.filters.forEach(f => postFiles = f.fn(postFiles));
    postFiles.forEach((file: any) => {
      file.uid = Math.random().toString(36).substring(2);
      this.upload(file, postFiles);
    });
  }

  private upload(file: any, fileList: any[]): any {
    if (!this.options.beforeUpload) {
      return this.post(file);
    }
    const before = this.options.beforeUpload(file, fileList);
    if (before instanceof Observable) {
      before.subscribe((processedFile: any) => {
        const processedFileType = Object.prototype.toString.call(processedFile);
        if (processedFileType === '[object File]' || processedFileType === '[object Blob]') {
          this.post(processedFile);
        } else {
          this.post(file);
        }
      }, (err) => {
        // tslint:disable-next-line:no-unused-expression
        console && console.log(err);
      });
    } else if (before !== false) {
      return this.post(file);
    }
  }

  private post(file: any): void {
    if (this.destroy) return;
    const opt = this.options;
    const request = opt.customRequest || this.xhr;
    const { uid } = file;
    let { data } = opt;
    if (typeof data === 'function') {
      data = data(file);
    }
    this.reqs[uid] = (opt.customRequest || this.xhr).call(this, {
      action: opt.action,
      name: opt.name,
      headers: opt.headers,
      file,
      data,
      withCredentials: opt.withCredentials,
      onProgress: opt.onProgress ? e => {
        opt.onProgress(e, file);
      } : null,
      onSuccess: (ret, xhr) => {
        delete this.reqs[uid];
        opt.onSuccess(ret, file, xhr);
      },
      onError: (xhr) => {
        delete this.reqs[uid];
        opt.onError(xhr, file);
      }
    });
    opt.onStart(file);
  }

  private xhr(args: any): Subscription {
    const formData = new FormData();
    formData.append(args.name, args.file);
    if (args.data) {
      Object.keys(args.data).map(key => {
        formData.append(key, args.data[key]);
      });
    }
    if (!args.headers) args.headers = {};
    if (args.headers['X-Requested-With'] !== null) {
      args.headers['X-Requested-With'] = `XMLHttpRequest`;
    }
    const req = new HttpRequest('POST', args.action, formData, {
      reportProgress: true,
      withCredentials: args.withCredentials,
      headers: new HttpHeaders(args.headers)
    });
    return this.http.request(req).subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress) {
        if (event.total > 0) {
          event.percent = event.loaded / event.total * 100;
        }
        args.onProgress(event);
      } else if (event instanceof HttpResponse) {
        args.onSuccess(event.body, event);
      }
    }, (err) => {
      this.abort(args);
      args.onError(err);
    });
  }

  abort(file?: any): void {
    if (file) {
      let uid: any = file;
      if (file && file.uid) {
        uid = file.uid;
      }
      if (this.reqs[uid]) {
        this.reqs[uid].unsubscribe();
        delete this.reqs[uid];
      }
    } else {
      Object.keys(this.reqs).forEach((uid) => {
        if (this.reqs[uid]) {
          this.reqs[uid].unsubscribe();
        }

        delete this.reqs[uid];
      });
    }
  }

  // region: styles
  _prefixCls = 'ant-upload';
  _classList: string[] = [];
  _setClassMap(): void {
    this._classList.forEach(cls => this._renderer.removeClass(this._el.nativeElement, cls));
    this._classList = [
      this._prefixCls,
      this.options.disabled && `${this._prefixCls}-disabled`,
      ...this.classes
    ].filter(item => !!item);

    this._classList.forEach(cls => this._renderer.addClass(this._el.nativeElement, cls));
    this.cd.detectChanges();
  }
  // endregion

  constructor(@Optional() private http: HttpClient, private _el: ElementRef, private _renderer: Renderer2, private cd: ChangeDetectorRef) {
    if (!http) throw new Error(`Not found 'HttpClient', You can import 'HttpClientModel' in your root module.`);
  }

  ngOnInit(): void {
    this.inited = true;
    this._setClassMap();
  }

  ngOnChanges(changes: { [P in keyof this]?: SimpleChange } & SimpleChanges): void {
    if (this.inited) {
      this._setClassMap();
    }
  }

  ngOnDestroy(): void {
    this.destroy = true;
    this.abort();
  }
}
