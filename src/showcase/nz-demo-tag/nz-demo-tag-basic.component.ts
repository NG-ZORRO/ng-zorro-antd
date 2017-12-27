import {Component} from '@angular/core';

@Component({
  selector: 'nz-demo-tag-basic',
  template: `
    <nz-tag>Tag 1</nz-tag>
    <nz-tag><a href="https://github.com/NG-ZORRO/ng-zorro-antd">Link</a></nz-tag>
    <nz-tag nzClosable (nzClose)="onClose($event)">Tag 2</nz-tag>
    <nz-tag nzClosable (nzBeforeClose)="preventDefault($event)">Prevent Default</nz-tag>
  `,
  styles  : []
})
export class NzDemoTagBasicComponent {

  onClose(event: Event): void {
    console.log('tag was closed.');
  }

  preventDefault(event: Event): void {
    event.preventDefault();
    console.log('tag can not be closed.');
  }
}

