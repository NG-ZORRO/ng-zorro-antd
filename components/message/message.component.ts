/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';

import { moveUpMotion } from 'ng-zorro-antd/core/animation';

import { NzMNComponent } from './base';
import { NzMessageData } from './typings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'nz-message',
  exportAs: 'nzMessage',
  preserveWhitespaces: false,
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
        <div class="ant-message-custom-content" [ngClass]="'ant-message-' + instance.type">
          @switch (instance.type) {
            @case ('success') {
              <span nz-icon nzType="check-circle"></span>
            }
            @case ('info') {
              <span nz-icon nzType="info-circle"></span>
            }
            @case ('warning') {
              <span nz-icon nzType="exclamation-circle"></span>
            }
            @case ('error') {
              <span nz-icon nzType="close-circle"></span>
            }
            @case ('loading') {
              <span nz-icon nzType="loading"></span>
            }
          }

          <ng-container *nzStringTemplateOutlet="instance.content">
            <span [innerHTML]="instance.content"></span>
          </ng-container>
        </div>
      </div>
    </div>
  `
})
export class NzMessageComponent extends NzMNComponent implements OnInit, OnDestroy {
  @Input() override instance!: Required<NzMessageData>;
  @Output() override readonly destroyed = new EventEmitter<{ id: string; userAction: boolean }>();

  constructor(cdr: ChangeDetectorRef) {
    super(cdr);
  }
}
