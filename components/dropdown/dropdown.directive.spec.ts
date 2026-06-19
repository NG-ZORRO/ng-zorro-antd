/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, signal } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { vi } from 'vitest';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { dispatchFakeEvent, dispatchKeyboardEvent } from 'ng-zorro-antd/core/testing';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { NzPlacementType } from './dropdown-menu.component';
import { NzDropdownDirective } from './dropdown.directive';
import { NzDropdownModule } from './dropdown.module';

describe('dropdown', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzNoAnimation()]
    });
  });

  beforeEach(inject([OverlayContainer], (oc: OverlayContainer) => {
    overlayContainer = oc;
    overlayContainerElement = oc.getContainerElement();
  }));

  afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
    currentOverlayContainer.ngOnDestroy();
    overlayContainer.ngOnDestroy();
  }));

  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  // TODO: why this works well with ChromeHeadless but fails with ChromeHeadlessCI?
  describe.skip('placement and arrow', () => {
    let fixture: ComponentFixture<NzTestDropdownArrowComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestDropdownArrowComponent);
      fixture.componentInstance.arrow.set(true);
    });

    it('should render arrow when nzArrow is true and apply placement classes', async () => {
      fixture.componentInstance.placement.set('bottomLeft');
      fixture.detectChanges();
      const dropdownElement = fixture.debugElement.query(By.directive(NzDropdownDirective)).nativeElement;
      dispatchFakeEvent(dropdownElement, 'mouseenter');
      await stabilize(fixture, 1000);
      const dropdown = overlayContainerElement.querySelector('.ant-dropdown') as HTMLElement;
      expect(dropdown).not.toBeNull();
      expect(dropdown.classList).toContain('ant-dropdown-show-arrow');
      expect(dropdown.classList).toContain('ant-dropdown-placement-bottomLeft');
      expect(dropdown.querySelector('.ant-dropdown-arrow')).not.toBeNull();

      // Change placement while open should update placement class
      fixture.componentInstance.placement.set('topRight');
      await stabilize(fixture);
      expect(dropdown.classList.contains('ant-dropdown-placement-topRight')).toBeTrue();
    });

    it('should map center placements to top/bottom classes', async () => {
      fixture.componentInstance.placement.set('bottomCenter');
      fixture.detectChanges();
      const dropdownElement = fixture.debugElement.query(By.directive(NzDropdownDirective)).nativeElement;
      dispatchFakeEvent(dropdownElement, 'mouseenter');
      await stabilize(fixture, 1000);
      const dropdown = overlayContainerElement.querySelector('.ant-dropdown') as HTMLElement;
      expect(dropdown).not.toBeNull();
      expect(dropdown.classList.contains('ant-dropdown-show-arrow')).toBeTrue();
      const isBottomFamily =
        dropdown.classList.contains('ant-dropdown-placement-bottom') ||
        dropdown.classList.contains('ant-dropdown-placement-bottomLeft') ||
        dropdown.classList.contains('ant-dropdown-placement-bottomRight');
      expect(isBottomFamily).toBeTrue();

      // Switch to topCenter
      fixture.componentInstance.placement.set('topCenter');
      await stabilize(fixture);
      const isTopFamily =
        dropdown.classList.contains('ant-dropdown-placement-top') ||
        dropdown.classList.contains('ant-dropdown-placement-topLeft') ||
        dropdown.classList.contains('ant-dropdown-placement-topRight');
      expect(isTopFamily).toBeTrue();
    });
  });

  it('should hover correct', async () => {
    const fixture = TestBed.createComponent(NzTestDropdownComponent);
    fixture.componentInstance.trigger.set('hover');
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toBe('');
    const dropdownElement = fixture.debugElement.query(By.directive(NzDropdownDirective)).nativeElement;
    dispatchFakeEvent(dropdownElement, 'mouseenter');
    await stabilize(fixture, 1000);
    expect(overlayContainerElement.textContent).toContain('1st menu item');
  });

  it('should click correct', async () => {
    const fixture = TestBed.createComponent(NzTestDropdownComponent);
    fixture.componentInstance.trigger.set('click');
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toBe('');
    const dropdownElement = fixture.debugElement.query(By.directive(NzDropdownDirective)).nativeElement;
    dispatchFakeEvent(dropdownElement, 'click');
    await stabilize(fixture, 1000);
    expect(overlayContainerElement.textContent).toContain('1st menu item');
  });

  it('should disabled work', async () => {
    const fixture = TestBed.createComponent(NzTestDropdownComponent);
    fixture.componentInstance.disabled.set(true);
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toBe('');
    const dropdownElement = fixture.debugElement.query(By.directive(NzDropdownDirective)).nativeElement;
    dispatchFakeEvent(dropdownElement, 'mouseenter');
    await stabilize(fixture, 1000);
    expect(overlayContainerElement.textContent).toBe('');
  });

  describe('when nzBackdrop=true', () => {
    let fixture: ComponentFixture<NzTestDropdownComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestDropdownComponent);
      fixture.componentInstance.backdrop.set(true);
    });

    it('should disappear if invisible backdrop clicked if nzTrigger=click', async () => {
      fixture.componentInstance.trigger.set('click');
      fixture.detectChanges();

      const dropdownElement = fixture.debugElement.query(By.directive(NzDropdownDirective)).nativeElement;
      dispatchFakeEvent(dropdownElement, 'click');
      await stabilize(fixture, 1000);

      const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
      expect(backdrop).not.toBeNull();

      dispatchFakeEvent(backdrop as Element, 'click');
      await stabilize(fixture, 1000);

      expect(overlayContainerElement.querySelector('.cdk-overlay-backdrop')).toBeNull();
    });
  });

  it('should disappear if Escape pressed', async () => {
    const fixture = TestBed.createComponent(NzTestDropdownComponent);
    fixture.componentInstance.trigger.set('click');
    fixture.componentInstance.backdrop.set(true);
    fixture.detectChanges();

    const dropdownElement = fixture.debugElement.query(By.directive(NzDropdownDirective)).nativeElement;

    dispatchFakeEvent(dropdownElement, 'click');
    await stabilize(fixture, 1000);

    const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
    expect(backdrop).not.toBeNull();

    dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
    await stabilize(fixture, 1000);

    const nullBackdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
    expect(nullBackdrop).toBeNull();
  });

  it('should nzOverlayClassName and nzOverlayStyle work', async () => {
    const fixture = TestBed.createComponent(NzTestDropdownComponent);
    fixture.detectChanges();
    const dropdownElement = fixture.debugElement.query(By.directive(NzDropdownDirective)).nativeElement;
    dispatchFakeEvent(dropdownElement, 'mouseenter');
    await stabilize(fixture, 1000);
    expect(overlayContainerElement.querySelector('.ant-dropdown')!.classList).toContain('custom-class');
    expect(overlayContainerElement.querySelector<HTMLElement>('.ant-dropdown')!.style.color).toBe('rgb(0, 0, 0)');
  });

  it('should nzVisible & nzClickHide work', async () => {
    const fixture = TestBed.createComponent(NzTestDropdownVisibleComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.triggerVisible).toHaveBeenCalledTimes(0);
    const dropdownElement = fixture.debugElement.query(By.directive(NzDropdownDirective)).nativeElement;
    dispatchFakeEvent(dropdownElement, 'mouseenter');
    await stabilize(fixture, 300);
    expect(fixture.componentInstance.triggerVisible).toHaveBeenCalledTimes(1);
    expect(fixture.componentInstance.triggerVisible).toHaveBeenCalledWith(true);
    expect(overlayContainerElement.textContent).toContain('Clicking me will not close the menu.');
    dispatchFakeEvent(overlayContainerElement.querySelector('.first-menu')!, 'click');
    await stabilize(fixture, 300);
    expect(fixture.componentInstance.triggerVisible).toHaveBeenCalledTimes(1);
    expect(fixture.componentInstance.triggerVisible).toHaveBeenCalledWith(true);
    expect(overlayContainerElement.textContent).toContain('Clicking me will not close the menu.');
    dispatchFakeEvent(overlayContainerElement.querySelector('.second-menu')!, 'click');
    await stabilize(fixture, 300);
    expect(fixture.componentInstance.triggerVisible).toHaveBeenCalledTimes(1);
    expect(overlayContainerElement.textContent).toContain('Clicking me will not close the menu.');
    dispatchFakeEvent(overlayContainerElement.querySelector('.close-menu')!, 'click');
    await stabilize(fixture, 500);
    expect(fixture.componentInstance.triggerVisible).toHaveBeenCalledTimes(1);
  });
});

