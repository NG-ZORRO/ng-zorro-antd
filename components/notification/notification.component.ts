/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

import { notificationMotion } from 'ng-zorro-antd/core/animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMNComponent } from 'ng-zorro-antd/message';

import { NzNotificationData } from './typings';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-notification',
  exportAs: 'nzNotification',
  animations: [notificationMotion],
  template: `
    <div
      class="ant-notification-notice ant-notification-notice-closable"
      [style]="instance.options?.nzStyle || null"
      [class]="instance.options?.nzClass || ''"
      [@notificationMotion]="state"
      (@notificationMotion.done)="animationStateChanged.next($event)"
      (click)="onClick($event)"
      (mouseenter)="onEnter()"
      (mouseleave)="onLeave()"
    >
      @if (instance.template) {
        <ng-template
          [ngTemplateOutlet]="instance.template!"
          [ngTemplateOutletContext]="{ $implicit: this, data: instance.options?.nzData }"
        />
      } @else {
        <div class="ant-notification-notice-content">
          <div class="ant-notification-notice-content">
            <div [class.ant-notification-notice-with-icon]="instance.type !== 'blank'">
              @switch (instance.type) {
                @case ('success') {
                  <nz-icon
                    nzType="check-circle"
                    class="ant-notification-notice-icon ant-notification-notice-icon-success"
                  />
                }
                @case ('info') {
                  <nz-icon
                    nzType="info-circle"
                    class="ant-notification-notice-icon ant-notification-notice-icon-info"
                  />
                }
                @case ('warning') {
                  <nz-icon
                    nzType="exclamation-circle"
                    class="ant-notification-notice-icon ant-notification-notice-icon-warning"
                  />
                }
                @case ('error') {
                  <nz-icon
                    nzType="close-circle"
                    class="ant-notification-notice-icon ant-notification-notice-icon-error"
                  />
                }
              }
              <div class="ant-notification-notice-message">
                <ng-container *nzStringTemplateOutlet="instance.title">
                  <div [innerHTML]="instance.title"></div>
                </ng-container>
              </div>
              <div class="ant-notification-notice-description">
                <ng-container
                  *nzStringTemplateOutlet="
                    instance.content;
                    context: { $implicit: this, data: instance.options?.nzData }
                  "
                >
                  <div [innerHTML]="instance.content"></div>
                </ng-container>
              </div>
              @if (instance.options?.nzButton; as btn) {
                <span class="ant-notification-notice-btn">
                  <ng-template [ngTemplateOutlet]="btn" [ngTemplateOutletContext]="{ $implicit: this }" />
                </span>
              }
            </div>
          </div>
        </div>
      }
      <a tabindex="0" class="ant-notification-notice-close" (click)="close()">
        <span class="ant-notification-notice-close-x">
          @if (instance.options?.nzCloseIcon) {
            <ng-container *nzStringTemplateOutlet="instance.options?.nzCloseIcon; let closeIcon">
              <nz-icon [nzType]="closeIcon" />
            </ng-container>
          } @else {
            <nz-icon nzType="close" class="ant-notification-close-icon" />
          }
        </span>
      </a>
    </div>
  `,
  imports: [NzIconModule, NzOutletModule, NgTemplateOutlet]
})
export class NzNotificationComponent extends NzMNComponent {
  @Input() instance!: Required<NzNotificationData>;
  @Input() index!: number;
  @Input() placement?: string;
  @Output() readonly destroyed = new EventEmitter<{ id: string; userAction: boolean }>();

  constructor() {
    super();
    this.destroyRef.onDestroy(() => {
      this.instance.onClick.complete();
    });
  }

  onClick(event: MouseEvent): void {
    this.instance.onClick.next(event);
  }

  close(): void {
    this.destroy(true);
  }

  get state(): string | undefined {
    if (this.instance.state === 'enter') {
      switch (this.placement) {
        case 'topLeft':
        case 'bottomLeft':
          return 'enterLeft';
        case 'topRight':
        case 'bottomRight':
          return 'enterRight';
        case 'top':
          return 'enterTop';
        case 'bottom':
          return 'enterBottom';
        default:
          return 'enterRight';
      }
    } else {
      return this.instance.state;
    }
  }
}
