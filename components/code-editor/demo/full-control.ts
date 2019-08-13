import { Component } from '@angular/core';

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
  // tslint:disable-next-line no-any
  editor: any;

  code = `import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor'

@Component({})
export class SomeComponent {}`;

  // tslint:disable-next-line no-any
  onEditorInit(e: any): void {
    this.editor = e;
    this.editor.setModel(monaco.editor.createModel("console.log('Hello ng-zorro-antd')", 'typescript'));
  }
}
