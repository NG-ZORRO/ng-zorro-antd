import { Component } from '@angular/core';
import { NzResultStatusType } from 'ng-zorro-antd/result';

interface StatusMap {
  title: string;
  subTitle?: string;
  extra: string;
}

const statusMap: { [key: string]: StatusMap } = {
  '403': {
    title: '403',
    subTitle: 'Sorry, you are not authorized to access this page.',
    extra: 'extra-403'
  },
  '404': {
    title: '404',
    subTitle: 'Sorry, the page you visited does not exist.',
    extra: 'extra-404'
  },
  '500': {
    title: '500',
    subTitle: 'Sorry, there is an internal server error.',
    extra: 'extra-500'
  },
  success: {
    title: 'Successfully Purchased Cloud Server ECS!',
    subTitle: 'Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait.',
    extra: 'extra-success'
  },
  info: {
    title: 'Your operation has been executed',
    extra: 'extra-info'
  },
  error: {
    title: 'Submission Failed',
    subTitle: 'Please check and modify the following information before resubmitting.',
    extra: 'extra-error'
  },
  warning: {
    title: 'There are some problems with your operation.',
    extra: 'extra-warning'
  }
};

@Component({
  selector: 'nz-demo-result-basic',
  template: `
    <nz-radio-group [(ngModel)]="status">
      <label *ngFor="let s of availableStatus" nz-radio [nzValue]="s">{{ s }}</label>
    </nz-radio-group>
    <nz-result [nzStatus]="status" [nzTitle]="statusMap[status]?.title" [nzSubTitle]="statusMap[status]?.subTitle">
      <div nz-result-extra [ngSwitch]="status">
        <button *ngSwitchCase="'403'" nz-button type="primary">Back Home</button>
        <button *ngSwitchCase="'404'" nz-button type="primary">Back Home</button>
        <button *ngSwitchCase="'500'" nz-button type="primary">Back Home</button>
        <ng-container *ngSwitchCase="'success'">
          <button nz-button nzType="primary">Go Console</button>
          <button nz-button>Buy Again</button>
        </ng-container>
        <button *ngSwitchCase="'info'" nz-button type="primary">Go Console</button>
        <button *ngSwitchCase="'warning'" nz-button type="primary">Go Console</button>
        <button *ngSwitchCase="'error'" nz-button type="primary">Go Console</button>
      </div>
    </nz-result>
  `
})
export class NzDemoResultBasicComponent {
  availableStatus = Object.keys(statusMap);
  status: NzResultStatusType = 'info';
  statusMap = statusMap;
}
