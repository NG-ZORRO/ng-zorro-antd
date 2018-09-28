import { Component } from '@angular/core';
import { fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzTableModule } from './nz-table.module';
import { NzTdComponent } from './nz-td.component';

describe('nz-td', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzTableModule ],
      declarations: [ NzTestTdComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('basic nz-td', () => {
    let fixture;
    let testComponent;
    let td;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTdComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      td = fixture.debugElement.query(By.directive(NzTdComponent));
    });
    it('should showCheckbox work', () => {
      fixture.detectChanges();
      expect(td.nativeElement.querySelector('.ant-checkbox-wrapper')).toBeNull();
      testComponent.showCheckbox = true;
      fixture.detectChanges();
      expect(td.nativeElement.querySelector('.ant-checkbox-wrapper')).toBeDefined();
      expect(td.nativeElement.classList).toContain('ant-table-selection-column');
      testComponent.showCheckbox = false;
      fixture.detectChanges();
      expect(td.nativeElement.classList).not.toContain('ant-table-selection-column');
    });
    it('should checked work', fakeAsync(() => {
      testComponent.showCheckbox = true;
      fixture.detectChanges();
      expect(td.nativeElement.querySelector('.ant-checkbox-wrapper').firstElementChild.classList).not.toContain('ant-checkbox-checked');
      testComponent.checked = true;
      fixture.detectChanges();
      flush();
      fixture.detectChanges();
      expect(testComponent.checked).toBe(true);
      expect(td.nativeElement.querySelector('.ant-checkbox-wrapper').firstElementChild.classList).toContain('ant-checkbox-checked');
      expect(testComponent.checkedChange).toHaveBeenCalledTimes(0);
    }));
    it('should disabled work', () => {
      testComponent.showCheckbox = true;
      fixture.detectChanges();
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(testComponent.checked).toBe(false);
      expect(td.nativeElement.querySelector('.ant-checkbox-wrapper').firstElementChild.classList.contains('ant-checkbox-checked')).toBe(false);
      expect(testComponent.checkedChange).toHaveBeenCalledTimes(0);
      td.nativeElement.querySelector('.ant-checkbox-wrapper').click();
      fixture.detectChanges();
      expect(testComponent.checked).toBe(false);
      expect(td.nativeElement.querySelector('.ant-checkbox-wrapper').firstElementChild.classList.contains('ant-checkbox-checked')).toBe(false);
      expect(testComponent.checkedChange).toHaveBeenCalledTimes(0);
    });
    it('should indeterminate work', () => {
      testComponent.showCheckbox = true;
      fixture.detectChanges();
      fixture.detectChanges();
      testComponent.indeterminate = true;
      fixture.detectChanges();
      expect(td.nativeElement.querySelector('.ant-checkbox-wrapper').firstElementChild.classList.contains('ant-checkbox-indeterminate')).toBe(true);
      testComponent.checked = true;
      fixture.detectChanges();
      expect(td.nativeElement.querySelector('.ant-checkbox-wrapper').firstElementChild.classList.contains('ant-checkbox-indeterminate')).toBe(true);
    });
    it('should showExpand work', () => {
      fixture.detectChanges();
      expect(td.nativeElement.querySelector('.ant-table-row-expand-icon')).toBeNull();
      testComponent.showExpand = true;
      fixture.detectChanges();
      expect(td.nativeElement.querySelector('.ant-table-row-expand-icon')).toBeDefined();
      expect(td.nativeElement.classList).toContain('ant-table-row-expand-icon-cell');
      testComponent.showExpand = false;
      fixture.detectChanges();
      expect(td.nativeElement.classList).not.toContain('ant-table-row-expand-icon-cell');
    });
    it('should expand work', () => {
      testComponent.showExpand = true;
      fixture.detectChanges();
      expect(td.nativeElement.querySelector('.ant-table-row-expand-icon').classList).toContain('ant-table-row-collapsed');
      testComponent.expand = true;
      fixture.detectChanges();
      expect(td.nativeElement.querySelector('.ant-table-row-expand-icon').classList).toContain('ant-table-row-expanded');
      expect(testComponent.expandChange).toHaveBeenCalledTimes(0);
    });
    it('should click expand work', () => {
      testComponent.showExpand = true;
      fixture.detectChanges();
      expect(td.nativeElement.querySelector('.ant-table-row-expand-icon').classList).toContain('ant-table-row-collapsed');
      td.nativeElement.querySelector('.ant-table-row-expand-icon').click();
      fixture.detectChanges();
      expect(testComponent.expand).toBe(true);
      expect(td.nativeElement.querySelector('.ant-table-row-expand-icon').classList).toContain('ant-table-row-expanded');
      expect(testComponent.expandChange).toHaveBeenCalledTimes(1);
    });
    it('should be row index when index-size is 0', () => {
      testComponent.indentSize = 0;
      fixture.detectChanges();
      expect(td.nativeElement.querySelector('.ant-table-row-indent')).not.toBeNull();
    });
    it('should be keeping space when hidden expand and index-size is not null', () => {
      testComponent.showExpand = false;
      testComponent.indentSize = 0;
      fixture.detectChanges();
      expect(td.nativeElement.querySelector('.ant-table-row-expand-icon').classList).toContain('ant-table-row-spaced');
    });
    it('should indentSize work', () => {
      fixture.detectChanges();
      expect(td.nativeElement.querySelector('.ant-table-row-indent')).toBeNull();
      testComponent.indentSize = 20;
      fixture.detectChanges();
      expect(td.nativeElement.querySelector('.ant-table-row-indent').style.paddingLeft).toBe('20px');
    });
    it('should left work', () => {
      fixture.detectChanges();
      expect(td.nativeElement.classList).not.toContain('ant-table-td-left-sticky');
      testComponent.left = '20px';
      fixture.detectChanges();
      expect(td.nativeElement.classList).toContain('ant-table-td-left-sticky');
      expect(td.nativeElement.style.left).toBe('20px');
    });
    it('should right work', () => {
      fixture.detectChanges();
      expect(td.nativeElement.classList).not.toContain('ant-table-td-right-sticky');
      testComponent.right = '20px';
      fixture.detectChanges();
      expect(td.nativeElement.classList).toContain('ant-table-td-right-sticky');
      expect(td.nativeElement.style.right).toBe('20px');
    });
    it('should be throw error when use specific class name', () => {
      expect(() => {
        TestBed.configureTestingModule({
          declarations: [ NzTestDisableTdComponent ]
        }).createComponent(NzTestDisableTdComponent);
      }).toThrow();
    });
  });
});

@Component({
  selector: 'nz-test-td',
  template: `
    <td
      [nzShowCheckbox]="showCheckbox"
      [(nzChecked)]="checked"
      [nzIndeterminate]="indeterminate"
      (nzCheckedChange)="checkedChange($event)"
      [nzDisabled]="disabled"
      [nzShowExpand]="showExpand"
      [(nzExpand)]="expand"
      (nzExpandChange)="expandChange($event)"
      [nzIndentSize]="indentSize"
      [nzLeft]="left"
      [nzRight]="right"></td>`
})
export class NzTestTdComponent {
  showCheckbox = false;
  checked = false;
  checkedChange = jasmine.createSpy('show change');
  indeterminate = false;
  disabled = false;
  showExpand = false;
  expand = false;
  expandChange = jasmine.createSpy('expand change');
  indentSize;
  left;
  right;
}

@Component({
  selector: 'nz-disable-td',
  template: `
    <td class="nz-disable-td" [nzShowCheckbox]="true"></td>
  `
})
export class NzTestDisableTdComponent {}
