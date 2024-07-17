import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-typography-interactive',
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
    <div>
      <p>
        <span>Trigger edit with: </span>
        <nz-radio-group [(ngModel)]="triggerState" nzName="triggerEdit">
          <label nz-radio [nzValue]="'icon'">icon</label>
          <label nz-radio [nzValue]="'text'">text</label>
          <label nz-radio [nzValue]="'both'">both</label>
        </nz-radio-group>
      </p>
      <p
        nz-typography
        nzEditable
        [nzTriggerType]="triggerState !== 'both' ? [triggerState] : ['icon', 'text']"
        [(nzContent)]="triggerEditStr"
      ></p>
    </div>
    <p nz-typography nzCopyable nzCopyText="Hello, Ant Design!">Replace copy text.</p>
    <p
      nz-typography
      nzCopyable
      nzContent="Custom copy icons and tooltips text."
      [nzCopyTooltips]="['click here', copedIcon]"
      [nzCopyIcons]="['meh', 'smile']"
    ></p>
    <ng-template #copedIcon>
      <span nz-icon nzType="smile" nzTheme="fill"></span>
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
  triggerEditStr = 'Text or icon as trigger - click to start editing.';

  nzEditTriggerStates = ['icon', 'text', 'both'] as const;
  triggerState: (typeof this.nzEditTriggerStates)[number] = 'icon';
}
