/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';

import { NzTrMeasureComponent } from './tr-measure.component';

describe('NzTrMeasureComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let resizeEntries$: Subject<ResizeObserverEntry[]>;

  beforeEach(() => {
    resizeEntries$ = new Subject<ResizeObserverEntry[]>();
    TestBed.configureTestingModule({
      providers: [{ provide: NzResizeObserver, useValue: { observe: () => resizeEntries$ } }]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    vi.useFakeTimers();
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should measure widths from contentRect rather than getBoundingClientRect', () => {
    const target = document.createElement('td');
    vi.spyOn(target, 'getBoundingClientRect').mockReturnValue({ width: 31 } as DOMRect);

    resizeEntries$.next([{ target, contentRect: { width: 155 } as DOMRectReadOnly } as unknown as ResizeObserverEntry]);
    vi.advanceTimersByTime(16);

    expect(component.measureComponent().listOfMeasureColumn).toEqual(['col']);
    expect(component.widths).toEqual([155]);
  });
});

@Component({
  template: `
    <table>
      <tbody>
        <tr nz-table-measure-row [listOfMeasureColumn]="['col']" (listOfAutoWidth)="onAutoWidth($event)"></tr>
      </tbody>
    </table>
  `,
  imports: [NzTrMeasureComponent]
})
class TestHostComponent {
  readonly measureComponent = viewChild.required(NzTrMeasureComponent);
  widths: number[] = [];

  onAutoWidth(widths: number[]): void {
    this.widths = widths;
  }
}
