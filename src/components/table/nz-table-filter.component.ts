import {
  Component,
  HostBinding, OnInit
} from '@angular/core';
import { NzDropDownComponent } from '../dropdown/nz-dropdown.component';

@Component({
  selector: '[nz-table-filter]',
  template: `
    <a class="ant-table-filter-dropdown-link confirm" (click)="hideDropDown()">
      <ng-content select="[nz-table-filter-confirm]"></ng-content>
    </a>
    <a class="ant-table-filter-dropdown-link clear" (click)="hideDropDown()">
      <ng-content select="[nz-table-filter-clear]"></ng-content>
    </a>
  `,
  host: {
    '[class.ant-table-filter-dropdown-btns]': 'true'
  }
})
export class NzTableFilterComponent implements OnInit {
  hideDropDown(): void {
    this.nzDropDownComponent.nzVisible = false;
    this.nzDropDownComponent._hide();
  }

  constructor(private nzDropDownComponent: NzDropDownComponent) {
  }

  ngOnInit(): void {
    this.nzDropDownComponent.hasFilterButton = true;
    this.nzDropDownComponent.nzClickHide = false;
  }
}
