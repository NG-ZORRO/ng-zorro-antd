/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  viewChild,
  ViewEncapsulation
} from '@angular/core';

import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzMNComponent } from './base';
import { NzMessageData } from './typings';

@Component({
  selector: 'nz-message',
  exportAs: 'nzMessage',
  imports: [NzIconModule, NzOutletModule],
  template: `
    <div
      #animationElement
      class="ant-message-notice"
      [class]="instance.options?.nzClass"
      [style]="instance.options?.nzStyle"
      (mouseenter)="onEnter()"
      (mouseleave)="onLeave()"
    >
      <div class="ant-message-notice-content">
        <div class="ant-message-custom-content" [class]="'ant-message-' + instance.type">
          @switch (instance.type) {
            @case ('success') {
              <nz-icon nzType="check-circle" />
            }
            @case ('info') {
              <nz-icon nzType="info-circle" />
            }
            @case ('warning') {
              <nz-icon nzType="exclamation-circle" />
            }
            @case ('error') {
              <nz-icon nzType="close-circle" />
            }
            @case ('loading') {
              <nz-icon nzType="loading" />
            }
          }
          <ng-container
            *nzStringTemplateOutlet="instance.content; context: { $implicit: this, data: instance.options?.nzData }"
          >
            <span [innerHTML]="instance.content"></span>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class NzMessageComponent extends NzMNComponent implements OnInit {
  @Input() override instance!: Required<NzMessageData>;
  @Output() override readonly destroyed = new EventEmitter<{ id: string; userAction: boolean }>();
  index?: number;

  readonly animationElement = viewChild.required('animationElement', { read: ElementRef });
  protected readonly _animationKeyframeMap = {
    enter: 'MessageMoveIn',
    leave: 'MessageMoveOut'
  };
  protected readonly _animationClassMap = {
    enter: 'ant-message-move-up-enter',
    leave: 'ant-message-move-up-leave'
  };
}
