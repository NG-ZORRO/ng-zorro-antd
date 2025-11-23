/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule, Direction } from '@angular/cdk/bidi';
import { Component, DebugElement, provideZoneChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { NzFourDirectionType, NzShapeSCType } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzFloatButtonGroupComponent } from './float-button-group.component';
import { NzFloatButtonModule } from './float-button.module';

describe('nz-float-button-group', () => {
  beforeEach(() => {
    // todo: use zoneless
    TestBed.configureTestingModule({
      providers: [provideNoopAnimations(), provideNzIconsTesting(), provideZoneChangeDetection()]
    });
  });

  describe('basic', () => {
    let fixture: ComponentFixture<NzTestFloatButtonGroupBasicComponent>;
    let testComponent: NzTestFloatButtonGroupBasicComponent;
    let resultEl: DebugElement;
    let groupComponent: NzFloatButtonGroupComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestFloatButtonGroupBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      resultEl = fixture.debugElement.query(By.directive(NzFloatButtonGroupComponent));
      groupComponent = resultEl.componentInstance;
    });

    it('basic', () => {
      fixture.detectChanges();
      expect(resultEl.nativeElement.classList).toContain('ant-float-btn-group-circle');
    });

    it('nzShape', () => {
      testComponent.nzShape = 'square';
      fixture.detectChanges();
      expect(resultEl.nativeElement.classList).toContain('ant-float-btn-group-square');
      const innerButtons = [
        ...groupComponent.nzFloatButtonComponents(),
        ...groupComponent.nzFloatButtonTopComponents()
      ];
      innerButtons.forEach(btn => {
        expect(btn.shape()).toBe('square');
      });
    });

    it('nzTrigger hover', () => {
      testComponent.nzTrigger = 'hover';
      fixture.detectChanges();
      resultEl.nativeElement.getElementsByClassName('ant-float-btn')[0].dispatchEvent(new MouseEvent('mouseover'));
      fixture.detectChanges();
      expect(resultEl.nativeElement.getElementsByClassName('anticon')[0].getAttribute('nztype') === 'close').toBe(true);
      expect(testComponent.isClick).toBe(true);
      resultEl.nativeElement.dispatchEvent(new MouseEvent('mouseleave'));
      fixture.detectChanges();
      expect(resultEl.nativeElement.getElementsByClassName('anticon')[0].getAttribute('nztype') === 'close').toBe(
        false
      );
      expect(testComponent.isClick).toBe(false);
    });

    it('nzTrigger click', () => {
      testComponent.nzTrigger = 'click';
      fixture.detectChanges();
      resultEl.nativeElement.getElementsByClassName('ant-btn')[0].dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();
      expect(resultEl.nativeElement.getElementsByClassName('anticon')[0].getAttribute('nztype') === 'close').toBe(true);
      expect(testComponent.isClick).toBe(true);
      resultEl.nativeElement.getElementsByClassName('ant-btn')[0].dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();
      expect(resultEl.nativeElement.getElementsByClassName('anticon')[0].getAttribute('nztype') === 'close').toBe(
        false
      );
      expect(testComponent.isClick).toBe(false);
    });

    it('nzOpen true', () => {
      testComponent.nzOpen = true;
      testComponent.nzTrigger = 'click';
      fixture.detectChanges();
      resultEl.nativeElement.getElementsByClassName('ant-btn')[0].dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();
      expect(resultEl.nativeElement.getElementsByClassName('anticon')[0].getAttribute('nztype') === 'close').toBe(true);
    });

    it('nzOpen false', () => {
      testComponent.nzOpen = false;
      testComponent.nzTrigger = 'click';
      fixture.detectChanges();
      resultEl.nativeElement.getElementsByClassName('ant-btn')[0].dispatchEvent(new MouseEvent('click'));
      fixture.detectChanges();
      expect(resultEl.nativeElement.getElementsByClassName('anticon')[0].getAttribute('nztype') === 'close').toBe(
        false
      );
    });

    describe('float-button-group placement', () => {
      it('should set correct class for nzPlacement top', () => {
        testComponent.nzTrigger = 'click';
        testComponent.nzPlacement = 'top';
        fixture.detectChanges();
        expect(resultEl.nativeElement.classList).toContain('ant-float-btn-group-top');
        // is not menu mode
        testComponent.nzTrigger = null;
        fixture.detectChanges();
        expect(resultEl.nativeElement.classList).not.toContain('ant-float-btn-group-top');
      });

      it('should set correct class for nzPlacement bottom', () => {
        testComponent.nzTrigger = 'click';
        testComponent.nzPlacement = 'bottom';
        fixture.detectChanges();
        expect(resultEl.nativeElement.classList).toContain('ant-float-btn-group-bottom');
        // is not menu mode
        testComponent.nzTrigger = null;
        fixture.detectChanges();
        expect(resultEl.nativeElement.classList).not.toContain('ant-float-btn-group-bottom');
      });

      it('should set correct class for nzPlacement left', () => {
        testComponent.nzTrigger = 'click';
        testComponent.nzPlacement = 'left';
        fixture.detectChanges();
        expect(resultEl.nativeElement.classList).toContain('ant-float-btn-group-left');
        // is not menu mode
        testComponent.nzTrigger = null;
        fixture.detectChanges();
        expect(resultEl.nativeElement.classList).not.toContain('ant-float-btn-group-left');
      });

      it('should set correct class for nzPlacement right', () => {
        testComponent.nzTrigger = 'click';
        testComponent.nzPlacement = 'right';
        fixture.detectChanges();
        expect(resultEl.nativeElement.classList).toContain('ant-float-btn-group-right');
        // is not menu mode
        testComponent.nzTrigger = null;
        fixture.detectChanges();
        expect(resultEl.nativeElement.classList).not.toContain('ant-float-btn-group-right');
      });

      it('should get correct animation class according to nzPlacement', () => {
        fixture.detectChanges();
        // @ts-ignore
        const { enterAnimation, leaveAnimation } = groupComponent;
        expect(enterAnimation()).toBe('ant-float-btn-enter-top');
        expect(leaveAnimation()).toBe('ant-float-btn-leave-top');
        testComponent.nzPlacement = 'right';
        fixture.detectChanges();
        expect(enterAnimation()).toBe('ant-float-btn-enter-right');
        expect(leaveAnimation()).toBe('ant-float-btn-leave-right');
      });
    });
  });

  describe('RTL', () => {
    let fixture: ComponentFixture<NzTestFloatButtonRtlComponent>;
    let resultEl: DebugElement;
    let groupComponent: NzFloatButtonGroupComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestFloatButtonRtlComponent);
      resultEl = fixture.debugElement.query(By.directive(NzFloatButtonGroupComponent));
      groupComponent = resultEl.componentInstance;
    });

    it('rtl', () => {
      fixture.detectChanges();
      // @ts-ignore
      expect(groupComponent.dir()).toBe('rtl');
      expect(resultEl.nativeElement.classList).toContain('ant-float-btn-group-rtl');
    });
  });
});

@Component({
  selector: 'nz-test-basic-float-button-group',
  imports: [NzFloatButtonModule, NzIconModule],
  template: `
    <nz-float-button-group
      nzIcon="question-circle"
      [nzShape]="nzShape"
      [nzTrigger]="nzTrigger"
      [nzOpen]="nzOpen"
      [nzPlacement]="nzPlacement"
      (nzOnOpenChange)="onClick($event)"
    />
  `
})
export class NzTestFloatButtonGroupBasicComponent {
  nzShape: NzShapeSCType = 'circle';
  nzTrigger: 'click' | 'hover' | null = null;
  nzOpen: boolean | null = null;
  nzPlacement: NzFourDirectionType = 'top';

  isClick: boolean = false;

  onClick(value: boolean): void {
    this.isClick = value;
  }
}

@Component({
  imports: [BidiModule, NzFloatButtonModule],
  template: `
    <div [dir]="direction">
      <nz-float-button-group />
    </div>
  `
})
export class NzTestFloatButtonRtlComponent {
  direction: Direction = 'rtl';
}
