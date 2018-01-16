import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'nz-demo-tag-control',
  template: `
    <nz-tag *ngFor="let tag of tags; let i = index;"
      [nzClosable]="i !== 0"
      (nzClose)="handleClose(tag)">
      {{ sliceTagName(tag) }}
    </nz-tag>
    <button nz-button *ngIf="!inputVisible"
      [nzSize]="'small'" [nzType]="'dashed'"
      (click)="showInput()">+ New Tag
    </button>
    <input nz-input #input
      nzSize="small"
      *ngIf="inputVisible" type="text"
      [(ngModel)]="inputValue"
      style="width: 78px;"
      (blur)="handleInputConfirm()" (keydown.enter)="handleInputConfirm()">
  `,
  styles  : []
})
export class NzDemoTagControlComponent {

  tags = [ 'Unremovable', 'Tag 2', 'Tag 3' ];
  inputVisible = false;
  inputValue = '';
  @ViewChild('input') input: ElementRef;

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
      this.input.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    if (this.inputValue) {
      this.tags.push(this.inputValue);
    }
    this.inputValue = '';
    this.inputVisible = false;
  }
}
