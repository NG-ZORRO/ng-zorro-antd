/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  viewChild,
  ViewEncapsulation
} from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMNComponent } from 'ng-zorro-antd/message';

import { NzNotificationData } from './typings';

@Component({
  selector: 'nz-notification',
  exportAs: 'nzNotification',
  imports: [NzIconModule, NzOutletModule, NgTemplateOutlet],
  template: `
    <div
      #animationElement
      class="ant-notification-notice ant-notification-notice-closable"
      [style]="instance.options?.nzStyle || null"
      [class]="instance.options?.nzClass || ''"
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzNotificationComponent extends NzMNComponent {
  @Input() instance!: Required<NzNotificationData>;
  @Input() index!: number;
  @Input() placement?: string;
  @Output() readonly destroyed = new EventEmitter<{ id: string; userAction: boolean }>();

  readonly animationElement = viewChild.required('animationElement', { read: ElementRef });
  protected readonly _animationKeyframeMap = {
    enter: [
      'antNotificationFadeIn',
      'antNotificationTopFadeIn',
      'antNotificationBottomFadeIn',
      'antNotificationLeftFadeIn'
    ],
    leave: 'antNotificationFadeOut'
  };
  protected readonly _animationClassMap = {
    enter: 'ant-notification-fade-enter',
    leave: 'ant-notification-fade-leave'
  };

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
}
