import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'nz-demo-input-allow-clear',
  imports: [FormsModule, NzInputModule, NzIconModule],
  template: `
    <nz-input-wrapper nzAllowClear>
      <input nz-input [(ngModel)]="inputValue" placeholder="input with clear icon" />
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper nzAllowClear>
      <input nz-input [(ngModel)]="inputValue" placeholder="input with custom clear icon" />
      <nz-icon nzInputClearIcon nzType="close" />
    </nz-input-wrapper>
    <br />
    <br />
    <nz-input-wrapper nzAllowClear>
      <textarea nz-input [(ngModel)]="textValue" placeholder="textarea with clear icon"></textarea>
    </nz-input-wrapper>
  `
})
export class NzDemoInputAllowClearComponent {
  inputValue: string | null = null;
  textValue: string | null = null;
}
