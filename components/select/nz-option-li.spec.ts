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
    it('should class and style correct', () => {
      fixture.detectChanges();
      const element = li.nativeElement;
      expect(element.classList).toContain('ant-select-dropdown-menu-item');
      expect(element.attributes.getNamedItem('unselectable').name).toBe('unselectable');
      expect(element.style.userSelect).toBe('none');
    });
    it('should disabled work', () => {
      testComponent.option.nzDisabled = true;
      fixture.detectChanges();
      expect(li.nativeElement.classList).toContain('ant-select-dropdown-menu-item-disabled');
    });
    it('should selected work', () => {
      testComponent.option.nzValue = { value: 'test' };
      testComponent.listOfSelectedValue = [ { value: 'test' } ];
      fixture.detectChanges();
      expect(li.nativeElement.classList).toContain('ant-select-dropdown-menu-item-selected');
    });
    /** https://github.com/NG-ZORRO/ng-zorro-antd/issues/1229 **/
    it('should zero value work', () => {
      testComponent.option.nzValue = { value: 0 };
      testComponent.listOfSelectedValue = [ { value: 0 } ];
      fixture.detectChanges();
      expect(li.nativeElement.classList).toContain('ant-select-dropdown-menu-item-selected');
    });
    it('should activeOption null work', () => {
      testComponent.option.nzValue = { value: 'test' };
      testComponent.activeOption = null;
      fixture.detectChanges();
      expect(li.nativeElement.classList).not.toContain('ant-select-dropdown-menu-item-active');
    });
    it('should activeOption set work', () => {
      testComponent.option.nzValue = { value: 'test' };
      testComponent.activeOption.nzValue = { value: 'test' };
      fixture.detectChanges();
      expect(li.nativeElement.classList).toContain('ant-select-dropdown-menu-item-active');
    });
    it('should nzShowActive work', () => {
      testComponent.option.nzValue = { value: 'test' };
      testComponent.activeOption.nzValue = { value: 'test' };
      testComponent.showActive = false;
      fixture.detectChanges();
      expect(li.nativeElement.classList).not.toContain('ant-select-dropdown-menu-item-active');
    });
  });
});

@Component({
  selector: 'nz-test-select-option-li',
  template: `
    <li
      nz-option-li
      [compareWith]="compareFn"
      [nzOption]="option"
      [nzListOfSelectedValue]="listOfSelectedValue"
      [nzShowActive]="showActive"
      [nzActiveOption]="activeOption">
    </li>`
})
export class NzTestSelectOptionLiComponent {
  option = new NzOptionComponent();
  showActive = true;
  listOfSelectedValue = [];
  activeOption = new NzOptionComponent();
  // tslint:disable-next-line:no-any
  compareFn = (o1: any, o2: any) => o1 && o2 ? o1.value === o2.value : o1 === o2;
}
