import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
@Component({
  selector: 'nz-highlight',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pre class="language-angular"><code [innerHTML]="code"></code></pre>
  `
})
export class NzHighlightComponent implements OnInit {
  code: SafeHtml | string;
  @ViewChild('code', { static: true }) codeElement: ElementRef;
  @Input() nzLanguage: string;

  @Input()
  get nzCode(): string | SafeHtml {
    return this.code || '';
  }

  set nzCode(value: string | SafeHtml) {
    this.code = this.sanitizer.bypassSecurityTrustHtml(value as string);
  }

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}
}
