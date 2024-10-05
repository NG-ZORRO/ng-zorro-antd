import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';

@Component({
  selector: 'nz-demo-code-editor-diff',
  standalone: true,
  imports: [FormsModule, NzCodeEditorModule],
  template: `
    <nz-code-editor
      class="editor"
      [nzOriginalText]="originalCode"
      [nzEditorMode]="'diff'"
      [ngModel]="code"
      [nzEditorOption]="{ language: 'typescript' }"
    ></nz-code-editor>
  `,
  styles: [
    `
      .editor {
        height: 200px;
      }
    `
  ]
})
export class NzDemoCodeEditorDiffComponent {
  originalCode = `import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';

@Component({})
export class SomeComponent {}`;

  code = `import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';

@Component({})
export class SomeComponent {}`;
}
