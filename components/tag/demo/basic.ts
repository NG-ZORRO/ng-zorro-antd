import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-tag-basic',
  template: `
    <nz-tag>Tag 1</nz-tag>
    <nz-tag>
      <a href="https://github.com/NG-ZORRO/ng-zorro-antd">Link</a>
    </nz-tag>
    <nz-tag nzMode="closeable" (nzOnClose)="onClose($event)" (nzAfterClose)="afterClose()">Tag 2</nz-tag>
    <nz-tag nzMode="closeable" (nzOnClose)="preventDefault($event)">Prevent Default</nz-tag>
  `,
  styles  : []
})
export class NzDemoTagBasicComponent {

  onClose(e: MouseEvent): void {
    console.log('tag was closed.');
  }

  afterClose(): void {
    console.log('after tag closed');
  }

  preventDefault(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    console.log('tag can not be closed.');
  }
}
