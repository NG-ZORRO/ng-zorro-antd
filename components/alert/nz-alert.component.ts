/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { slideAlertMotion, InputBoolean, NgClassType, NzConfigService, WithConfig } from 'ng-zorro-antd/core';

const NZ_CONFIG_COMPONENT_NAME = 'alert';

@Component({
  selector: 'nz-alert',
  exportAs: 'nzAlert',
  animations: [slideAlertMotion],
  templateUrl: './nz-alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  preserveWhitespaces: false,
  styles: [
    `
      nz-alert {
        display: block;
      }
    `
  ]
})
export class NzAlertComponent implements OnChanges {
  @Input() nzCloseText: string | TemplateRef<void>;
  @Input() nzIconType: NgClassType;
  @Input() nzMessage: string | TemplateRef<void>;
  @Input() nzDescription: string | TemplateRef<void>;
  @Input() nzType: 'success' | 'info' | 'warning' | 'error' = 'info';
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzCloseable: boolean;
  @Input() @WithConfig(NZ_CONFIG_COMPONENT_NAME, false) @InputBoolean() nzShowIcon: boolean;
  @Input() @InputBoolean() nzBanner = false;
  @Output() readonly nzOnClose = new EventEmitter<boolean>();

  get iconType(): NgClassType {
    return this.nzIconType || this.inferredIconType;
  }

  destroy = false;
  iconTheme = 'fill';
  isIconTypeObject = false;

  private isTypeSet = false;
  private isShowIconSet = false;
  private inferredIconType: string = 'info-circle';

  constructor(public nzConfigService: NzConfigService) {}

  closeAlert(): void {
    this.destroy = true;
  }

  onFadeAnimationDone(): void {
    if (this.destroy) {
      this.nzOnClose.emit(true);
    }
  }

  updateIconClassMap(): void {
    switch (this.nzType) {
      case 'error':
        this.inferredIconType = 'close-circle';
        break;
      case 'success':
        this.inferredIconType = 'check-circle';
        break;
      case 'info':
        this.inferredIconType = 'info-circle';
        break;
      case 'warning':
        this.inferredIconType = 'exclamation-circle';
        break;
    }
    this.iconTheme = this.nzDescription ? 'outline' : 'fill';
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { nzShowIcon, nzDescription, nzType, nzBanner, nzIconType } = changes;

    if (nzShowIcon) {
      this.isShowIconSet = true;
    }

    if (nzDescription || nzType) {
      this.updateIconClassMap();
    }

    if (nzType) {
      this.isTypeSet = true;
    }

    if (nzBanner) {
      if (!this.isTypeSet) {
        this.nzType = 'warning';
      }
      if (!this.isShowIconSet) {
        this.nzShowIcon = true;
      }
    }

    if (nzIconType) {
      this.isIconTypeObject = typeof nzIconType.currentValue === 'object';
    }
  }
}
