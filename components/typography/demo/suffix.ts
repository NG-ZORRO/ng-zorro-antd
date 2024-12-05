import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'nz-demo-typography-suffix',
  imports: [FormsModule, NzSliderModule, NzTypographyModule],
  template: `
    <nz-slider [(ngModel)]="rows" [nzMax]="10" [nzMin]="1"></nz-slider>
    <p
      nz-typography
      nzEllipsis
      nzExpandable
      [attr.title]="content + suffix"
      [nzEllipsisRows]="rows"
      [nzSuffix]="suffix"
      (nzOnEllipsis)="onEllipsisChange($event)"
    >
      {{ content }}
    </p>
  `
})
export class NzDemoTypographySuffixComponent {
  content =
    'To be, or not to be, that is a question: Whether it is nobler in the mind to suffer. The slings and arrows of ' +
    'outrageous fortune Or to take arms against a sea of troubles, And by opposing end them? To die: to sleep; ' +
    'No more; and by a sleep to say we end The heart-ache and the thousand natural shocks That flesh is heir to, ' +
    'tis a consummation Devoutly to be wish d. To die, to sleep To sleep- perchance to dream: ay, there s the rub! ' +
    'For in that sleep of death what dreams may come When we have shuffled off this mortal coil, Must give us pause. ' +
    'There s the respect That makes calamity of so long life';

  suffix = '--William Shakespeare';
  rows = 1;

  onEllipsisChange(ellipsis: boolean): void {
    console.log(ellipsis);
  }
}
