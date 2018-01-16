import {
  Component,
  ContentChild,
  TemplateRef
} from '@angular/core';

@Component({
  selector           : '[nz-card-meta]',
  preserveWhitespaces: false,
  template           : `
    <div class="ant-card-meta-detail">
      <div class="ant-card-meta-avatar" *ngIf="avatar">
        <ng-template [ngTemplateOutlet]="avatar"></ng-template>
      </div>
      <div class="ant-card-meta-title" *ngIf="title">
        <ng-template [ngTemplateOutlet]="title"></ng-template>
      </div>
      <div class="ant-card-meta-description" *ngIf="description">
        <ng-template [ngTemplateOutlet]="description"></ng-template>
      </div>
    </div>
  `,
  host               : {
    '[class.ant-card-meta]': 'true'
  }
})
export class NzCardMetaComponent {
  @ContentChild('metaTitle') title: TemplateRef<void>;
  @ContentChild('metaDescription') description: TemplateRef<void>;
  @ContentChild('metaAvatar') avatar: TemplateRef<void>;
}
