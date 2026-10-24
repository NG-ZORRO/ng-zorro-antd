/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { vi } from 'vitest';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { dispatchFakeEvent } from 'ng-zorro-antd/core/testing';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';
import {
  NzTableDateFilterConfig,
  NzTableFilterFn,
  NzTableFilterList,
  NzTableFilterValue,
  NzTableModule,
  NzTableNumberFilterConfig,
  NzTableOptionsFilterConfig,
  NzTableTextFilterConfig
} from 'ng-zorro-antd/table';

interface Task {
  id: number;
  status: string | null | undefined;
  team: string;
}

describe('nz-th filter config', () => {
  let fixture: ComponentFixture<NzThTestFilterConfigComponent>;
  let component: NzThTestFilterConfigComponent;
  let overlayContainerElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideNzNoAnimation(), provideNzI18n(en_US)]
    });
    overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
    fixture = TestBed.createComponent(NzThTestFilterConfigComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    TestBed.inject(OverlayContainer).ngOnDestroy();
  });

  async function stabilize(): Promise<void> {
    fixture.detectChanges();
    await fixture.whenStable();
    // `thead` publishes filter operators after `delay(0)`.
    await new Promise(resolve => setTimeout(resolve));
    fixture.detectChanges();
  }

  async function openFilter(index: number): Promise<void> {
    const trigger = fixture.nativeElement.querySelectorAll('.ant-table-filter-trigger')[index] as HTMLElement;
    dispatchFakeEvent(trigger, 'click');
    // The dropdown applies its visibility after a 150ms audit time outside Angular.
    await new Promise(resolve => setTimeout(resolve, 200));
    await stabilize();
  }

  function getOptionElements(): HTMLElement[] {
    return Array.from(
      overlayContainerElement.querySelectorAll<HTMLElement>('.ant-table-filter-dropdown .ant-dropdown-menu-item')
    );
  }

  function getOptionTexts(): string[] {
    return getOptionElements().map(option => option.textContent!.trim());
  }

  async function selectOptions(...texts: string[]): Promise<void> {
    for (const text of texts) {
      getOptionElements()
        .find(option => option.textContent!.trim() === text)!
        .click();
      await stabilize();
    }
    overlayContainerElement.querySelector<HTMLElement>('.ant-table-filter-dropdown-btns .ant-btn-primary')!.click();
    await new Promise(resolve => setTimeout(resolve, 200));
    await stabilize();
  }

  function getRenderedIds(): number[] {
    return Array.from(fixture.nativeElement.querySelectorAll('tbody td.task-id') as NodeListOf<HTMLElement>).map(cell =>
      Number(cell.textContent)
    );
  }

  it('should build unique options from all data and list the empty option last', async () => {
    await stabilize();
    await openFilter(0);

    expect(getOptionTexts()).toEqual(['blocked', 'closed', 'open', '(empty)']);
  });

  it('should filter rows and emit arrays with null for the empty option', async () => {
    await stabilize();
    await openFilter(0);
    await selectOptions('open', '(empty)');

    expect(component.statusChange).toHaveBeenLastCalledWith(['open', null]);
    expect(component.statusValue()).toEqual(['open', null]);
    expect(getRenderedIds()).toEqual([1, 2, 4, 5, 6, 8]);
  });

  it('should emit an array when the empty option is selected in single selection mode', async () => {
    component.multiple.set(false);
    await stabilize();
    await openFilter(0);
    await selectOptions('(empty)');

    expect(component.statusValue()).toEqual([null]);
    expect(getRenderedIds()).toEqual([4, 5, 6]);
  });

  it('should combine with other column filters without removing generated options', async () => {
    component.teamValue.set(['red']);
    await stabilize();
    expect(getRenderedIds()).toEqual([1, 3, 5, 7]);

    await openFilter(0);
    expect(getOptionTexts()).toEqual(['blocked', 'closed', 'open', '(empty)']);
    await selectOptions('open');

    expect(getRenderedIds()).toEqual([1]);
  });

  it('should apply and display a bound filter value', async () => {
    component.statusValue.set(['closed']);
    await stabilize();

    expect(getRenderedIds()).toEqual([3]);
    expect(fixture.nativeElement.querySelector('.ant-table-filter-trigger').classList).toContain('active');

    await openFilter(0);
    const checkedTexts = getOptionElements()
      .filter(option => option.querySelector('.ant-checkbox-checked'))
      .map(option => option.textContent!.trim());
    expect(checkedTexts).toEqual(['closed']);
  });

  it('should keep a selected value visible when it is no longer in the data', async () => {
    component.statusValue.set(['archived']);
    await stabilize();
    await openFilter(0);

    expect(getOptionTexts()).toEqual(['archived', 'blocked', 'closed', 'open', '(empty)']);
    expect(getRenderedIds()).toEqual([]);
  });

  it('should preserve an array-valued legacy option in single selection mode', async () => {
    const value = ['red'];
    component.teamMultiple.set(false);
    component.teamFilters = [{ text: 'Red', value }];
    await stabilize();
    await openFilter(1);
    await selectOptions('Red');

    expect(component.teamValue()).toBe(value);
    expect(getRenderedIds()).toEqual([1, 3, 5, 7]);
    expect(fixture.nativeElement.querySelectorAll('.ant-table-filter-trigger')[1].classList).toContain('active');

    await openFilter(1);
    expect(getOptionElements()[0].querySelector('.ant-radio-checked')).not.toBeNull();
  });

  it('should preserve and reset custom object-valued options', async () => {
    const value = { team: 'red' };
    component.statusFilter.set({ type: 'options', options: [{ text: 'Red', value }] });
    component.statusFilterFn = (values, task) => values.includes(value) && task.team === value.team;
    await stabilize();
    await openFilter(0);
    await selectOptions('Red');

    expect(component.statusValue()).toEqual([value]);
    expect(getRenderedIds()).toEqual([1, 3, 5, 7]);
    expect(fixture.nativeElement.querySelector('.ant-table-filter-trigger').classList).toContain('active');

    await openFilter(0);
    expect(getOptionElements()[0].querySelector('.ant-checkbox-checked')).not.toBeNull();
    const reset = overlayContainerElement.querySelector<HTMLButtonElement>(
      '.ant-table-filter-dropdown-btns .ant-btn-link'
    )!;
    expect(reset.disabled).toBe(false);
    reset.click();
    await stabilize();

    expect(component.statusValue()).toEqual([]);
    expect(getRenderedIds()).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('should clear generated options when the source data becomes empty', async () => {
    await stabilize();
    await openFilter(0);
    expect(getOptionTexts().length).toBeGreaterThan(0);

    component.data.set([]);
    await stabilize();

    expect(getOptionTexts()).toEqual([]);
  });

  it('should show a late filter config while respecting explicit trigger visibility', async () => {
    const config = component.statusFilter();
    component.statusFilter.set(null);
    await stabilize();
    expect(fixture.nativeElement.querySelectorAll('.ant-table-filter-trigger').length).toBe(1);

    component.statusFilter.set(config);
    await stabilize();

    expect(fixture.nativeElement.querySelectorAll('.ant-table-filter-trigger').length).toBe(2);
    await openFilter(0);
    expect(getOptionTexts()).toEqual(['blocked', 'closed', 'open', '(empty)']);
  });
});

