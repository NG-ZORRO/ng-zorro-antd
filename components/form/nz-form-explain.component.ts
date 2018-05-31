import {
  animate,
  style,
  transition,
  trigger
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NzFormItemComponent } from './nz-form-item.component';

@Component({
  selector           : 'nz-form-explain',
  preserveWhitespaces: false,
  animations         : [
    trigger('formExplainAnimation', [
      transition('void => *', [
        style({
          opacity  : 0,
          transform: 'translateY(-5px)'
        }),
        animate('0.3s cubic-bezier(0.645, 0.045, 0.355, 1)', style({
          opacity  : 1,
          transform: 'translateY(0)'
        }))
      ]),
      transition('* => void', [
        style({
          opacity  : 1,
          transform: 'translateY(0)'
        }),
        animate('0.3s cubic-bezier(0.645, 0.045, 0.355, 1)', style({
          opacity  : 0,
          transform: 'translateY(-5px)'
        }))
      ])
    ])
  ],
  templateUrl        : './nz-form-explain.component.html',
  host               : {
    '[class.ant-form-explain]': 'true'
  },
  styles             : [
    `:host{
      display:block;
    }`
  ]
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
