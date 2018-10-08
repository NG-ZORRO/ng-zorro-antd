import { Component } from '@angular/core';
import { HttpRequest, HttpClient, HttpEventType, HttpEvent, HttpResponse } from '@angular/common/http';
import { NzMessageService, UploadXHRArgs } from 'ng-zorro-antd';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'nz-demo-upload-custom-request',
  template: `
  <nz-upload
    nzAction="https://jsonplaceholder.typicode.com/posts/"
    [nzCustomRequest]="customReq">
    <button nz-button>
      <i nz-icon type="upload"></i><span>Click to Upload</span>
    </button>
  </nz-upload>
  `
})
export class NzDemoUploadCustomRequestComponent {

  constructor(private http: HttpClient, private msg: NzMessageService) {}

  customReq = (item: UploadXHRArgs) => {
    // 构建一个 FormData 对象，用于存储文件或其他参数
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    formData.append('id', '1000');
    const req = new HttpRequest('POST', item.action, formData, {
      reportProgress : true,
      withCredentials: true
    });
    // 始终返回一个 `Subscription` 对象，nz-upload 会在适当时机自动取消订阅
    return this.http.request(req).subscribe((event: HttpEvent<{}>) => {
      if (event.type === HttpEventType.UploadProgress) {
        if (event.total > 0) {
          // tslint:disable-next-line:no-any
          (event as any).percent = event.loaded / event.total * 100;
        }
        // 处理上传进度条，必须指定 `percent` 属性来表示进度
        item.onProgress(event, item.file);
      } else if (event instanceof HttpResponse) {
        // 处理成功
        item.onSuccess(event.body, item.file, event);
      }
    }, (err) => {
      // 处理失败
      item.onError(err, item.file);
    });
  }

  // 一个简单的分片上传
  customBigReq = (item: UploadXHRArgs) => {
    const size = item.file.size;
    const chunkSize = parseInt((size / 3) + '', 10);
    const maxChunk = Math.ceil(size / chunkSize);
    const reqs = Array(maxChunk).fill(0).map((v: {}, index: number) => {
      const start = index * chunkSize;
      let end = start + chunkSize;
      if (size - end < 0) {
        end = size;
      }
      const formData = new FormData();
      formData.append('file', item.file.slice(start, end));
      formData.append('start', start.toString());
      formData.append('end', end.toString());
      formData.append('index', index.toString());
      const req = new HttpRequest('POST', item.action, formData, {
        withCredentials: true
      });
      return this.http.request(req);
    });
    return forkJoin(...reqs).subscribe(resules => {
      // 处理成功
      item.onSuccess({}, item.file, event);
    }, (err) => {
      // 处理失败
      item.onError(err, item.file);
    });
  }
}
