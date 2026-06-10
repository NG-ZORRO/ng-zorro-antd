import { Component } from '@angular/core';

import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMentionModule } from 'ng-zorro-antd/mention';

@Component({
  selector: 'nz-demo-mention-placement',
  imports: [NzInputModule, NzMentionModule],
  template: `
    <nz-mention nzPlacement="top" [nzSuggestions]="suggestions" (nzOnSelect)="onSelect($event)">
      <textarea rows="1" nzMentionTrigger nz-input></textarea>
    </nz-mention>
  `
})
export class NzDemoMentionPlacementComponent {
  readonly suggestions = ['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご'];

  onSelect(suggestion: string): void {
    console.log(`onSelect ${suggestion}`);
  }
}
