import { Component } from '@angular/core';
import { Observable, Observer } from 'rxjs';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';

@Component({
  selector: 'nz-demo-upload-transform-file',
  imports: [NzButtonModule, NzIconModule, NzUploadModule],
  template: `
    <nz-upload nzAction="https://www.mocky.io/v2/5cc8019d300000980a055e76" [nzBeforeUpload]="transformFile">
      <button nz-button>
        <nz-icon nzType="upload" />
        Upload
      </button>
    </nz-upload>
  `
})
export class NzDemoUploadTransformFileComponent {
  transformFile = (file: NzUploadFile): Observable<Blob> =>
    new Observable((observer: Observer<Blob>) => {
      const reader = new FileReader();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      reader.readAsDataURL(file as any);
      reader.onload = () => {
        const canvas = document.createElement('canvas');
        const img = document.createElement('img');
        img.src = reader.result as string;
        img.onload = () => {
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0);
          ctx.fillStyle = 'red';
          ctx.textBaseline = 'middle';
          ctx.fillText('Ant Design', 20, 20);
          canvas.toBlob(blob => {
            observer.next(blob!);
            observer.complete();
          });
        };
      };
    });
}
