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
import { fadeAnimation } from '../core/animation/fade-animations';
import { NgClassType } from '../core/types/ng-class';
import { InputBoolean } from '../core/util/convert';

@Component({
  selector           : 'nz-alert',
  animations         : [ fadeAnimation ],
  templateUrl        : './nz-alert.component.html',
  changeDetection    : ChangeDetectionStrategy.OnPush,
  encapsulation      : ViewEncapsulation.None,
  preserveWhitespaces: false,
  styles             : [
      `nz-alert {
      display: block;
    }`
  ]
})
export class NzAlertComponent implements OnChanges {
  display = true;
  isTypeSet = false;
  isShowIconSet = false;
  iconType = 'info-circle';
  iconTheme = 'fill';
  @Output() readonly nzOnClose: EventEmitter<boolean> = new EventEmitter();
  @Input() @InputBoolean() nzCloseable = false;
  @Input() @InputBoolean() nzShowIcon = false;
  @Input() @InputBoolean() nzBanner = false;
  @Input() nzCloseText: string | TemplateRef<void>;
  @Input() nzIconType: NgClassType;
  @Input() nzMessage: string | TemplateRef<void>;
  @Input() nzDescription: string | TemplateRef<void>;
  @Input() nzType = 'info';

  closeAlert(): void {
    this.display = false;
  }

  onFadeAnimationDone(): void {
    if (!this.display) {
      this.nzOnClose.emit(true);
    }
  }

  updateIconClassMap(): void {
    switch (this.nzType) {
      case 'error':
        this.iconType = 'close-circle';
        break;
      case 'success':
        this.iconType = 'check-circle';
        break;
      case 'info':
        this.iconType = 'info-circle';
        break;
      case 'warning':
        this.iconType = 'exclamation-circle';
        break;
    }
    if (this.nzDescription) {
      this.iconTheme = 'outline';
    } else {
      this.iconTheme = `fill`;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzShowIcon) {
      this.isShowIconSet = true;
    }
    if (changes.nzDescription || changes.nzType) {
      this.updateIconClassMap();
    }
    if (changes.nzType) {
      this.isTypeSet = true;
    }
    if (changes.nzBanner) {
      if (!this.isTypeSet) {
        this.nzType = 'warning';
      }
      if (!this.isShowIconSet) {
        this.nzShowIcon = true;
      }
    }
  }
}