@Component({
  imports: [NzTableModule],
  template: `
    <nz-table #table [nzData]="data()" [nzPageSize]="20">
      <thead>
        <tr>
          <th
            [nzFilterConfig]="statusFilter()"
            [nzFilterFn]="statusFilterFn"
            [nzFilterMultiple]="multiple()"
            [(nzFilterValue)]="statusValue"
            (nzFilterChange)="statusChange($event)"
          >
            Status
          </th>
          <th
            [nzFilters]="teamFilters"
            [nzFilterFn]="teamFilterFn"
            [nzFilterMultiple]="teamMultiple()"
            [(nzFilterValue)]="teamValue"
          >
            Team
          </th>
          <th [nzFilterConfig]="statusFilter()" [nzShowFilter]="false">Hidden filter</th>
        </tr>
      </thead>
      <tbody>
        @for (task of table.data; track task.id) {
          <tr>
            <td class="task-id">{{ task.id }}</td>
            <td>{{ task.team }}</td>
          </tr>
        }
      </tbody>
    </nz-table>
  `
})
class NzThTestFilterConfigComponent {
  readonly multiple = signal(true);
  readonly teamMultiple = signal(true);
  readonly statusValue = signal<NzTableFilterValue>(null);
  readonly teamValue = signal<NzTableFilterValue>(null);
  readonly statusChange = vi.fn();
  readonly statusFilter = signal<NzTableOptionsFilterConfig<Task> | null>({
    type: 'options',
    valueGetter: task => task.status
  });
  statusFilterFn: NzTableFilterFn<Task> | null = null;
  teamFilters: NzTableFilterList = [
    { text: 'Red', value: 'red' },
    { text: 'Blue', value: 'blue' }
  ];
  readonly data = signal<Task[]>([
    { id: 1, status: 'open', team: 'red' },
    { id: 2, status: 'open', team: 'blue' },
    { id: 3, status: 'closed', team: 'red' },
    { id: 4, status: null, team: 'blue' },
    { id: 5, status: '', team: 'red' },
    { id: 6, status: undefined, team: 'blue' },
    { id: 7, status: 'blocked', team: 'red' },
    { id: 8, status: 'open', team: 'blue' }
  ]);

