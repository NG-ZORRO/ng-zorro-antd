import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-popover-placement',
  template: `
    <div style="margin-left: 60px">
        <nz-popover [nzTitle]="'Title'" [nzPlacement]="'topLeft'">
        <button nz-button nz-popover>TL</button>
        <ng-template #nzTemplate>
          <div><p>Content</p>
            <p>Content</p></div>
        </ng-template>
      </nz-popover>
        <nz-popover [nzTitle]="'Title'" [nzPlacement]="'top'">
        <button nz-button nz-popover>Top</button>
        <ng-template #nzTemplate>
          <div><p>Content</p>
            <p>Content</p></div>
        </ng-template>
      </nz-popover>
        <nz-popover [nzTitle]="'Title'" [nzPlacement]="'topRight'">
        <button nz-button nz-popover>TR</button>
        <ng-template #nzTemplate>
          <div><p>Content</p>
            <p>Content</p></div>
        </ng-template>
      </nz-popover>
    </div>
    <div style="width: 60px; float: left;">
        <nz-popover [nzTitle]="'Title'" [nzPlacement]="'leftTop'">
        <button nz-button nz-popover>LT</button>
        <ng-template #nzTemplate>
          <div><p>Content</p>
            <p>Content</p></div>
        </ng-template>
      </nz-popover>
        <nz-popover [nzTitle]="'Title'" [nzPlacement]="'left'">
        <button nz-button nz-popover>Left</button>
        <ng-template #nzTemplate>
          <div><p>Content</p>
            <p>Content</p></div>
        </ng-template>
      </nz-popover>
        <nz-popover [nzTitle]="'Title'" [nzPlacement]="'leftBottom'">
        <button nz-button nz-popover>LB</button>
        <ng-template #nzTemplate>
          <div><p>Content</p>
            <p>Content</p></div>
        </ng-template>
      </nz-popover>
    </div>
    <div style="width: 60px; margin-left: 252px;">
        <nz-popover [nzTitle]="'Title'" [nzPlacement]="'rightTop'">
        <button nz-button nz-popover>RT</button>
        <ng-template #nzTemplate>
          <div><p>Content</p>
            <p>Content</p></div>
        </ng-template>
      </nz-popover>
        <nz-popover [nzTitle]="'Title'" [nzPlacement]="'right'">
        <button nz-button nz-popover>Right</button>
        <ng-template #nzTemplate>
          <div><p>Content</p>
            <p>Content</p></div>
        </ng-template>
      </nz-popover>
        <nz-popover [nzTitle]="'Title'" [nzPlacement]="'rightBottom'">
        <button nz-button nz-popover>RB</button>
        <ng-template #nzTemplate>
          <div><p>Content</p>
            <p>Content</p></div>
        </ng-template>
      </nz-popover>
    </div>
    <div style="margin-left: 60px; clear: both;">
        <nz-popover [nzTitle]="'Title'" [nzPlacement]="'bottomLeft'">
        <button nz-button nz-popover>BL</button>
        <ng-template #nzTemplate>
          <div><p>Content</p>
            <p>Content</p></div>
        </ng-template>
      </nz-popover>
        <nz-popover [nzTitle]="'Title'" [nzPlacement]="'bottom'">
        <button nz-button nz-popover>Bottom</button>
        <ng-template #nzTemplate>
          <div><p>Content</p>
            <p>Content</p></div>
        </ng-template>
      </nz-popover>
        <nz-popover [nzTitle]="'Title'" [nzPlacement]="'bottomRight'">
        <button nz-button nz-popover>BR</button>
        <ng-template #nzTemplate>
          <div><p>Content</p>
            <p>Content</p></div>
        </ng-template>
      </nz-popover>
    </div>
  `,
  styles  : [ `
    :host ::ng-deep .ant-btn {
      margin-right: 8px;
      margin-bottom: 8px;
      width: 70px;
      text-align: center;
      padding: 0;
    }
  ` ]
})

export class NzDemoPopoverPlacementComponent implements OnInit {

  title: string;

  constructor() {
  }

  ngOnInit() {
  }
}
