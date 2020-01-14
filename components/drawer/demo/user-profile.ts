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
            nzDescription="Progresser AFX"
          >
            <ng-template #nzTitle>
              <a href="https://ng.ant.design">{{ item.name }}</a>
            </ng-template>
          </nz-list-item-meta>
        </nz-list-item>
      </ng-template>
    </nz-list>
    <nz-drawer [nzVisible]="visible" [nzWidth]="640" [nzClosable]="false" (nzOnClose)="close()">
      <p class="title" style=" margin-bottom: 24px;">User Profile</p>
      <nz-descriptions [nzColumn]="2" nzTitle="Personal">
        <nz-descriptions-item nzTitle="Full Name" [nzSpan]="1">Lily</nz-descriptions-item>
        <nz-descriptions-item nzTitle="Account" [nzSpan]="1">AntDesign@example.com</nz-descriptions-item>
        <nz-descriptions-item nzTitle="City" [nzSpan]="1">HangZhou</nz-descriptions-item>
        <nz-descriptions-item nzTitle="Country" [nzSpan]="1">China🇨🇳</nz-descriptions-item>
        <nz-descriptions-item nzTitle="Birthday" [nzSpan]="1">February 2,1900</nz-descriptions-item>
        <nz-descriptions-item nzTitle="Website" [nzSpan]="1"> - </nz-descriptions-item>
        <nz-descriptions-item nzTitle="Message" [nzSpan]="2">
          Make things as simple as possible but no simpler.
        </nz-descriptions-item>
      </nz-descriptions>
      <nz-divider></nz-divider>
      <nz-descriptions [nzColumn]="2" nzTitle="Company">
        <nz-descriptions-item nzTitle="Position" [nzSpan]="1">Programmer</nz-descriptions-item>
        <nz-descriptions-item nzTitle="Responsibilities" [nzSpan]="1">Coding</nz-descriptions-item>
        <nz-descriptions-item nzTitle="Department" [nzSpan]="1">AFX</nz-descriptions-item>
        <nz-descriptions-item nzTitle="Supervisor" [nzSpan]="1">Lin</nz-descriptions-item>
        <nz-descriptions-item nzTitle="Skills" [nzSpan]="2">
          C / C + +, data structures, software engineering, operating systems, computer networks, databases, compiler theory, computer
          architecture, Microcomputer Principle and Interface Technology, Computer English, Java, ASP, etc.
        </nz-descriptions-item>
      </nz-descriptions>
      <nz-divider></nz-divider>
      <nz-descriptions [nzColumn]="2" nzTitle="Contacts">
        <nz-descriptions-item nzTitle="Email" [nzSpan]="1">AntDesign@example.com</nz-descriptions-item>
        <nz-descriptions-item nzTitle="Phone Number" [nzSpan]="1">+86 181 0000 0000</nz-descriptions-item>
        <nz-descriptions-item nzTitle="Github" [nzSpan]="2">
          <a href="https://github.com/NG-ZORRO/ng-zorro-antd" target="_blank">github.com/NG-ZORRO/ng-zorro-antd</a>
        </nz-descriptions-item>
      </nz-descriptions>
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
