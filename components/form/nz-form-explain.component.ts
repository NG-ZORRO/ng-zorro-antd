import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzFormItemComponent } from './nz-form-item.component';

@Component({
  selector  : 'nz-form-explain',
  preserveWhitespaces: false,
  animations: [
    trigger('flyInOut', [
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', [
        style({
          opacity  : 0,
          transform: 'translateY(-5px)'
        }),
        animate('0.15s cubic-bezier(0.645, 0.045, 0.355, 1)')
      ]),
      transition('* => void', [
        animate('0.15s cubic-bezier(0.645, 0.045, 0.355, 1)', style({
          opacity  : 0,
          transform: 'translateY(-5px)'
        }))
      ])
    ])
  ],
  template  : `
    <ng-content></ng-content>`,
  host      : {
    '[class.ant-form-explain]': 'true',
    '[@flyInOut]'             : ''
  },
  styles             : [ `:host {
    display: block;
  }` ]
})
export class NzFormExplainComponent implements OnDestroy, OnInit {
  constructor(private nzFormItemComponent: NzFormItemComponent) {
  }

  ngOnDestroy(): void {
    this.nzFormItemComponent.disableHelp();
  }

  ngOnInit(): void {
    this.nzFormItemComponent.enableHelp();
  }
}
