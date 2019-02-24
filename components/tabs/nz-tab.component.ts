import {
  ChangeDetectionStrategy,
  Component, ElementRef,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  Output, Renderer2,
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
  templateUrl        : './nz-tab.component.html'
})
export class NzTabComponent implements OnChanges, OnDestroy {
  position: number = null;
  origin: number = null;
  isActive = false;
  readonly stateChanges = new Subject<void>();
  @ViewChild(TemplateRef) content: TemplateRef<void>;
  @Input() nzTitle: string | TemplateRef<void>;
  @Input() @InputBoolean() nzForceRender = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Output() readonly nzClick = new EventEmitter<void>();
  @Output() readonly nzSelect = new EventEmitter<void>();
  @Output() readonly nzDeselect = new EventEmitter<void>();

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.addClass(elementRef.nativeElement, 'ant-tabs-tabpane');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.nzTitle || changes.nzForceRender || changes.nzDisabled) {
      this.stateChanges.next();
    }
  }

  ngOnDestroy(): void {
    this.stateChanges.complete();
  }
}
