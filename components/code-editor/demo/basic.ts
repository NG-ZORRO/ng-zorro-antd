import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-code-editor-basic',
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
