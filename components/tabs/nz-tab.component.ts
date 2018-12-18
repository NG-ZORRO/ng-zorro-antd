import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { InputBoolean } from '../core/util/convert';

import { NzTabSetComponent } from './nz-tabset.component';

@Component({
  selector           : 'nz-tab',
  preserveWhitespaces: false,
  encapsulation      : ViewEncapsulation.None,
  templateUrl        : './nz-tab.component.html',
  host               : {
    '[class.ant-tabs-tabpane]': 'true'
  }
})
export class NzTabComponent implements OnDestroy, OnInit {
  position: number | null = null;
  origin: number | null = null;
  @Input() nzTitle: string | TemplateRef<void>;
  @Input() @InputBoolean() nzForceRender = false;
  @Input() @InputBoolean() nzDisabled = false;
  @Output() readonly nzClick = new EventEmitter<void>();
  @Output() readonly nzSelect = new EventEmitter<void>();
  @Output() readonly nzDeselect = new EventEmitter<void>();
  @ViewChild(TemplateRef) content: TemplateRef<void>;

  constructor(private nzTabSetComponent: NzTabSetComponent) {
  }

  ngOnInit(): void {
    this.nzTabSetComponent.addTab(this);
  }

  ngOnDestroy(): void {
    this.nzTabSetComponent.removeTab(this);
  }

}
