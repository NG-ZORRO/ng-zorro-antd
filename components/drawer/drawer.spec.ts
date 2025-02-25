/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule, Dir, Direction } from '@angular/cdk/bidi';
import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Input, TemplateRef, ViewChild, inject } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  inject as testingInject,
  tick,
  waitForAsync
} from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzNoAnimationDirective } from 'ng-zorro-antd/core/no-animation';
import { dispatchKeyboardEvent } from 'ng-zorro-antd/core/testing';
import { NZ_DRAWER_DATA, NzDrawerPlacement } from 'ng-zorro-antd/drawer/drawer-options';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzDrawerRef } from './drawer-ref';
import { NzDrawerComponent } from './drawer.component';
import { NzDrawerModule } from './drawer.module';
import { NzDrawerService } from './drawer.service';

describe('NzDrawerComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations(), provideNzIconsTesting()]
    });
  }));

  describe('default', () => {
    let component: NzTestDrawerComponent;
    let fixture: ComponentFixture<NzTestDrawerComponent>;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    let forceScrollElement: HTMLElement;

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

    afterEach(fakeAsync(() => {
      component.close();
      document.body.removeChild(forceScrollElement);
      window.scroll(0, 0);
      overlayContainer.ngOnDestroy();
    }));

    it('should create', () => {
      expect(component).toBeTruthy();
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

    it('should block scroll', fakeAsync(() => {
      expect(document.documentElement!.classList).not.toContain('cdk-global-scrollblock');
      component.open();
      tick(300);
      fixture.detectChanges();
      expect(document.documentElement!.classList).toContain('cdk-global-scrollblock');
      component.close();
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
      expect(document.documentElement!.classList).not.toContain('cdk-global-scrollblock');
    }));

    it('should hied close button', () => {
      component.closable = false;
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
      component.closable = true;
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

      component.closeIcon = 'close-circle';
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer .anticon-close')).toBeNull();
      expect(overlayContainerElement.querySelector('.ant-drawer .anticon-close-circle')).toBeDefined();

      component.closeIcon = component.closeIconTemplateRef;
      fixture.detectChanges();

      expect(overlayContainerElement.querySelector('.ant-drawer .anticon-close')).toBeNull();
      expect(overlayContainerElement.querySelector('.ant-drawer .anticon-close-circle')).toBeNull();
      expect(overlayContainerElement.querySelector('.ant-drawer .anticon-close-square')).toBeDefined();
    });

    it('should not close when click mask', () => {
      expect(component.triggerVisible).toHaveBeenCalledTimes(1);
      component.maskClosable = false;
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
      component.maskClosable = true;
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
      component.showMask = false;
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('no-mask')).toBe(true);
      expect(overlayContainerElement.querySelector('.ant-drawer .ant-drawer-mask')).toBe(null);
      component.showMask = true;
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
      component.closable = true;
      component.open();
      fixture.detectChanges();

      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(overlayContainerElement.querySelector('.ant-drawer-header-close-only')).toBeTruthy();
      expect(overlayContainerElement.querySelector('.ant-drawer .ant-drawer-title')).toBe(null);
    });

    it('should not render title even with nzExtra', () => {
      component.extra = 'test';
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(overlayContainerElement.querySelector('.ant-drawer .ant-drawer-title')).toBe(null);
    });

    it('should support string extra', () => {
      component.closable = true;
      component.extra = component.stringTitle;
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(
        (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-extra') as HTMLElement).innerText.trim()
      ).toBe('test');
    });

    it('should support TemplateRef extra', () => {
      component.closable = true;
      component.extra = component.titleTemplateRef;
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(overlayContainerElement.querySelector('.ant-drawer .ant-drawer-extra .custom-title')).not.toBe(null);
    });

    it('should support string title', () => {
      component.title = component.stringTitle;
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(
        (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-title') as HTMLElement).innerText.trim()
      ).toBe('test');
    });

    it('should support TemplateRef title', () => {
      component.title = component.titleTemplateRef;
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(overlayContainerElement.querySelector('.ant-drawer .ant-drawer-title .custom-title')).not.toBe(null);
    });

    it('should support string footer', () => {
      component.footer = 'test';
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(
        (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-footer') as HTMLElement).innerText.trim()
      ).toBe('test');
    });

    it('should support TemplateRef footer', () => {
      component.footer = component.templateFooter;
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(overlayContainerElement.querySelector('.ant-drawer .ant-drawer-footer .custom-footer')).not.toBe(null);
    });

    it('should support custom width', () => {
      component.width = '500px';
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
      component.width = 520;
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
      component.height = '500px';
      component.placement = 'top';
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(
        (
          overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content-wrapper') as HTMLElement
        ).getBoundingClientRect().height
      ).toBe(500);
      component.placement = 'left';
      fixture.detectChanges();
    });

    it('should support custom number type height', () => {
      component.height = 520;
      component.placement = 'top';
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(
        (
          overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content-wrapper') as HTMLElement
        ).getBoundingClientRect().height
      ).toBe(520);
      component.placement = 'left';
      fixture.detectChanges();
    });

    it('should support large size width', () => {
      component.size = 'large';
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
      component.size = 'large';
      component.width = 520;
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
      component.size = 'large';
      component.placement = 'top';
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(
        (
          overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content-wrapper') as HTMLElement
        ).getBoundingClientRect().height
      ).toBe(736);
      component.placement = 'left';
      fixture.detectChanges();
    });

    it('should custom height priority higher than size', () => {
      component.size = 'large';
      component.height = 520;
      component.placement = 'top';
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect(
        (
          overlayContainerElement.querySelector('.ant-drawer .ant-drawer-content-wrapper') as HTMLElement
        ).getBoundingClientRect().height
      ).toBe(520);
      component.placement = 'left';
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
      component.placement = 'right';
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
      component.placement = 'top';
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
      component.placement = 'bottom';
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
      component.placement = 'Invalid' as unknown as NzDrawerPlacement;
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

    it('should disable the transition when the placement changing', fakeAsync(() => {
      component.open();
      tick(300);
      fixture.detectChanges();
      expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.transition).toBe('');
      component.placement = 'top';
      fixture.detectChanges();
      expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.transition).toBe('none');
      expect(
        (overlayContainerElement.querySelector('.ant-drawer-content-wrapper') as HTMLElement).style.transition
      ).toBe('none');
      component.placement = 'right';
      fixture.detectChanges();
      component.close();
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
      expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.transition).toBe('');
    }));

    it('should ignore set transition when `noAnimation` is `true` ', fakeAsync(() => {
      component.noAnimation = true;
      fixture.detectChanges();
      component.open();
      tick(300);
      fixture.detectChanges();
      expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.transition).toBe('');
      component.placement = 'top';
      fixture.detectChanges();
      expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.transition).toBe('');
      expect(
        (overlayContainerElement.querySelector('.ant-drawer-content-wrapper') as HTMLElement).style.transition
      ).toBe('');
      fixture.detectChanges();
      component.close();
      component.placement = 'right';
      component.noAnimation = false;
      fixture.detectChanges();
      tick(300);
      fixture.detectChanges();
    }));

    it('should nzOffsetX work', () => {
      component.open();
      component.placement = 'left';
      component.width = '300px';
      component.offsetX = 100;
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.transform).toBe(
        'translateX(100px)'
      );
      fixture.detectChanges();
      component.placement = 'right';
      component.offsetX = 100;
      fixture.detectChanges();
      expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.transform).toBe(
        'translateX(-100px)'
      );
      component.close();
      fixture.detectChanges();
    });

    it('should nzOffsetY work', () => {
      component.open();
      component.placement = 'top';
      component.height = '300px';
      component.offsetY = 100;
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-open')).toBe(true);
      expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.transform).toBe(
        'translateY(100px)'
      );
      fixture.detectChanges();
      component.placement = 'bottom';
      component.offsetY = 100;
      fixture.detectChanges();
      expect((overlayContainerElement.querySelector('.ant-drawer') as HTMLElement).style.transform).toBe(
        'translateY(-100px)'
      );
      component.close();
      fixture.detectChanges();
    });

    it('should allow scroll', () => {
      component.placement = 'right';
      component.open();
      fixture.detectChanges();
      expect(
        (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-wrapper-body') as HTMLElement).style.height
      ).toBe('100%');
    });
  });
  describe('RTL', () => {
    let component: NzTestDrawerRtlComponent;
    let fixture: ComponentFixture<NzTestDrawerRtlComponent>;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestDrawerRtlComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    beforeEach(
      testingInject([OverlayContainer], (oc: OverlayContainer) => {
        overlayContainerElement = oc.getContainerElement();
      })
    );

    it('should className correct on dir change', () => {
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-rtl')).toBe(true);

      fixture.componentInstance.direction = 'ltr';
      component.close();
      fixture.detectChanges();
      component.open();
      fixture.detectChanges();
      expect(overlayContainerElement.querySelector('.ant-drawer')!.classList.contains('ant-drawer-rtl')).toBe(false);
    });
  });
});

