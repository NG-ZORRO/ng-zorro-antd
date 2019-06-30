import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-code-editor-diff',
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

  code = `import { NzCodeEditorModule } from 'ng-zorro-antd';

@Component({})
export class SomeComponent {}`;
}
