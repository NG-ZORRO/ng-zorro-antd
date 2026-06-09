import { Component, ElementRef, ViewChild, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzNoAnimationDirective } from 'ng-zorro-antd/core/animation';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'nz-demo-tag-control',
  imports: [FormsModule, NzIconModule, NzInputModule, NzTagModule, NzNoAnimationDirective],
  template: `
    @for (tag of tags(); track tag) {
      <nz-tag [nzMode]="$first ? 'default' : 'closeable'" (nzOnClose)="handleClose(tag)">
        {{ sliceTagName(tag) }}
      </nz-tag>
    }

    @if (!inputVisible()) {
      <nz-tag class="editable-tag" nzNoAnimation (click)="showInput()">
        <nz-icon nzType="plus" />
        New Tag
      </nz-tag>
    } @else {
      <input
        #inputElement
        nz-input
        nzSize="small"
        type="text"
        [ngModel]="inputValue()"
        (ngModelChange)="inputValue.set($event)"
        style="width: 78px;"
        (blur)="handleInputConfirm()"
        (keydown.enter)="handleInputConfirm()"
      />
    }
  `,
  styles: `
    .editable-tag {
      background: rgb(255, 255, 255);
      border-style: dashed;
    }
  `
})
export class NzDemoTagControlComponent {
  readonly tags = signal(['Unremovable', 'Tag 2', 'Tag 3']);
  readonly inputVisible = signal(false);
  readonly inputValue = signal('');
  @ViewChild('inputElement', { static: false }) inputElement?: ElementRef;

  handleClose(removedTag: string): void {
    this.tags.update(tags => tags.filter(tag => tag !== removedTag));
  }

  sliceTagName(tag: string): string {
    const isLongTag = tag.length > 20;
    return isLongTag ? `${tag.slice(0, 20)}...` : tag;
  }

  showInput(): void {
    this.inputVisible.set(true);
    setTimeout(() => {
      this.inputElement?.nativeElement.focus();
    }, 10);
  }

  handleInputConfirm(): void {
    const inputValue = this.inputValue();
    if (inputValue && this.tags().indexOf(inputValue) === -1) {
      this.tags.update(tags => [...tags, inputValue]);
    }
    this.inputValue.set('');
    this.inputVisible.set(false);
  }
}
