/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

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

    it('should render arrow when nzArrow is true and apply placement classes', fakeAsync(() => {
      fixture.componentInstance.placement = 'bottomLeft';
      fixture.detectChanges();
      const dropdownElement = fixture.debugElement.query(By.directive(NzDropdownDirective)).nativeElement;
      dispatchFakeEvent(dropdownElement, 'mouseenter');
      tick(1000);
      fixture.detectChanges();
      const dropdown = overlayContainerElement.querySelector('.ant-dropdown') as HTMLElement;
      expect(dropdown).not.toBeNull();
      expect(dropdown.classList).toContain('ant-dropdown-show-arrow');
      expect(dropdown.classList).toContain('ant-dropdown-placement-bottomLeft');
      expect(dropdown.querySelector('.ant-dropdown-arrow')).not.toBeNull();

      // Change placement while open should update placement class
      fixture.componentInstance.placement = 'topRight';
      fixture.detectChanges();
      tick(0);
      fixture.detectChanges();
      expect(dropdown.classList.contains('ant-dropdown-placement-topRight')).toBeTrue();
    }));

    it('should map center placements to top/bottom classes', fakeAsync(() => {
      fixture.componentInstance.placement = 'bottomCenter';
      fixture.detectChanges();
      const dropdownElement = fixture.debugElement.query(By.directive(NzDropdownDirective)).nativeElement;
      dispatchFakeEvent(dropdownElement, 'mouseenter');
      tick(1000);
      fixture.detectChanges();
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
      fixture.detectChanges();
      tick(0);
      fixture.detectChanges();
      const isTopFamily =
        dropdown.classList.contains('ant-dropdown-placement-top') ||
        dropdown.classList.contains('ant-dropdown-placement-topLeft') ||
        dropdown.classList.contains('ant-dropdown-placement-topRight');
      expect(isTopFamily).toBeTrue();
    }));
  });

  it('should hover correct', fakeAsync(() => {
    const fixture = TestBed.createComponent(NzTestDropdownComponent);
    fixture.componentInstance.trigger = 'hover';
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toBe('');
    expect(() => {
      const dropdownElement = fixture.debugElement.query(By.directive(NzDropdownDirective)).nativeElement;
      dispatchFakeEvent(dropdownElement, 'mouseenter');
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('1st menu item');
    }).not.toThrowError();
  }));

  it('should click correct', fakeAsync(() => {
    const fixture = TestBed.createComponent(NzTestDropdownComponent);
    fixture.componentInstance.trigger = 'click';
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toBe('');
    expect(() => {
      const dropdownElement = fixture.debugElement.query(By.directive(NzDropdownDirective)).nativeElement;
      dispatchFakeEvent(dropdownElement, 'click');
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('1st menu item');
    }).not.toThrowError();
  }));

  it('should disabled work', fakeAsync(() => {
    const fixture = TestBed.createComponent(NzTestDropdownComponent);
    fixture.componentInstance.disabled = true;
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toBe('');
    expect(() => {
      const dropdownElement = fixture.debugElement.query(By.directive(NzDropdownDirective)).nativeElement;
      dispatchFakeEvent(dropdownElement, 'mouseenter');
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');
    }).not.toThrowError();
  }));

  describe('when nzBackdrop=true', () => {
    let fixture: ComponentFixture<NzTestDropdownComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestDropdownComponent);
      fixture.componentInstance.backdrop = true;
    });

    it('should disappear if invisible backdrop clicked if nzTrigger=click', fakeAsync(() => {
      fixture.componentInstance.trigger = 'click';
      fixture.detectChanges();

      expect(() => {
        const dropdownElement = fixture.debugElement.query(By.directive(NzDropdownDirective)).nativeElement;
        dispatchFakeEvent(dropdownElement, 'click');

        tick(1000);
        fixture.detectChanges();

        const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
        expect(backdrop).not.toBeNull();

        dispatchFakeEvent(backdrop as Element, 'click');
        tick(1000);
        fixture.detectChanges();

        expect(overlayContainerElement.querySelector('.cdk-overlay-backdrop')).toBeNull();
      }).not.toThrowError();
    }));
  });

  it('should disappear if Escape pressed', fakeAsync(() => {
    const fixture = TestBed.createComponent(NzTestDropdownComponent);
    fixture.componentInstance.trigger = 'click';
    fixture.componentInstance.backdrop = true;
    fixture.detectChanges();

    expect(() => {
      const dropdownElement = fixture.debugElement.query(By.directive(NzDropdownDirective)).nativeElement;

      dispatchFakeEvent(dropdownElement, 'click');
      tick(1000);
      fixture.detectChanges();

      const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
      expect(backdrop).not.toBeNull();

      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
      tick(1000);
      fixture.detectChanges();

      const nullBackdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop');
      expect(nullBackdrop).toBeNull();
    }).not.toThrowError();
  }));

  it('should nzOverlayClassName and nzOverlayStyle work', fakeAsync(() => {
    const fixture = TestBed.createComponent(NzTestDropdownComponent);
    fixture.detectChanges();
    expect(() => {
      const dropdownElement = fixture.debugElement.query(By.directive(NzDropdownDirective)).nativeElement;
      dispatchFakeEvent(dropdownElement, 'mouseenter');
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-dropdown')!.classList).toContain('custom-class');
      expect(overlayContainerElement.querySelector<HTMLElement>('.ant-dropdown')!.style.color).toBe('rgb(0, 0, 0)');
    }).not.toThrowError();
  }));

  it('should nzVisible & nzClickHide work', fakeAsync(() => {
    const fixture = TestBed.createComponent(NzTestDropdownVisibleComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.triggerVisible).toHaveBeenCalledTimes(0);
    const dropdownElement = fixture.debugElement.query(By.directive(NzDropdownDirective)).nativeElement;
    dispatchFakeEvent(dropdownElement, 'mouseenter');
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();
    expect(fixture.componentInstance.triggerVisible).toHaveBeenCalledTimes(1);
    expect(fixture.componentInstance.triggerVisible).toHaveBeenCalledWith(true);
    expect(overlayContainerElement.textContent).toContain('Clicking me will not close the menu.');
    dispatchFakeEvent(overlayContainerElement.querySelector('.first-menu')!, 'click');
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();
    expect(fixture.componentInstance.triggerVisible).toHaveBeenCalledTimes(1);
    expect(fixture.componentInstance.triggerVisible).toHaveBeenCalledWith(true);
    expect(overlayContainerElement.textContent).toContain('Clicking me will not close the menu.');
    dispatchFakeEvent(overlayContainerElement.querySelector('.second-menu')!, 'click');
    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();
    expect(fixture.componentInstance.triggerVisible).toHaveBeenCalledTimes(1);
    expect(overlayContainerElement.textContent).toContain('Clicking me will not close the menu.');
    dispatchFakeEvent(overlayContainerElement.querySelector('.close-menu')!, 'click');
    fixture.detectChanges();
    tick(2000);
    fixture.detectChanges();
    expect(fixture.componentInstance.triggerVisible).toHaveBeenCalledTimes(1);
  }));
});

