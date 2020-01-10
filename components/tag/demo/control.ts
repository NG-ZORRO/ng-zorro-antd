import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'nz-demo-tag-control',
  template: `
    <nz-tag *ngFor="let tag of tags; let i = index" [nzMode]="i === 0 ? 'default' : 'closeable'" (nzAfterClose)="handleClose(tag)">
      {{ sliceTagName(tag) }}
    </nz-tag>
    <nz-tag *ngIf="!inputVisible" class="editable-tag" nzNoAnimation (click)="showInput()"> <i nz-icon nzType="plus"></i> New Tag </nz-tag>
    <input
      #inputElement
      nz-input
      nzSize="small"
      *ngIf="inputVisible"
      type="text"
      [(ngModel)]="inputValue"
      style="width: 78px;"
      (blur)="handleInputConfirm()"
      (keydown.enter)="handleInputConfirm()"
    />
  `,
  styles: [
    `
      .editable-tag {
        background: rgb(255, 255, 255);
        border-style: dashed;
      }
    `
  ]
})
export class NzDemoTagControlComponent {
  tags = ['Unremovable', 'Tag 2', 'Tag 3'];
  inputVisible = false;
  inputValue = '';
  @ViewChild('inputElement', { static: false }) inputElement: ElementRef;

  handleClose(removedTag: {}): void {
    this.tags = this.tags.filter(tag => tag !== removedTag);
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible = true;
    setTimeout(() => {
      this.inputElement.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue && this.tags.indexOf(this.inputValue) === -1) {
      this.tags = [...this.tags, this.inputValue];
    }
    this.inputValue = '';
    this.inputVisible = false;
  }
}
