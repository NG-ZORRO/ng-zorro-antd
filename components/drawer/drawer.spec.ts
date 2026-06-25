/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Directionality } from '@angular/cdk/bidi';
import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Input, signal, TemplateRef, ViewChild, inject } from '@angular/core';
import { ComponentFixture, TestBed, inject as testingInject } from '@angular/core/testing';

import { vi } from 'vitest';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { dispatchKeyboardEvent, provideMockDirectionality, updateNonSignalsInput } from 'ng-zorro-antd/core/testing';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NZ_DRAWER_DATA, NzDrawerPlacement } from './drawer-options';
import { NzDrawerRef } from './drawer-ref';
import { DRAWER_ANIMATE_DURATION, NzDrawerComponent } from './drawer.component';
import { NzDrawerModule } from './drawer.module';
import { NzDrawerService } from './drawer.service';

describe('NzDrawerComponent', () => {
  describe('default', () => {
    let component: NzTestDrawerComponent;
    let fixture: ComponentFixture<NzTestDrawerComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let forceScrollElement: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideNzNoAnimation(), provideNzIconsTesting()]
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestDrawerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    beforeEach(
      testingInject([OverlayContainer], (oc: OverlayContainer) => {
        overlayContainer = oc;
        overlayContainerElement = oc.getContainerElement();
        forceScrollElement = document.createElement('div');
        document.body.appendChild(forceScrollElement);
        forceScrollElement.style.width = '100px';
        forceScrollElement.style.height = '3000px';
        forceScrollElement.style.background = 'rebeccapurple';
      })
    );

    afterEach(() => {
      component.close();
      document.body.removeChild(forceScrollElement);
      window.scroll(0, 0);
      overlayContainer.ngOnDestroy();
    });

    it('should open work', () => {
      expect(component.triggerVisible).toHaveBeenCalledTimes(1);
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(component.drawerComponent.nzVisible).toBe(true);
      expect(component.triggerVisible).toHaveBeenCalledTimes(2);
      expect(component.triggerVisible).toHaveBeenCalledWith(true);
    });

    it('should close work', () => {
      expect(component.triggerVisible).toHaveBeenCalledTimes(1);
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(component.triggerVisible).toHaveBeenCalledTimes(2);
      expect(component.triggerVisible).toHaveBeenCalledWith(true);
      component.close();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(false);
      expect(component.drawerComponent.nzVisible).toBe(false);
      expect(component.triggerVisible).toHaveBeenCalledTimes(3);
      expect(component.triggerVisible).toHaveBeenCalledWith(false);
    });

    it('should block scroll', async () => {
      expect(document.documentElement!.classList).not.toContain('cdk-global-scrollblock');
      component.open();
      await stabilize(fixture, 300);
      expect(document.documentElement!.classList).toContain('cdk-global-scrollblock');
      component.close();
      await stabilize(fixture, 300);
      expect(document.documentElement!.classList).not.toContain('cdk-global-scrollblock');
    });

    it('should hied close button', () => {
      component.closable.set(false);
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(overlayContainerElement.querySelector('.ant-drawer .ant-drawer-close')).toBe(null);
    });

    it('should open work', () => {
      expect(component.triggerVisible).toHaveBeenCalledTimes(1);
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(component.drawerComponent.nzVisible).toBe(true);
      expect(component.triggerVisible).toHaveBeenCalledTimes(2);
      expect(component.triggerVisible).toHaveBeenCalledWith(true);
    });

    it('should close work', () => {
      expect(component.triggerVisible).toHaveBeenCalledTimes(1);
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(component.triggerVisible).toHaveBeenCalledTimes(2);
      expect(component.triggerVisible).toHaveBeenCalledWith(true);
      component.close();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(false);
      expect(component.drawerComponent.nzVisible).toBe(false);
      expect(component.triggerVisible).toHaveBeenCalledTimes(3);
      expect(component.triggerVisible).toHaveBeenCalledWith(false);
    });

    it('should closable', () => {
      expect(component.triggerVisible).toHaveBeenCalledTimes(1);
      component.closable.set(true);
      component.open();
      fixture.detectChanges();
      expect(component.triggerVisible).toHaveBeenCalledTimes(2);
      expect(component.triggerVisible).toHaveBeenCalledWith(true);
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-close') as HTMLElement).click();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(false);
      expect(component.triggerVisible).toHaveBeenCalledTimes(3);
      expect(component.triggerVisible).toHaveBeenCalledWith(false);
    });

    it('should set close icon work', () => {
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer .anticon-close')).toBeDefined();

      component.closeIcon.set('close-circle');
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer .anticon-close')).toBeNull();
      expect(overlayContainerElement.querySelector('.ant-drawer .anticon-close-circle')).toBeDefined();

      component.closeIcon.set(component.closeIconTemplateRef);
      fixture.detectChanges();

      expect(overlayContainerElement.querySelector('.ant-drawer .anticon-close')).toBeNull();
      expect(overlayContainerElement.querySelector('.ant-drawer .anticon-close-circle')).toBeNull();
      expect(overlayContainerElement.querySelector('.ant-drawer .anticon-close-square')).toBeDefined();
    });

    it('should not close when click mask', () => {
      expect(component.triggerVisible).toHaveBeenCalledTimes(1);
      component.maskClosable.set(false);
      component.open();
      fixture.detectChanges();
      expect(component.triggerVisible).toHaveBeenCalledTimes(2);
      expect(component.triggerVisible).toHaveBeenCalledWith(true);
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-mask') as HTMLElement).click();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(component.triggerVisible).toHaveBeenCalledTimes(2);
    });

    it('should be closed when ESC keydown', () => {
      expect(component.triggerVisible).toHaveBeenCalledTimes(1);
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(component.triggerVisible).toHaveBeenCalledTimes(2);
      expect(component.triggerVisible).toHaveBeenCalledWith(true);
      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(false);
      expect(component.triggerVisible).toHaveBeenCalledTimes(3);
      expect(component.triggerVisible).toHaveBeenCalledWith(false);
    });

    it('should disabled ESC keydown', () => {
      expect(component.triggerVisible).toHaveBeenCalledTimes(1);
      component.open();
      component.drawerComponent.nzKeyboard = false;
      fixture.detectChanges();
      expect(component.triggerVisible).toHaveBeenCalledTimes(2);
      expect(component.triggerVisible).toHaveBeenCalledWith(true);
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(component.triggerVisible).toHaveBeenCalledTimes(2);
      component.close();
      fixture.detectChanges();
    });

    it('should close when click mask', () => {
      expect(component.triggerVisible).toHaveBeenCalledTimes(1);
      component.maskClosable.set(true);
      component.open();
      fixture.detectChanges();
      expect(component.triggerVisible).toHaveBeenCalledTimes(2);
      expect(component.triggerVisible).toHaveBeenCalledWith(true);
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-mask') as HTMLElement).click();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(false);
      expect(component.triggerVisible).toHaveBeenCalledTimes(3);
      expect(component.triggerVisible).toHaveBeenCalledWith(false);
    });

    it('should not show mask', () => {
      component.showMask.set(false);
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('no-mask')).toBe(true);
      expect(overlayContainerElement.querySelector('.ant-drawer .ant-drawer-mask')).toBe(null);
      component.showMask.set(true);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('no-mask')).toBe(false);
    });

    it('should set nzMaskStyle & nzBodyStyle', () => {
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-mask') as HTMLElement).style.color).toBe(
        'gray'
      );
      expect((overlayContainerElement.querySelector('.ant-drawer .ant-drawer-body') as HTMLElement).style.color).toBe(
        'gray'
      );
    });

    it('should not render title', () => {
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(overlayContainerElement.querySelector('.ant-drawer .ant-drawer-title')).toBe(null);
    });

    it('should render header when is no title but is closeable', () => {
      component.closable.set(true);
      component.open();
      fixture.detectChanges();

      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(overlayContainerElement.querySelector('.ant-drawer-header-close-only')).toBeTruthy();
      expect(overlayContainerElement.querySelector('.ant-drawer .ant-drawer-title')).toBe(null);
    });

    it('should not render title even with nzExtra', () => {
      component.extra.set('test');
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(overlayContainerElement.querySelector('.ant-drawer .ant-drawer-title')).toBe(null);
    });

    it('should support string extra', () => {
      component.closable.set(true);
      component.extra.set(component.stringTitle);
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(
        (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-extra') as HTMLElement).innerText.trim()
      ).toBe('test');
    });

    it('should support TemplateRef extra', () => {
      component.closable.set(true);
      component.extra.set(component.titleTemplateRef);
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(overlayContainerElement.querySelector('.ant-drawer .ant-drawer-extra .custom-title')).not.toBe(null);
    });

    it('should support string title', () => {
      component.title.set(component.stringTitle);
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(
        (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-title') as HTMLElement).innerText.trim()
      ).toBe('test');
    });

    it('should support TemplateRef title', () => {
      component.title.set(component.titleTemplateRef);
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(overlayContainerElement.querySelector('.ant-drawer .ant-drawer-title .custom-title')).not.toBe(null);
    });

    it('should support string footer', () => {
      component.footer.set('test');
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(
        (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-footer') as HTMLElement).innerText.trim()
      ).toBe('test');
    });

    it('should support TemplateRef footer', () => {
      component.footer.set(component.templateFooter);
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(overlayContainerElement.querySelector('.ant-drawer .ant-drawer-footer .custom-footer')).not.toBe(null);
    });

    it('should support custom width', () => {
      component.width.set('500px');
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(
        (
          overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content') as HTMLElement
        ).getBoundingClientRect().width
      ).toBe(500);
    });

    it('should support custom number type width', () => {
      component.width.set(520);
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(
        (
          overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content') as HTMLElement
        ).getBoundingClientRect().width
      ).toBe(520);
    });

    it('should support custom height', () => {
      component.height.set('500px');
      component.placement.set('top');
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(
        (
          overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content-wrapper') as HTMLElement
        ).getBoundingClientRect().height
      ).toBe(500);
      component.placement.set('left');
      fixture.detectChanges();
    });

    it('should support custom number type height', () => {
      component.height.set(520);
      component.placement.set('top');
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(
        (
          overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content-wrapper') as HTMLElement
        ).getBoundingClientRect().height
      ).toBe(520);
      component.placement.set('left');
      fixture.detectChanges();
    });

    it('should support large size width', () => {
      component.size.set('large');
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(
        (
          overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content') as HTMLElement
        ).getBoundingClientRect().width
      ).toBe(736);
    });

    it('should custom width priority higher than size', () => {
      component.size.set('large');
      component.width.set(520);
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(
        (
          overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content') as HTMLElement
        ).getBoundingClientRect().width
      ).toBe(520);
    });

    it('should support large size height', () => {
      component.size.set('large');
      component.placement.set('top');
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(
        (
          overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content-wrapper') as HTMLElement
        ).getBoundingClientRect().height
      ).toBe(736);
      component.placement.set('left');
      fixture.detectChanges();
    });

    it('should custom height priority higher than size', () => {
      component.size.set('large');
      component.height.set(520);
      component.placement.set('top');
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(
        (
          overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content-wrapper') as HTMLElement
        ).getBoundingClientRect().height
      ).toBe(520);
      component.placement.set('left');
      fixture.detectChanges();
    });

    it('should nzWrapClassName work', () => {
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(
        (
          overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content-wrapper') as HTMLElement
        ).classList.contains('test-class')
      ).toBe(true);
    });

    it('should nzZIndex work', () => {
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.zIndex).toBe('1001');
    });

    it('should nzPlacement work', () => {
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(
        (overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-left')
      ).toBe(true);
      expect(
        (overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-bottom')
      ).toBe(false);
      expect(
        (overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-top')
      ).toBe(false);
      component.placement.set('right');
      fixture.detectChanges();
      component.close();
      fixture.detectChanges();
      component.open();
      expect(
        (overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-left')
      ).toBe(false);
      expect(
        (overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-right')
      ).toBe(true);
      expect(
        (overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-bottom')
      ).toBe(false);
      expect(
        (overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-top')
      ).toBe(false);
      component.placement.set('top');
      fixture.detectChanges();
      component.close();
      fixture.detectChanges();
      component.open();
      expect(
        (overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-left')
      ).toBe(false);
      expect(
        (overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-right')
      ).toBe(false);
      expect(
        (overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-bottom')
      ).toBe(false);
      expect(
        (overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-top')
      ).toBe(true);
      component.placement.set('bottom');
      fixture.detectChanges();
      component.close();
      fixture.detectChanges();
      component.open();
      expect(
        (overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-left')
      ).toBe(false);
      expect(
        (overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-right')
      ).toBe(false);
      expect(
        (overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-bottom')
      ).toBe(true);
      expect(
        (overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-top')
      ).toBe(false);
      component.close();
      fixture.detectChanges();
      component.placement.set('Invalid' as unknown as NzDrawerPlacement);
      fixture.detectChanges();
      component.open();
      expect(
        (overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-left')
      ).toBe(false);
      expect(
        (overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-right')
      ).toBe(false);
      expect(
        (overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-bottom')
      ).toBe(false);
      expect(
        (overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).classList.contains('ant-drawer-top')
      ).toBe(false);
      component.close();
      fixture.detectChanges();
    });

    it('should disable the transition when the placement changing', async () => {
      component.open();
      await stabilize(fixture, 300);
      expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.transition).toBe('');
      component.placement.set('top');
      fixture.detectChanges();
      expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.transition).toBe('none');
      expect(
        (overlayContainerElement.querySelector('.ant-drawer-content-wrapper') as HTMLElement).style.transition
      ).toBe('none');
      component.placement.set('right');
      fixture.detectChanges();
      component.close();
      await stabilize(fixture, 300);
      expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.transition).toBe('');
    });

    it('should ignore set transition when `noAnimation` is `true` ', async () => {
      component.noAnimation.set(true);
      fixture.detectChanges();
      component.open();
      await stabilize(fixture, 300);
      expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.transition).toBe('');
      component.placement.set('top');
      fixture.detectChanges();
      expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.transition).toBe('');
      expect(
        (overlayContainerElement.querySelector('.ant-drawer-content-wrapper') as HTMLElement).style.transition
      ).toBe('');
      fixture.detectChanges();
      component.close();
      component.placement.set('right');
      component.noAnimation.set(false);
      await stabilize(fixture, 300);
    });

    it('should nzOffsetX work', () => {
      component.open();
      component.placement.set('left');
      component.width.set('300px');
      component.offsetX.set(100);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.transform).toBe(
        'translateX(100px)'
      );
      fixture.detectChanges();
      component.placement.set('right');
      component.offsetX.set(100);
      fixture.detectChanges();
      expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.transform).toBe(
        'translateX(-100px)'
      );
      component.close();
      fixture.detectChanges();
    });

    it('should nzOffsetY work', () => {
      component.open();
      component.placement.set('top');
      component.height.set('300px');
      component.offsetY.set(100);
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.transform).toBe(
        'translateY(100px)'
      );
      fixture.detectChanges();
      component.placement.set('bottom');
      component.offsetY.set(100);
      fixture.detectChanges();
      expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.transform).toBe(
        'translateY(-100px)'
      );
      component.close();
      fixture.detectChanges();
    });

    it('should allow scroll', () => {
      component.placement.set('right');
      component.open();
      fixture.detectChanges();
      expect(
        (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-wrapper-body') as HTMLElement).style.height
      ).toBe('100%');
    });
  });
  describe('RTL', () => {
    let component: NzTestDrawerComponent;
    let fixture: ComponentFixture<NzTestDrawerComponent>;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideNzNoAnimation(), provideNzIconsTesting(), provideMockDirectionality()]
      });
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestDrawerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    beforeEach(
      testingInject([OverlayContainer], (oc: OverlayContainer) => {
        overlayContainerElement = oc.getContainerElement();
      })
    );

    afterEach(() => {
      component.close();
      fixture.detectChanges();
    });

    it('should className correct on dir change', () => {
      const dir = TestBed.inject(Directionality);
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-rtl')).toBe(false);

      dir.valueSignal.set('rtl');
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-rtl')).toBe(true);

      dir.valueSignal.set('ltr');
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-rtl')).toBe(false);
    });
  });
  describe('animation', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [provideNzIconsTesting()]
      });
    });

    it('should get correct mask animation class', () => {
      const fixture = TestBed.createComponent(NzDrawerComponent);
      expect(fixture.componentInstance['maskAnimationEnter']()).toBe('ant-drawer-mask-motion-enter');
      expect(fixture.componentInstance['maskAnimationLeave']()).toBe('ant-drawer-mask-motion-leave');
    });
  });
});

