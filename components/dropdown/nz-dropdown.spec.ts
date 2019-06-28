import { Directionality } from '@angular/cdk/bidi';
import { OverlayContainer } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { async, fakeAsync, flush, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Subject } from 'rxjs';

import { createMouseEvent, dispatchFakeEvent } from 'ng-zorro-antd/core';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';
import { NzMenuModule } from '../menu/nz-menu.module';
import { NzSubMenuComponent } from '../menu/nz-submenu.component';

import { NzDropDownButtonComponent } from './nz-dropdown-button.component';
import { NzDropDownComponent } from './nz-dropdown.component';
import { NzDropDownDirective } from './nz-dropdown.directive';
import { NzDropDownModule } from './nz-dropdown.module';
import { NzDropdownService } from './nz-dropdown.service';

describe('dropdown-deprecated', () => {
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;
  const scrolledSubject = new Subject();
  beforeEach(async(() => {
    const dir = 'ltr';
    TestBed.configureTestingModule({
      imports: [NzMenuModule, NoopAnimationsModule, NzDropDownModule, NoopAnimationsModule, NzIconTestModule],
      declarations: [
        NzTestDropdownComponent,
        NzTestDropdownButtonComponent,
        NzTestDropdownWithButtonComponent,
        NzTestDropdownContextmenuComponent
      ],
      providers: [
        NzDropdownService,
        { provide: Directionality, useFactory: () => ({ value: dir }) },
        { provide: ScrollDispatcher, useFactory: () => ({ scrolled: () => scrolledSubject }) }
      ]
    });

    TestBed.compileComponents();

    inject([OverlayContainer], (oc: OverlayContainer) => {
      overlayContainer = oc;
      overlayContainerElement = oc.getContainerElement();
    })();
  }));

  afterEach(inject([OverlayContainer], (currentOverlayContainer: OverlayContainer) => {
    currentOverlayContainer.ngOnDestroy();
    overlayContainer.ngOnDestroy();
  }));
  describe('nz-dropdown-directive', () => {
    let fixture: ComponentFixture<NzTestDropdownComponent>;
    let testComponent: NzTestDropdownComponent;
    let link: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestDropdownComponent);
      testComponent = fixture.debugElement.componentInstance;
      link = fixture.debugElement.query(By.directive(NzDropDownDirective));
    });

    it('should mouseenter event trigger', fakeAsync(() => {
      const mouseenterCallback = jasmine.createSpy('mouseenter callback');
      testComponent.nzDropDownDirective.hover$.subscribe(mouseenterCallback);
      dispatchFakeEvent(link.nativeElement, 'mouseenter');
      fixture.detectChanges();
      expect(mouseenterCallback).toHaveBeenCalledTimes(1);
    }));

    it('should mouseleave event trigger', fakeAsync(() => {
      const mouseleaveCallback = jasmine.createSpy('mouseleave callback');
      testComponent.nzDropDownDirective.hover$.subscribe(mouseleaveCallback);
      dispatchFakeEvent(link.nativeElement, 'mouseleave');
      fixture.detectChanges();
      expect(mouseleaveCallback).toHaveBeenCalledTimes(1);
    }));

    it('should click event trigger', fakeAsync(() => {
      const clickCallback = jasmine.createSpy('click callback');
      testComponent.nzDropDownDirective.$click.subscribe(clickCallback);
      dispatchFakeEvent(link.nativeElement, 'click');
      fixture.detectChanges();
      expect(clickCallback).toHaveBeenCalledTimes(1);
    }));

    it('should className add in a', () => {
      fixture.detectChanges();
      expect(link.nativeElement.classList.contains('ant-dropdown-link')).toBe(true);
    });

    it('should className not add in button', () => {
      const buttonFixture = TestBed.createComponent(NzTestDropdownWithButtonComponent);
      buttonFixture.detectChanges();
      expect(
        buttonFixture.debugElement
          .query(By.directive(NzDropDownDirective))
          .nativeElement.classList.contains('ant-dropdown-link')
      ).toBe(false);
    });
  });
  describe('nz-dropdown-component', () => {
    let fixture: ComponentFixture<NzTestDropdownComponent>;
    let testComponent: NzTestDropdownComponent;
    let link: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestDropdownComponent);
      testComponent = fixture.debugElement.componentInstance;
      link = fixture.debugElement.query(By.directive(NzDropDownDirective));
    });
    it('should className add', () => {
      fixture.detectChanges();
      expect(link.nativeElement.classList.contains('ant-dropdown-trigger')).toBe(true);
    });
    it('should overlay display', () => {
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');
      testComponent.visible = true;
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).not.toBe('');
    });
    it('should selectable true work', () => {
      testComponent.visible = true;
      fixture.detectChanges();
      let items = overlayContainerElement.querySelectorAll('.ant-dropdown-menu-item') as NodeListOf<HTMLElement>;
      items[0].click();
      testComponent.visible = false;
      fixture.detectChanges();
      testComponent.visible = true;
      fixture.detectChanges();
      items = overlayContainerElement.querySelectorAll('.ant-dropdown-menu-item') as NodeListOf<HTMLElement>;
      expect(items[0].classList.contains('ant-dropdown-menu-item')).toBe(true);
      expect(items[0].classList.contains('ant-dropdown-menu-item-selected')).toBe(true);
    });
    it('should selectable false work', () => {
      testComponent.visible = true;
      testComponent.selectable = false;
      fixture.detectChanges();
      let items = overlayContainerElement.querySelectorAll('.ant-dropdown-menu-item') as NodeListOf<HTMLElement>;
      items[0].click();
      testComponent.visible = false;
      fixture.detectChanges();
      testComponent.visible = true;
      fixture.detectChanges();
      items = overlayContainerElement.querySelectorAll('.ant-dropdown-menu-item') as NodeListOf<HTMLElement>;
      expect(items[0].classList.contains('ant-dropdown-menu-item')).toBe(true);
      expect(items[0].classList.contains('ant-dropdown-menu-item-selected')).toBe(false);
    });
    it('should append the correct className', () => {
      testComponent.visible = true;
      testComponent.itemSelected = true;
      fixture.detectChanges();
      const items = overlayContainerElement.querySelectorAll('.ant-dropdown-menu-item') as NodeListOf<HTMLElement>;
      expect(items[0].classList.contains('.ant-menu-item-selected')).toBe(false);
      expect(items[0].classList.contains('ant-dropdown-menu-item-selected')).toBe(true);
    });
    it('should backdrop work with click', () => {
      testComponent.trigger = 'click';
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');
      testComponent.visible = true;
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).not.toBe('');
      fixture.detectChanges();
      const backdropCallback = jasmine.createSpy('backdrop callback');
      testComponent.nzDropDownComponent.visible$.subscribe(backdropCallback);
      const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;
      backdrop.click();
      fixture.detectChanges();
      expect(backdropCallback).toHaveBeenCalledTimes(1);
    });
    it('should disabled work', () => {
      fixture.detectChanges();
      expect(!!link.nativeElement.attributes.getNamedItem('disabled')).toBe(false);
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(!!link.nativeElement.attributes.getNamedItem('disabled')).toBe(true);
    });
    it('should placement work', () => {
      const placementArray = ['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight'];
      testComponent.visible = true;
      placementArray.forEach(placement => {
        testComponent.placement = placement;
        fixture.detectChanges();
        const dropdown = overlayContainerElement.querySelector('.ant-dropdown') as HTMLElement;
        expect(dropdown.classList.contains(`ant-dropdown-placement-${placement}`)).toBe(true);
      });
    });
    it('should mouseenter event trigger', () => {
      testComponent.visible = true;
      fixture.detectChanges();
      const dropdown = overlayContainerElement.querySelector('.ant-dropdown') as HTMLElement;
      const mouseenterCallback = jasmine.createSpy('mouseenter callback');
      testComponent.nzDropDownComponent.visible$.subscribe(mouseenterCallback);
      dispatchFakeEvent(dropdown, 'mouseenter');
      fixture.detectChanges();
      expect(mouseenterCallback).toHaveBeenCalledWith(true);
      expect(mouseenterCallback).toHaveBeenCalledTimes(1);
    });
    it('should mouseleave event trigger', () => {
      testComponent.visible = true;
      fixture.detectChanges();
      const dropdown = overlayContainerElement.querySelector('.ant-dropdown') as HTMLElement;
      const mouseleaveCallback = jasmine.createSpy('mouseleave callback');
      testComponent.nzDropDownComponent.visible$.subscribe(mouseleaveCallback);
      dispatchFakeEvent(dropdown, 'mouseleave');
      fixture.detectChanges();
      expect(mouseleaveCallback).toHaveBeenCalledWith(false);
      expect(mouseleaveCallback).toHaveBeenCalledTimes(1);
    });
    it('should nzVisibleChange event trigger correct', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.visible = true;
      fixture.detectChanges();
      expect(testComponent.visibleChange).toHaveBeenCalledTimes(0);
      testComponent.visible = false;
      fixture.detectChanges();
      expect(testComponent.visibleChange).toHaveBeenCalledTimes(0);
      // @ts-ignore
      testComponent.nzDropDownComponent.nzMenuDropdownService.menuOpen$.next(true);
      fixture.detectChanges();
      tick(100);
      fixture.detectChanges();
      expect(testComponent.visibleChange).toHaveBeenCalledTimes(1);
      fixture.detectChanges();
      tick(100);
      fixture.detectChanges();
    }));
    it('should submenu event trigger', () => {
      testComponent.visible = true;
      fixture.detectChanges();
      const nestedCallback = jasmine.createSpy('nested callback');
      const submenu = testComponent.nzSubMenuComponent;
      submenu.nzOpen = true;
      submenu.nzSubmenuService.open$.next(false);
      // @ts-ignore
      testComponent.nzDropDownComponent.nzMenuDropdownService.menuOpen$.subscribe(nestedCallback);
      fixture.detectChanges();
      expect(nestedCallback).toHaveBeenCalledWith(false);
      expect(nestedCallback).toHaveBeenCalledTimes(1);
    });
    it('should overlayClassName & overlayStyle work', () => {
      testComponent.visible = true;
      testComponent.overlayClassName = 'testClass';
      testComponent.overlayStyle = { color: 'rgb(1, 2, 3)' };
      fixture.detectChanges();
      const dropdown = overlayContainerElement.querySelector('.ant-dropdown') as HTMLElement;
      expect(dropdown.classList.contains(`testClass`)).toBe(true);
      expect(dropdown.style.color).toBe(`rgb(1, 2, 3)`);
    });
  });
  describe('nz-dropdown-component-button', () => {
    let fixture: ComponentFixture<NzTestDropdownButtonComponent>;
    let testComponent: NzTestDropdownButtonComponent;
    let button: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestDropdownButtonComponent);
      testComponent = fixture.debugElement.componentInstance;
      button = fixture.debugElement.query(By.directive(NzDropDownDirective));
    });
    it('should click left trigger', () => {
      fixture.detectChanges();
      const buttonItem = button.nativeElement.querySelector('.ant-btn');
      expect(!!buttonItem.attributes.getNamedItem('disabled')).toBe(false);
      buttonItem.click();
      fixture.detectChanges();
      expect(testComponent.click).toHaveBeenCalledTimes(1);
    });
    it('should click right trigger', () => {
      fixture.detectChanges();
      const buttonItem = button.nativeElement.querySelector('.ant-dropdown-trigger');
      expect(!!buttonItem.attributes.getNamedItem('disabled')).toBe(false);
      const clickCallback = jasmine.createSpy('click callback');
      testComponent.nzDropDownButtonComponent.visible$.subscribe(clickCallback);
      buttonItem.click();
      fixture.detectChanges();
      expect(testComponent.click).toHaveBeenCalledTimes(0);
      expect(clickCallback).toHaveBeenCalledTimes(1);
      expect(clickCallback).toHaveBeenCalledWith(true);
    });
    it('should icon work', () => {
      fixture.detectChanges();
      const rightIcon = button.nativeElement.querySelector('.ant-dropdown-trigger i') as HTMLElement;
      expect(rightIcon.classList).toContain('anticon-down');
      testComponent.strIcon = false;
      fixture.detectChanges();
      const rightButton = button.nativeElement.querySelector('.ant-dropdown-trigger') as HTMLButtonElement;
      expect(rightButton.textContent).toContain('Expand');
    });
    it('should disabled work', () => {
      testComponent.disabled = true;
      fixture.detectChanges();
      const buttonItem = button.nativeElement.querySelector('.ant-btn');
      expect(!!buttonItem.attributes.getNamedItem('disabled')).toBe(true);
      const clickCallback = jasmine.createSpy('click callback');
      testComponent.nzDropDownButtonComponent.visible$.subscribe(clickCallback);
      buttonItem.click();
      fixture.detectChanges();
      expect(testComponent.click).toHaveBeenCalledTimes(0);
      expect(clickCallback).toHaveBeenCalledTimes(0);
      // @ts-ignore
      testComponent.nzDropDownButtonComponent.nzMenuDropdownService.menuOpen$.next(true);
      fixture.detectChanges();
      expect(testComponent.visibleChange).toHaveBeenCalledTimes(0);
    });
    it('should nzVisibleChange event trigger correct', fakeAsync(() => {
      fixture.detectChanges();
      testComponent.visible = true;
      fixture.detectChanges();
      expect(testComponent.visibleChange).toHaveBeenCalledTimes(0);
      testComponent.visible = false;
      fixture.detectChanges();
      expect(testComponent.visibleChange).toHaveBeenCalledTimes(0);
      // @ts-ignore
      testComponent.nzDropDownButtonComponent.nzMenuDropdownService.menuOpen$.next(true);
      fixture.detectChanges();
      tick(100);
      fixture.detectChanges();
      flush();
      expect(testComponent.visibleChange).toHaveBeenCalledTimes(1);
    }));
    it('should placement work', () => {
      const placementArray = ['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight'];
      testComponent.visible = true;
      placementArray.forEach(placement => {
        testComponent.placement = placement;
        fixture.detectChanges();
        const dropdown = overlayContainerElement.querySelector('.ant-dropdown') as HTMLElement;
        expect(dropdown.classList.contains(`ant-dropdown-placement-${placement}`)).toBe(true);
      });
    });
    it('should submenu event trigger', () => {
      testComponent.visible = true;
      fixture.detectChanges();
      const nestedCallback = jasmine.createSpy('nested callback');
      const submenu = testComponent.nzSubMenuComponent;
      submenu.nzOpen = true;
      submenu.nzSubmenuService.open$.next(false);
      // @ts-ignore
      testComponent.nzDropDownButtonComponent.nzMenuDropdownService.menuOpen$.subscribe(nestedCallback);
      fixture.detectChanges();
      expect(nestedCallback).toHaveBeenCalledWith(false);
      expect(nestedCallback).toHaveBeenCalledTimes(1);
    });
  });
  describe('nz-dropdown-service', () => {
    let fixture: ComponentFixture<NzTestDropdownContextmenuComponent>;
    let testComponent: NzTestDropdownContextmenuComponent;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestDropdownContextmenuComponent);
      testComponent = fixture.debugElement.componentInstance;
    });
    it('should create dropdown', () => {
      const fakeEvent = createMouseEvent('contextmenu', 300, 300);
      testComponent.nzDropdownService.create(fakeEvent, testComponent.template);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).not.toBe('');
      // https://github.com/angular/material2/pull/12119
      // TODO: fix
      // expect(window.getComputedStyle(overlayPane, null).top).toBe(`${300 - overlayContainerElement.getBoundingClientRect().top}px`);
      testComponent.nzDropdownService.dispose();
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');
    });
    it('should only one dropdown exist', () => {
      let fakeEvent = createMouseEvent('contextmenu', 0, 0);
      testComponent.nzDropdownService.create(fakeEvent, testComponent.template);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).not.toBe('');
      fakeEvent = createMouseEvent('contextmenu', window.innerWidth, window.innerHeight);
      testComponent.nzDropdownService.create(fakeEvent, testComponent.template);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');
    });
    it('should dropdown close when scroll', () => {
      const fakeEvent = createMouseEvent('contextmenu', 500, 500);
      testComponent.nzDropdownService.create(fakeEvent, testComponent.template);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).not.toBe('');
      scrolledSubject.next();
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');
    });
    it('should animation work', () => {
      const fakeEvent = createMouseEvent('contextmenu', 500, 500);
      const contextComponent = testComponent.nzDropdownService.create(fakeEvent, testComponent.template);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).not.toBe('');
      contextComponent.close();
      contextComponent.afterAnimation();
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');
    });
    it('should backdrop work with click', fakeAsync(() => {
      const fakeEvent = createMouseEvent('contextmenu', 100, 100);
      testComponent.nzDropdownService.create(fakeEvent, testComponent.template);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).not.toBe('');
      document.body.click();
      tick(500);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');
    }));
    it('should change contextmenu after create', fakeAsync(() => {
      const fakeEvent = createMouseEvent('contextmenu', 100, 100);
      testComponent.nzDropdownService.create(fakeEvent, testComponent.template);
      fixture.detectChanges();
      tick(500);
      fixture.detectChanges();
      const fakeContextEvent = createMouseEvent('contextmenu', 200, 200);
      testComponent.nzDropdownService.create(fakeContextEvent, testComponent.template);
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      // @ts-ignore
      const overlayElement = testComponent.nzDropdownService.overlayRef.overlayElement;
      expect(overlayElement.textContent).not.toBe('');
    }));
  });
});

