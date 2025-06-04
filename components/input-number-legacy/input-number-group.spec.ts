/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule, Direction } from '@angular/cdk/bidi';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { dispatchFakeEvent } from 'ng-zorro-antd/core/testing';
import { NzSizeLDSType, NzStatus } from 'ng-zorro-antd/core/types';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzFormControlStatusType, NzFormModule } from '../form';
import { NzInputNumberGroupComponent } from './input-number-group.component';
import { NzInputNumberLegacyModule } from './input-number.module';

describe('input-number-group', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting()]
    });
  }));

  describe('input number group', () => {
    describe('addon', () => {
      let testComponent: NzTestInputNumberGroupAddonComponent;
      let fixture: ComponentFixture<NzTestInputNumberGroupAddonComponent>;
      let inputNumberGroupElement: HTMLElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputNumberGroupAddonComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputNumberGroupElement = fixture.debugElement.query(By.directive(NzInputNumberGroupComponent)).nativeElement;
      });

      it('should not show addon without before and after content', () => {
        expect(inputNumberGroupElement.firstElementChild!.classList).not.toContain('ant-input-number-group');
        expect(inputNumberGroupElement.firstElementChild!.classList).toContain('ant-input-number');
      });

      it('should before content string work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputNumberGroupElement.firstElementChild!.classList).toContain('ant-input-number-group');
        expect(inputNumberGroupElement.firstElementChild!.children.length).toBe(2);
        expect(inputNumberGroupElement.firstElementChild!.lastElementChild!.classList).toContain('ant-input-number');
        expect((inputNumberGroupElement.firstElementChild!.firstElementChild as HTMLElement).innerText).toBe('before');
      });

      it('should before content template work', () => {
        testComponent.beforeContent = testComponent.beforeTemplate;
        fixture.detectChanges();
        expect(inputNumberGroupElement.firstElementChild!.classList).toContain('ant-input-number-group');
        expect(inputNumberGroupElement.firstElementChild!.children.length).toBe(2);
        expect(inputNumberGroupElement.firstElementChild!.lastElementChild!.classList).toContain('ant-input-number');
        expect((inputNumberGroupElement.firstElementChild!.firstElementChild as HTMLElement).innerText).toBe(
          'beforeTemplate'
        );
      });

      it('should after content string work', () => {
        testComponent.afterContent = 'after';
        fixture.detectChanges();
        expect(inputNumberGroupElement.firstElementChild!.classList).toContain('ant-input-number-group');
        expect(inputNumberGroupElement.firstElementChild!.children.length).toBe(2);
        expect(inputNumberGroupElement.firstElementChild!.firstElementChild!.classList).toContain('ant-input-number');
        expect((inputNumberGroupElement.firstElementChild!.lastElementChild as HTMLElement).innerText).toBe('after');
      });

      it('should after content template work', () => {
        testComponent.afterContent = testComponent.afterTemplate;
        fixture.detectChanges();
        expect(inputNumberGroupElement.firstElementChild!.classList).toContain('ant-input-number-group');
        expect(inputNumberGroupElement.firstElementChild!.children.length).toBe(2);
        expect(inputNumberGroupElement.firstElementChild!.firstElementChild!.classList).toContain('ant-input-number');
        expect((inputNumberGroupElement.firstElementChild!.lastElementChild as HTMLElement).innerText).toBe(
          'afterTemplate'
        );
      });

      it('should size work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputNumberGroupElement.classList).toContain('ant-input-number-group-wrapper');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputNumberGroupElement.classList).toContain('ant-input-number-group-wrapper-lg');
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputNumberGroupElement.classList).toContain('ant-input-number-group-wrapper-sm');
      });
    });

    describe('affix', () => {
      let fixture: ComponentFixture<NzTestInputNumberGroupAffixComponent>;
      let testComponent: NzTestInputNumberGroupAffixComponent;
      let inputNumberGroupElement: HTMLElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputNumberGroupAffixComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputNumberGroupElement = fixture.debugElement.query(By.directive(NzInputNumberGroupComponent)).nativeElement;
      });

      it('should not show addon without before and after content', () => {
        expect(inputNumberGroupElement.firstElementChild!.classList).toContain('ant-input-number');
      });

      it('should before content string work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputNumberGroupElement.firstElementChild!.classList).toContain('ant-input-number-prefix');
        expect(inputNumberGroupElement.children.length).toBe(2);
        expect(inputNumberGroupElement.lastElementChild!.classList).toContain('ant-input-number');
        expect((inputNumberGroupElement.firstElementChild as HTMLElement).innerText).toBe('before');
      });

      it('should before content template work', () => {
        testComponent.beforeContent = testComponent.beforeTemplate;
        fixture.detectChanges();
        expect(inputNumberGroupElement.firstElementChild!.classList).toContain('ant-input-number-prefix');
        expect(inputNumberGroupElement.children.length).toBe(2);
        expect(inputNumberGroupElement.lastElementChild!.classList).toContain('ant-input-number');
        expect((inputNumberGroupElement.firstElementChild as HTMLElement).innerText).toBe('beforeTemplate');
      });

      it('should after content string work', () => {
        testComponent.afterContent = 'after';
        fixture.detectChanges();
        expect(inputNumberGroupElement.lastElementChild!.classList).toContain('ant-input-number-suffix');
        expect(inputNumberGroupElement.children.length).toBe(2);
        expect(inputNumberGroupElement.firstElementChild!.classList).toContain('ant-input-number');
        expect((inputNumberGroupElement.lastElementChild as HTMLElement).innerText).toBe('after');
      });

      it('should after content template work', () => {
        testComponent.afterContent = testComponent.afterTemplate;
        fixture.detectChanges();
        expect(inputNumberGroupElement.lastElementChild!.classList).toContain('ant-input-number-suffix');
        expect(inputNumberGroupElement.children.length).toBe(2);
        expect(inputNumberGroupElement.firstElementChild!.classList).toContain('ant-input-number');
        expect((inputNumberGroupElement.lastElementChild as HTMLElement).innerText).toBe('afterTemplate');
      });

      it('should size work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputNumberGroupElement.classList).toContain('ant-input-number-affix-wrapper');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputNumberGroupElement.classList).toContain('ant-input-number-affix-wrapper-lg');
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputNumberGroupElement.classList).toContain('ant-input-number-affix-wrapper-sm');
      });

      it('should disabled work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputNumberGroupElement.classList).not.toContain('ant-input-number-affix-wrapper-disabled');
        testComponent.disabled = true;
        fixture.detectChanges();
        expect(inputNumberGroupElement.classList).toContain('ant-input-number-affix-wrapper-disabled');
      });

      it('should focus work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputNumberGroupElement.classList).not.toContain('ant-input-number-affix-wrapper-focused');
        dispatchFakeEvent(inputNumberGroupElement, 'focus');
        fixture.detectChanges();
        expect(inputNumberGroupElement.classList).toContain('ant-input-number-affix-wrapper-focused');
      });
    });

    describe('multiple', () => {
      let fixture: ComponentFixture<NzTestInputNumberGroupMultipleComponent>;
      let testComponent: NzTestInputNumberGroupMultipleComponent;
      let inputNumberGroupElement: HTMLElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputNumberGroupMultipleComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputNumberGroupElement = fixture.debugElement.query(By.directive(NzInputNumberGroupComponent)).nativeElement;
      });

      it('should size work', () => {
        expect(inputNumberGroupElement.firstElementChild!.classList).not.toContain('ant-input-number-lg');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputNumberGroupElement.firstElementChild!.classList).toContain('ant-input-number-lg');
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputNumberGroupElement.firstElementChild!.classList).toContain('ant-input-number-sm');
      });
    });

    describe('col', () => {
      let fixture: ComponentFixture<NzTestInputNumberGroupColComponent>;
      let inputNumberGroupElement: HTMLElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputNumberGroupColComponent);
        fixture.detectChanges();
        inputNumberGroupElement = fixture.debugElement.query(By.directive(NzInputNumberGroupComponent)).nativeElement;
      });

      it('should size work', () => {
        expect(inputNumberGroupElement.querySelector('nz-input-number')!.classList).toContain('ant-input-number-lg');
      });
    });

    describe('mix', () => {
      let fixture: ComponentFixture<NzTestInputNumberGroupMixComponent>;
      let inputGroupElement: HTMLElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputNumberGroupMixComponent);
        fixture.detectChanges();
        inputGroupElement = fixture.debugElement.query(By.directive(NzInputNumberGroupComponent)).nativeElement;
      });

      it('should mix work', () => {
        expect(
          inputGroupElement.querySelector('.ant-input-number-affix-wrapper')!.nextElementSibling!.classList
        ).toContain('ant-input-number-group-addon');
      });
    });

    describe('status', () => {
      let fixture: ComponentFixture<NzTestInputNumberGroupWithStatusComponent>;
      let inputNumberGroupElement: DebugElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputNumberGroupWithStatusComponent);
        fixture.detectChanges();
        inputNumberGroupElement = fixture.debugElement.query(By.directive(NzInputNumberGroupComponent));
      });

      it('should className correct with prefix', () => {
        fixture.detectChanges();
        expect(inputNumberGroupElement.nativeElement.classList).toContain(
          'ant-input-number-affix-wrapper-status-error'
        );

        fixture.componentInstance.status = 'warning';
        fixture.detectChanges();
        expect(inputNumberGroupElement.nativeElement.className).toContain(
          'ant-input-number-affix-wrapper-status-warning'
        );

        fixture.componentInstance.status = '';
        fixture.detectChanges();
        expect(inputNumberGroupElement.nativeElement.className).not.toContain(
          'ant-input-number-affix-wrapper-status-warning'
        );
      });

      it('should className correct with addon', () => {
        fixture.componentInstance.isAddon = true;
        fixture.detectChanges();
        // re-query input element
        inputNumberGroupElement = fixture.debugElement.query(By.directive(NzInputNumberGroupComponent));
        expect(inputNumberGroupElement.nativeElement.classList).toContain(
          'ant-input-number-group-wrapper-status-error'
        );

        fixture.componentInstance.status = 'warning';
        fixture.detectChanges();
        expect(inputNumberGroupElement.nativeElement.className).toContain(
          'ant-input-number-group-wrapper-status-warning'
        );

        fixture.componentInstance.status = '';
        fixture.detectChanges();
        expect(inputNumberGroupElement.nativeElement.className).not.toContain(
          'ant-input-number-group-wrapper-status-warning'
        );
      });
    });

    describe('dir', () => {
      let fixture: ComponentFixture<NzTestInputNumberGroupWithDirComponent>;
      let inputNumberGroupElement: HTMLElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputNumberGroupWithDirComponent);
        fixture.detectChanges();
        inputNumberGroupElement = fixture.debugElement.query(By.directive(NzInputNumberGroupComponent)).nativeElement;
      });

      it('should dir work', () => {
        expect(inputNumberGroupElement.classList).not.toContain('ant-input-number-group-wrapper-rtl');
        fixture.componentInstance.dir = 'rtl';
        fixture.detectChanges();
        expect(inputNumberGroupElement.classList).toContain('ant-input-number-group-wrapper-rtl');
      });
    });

    describe('in form', () => {
      let fixture: ComponentFixture<NzTestInputNumberGroupInFormComponent>;
      let inputNumberGroupElement: DebugElement;

      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputNumberGroupInFormComponent);
        fixture.detectChanges();
        inputNumberGroupElement = fixture.debugElement.query(By.directive(NzInputNumberGroupComponent));
      });

      it('should className correct', () => {
        fixture.detectChanges();
        expect(inputNumberGroupElement.nativeElement.classList).toContain(
          'ant-input-number-affix-wrapper-status-error'
        );
        expect(inputNumberGroupElement.nativeElement.querySelector('nz-form-item-feedback-icon')).toBeTruthy();

        fixture.componentInstance.status = 'warning';
        fixture.detectChanges();
        expect(inputNumberGroupElement.nativeElement.classList).toContain(
          'ant-input-number-affix-wrapper-status-warning'
        );

        fixture.componentInstance.status = 'success';
        fixture.detectChanges();
        expect(inputNumberGroupElement.nativeElement.classList).toContain(
          'ant-input-number-affix-wrapper-status-success'
        );

        fixture.componentInstance.feedback = false;
        fixture.detectChanges();
        expect(inputNumberGroupElement.nativeElement.querySelector('nz-form-item-feedback-icon')).toBeNull();
      });

      it('should className correct with addon', () => {
        fixture.componentInstance.addon = 'before';
        fixture.detectChanges();
        fixture.componentInstance.status = 'warning';
        fixture.detectChanges();
        expect(inputNumberGroupElement.nativeElement.classList).toContain(
          'ant-input-number-group-wrapper-status-warning'
        );
        expect(inputNumberGroupElement.nativeElement.classList).not.toContain(
          'ant-input-number-affix-wrapper-status-warning'
        );
      });
    });
  });
});

