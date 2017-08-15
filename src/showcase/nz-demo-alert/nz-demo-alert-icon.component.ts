import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-alert-icon',
  template: `
    <nz-alert [nzType]="'success'" [nzMessage]="'Success Tips'" [nzShowIcon]="'true'">
    </nz-alert>
    <nz-alert [nzType]="'info'" [nzMessage]="'Informational Notes'" [nzShowIcon]="'true'">
    </nz-alert>
    <nz-alert [nzType]="'warning'" [nzMessage]="'Warning'" [nzShowIcon]="'true'">
    </nz-alert>
    <nz-alert [nzType]="'error'" [nzMessage]="'Error'" [nzShowIcon]="'true'">
    </nz-alert>

    <nz-alert [nzType]="'success'" [nzMessage]="'Success Tips'"
      [nzDescription]="'Detailed description and advices about successful copywriting.'" [nzShowIcon]="'true'"></nz-alert>
    <nz-alert [nzType]="'info'" [nzMessage]="'Informational Notes'"
      [nzDescription]="'Additional description and informations about copywriting.'" [nzShowIcon]="'true'"></nz-alert>
    <nz-alert [nzType]="'warning'" [nzMessage]="'Warning'"
      [nzDescription]="'This is a warning notice about copywriting.'" [nzShowIcon]="'true'"></nz-alert>
    <nz-alert [nzType]="'error'" [nzMessage]="'Error'"
      [nzDescription]="'This is an error message about copywriting.'" [nzShowIcon]="'true'"></nz-alert>
  `
})

export class NzDemoAlertIconComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }
}