@Component({
  template: `
    <nz-dropdown
      [(nzVisible)]="visible"
      [nzClickHide]="clickHide"
      [nzPlacement]="placement"
      (nzVisibleChange)="visibleChange($event)"
      [nzTrigger]="trigger"
      [nzDisabled]="disabled"
      [nzOverlayClassName]="overlayClassName"
      [nzOverlayStyle]="overlayStyle"
    >
      <a nz-dropdown> Hover me <i nz-icon nzType="down"></i> </a>
      <ul nz-menu [nzSelectable]="selectable">
        <li nz-menu-item [nzSelected]="itemSelected">
          <a>1st menu item</a>
        </li>
        <li nz-menu-item>
          <a>2nd menu item</a>
        </li>
        <li nz-submenu>
          <span title>sub menu</span>
          <ul>
            <li nz-menu-item>3rd menu item</li>
            <li nz-menu-item>4th menu item</li>
          </ul>
        </li>
      </ul>
    </nz-dropdown>
  `
})
export class NzTestDropdownComponent {
  @ViewChild(NzDropDownComponent, { static: false }) nzDropDownComponent: NzDropDownComponent;
  @ViewChild(NzDropDownDirective, { static: true }) nzDropDownDirective: NzDropDownDirective;
  @ViewChild(NzSubMenuComponent, { static: false }) nzSubMenuComponent: NzSubMenuComponent;
  visible = false;
  selectable = true;
  itemSelected = false;
  trigger = 'hover';
  placement = 'bottomLeft';
  disabled = false;
  clickHide = true;
  visibleChange = jasmine.createSpy('visibleChange callback');
  overlayClassName = '';
  overlayStyle = {};
}

