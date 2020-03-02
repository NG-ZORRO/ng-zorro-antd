import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-typography-suffix',
  template: `
    <nz-slider [(ngModel)]="rows" [nzMax]="10" [nzMin]="1"></nz-slider>
    <p nz-typography nzEllipsis nzExpandable [attr.title]="content + suffix" [nzEllipsisRows]="rows" [nzSuffix]="suffix">
      {{ content }}
    </p>
  `
})
export class NzDemoTypographySuffixComponent {
  content =
    'To be, or not to be, that is a question: Whether it is nobler in the mind to suffer. The slings and arrows of outrageous fortune';
  suffix = '--William Shakespeare';
  rows = 1;
}
