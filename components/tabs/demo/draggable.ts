import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectorRef, Component, inject } from '@angular/core';

import { NzTabsModule } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'nz-demo-tabs-draggable',
  imports: [NzTabsModule, CdkDrag, CdkDropList],
  template: `
    <nz-tabs
      [(nzSelectedIndex)]="selectedTabIndex"
      class="example-drag-tabs"
      cdkDropList
      (cdkDropListDropped)="drop($event)"
      cdkDropListOrientation="horizontal"
      cdkDropListElementContainer=".ant-tabs-nav-list"
    >
      @for (tab of tabs; track tab) {
        <nz-tab [nzTitle]="title">
          {{ tab.content }}
        </nz-tab>
        <ng-template #title>
          <span cdkDrag cdkDragRootElement=".ant-tabs-tab" cdkDragPreviewClass="preview">
            {{ tab.name }}
          </span>
        </ng-template>
      }
    </nz-tabs>
  `,
  styles: [
    `
      :host ::ng-deep .ant-tabs-tab-btn {
        cursor: move;
      }
      nz-tabs.cdk-drop-list-dragging {
        pointer-events: none;
      }
      .preview.cdk-drag-animating {
        transition: all 250ms cubic-bezier(0, 0, 0.2, 1);
      }
      ::ng-deep .ant-tabs-tab.cdk-drag-placeholder .ant-tabs-tab-btn {
        opacity: 0.5;
      }
    `
  ]
})
export class NzDemoTabsDraggableComponent {
  private cdr = inject(ChangeDetectorRef);
  tabs = [
    {
      name: 'Tab 1',
      content: 'Content of Tab Pane 1'
    },
    {
      name: 'Tab 2',
      content: 'Content of Tab Pane 2'
    },
    {
      name: 'Tab 3',
      content: 'Content of Tab Pane 3'
    }
  ];
  selectedTabIndex = 0;

  drop(event: CdkDragDrop<string[]>): void {
    const prevActive = this.tabs[this.selectedTabIndex];
    moveItemInArray(this.tabs, event.previousIndex, event.currentIndex);
    this.selectedTabIndex = this.tabs.indexOf(prevActive);
    this.cdr.markForCheck();
  }
}
