import { Directive, HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: 'ul.anticons-list'
})
export class NzCopyIconDirective {
  @HostListener('click', [ '$event' ])
  onClick(e: MouseEvent): void {
    const target = e.target as HTMLElement;
    target.classList.add('copied');
    this.copy(target.querySelector('i').outerHTML).then(() => {
      setTimeout(() => {
        target.classList.remove('copied');
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

    return (promise);

  }

  constructor(@Inject(DOCUMENT) private dom: any) {

  }
}
