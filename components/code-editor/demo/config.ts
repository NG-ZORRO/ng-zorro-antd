import { Component } from '@angular/core';
import { NzCodeEditorService } from 'ng-zorro-antd/code-editor';

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
      <i nz-icon nzType="bulb"></i>
    </ng-template>
    <ng-template #checked>
      <i nz-icon nzType="poweroff"></i>
    </ng-template>
    <nz-code-editor style="height: 200px" [ngModel]="code" [nzEditorOption]="{ language: 'markdown' }"></nz-code-editor>
  `
})
export class NzDemoCodeEditorConfigComponent {
  dark = false;

  code = `**All monaco editor instances on the same page always have the same color. It's a by-design of monaco editor.**

You can refer to [this issue](https://github.com/Microsoft/monaco-editor/issues/338).`;

  constructor(private nzCodeEditorService: NzCodeEditorService) {}

  onDarkModeChange(dark: boolean): void {
    this.dark = dark;
    this.nzCodeEditorService.updateDefaultOption({ theme: dark ? 'vs-dark' : 'vs' });
  }
}
