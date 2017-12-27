import {Component} from '@angular/core';

@Component({
  selector: 'nz-demo-my-tag',
  template: `
    <nz-checkable-tag
      [nzChecked]="_checked" (nzChange)="_handleChange($event)">
      <ng-content></ng-content>
    </nz-checkable-tag>
  `,
  styles  : []
})
export class NzDemoMyTagComponent {
  _checked = true;

  _handleChange(checked: boolean): void {
    this._checked = checked;
  }
}


@Component({
  selector: 'nz-demo-tag-checkable',
  template: `
    <nz-demo-my-tag>Tag1</nz-demo-my-tag>
    <nz-demo-my-tag>Tag2</nz-demo-my-tag>
    <nz-demo-my-tag>Tag3</nz-demo-my-tag>
  `,
  styles  : []
})
export class NzDemoTagCheckableComponent { }
