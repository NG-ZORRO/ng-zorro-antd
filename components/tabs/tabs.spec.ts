import { CommonModule } from '@angular/common';
import { Component, DebugElement, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { NgStyleInterface } from 'ng-zorro-antd/core/types';

import { of } from 'rxjs';
import { NzAnimatedInterface, NzTabsCanDeactivateFn } from './table.types';
import { NzTabsModule } from './tabs.module';
import { NzTabSetComponent } from './tabset.component';

describe('tabs', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [NzTabsModule],
      declarations: [NzTestTabsBasicComponent, NzTestTabsTabPositionLeftComponent]
    });
    TestBed.compileComponents();
  }));
  describe('basic tabs', () => {
    let fixture: ComponentFixture<NzTestTabsBasicComponent>;
    let testComponent: NzTestTabsBasicComponent;
    let tabs: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestTabsBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      tabs = fixture.debugElement.query(By.directive(NzTabSetComponent));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(tabs.nativeElement.className).toBe('ant-tabs ant-tabs-line ant-tabs-top');
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
      expect(tabs.nativeElement.querySelector('nz-tabs-nav').style.cssText).toBe('');
      testComponent.tabBarStyle = { top: 0 };
      fixture.detectChanges();
      expect(tabs.nativeElement.querySelector('nz-tabs-nav').style.cssText).toBe('top: 0px;');
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
      expect(tabs.nativeElement.className).toBe('ant-tabs ant-tabs-line ant-tabs-top');
      testComponent.tabPosition = 'left';
      fixture.detectChanges();
      expect(tabs.nativeElement.className).toBe('ant-tabs ant-tabs-line ant-tabs-left ant-tabs-vertical');
      testComponent.tabPosition = 'right';
      fixture.detectChanges();
      expect(tabs.nativeElement.className).toBe('ant-tabs ant-tabs-line ant-tabs-vertical ant-tabs-right');
      testComponent.tabPosition = 'bottom';
      fixture.detectChanges();
      expect(tabs.nativeElement.className).toBe('ant-tabs ant-tabs-line ant-tabs-bottom');
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
      expect(titles[0].innerText).toBe('title');
      expect(titles[1].innerText).toBe('template');
    });

    it('should content work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const contents = tabs.nativeElement.querySelectorAll('.ant-tabs-tabpane');
      expect(contents[0].innerText).toBe('Content 1');
    }));

    it('should selectedIndex work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const titles = tabs.nativeElement.querySelectorAll('.ant-tabs-tab');
      const contents = tabs.nativeElement.querySelectorAll('.ant-tabs-tabpane');
      expect(titles[0].classList).toContain('ant-tabs-tab-active');
      expect(titles[1].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[0].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[1].classList).not.toContain('ant-tabs-tabpane-active');
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
      expect(titles[0].classList).not.toContain('ant-tabs-tab-active');
      expect(titles[1].classList).toContain('ant-tabs-tab-active');
      expect(contents[0].classList).not.toContain('ant-tabs-tabpane-active');
      expect(contents[1].classList).toContain('ant-tabs-tabpane-active');
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
      expect(titles[0].classList).toContain('ant-tabs-tab-active');
      expect(titles[1].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[0].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[1].classList).not.toContain('ant-tabs-tabpane-active');
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
      expect(titles[0].classList).toContain('ant-tabs-tab-active');
      expect(titles[1].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[0].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[1].classList).not.toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(0);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(0);
      expect(testComponent.click00).toHaveBeenCalledTimes(0);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(0);
      expect(testComponent.click01).toHaveBeenCalledTimes(0);
      expect(testComponent.select01).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);

      titles[0].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(titles[0].classList).toContain('ant-tabs-tab-active');
      expect(titles[1].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[0].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[1].classList).not.toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(0);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(0);
      expect(testComponent.click00).toHaveBeenCalledTimes(1);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(0);
      expect(testComponent.click01).toHaveBeenCalledTimes(0);
      expect(testComponent.select01).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);

      titles[1].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(titles[0].classList).not.toContain('ant-tabs-tab-active');
      expect(titles[1].classList).toContain('ant-tabs-tab-active');
      expect(contents[0].classList).not.toContain('ant-tabs-tabpane-active');
      expect(contents[1].classList).toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(1);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(1);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(1);
      expect(testComponent.click00).toHaveBeenCalledTimes(1);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(1);
      expect(testComponent.click01).toHaveBeenCalledTimes(1);
      expect(testComponent.select01).toHaveBeenCalledTimes(1);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);

      titles[0].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(titles[0].classList).toContain('ant-tabs-tab-active');
      expect(titles[1].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[0].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[1].classList).not.toContain('ant-tabs-tabpane-active');
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
      expect(titles[0].classList).toContain('ant-tabs-tab-active');
      expect(titles[1].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[0].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[1].classList).not.toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(0);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(0);
      expect(testComponent.click00).toHaveBeenCalledTimes(0);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(0);
      expect(testComponent.click01).toHaveBeenCalledTimes(0);
      expect(testComponent.select01).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);

      titles[0].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(titles[0].classList).toContain('ant-tabs-tab-active');
      expect(titles[1].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[0].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[1].classList).not.toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(0);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(0);
      expect(testComponent.click00).toHaveBeenCalledTimes(1);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(0);
      expect(testComponent.click01).toHaveBeenCalledTimes(0);
      expect(testComponent.select01).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);

      titles[1].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(titles[0].classList).toContain('ant-tabs-tab-active');
      expect(titles[1].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[0].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[1].classList).not.toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(0);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(0);
      expect(testComponent.click00).toHaveBeenCalledTimes(1);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(0);
      expect(testComponent.click01).toHaveBeenCalledTimes(0);
      expect(testComponent.select01).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);

      titles[0].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(titles[0].classList).toContain('ant-tabs-tab-active');
      expect(titles[1].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[0].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[1].classList).not.toContain('ant-tabs-tabpane-active');
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
      expect(titles[0].classList).toContain('ant-tabs-tab-active');
      expect(titles[1].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[0].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[1].classList).not.toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(0);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(0);
      expect(testComponent.click00).toHaveBeenCalledTimes(0);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(0);
      expect(testComponent.click01).toHaveBeenCalledTimes(0);
      expect(testComponent.select01).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);

      titles[0].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(titles[0].classList).toContain('ant-tabs-tab-active');
      expect(titles[1].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[0].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[1].classList).not.toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(0);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(0);
      expect(testComponent.click00).toHaveBeenCalledTimes(1);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(0);
      expect(testComponent.click01).toHaveBeenCalledTimes(0);
      expect(testComponent.select01).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);

      titles[1].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(titles[0].classList).not.toContain('ant-tabs-tab-active');
      expect(titles[1].classList).toContain('ant-tabs-tab-active');
      expect(contents[0].classList).not.toContain('ant-tabs-tabpane-active');
      expect(contents[1].classList).toContain('ant-tabs-tabpane-active');
      expect(testComponent.selectedIndex).toBe(1);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(1);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(1);
      expect(testComponent.click00).toHaveBeenCalledTimes(1);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(1);
      expect(testComponent.click01).toHaveBeenCalledTimes(1);
      expect(testComponent.select01).toHaveBeenCalledTimes(1);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);

      titles[0].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(titles[0].classList).toContain('ant-tabs-tab-active');
      expect(titles[1].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[0].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[1].classList).not.toContain('ant-tabs-tabpane-active');
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
      expect(titles[0].classList).toContain('ant-tabs-tab-active');
      expect(titles[1].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[0].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[1].classList).not.toContain('ant-tabs-tabpane-active');
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
      expect(titles[0].classList).toContain('ant-tabs-tab-active');
      expect(titles[1].classList).not.toContain('ant-tabs-tab-active');
      expect(titles[2].classList).not.toContain('ant-tabs-tab-active');
      expect(contents[0].classList).toContain('ant-tabs-tabpane-active');
      expect(contents[1].classList).not.toContain('ant-tabs-tabpane-active');
      expect(contents[2].classList).not.toContain('ant-tabs-tabpane-active');
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

    it('should switch hook work', fakeAsync(() => {
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      testComponent.add = true;
      // O => 1 => 2 => 0
      testComponent.canDeactivate = (fromIndex: number, toIndex: number) => {
        switch (fromIndex) {
          case 0:
            return toIndex === 1;
          case 1:
            return Promise.resolve(toIndex === 2);
          case 2:
            return of(toIndex === 0);
          default:
            return true;
        }
      };
      fixture.detectChanges();
      tick();
      fixture.detectChanges();

      const titles = tabs.nativeElement.querySelectorAll('.ant-tabs-tab');
      // 0 => 2: not
      titles[2].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(0);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(0);
      expect(testComponent.click00).toHaveBeenCalledTimes(0);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(0);
      expect(testComponent.click02).toHaveBeenCalledTimes(0);
      expect(testComponent.select02).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect02).toHaveBeenCalledTimes(0);

      // 0 => 1: yes
      titles[1].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.selectedIndex).toBe(1);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(1);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(1);
      expect(testComponent.click00).toHaveBeenCalledTimes(0);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(1);
      expect(testComponent.click01).toHaveBeenCalledTimes(1);
      expect(testComponent.select01).toHaveBeenCalledTimes(1);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);

      // 1 => 0: not
      titles[0].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.selectedIndex).toBe(1);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(1);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(1);
      expect(testComponent.click01).toHaveBeenCalledTimes(1);
      expect(testComponent.select01).toHaveBeenCalledTimes(1);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(0);
      expect(testComponent.click00).toHaveBeenCalledTimes(0);
      expect(testComponent.select00).toHaveBeenCalledTimes(0);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(1);

      // 1 => 2: yes
      titles[2].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.selectedIndex).toBe(2);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(2);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(2);
      expect(testComponent.click01).toHaveBeenCalledTimes(1);
      expect(testComponent.select01).toHaveBeenCalledTimes(1);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(1);
      expect(testComponent.click02).toHaveBeenCalledTimes(1);
      expect(testComponent.select02).toHaveBeenCalledTimes(1);
      expect(testComponent.deselect02).toHaveBeenCalledTimes(1);

      // 2 => 1: not
      titles[1].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.selectedIndex).toBe(2);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(2);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(2);
      expect(testComponent.click02).toHaveBeenCalledTimes(1);
      expect(testComponent.select02).toHaveBeenCalledTimes(1);
      expect(testComponent.deselect02).toHaveBeenCalledTimes(1);
      expect(testComponent.click01).toHaveBeenCalledTimes(1);
      expect(testComponent.select01).toHaveBeenCalledTimes(1);
      expect(testComponent.deselect01).toHaveBeenCalledTimes(1);

      // 2 => 0: yes
      titles[0].click();
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      expect(testComponent.selectedIndex).toBe(0);
      expect(testComponent.selectedIndexChange).toHaveBeenCalledTimes(3);
      expect(testComponent.selectChange).toHaveBeenCalledTimes(3);
      expect(testComponent.click02).toHaveBeenCalledTimes(1);
      expect(testComponent.select02).toHaveBeenCalledTimes(1);
      expect(testComponent.deselect02).toHaveBeenCalledTimes(2);
      expect(testComponent.click00).toHaveBeenCalledTimes(1);
      expect(testComponent.select00).toHaveBeenCalledTimes(1);
      expect(testComponent.deselect00).toHaveBeenCalledTimes(2);
    }));
  });

  describe('init nzTabPosition to left', () => {
    it('should next and prev buttons display abnormal', fakeAsync(() => {
      const fixture = TestBed.createComponent(NzTestTabsTabPositionLeftComponent);
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
      const tabs = fixture.debugElement.query(By.directive(NzTabSetComponent));
      expect(tabs.nativeElement.querySelector('.ant-tabs-nav-container').classList).not.toContain('ant-tabs-nav-container-scrolling');
    }));
  });
});

