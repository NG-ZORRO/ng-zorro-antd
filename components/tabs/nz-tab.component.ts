import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { Subject } from 'rxjs';

import { InputBoolean } from '../core/util/convert';

@Component({
  selector           : 'nz-tab',
  preserveWhitespaces: false,
  encapsulation      : ViewEncapsulation.None,
  changeDetection    : ChangeDetectionStrategy.OnPush,
  templateUrl        : './nz-tab.component.html',
  host               : {
    '[class.ant-tabs-tabpane]': 'true'
  }
})
export class NzTabComponent implements OnChanges, OnDestroy {
  position: number = null;
  origin: number = null;
  isActive = false;
  readonly stateChanges = new Subject<void>();
  @ViewChild(TemplateRef) private content: TemplateRef<void>;
  @Input() nzTitle: string | TemplateRef<void>;
  @Input() @InputBoolean() nzForceRender = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Output() readonly nzClick = new EventEmitter<void>();
  @Output() readonly nzSelect = new EventEmitter<void>();
  @Output() readonly nzDeselect = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzTitle || changes.nzForceRender || changes.nzDisabled) {
      this.stateChanges.next();
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }
}
