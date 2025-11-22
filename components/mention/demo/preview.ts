import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMentionModule } from 'ng-zorro-antd/mention';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'nz-demo-mention-preview',
  imports: [FormsModule, NzInputModule, NzMentionModule, NzTabsModule, CdkTextareaAutosize],
  template: `
    <nz-tabs>
      <nz-tab nzTitle="Write">
        <nz-mention [nzSuggestions]="suggestions">
          <textarea
            nz-input
            cdkTextareaAutosize
            cdkAutosizeMinRows="4"
            cdkAutosizeMaxRows="4"
            [(ngModel)]="inputValue"
            (ngModelChange)="renderPreView()"
            nzMentionTrigger
          ></textarea>
        </nz-mention>
      </nz-tab>
      <nz-tab nzTitle="Preview">
        <pre [innerHTML]="preview"></pre>
      </nz-tab>
    </nz-tabs>
  `
})
export class NzDemoMentionPreviewComponent {
  inputValue: string = 'Switch tab view preview @NG-ZORRO ';
  preview?: SafeHtml;
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
