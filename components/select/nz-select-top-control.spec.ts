import { Component } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzOptionComponent } from './nz-option.component';
import { NzSelectTopControlComponent } from './nz-select-top-control.component';
import { NzSelectModule } from './nz-select.module';

describe('nz-select top control', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzSelectModule, NoopAnimationsModule ],
      declarations: [ NzTestSelectTopControlComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('basic', () => {
    let fixture;
    let testComponent;
    let tc;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSelectTopControlComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      tc = fixture.debugElement.query(By.directive(NzSelectTopControlComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(tc.nativeElement.classList).toContain('ant-select-selection__rendered');
    });
  });
});

@Component({
  selector: 'nz-test-select-top-control',
  template: `
    <div
      nz-select-top-control
      [nzOpen]="open"
      [compareWith]="compareWith"
      [nzPlaceHolder]="placeHolder"
      [nzShowSearch]="showSearch"
      [nzDisabled]="disabled"
      [nzMode]="mode"
      [nzListTemplateOfOption]="listOfTemplateOption"
      [nzListOfSelectedValue]="listOfSelectedValue"
      (nzOnSearch)="onSearch($event.value,$event.emit)"
      (nzListOfSelectedValueChange)="updateListOfSelectedValueFromTopControl($event)">
    </div>
  `
})
export class NzTestSelectTopControlComponent {
  open = false;
  // tslint:disable-next-line:no-any
  compareWith = (o1: any, o2: any) => o1 === o2;
  placeHolder = 'placeholder';
  showSearch = false;
  disabled = false;
  mode = 'default';
  listOfTemplateOption = [ new NzOptionComponent() ];
  listOfSelectedValue = [];
  onSearch = jasmine.createSpy('on search change');
  updateListOfSelectedValueFromTopControl = jasmine.createSpy('on selected value change');
}
