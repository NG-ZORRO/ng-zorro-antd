import {
  Component,
  Input,
  ElementRef,
  Host, HostBinding
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { NzCollapsesetComponent } from './nz-collapseset.component'

@Component({
  selector     : 'nz-collapse',
  template     : `
    <div class="ant-collapse-header" [attr.aria-expanded]="_active" (click)="clickHeader($event)" role="tab">
      <i class="arrow"></i>
      <ng-template [ngIf]="nzTitle">
        {{ nzTitle }}
      </ng-template>
      <ng-template [ngIf]="!nzTitle">
        <ng-content select="[collapse-title]"></ng-content>
      </ng-template>
    </div>
    <div class="ant-collapse-content" [@collapseState]="_active?'active':'inactive'">
      <div class="ant-collapse-content-box">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  animations   : [
    trigger('collapseState', [
      state('inactive', style({
        opacity: '0',
        height : 0
      })),
      state('active', style({
        opacity: '1',
        height : '*'
      })),
      transition('inactive => active', animate('150ms ease-in')),
      transition('active => inactive', animate('150ms ease-out'))
    ])
  ]
})

export class NzCollapseComponent {
  _el;
  _active: boolean;

  @HostBinding('class.ant-collapse-item') _nzCollapseItem = true;

  @Input() nzTitle: string;
  @Input()
  @HostBinding('class.ant-collapse-item-disabled')
  nzDisabled = false;

  @Input()
  get nzActive(): boolean {
    return this._active;
  }

  set nzActive(active: boolean) {
    if (this._active === active) {
      return;
    }
    if (!this.nzDisabled) {
      this._active = active;
    }
  }

  clickHeader($event) {
    this.nzActive = !this.nzActive;
    /** trigger host collapseSet click event */
    this._collapseSet.nzClick(this);
  }

  constructor(@Host() private _collapseSet: NzCollapsesetComponent, private _elementRef: ElementRef) {
    this._el = this._elementRef.nativeElement;
    this._collapseSet.addTab(this);
  }
}
