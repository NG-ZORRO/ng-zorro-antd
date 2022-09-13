import { Component } from '@angular/core';

import { NzConfigService } from 'ng-zorro-antd/core/config';

@Component({
  selector: 'nz-demo-code-editor-config',
  template: `
    <p nz-paragraph style="margin-bottom: 8px;">
      Change Theme
      <nz-switch
        [ngModel]="dark"
        (ngModelChange)="onDarkModeChange($event)"
        [nzUnCheckedChildren]="unchecked"
        [nzCheckedChildren]="checked"
      ></nz-switch>
    </p>
    <ng-template #unchecked>
      <span nz-icon nzType="bulb"></span>
    </ng-template>
    <ng-template #checked>
      <span nz-icon nzType="poweroff"></span>
    </ng-template>
    <nz-code-editor style="height: 200px" [ngModel]="code" [nzEditorOption]="{ language: 'markdown' }"></nz-code-editor>
  `
})
export class NzDemoCodeEditorConfigComponent {
  dark = false;

  code = `**All monaco editor instances on the same page always have the same color. It's a by-design of monaco editor.**

You can refer to [this issue](https://github.com/Microsoft/monaco-editor/issues/338).`;

  constructor(private nzConfigService: NzConfigService) {}

  onDarkModeChange(dark: boolean): void {
    this.dark = dark;
    const defaultEditorOption = this.nzConfigService.getConfigForComponent('codeEditor')?.defaultEditorOption || {};
    this.nzConfigService.set('codeEditor', {
      defaultEditorOption: {
        ...defaultEditorOption,
        theme: dark ? 'vs-dark' : 'vs'
      }
    });
  }
}
