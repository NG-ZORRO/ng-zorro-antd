import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzTypeHintDirective } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule, NzSelectOptionInterface, NzSelectOptionLabelContext } from 'ng-zorro-antd/select';

interface UserOption extends NzSelectOptionInterface {
  icon: string;
}

@Component({
  selector: 'nz-demo-select-options-template',
  imports: [FormsModule, NzIconModule, NzSelectModule, NzTypeHintDirective],
  template: `
    <ng-template #labelTemplate [nzTypeHint]="labelContext" let-option>
      <nz-icon [nzType]="option.icon" /> {{ option.value }}
    </ng-template>
    <nz-select ngModel="lucy" [nzOptions]="listOfOption" />
  `,
  styles: `
    nz-select {
      width: 160px;
    }
  `
})
export class NzDemoSelectOptionsTemplateComponent implements OnInit {
  @ViewChild('labelTemplate', { static: true })
  private readonly labelTemplate!: TemplateRef<NzSelectOptionLabelContext<UserOption>>;

  /** Only used to type the label template, its value is never read. */
  protected readonly labelContext!: NzSelectOptionLabelContext<UserOption>;

  listOfOption: UserOption[] = [];

  ngOnInit(): void {
    this.listOfOption = [
      { label: this.labelTemplate, value: 'jack', icon: 'user' },
      { label: this.labelTemplate, value: 'lucy', icon: 'team' }
    ];
  }
}
