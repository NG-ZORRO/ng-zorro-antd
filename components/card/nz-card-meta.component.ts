import {
  Component,
  ContentChild,
  Input,
  TemplateRef
} from '@angular/core';

@Component({
  selector           : '[nz-card-meta]',
  preserveWhitespaces: false,
  template           : `
    <div class="ant-card-meta-detail">
      <div class="ant-card-meta-avatar" *ngIf="nzAvatar">
        <ng-template [ngTemplateOutlet]="nzAvatar"></ng-template>
      </div>
      <div class="ant-card-meta-title" *ngIf="nzTitle">
        <ng-container *ngIf="isTitleString; else nzTitle">{{ nzTitle }}</ng-container>
      </div>
      <div class="ant-card-meta-description" *ngIf="nzDescription">
        <ng-container *ngIf="isDescriptionString; else nzDescription">{{ nzDescription }}</ng-container>
      </div>
    </div>
  `,
  host               : {
    '[class.ant-card-meta]': 'true'
  }
})
export class NzCardMetaComponent {
  private _title: string | TemplateRef<void>;
  private isTitleString: boolean;
  private _description: string | TemplateRef<void>;
  private isDescriptionString: boolean;
  @Input() nzAvatar: TemplateRef<void>;

  @Input()
  set nzTitle(value: string | TemplateRef<void>) {
    this.isTitleString = !(value instanceof TemplateRef);
    this._title = value;
  }

  get nzTitle(): string | TemplateRef<void> {
    return this._title;
  }

  @Input()
  set nzDescription(value: string | TemplateRef<void>) {
    this.isDescriptionString = !(value instanceof TemplateRef);
    this._description = value;
  }

  get nzDescription(): string | TemplateRef<void> {
    return this._description;
  }
}
