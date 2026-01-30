import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NzConfigService } from 'ng-zorro-antd/core/config';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'nz-demo-code-editor-config',
  imports: [FormsModule, NzCodeEditorModule, NzIconModule, NzSwitchModule, NzTypographyModule],
  template: `
    <p nz-paragraph style="margin-bottom: 8px;">
      Change Theme
      <nz-switch
        [ngModel]="dark"
        (ngModelChange)="onDarkModeChange($event)"
        [nzUnCheckedChildren]="unchecked"
        [nzCheckedChildren]="checked"
      />
    </p>
    <ng-template #unchecked>
      <nz-icon nzType="bulb" />
    </ng-template>
    <ng-template #checked>
      <nz-icon nzType="poweroff" />
    </ng-template>
    <nz-code-editor style="height: 200px" [ngModel]="code" [nzEditorOption]="{ language: 'markdown' }" />
  `
})
export class NzDemoCodeEditorConfigComponent {
  private nzConfigService = inject(NzConfigService);

  dark = false;

  code = `**All monaco editor instances on the same page always have the same color. It's a by-design of monaco editor.**

You can refer to [this issue](https://github.com/Microsoft/monaco-editor/issues/338).`;

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
