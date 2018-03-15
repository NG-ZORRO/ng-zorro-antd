import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button nz-button [nzType]="'primary'">测试按钮</button>
  `,
  styles: []
})
export class AppComponent {
  title = 'app';
}
