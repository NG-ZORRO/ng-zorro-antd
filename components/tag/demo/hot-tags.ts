import { Component } from '@angular/core';

const tagsFromServer = ['Movie', 'Books', 'Music', 'Sports'];

@Component({
  selector: 'nz-demo-tag-hot-tags',
  template: `
    <strong>Categories: </strong>
    <nz-tag
      *ngFor="let tag of hotTags"
      nzMode="checkable"
      [nzChecked]="selectedTags.indexOf(tag) > -1"
      (nzCheckedChange)="handleChange($event, tag)"
    >
      {{ tag }}
    </nz-tag>
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
