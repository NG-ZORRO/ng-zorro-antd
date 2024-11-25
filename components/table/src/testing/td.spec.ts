import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzTdAddOnComponent, NzTableModule } from 'ng-zorro-antd/table';

import { NzRowSelectionType } from '../table.types';

describe('nz-td', () => {
  let fixture: ComponentFixture<NzTestTdComponent>;
  let testComponent: NzTestTdComponent;
  let td: DebugElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestTdComponent);
    fixture.detectChanges();
    testComponent = fixture.debugElement.componentInstance;
    td = fixture.debugElement.query(By.directive(NzTdAddOnComponent));
  });

  it('should default value for selection type be checkbox', () => {
    fixture.detectChanges();
    expect(td.nativeElement.querySelector('.ant-checkbox-wrapper')).toBeDefined();
    expect(td.nativeElement.classList).toContain('ant-table-selection-column');
  });

  it('should checkbox work', () => {
    fixture.detectChanges();
    expect(td.nativeElement.querySelector('.ant-checkbox-wrapper')).toBeDefined();
    expect(td.nativeElement.classList).toContain('ant-table-selection-column');
  });

  it('should radio work', fakeAsync(() => {
    testComponent.selectionType = 'radio';
    flush();
    expect(td.nativeElement.querySelector('.ant-radio-wrapper')).toBeDefined();
  }));

  it('should checked work', fakeAsync(() => {
    fixture.detectChanges();
    expect(td.nativeElement.querySelector('.ant-checkbox-wrapper').firstElementChild!.classList).not.toContain(
      'ant-checkbox-checked'
    );
    testComponent.checked = true;
    fixture.detectChanges();
    flush();
    fixture.detectChanges();
    expect(testComponent.checked).toBe(true);
    expect(td.nativeElement.querySelector('.ant-checkbox-wrapper').firstElementChild!.classList).toContain(
      'ant-checkbox-checked'
    );
    expect(testComponent.checkedChange).toHaveBeenCalledTimes(0);
  }));

  it('should disabled work', () => {
    fixture.detectChanges();
    testComponent.disabled = true;
    fixture.detectChanges();
    expect(testComponent.checked).toBe(false);
    expect(
      td.nativeElement
        .querySelector('.ant-checkbox-wrapper')
        .firstElementChild!.classList.contains('ant-checkbox-checked')
    ).toBe(false);
    expect(testComponent.checkedChange).toHaveBeenCalledTimes(0);
    td.nativeElement.querySelector('.ant-checkbox-wrapper').click();
    fixture.detectChanges();
    expect(testComponent.checked).toBe(false);
    expect(
      td.nativeElement
        .querySelector('.ant-checkbox-wrapper')
        .firstElementChild!.classList.contains('ant-checkbox-checked')
    ).toBe(false);
    expect(testComponent.checkedChange).toHaveBeenCalledTimes(0);
  });

  it('should indeterminate work', () => {
    fixture.detectChanges();
    fixture.detectChanges();
    testComponent.indeterminate = true;
    fixture.detectChanges();
    expect(
      td.nativeElement
        .querySelector('.ant-checkbox-wrapper')
        .firstElementChild!.classList.contains('ant-checkbox-indeterminate')
    ).toBe(true);
    testComponent.checked = true;
    fixture.detectChanges();
    expect(
      td.nativeElement
        .querySelector('.ant-checkbox-wrapper')
        .firstElementChild!.classList.contains('ant-checkbox-indeterminate')
    ).toBe(true);
  });

  it('should expand work', () => {
    fixture.detectChanges();
    expect(td.nativeElement.querySelector('.ant-table-row-expand-icon').classList).toContain(
      'ant-table-row-expand-icon-collapsed'
    );
    testComponent.expand = true;
    fixture.detectChanges();
    expect(td.nativeElement.querySelector('.ant-table-row-expand-icon').classList).toContain(
      'ant-table-row-expand-icon-expanded'
    );
    expect(testComponent.expandChange).toHaveBeenCalledTimes(0);
  });

  it('should click expand work', () => {
    fixture.detectChanges();
    expect(td.nativeElement.querySelector('.ant-table-row-expand-icon').classList).toContain(
      'ant-table-row-expand-icon-collapsed'
    );
    td.nativeElement.querySelector('.ant-table-row-expand-icon').click();
    fixture.detectChanges();
    expect(testComponent.expand).toBe(true);
    expect(td.nativeElement.querySelector('.ant-table-row-expand-icon').classList).toContain(
      'ant-table-row-expand-icon-expanded'
    );
    expect(testComponent.expandChange).toHaveBeenCalledTimes(1);
  });

  it('should be row index when index-size is 0', () => {
    testComponent.indentSize = 0;
    fixture.detectChanges();
    expect(td.nativeElement.querySelector('.ant-table-row-indent')).not.toBeNull();
  });

  it('should indentSize work', () => {
    testComponent.indentSize = 20;
    fixture.detectChanges();
    expect(td.nativeElement.querySelector('.ant-table-row-indent').style.paddingLeft).toBe('20px');
  });

  it('should left work', () => {
    testComponent.left = '20px';
    fixture.detectChanges();
    expect(td.nativeElement.classList).toContain('ant-table-cell-fix-left');
    expect(td.nativeElement.style.left).toBe('20px');
  });

  it('should right work', () => {
    testComponent.right = '20px';
    fixture.detectChanges();
    expect(td.nativeElement.classList).toContain('ant-table-cell-fix-right');
    expect(td.nativeElement.style.right).toBe('20px');
  });

  it('should be throw error when use specific class name', () => {
    expect(() => {
      TestBed.configureTestingModule({
        declarations: [NzTestDisableTdComponent]
      }).createComponent(NzTestDisableTdComponent);
    }).toThrow();
  });

  it('should add aria-label', () => {
    testComponent.label = 'test-label';
    fixture.detectChanges();
    console.log(td.nativeElement.querySelector('label').attributes.getNamedItem('aria-label').value);
    expect(td.nativeElement.querySelector('label').attributes.getNamedItem('aria-label').value).toBe('test-label'); //toContain('test-label');
  });
});

@Component({
  standalone: true,
  imports: [NzTableModule],
  template: `
    <td
      [(nzChecked)]="checked"
      [nzIndeterminate]="indeterminate"
      [nzLabel]="label"
      (nzCheckedChange)="checkedChange($event)"
      [nzDisabled]="disabled"
      [(nzExpand)]="expand"
      [nzRowSelectionType]="selectionType"
      (nzExpandChange)="expandChange($event)"
      [nzIndentSize]="indentSize"
      [nzLeft]="left"
      [nzRight]="right"
    ></td>
  `
})
export class NzTestTdComponent {
  selectionType: NzRowSelectionType = 'checkbox';
  checked = false;
  checkedChange = jasmine.createSpy('show change');
  indeterminate = false;
  disabled = false;
  expand = false;
  expandChange = jasmine.createSpy('expand change');
  indentSize: number = 0;
  left: string | boolean = false;
  right: string | boolean = false;
  label: string | null = null;
}

@Component({
  standalone: true,
  imports: [NzTableModule],
  template: `<td class="nz-disable-td" [nzChecked]="true"></td>`
})
export class NzTestDisableTdComponent {}
