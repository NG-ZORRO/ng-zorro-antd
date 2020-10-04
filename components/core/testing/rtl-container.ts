import { Dir } from '@angular/cdk/bidi';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'test-rtl-container',
  template: `
    <div [dir]="direction">
      <ng-content></ng-content>
    </div>
  `
})
export class RtlContainerComponent {
  @ViewChild(Dir) dir: Dir = new Dir();
  direction = 'rtl';
}
