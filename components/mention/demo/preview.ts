import { Component, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'nz-demo-mention-preview',
  encapsulation: ViewEncapsulation.None,
  template: `
    <nz-tabset>
      <nz-tab nzTitle="Write">
        <nz-mention [nzSuggestions]="suggestions">
          <textarea
            nz-input
            [nzAutosize]="{ minRows: 4, maxRows: 4 }"
            [(ngModel)]="inputValue"
            (ngModelChange)="renderPreView()"
            nzMentionTrigger
          >
          </textarea>
        </nz-mention>
      </nz-tab>
      <nz-tab nzTitle="Preview">
        <pre [innerHTML]="preview"></pre>
      </nz-tab>
    </nz-tabset>
  `
})
export class NzDemoMentionPreviewComponent {
  inputValue: string = 'Switch tab view preview @NG-ZORRO ';
  preview: SafeHtml;
  suggestions = ['NG-ZORRO', 'angular', 'Reactive-Extensions'];

  constructor(private sanitizer: DomSanitizer) {
    this.renderPreView();
  }

  getRegExp(prefix: string | string[]): RegExp {
    const prefixArray = Array.isArray(prefix) ? prefix : [prefix];
    let prefixToken = prefixArray.join('').replace(/(\$|\^)/g, '\\$1');

    if (prefixArray.length > 1) {
      prefixToken = `[${prefixToken}]`;
    }

    return new RegExp(`(\\s|^)(${prefixToken})[^\\s]*`, 'g');
  }

  renderPreView(): void {
    if (this.inputValue) {
      const regex = this.getRegExp('@');
      const previewValue = this.inputValue.replace(
        regex,
        match => `<a target="_blank" href="https://github.com/${match.trim().substring(1)}">${match}</a>`
      );
      this.preview = this.sanitizer.bypassSecurityTrustHtml(previewValue);
    }
  }
}
