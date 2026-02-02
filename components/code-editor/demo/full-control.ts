import { Component } from '@angular/core';

import type { editor } from 'monaco-editor';

import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';

// eslint-disable-next-line  @typescript-eslint/no-explicit-any
declare const monaco: any;

@Component({
  selector: 'nz-demo-code-editor-full-control',
  imports: [NzCodeEditorModule],
  template: ` <nz-code-editor class="editor" [nzFullControl]="true" (nzEditorInitialized)="onEditorInit($event)" /> `,
  styles: `
    .editor {
      height: 200px;
    }
  `
})
export class NzDemoCodeEditorFullControlComponent {
  editor?: editor.ICodeEditor | editor.IEditor;

  onEditorInit(e: editor.ICodeEditor | editor.IEditor): void {
    this.editor = e;
    this.editor.setModel(monaco.editor.createModel("console.log('Hello ng-zorro-antd')", 'typescript'));
  }
}
