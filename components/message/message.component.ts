/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { moveUpMotion } from 'ng-zorro-antd/core/animation';
import { NzOutletModule } from 'ng-zorro-antd/core/outlet';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { NzMNComponent } from './base';
import { NzMessageData } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-message',
  exportAs: 'nzMessage',
  animations: [moveUpMotion],
  template: `
    <div
      class="ant-message-notice"
      [@moveUpMotion]="instance.state"
      (@moveUpMotion.done)="animationStateChanged.next($event)"
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
  imports: [NzIconModule, NzOutletModule]
})
export class NzMessageComponent extends NzMNComponent implements OnInit {
  @Input() override instance!: Required<NzMessageData>;
  @Output() override readonly destroyed = new EventEmitter<{ id: string; userAction: boolean }>();
  index?: number;
}
