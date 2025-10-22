import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';

@Component({
  selector: 'nz-demo-code-editor-basic',
  imports: [FormsModule, NzCodeEditorModule],
  template: `
    <nz-code-editor class="editor" [ngModel]="code" [nzEditorOption]="{ language: 'typescript' }"></nz-code-editor>
  `,
  styles: [
    `
      .editor {
        height: 200px;
      }
    `
  ]
})
export class NzDemoCodeEditorBasicComponent {
  code = `import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor'

@Component({})
export class SomeComponent {}`;
}