@Component({
  template: `
    <nz-dropdown-button
      (nzClick)="click($event)"
      [nzVisible]="visible"
      [nzPlacement]="placement"
      [nzDisabled]="disabled"
      [nzTrigger]="'click'"
      [nzIcon]="strIcon ? 'down' : iconTemp"
      (nzVisibleChange)="visibleChange($event)"
    >
      DropDown
      <ul nz-menu>
        <li nz-menu-item>1st menu item</li>
        <li nz-menu-item>2nd menu item</li>
        <li nz-submenu>
          <span title>sub menu</span>
          <ul>
            <li nz-menu-item>3rd menu item</li>
            <li nz-menu-item>4th menu item</li>
          </ul>
        </li>
      </ul>
    </nz-dropdown-button>
    <ng-template #iconTemp>Expand</ng-template>
  `
})
export class NzTestDropdownButtonComponent {
  @ViewChild(NzDropDownButtonComponent, { static: false }) nzDropDownButtonComponent: NzDropDownButtonComponent;
  @ViewChild(NzSubMenuComponent, { static: false }) nzSubMenuComponent: NzSubMenuComponent;
  strIcon = true;
  disabled = false;
  visible = false;
  placement = 'bottomLeft';

  click = jasmine.createSpy('click callback');
  visibleChange = jasmine.createSpy('visibleChange callback');
}