describe('NzDrawerService', () => {
  let component: NzTestDrawerWithServiceComponent;
  let fixture: ComponentFixture<NzTestDrawerWithServiceComponent>;
  let overlayContainer: OverlayContainer;
  let drawerService: NzDrawerService;
  let overlayContainerElement: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [NzDrawerService, provideNoopAnimations()]
    });
  }));

  beforeEach(waitForAsync(() => {
    fixture = TestBed.createComponent(NzTestDrawerWithServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

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

  it('should create template content drawer', fakeAsync(() => {
    component.openTemplate();
    fixture.detectChanges();
    tick(300);
    expect(component.templateDrawerRef?.getContentComponent()).toBeNull();
    expect(component.templateDrawerRef?.getContentComponentRef()).toBeNull();
    expect(component.templateOpenSpy).toHaveBeenCalled();
    fixture.detectChanges();
    (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-mask') as HTMLElement).click();
    tick(300);
    expect(component.templateCloseSpy).toHaveBeenCalled();
    fixture.detectChanges();
  }));

  it('should create component content drawer', fakeAsync(() => {
    const openSpy = jasmine.createSpy('afterOpen spy');
    const closeSpy = jasmine.createSpy('afterClose spy').and.returnValue(1);
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
    tick(300);
    expect(openSpy).toHaveBeenCalled();
    (overlayContainerElement.querySelector('.ant-drawer .close-btn') as HTMLElement).click();
    fixture.detectChanges();
    tick(300);
    expect(closeSpy).toHaveBeenCalled();
    fixture.detectChanges();
    expect(drawerRef.getContentComponent()).toBeNull();
    expect(drawerRef.getContentComponentRef()).toBeNull();
  }));

  it('should create a component drawer and use nzData instead of nzContentParams', fakeAsync(() => {
    const openSpy = jasmine.createSpy('afterOpen spy');
    const closeSpy = jasmine.createSpy('afterClose spy').and.returnValue(2);
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
    tick(300);
    expect(openSpy).toHaveBeenCalled();
    (overlayContainerElement.querySelector('.ant-drawer .close-btn') as HTMLElement).click();
    fixture.detectChanges();
    tick(300);
    expect(closeSpy).toHaveBeenCalled();
    fixture.detectChanges();
    expect(drawerRef.getContentComponent()).toBeNull();
    expect(drawerRef.getContentComponentRef()).toBeNull();
  }));

  it('should `nzOnCancel` work', fakeAsync(() => {
    let canClose = false;
    const openSpy = jasmine.createSpy('afterOpen spy');
    const closeSpy = jasmine.createSpy('afterClose spy').and.returnValue(1);
    const drawerRef = drawerService.create({
      nzTitle: 'Service nzOnCancel',
      nzContent: NzDrawerCustomComponent,
      nzOnCancel: () => Promise.resolve(canClose)
    });
    drawerRef.afterOpen.subscribe(openSpy);
    drawerRef.afterClose.subscribe(closeSpy);
    fixture.detectChanges();
    expect(openSpy).not.toHaveBeenCalled();
    tick(300);
    expect(openSpy).toHaveBeenCalled();
    (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-close') as HTMLElement).click();
    fixture.detectChanges();
    tick(300);
    expect(closeSpy).not.toHaveBeenCalled();
    fixture.detectChanges();
    canClose = true;
    (overlayContainerElement.querySelector('.ant-drawer .ant-drawer-close') as HTMLElement).click();
    fixture.detectChanges();
    tick(300);
    expect(closeSpy).toHaveBeenCalled();
  }));
});

@Component({
  imports: [NzDrawerModule, NzIconModule, NzNoAnimationDirective],
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
      [nzMaskClosable]="maskClosable"
      [nzWrapClassName]="'test-class'"
      [nzZIndex]="1001"
      [nzCloseIcon]="closeIcon"
      [nzClosable]="closable"
      [nzMask]="showMask"
      [nzVisible]="visible"
      [nzSize]="size"
      [nzWidth]="width"
      [nzHeight]="height"
      [nzPlacement]="placement"
      [nzNoAnimation]="noAnimation"
      [nzTitle]="title"
      [nzExtra]="extra"
      [nzFooter]="footer"
      [nzOffsetX]="offsetX"
      [nzOffsetY]="offsetY"
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
  visible = false;
  closable = true;
  maskClosable = true;
  showMask = true;
  title: string | TemplateRef<{}> = '';
  extra: string | TemplateRef<{}> = '';
  footer: string | TemplateRef<{}> = '';
  stringTitle = 'test';
  size: 'large' | 'default' = 'default';
  width?: string | number;
  height?: string | number;
  placement: NzDrawerPlacement = 'left';
  noAnimation = false;
  closeIcon!: TemplateRef<void> | string;
  offsetX = 0;
  offsetY = 0;
  triggerVisible = jasmine.createSpy('visibleChange');

  @ViewChild('titleTemplate', { static: false }) titleTemplateRef!: TemplateRef<{}>;
  @ViewChild('closeIconTemplate', { static: false }) closeIconTemplateRef!: TemplateRef<void>;
  @ViewChild('customFooter', { static: false }) templateFooter!: TemplateRef<{}>;
  @ViewChild(NzDrawerComponent, { static: false }) drawerComponent!: NzDrawerComponent;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
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
  @ViewChild('drawerTemplate', { static: false }) drawerTemplate!: TemplateRef<{
    $implicit: number;
    drawerRef: NzDrawerRef;
  }>;
  templateOpenSpy = jasmine.createSpy('template afterOpen spy');
  templateCloseSpy = jasmine.createSpy('template afterClose spy');
  templateDrawerRef?: NzDrawerRef;

  constructor(private drawerService: NzDrawerService) {}

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
  @Input() value: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  nzData: { value: string } = inject(NZ_DRAWER_DATA);

  constructor(private drawerRef: NzDrawerRef) {}

  close(): void {
    this.drawerRef.close(this.value);
  }
}

@Component({
  imports: [BidiModule, NzDrawerModule],
  template: `
    <div [dir]="direction">
      <nz-drawer [nzVisible]="visible" (nzOnClose)="close()">
        <ng-container *nzDrawerContent>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </ng-container>
      </nz-drawer>
    </div>
  `
})
export class NzTestDrawerRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction: Direction = 'rtl';
  visible = false;

  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
}
