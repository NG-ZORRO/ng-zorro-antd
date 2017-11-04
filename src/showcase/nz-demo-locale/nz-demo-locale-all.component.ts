import { Component, OnInit } from '@angular/core';
import { zhCN, enUS, NzModalService, NzLocaleService } from '../../../index.showcase';

@Component({
  selector: 'nz-demo-locale-all',
  template: `
    <div>
      <div style="margin-bottom: 16px;">
        <span style="margin-right: 16px;">Change locale of components: </span>
        <nz-radio-group [(ngModel)]="locale">
          <label nz-radio-button [nzValue]="enUS"><span>English</span></label>
          <label nz-radio-button [nzValue]="zhCN"><span>中文</span></label>
        </nz-radio-group>
      </div>

      <!-- A cheap but ugly way to enforce re-render all page components (DEMO ONLY) -->
      <ng-container *ngIf="locale === zhCN">
        <ng-container *ngTemplateOutlet="tplLocale"></ng-container>
      </ng-container>
      <ng-container *ngIf="locale === enUS">
        <ng-container *ngTemplateOutlet="tplLocale"></ng-container>
      </ng-container>
      <ng-template #tplLocale>
        <nz-demo-locale-all-page></nz-demo-locale-all-page>
      </ng-template>
    </div>
  `,
})
export class NzDemoLocaleAllComponent implements OnInit {
  zhCN = zhCN;
  enUS = enUS;

  _locale;
  get locale() {
    return this._locale;
  }
  set locale(locale) {
    this._locale = locale;
    /* Switch locale manually (DEMO ONLY) */
    this._localeService.setLocale(locale);
  }

  constructor(private _localeService: NzLocaleService) {}

  ngOnInit() {
    this.locale = enUS;
  }
}

@Component({
  selector: 'nz-demo-locale-all-page',
  template: `
    <div class="locale-components">
      <div class="example">
        <nz-pagination [nzPageIndex]="3" [nzTotal]="500" nzShowSizeChanger [nzPageSize]="40"></nz-pagination>
      </div>
      <div class="example">
        <nz-select style="width: 200px;" nzAllowClear [nzShowSearch]="true">
          <nz-option [nzLabel]="'wilson'" [nzValue]="'wilson'"></nz-option>
          <nz-option [nzLabel]="'lucy'" [nzValue]="'lucy'"></nz-option>
        </nz-select>
        <nz-datepicker></nz-datepicker>
        <nz-timepicker></nz-timepicker>
      </div>
      <div class="example">
        <button nz-button [nzType]="'primary'" (click)="showModal()">Show Modal</button>
        <button nz-button (click)="showInfo()">Show Info</button>
        <button nz-button (click)="showConfirm()">Show Info</button>
        <nz-popconfirm [nzTitle]="'Question?'">
          <a nz-popconfirm>Click to confirm</a>
        </nz-popconfirm>
      </div>
      <nz-calendar [nzFullScreen]="false" style="width: 319px; border: 1px solid #d9d9d9; borderRadius: 4px;"></nz-calendar>
      <div class="example">
        <nz-table #nzTable [nzDataSource]="[]">
          <thead nz-thead>
            <tr>
              <th nz-th><span>Name</span></th>
              <th nz-th><span>Age</span></th>
            </tr>
          </thead>
          <tbody nz-tbody>
            <tr nz-tbody-tr *ngFor="let data of nzTable.data">
              <td nz-td>{{data.name}}</td>
              <td nz-td>{{data.age}}</td>
            </tr>
          </tbody>
        </nz-table>
      </div>
    </div>
  `,
  styles: [`
    .locale-components {
      border-top: 1px solid #d9d9d9;
      padding-top: 16px;
    }
    .example {
      margin: 16px 0;
    }
    .example > * {
      margin-right: 8px;
    }
  `],
})

export class NzDemoLocaleAllPageComponent {
  constructor(private _modal: NzModalService) {}

  showModal() {
    this._modal.open({
      title: 'Locale Modal',
      content: 'Locale Modal',
    });
  }

  showInfo() {
    this._modal.info({
      title: 'some info',
      content: 'some info',
    });
  }

  showConfirm() {
    this._modal.confirm({
      title: 'some info',
      content: 'some info',
    });
  }
}
