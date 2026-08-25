/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';

import { NzResizeObserverDirective, NzResizeObserver } from 'ng-zorro-antd/cdk/resize-observer';

describe('resize observer', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let resizeEntries$: Subject<ResizeObserverEntry[]>;

  beforeEach(() => {
    resizeEntries$ = new Subject<ResizeObserverEntry[]>();
    TestBed.configureTestingModule({
      providers: [
        {
          provide: NzResizeObserver,
          useValue: { observe: () => resizeEntries$ }
        }
      ]
    });
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.autoDetectChanges();
  });

  it('should stop and resume resize events when disabled changes', async () => {
    await fixture.whenStable();

    const initialEntries = [{} as ResizeObserverEntry];
    resizeEntries$.next(initialEntries);
    expect(component.resizeEntries()).toEqual([initialEntries]);

    component.disabled.set(true);
    await fixture.whenStable();

    resizeEntries$.next([{} as ResizeObserverEntry]);
    expect(component.resizeEntries()).toEqual([initialEntries]);

    component.disabled.set(false);
    await fixture.whenStable();

    const resumedEntries = [{} as ResizeObserverEntry];
    resizeEntries$.next(resumedEntries);
    expect(component.resizeEntries()).toEqual([initialEntries, resumedEntries]);
  });
});

@Component({
  template: `
    <div nzResizeObserver [nzResizeObserverDisabled]="disabled()" (nzResizeObserve)="onResize($event)"></div>
  `,
  imports: [NzResizeObserverDirective]
})
class TestHostComponent {
  readonly disabled = signal(false);
  readonly resizeEntries = signal<ResizeObserverEntry[][]>([]);

  onResize(entries: ResizeObserverEntry[]): void {
    this.resizeEntries.update(currentEntries => [...currentEntries, entries]);
  }
}