@Component({
  imports: [NzDropdownModule, NzMenuModule],
  template: `
    <a
      nz-dropdown
      [nzDropdownMenu]="menu"
      [nzTrigger]="trigger"
      [nzDisabled]="disabled"
      [nzPlacement]="placement"
      [nzBackdrop]="backdrop"
      [nzOverlayClassName]="className"
      [nzOverlayStyle]="overlayStyle"
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
  backdrop = false;
  trigger: 'click' | 'hover' = 'hover';
  placement: NzPlacementType = 'bottomLeft';
  disabled = false;
  className = 'custom-class';
  overlayStyle = { color: '#000' };
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
        <li nz-menu-item (click)="visible = false" class="close-menu">Clicking me will close the menu</li>
      </ul>
    </nz-dropdown-menu>
  `
})
export class NzTestDropdownVisibleComponent {
  visible = false;
  triggerVisible = jasmine.createSpy('visibleChange');
}

@Component({
  imports: [NzDropdownModule, NzMenuModule],
  template: `
    <a nz-dropdown [nzDropdownMenu]="menu" [nzArrow]="arrow" [nzPlacement]="placement" nzTrigger="hover"> Trigger </a>
    <nz-dropdown-menu #menu="nzDropdownMenu">
      <ul nz-menu>
        <li nz-menu-item>1st menu item</li>
      </ul>
    </nz-dropdown-menu>
  `
})
export class NzTestDropdownArrowComponent {
  arrow = false;
  placement: NzPlacementType = 'bottomLeft';
}
