import { Input, Component, OnInit, ViewEncapsulation, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector     : 'nz-code-box',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <section class="code-box" [ngClass]="{'expand':nzExpanded}">
      <section class="code-box-demo">
        <div>
          <ng-content select="[demo]"></ng-content>
        </div>
      </section>
      <section class="code-box-meta markdown">
        <div class="code-box-title">
          <a>{{nzTitle}}</a>
        </div>
        <ng-content select="[intro]"></ng-content>
        <nz-tooltip [nzTitle]="nzExpanded?'收起代码':'展开代码'">
          <span class="code-expand-icon" nz-tooltip (click)="nzExpanded=!nzExpanded">
            <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/wSAkBuJFbdxsosKKpqyq.svg" [class.code-expand-icon-show]="nzExpanded" [class.code-expand-icon-hide]="!nzExpanded">
            <img alt="expand code" src="https://gw.alipayobjects.com/zos/rmsportal/OpROPHYqWmrMDBFMZtKF.svg" [class.code-expand-icon-show]="!nzExpanded" [class.code-expand-icon-hide]="nzExpanded">
          </span>
        </nz-tooltip>
      </section>
      <section class="highlight-wrapper" [ngClass]="{'highlight-wrapper-expand':nzExpanded}">
        <div class="highlight">
          <div class="code-box-actions">
            <nz-tooltip [nzTitle]="'复制代码'">
              <i nz-tooltip class="anticon code-box-code-copy" [class.anticon-copy]="!_copied" [class.anticon-check]="_copied" [class.ant-tooltip-open]="_copied" (click)="copyCode(_code)"></i>
            </nz-tooltip>
          </div>
          <nz-highlight [nzCode]="_code" [nzLanguage]="'typescript'"></nz-highlight>
        </div>
      </section>
    </section>
  `,
  styleUrls    : [
    './nz-codebox.less'
  ]
})
export class NzCodeBoxComponent implements OnInit {
  _code: string;
  _copied = false;

  @Input() nzTitle: string;
  @Input() nzExpanded = false;

  @Input()
  get nzCode(): string {
    return this._code;
  }

  set nzCode(value: string) {
    this._code = value;
  }

  copyCode(code) {
    this.copy(code).then(() => {
      this._copied = true;
      setTimeout(() => {
        this._copied = false;
      }, 1000);
    });
  }

  copy(value: string): Promise<string> {

    const promise = new Promise<string>(
      (resolve, reject): void => {
        let copyTextArea = null as HTMLTextAreaElement;
        try {
          copyTextArea = this.dom.createElement('textarea');
          copyTextArea.style.height = '0px';
          copyTextArea.style.opacity = '0';
          copyTextArea.style.width = '0px';
          this.dom.body.appendChild(copyTextArea);
          copyTextArea.value = value;
          copyTextArea.select();
          this.dom.execCommand('copy');
          resolve(value);
        } finally {
          if (copyTextArea && copyTextArea.parentNode) {
            copyTextArea.parentNode.removeChild(copyTextArea);
          }
        }
      }
    );

    return ( promise );

  }

  constructor(@Inject(DOCUMENT) private dom: Document, private _el: ElementRef) {

  }

  ngOnInit() {
  }
}
