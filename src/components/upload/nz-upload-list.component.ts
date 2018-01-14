// tslint:disable:ordered-imports no-any
import { Component, Input, Renderer2, ElementRef, SimpleChange, SimpleChanges, OnInit, OnChanges } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NzLocaleService } from '../locale/index';
import { UploadListType, UploadFile, ShowUploadListInterface } from './interface';

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
        <i *ngIf="icons.showRemoveIcon" (click)="handleClose(file)" class="anticon anticon-delete" title="{{ locale.removeFile }}"></i>
      </span>
    </ng-container>
    <ng-template #cross>
      <i *ngIf="icons.showRemoveIcon" (click)="handleClose(file)" class="anticon anticon-cross" title="{{ locale.removeFile }}"></i>
    </ng-template>
    <div *ngIf="file.status === 'uploading'" class="ant-upload-list-item-progress">
      <nz-progress [ngModel]="file.percent" [nzShowInfo]="false" [nzStrokeWidth]="2"></nz-progress>
    </div>
  </div>
  `,
  animations: [
    trigger('itemState', [
      transition(':enter', [
        style({ height: '0', width: '0', opacity: 0 }),
        animate(150, style({height: '*', width: '*', opacity: 1}))
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

  _prefixCls = 'ant-upload-list';
  _classList: string[] = [];

  _setClassMap(): void {
    this._classList.forEach(cls => this._renderer.removeClass(this._el.nativeElement, cls));

    this._classList = [
      this._prefixCls,
      `${this._prefixCls}-${this.listType}`
    ].filter(item => !!item);

    this._classList.forEach(cls => this._renderer.addClass(this._el.nativeElement, cls));
  }

  // endregion

  // region: render

  private locale = {
    uploading: this._locale.translate('Upload.uploading'),
    previewFile: this._locale.translate('Upload.previewFile'),
    removeFile: this._locale.translate('Upload.removeFile'),
  };

  handlePreview(file: UploadFile, e: any): void {
    if (!this.onPreview) return;

    e.preventDefault();
    return this.onPreview(file);
  }

  handleClose(file: UploadFile): void {
    if (this.onRemove) this.onRemove(file);
  }

  // endregion

  constructor(private _el: ElementRef, private _renderer: Renderer2, private _locale: NzLocaleService) {}

  ngOnInit(): void {
  }

  ngOnChanges(changes: { [P in keyof this]?: SimpleChange } & SimpleChanges): void {
    this._setClassMap();
  }

}
