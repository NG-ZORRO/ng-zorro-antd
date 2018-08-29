import { Component, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { fakeAsync, flush, tick, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { dispatchFakeEvent } from '../core/testing';

import { NzTabsModule } from './nz-tabs.module';
import { NzTabSetComponent } from './nz-tabset.component';

describe('tabs', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzTabsModule ],
      declarations: [ NzTestTabsBasicComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('basic tabs', () => {
    let fixture;
    let testComponent;
    let tabs;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTabsBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      tabs = fixture.debugElement.query(By.directive(NzTabSetComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(tabs.nativeElement.className).toBe('ant-tabs ant-tabs-top ant-tabs-line');
    });
    it('should size work', () => {
      fixture.detectChanges();
      testComponent.size = 'large';
      fixture.detectChanges();
      expect(tabs.nativeElement.classList).toContain('ant-tabs-large');
      testComponent.size = 'small';
      fixture.detectChanges();
      expect(tabs.nativeElement.classList).toContain('ant-tabs-small');
    });
    it('should type work', () => {
      fixture.detectChanges();
      expect(tabs.nativeElement.classList).toContain('ant-tabs-line');
      testComponent.type = 'card';
      fixture.detectChanges();
      expect(tabs.nativeElement.classList).toContain('ant-tabs-card');
    });
    it('should tabBarExtraContent work', () => {
      fixture.detectChanges();
      expect(tabs.nativeElement.querySelector('.ant-tabs-extra-content')).toBeNull();
      testComponent.tabBarExtraContent = testComponent.extraTemplate;
      fixture.detectChanges();
      expect(tabs.nativeElement.querySelector('.ant-tabs-extra-content').innerText).toBe('extra');
    });
    it('should tabBarStyle work', () => {
      fixture.detectChanges();
      expect(tabs.nativeElement.querySelector('[nz-tabs-nav]').style.cssText).toBe('');
      testComponent.tabBarStyle = { top: 0 };
      fixture.detectChanges();
      expect(tabs.nativeElement.querySelector('[nz-tabs-nav]').style.cssText).toBe('top: 0px;');
    });
    it('should animated work', () => {
      fixture.detectChanges();
      expect(tabs.nativeElement.querySelector('.ant-tabs-content').classList).toContain('ant-tabs-content-animated');
      expect(tabs.nativeElement.querySelector('.ant-tabs-ink-bar').classList).toContain('ant-tabs-ink-bar-animated');
      testComponent.animated = false;
      fixture.detectChanges();
      expect(tabs.nativeElement.querySelector('.ant-tabs-content').classList).toContain('ant-tabs-content-no-animated');
      expect(tabs.nativeElement.querySelector('.ant-tabs-ink-bar').classList).toContain('ant-tabs-ink-bar-no-animated');
      testComponent.animated = { inkBar: true, tabPane: false };
      fixture.detectChanges();
      expect(tabs.nativeElement.querySelector('.ant-tabs-content').classList).toContain('ant-tabs-content-no-animated');
      expect(tabs.nativeElement.querySelector('.ant-tabs-ink-bar').classList).toContain('ant-tabs-ink-bar-animated');
      testComponent.animated = { inkBar: false, tabPane: true };
      fixture.detectChanges();
      expect(tabs.nativeElement.querySelector('.ant-tabs-content').classList).toContain('ant-tabs-content-animated');
      expect(tabs.nativeElement.querySelector('.ant-tabs-ink-bar').classList).toContain('ant-tabs-ink-bar-no-animated');
    });
    it('should tabPosition work', () => {
      fixture.detectChanges();
      expect(tabs.nativeElement.className).toBe('ant-tabs ant-tabs-top ant-tabs-line');
      testComponent.tabPosition = 'left';
      fixture.detectChanges();
      expect(tabs.nativeElement.className).toBe('ant-tabs ant-tabs-vertical ant-tabs-left ant-tabs-line');
      testComponent.tabPosition = 'right';
      fixture.detectChanges();
      expect(tabs.nativeElement.className).toBe('ant-tabs ant-tabs-vertical ant-tabs-right ant-tabs-line');
      testComponent.tabPosition = 'bottom';
      fixture.detectChanges();
      expect(tabs.nativeElement.className).toBe('ant-tabs ant-tabs-bottom ant-tabs-line');
    });
    it('should tabBarGutter work', () => {
      fixture.detectChanges();
      expect(tabs.nativeElement.querySelector('.ant-tabs-tab').style.marginRight).toBe('');
      testComponent.tabBarGutter = 10;
      fixture.detectChanges();
      expect(tabs.nativeElement.querySelector('.ant-tabs-tab').style.marginRight).toBe('10px');
    });
    it('should hideAll work', () => {
      fixture.detectChanges();
      expect(tabs.nativeElement.querySelector('.ant-tabs-tabpane').classList).toContain('ant-tabs-tabpane-active');
      expect(tabs.nativeElement.querySelector('.ant-tabs-ink-bar').attributes.getNamedItem('hidden')).toBe(null);
      testComponent.hideAll = true;
      fixture.detectChanges();
      expect(tabs.nativeElement.querySelector('.ant-tabs-tabpane').classList).toContain('ant-tabs-tabpane-inactive');
      expect(tabs.nativeElement.querySelector('.ant-tabs-ink-bar').attributes.getNamedItem('hidden').name).toBe('hidden');
    });
    it('should title work', () => {
      fixture.detectChanges();
      const titles = tabs.nativeElement.querySelectorAll('.ant-tabs-tab');
      expect(titles[ 0 ].innerText).toBe('title');
      expect(titles[ 1 ].innerText).toBe('template');
    });
    it('should content work', () => {
      fixture.detectChanges();
      const contents = tabs.nativeElement.querySelectorAll('.ant-tabs-tabpane');
      expect(contents[ 0 ].innerText).toBe('Content 1');
      expect(contents[ 1 ].innerText).toBe('Content 2');
    });
    it('should selectedIndex work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const titles = tabs.nativeElement.querySelectorAll('.ant-tabs-tab');
      const contents = tabs.nativeElement.querySelectorAll('.ant-tabs-tabpane');
      expect(titles[ 0 ].classList).toContain('ant-tabs-tab-active');
      expect(titles[ 1 ].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[ 0 ].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[ 1 ].classList).not.toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(0);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(0);
      expect(testComponent.click00).toHaveBeenCalledTimes(0);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(0);
      expect(testComponent.click01).toHaveBeenCalledTimes(0);
      expect(testComponent.select01).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);

      testComponent.selectedIndex = 1;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(titles[ 0 ].classList).not.toContain('ant-tabs-tab-active');
      expect(titles[ 1 ].classList).toContain('ant-tabs-tab-active');
      expect(contents[ 0 ].classList).not.toContain('ant-tabs-tabpane-active');
      expect(contents[ 1 ].classList).toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(1);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(1);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(1);
      expect(testComponent.click00).toHaveBeenCalledTimes(0);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(1);
      expect(testComponent.click01).toHaveBeenCalledTimes(0);
      expect(testComponent.select01).toHaveBeenCalledTimes(1);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);

      testComponent.selectedIndex = 0;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(titles[ 0 ].classList).toContain('ant-tabs-tab-active');
      expect(titles[ 1 ].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[ 0 ].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[ 1 ].classList).not.toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(2);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(2);
      expect(testComponent.click00).toHaveBeenCalledTimes(0);
      expect(testComponent.select00).toHaveBeenCalledTimes(1);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(1);
      expect(testComponent.click01).toHaveBeenCalledTimes(0);
      expect(testComponent.select01).toHaveBeenCalledTimes(1);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(1);
    }));

    it('should click title work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const titles = tabs.nativeElement.querySelectorAll('.ant-tabs-tab');
      const contents = tabs.nativeElement.querySelectorAll('.ant-tabs-tabpane');
      expect(titles[ 0 ].classList).toContain('ant-tabs-tab-active');
      expect(titles[ 1 ].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[ 0 ].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[ 1 ].classList).not.toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(0);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(0);
      expect(testComponent.click00).toHaveBeenCalledTimes(0);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(0);
      expect(testComponent.click01).toHaveBeenCalledTimes(0);
      expect(testComponent.select01).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);

      titles[ 0 ].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(titles[ 0 ].classList).toContain('ant-tabs-tab-active');
      expect(titles[ 1 ].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[ 0 ].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[ 1 ].classList).not.toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(0);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(0);
      expect(testComponent.click00).toHaveBeenCalledTimes(1);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(0);
      expect(testComponent.click01).toHaveBeenCalledTimes(0);
      expect(testComponent.select01).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);

      titles[ 1 ].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(titles[ 0 ].classList).not.toContain('ant-tabs-tab-active');
      expect(titles[ 1 ].classList).toContain('ant-tabs-tab-active');
      expect(contents[ 0 ].classList).not.toContain('ant-tabs-tabpane-active');
      expect(contents[ 1 ].classList).toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(1);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(1);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(1);
      expect(testComponent.click00).toHaveBeenCalledTimes(1);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(1);
      expect(testComponent.click01).toHaveBeenCalledTimes(1);
      expect(testComponent.select01).toHaveBeenCalledTimes(1);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);

      titles[ 0 ].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(titles[ 0 ].classList).toContain('ant-tabs-tab-active');
      expect(titles[ 1 ].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[ 0 ].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[ 1 ].classList).not.toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(2);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(2);
      expect(testComponent.click00).toHaveBeenCalledTimes(2);
      expect(testComponent.select00).toHaveBeenCalledTimes(1);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(1);
      expect(testComponent.click01).toHaveBeenCalledTimes(1);
      expect(testComponent.select01).toHaveBeenCalledTimes(1);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(1);
    }));

    it('should disabled work', fakeAsync(() => {
      testComponent.disabled = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const titles = tabs.nativeElement.querySelectorAll('.ant-tabs-tab');
      const contents = tabs.nativeElement.querySelectorAll('.ant-tabs-tabpane');
      expect(titles[ 0 ].classList).toContain('ant-tabs-tab-active');
      expect(titles[ 1 ].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[ 0 ].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[ 1 ].classList).not.toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(0);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(0);
      expect(testComponent.click00).toHaveBeenCalledTimes(0);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(0);
      expect(testComponent.click01).toHaveBeenCalledTimes(0);
      expect(testComponent.select01).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);

      titles[ 0 ].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(titles[ 0 ].classList).toContain('ant-tabs-tab-active');
      expect(titles[ 1 ].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[ 0 ].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[ 1 ].classList).not.toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(0);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(0);
      expect(testComponent.click00).toHaveBeenCalledTimes(1);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(0);
      expect(testComponent.click01).toHaveBeenCalledTimes(0);
      expect(testComponent.select01).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);

      titles[ 1 ].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(titles[ 0 ].classList).toContain('ant-tabs-tab-active');
      expect(titles[ 1 ].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[ 0 ].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[ 1 ].classList).not.toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(0);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(0);
      expect(testComponent.click00).toHaveBeenCalledTimes(1);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(0);
      expect(testComponent.click01).toHaveBeenCalledTimes(0);
      expect(testComponent.select01).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);

      titles[ 0 ].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(titles[ 0 ].classList).toContain('ant-tabs-tab-active');
      expect(titles[ 1 ].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[ 0 ].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[ 1 ].classList).not.toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(0);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(0);
      expect(testComponent.click00).toHaveBeenCalledTimes(2);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(0);
      expect(testComponent.click01).toHaveBeenCalledTimes(0);
      expect(testComponent.select01).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);
    }));
    it('should vertical click title work', fakeAsync(() => {
      testComponent.tabPosition = 'left';
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const titles = tabs.nativeElement.querySelectorAll('.ant-tabs-tab');
      const contents = tabs.nativeElement.querySelectorAll('.ant-tabs-tabpane');
      expect(titles[ 0 ].classList).toContain('ant-tabs-tab-active');
      expect(titles[ 1 ].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[ 0 ].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[ 1 ].classList).not.toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(0);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(0);
      expect(testComponent.click00).toHaveBeenCalledTimes(0);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(0);
      expect(testComponent.click01).toHaveBeenCalledTimes(0);
      expect(testComponent.select01).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);

      titles[ 0 ].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(titles[ 0 ].classList).toContain('ant-tabs-tab-active');
      expect(titles[ 1 ].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[ 0 ].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[ 1 ].classList).not.toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(0);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(0);
      expect(testComponent.click00).toHaveBeenCalledTimes(1);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(0);
      expect(testComponent.click01).toHaveBeenCalledTimes(0);
      expect(testComponent.select01).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);

      titles[ 1 ].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(titles[ 0 ].classList).not.toContain('ant-tabs-tab-active');
      expect(titles[ 1 ].classList).toContain('ant-tabs-tab-active');
      expect(contents[ 0 ].classList).not.toContain('ant-tabs-tabpane-active');
      expect(contents[ 1 ].classList).toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(1);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(1);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(1);
      expect(testComponent.click00).toHaveBeenCalledTimes(1);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(1);
      expect(testComponent.click01).toHaveBeenCalledTimes(1);
      expect(testComponent.select01).toHaveBeenCalledTimes(1);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);

      titles[ 0 ].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(titles[ 0 ].classList).toContain('ant-tabs-tab-active');
      expect(titles[ 1 ].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[ 0 ].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[ 1 ].classList).not.toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(2);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(2);
      expect(testComponent.click00).toHaveBeenCalledTimes(2);
      expect(testComponent.select00).toHaveBeenCalledTimes(1);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(1);
      expect(testComponent.click01).toHaveBeenCalledTimes(1);
      expect(testComponent.select01).toHaveBeenCalledTimes(1);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(1);
    }));
    it('should add work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      let titles = tabs.nativeElement.querySelectorAll('.ant-tabs-tab');
      let contents = tabs.nativeElement.querySelectorAll('.ant-tabs-tabpane');
      expect(titles.length).toBe(2);
      expect(contents.length).toBe(2);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(titles[ 0 ].classList).toContain('ant-tabs-tab-active');
      expect(titles[ 1 ].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[ 0 ].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[ 1 ].classList).not.toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(0);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(0);
      expect(testComponent.click00).toHaveBeenCalledTimes(0);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(0);
      expect(testComponent.click01).toHaveBeenCalledTimes(0);
      expect(testComponent.select01).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);
      testComponent.add = true;
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      titles = tabs.nativeElement.querySelectorAll('.ant-tabs-tab');
      contents = tabs.nativeElement.querySelectorAll('.ant-tabs-tabpane');
      expect(titles.length).toBe(3);
      expect(contents.length).toBe(3);
      expect(titles[ 0 ].classList).toContain('ant-tabs-tab-active');
      expect(titles[ 1 ].classList).not.toContain('ant-tabs-tab-active');
      expect(titles[ 2 ].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[ 0 ].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[ 1 ].classList).not.toContain('ant-tabs-tabpane-active');
      expect(contents[ 2 ].classList).not.toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(0);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(0);
      expect(testComponent.click00).toHaveBeenCalledTimes(0);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(0);
      expect(testComponent.click01).toHaveBeenCalledTimes(0);
      expect(testComponent.select01).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);
      expect(testComponent.click02).toHaveBeenCalledTimes(0);
      expect(testComponent.select02).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect02).toHaveBeenCalledTimes(0);
    }));
    it('should prevent focus scroll', fakeAsync(() => {
      fixture.detectChanges();
      expect(tabs.nativeElement.scrollLeft).toBe(0);
      const input: HTMLInputElement = tabs.nativeElement.querySelector('button');
      input.focus();
      expect(tabs.nativeElement.scrollLeft > 0).toBe(true);
      dispatchFakeEvent(tabs.nativeElement, 'scroll');
      flush();
      fixture.detectChanges();
      expect(tabs.nativeElement.scrollLeft).toBe(0);
    }));
  });
});

