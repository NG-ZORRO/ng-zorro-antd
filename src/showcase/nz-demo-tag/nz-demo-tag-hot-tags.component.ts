import {Component} from '@angular/core';

const tagsFromServer = ['Movie', 'Books', 'Music', 'Sports'];

@Component({
  selector: 'nz-demo-tag-hot-tags',
  template: `
    <strong>Categories: </strong>
    <nz-checkable-tag *ngFor="let tag of hotTags"
     [nzChecked]="selectedTags.indexOf(tag) > -1" (nzChange)="handleChange($event, tag)">
        {{tag}}
    </nz-checkable-tag>
  `,
  styles  : []
})
export class NzDemoTagHotTagsComponent {

  public hotTags = tagsFromServer;
  public selectedTags = [];

  handleChange(checked: boolean, tag: string): void {
    if (checked) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
    console.log('You are interested in: ', this.selectedTags);
  }
}
