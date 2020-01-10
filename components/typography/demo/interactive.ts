import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-typography-interactive',
  template: `
    <p nz-paragraph nzEditable [(nzContent)]="editStr"></p>
    <p nz-paragraph nzCopyable nzEditable [(nzContent)]="copyStr"></p>
    <p nz-paragraph nzCopyable nzCopyText="Hello, Ant Design!">Replace copy text.</p>
  `
})
export class NzDemoTypographyInteractiveComponent {
  editStr = 'This is an editable text.';
  copyStr = 'This is a copyable text.';
}