describe('NzDrawerService', () => {
  let component: NzTestDrawerWithServiceComponent;
  let fixture: ComponentFixture<NzTestDrawerWithServiceComponent>;
  let overlayContainer: OverlayContainer;
  let drawerService: NzDrawerService;
  let overlayContainerElement: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NzDrawerService, provideNzNoAnimation()]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTestDrawerWithServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => vi.useFakeTimers());

  beforeEach(
    testingInject([OverlayContainer, NzDrawerService], (oc: OverlayContainer, ds: NzDrawerService) => {
      overlayContainer = oc;
      drawerService = ds;
      overlayContainerElement = oc.getContainerElement();
    })
  );

  afterEach(() => {
    overlayContainer.ngOnDestroy();
  });

  afterEach(() => vi.useRealTimers());

  it('should create template content drawer', async () => {
    component.openTemplate();
    fixture.detectChanges();
    await flushDrawerAnimation(fixture);
    expect(component.templateDrawerRef?.getContentComponent()).toBeNull();
    expect(component.templateDrawerRef?.getContentComponentRef()).toBeNull();
    expect(component.templateOpenSpy).toHaveBeenCalled();
    fixture.detectChanges();
    (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-mask') as HTMLElement).click();
    await flushDrawerAnimation(fixture);
    expect(component.templateCloseSpy).toHaveBeenCalled();
    fixture.detectChanges();
  });

  it('should create component content drawer', async () => {
    const openSpy = vi.fn();
    const closeSpy = vi.fn().mockReturnValue(1);
    const drawerRef = drawerService.create({
      nzTitle: 'Service',
      nzFooter: 'Footer',
      nzContent: NzDrawerCustomComponent,
      nzContentParams: { value: 1 }
    });
    drawerRef.afterOpen.subscribe(openSpy);
    drawerRef.afterClose.subscribe(closeSpy);
    fixture.detectChanges();
    expect(openSpy).not.toHaveBeenCalled();
    expect(drawerRef.getContentComponent()).not.toBeNull();
    expect(drawerRef.getContentComponentRef()).not.toBeNull();
    await flushDrawerAnimation(fixture);
    expect(openSpy).toHaveBeenCalled();
    (overlayContainerElement.querySelector('.ant-drawer .close-btn') as HTMLElement).click();
    fixture.detectChanges();
    await flushDrawerAnimation(fixture);
    expect(closeSpy).toHaveBeenCalled();
    fixture.detectChanges();
    expect(drawerRef.getContentComponent()).toBeNull();
    expect(drawerRef.getContentComponentRef()).toBeNull();
  });

  it('should create a component drawer and use nzData instead of nzContentParams', async () => {
    const openSpy = vi.fn();
    const closeSpy = vi.fn().mockReturnValue(2);
    const drawerRef = drawerService.create({
      nzTitle: 'Service',
      nzFooter: 'Footer',
      nzContent: NzDrawerCustomComponent,
      nzContentParams: { value: 1 },
      nzData: { value: 2 }
    });
    drawerRef.afterOpen.subscribe(openSpy);
    drawerRef.afterClose.subscribe(closeSpy);
    fixture.detectChanges();
    expect(openSpy).not.toHaveBeenCalled();
    expect(drawerRef.getContentComponent()).not.toBeNull();
    expect(drawerRef.getContentComponentRef()).not.toBeNull();
    await flushDrawerAnimation(fixture);
    expect(openSpy).toHaveBeenCalled();
    (overlayContainerElement.querySelector('.ant-drawer .close-btn') as HTMLElement).click();
    fixture.detectChanges();
    await flushDrawerAnimation(fixture);
    expect(closeSpy).toHaveBeenCalled();
    fixture.detectChanges();
    expect(drawerRef.getContentComponent()).toBeNull();
    expect(drawerRef.getContentComponentRef()).toBeNull();
  });

  it('should `nzOnCancel` work', async () => {
    let canClose = false;
    const openSpy = vi.fn();
    const closeSpy = vi.fn().mockReturnValue(1);
    const drawerRef = drawerService.create({
      nzTitle: 'Service nzOnCancel',
      nzContent: NzDrawerCustomComponent,
      nzOnCancel: () => Promise.resolve(canClose)
    });
    drawerRef.afterOpen.subscribe(openSpy);
    drawerRef.afterClose.subscribe(closeSpy);
    fixture.detectChanges();
    expect(openSpy).not.toHaveBeenCalled();
    await flushDrawerAnimation(fixture);
    expect(openSpy).toHaveBeenCalled();
    (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-close') as HTMLElement).click();
    fixture.detectChanges();
    await flushDrawerAnimation(fixture);
    expect(closeSpy).not.toHaveBeenCalled();
    fixture.detectChanges();
    canClose = true;
    (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-close') as HTMLElement).click();
    fixture.detectChanges();
    await flushDrawerAnimation(fixture);
    expect(closeSpy).toHaveBeenCalled();
  });
});

async function stabilize<T>(fixture: ComponentFixture<T>, ms?: number): Promise<void> {
  fixture.detectChanges();
  await updateNonSignalsInput(fixture, ms);
  fixture.detectChanges();
}

async function flushDrawerAnimation<T>(fixture: ComponentFixture<T>): Promise<void> {
  fixture.detectChanges();
  vi.advanceTimersByTime(DRAWER_ANIMATE_DURATION);
  fixture.detectChanges();
  await Promise.resolve();
  fixture.detectChanges();
}

@Component({
  imports: [NzDrawerModule, NzIconModule],
  template: `
    <button (click)="open()">Open</button>
    <ng-template #closeIconTemplate>
      <nz-icon nzType="close-square" nzTheme="outline" />
    </ng-template>
    <ng-template #titleTemplate>
      <span class="custom-title">title</span>
      <button class="close-btn"></button>
    </ng-template>
    <ng-template #customFooter>
      <span class="custom-footer">footer</span>
      <button>Submit</button>
    </ng-template>
    <nz-drawer
      [nzMaskStyle]="{ color: 'gray' }"
      [nzBodyStyle]="{ color: 'gray' }"
      [nzMaskClosable]="maskClosable()"
      nzWrapClassName="test-class"
      [nzZIndex]="1001"
      [nzCloseIcon]="closeIcon()"
      [nzClosable]="closable()"
      [nzMask]="showMask()"
      [nzVisible]="visible()"
      [nzSize]="size()"
      [nzWidth]="width()"
      [nzHeight]="height()"
      [nzPlacement]="placement()"
      [nzNoAnimation]="noAnimation()"
      [nzTitle]="title()"
      [nzExtra]="extra()"
      [nzFooter]="footer()"
      [nzOffsetX]="offsetX()"
      [nzOffsetY]="offsetY()"
      (nzOnClose)="close()"
      (nzVisibleChange)="triggerVisible($event)"
    >
      <ng-container *nzDrawerContent>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </ng-container>
    </nz-drawer>
  `
})
class NzTestDrawerComponent {
  readonly visible = signal(false);
  readonly closable = signal(true);
  readonly maskClosable = signal(true);
  readonly showMask = signal(true);
  readonly title = signal<string | TemplateRef<{}>>('');
  readonly extra = signal<string | TemplateRef<{}>>('');
  readonly footer = signal<string | TemplateRef<{}>>('');
  stringTitle = 'test';
  readonly size = signal<'large' | 'default'>('default');
  readonly width = signal<string | number | undefined>(undefined);
  readonly height = signal<string | number | undefined>(undefined);
  readonly placement = signal<NzDrawerPlacement>('left');
  readonly noAnimation = signal(false);
  readonly closeIcon = signal<TemplateRef<void> | string>('close');
  readonly offsetX = signal(0);
  readonly offsetY = signal(0);
  triggerVisible = vi.fn();

  @ViewChild('titleTemplate', { static: false }) titleTemplateRef!: TemplateRef<{}>;
  @ViewChild('closeIconTemplate', { static: false }) closeIconTemplateRef!: TemplateRef<void>;
  @ViewChild('customFooter', { static: false }) templateFooter!: TemplateRef<{}>;
  @ViewChild(NzDrawerComponent, { static: false }) drawerComponent!: NzDrawerComponent;

  open(): void {
    this.visible.set(true);
  }

  close(): void {
    this.visible.set(false);
  }
}

@Component({
  template: `
    <ng-template #drawerTemplate>
      <span>Template</span>
    </ng-template>
  `
})
class NzTestDrawerWithServiceComponent {
  private readonly drawerService = inject(NzDrawerService);

  @ViewChild('drawerTemplate', { static: false }) drawerTemplate!: TemplateRef<{
    $implicit: number;
    drawerRef: NzDrawerRef;
  }>;
  templateOpenSpy = vi.fn();
  templateCloseSpy = vi.fn();
  templateDrawerRef?: NzDrawerRef;
  openTemplate(): void {
    this.templateDrawerRef = this.drawerService.create({
      nzTitle: 'Service',
      nzContent: this.drawerTemplate
    });

    this.templateDrawerRef.afterOpen.subscribe(this.templateOpenSpy);
    this.templateDrawerRef.afterClose.subscribe(this.templateCloseSpy);
  }
}

@Component({
  imports: [NzButtonModule],
  template: `
    <div>
      <p>Custom Component</p>
      <button class="close-btn" (click)="close()" nz-button>Close</button>
    </div>
  `
})
export class NzDrawerCustomComponent {
  readonly nzData = inject<{ value: string }>(NZ_DRAWER_DATA);
  private readonly drawerRef = inject(NzDrawerRef);

  @Input() value: NzSafeAny;

  close(): void {
    this.drawerRef.close(this.value);
  }
}
