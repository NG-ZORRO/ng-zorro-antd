import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector     : 'nz-demo-auto-complete-uncertain-category',
  encapsulation: ViewEncapsulation.None,
  template     : `
    <div class="example-input">
      <nz-input-group nzSearch nzSize="large" [nzSuffix]="suffixIconButton">
        <input placeholder="input here" nz-input [(ngModel)]="inputValue" (ngModelChange)="onChange($event)" [nzAutocomplete]="auto"/>
      </nz-input-group>
      <ng-template #suffixIconButton>
        <button nz-button nzType="primary" nzSize="large" nzSearch><i nz-icon type="search" theme="outline"></i></button>
      </ng-template>
      <nz-autocomplete #auto>
        <nz-auto-option *ngFor="let option of options" [nzValue]="option.category">
          {{option.value}} 在
          <a [href]="'https://s.taobao.com/search?q=' + option.query"
             target="_blank"
             rel="noopener noreferrer">
            {{option.category}}
          </a>
          区块中
          <span class="global-search-item-count">约 {{option.count}} 个结果</span>
        </nz-auto-option>
      </nz-autocomplete>
    </div>
`,
  styles: [`
  .global-search-item-count {
    position: absolute;
    right: 16px;
  }
  `]
})
export class NzDemoAutoCompleteUncertainCategoryComponent {
  inputValue: string;
  options = [];

  onChange(value: string): void {
    this.options = new Array(this.getRandomInt(15, 5)).join('.').split('.')
    .map((item, idx) => ({
      value,
      category: `${value}${idx}`,
      count: this.getRandomInt(200, 100),
    }));
  }

  private getRandomInt(max: number, min: number = 0): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