@Component({
  imports: [NzInputNumberLegacyModule],
  template: `
    <nz-input-number-group [nzAddOnBefore]="beforeContent" [nzAddOnAfter]="afterContent" [nzSize]="size">
      <nz-input-number></nz-input-number>
    </nz-input-number-group>
    <ng-template #beforeTemplate>beforeTemplate</ng-template>
    <ng-template #afterTemplate>afterTemplate</ng-template>
  `
})
export class NzTestInputNumberGroupAddonComponent {
  @ViewChild('beforeTemplate', { static: false }) beforeTemplate!: TemplateRef<void>;
  @ViewChild('afterTemplate', { static: false }) afterTemplate!: TemplateRef<void>;
  beforeContent?: string | TemplateRef<void>;
  afterContent?: string | TemplateRef<void>;
  size: NzSizeLDSType = 'default';
}

@Component({
  imports: [NzInputNumberLegacyModule],
  template: `
    <nz-input-number-group [nzPrefix]="beforeContent" [nzSuffix]="afterContent" [nzSize]="size">
      <nz-input-number [nzDisabled]="disabled"></nz-input-number>
    </nz-input-number-group>
    <ng-template #beforeTemplate>beforeTemplate</ng-template>
    <ng-template #afterTemplate>afterTemplate</ng-template>
  `
})
export class NzTestInputNumberGroupAffixComponent {
  @ViewChild('beforeTemplate', { static: false }) beforeTemplate!: TemplateRef<void>;
  @ViewChild('afterTemplate', { static: false }) afterTemplate!: TemplateRef<void>;
  beforeContent?: string | TemplateRef<void>;
  afterContent?: string | TemplateRef<void>;
  size: NzSizeLDSType = 'default';
  disabled = false;
}

