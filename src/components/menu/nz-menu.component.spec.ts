/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed, ComponentFixtureAutoDetect} from '@angular/core/testing';
import {
  Component,
  ViewChild
} from '@angular/core';
import {By} from '@angular/platform-browser';
import {NzMenuModule} from './nz-menu.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NzMenuDividerComponent} from './nz-menu-divider.component';
import {NzMenuGroupComponent} from './nz-menu-group.component';
import {NzMenuItemComponent} from './nz-menu-item.component';
import {NzMenuComponent} from './nz-menu.component';
import {NzSubMenuComponent} from './nz-submenu.component';
// import {OverlayContainer} from '../core/overlay/overlay-container';

describe('NzMenuComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NzMenuModule, BrowserAnimationsModule],
      declarations: [TestMenu, TestMenuTheme, TestMenuSubMenu],
      providers: []
    }).compileComponents();
  }));
  describe('for nz-menu', () => {
    it('should apply class based on nzMode attribute', () => {
      const fixture = TestBed.createComponent(TestMenu);
      const testComponent = fixture.debugElement.componentInstance;
      const debugElement = fixture.debugElement.query(By.directive(NzMenuComponent));

      testComponent._mode = 'vertical';
      fixture.detectChanges();
      expect(debugElement.nativeElement.classList.contains('ant-menu')).toBe(true);
      expect(debugElement.nativeElement.classList.contains('ant-menu-root')).toBe(true);
      expect(debugElement.nativeElement.classList.contains('ant-menu-vertical')).toBe(true);

      testComponent._mode = 'horizontal';
      fixture.detectChanges();
      expect(debugElement.nativeElement.classList.contains('ant-menu-horizontal')).toBe(true);

      testComponent._mode = 'inline';
      fixture.detectChanges();
      expect(debugElement.nativeElement.classList.contains('ant-menu-inline')).toBe(true);

      testComponent._mode = '';
      fixture.detectChanges();
      expect(debugElement.nativeElement.classList.contains('ant-menu-vertical')).toBe(false);

      testComponent._mode = 'custom_string';
      fixture.detectChanges();
      expect(debugElement.nativeElement.classList.contains('ant-menu-custom_string')).toBe(false);
    })
    it('should apply class based on nzTheme attribute', () => {
      const fixture = TestBed.createComponent(TestMenuTheme);
      const testComponent = fixture.debugElement.componentInstance;
      const debugElement = fixture.debugElement.query(By.directive(NzMenuComponent));

      testComponent._theme = 'light';
      fixture.detectChanges();
      expect(debugElement.nativeElement.classList.contains('ant-menu-light')).toBe(true);

      testComponent._theme = 'dark';
      fixture.detectChanges();
      expect(debugElement.nativeElement.classList.contains('ant-menu-dark')).toBe(true);

      testComponent._theme = '';
      fixture.detectChanges();
      expect(debugElement.nativeElement.classList.contains('ant-menu-light')).toBe(false);
      expect(debugElement.nativeElement.classList.contains('ant-menu-dark')).toBe(false);

      testComponent._theme = 'blue';
      fixture.detectChanges();
      expect(debugElement.nativeElement.classList.contains('ant-menu-blue')).toBe(false);
    })
    it('nz-menu-item should apply class "ant-menu-item-selected" when nzClickActive=true', () => {
      const fixture = TestBed.createComponent(TestMenuTheme);
      const testComponent = fixture.debugElement.componentInstance;
      const debugElement2 = fixture.debugElement.query(By.directive(NzSubMenuComponent));
      testComponent._mode = 'inline';

      testComponent._clickActive = true;
      debugElement2.nativeElement.click();
      fixture.detectChanges();
      const debugElementItem1 = fixture.debugElement.query(By.directive(NzMenuItemComponent));
      debugElementItem1.nativeElement.click();
      fixture.detectChanges();
      expect(debugElementItem1.nativeElement.classList.contains('ant-menu-item-selected')).toBe(true);
    })
    it('nz-menu-item should not apply class "ant-menu-item-selected" when nzClickActive=false', () => {
      const fixture = TestBed.createComponent(TestMenuTheme);
      const testComponent = fixture.debugElement.componentInstance;
      const debugElement = fixture.debugElement.query(By.directive(NzSubMenuComponent));
      testComponent._mode = 'inline';
      testComponent._clickActive = false;
      debugElement.nativeElement.click();
      fixture.detectChanges();
      const debugElementItem2 = fixture.debugElement.query(By.directive(NzMenuItemComponent));
      debugElementItem2.nativeElement.click();
      fixture.detectChanges();
      expect(debugElementItem2.nativeElement.classList.contains('ant-menu-item-selected')).toBe(false);
    })
    it('should should not clear previous defined classes', () => {
      const fixture = TestBed.createComponent(TestMenu);
      const testComponent = fixture.debugElement.componentInstance;
      const debugElement = fixture.debugElement.query(By.directive(NzMenuComponent));

      debugElement.nativeElement.classList.add('custom-class');

      testComponent._nzMode = 'vertical';
      testComponent._customClass = {customClass1: true};
      fixture.detectChanges();
      expect(debugElement.nativeElement.classList.contains('custom-class')).toBe(true);
      expect(debugElement.nativeElement.classList.contains('customClass1')).toBe(true);
    })

    // it('should close the menu when a click occurs outside the menu', () => {
    //   const fixture = TestBed.createComponent(TestMenuOther);
    //   const testComponent = fixture.debugElement.componentInstance;
    //   const debugElement = fixture.debugElement.query(By.directive(NzSubMenuComponent));
    //   testComponent._mode = 'inline';
    //   debugElement.nativeElement.click();
    //   fixture.detectChanges();
    //   const debugElementItem2 = fixture.debugElement.query(By.directive(NzMenuItemComponent));
    //   document.body.click();
    //   fixture.detectChanges();
    //   expect(debugElementItem2.nativeElement.classList.contains('ant-menu-item')).toBe(true);
    // })
    //
    // it('should close the menu when a click occurs outside the menu', () => {
    //   const fixture = TestBed.createComponent(TestMenuOther);
    //   const testComponent = fixture.debugElement.componentInstance;
    //   const debugElement = fixture.debugElement.query(By.directive(NzSubMenuComponent));
    //   const overlayContainerElement = document.createElement('div');
    //   overlayContainerElement.classList.add('cdk-overlay-container');
    //   document.body.appendChild(overlayContainerElement);
    //
    //   testComponent._mode = 'vertical';
    //   debugElement.nativeElement.focus();
    //   fixture.detectChanges();
    //   const debugElementItem2 = fixture.debugElement.query(By.directive(NzMenuItemComponent));
    //
    //   overlayContainerElement.focus();
    //
    //   fixture.detectChanges();
    //   expect(debugElementItem2.nativeElement.classList.contains('ant-menu-item')).toBe(false);
    // })
  });
  describe('for nz-submenu', () => {
    it('should apply class based on nzOpen attribute', () => {
      const fixture = TestBed.createComponent(TestMenuSubMenu);
      const testComponent = fixture.debugElement.componentInstance;
      const debugElement = fixture.debugElement.query(By.directive(NzSubMenuComponent));
      expect(debugElement).toBeDefined();

      testComponent._mode = 'inline';
      testComponent.isOpenOne = true;
      testComponent.isTestOpen = true;
      fixture.detectChanges();
      const debugElement2 = fixture.debugElement.query(By.directive(NzSubMenuComponent));
      expect(debugElement2.nativeElement.classList.contains('ant-menu-submenu-open')).toBe(true);

      testComponent._mode = 'vertical';
      testComponent.isOpenOne = true;
      testComponent.isTestOpen = true;
      fixture.detectChanges();
      const debugElement1 = fixture.debugElement.query(By.directive(NzSubMenuComponent));
      expect(debugElement1.nativeElement.classList.contains('ant-menu-submenu-open')).toBe(false);
      testComponent.isOpenOne = true;
      fixture.detectChanges();
      const debugElement1_1 = fixture.debugElement.query(By.directive(NzSubMenuComponent));
      expect(debugElement1_1.nativeElement.classList.contains('ant-menu-submenu-open')).toBe(true);

      testComponent._mode = 'vertical';
      testComponent.isOpenOne = false;
      fixture.detectChanges();
      const debugElement3 = fixture.debugElement.query(By.directive(NzSubMenuComponent));
      expect(debugElement3.nativeElement.classList.contains('ant-menu-submenu-open')).toBe(false);

      // testComponent._mode = 'vertical';
      // testComponent.isTestOpen = false;
      // testComponent.openChange('one');
      // fixture.detectChanges();
      // const debugElement4 = fixture.debugElement.query(By.directive(NzSubMenuComponent));
      // expect(debugElement4.nativeElement.classList.contains('ant-menu-submenu-open')).toBe(true);

      // testComponent.openChange('two');
      // fixture.detectChanges();
      // const debugElement4 = fixture.debugElement.query(By.directive(NzSubMenuComponent));
      // expect(debugElement4.nativeElement.classList.contains('ant-menu-submenu-open')).toBe(true);
    })

    it('should apply class based on sub-items select state', () => {
      const fixture = TestBed.createComponent(TestMenuSubMenu);
      const testComponent = fixture.debugElement.componentInstance;
      const debugElement = fixture.debugElement.query(By.directive(NzSubMenuComponent));
      expect(debugElement).toBeDefined();

      testComponent._mode = 'vertical';
      testComponent.selectOne = false;
      fixture.detectChanges();
      const debugElement1 = fixture.debugElement.query(By.directive(NzSubMenuComponent));
      expect(debugElement1.nativeElement.classList.contains('ant-menu-submenu-selected')).toBe(false);

      testComponent._mode = 'vertical';
      testComponent.selectOne = true;
      fixture.detectChanges();
      const debugElement2 = fixture.debugElement.query(By.directive(NzSubMenuComponent));
      expect(debugElement2.nativeElement.classList.contains('ant-menu-submenu-selected')).toBe(true);

    })
  });
});