@Component({
  selector     : 'nz-test-tabs-basic',
  encapsulation: ViewEncapsulation.None,
  styleUrls    : [
    '../style/index.less',
    './style/index.less'
  ],
  template     : `
    <ng-template #titleTemplate>template</ng-template>
    <ng-template #extraTemplate>extra</ng-template>
    <div>
      <nz-tabset
        [(nzSelectedIndex)]="selectedIndex"
        (nzSelectedIndexChange)="selectedIndexChange($event)"
        (nzSelectChange)="selectChange($event)"
        [nzAnimated]="animated"
        [nzSize]="size"
        [nzTabBarExtraContent]="tabBarExtraContent"
        [nzTabBarStyle]="tabBarStyle"
        [nzTabPosition]="tabPosition"
        [nzType]="type"
        [nzTabBarGutter]="tabBarGutter"
        [nzHideAll]="hideAll">
        <nz-tab
          nzTitle="title"
          (nzDeselect)="deselect00()"
          (nzSelect)="select00()"
          (nzClick)="click00()">Content 1<!----></nz-tab>
        <nz-tab
          [nzTitle]="titleTemplate"
          (nzDeselect)="deselect01()"
          (nzSelect)="select01()"
          (nzClick)="click01()"
          [nzDisabled]="disabled">
          Content 2<!---->
          <button></button>
        </nz-tab>
        <nz-tab
          nzTitle="add"
          *ngIf="add"
          (nzDeselect)="deselect02()"
          (nzSelect)="select02()"
          (nzClick)="click02()">add
        </nz-tab>
        <nz-tab *ngFor="let i of array" [nzTitle]="i"></nz-tab>
      </nz-tabset>
    </div>
  `
})
export class NzTestTabsBasicComponent {
  add = false;
  @ViewChild('extraTemplate') extraTemplate: TemplateRef<void>;
  @ViewChild(NzTabSetComponent) nzTabSetComponent: NzTabSetComponent;
  selectedIndex = 0;
  selectedIndexChange = jasmine.createSpy('selectedIndex callback');
  selectChange = jasmine.createSpy('selectedIndex callback');
  animated = true;
  size = 'default';
  tabBarExtraContent;
  tabBarStyle;
  tabPosition = 'top';
  type = 'line';
  tabBarGutter;
  hideAll = false;
  disabled = false;
  click00 = jasmine.createSpy('click00 callback');
  select00 = jasmine.createSpy('select00 callback');
  deselect00 = jasmine.createSpy('deselect00 callback');

  click01 = jasmine.createSpy('click01 callback');
  select01 = jasmine.createSpy('select01 callback');
  deselect01 = jasmine.createSpy('deselect01 callback');

  click02 = jasmine.createSpy('click02 callback');
  select02 = jasmine.createSpy('select02 callback');
  deselect02 = jasmine.createSpy('deselect02 callback');
  array = [];
}
