import { Component } from '@angular/core';

@Component({
  selector: 'nz-demo-input-textarea',
  template: `
    <nz-input [(ngModel)]="inputValue" [nzType]="'textarea'" [nzRows]="'4'" [nzPlaceHolder]="''"></nz-input>`,
  styles  : []
})
export class NzDemoInputTextareaComponent {
  inputValue: string;
}