  teamFilterFn = (value: string[], task: Task): boolean => value.includes(task.team);
}

interface Invoice {
  id: number;
  customer: string | null;
  amount: number | null;
  due: Date | null;
  priority: string;
}

describe('nz-th criteria filter config', () => {
  let fixture: ComponentFixture<NzThTestCriteriaFilterComponent>;
  let component: NzThTestCriteriaFilterComponent;
  let overlayContainerElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideNzNoAnimation(), provideNzI18n(en_US)]
    });
    overlayContainerElement = TestBed.inject(OverlayContainer).getContainerElement();
    fixture = TestBed.createComponent(NzThTestCriteriaFilterComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    TestBed.inject(OverlayContainer).ngOnDestroy();
  });

  const wait = (ms = 0): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

  async function stabilize(): Promise<void> {
    fixture.detectChanges();
    await fixture.whenStable();
    await wait();
    fixture.detectChanges();
  }

  async function openFilter(index: number): Promise<void> {
    const trigger = fixture.nativeElement.querySelectorAll('.ant-table-filter-trigger')[index] as HTMLElement;
    dispatchFakeEvent(trigger, 'click');
    await wait(200);
    await stabilize();
  }

  function getPanel(): HTMLElement | null {
    return overlayContainerElement.querySelector<HTMLElement>('.ant-table-filter-dropdown-criteria');
  }

  async function typeInto(input: HTMLInputElement, value: string): Promise<void> {
    input.value = value;
    dispatchFakeEvent(input, 'input');
    await stabilize();
  }

  async function confirm(): Promise<void> {
    overlayContainerElement.querySelector<HTMLElement>('.ant-table-filter-dropdown-btns .ant-btn-primary')!.click();
    await stabilize();
  }

  function getRenderedIds(): number[] {
    return Array.from(fixture.nativeElement.querySelectorAll('tbody td.invoice-id') as NodeListOf<HTMLElement>).map(
      cell => Number(cell.textContent)
    );
  }

  it('should filter text with the default operator and emit a criterion', async () => {
    await stabilize();
    await openFilter(0);
    await typeInto(getPanel()!.querySelector('input[type="text"]')!, 'AC');
    await confirm();

    expect(component.customerValue()).toEqual({ operator: 'contains', value: 'AC', caseSensitive: false });
    expect(getRenderedIds()).toEqual([1, 3]);
    expect(fixture.nativeElement.querySelector('.ant-table-filter-trigger').classList).toContain('active');
  });

  it('should keep the filter dropdown open while choosing an operator', async () => {
    await stabilize();
    await openFilter(0);
    dispatchFakeEvent(getPanel()!.querySelector('nz-select')!, 'click');
    await stabilize();
    const equalsOption = Array.from(
      overlayContainerElement.querySelectorAll<HTMLElement>('.ant-select-item-option')
    ).find(option => option.textContent!.trim() === 'Equals')!;
    equalsOption.click();
    await wait(200);
    await stabilize();

    expect(getPanel()).not.toBeNull();
    await typeInto(getPanel()!.querySelector('input[type="text"]')!, 'acme');
    getPanel()!.querySelector<HTMLInputElement>('.ant-checkbox-input')!.click();
    await stabilize();
    await confirm();

    expect(component.customerValue()).toEqual({ operator: 'equals', value: 'acme', caseSensitive: true });
    expect(getRenderedIds()).toEqual([]);
  });

  it('should not confirm a draft when Enter is pressed in the operator select', async () => {
    await stabilize();
    await openFilter(0);
    await typeInto(getPanel()!.querySelector('input[nz-input]')!, 'AC');
    getPanel()!
      .querySelector('nz-select input')!
      .dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await wait(200);
    await stabilize();

    expect(getPanel()).not.toBeNull();
    expect(component.customerValue()).toBeNull();
  });

  it.each([0, 1])('should confirm a value editor with Enter in column %i', async index => {
    await stabilize();
    await openFilter(index);
    const input = getPanel()!.querySelector<HTMLInputElement>('input[nz-input]')!;
    await typeInto(input, index === 0 ? 'AC' : '100');
    input.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await wait(200);
    await stabilize();

    expect(getPanel()).toBeNull();
    expect(index === 0 ? component.customerValue() : component.amountValue()).not.toBeNull();
  });

  it('should apply bound number and date criteria together', async () => {
    component.amountValue.set({ operator: 'between', value: 100, valueTo: 300 });
    await stabilize();
    expect(getRenderedIds()).toEqual([1, 2, 3]);

    component.dueValue.set({ operator: 'before', value: '2024-02-01' });
    await stabilize();
    expect(getRenderedIds()).toEqual([1, 3]);

    await openFilter(1);
    const inputs = getPanel()!.querySelectorAll<HTMLInputElement>('input[type="number"]');
    expect(Array.from(inputs).map(input => input.value)).toEqual(['100', '300']);
  });

  it('should clear the criterion on reset', async () => {
    component.amountValue.set({ operator: 'greaterThan', value: 250 });
    await stabilize();
    expect(getRenderedIds()).toEqual([3]);

    await openFilter(1);
    overlayContainerElement.querySelector<HTMLElement>('.ant-table-filter-dropdown-btns .ant-btn-link')!.click();
    await stabilize();

    expect(component.amountValue()).toBeNull();
    expect(getRenderedIds()).toEqual([1, 2, 3]);
  });

  it('should restore a bound text criterion and clear it on reset', async () => {
    component.customerValue.set({ operator: 'equals', value: 'Acme', caseSensitive: true });
    await stabilize();
    expect(getRenderedIds()).toEqual([1]);
    await openFilter(0);

    expect(getPanel()!.querySelector<HTMLInputElement>('input[nz-input]')!.value).toBe('Acme');
    expect(getPanel()!.querySelector<HTMLInputElement>('.ant-checkbox-input')!.checked).toBe(true);
    overlayContainerElement.querySelector<HTMLElement>('.ant-table-filter-dropdown-btns .ant-btn-link')!.click();
    await stabilize();

    expect(component.customerValue()).toBeNull();
    expect(getRenderedIds()).toEqual([1, 2, 3]);
  });

  it('should restore both date range editors without confirming on date-picker Enter', async () => {
    component.dueValue.set({ operator: 'between', value: '2024-01-01', valueTo: '2024-01-31' });
    await stabilize();
    expect(getRenderedIds()).toEqual([1, 3]);
    await openFilter(2);
    const inputs = getPanel()!.querySelectorAll<HTMLInputElement>('nz-date-picker input');

    expect(Array.from(inputs).map(input => input.value)).toEqual(['2024-01-01', '2024-01-31']);
    inputs[0].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
    await wait(200);
    await stabilize();
    expect(getPanel()).not.toBeNull();

    overlayContainerElement.querySelector<HTMLElement>('.ant-table-filter-dropdown-btns .ant-btn-link')!.click();
    await stabilize();

    expect(component.dueValue()).toBeNull();
    expect(getRenderedIds()).toEqual([1, 2, 3]);
  });

  it('should restore datetime range values with time editors', async () => {
    component.dueFilter.dateMode = 'datetime';
    const from = new Date(2024, 0, 1, 8).toISOString();
    const to = new Date(2024, 0, 31, 18).toISOString();
    component.dueValue.set({ operator: 'between', value: from, valueTo: to });
    await stabilize();
    await openFilter(2);
    const inputs = getPanel()!.querySelectorAll<HTMLInputElement>('nz-date-picker input');

    expect(inputs[0].value).toContain('2024-01-01');
    expect(inputs[0].value).toContain('08:00');
    expect(inputs[1].value).toContain('2024-01-31');
    expect(inputs[1].value).toContain('18:00');
    expect(getRenderedIds()).toEqual([1, 3]);
  });

  it('should use hand-written options with default selections in an options config', async () => {
    await stabilize();
    expect(getRenderedIds()).toEqual([1, 2, 3]);

    await openFilter(3);
    const texts = Array.from(
      overlayContainerElement.querySelectorAll<HTMLElement>('.ant-table-filter-dropdown .ant-dropdown-menu-item')
    ).map(option => option.textContent!.trim());
    expect(texts).toEqual(['High', 'Low']);
  });
});

