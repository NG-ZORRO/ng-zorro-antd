import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nz-demo-select-pagination',
  template: `
    <nz-select style="width: 120px;" [(ngModel)]="selectedOption" (nzScrollToBottom)="scrollToBottom()">
      <nz-option *ngFor="let option of options" [nzLabel]="option.label" [nzValue]="option">
      </nz-option>
      <nz-option [nzLabel]="'disabled'" [nzDisabled]="true" [nzValue]="'disabled'" *ngIf="loading">
        <ng-template #nzOptionTemplate>
          <i class="anticon anticon-loading anticon-spin"></i> Loading...
        </ng-template>
      </nz-option>
    </nz-select>
  `,
  styles  : []
})
export class NzDemoSelectPaginationComponent implements OnInit {
  options = [];
  selectedOption;
  loading = false;
  index = 0;

  scrollToBottom() {
    if (!this.loading) {
      this.loading = true;
      setTimeout(() => {
        this.generateFakeData();
        this.loading = false;
      }, 3000);
    }
  }

  generateFakeData() {
    for (let i = 0; i < 5; i++) {
      this.options.push({ value: this.index, label: `option${this.index}` });
      this.index++;
    }
  }

  ngOnInit() {
    this.generateFakeData();
    this.selectedOption = this.options[ 0 ];
  }
}


