import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'nz-highlight',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pre class="language-angular"><code [innerHTML]="nzCode"></code></pre>
  `
})
export class NzHighlightComponent implements OnInit {
  _code: string;
  @ViewChild('code', { static: true }) codeElement: ElementRef;
  @Input() nzLanguage: string;

  @Input()
  get nzCode(): string {
    return this._code || '';
  }

  set nzCode(value: string) {
    this._code = decodeURIComponent(value).trim();
  }

  constructor() {}

  ngOnInit(): void {}
}
