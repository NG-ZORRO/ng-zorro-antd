/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgClass, NgStyle, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, Output, ViewEncapsulation } from '@angular/core';

import { notificationMotion } from 'ng-zorro-antd/core/animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMNComponent } from 'ng-zorro-antd/message';

import { NzNotificationData } from './typings';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-notification',
  exportAs: 'nzNotification',
  preserveWhitespaces: false,
  animations: [notificationMotion],
  template: `
    <div
      class="ant-notification-notice ant-notification-notice-closable"
      [ngStyle]="instance.options?.nzStyle || null"
      [ngClass]="instance.options?.nzClass || ''"
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
                  <span
                    nz-icon
                    nzType="check-circle"
                    class="ant-notification-notice-icon ant-notification-notice-icon-success"
                  ></span>
                }
                @case ('info') {
                  <span
                    nz-icon
                    nzType="info-circle"
                    class="ant-notification-notice-icon ant-notification-notice-icon-info"
                  ></span>
                }
                @case ('warning') {
                  <span
                    nz-icon
                    nzType="exclamation-circle"
                    class="ant-notification-notice-icon ant-notification-notice-icon-warning"
                  ></span>
                }
                @case ('error') {
                  <span
                    nz-icon
                    nzType="close-circle"
                    class="ant-notification-notice-icon ant-notification-notice-icon-error"
                  ></span>
                }
              }
              <div class="ant-notification-notice-message">
                <ng-container *nzStringTemplateOutlet="instance.title">
                  <div [innerHTML]="instance.title"></div>
                </ng-container>
              </div>
              <div class="ant-notification-notice-description">
                <ng-container *nzStringTemplateOutlet="instance.content">
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
              <span nz-icon [nzType]="closeIcon"></span>
            </ng-container>
          } @else {
            <span nz-icon nzType="close" class="ant-notification-close-icon"></span>
          }
        </span>
      </a>
    </div>
  `,
  imports: [NgStyle, NgClass, NzIconModule, NzOutletModule, NgTemplateOutlet],
  standalone: true
})
export class NzNotificationComponent extends NzMNComponent implements OnDestroy {
  @Input() override instance!: Required<NzNotificationData>;
  @Input() override index!: number;
  @Input() placement?: string;

  @Output() override readonly destroyed = new EventEmitter<{ id: string; userAction: boolean }>();

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this.instance.onClick.complete();
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
