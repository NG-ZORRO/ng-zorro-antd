import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-drawer-user-profile',
  template: `
    <nz-list [nzDataSource]="data" [nzRenderItem]="item" [nzItemLayout]="'horizontal'">
      <ng-template #item let-item>
        <nz-list-item [nzActions]="[viewAction]">
          <ng-template #viewAction>
            <a (click)="open()">View Profile</a>
          </ng-template>
          <nz-list-item-meta
            [nzTitle]="nzTitle"
            nzAvatar="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
            nzDescription="Progresser AFX">
            <ng-template #nzTitle>
              <a href="https://ng.ant.design">{{item.name}}</a>
            </ng-template>
          </nz-list-item-meta>
        </nz-list-item>
      </ng-template>
    </nz-list>
    <nz-drawer [nzVisible]="visible" [nzWidth]="640" [nzClosable]="false" (nzOnClose)="close()">
      <p class="title" style=" margin-bottom: 24px;">User Profile</p>
      <p class="title">Personal</p>
      <div nz-row>
        <div nz-col nzSpan="12">
          <div class="item-wrap">
            <p class="label">Full Name:</p>Lily
          </div>
        </div>
        <div nz-col nzSpan="12">
          <div class="item-wrap">
            <p class="label">Account:</p>AntDesign@example.com
          </div>
        </div>
      </div>
      <div nz-row>
        <div nz-col nzSpan="12">
          <div class="item-wrap">
            <p class="label">City:</p>HangZhou
          </div>
        </div>
        <div nz-col nzSpan="12">
          <div class="item-wrap">
            <p class="label">Country:</p>China🇨🇳
          </div>
        </div>
      </div>
      <div nz-row>
        <div nz-col nzSpan="12">
          <div class="item-wrap">
            <p class="label">Birthday:</p>February 2,1900
          </div>
        </div>
        <div nz-col nzSpan="12">
          <div class="item-wrap">
            <p class="label">Website:</p>-
          </div>
        </div>
      </div>
      <div nz-row>
        <div nz-col nzSpan="24">
          <div class="item-wrap">
            <p class="label">Message:</p>Make things as simple as possible but no simpler.
          </div>
        </div>
      </div>
      <nz-divider></nz-divider>
      <p class="title">Company</p>
      <div nz-row>
        <div nz-col nzSpan="12">
          <div class="item-wrap">
            <p class="label">Position:</p>Programmer
          </div>
        </div>
        <div nz-col nzSpan="12">
          <div class="item-wrap">
            <p class="label">Responsibilities:</p>Coding
          </div>
        </div>
      </div>
      <div nz-row>
        <div nz-col nzSpan="12">
          <div class="item-wrap">
            <p class="label">Department:</p>AFX
          </div>
        </div>
        <div nz-col nzSpan="12">
          <div class="item-wrap">
            <p class="label">Supervisor:</p>
            <a>Lin</a>
          </div>
        </div>
      </div>
      <div nz-row>
        <div nz-col nzSpan="24">
          <div class="item-wrap">
            <p class="label">Skills:</p>C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc.
          </div>
        </div>
      </div>
      <nz-divider></nz-divider>
      <p class="title">Contacts</p>
      <div nz-row>
        <div nz-col nzSpan="12">
          <div class="item-wrap">
            <p class="label">Email:</p>AntDesign@example.com
          </div>
        </div>
        <div nz-col nzSpan="12">
          <div class="item-wrap">
            <p class="label">Phone Number:</p>+86 181 0000 0000
          </div>
        </div>
      </div>
      <div nz-row>
        <div nz-col nzSpan="24">
          <div class="item-wrap">
            <p class="label">Github:</p>
            <a href="https://github.com/NG-ZORRO/ng-zorro-antd" target="_blank">github.com/NG-ZORRO/ng-zorro-antd</a>
          </div>
        </div>
      </div>
    </nz-drawer>
  `,
  styles: [
    `
    .title {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      line-height: 24px;
      display: block;
      margin-bottom: 16px;
    }
    .item-wrap {
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 7px;
      color: rgba(0, 0, 0, 0.65);
    }
    .label {
      margin-right: 8px;
      display: inline-block;
      color: rgba(0, 0, 0, 0.85);
    }
    `
  ]
})

export class NzDemoDrawerUserProfileComponent {

  data = [
    {
      name: 'Lily'
    },
    {
      name: 'Lily'
    }
  ];

  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
