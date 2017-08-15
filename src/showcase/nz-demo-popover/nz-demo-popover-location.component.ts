import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-popover-location',
  template: `
    <div style="margin-left: 60px">
      <nz-popover [nzTitle]="'标题'" [nzPlacement]="'topLeft'">
        <button nz-button nz-popover>上左</button>
        <ng-template #nzTemplate>
          <div><p>内容</p>
            <p>内容</p></div>
        </ng-template>
      </nz-popover>
      <nz-popover [nzTitle]="'标题'" [nzPlacement]="'top'">
        <button nz-button nz-popover>上边</button>
        <ng-template #nzTemplate>
          <div><p>内容</p>
            <p>内容</p></div>
        </ng-template>
      </nz-popover>
      <nz-popover [nzTitle]="'标题'" [nzPlacement]="'topRight'">
        <button nz-button nz-popover>上右</button>
        <ng-template #nzTemplate>
          <div><p>内容</p>
            <p>内容</p></div>
        </ng-template>
      </nz-popover>
    </div>
    <div style="width: 60px; float: left;">
      <nz-popover [nzTitle]="'标题'" [nzPlacement]="'leftTop'">
        <button nz-button nz-popover>左上</button>
        <ng-template #nzTemplate>
          <div><p>内容</p>
            <p>内容</p></div>
        </ng-template>
      </nz-popover>
      <nz-popover [nzTitle]="'标题'" [nzPlacement]="'left'">
        <button nz-button nz-popover>左边</button>
        <ng-template #nzTemplate>
          <div><p>内容</p>
            <p>内容</p></div>
        </ng-template>
      </nz-popover>
      <nz-popover [nzTitle]="'标题'" [nzPlacement]="'leftBottom'">
        <button nz-button nz-popover>左下</button>
        <ng-template #nzTemplate>
          <div><p>内容</p>
            <p>内容</p></div>
        </ng-template>
      </nz-popover>
    </div>
    <div style="width: 60px; margin-left: 252px;">
      <nz-popover [nzTitle]="'标题'" [nzPlacement]="'rightTop'">
        <button nz-button nz-popover>右上</button>
        <ng-template #nzTemplate>
          <div><p>内容</p>
            <p>内容</p></div>
        </ng-template>
      </nz-popover>
      <nz-popover [nzTitle]="'标题'" [nzPlacement]="'right'">
        <button nz-button nz-popover>右边</button>
        <ng-template #nzTemplate>
          <div><p>内容</p>
            <p>内容</p></div>
        </ng-template>
      </nz-popover>
      <nz-popover [nzTitle]="'标题'" [nzPlacement]="'rightBottom'">
        <button nz-button nz-popover>右下</button>
        <ng-template #nzTemplate>
          <div><p>内容</p>
            <p>内容</p></div>
        </ng-template>
      </nz-popover>
    </div>
    <div style="margin-left: 60px; clear: both;">
      <nz-popover [nzTitle]="'标题'" [nzPlacement]="'bottomLeft'">
        <button nz-button nz-popover>下左</button>
        <ng-template #nzTemplate>
          <div><p>内容</p>
            <p>内容</p></div>
        </ng-template>
      </nz-popover>
      <nz-popover [nzTitle]="'标题'" [nzPlacement]="'bottom'">
        <button nz-button nz-popover>下边</button>
        <ng-template #nzTemplate>
          <div><p>内容</p>
            <p>内容</p></div>
        </ng-template>
      </nz-popover>
      <nz-popover [nzTitle]="'标题'" [nzPlacement]="'bottomRight'">
        <button nz-button nz-popover>下右</button>
        <ng-template #nzTemplate>
          <div><p>内容</p>
            <p>内容</p></div>
        </ng-template>
      </nz-popover>
    </div>
  `,
  styles  : [ `
    .ant-popover-wrap > a {
      margin-right: 1em;
    }

    .ant-btn {
      margin-right: 1em;
      margin-bottom: 1em;
    }
  ` ]
})

export class NzDemoPopoverLocationComponent implements OnInit {

  title: string;
  content = '<div><p>内容</p><p>内容</p></div>';

  constructor() {
  }

  ngOnInit() {
  }
}