@Component({
  imports: [NzTableModule],
  template: `
    <nz-table #table [nzData]="data" [nzPageSize]="20">
      <thead>
        <tr>
          <th [nzFilterConfig]="customerFilter" [(nzFilterValue)]="customerValue">Customer</th>
          <th [nzFilterConfig]="amountFilter" [(nzFilterValue)]="amountValue">Amount</th>
          <th [nzFilterConfig]="dueFilter" [(nzFilterValue)]="dueValue">Due</th>
          <th [nzFilterConfig]="priorityFilter">Priority</th>
        </tr>
      </thead>
      <tbody>
        @for (invoice of table.data; track invoice.id) {
          <tr>
            <td class="invoice-id">{{ invoice.id }}</td>
          </tr>
        }
      </tbody>
    </nz-table>
  `
})
class NzThTestCriteriaFilterComponent {
  readonly customerValue = signal<NzTableFilterValue>(null);
  readonly amountValue = signal<NzTableFilterValue>(null);
  readonly dueValue = signal<NzTableFilterValue>(null);
  readonly customerFilter: NzTableTextFilterConfig<Invoice> = { type: 'text', valueGetter: row => row.customer };
  readonly amountFilter: NzTableNumberFilterConfig<Invoice> = { type: 'number', valueGetter: row => row.amount };
  readonly dueFilter: NzTableDateFilterConfig<Invoice> = { type: 'date', valueGetter: row => row.due };
  readonly priorityFilter: NzTableOptionsFilterConfig<Invoice> = {
    type: 'options',
    valueGetter: row => row.priority,
    options: [
      { text: 'High', value: 'high', byDefault: true },
      { text: 'Low', value: 'low' }
    ]
  };
  readonly data: Invoice[] = [
    { id: 1, customer: 'Acme', amount: 100, due: new Date(2024, 0, 10), priority: 'high' },
    { id: 2, customer: 'Globex', amount: 200, due: new Date(2024, 1, 10), priority: 'high' },
    { id: 3, customer: 'Pacific', amount: 300, due: new Date(2024, 0, 31), priority: 'high' },
    { id: 4, customer: null, amount: null, due: null, priority: 'low' }
  ];
}
