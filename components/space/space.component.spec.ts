/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';
import { NzSpaceAlign, NzSpaceDirection, NzSpaceSize } from 'ng-zorro-antd/space';
import { NzSpaceComponent } from 'ng-zorro-antd/space/space.component';

import { NzSpaceModule } from './space.module';

describe('space', () => {
  let component: SpaceTestComponent;
  let fixture: ComponentFixture<SpaceTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting()]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceTestComponent);
    component = fixture.componentInstance;
    component.size.set('small');
    component.direction.set('horizontal');
    fixture.detectChanges();
  });

  it('should render size', () => {
    const spaceComponent = fixture.debugElement.query(By.directive(NzSpaceComponent));
    const spaceElement = spaceComponent.nativeElement as HTMLElement;

    // default size is 'small'
    expect(spaceElement.style.columnGap).toBe('8px');
    expect(spaceElement.style.rowGap).toBe('8px');

    component.size.set('middle');
    fixture.detectChanges();
    expect(spaceElement.style.columnGap).toBe('16px');
    expect(spaceElement.style.rowGap).toBe('16px');

    component.size.set('large');
    fixture.detectChanges();
    expect(spaceElement.style.columnGap).toBe('24px');
    expect(spaceElement.style.rowGap).toBe('24px');
  });

  it('should render customize size', () => {
    const spaceComponent = fixture.debugElement.query(By.directive(NzSpaceComponent));
    const spaceElement = spaceComponent.nativeElement as HTMLElement;

    component.size.set(36);
    fixture.detectChanges();
    expect(spaceElement.style.columnGap).toBe('36px');
    expect(spaceElement.style.rowGap).toBe('36px');

    component.size.set([36, 18]);
    fixture.detectChanges();
    expect(spaceElement.style.columnGap).toBe('36px');
    expect(spaceElement.style.rowGap).toBe('18px');
  });

  it('should wrap', () => {
    const spaceComponent = fixture.debugElement.query(By.directive(NzSpaceComponent));
    const spaceElement = spaceComponent.nativeElement as HTMLElement;

    // default wrap is false
    expect(spaceElement.style.flexWrap).toBeFalsy();

    component.wrap.set(true);
    fixture.detectChanges();

    expect(spaceElement.style.flexWrap).toBe('wrap');
  });

  it('should set direction', () => {
    const spaceComponent = fixture.debugElement.query(By.directive(NzSpaceComponent));
    const spaceElement = spaceComponent.nativeElement as HTMLElement;

    component.direction.set('vertical');
    fixture.detectChanges();
    expect(spaceElement.classList).toContain('ant-space-vertical');

    component.direction.set('horizontal');
    fixture.detectChanges();
    expect(spaceElement.classList).toContain('ant-space-horizontal');
  });

  it('should set align', () => {
    component.direction.set('vertical');
    fixture.detectChanges();

    const spaceComponent = fixture.debugElement.query(By.directive(NzSpaceComponent));
    const spaceNativeElement = spaceComponent.nativeElement as HTMLElement;
    expect(spaceNativeElement.classList).toContain('ant-space-vertical');

    spaceNativeElement.classList.forEach(className => {
      expect(className.indexOf('ant-space-align') === -1).toBe(true);
    });

    component.direction.set('horizontal');
    fixture.detectChanges();

    expect(spaceNativeElement.classList).toContain('ant-space-align-center');

    component.align.set('end');
    fixture.detectChanges();

    expect(spaceNativeElement.classList).toContain('ant-space-align-end');
  });

  it('should render split', () => {
    component.showSplit.set(true);
    fixture.detectChanges();

    const spaceComponent = fixture.debugElement.query(By.directive(NzSpaceComponent));
    const spaceElement = spaceComponent.nativeElement as HTMLElement;
    let items = fixture.debugElement.queryAll(By.css('.ant-space-item'));
    let splits = fixture.debugElement.queryAll(By.css('.ant-space-split'));

    expect(items.length).toBe(2);
    expect(splits.length).toBe(1);
    expect(spaceElement.style.columnGap).toBe('8px');
    expect(spaceElement.style.rowGap).toBe('8px');

    component.show.set(true);
    fixture.detectChanges();

    items = fixture.debugElement.queryAll(By.css('.ant-space-item'));
    splits = fixture.debugElement.queryAll(By.css('.ant-space-split'));

    expect(items.length).toBe(3);
    expect(splits.length).toBe(2);
    expect(spaceElement.style.columnGap).toBe('8px');
    expect(spaceElement.style.rowGap).toBe('8px');
  });
});

@Component({
  imports: [NzSpaceModule],
  template: `
    <nz-space
      [nzSplit]="showSplit() ? spaceSplit : null"
      [nzSize]="size()"
      [nzDirection]="direction()"
      [nzAlign]="align()"
      [nzWrap]="wrap()"
    >
      <div *nzSpaceItem>item</div>
      <div *nzSpaceItem>item</div>
      @if (show()) {
        <div *nzSpaceItem>item</div>
      }
    </nz-space>

    <ng-template #spaceSplit>|</ng-template>
  `
})
class SpaceTestComponent {
  readonly size = signal<NzSpaceSize | [NzSpaceSize, NzSpaceSize]>('small');
  readonly direction = signal<NzSpaceDirection>('horizontal');
  readonly show = signal(false);
  readonly align = signal<NzSpaceAlign | undefined>(undefined);
  readonly wrap = signal<boolean | undefined>(undefined);
  readonly showSplit = signal(false);
}
