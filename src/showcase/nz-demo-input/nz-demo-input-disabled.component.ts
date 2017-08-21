import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'nz-demo-input-disabled',
    template: `
    <nz-input [(ngModel)]="inputValue" [nzDisabled]="isDisabled"></nz-input>
    <br>
    <br>
    <input [(ngModel)]="inputValue" [nzDisabled]="isDisabled" nz-input/>
    <div style="margin-top:8px;">
      <button nz-button [nzType]="'primary'" (click)="toggleDisabled()">Toggle disabled</button>
    </div>`,
    styles: []
})
export class NzDemoInputDisabledComponent implements OnInit {
    inputValue: string;
    isDisabled = true;
    toggleDisabled = () => {
        this.isDisabled = !this.isDisabled;
    }

    constructor() {
    }

    ngOnInit() {
    }
}

