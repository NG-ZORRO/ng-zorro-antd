// tslint:disable:ordered-imports no-any
import { Component, ContentChild, ContentChildren, HostBinding, Input, QueryList, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { NzListItemMetaComponent } from './nz-list-item-meta.component';

@Component({
  selector: 'nz-list-item',
  template: `
    <ng-template #contentTpl>
      <div *ngIf="content" class="ant-list-item-content" [ngClass]="{'ant-list-item-content-single': metas.length < 1}">
        <ng-container *ngIf="_content; else _contentTpl">{{ _content }}</ng-container>
      </div>
    </ng-template>
    <ng-template #actionsTpl>
      <ul *ngIf="actions?.length > 0" class="ant-list-item-action">
        <li *ngFor="let i of actions; let idx = index">
          <ng-template [ngTemplateOutlet]="i"></ng-template>
          <em *ngIf="idx!==actions.length-1" class="ant-list-item-action-split"></em>
        </li>
      </ul>
    </ng-template>
    <ng-template #mainTpl>
      <ng-content></ng-content>
      <ng-template [ngTemplateOutlet]="contentTpl"></ng-template>
      <ng-template [ngTemplateOutlet]="actionsTpl"></ng-template>
    </ng-template>
    <div *ngIf="extra; else mainTpl" class="ant-list-item-extra-wrap">
      <div class="ant-list-item-main"><ng-template [ngTemplateOutlet]="mainTpl"></ng-template></div>
      <div class="ant-list-item-extra"><ng-template [ngTemplateOutlet]="extra"></ng-template></div>
    </div>
    `
})
export class NzListItemComponent {
  /** @private */
  @HostBinding('class.ant-list-item') _nzListItem = true;
  @ContentChildren('action') actions: QueryList<ElementRef>;
  @ContentChildren(NzListItemMetaComponent) metas: QueryList<NzListItemMetaComponent>;

  content = false;
  _content = '';
  _contentTpl: TemplateRef<any>;
  @Input()
  set nzContent(value: string | TemplateRef<any>) {
    if (value instanceof TemplateRef) {
      this._contentTpl = value;
    } else {
      this._content = value;
    }

    this.content = !!value;
  }

  @ContentChild('extra') extra: TemplateRef<any>;

  isEmpty(element: HTMLElement): boolean {
    const nodes = element.childNodes;
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes.item(i);
      if (node.nodeType !== 8 && nodes.item(i).textContent.trim().length !== 0) {
        return false;
      }
    }
    return true;
  }
}
