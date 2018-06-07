import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

import { NzUpdateHostClassService } from '../core/services/update-host-class.service';

import { ShowUploadListInterface, UploadFile, UploadListType } from './interface';

@Component({
  selector           : 'nz-upload-list',
  templateUrl        : './nz-upload-list.component.html',
  providers          : [ NzUpdateHostClassService ],
  animations         : [
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
export class NzUploadListComponent implements OnChanges {
  // region: fields
  // tslint:disable-next-line:no-any
  @Input() locale: any = {};
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
      [ this.prefixCls ]                      : true,
      [ `${this.prefixCls}-${this.listType}` ]: true
    };
    this.updateHostClassService.updateHostClass(this.el.nativeElement, classMap);
  }

  // endregion
  // region: render

  handlePreview(file: UploadFile, e: Event): void {
    if (!this.onPreview) {
      return;
    }

    e.preventDefault();
    return this.onPreview(file);
  }

  handleRemove(file: UploadFile, e: Event): void {
    e.preventDefault();
    if (this.onRemove) {
      this.onRemove(file);
    }
    return;
  }

  // endregion
  constructor(private el: ElementRef, private updateHostClassService: NzUpdateHostClassService) {
  }

  ngOnChanges(changes: { [P in keyof this]?: SimpleChange } & SimpleChanges): void {
    this.setClassMap();
  }
}
