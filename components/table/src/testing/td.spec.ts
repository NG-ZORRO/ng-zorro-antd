/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { vi } from 'vitest';

import { updateNonSignalsInput } from 'ng-zorro-antd/core/testing';
import { NzTdAddOnComponent, NzTableModule } from 'ng-zorro-antd/table';

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

  it('should checkbox work', () => {
    fixture.detectChanges();
    expect(td.nativeElement.querySelector('.ant-checkbox-wrapper')).toBeDefined();
    expect(td.nativeElement.classList).toContain('ant-table-selection-column');
  });

  it('should checked work', async () => {
    fixture.detectChanges();
    expect(td.nativeElement.querySelector('.ant-checkbox-wrapper').firstElementChild!.classList).not.toContain(
      'ant-checkbox-checked'
    );
    testComponent.checked.set(true);
    fixture.detectChanges();
    await updateNonSignalsInput(fixture);
    fixture.detectChanges();
    expect(testComponent.checked()).toBe(true);
    expect(td.nativeElement.querySelector('.ant-checkbox-wrapper').firstElementChild!.classList).toContain(
      'ant-checkbox-checked'
    );
    expect(testComponent.checkedChange).toHaveBeenCalledTimes(0);
  });

  it('should disabled work', () => {
    fixture.detectChanges();
    testComponent.disabled.set(true);
    fixture.detectChanges();
    expect(testComponent.checked()).toBe(false);
    expect(
      td.nativeElement
        .querySelector('.ant-checkbox-wrapper')
        .firstElementChild!.classList.contains('ant-checkbox-checked')
    ).toBe(false);
    expect(testComponent.checkedChange).toHaveBeenCalledTimes(0);
    td.nativeElement.querySelector('.ant-checkbox-wrapper').click();
    fixture.detectChanges();
    expect(testComponent.checked()).toBe(false);
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
    testComponent.indeterminate.set(true);
    fixture.detectChanges();
    expect(
      td.nativeElement
        .querySelector('.ant-checkbox-wrapper')
        .firstElementChild!.classList.contains('ant-checkbox-indeterminate')
    ).toBe(true);
    testComponent.checked.set(true);
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
    testComponent.expand.set(true);
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
    expect(testComponent.expand()).toBe(true);
    expect(td.nativeElement.querySelector('.ant-table-row-expand-icon').classList).toContain(
      'ant-table-row-expand-icon-expanded'
    );
    expect(testComponent.expandChange).toHaveBeenCalledTimes(1);
  });

  it('should be row index when index-size is 0', () => {
    testComponent.indentSize.set(0);
    fixture.detectChanges();
    expect(td.nativeElement.querySelector('.ant-table-row-indent')).not.toBeNull();
  });

  it('should indentSize work', () => {
    testComponent.indentSize.set(20);
    fixture.detectChanges();
    expect(td.nativeElement.querySelector('.ant-table-row-indent').style.paddingLeft).toBe('20px');
  });

  it('should left work', () => {
    testComponent.left.set('20px');
    fixture.detectChanges();
    expect(td.nativeElement.classList).toContain('ant-table-cell-fix-left');
    expect(td.nativeElement.style.left).toBe('20px');
  });

  it('should right work', () => {
    testComponent.right.set('20px');
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
    testComponent.label.set('test-label');
    fixture.detectChanges();
    console.log(td.nativeElement.querySelector('label').attributes.getNamedItem('aria-label').value);
    expect(td.nativeElement.querySelector('label').attributes.getNamedItem('aria-label').value).toBe('test-label'); //toContain('test-label');
  });
});

@Component({
  imports: [NzTableModule],
  template: `
    <td
      [(nzChecked)]="checked"
      (nzCheckedChange)="checkedChange($event)"
      [nzIndeterminate]="indeterminate()"
      [nzLabel]="label()"
      [nzDisabled]="disabled()"
      [(nzExpand)]="expand"
      (nzExpandChange)="expandChange($event)"
      [nzIndentSize]="indentSize()"
      [nzLeft]="left()"
      [nzRight]="right()"
    ></td>
  `
})
export class NzTestTdComponent {
  readonly checked = signal(false);
  checkedChange = vi.fn();
  readonly indeterminate = signal(false);
  readonly disabled = signal(false);
  readonly expand = signal(false);
  expandChange = vi.fn();
  readonly indentSize = signal(0);
  readonly left = signal<string | boolean>(false);
  readonly right = signal<string | boolean>(false);
  readonly label = signal<string | null>(null);
}

@Component({
  imports: [NzTableModule],
  template: `<td class="nz-disable-td" [nzChecked]="true"></td>`
})
export class NzTestDisableTdComponent {}
