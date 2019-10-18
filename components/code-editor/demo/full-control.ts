import { Component } from '@angular/core';
import { editor } from 'monaco-editor';

// tslint:disable-next-line no-any
declare const monaco: any;

@Component({
  selector: 'nz-demo-code-editor-full-control',
  template: `
    <nz-code-editor class="editor" [nzFullControl]="true" (nzEditorInitialized)="onEditorInit($event)"></nz-code-editor>
  `,
  styles: [
    `
      .editor {
        height: 200px;
      }
    `
  ]
})
export class NzDemoCodeEditorFullControlComponent {
  editor: editor.ICodeEditor;

  code = `import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor'

@Component({})
export class SomeComponent {}`;

  onEditorInit(e: editor.ICodeEditor): void {
    this.editor = e;
    this.editor.setModel(monaco.editor.createModel("console.log('Hello ng-zorro-antd')", 'typescript'));
  }
}
