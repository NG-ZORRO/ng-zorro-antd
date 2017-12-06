import { NzTabSetComponent } from './nz-tabset.component';
import {
  Component,
  HostBinding,
  ContentChild,
  Output,
  EventEmitter,
  TemplateRef,
  Input,
  ViewChild, OnDestroy, OnInit
} from '@angular/core';
import { toBoolean } from '../util/convert';

@Component({
  selector: 'nz-tab',
  template: `
    <ng-template>
      <ng-content></ng-content>
    </ng-template>
  `,
  styles  : [],
  host: {
    '[class.ant-tabs-tabpane]': 'true'
  }
})
export class NzTabComponent implements OnDestroy, OnInit {
  private disabled = false;

  position: number | null = null;
  origin: number | null = null;

  @Input()
  set nzDisabled(value: boolean) {
    this.disabled = toBoolean(value);
  }

  get nzDisabled(): boolean {
    return this.disabled;
  }

  @Output() nzSelect = new EventEmitter();
  @Output() nzClick = new EventEmitter();
  @Output() nzDeselect = new EventEmitter();
  @ContentChild('nzTabHeading') _tabHeading: TemplateRef<any>;
  @ViewChild(TemplateRef) _content: TemplateRef<any>;

  get content(): TemplateRef<any> | null {
    return this._content;
  }

  constructor(private nzTabSetComponent: NzTabSetComponent) {
  }

  ngOnInit() {
    this.nzTabSetComponent._tabs.push(this);
  }

  ngOnDestroy() {
    this.nzTabSetComponent._tabs.splice(this.nzTabSetComponent._tabs.indexOf(this), 1);
  }

}
