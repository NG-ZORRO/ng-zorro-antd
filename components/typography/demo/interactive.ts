import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-typography-interactive',
  template: `
    <p nz-typography nzEditable [(nzContent)]="editStr"></p>
    <p nz-typography nzCopyable nzEditable [(nzContent)]="copyStr"></p>
    <p nz-typography nzCopyable nzCopyText="Hello, Ant Design!">Replace copy text.</p>
  `
})
export class NzDemoTypographyInteractiveComponent {
  editStr = 'This is an editable text.';
  copyStr = 'This is a copyable text.';
}
