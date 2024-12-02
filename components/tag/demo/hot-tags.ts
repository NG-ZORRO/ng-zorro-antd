import { Component } from '@angular/core';

import { NzTagModule } from 'ng-zorro-antd/tag';

const tagsFromServer = ['Movie', 'Books', 'Music', 'Sports'];

@Component({
  selector: 'nz-demo-tag-hot-tags',
  imports: [NzTagModule],
  template: `
    <strong>Categories:</strong>
    @for (tag of hotTags; track $index) {
      <nz-tag
        nzMode="checkable"
        [nzChecked]="selectedTags.indexOf(tag) > -1"
        (nzCheckedChange)="handleChange($event, tag)"
      >
        {{ tag }}
      </nz-tag>
    }
  `
})
export class NzDemoTagHotTagsComponent {
  hotTags = tagsFromServer;
  selectedTags: string[] = [];

  handleChange(checked: boolean, tag: string): void {
    if (checked) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
    console.log('You are interested in: ', this.selectedTags);
  }
}