describe('link router', () => {
  let fixture: ComponentFixture<NzTestTabsLinkRouterComponent>;
  let tabs: DebugElement;
  let router: Router;

  describe('basic', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CommonModule, NzTabsModule, RouterTestingModule.withRoutes(routes)],
        declarations: [NzTestTabsLinkRouterComponent]
      }).compileComponents();

      fixture = TestBed.createComponent(NzTestTabsLinkRouterComponent);
      fixture.detectChanges();

      tabs = fixture.debugElement.query(By.directive(NzTabSetComponent));
    });

    it('should child route mode works', fakeAsync(() => {
      fixture.ngZone!.run(() => {
        router = TestBed.inject(Router);
        router.initialNavigation();

        fixture.detectChanges();
        expect((tabs.componentInstance as NzTabSetComponent).nzSelectedIndex).toBe(0);

        router.navigate(['.', 'two']);
        fixture.detectChanges();
        tick(200);
        fixture.detectChanges();
        expect((tabs.componentInstance as NzTabSetComponent).nzSelectedIndex).toBe(1);

        flush();
        // const titles = tabs.nativeElement.querySelectorAll('.ant-tabs-tab');
        // titles[0].click();
        // fixture.detectChanges();
        // tick(200);
        // fixture.detectChanges();
        // expect(location.path()).toBe('/');
      });
    }));
  });

  describe('throw error', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NzTabsModule],
        declarations: [NzTestTabsLinkRouterComponent]
      });
    });

    it('should raise error when routerModule is not imported', () => {
      expect(() => {
        TestBed.compileComponents();
        fixture = TestBed.createComponent(NzTestTabsLinkRouterComponent);
        fixture.detectChanges();
      }).toThrowError();
    });
  });
});

