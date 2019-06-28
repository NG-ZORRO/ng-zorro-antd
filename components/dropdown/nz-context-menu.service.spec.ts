import { OverlayContainer, ScrollDispatcher } from '@angular/cdk/overlay';
import { Component, Provider, Type, ViewChild } from '@angular/core';
import { fakeAsync, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';
import { createMouseEvent } from '../core/testing';
import { NzMenuModule } from '../menu/nz-menu.module';
import { NzContextMenuService } from './nz-context-menu.service';
import { NzDropdownMenuComponent } from './nz-dropdown-menu.component';
import { NzDropDownModule } from './nz-dropdown.module';

describe('context-menu', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  function createComponent<T>(
    component: Type<T>,
    providers: Provider[] = [],
    // tslint:disable-next-line:no-any
    declarations: any[] = []
  ): ComponentFixture<T> {
    TestBed.configureTestingModule({
      imports: [NzDropDownModule, NzMenuModule, NoopAnimationsModule],
      declarations: [component, ...declarations],
      providers
    })
      .compileComponents()
      .then();

    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    })();

    return TestBed.createComponent<T>(component);
  }

  afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
    currentOverlayContainer.ngOnDestroy();
    overlayContainer.ngOnDestroy();
  }));
  it('should create dropdown', fakeAsync(() => {
    const fixture = createComponent(NzTestDropdownContextMenuComponent, [], []);
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toBe('');
    fixture.detectChanges();
    expect(() => {
      const fakeEvent = createMouseEvent('contextmenu', 300, 300);
      const component = fixture.componentInstance;
      component.nzContextMenuService.create(fakeEvent, component.nzDropdownMenuComponent);
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('1st menu item');
    }).not.toThrowError();
  }));
  it('should only one dropdown exist', fakeAsync(() => {
    const fixture = createComponent(NzTestDropdownContextMenuComponent, [], []);
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toBe('');
    fixture.detectChanges();
    expect(() => {
      let fakeEvent = createMouseEvent('contextmenu', 0, 0);
      const component = fixture.componentInstance;
      component.nzContextMenuService.create(fakeEvent, component.nzDropdownMenuComponent);
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('1st menu item');
      fakeEvent = createMouseEvent('contextmenu', window.innerWidth, window.innerHeight);
      component.nzContextMenuService.create(fakeEvent, component.nzDropdownMenuComponent);
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('1st menu item');
    }).not.toThrowError();
  }));
  it('should dropdown close when scroll', fakeAsync(() => {
    const scrolledSubject = new Subject();
    const fixture = createComponent(
      NzTestDropdownContextMenuComponent,
      [{ provide: ScrollDispatcher, useFactory: () => ({ scrolled: () => scrolledSubject }) }],
      []
    );
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toBe('');
    expect(() => {
      const fakeEvent = createMouseEvent('contextmenu', 0, 0);
      const component = fixture.componentInstance;
      component.nzContextMenuService.create(fakeEvent, component.nzDropdownMenuComponent);
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('1st menu item');
      scrolledSubject.next();
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');
    }).not.toThrowError();
  }));
  it('should backdrop work with click', fakeAsync(() => {
    const fixture = createComponent(NzTestDropdownContextMenuComponent, [], []);
    fixture.detectChanges();
    expect(overlayContainerElement.textContent).toBe('');
    fixture.detectChanges();
    expect(() => {
      const fakeEvent = createMouseEvent('contextmenu', 300, 300);
      const component = fixture.componentInstance;
      component.nzContextMenuService.create(fakeEvent, component.nzDropdownMenuComponent);
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toContain('1st menu item');
      document.body.click();
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');
    }).not.toThrowError();
  }));
});

@Component({
  template: `
    <nz-dropdown-menu>
      <ul nz-menu>
        <li nz-menu-item>1st menu item</li>
        <li nz-menu-item>2nd menu item</li>
        <li nz-menu-item>3rd menu item</li>
      </ul>
    </nz-dropdown-menu>
  `
})
export class NzTestDropdownContextMenuComponent {
  @ViewChild(NzDropdownMenuComponent, { static: true }) nzDropdownMenuComponent: NzDropdownMenuComponent;

  constructor(public nzContextMenuService: NzContextMenuService) {}
}
