/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { BidiModule, Dir, Direction } from '@angular/cdk/bidi';
import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';

import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzCollapsePanelComponent } from './collapse-panel.component';
import { NzCollapseComponent } from './collapse.component';
import { NzCollapseModule } from './collapse.module';

describe('collapse', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting(), provideNoopAnimations()]
    });
  }));
  describe('collapse basic', () => {
    let fixture: ComponentFixture<NzTestCollapseBasicComponent>;
    let testComponent: NzTestCollapseBasicComponent;
    let collapse: DebugElement;
    let panels: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestCollapseBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      collapse = fixture.debugElement.query(By.directive(NzCollapseComponent));
      panels = fixture.debugElement.queryAll(By.directive(NzCollapsePanelComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(collapse.nativeElement!.classList).toContain('ant-collapse');
      expect(panels.every(panel => panel.nativeElement.classList.contains('ant-collapse-item'))).toBe(true);
    });
    it('should border work', () => {
      fixture.detectChanges();
      expect(collapse.nativeElement!.classList).not.toContain('ant-collapse-borderless');
      testComponent.bordered = false;
      fixture.detectChanges();
      expect(collapse.nativeElement!.classList).toContain('ant-collapse-borderless');
    });
    it('should showArrow work', () => {
      fixture.detectChanges();
      expect(panels[0].nativeElement.querySelector('.ant-collapse-arrow').firstElementChild).toBeDefined();
      testComponent.showArrow = false;
      fixture.detectChanges();
      expect(panels[0].nativeElement.querySelector('.ant-collapse-arrow')).toBeNull();
    });
    it('should active work', () => {
      fixture.detectChanges();
      expect(panels[0].nativeElement.classList).not.toContain('ant-collapse-item-active');
      testComponent.active01 = true;
      fixture.detectChanges();
      expect(panels[0].nativeElement.classList).toContain('ant-collapse-item-active');
      expect(testComponent.active01Change).toHaveBeenCalledTimes(0);
    });
    it('should click work', () => {
      fixture.detectChanges();
      expect(panels[0].nativeElement.classList).not.toContain('ant-collapse-item-active');
      expect(testComponent.active01).toBe(false);
      panels[0].nativeElement.querySelector('.ant-collapse-header').click();
      fixture.detectChanges();
      expect(testComponent.active01).toBe(true);
      expect(panels[0].nativeElement.classList).toContain('ant-collapse-item-active');
      expect(testComponent.active01Change).toHaveBeenCalledTimes(1);
    });
    it('should disabled work', () => {
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(panels[1].nativeElement.classList).not.toContain('ant-collapse-item-active');
      expect(testComponent.active02).toBe(false);
      panels[1].nativeElement.querySelector('.ant-collapse-header').click();
      fixture.detectChanges();
      expect(testComponent.active02).toBe(false);
      expect(panels[1].nativeElement.classList).toContain('ant-collapse-item-disabled');
      expect(panels[1].nativeElement.classList).not.toContain('ant-collapse-item-active');
      expect(testComponent.active02Change).toHaveBeenCalledTimes(0);
    });
    it('should accordion work', () => {
      testComponent.accordion = true;
      fixture.detectChanges();
      expect(panels[0].nativeElement.classList).not.toContain('ant-collapse-item-active');
      expect(testComponent.active01).toBe(false);
      panels[0].nativeElement.querySelector('.ant-collapse-header').click();
      fixture.detectChanges();
      expect(testComponent.active01).toBe(true);
      expect(testComponent.active02).toBe(false);
      expect(panels[0].nativeElement.classList).toContain('ant-collapse-item-active');
      expect(panels[1].nativeElement.classList).not.toContain('ant-collapse-item-active');
      expect(testComponent.active01Change).toHaveBeenCalledTimes(1);
      expect(testComponent.active02Change).toHaveBeenCalledTimes(0);
      panels[1].nativeElement.querySelector('.ant-collapse-header').click();
      fixture.detectChanges();
      expect(testComponent.active01).toBe(false);
      expect(testComponent.active02).toBe(true);
      expect(panels[0].nativeElement.classList).not.toContain('ant-collapse-item-active');
      expect(panels[1].nativeElement.classList).toContain('ant-collapse-item-active');
      expect(testComponent.active01Change).toHaveBeenCalledTimes(2);
      expect(testComponent.active02Change).toHaveBeenCalledTimes(1);
    });
    it('should click to fold up work with accordion', () => {
      testComponent.accordion = true;
      fixture.detectChanges();
      expect(panels[0].nativeElement.classList).not.toContain('ant-collapse-item-active');
      expect(testComponent.active01).toBe(false);
      panels[0].nativeElement.querySelector('.ant-collapse-header').click();
      fixture.detectChanges();
      panels[1].nativeElement.querySelector('.ant-collapse-header').click();
      fixture.detectChanges();
      panels[0].nativeElement.querySelector('.ant-collapse-header').click();
      fixture.detectChanges();
      expect(testComponent.active01).toBe(true);
      expect(testComponent.active02).toBe(false);
      expect(panels[0].nativeElement.classList).toContain('ant-collapse-item-active');
      expect(panels[1].nativeElement.classList).not.toContain('ant-collapse-item-active');
      expect(testComponent.active01Change).toHaveBeenCalledTimes(3);
      expect(testComponent.active02Change).toHaveBeenCalledTimes(2);
      panels[0].nativeElement.querySelector('.ant-collapse-header').click();
      fixture.detectChanges();
      expect(testComponent.active01).toBe(false);
      expect(testComponent.active02).toBe(false);
      expect(panels[0].nativeElement.classList).not.toContain('ant-collapse-item-active');
      expect(panels[1].nativeElement.classList).not.toContain('ant-collapse-item-active');
      expect(testComponent.active01Change).toHaveBeenCalledTimes(4);
      expect(testComponent.active02Change).toHaveBeenCalledTimes(2);
    });
    it('should header work', () => {
      fixture.detectChanges();
      expect(panels[0].nativeElement.querySelector('.ant-collapse-header').innerText).toBe('string');
    });
    it('should extra work', () => {
      fixture.detectChanges();
      expect(panels[0].nativeElement.querySelector('.ant-collapse-extra')).toBeFalsy();

      testComponent.showExtra = 'Extra';
      fixture.detectChanges();
      const extraEl = panels[0].nativeElement.querySelector('.ant-collapse-extra');
      expect(extraEl!).not.toBeFalsy();
      expect(extraEl!.innerText).toBe('Extra');
    });
  });
  describe('collapse template', () => {
    let fixture: ComponentFixture<NzTestCollapseTemplateComponent>;
    let panels: DebugElement[];
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestCollapseTemplateComponent);
      fixture.detectChanges();
      panels = fixture.debugElement.queryAll(By.directive(NzCollapsePanelComponent));
    });
    it('should header work', () => {
      fixture.detectChanges();
      expect(panels[0].nativeElement.querySelector('.ant-collapse-header').innerText).toBe('template');
    });
  });

  describe('collapse icon', () => {
    let fixture: ComponentFixture<NzTestCollapseIconComponent>;
    let panels: DebugElement[];
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestCollapseIconComponent);
      fixture.detectChanges();
      panels = fixture.debugElement.queryAll(By.directive(NzCollapsePanelComponent));
    });
    it('should icon work', () => {
      fixture.detectChanges();
      expect(panels[0].nativeElement.querySelector('.anticon-right')).toBeDefined();
      expect(panels[1].nativeElement.querySelector('.anticon-double-right')).toBeDefined();
      expect(panels[2].nativeElement.querySelector('.anticon-caret-right')).toBeDefined();
    });
  });

  describe('RTL', () => {
    it('should className correct on dir change', () => {
      const fixture = TestBed.createComponent(NzTestCollapseRtlComponent);
      const collapse = fixture.debugElement.query(By.directive(NzCollapseComponent));
      fixture.detectChanges();
      expect(collapse.nativeElement!.classList).toContain('ant-collapse-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(collapse.nativeElement!.classList).not.toContain('ant-collapse-rtl');
    });
  });
});

