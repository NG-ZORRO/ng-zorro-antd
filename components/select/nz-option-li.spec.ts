import { Component } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzOptionLiComponent } from './nz-option-li.component';
import { NzOptionComponent } from './nz-option.component';

describe('select option li', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [],
      declarations: [ NzTestSelectOptionLiComponent, NzOptionLiComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('basic select option li', () => {
    let fixture;
    let testComponent;
    let li;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSelectOptionLiComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      li = fixture.debugElement.query(By.directive(NzOptionLiComponent));
    });
  });
});

@Component({
  selector: 'nz-test-select-option-li',
  template: `
    <li nz-option-li [nzOption]="option" [nzListOfSelectedValue]="listOfSelectedValue" [nzShowActive]="showActive" [nzActiveOption]="activeOption"></li>`
})
export class NzTestSelectOptionLiComponent {
  option = new NzOptionComponent();
  showActive = true;
  listOfSelectedValue = [];
  activeOption = new NzOptionComponent();
}