@Component({
  selector: 'test-menu',
  template: `
    <ul nz-menu [nzMode]="_mode" [ngClass]="_customClass">
      <li nz-menu-item><i class="anticon anticon-mail"></i> Navigation One</li>
      <li nz-menu-item><a href="https://ant.design" target="_blank" rel="noopener noreferrer">Navigation Four - Link</a>
      </li>
    </ul>
  `
})
class TestMenu {
  _mode = 'vertical';
  _customClass = {customClass1: false};
}
@Component({
  selector: 'test-menu-theme',
  template: `
    <ul nz-menu [nzMode]="_mode" style="width: 240px;" [nzTheme]="_theme" [nzClickActive]="_clickActive">
      <li nz-submenu [nzOpen]="_open">
        <span title><i class="anticon anticon-mail"></i> Navigation One</span>
        <ul>
          <li nz-menu-group>
            <span title>Item 1</span>
            <ul>
              <li nz-menu-item>Option 1</li>
              <li nz-menu-item>Option 2</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  `
})
class TestMenuTheme {
  _mode = 'vertical';
  _theme = 'dark';
  _clickActive = true;
  _open = true;
}

@Component({
  selector: 'test-submenu',
  template: `
    <ul nz-menu [nzMode]="_mode" style="width: 240px;">
      <li nz-submenu [(nzOpen)]="isOpenOne" (nzOpenChange)="openChange('one')">
        <span title><i class="anticon anticon-mail"></i> Navigation One</span>
        <ul>
          <li nz-menu-item [nzSelected]="selectOne">Option 1</li>
        </ul>
      </li>
      <li nz-submenu [(nzOpen)]="isOpenTwo" (nzOpenChange)="openChange('Two')">
        <span title><i class="anticon anticon-setting"></i> Navigation Two</span>
        <ul>
          <li nz-menu-item>Option 2</li>
        </ul>
      </li>
    </ul>
  `
})
class TestMenuSubMenu {
  _mode = 'inline';
  isTestOpen = true;
  isOpenOne = false;
  isOpenTwo = false;
  selectOne = false;

  openChange(value) {
    if (!this.isTestOpen) {
      if (value === 'one') {
        this.isOpenTwo = false;
      } else if (value === 'two') {
        this.isOpenOne = false;
      }
    }
  }
}