@Component({
  template: `
    <nz-dropdown>
      <button nz-button nz-dropdown><span>Button</span> <i nz-icon nzType="down"></i></button>
      <ul nz-menu>
        <li nz-menu-item>
          <a>1st menu item</a>
        </li>
        <li nz-menu-item>
          <a>2nd menu item</a>
        </li>
        <li nz-menu-item>
          <a>3rd menu item</a>
        </li>
      </ul>
    </nz-dropdown>
  `
})
export class NzTestDropdownWithButtonComponent {}

@Component({
  template: `
    <ng-template #template>
      <ul nz-menu nzInDropDown>
        <li nz-menu-item>1st menu item</li>
        <li nz-menu-item>2nd menu item</li>
        <li nz-menu-item nzDisabled>disabled menu item</li>
        <li nz-submenu>
          <span title>sub menu</span>
          <ul>
            <li nz-menu-item>3rd menu item</li>
            <li nz-menu-item>4th menu item</li>
          </ul>
        </li>
        <li nz-submenu nzDisabled>
          <span title>disabled sub menu</span>
          <ul>
            <li nz-menu-item>3rd menu item</li>
            <li nz-menu-item>4th menu item</li>
          </ul>
        </li>
      </ul>
    </ng-template>
  `
})
export class NzTestDropdownContextmenuComponent {
  @ViewChild('template', { static: true }) template: TemplateRef<void>;

  constructor(public nzDropdownService: NzDropdownService) {}
}
