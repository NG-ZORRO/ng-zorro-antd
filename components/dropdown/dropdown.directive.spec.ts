/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, signal } from '@angular/core';
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { dispatchFakeEvent, dispatchKeyboardEvent, updateNonSignalsInput } from 'ng-zorro-antd/core/testing';
import { NzMenuModule } from 'ng-zorro-antd/menu';

import { NzPlacementType } from './dropdown-menu.component';
import { NzDropdownDirective } from './dropdown.directive';
import { NzDropdownModule } from './dropdown.module';

describe('dropdown', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations()]
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

  // TODO: why this works well with ChromeHeadless but fails with ChromeHeadlessCI?
  xdescribe('placement and arrow', () => {
    let fixture: ComponentFixture<NzTestDropdownArrowComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestDropdownArrowComponent);
      fixture.componentInstance.arrow = true;
    });

    it('should render arrow when nzArrow is true and apply placement classes', async () => {
      fixture.componentInstance.placement = 'bottomLeft';
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
      fixture.componentInstance.placement = 'topRight';
      await stabilize(fixture);
      expect(dropdown.classList.contains('ant-dropdown-placement-topRight')).toBeTrue();
    });

    it('should map center placements to top/bottom classes', async () => {
      fixture.componentInstance.placement = 'bottomCenter';
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
      fixture.componentInstance.placement = 'topCenter';
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
    fixture.componentInstance.trigger = 'hover';
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toBe('');
    const dropdownElement = fixture.debugElement.query(By.directive(NzDropdownDirective)).nativeElement;
    dispatchFakeEvent(dropdownElement, 'mouseenter');
    await stabilize(fixture, 1000);
    expect(overlayContainerElement.textContent).toContain('1st menu item');
  });

  it('should click correct', async () => {
    const fixture = TestBed.createComponent(NzTestDropdownComponent);
    fixture.componentInstance.trigger = 'click';
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toBe('');
    const dropdownElement = fixture.debugElement.query(By.directive(NzDropdownDirective)).nativeElement;
    dispatchFakeEvent(dropdownElement, 'click');
    await stabilize(fixture, 1000);
    expect(overlayContainerElement.textContent).toContain('1st menu item');
  });

  it('should disabled work', async () => {
    const fixture = TestBed.createComponent(NzTestDropdownComponent);
    fixture.componentInstance.disabled = true;
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
      fixture.componentInstance.backdrop = true;
    });

    it('should disappear if invisible backdrop clicked if nzTrigger=click', async () => {
      fixture.componentInstance.trigger = 'click';
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
    fixture.componentInstance.trigger = 'click';
    fixture.componentInstance.backdrop = true;
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
  await updateNonSignalsInput(fixture, ms);
  fixture.detectChanges();
}

@Component({
  imports: [NzDropdownModule, NzMenuModule],
  template: `
    <a
      nz-dropdown
      [nzDropdownMenu]="menu"
      [nzTrigger]="triggerSignal()"
      [nzDisabled]="disabledSignal()"
      [nzPlacement]="placementSignal()"
      [nzBackdrop]="backdropSignal()"
      [nzOverlayClassName]="classNameSignal()"
      [nzOverlayStyle]="overlayStyleSignal()"
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
  readonly backdropSignal = signal(false);
  readonly triggerSignal = signal<'click' | 'hover'>('hover');
  readonly placementSignal = signal<NzPlacementType>('bottomLeft');
  readonly disabledSignal = signal(false);
  readonly classNameSignal = signal('custom-class');
  readonly overlayStyleSignal = signal({ color: '#000' });

  get backdrop(): boolean {
    return this.backdropSignal();
  }

  set backdrop(value: boolean) {
    this.backdropSignal.set(value);
  }

  get trigger(): 'click' | 'hover' {
    return this.triggerSignal();
  }

  set trigger(value: 'click' | 'hover') {
    this.triggerSignal.set(value);
  }

  get placement(): NzPlacementType {
    return this.placementSignal();
  }

  set placement(value: NzPlacementType) {
    this.placementSignal.set(value);
  }

  get disabled(): boolean {
    return this.disabledSignal();
  }

  set disabled(value: boolean) {
    this.disabledSignal.set(value);
  }

  get className(): string {
    return this.classNameSignal();
  }

  set className(value: string) {
    this.classNameSignal.set(value);
  }

  get overlayStyle(): { color: string } {
    return this.overlayStyleSignal();
  }

  set overlayStyle(value: { color: string }) {
    this.overlayStyleSignal.set(value);
  }
}

@Component({
  imports: [NzDropdownModule, NzMenuModule],
  template: `
    <a
      nz-dropdown
      [nzDropdownMenu]="menu"
      [nzClickHide]="false"
      [nzVisible]="visibleSignal()"
      (nzVisibleChange)="visible = $event; triggerVisible($event)"
    >
      Hover me
    </a>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item class="first-menu">Clicking me will not close the menu.</li>
        <li nz-menu-item class="second-menu">Clicking me will not close the menu also.</li>
        <li nz-menu-item (click)="visible = false" class="close-menu">Clicking me will close the menu</li>
      </ul>
    </nz-dropdown-menu>
  `
})
export class NzTestDropdownVisibleComponent {
  readonly visibleSignal = signal(false);
  triggerVisible = jasmine.createSpy('visibleChange');

  get visible(): boolean {
    return this.visibleSignal();
  }

  set visible(value: boolean) {
    this.visibleSignal.set(value);
  }
}

@Component({
  imports: [NzDropdownModule, NzMenuModule],
  template: `
    <a
      nz-dropdown
      [nzDropdownMenu]="menu"
      [nzArrow]="arrowSignal()"
      [nzPlacement]="placementSignal()"
      nzTrigger="hover"
    >
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
  readonly arrowSignal = signal(false);
  readonly placementSignal = signal<NzPlacementType>('bottomLeft');

  get arrow(): boolean {
    return this.arrowSignal();
  }

  set arrow(value: boolean) {
    this.arrowSignal.set(value);
  }

  get placement(): NzPlacementType {
    return this.placementSignal();
  }

  set placement(value: NzPlacementType) {
    this.placementSignal.set(value);
  }
}
