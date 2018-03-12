import { Component, ViewChild } from '@angular/core';
import { fakeAsync, flush, tick, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NzOptionComponent } from './nz-option.component';
import { NzSelectTopControlComponent } from './nz-select-top-control.component';
import { NzSelectModule } from './nz-select.module';

import { dispatchFakeEvent, dispatchKeyboardEvent } from '../core/testing';

describe('nz-select top control', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzSelectModule, NoopAnimationsModule ],
      declarations: [ NzTestSelectTopControlMultipleComponent, NzTestSelectTopControlSingleComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('default', () => {
    let fixture;
    let testComponent;
    let tc;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSelectTopControlSingleComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      tc = fixture.debugElement.query(By.directive(NzSelectTopControlComponent));
    });
    it('should showSearch work', () => {
      fixture.detectChanges();
      expect(tc.nativeElement.querySelector('.ant-select-search--inline')).toBeNull();
      testComponent.showSearch = true;
      fixture.detectChanges();
      expect(tc.nativeElement.querySelector('.ant-select-search--inline')).not.toBeNull();
    });
    it('should focus work', fakeAsync(() => {
      testComponent.showSearch = true;
      testComponent.open = true;
      fixture.detectChanges();
      const inputEl = tc.nativeElement.querySelector('.ant-select-search__field');
      expect(inputEl === document.activeElement).toBe(false);
      testComponent.nzSelectTopControlComponent.focusOnInput();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(inputEl === document.activeElement).toBe(true);
    }));
    it('should selectedValueDisplay style correct', fakeAsync(() => {
      testComponent.showSearch = true;
      fixture.detectChanges();
      const selectedValueEl = tc.nativeElement.querySelector('.ant-select-selection-selected-value');
      const inputEl = tc.nativeElement.querySelector('.ant-select-search__field');
      expect(selectedValueEl.style.display).toBe('block');
      expect(selectedValueEl.style.opacity).toBe('1');
      testComponent.open = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(selectedValueEl.style.display).toBe('block');
      expect(selectedValueEl.style.opacity).toBe('0.4');
      inputEl.value = 'test';
      dispatchFakeEvent(inputEl, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(selectedValueEl.style.display).toBe('none');
      expect(selectedValueEl.style.opacity).toBe('1');
    }));
  });

  describe('multiple', () => {
    let fixture;
    let testComponent;
    let tc;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestSelectTopControlMultipleComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      tc = fixture.debugElement.query(By.directive(NzSelectTopControlComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(tc.nativeElement.classList).toContain('ant-select-selection__rendered');
    });
    it('should input width sync', fakeAsync(() => {
      fixture.detectChanges();
      const inputEl = tc.nativeElement.querySelector('.ant-select-search__field');
      inputEl.value = 'test';
      dispatchFakeEvent(inputEl, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(Math.floor(inputEl.scrollWidth / 10)).toBe(Math.floor(parseInt(inputEl.style.width, 10) / 10));
      inputEl.value = '';
      dispatchFakeEvent(inputEl, 'input');
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(inputEl.style.width).toBe('');
    }));
    it('should placeholder display', () => {
      fixture.detectChanges();
      expect(tc.nativeElement.querySelector('.ant-select-selection__placeholder').innerText).toBe(' placeholder ');
      testComponent.placeHolder = '';
      fixture.detectChanges();
      expect(tc.nativeElement.querySelector('.ant-select-selection__placeholder')).toBeNull();
    });
    it('should display label correct', () => {
      fixture.detectChanges();
      const ul = tc.nativeElement.querySelector('ul');
      expect(ul.children.length).toBe(3);
      expect(ul.children[ 0 ].querySelector('.ant-select-selection__choice__content').innerText).toBe('test1');
      expect(ul.children[ 1 ].querySelector('.ant-select-selection__choice__content').innerText).toBe('test2');
    });
    it('should change listOfTemplateOption work', fakeAsync(() => {
      fixture.detectChanges();
      const ul = tc.nativeElement.querySelector('ul');
      expect(ul.children.length).toBe(3);
      testComponent.listOfTemplateOption = [ testComponent.generateOption({ value: 'test1' }, 'test1', false), testComponent.generateOption({ value: 'test2' }, 'test2', true), testComponent.generateOption({ value: 'test3' }, 'test3', true) ];
      testComponent.listOfSelectedValue = [ { value: 'test1' }, { value: 'test2' }, { value: 'test3' } ];
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(ul.children.length).toBe(4);
      expect(ul.children[ 0 ].querySelector('.ant-select-selection__choice__content').innerText).toBe('test1');
      expect(ul.children[ 1 ].querySelector('.ant-select-selection__choice__content').innerText).toBe('test2');
      expect(ul.children[ 2 ].querySelector('.ant-select-selection__choice__content').innerText).toBe('test3');
    }));
    it('should label disable work', () => {
      fixture.detectChanges();
      const ul = tc.nativeElement.querySelector('ul');
      expect(ul.children[ 0 ].classList).not.toContain('ant-select-selection__choice__disabled');
      expect(ul.children[ 0 ].querySelector('.ant-select-selection__choice__remove')).toBeDefined();
      expect(ul.children[ 1 ].classList).toContain('ant-select-selection__choice__disabled');
      expect(ul.children[ 1 ].querySelector('.ant-select-selection__choice__remove')).toBeNull();
    });
    it('should remove label work', fakeAsync(() => {
      fixture.detectChanges();
      expect(testComponent.updateListOfSelectedValueFromTopControl).toHaveBeenCalledTimes(0);
      const ul = tc.nativeElement.querySelector('ul');
      ul.children[ 0 ].querySelector('.ant-select-selection__choice__remove').click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(ul.children.length).toBe(2);
      expect(testComponent.updateListOfSelectedValueFromTopControl).toHaveBeenCalledTimes(1);
    }));
    it('should disabled work', () => {
      fixture.detectChanges();
      testComponent.disabled = true;
      expect(testComponent.updateListOfSelectedValueFromTopControl).toHaveBeenCalledTimes(0);
      const ul = tc.nativeElement.querySelector('ul');
      expect(ul.children[ 1 ].querySelector('.ant-select-selection__choice__remove')).toBeNull();
    });
    it('should backSpace press work', fakeAsync(() => {
      testComponent.listOfTemplateOption = [ testComponent.generateOption({ value: 'test1' }, 'test1', false), testComponent.generateOption({ value: 'test2' }, 'test2', true), testComponent.generateOption({ value: 'test3' }, 'test3', false) ];
      testComponent.listOfSelectedValue = [ { value: 'test1' }, { value: 'test2' }, { value: 'test3' } ];
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const ul = tc.nativeElement.querySelector('ul');
      expect(ul.children.length).toBe(4);
      expect(ul.children[ 0 ].querySelector('.ant-select-selection__choice__content').innerText).toBe('test1');
      expect(ul.children[ 1 ].querySelector('.ant-select-selection__choice__content').innerText).toBe('test2');
      expect(ul.children[ 2 ].querySelector('.ant-select-selection__choice__content').innerText).toBe('test3');
      dispatchKeyboardEvent(tc.nativeElement.querySelector('.ant-select-search__field'), 'keydown', 8, tc.nativeElement.querySelector('.ant-select-search__field'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(ul.children.length).toBe(3);
      expect(ul.children[ 0 ].querySelector('.ant-select-selection__choice__content').innerText).toBe('test1');
      expect(ul.children[ 1 ].querySelector('.ant-select-selection__choice__content').innerText).toBe('test2');
      dispatchKeyboardEvent(tc.nativeElement.querySelector('.ant-select-search__field'), 'keydown', 8, tc.nativeElement.querySelector('.ant-select-search__field'));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(ul.children.length).toBe(3);
      expect(ul.children[ 0 ].querySelector('.ant-select-selection__choice__content').innerText).toBe('test1');
      expect(ul.children[ 1 ].querySelector('.ant-select-selection__choice__content').innerText).toBe('test2');
    }));
  });
});

@Component({
  selector: 'nz-test-select-top-control-multiple',
  template: `
    <div
      nz-select-top-control
      [nzOpen]="open"
      [compareWith]="compareFn"
      [nzPlaceHolder]="placeHolder"
      [nzDisabled]="disabled"
      [nzMode]="mode"
      [nzListTemplateOfOption]="listOfTemplateOption"
      [nzListOfSelectedValue]="listOfSelectedValue"
      (nzOnSearch)="onSearch($event.value,$event.emit)"
      (nzListOfSelectedValueChange)="updateListOfSelectedValueFromTopControl($event)">
    </div>
  `
})
export class NzTestSelectTopControlMultipleComponent {
  open = false;
  // tslint:disable-next-line:no-any
  compareFn = (o1: any, o2: any) => o1 && o2 ? o1.value === o2.value : o1 === o2;
  placeHolder = 'placeholder';
  disabled = false;
  mode = 'multiple';
  listOfTemplateOption = [ this.generateOption({ value: 'test1' }, 'test1', false), this.generateOption({ value: 'test2' }, 'test2', true) ];
  listOfSelectedValue = [ { value: 'test1' }, { value: 'test2' } ];
  onSearch = jasmine.createSpy('on search change');
  updateListOfSelectedValueFromTopControl = jasmine.createSpy('on selected value change');

  // tslint:disable-next-line:no-any
  generateOption(value: any, label: string, disabled: boolean): NzOptionComponent {
    const option = new NzOptionComponent();
    option.nzValue = value;
    option.nzLabel = label;
    option.nzDisabled = disabled;
    return option;
  }
}

@Component({
  selector: 'nz-test-select-top-control-single',
  template: `
    <div
      nz-select-top-control
      [nzOpen]="open"
      [compareWith]="compareFn"
      [nzPlaceHolder]="placeHolder"
      [nzDisabled]="disabled"
      [nzMode]="mode"
      [nzShowSearch]="showSearch"
      [nzListTemplateOfOption]="listOfTemplateOption"
      [nzListOfSelectedValue]="listOfSelectedValue"
      (nzOnSearch)="onSearch($event.value,$event.emit)"
      (nzListOfSelectedValueChange)="updateListOfSelectedValueFromTopControl($event)">
    </div>
  `
})
export class NzTestSelectTopControlSingleComponent {
  @ViewChild(NzSelectTopControlComponent) nzSelectTopControlComponent: NzSelectTopControlComponent;
  open = false;
  // tslint:disable-next-line:no-any
  compareFn = (o1: any, o2: any) => o1 && o2 ? o1.value === o2.value : o1 === o2;
  placeHolder = 'placeholder';
  disabled = false;
  showSearch = false;
  mode = 'default';
  listOfTemplateOption = [ this.generateOption({ value: 'test1' }, 'test1', false), this.generateOption({ value: 'test2' }, 'test2', true) ];
  listOfSelectedValue = [ { value: 'test1' } ];
  onSearch = jasmine.createSpy('on search change');
  updateListOfSelectedValueFromTopControl = jasmine.createSpy('on selected value change');

  // tslint:disable-next-line:no-any
  generateOption(value: any, label: string, disabled: boolean): NzOptionComponent {
    const option = new NzOptionComponent();
    option.nzValue = value;
    option.nzLabel = label;
    option.nzDisabled = disabled;
    return option;
  }
}