@Component({
  selector: 'nz-test-basic-collapse',
  imports: [NzCollapseModule],
  template: `
    <ng-template #headerTemplate>template</ng-template>
    <nz-collapse [nzAccordion]="accordion" [nzBordered]="bordered">
      <nz-collapse-panel
        [(nzActive)]="active01"
        (nzActiveChange)="active01Change($event)"
        [nzHeader]="header"
        [nzShowArrow]="showArrow"
        [nzExtra]="showExtra"
      >
        <p>Panel01</p>
      </nz-collapse-panel>
      <nz-collapse-panel [(nzActive)]="active02" (nzActiveChange)="active02Change($event)" [nzDisabled]="disabled">
        <p>Panel02</p>
      </nz-collapse-panel>
    </nz-collapse>
  `
})
export class NzTestCollapseBasicComponent {
  @ViewChild('headerTemplate', { static: false }) headerTemplate!: TemplateRef<void>;
  accordion = false;
  bordered = true;
  disabled = false;
  active01 = false;
  active02 = false;
  showArrow = true;
  showExtra = '';
  header = 'string';
  active01Change = jasmine.createSpy<NzSafeAny>('active01 callback');
  active02Change = jasmine.createSpy<NzSafeAny>('active02 callback');
}

@Component({
  imports: [NzCollapseModule],
  template: `
    <ng-template #headerTemplate>template</ng-template>
    <nz-collapse>
      <nz-collapse-panel [nzHeader]="headerTemplate">
        <p>Panel01</p>
      </nz-collapse-panel>
    </nz-collapse>
  `
})
export class NzTestCollapseTemplateComponent {}

@Component({
  imports: [NzIconModule, NzCollapseModule],
  template: `
    <nz-collapse>
      <nz-collapse-panel>
        <p>Panel01</p>
      </nz-collapse-panel>
      <nz-collapse-panel [nzExpandedIcon]="'double-right'">
        <p>Panel02</p>
      </nz-collapse-panel>
      <nz-collapse-panel [nzExpandedIcon]="expandedIcon">
        <p>Panel01</p>
      </nz-collapse-panel>
      <ng-template #expandedIcon>
        <nz-icon nzType="caret-right" class="ant-collapse-arrow" />
      </ng-template>
    </nz-collapse>
  `
})
export class NzTestCollapseIconComponent {}

@Component({
  imports: [BidiModule, NzTestCollapseBasicComponent],
  template: `
    <div [dir]="direction">
      <nz-test-basic-collapse></nz-test-basic-collapse>
    </div>
  `
})
export class NzTestCollapseRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction: Direction = 'rtl';
}
