// tslint:disable: no-any
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';

import { NzUpdateHostClassService } from '../core/services/update-host-class.service';
import { NzI18nService } from '../i18n/nz-i18n.service';

import { ShowUploadListInterface, UploadFile, UploadListType } from './interface';

@Component({
  selector: 'nz-upload-list',
  template: `
  <div *ngFor="let file of items" class="ant-upload-list-item ant-upload-list-item-{{file.status}}" @itemState>
    <ng-template #icon>
      <ng-container *ngIf="listType === 'picture' || listType === 'picture-card'; else defIcon">
        <ng-container *ngIf="file.status === 'uploading' || (!file.thumbUrl && !file.url); else thumbIcon">
          <div *ngIf="listType === 'picture-card'" class="ant-upload-list-item-uploading-text">{{ locale.uploading }}</div>
          <i *ngIf="listType !== 'picture-card'" class="anticon anticon-picture ant-upload-list-item-thumbnail"></i>
        </ng-container>
      </ng-container>
      <ng-template #defIcon>
        <i class="anticon anticon-{{file.status === 'uploading' ? 'loading anticon-spin' : 'paper-clip'}}"></i>
      </ng-template>
      <ng-template #thumbIcon>
        <a class="ant-upload-list-item-thumbnail" target="_blank" rel="noopener noreferrer"
          [href]="file.thumbUrl || file.url"
          (click)="handlePreview(file, $event)">
          <img [src]="file.thumbUrl || file.url" [attr.alt]="file.name" />
        </a>
      </ng-template>
    </ng-template>
    <ng-template #preview>
      <ng-container *ngIf="file.url; else prevText">
        <a [href]="file.thumbUrl || file.url" target="_blank" rel="noopener noreferrer"
          (click)="handlePreview(file, $event)" class="ant-upload-list-item-name" title="{{ file.name }}">{{ file.name }}</a>
      </ng-container>
      <ng-template #prevText>
        <span (click)="handlePreview(file, $event)" class="ant-upload-list-item-name" title="{{ file.name }}">{{ file.name }}</span>
      </ng-template>
    </ng-template>
    <div class="ant-upload-list-item-info">
      <nz-tooltip *ngIf="file.status === 'error'" [nzTitle]="file.message">
        <span nz-tooltip>
          <ng-template [ngTemplateOutlet]="icon"></ng-template>
          <ng-template [ngTemplateOutlet]="preview"></ng-template>
        </span>
      </nz-tooltip>
      <span *ngIf="file.status !== 'error'">
        <ng-template [ngTemplateOutlet]="icon"></ng-template>
        <ng-template [ngTemplateOutlet]="preview"></ng-template>
      </span>
    </div>
    <ng-container *ngIf="listType === 'picture-card' && file.status !== 'uploading'; else cross">
      <span class="ant-upload-list-item-actions">
        <a *ngIf="icons.showPreviewIcon" [href]="file.thumbUrl || file.url"
          target="_blank" rel="noopener noreferrer"
          title="{{ locale.previewFile }}"
          [ngStyle]="!(file.url || file.thumbUrl) && {'opacity': .5, 'pointer-events': 'none'}"
          (click)="handlePreview(file, $event)">
            <i class="anticon anticon-eye-o"></i>
        </a>
        <i *ngIf="icons.showRemoveIcon" (click)="handleRemove(file, $event)" class="anticon anticon-delete" title="{{ locale.removeFile }}"></i>
      </span>
    </ng-container>
    <ng-template #cross>
      <i *ngIf="icons.showRemoveIcon" (click)="handleRemove(file, $event)" class="anticon anticon-cross" title="{{ locale.removeFile }}"></i>
    </ng-template>
    <div *ngIf="file.status === 'uploading'" class="ant-upload-list-item-progress">
      <nz-progress [nzPercent]="file.percent" [nzShowInfo]="false" [nzStrokeWidth]="2"></nz-progress>
    </div>
  </div>
  `,
  providers          : [ NzUpdateHostClassService ],
  animations: [
    trigger('itemState', [
      transition(':enter', [
        style({ height: '0', width: '0', opacity: 0 }),
        animate(150, style({ height: '*', width: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        animate(150, style({ height: '0', width: '0', opacity: 0 }))
      ])
    ])
  ],
  preserveWhitespaces: false
})
export class NzUploadListComponent implements OnInit, OnChanges {
  // region: fields
  @Input() listType: UploadListType;
  @Input() items: UploadFile[];
  @Input() icons: ShowUploadListInterface;
  @Input() onPreview: (file: UploadFile) => void;
  @Input() onRemove: (file: UploadFile) => void;

  // endregion
  // region: styles
  private prefixCls = 'ant-upload-list';

  setClassMap(): void {
    const classMap = {
      [this.prefixCls]: true,
      [`${this.prefixCls}-${this.listType}`]: true
    };
    this.updateHostClassService.updateHostClass(this.el.nativeElement, classMap);
  }

  // endregion
  // region: render
  private locale = {
    uploading: this.i18n.translate('Upload.uploading'),
    previewFile: this.i18n.translate('Upload.previewFile'),
    removeFile: this.i18n.translate('Upload.removeFile')
  };

  handlePreview(file: UploadFile, e: Event): void {
    if (!this.onPreview) { return; }

    e.preventDefault();
    return this.onPreview(file);
  }

  handleRemove(file: UploadFile, e: Event): void {
    e.preventDefault();
    if (this.onRemove) { this.onRemove(file); }
    return ;
  }

  // endregion
  constructor(private el: ElementRef, private updateHostClassService: NzUpdateHostClassService, private i18n: NzI18nService) {}

  ngOnInit(): void {}

  ngOnChanges(changes: { [P in keyof this]?: SimpleChange } & SimpleChanges): void {
    this.setClassMap();
  }
}
