import { Component } from '@angular/core';

import { NzSelectModule } from 'ng-zorro-antd/select';

function alphabet(): string[] {
  const children: string[] = [];
  for (let i = 10; i < 36; i++) {
    children.push(i.toString(36) + i);
  }
  return children;
}

@Component({
  selector: 'nz-demo-select-automatic-tokenization',
  imports: [NzSelectModule],
  template: `
    <nz-select nzMode="tags" nzPlaceHolder="automatic tokenization" [nzOptions]="options" [nzTokenSeparators]="[',']" />
  `,
  styles: `
    nz-select {
      width: 100%;
    }
  `
})
export class NzDemoSelectAutomaticTokenizationComponent {
  readonly options = alphabet().map(item => ({
    label: item,
    value: item
  }));
}