@Component({
  imports: [NzInputNumberLegacyModule],
  template: `
    <nz-input-number-group [nzSize]="size">
      <nz-input-number></nz-input-number>
      <nz-input-number></nz-input-number>
    </nz-input-number-group>
  `
})
export class NzTestInputNumberGroupMultipleComponent {
  size: NzSizeLDSType = 'default';
}

@Component({
  imports: [FormsModule, NzGridModule, NzInputNumberLegacyModule],
  template: `
    <nz-input-number-group nz-row nzSize="large">
      <div nz-col nzSpan="8">
        <nz-input-number [ngModel]="1234" [nzStep]="1"></nz-input-number>
      </div>
      <div nz-col nzSpan="8">
        <nz-input-number [ngModel]="5678" [nzStep]="1"></nz-input-number>
      </div>
    </nz-input-number-group>
  `
})
export class NzTestInputNumberGroupColComponent {}

@Component({
  imports: [NzInputNumberLegacyModule],
  template: `
    <nz-input-number-group nzPrefixIcon="user" nzAddOnAfter="@example.com">
      <nz-input-number></nz-input-number>
    </nz-input-number-group>
  `
})
export class NzTestInputNumberGroupMixComponent {}

@Component({
  imports: [NzIconModule, NzInputNumberLegacyModule],
  template: `
    @if (!isAddon) {
      <nz-input-number-group [nzPrefix]="prefixTemplateClock" [nzStatus]="status">
        <nz-input-number />
      </nz-input-number-group>
      <ng-template #prefixTemplateClock>
        <nz-icon nzType="clock-circle" nzTheme="outline" />
      </ng-template>
    } @else {
      <nz-input-number-group nzAddOnAfterIcon="setting" [nzStatus]="status">
        <nz-input-number />
      </nz-input-number-group>
    }
  `
})
export class NzTestInputNumberGroupWithStatusComponent {
  isAddon = false;
  status: NzStatus = 'error';
}

@Component({
  imports: [BidiModule, NzInputNumberLegacyModule],
  template: `
    <div [dir]="dir">
      <nz-input-number-group nzAddOnAfterIcon="setting">
        <nz-input-number></nz-input-number>
      </nz-input-number-group>
    </div>
  `
})
export class NzTestInputNumberGroupWithDirComponent {
  dir: Direction = 'ltr';
}

@Component({
  imports: [NzFormModule, NzInputNumberLegacyModule],
  template: `
    <form nz-form>
      <nz-form-item>
        <nz-form-control [nzHasFeedback]="feedback" [nzValidateStatus]="status">
          <nz-input-number-group [nzAddOnBefore]="addon">
            <nz-input-number></nz-input-number>
          </nz-input-number-group>
        </nz-form-control>
      </nz-form-item>
    </form>
  `
})
export class NzTestInputNumberGroupInFormComponent {
  status: NzFormControlStatusType = 'error';
  feedback = true;
  addon: string = '';
}
