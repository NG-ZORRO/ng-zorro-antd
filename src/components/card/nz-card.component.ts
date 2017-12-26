import {
  Component,
  ContentChild,
  HostBinding,
  Input,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { toBoolean } from '../util/convert';

@Component({
  selector     : 'nz-card',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="ant-card-head" *ngIf="title">
      <h3 class="ant-card-head-title">
        <ng-template
          [ngTemplateOutlet]="title">
        </ng-template>
      </h3>
      <div class="ant-card-extra" *ngIf="extra">
        <ng-template
          [ngTemplateOutlet]="extra">
        </ng-template>
      </div>
    </div>
    <div class="ant-card-body">
      <ng-template
        *ngIf="!nzLoading"
        [ngTemplateOutlet]="body">
      </ng-template>
      <div *ngIf="nzLoading">
        <p class="ant-card-loading-block" style="width: 94%;"></p>
        <p>
          <span class="ant-card-loading-block" style="width: 28%;"></span><span class="ant-card-loading-block" style="width: 62%;"></span>
        </p>
        <p>
          <span class="ant-card-loading-block" style="width: 22%;"></span><span class="ant-card-loading-block" style="width: 66%;"></span>
        </p>
        <p>
          <span class="ant-card-loading-block" style="width: 56%;"></span><span class="ant-card-loading-block" style="width: 39%;"></span>
        </p>
        <p>
          <span class="ant-card-loading-block" style="width: 21%;"></span><span class="ant-card-loading-block" style="width: 15%;"></span><span class="ant-card-loading-block" style="width: 40%;"></span>
        </p>
      </div>
    </div>
  `,
  styleUrls    : [
    './style/index.less',
    './style/patch.less'
  ],
  host: {
    '[class.ant-card]': 'true'
  }
})
export class NzCardComponent {
  private _borderd = true;
  private _loading = false;
  private _noHovering = false;

  @Input()
  @HostBinding('class.ant-card-bordered')
  set nzBordered(value: boolean) {
    this._borderd = toBoolean(value);
  }

  get nzBordered(): boolean {
    return this._borderd;
  }

  @ContentChild('title') title: TemplateRef<void>;
  @ContentChild('extra') extra: TemplateRef<void>;
  @ContentChild('body') body: TemplateRef<void>;

  @Input()
  set nzLoading(value: boolean) {
    this._loading = toBoolean(value);
  }

  get nzLoading(): boolean {
    return this._loading;
  }

  @Input()
  @HostBinding('class.ant-card-no-hovering')
  set nzNoHovering(value: boolean) {
    this._noHovering = toBoolean(value);
  }

  get nzNoHovering(): boolean {
    return this._noHovering;
  }
}