async function stabilize<T>(fixture: ComponentFixture<T>, ms?: number): Promise<void> {
  fixture.detectChanges();
  vi.advanceTimersByTime(ms ?? 0);
  await fixture.whenStable();
  fixture.detectChanges();
}

@Component({
  imports: [NzDropdownModule, NzMenuModule],
  template: `
    <a
      nz-dropdown
      [nzDropdownMenu]="menu"
      [nzTrigger]="trigger()"
      [nzDisabled]="disabled()"
      [nzPlacement]="placement()"
      [nzBackdrop]="backdrop()"
      [nzOverlayClassName]="className()"
      [nzOverlayStyle]="overlayStyle()"
    >
      Trigger
    </a>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item>1st menu item</li>
        <li nz-menu-item>2nd menu item</li>
        <li nz-menu-item>3rd menu item</li>
      </ul>
    </nz-dropdown-menu>
  `
})
export class NzTestDropdownComponent {
  readonly backdrop = signal(false);
  readonly trigger = signal<'click' | 'hover'>('hover');
  readonly placement = signal<NzPlacementType>('bottomLeft');
  readonly disabled = signal(false);
  readonly className = signal('custom-class');
  readonly overlayStyle = signal({ color: '#000' });
}

@Component({
  imports: [NzDropdownModule, NzMenuModule],
  template: `
    <a
      nz-dropdown
      [nzDropdownMenu]="menu"
      [nzClickHide]="false"
      [(nzVisible)]="visible"
      (nzVisibleChange)="triggerVisible($event)"
    >
      Hover me
    </a>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item class="first-menu">Clicking me will not close the menu.</li>
        <li nz-menu-item class="second-menu">Clicking me will not close the menu also.</li>
        <li nz-menu-item (click)="visible.set(false)" class="close-menu">Clicking me will close the menu</li>
      </ul>
    </nz-dropdown-menu>
  `
})
export class NzTestDropdownVisibleComponent {
  readonly visible = signal(false);
  triggerVisible = vi.fn();
}

@Component({
  imports: [NzDropdownModule, NzMenuModule],
  template: `
    <a nz-dropdown [nzDropdownMenu]="menu" [nzArrow]="arrow()" [nzPlacement]="placement()" nzTrigger="hover">
      Trigger
    </a>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item>1st menu item</li>
      </ul>
    </nz-dropdown-menu>
  `
})
export class NzTestDropdownArrowComponent {
  readonly arrow = signal(false);
  readonly placement = signal<NzPlacementType>('bottomLeft');
}
