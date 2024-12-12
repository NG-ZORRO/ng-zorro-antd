import { Component } from '@angular/core';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'nz-demo-typography-interactive',
  imports: [NzIconModule, NzTypographyModule],
  template: `
    <p nz-typography nzEditable [(nzContent)]="editStr"></p>
    <p
      nz-typography
      nzEditable
      nzEditIcon="highlight"
      nzEditTooltip="click to edit text"
      [(nzContent)]="customEditIconStr"
    ></p>
    <p nz-typography nzEditable [nzEditTooltip]="null" [(nzContent)]="hideEditTooltipStr"></p>
    <p nz-typography nzCopyable nzEditable [(nzContent)]="copyStr"></p>
    <p nz-typography nzCopyable nzCopyText="Hello, Ant Design!">Replace copy text.</p>
    <p
      nz-typography
      nzCopyable
      nzContent="Custom copy icons and tooltips text."
      [nzCopyTooltips]="['click here', copedIcon]"
      [nzCopyIcons]="['meh', 'smile']"
    ></p>
    <ng-template #copedIcon>
      <nz-icon nzType="smile" nzTheme="fill" />
      you clicked!!
    </ng-template>
    <p nz-typography nzCopyable [nzCopyTooltips]="null" nzContent="Hide copy tooltips."></p>
  `,
  styles: [
    `
      p[nz-typography] {
        margin-bottom: 1em;
      }
    `
  ]
})
export class NzDemoTypographyInteractiveComponent {
  editStr = 'This is an editable text.';
  customEditIconStr = 'Custom edit icon and tooltip text.';
  hideEditTooltipStr = 'Hide edit tooltip.';
  copyStr = 'This is a copyable text.';
}
