import { Directive, ElementRef, HostBinding, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[nz-icon-copy]'
})
export class NzIconCopyDirective {
  @HostBinding('class.copied') copied = false;

  @HostListener('click')
  onClick() {
    this.copy(`<i class="${this._el.nativeElement.children[ 0 ].className}"></i>`).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
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
}
