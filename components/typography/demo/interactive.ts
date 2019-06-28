import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-typography-interactive',
  template: `
    <p nz-paragraph nzEditable [(nzContent)]="str"></p>
    <p nz-paragraph nzCopyable nzContent="This is a copyable text."></p>
    <p nz-paragraph nzCopyable nzCopyText="Hello, Ant Design!">Replace copy text.</p>
  `
})
export class NzDemoTypographyInteractiveComponent {
  str = 'This is an editable text.';
}
