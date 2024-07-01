import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tag-basic',
  template: `
    <nz-tag>Tag 1</nz-tag>
    <nz-tag>
      <a href="https://github.com/NG-ZORRO/ng-zorro-antd">Link</a>
    </nz-tag>
    <nz-tag nzMode="closeable" (nzOnClose)="onClose()">Tag 2</nz-tag>
    <nz-tag nzMode="closeable" (nzOnClose)="preventDefault($event)">Prevent Default</nz-tag>
  `
})
export class NzDemoTagBasicComponent {
  onClose(): void {
    console.log('tag was closed.');
  }

  preventDefault(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    console.log('tag can not be closed.');
  }
}