@Component({
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['../style/index.less', './style/index.less'],
  template: `
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
        [nzHideAll]="hideAll"
        [nzCanDeactivate]="canDeactivate"
      >
        <nz-tab nzTitle="title" [nzForceRender]="true" (nzDeselect)="deselect00()" (nzSelect)="select00()" (nzClick)="click00()"
          >Content 1<!----></nz-tab
        >
        <nz-tab
          [nzForceRender]="true"
          [nzTitle]="titleTemplate"
          (nzDeselect)="deselect01()"
          (nzSelect)="select01()"
          (nzClick)="click01()"
          [nzDisabled]="disabled"
        >
          Content 2<!---->
          <button></button>
        </nz-tab>
        <nz-tab [nzForceRender]="true" nzTitle="add" *ngIf="add" (nzDeselect)="deselect02()" (nzSelect)="select02()" (nzClick)="click02()"
          >add
        </nz-tab>
        <nz-tab *ngFor="let i of array" [nzTitle]="i"></nz-tab>
      </nz-tabset>
    </div>
  `
})
export class NzTestTabsBasicComponent {
  add = false;
  @ViewChild('extraTemplate', { static: false }) extraTemplate!: TemplateRef<void>;
  @ViewChild(NzTabSetComponent, { static: false }) nzTabSetComponent!: NzTabSetComponent;
  selectedIndex = 0;
  selectedIndexChange = jasmine.createSpy('selectedIndexChange callback');
  selectChange = jasmine.createSpy('selectChange callback');
  animated: NzAnimatedInterface | boolean = true;
  size = 'default';
  tabBarExtraContent!: TemplateRef<void>;
  tabBarStyle!: NgStyleInterface;
  tabPosition = 'top';
  type = 'line';
  tabBarGutter!: number;
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

  canDeactivate: NzTabsCanDeactivateFn | null = null;
}

/** https://github.com/NG-ZORRO/ng-zorro-antd/issues/1964 **/
@Component({
  template: `
    <nz-tabset nzTabPosition="left">
      <nz-tab *ngFor="let tab of tabs" [nzTitle]="'Tab' + tab"> Content of tab {{ tab }} </nz-tab>
    </nz-tabset>
  `
})
export class NzTestTabsTabPositionLeftComponent {
  tabs = [1, 2, 3];
}

@Component({
  template: `
    <nz-tabset nzLinkRouter>
      <nz-tab nzTitle="default">
        <a nz-tab-link [routerLink]="['.']">One</a>
        One
      </nz-tab>
      <nz-tab nzTitle="two">
        <a nz-tab-link [routerLink]="['.', 'two']">Two</a>
        Two
      </nz-tab>
    </nz-tabset>
    <router-outlet></router-outlet>
  `
})
export class NzTestTabsLinkRouterComponent {}

const routes: Routes = [
  {
    path: '',
    component: NzTestTabsLinkRouterComponent,
    data: {
      path: ''
    }
  },
  {
    path: 'two',
    component: NzTestTabsLinkRouterComponent,
    data: {
      path: 'two'
    }
  }
];
