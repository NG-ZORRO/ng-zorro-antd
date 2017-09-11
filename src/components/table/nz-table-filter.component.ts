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
  `
})
export class NzTableFilterComponent implements OnInit {
  @HostBinding('class.ant-table-filter-dropdown-btns') _dropDownButton = true;

  hideDropDown() {
    this.nzDropDownComponent.nzVisible = false;
    this.nzDropDownComponent._hide();
  }

  constructor(private nzDropDownComponent: NzDropDownComponent) {
  }

  ngOnInit() {
    this.nzDropDownComponent.hasFilterButton = true;
    this.nzDropDownComponent.nzClickHide = false;
  }
}
