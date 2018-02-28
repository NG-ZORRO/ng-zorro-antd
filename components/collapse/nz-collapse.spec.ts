import { Component, TemplateRef, ViewChild } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NzCollapsePanelComponent } from './nz-collapse-panel.component';
import { NzCollapseComponent } from './nz-collapse.component';
import { NzCollapseModule } from './nz-collapse.module';

describe('collapse', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzCollapseModule, NoopAnimationsModule ],
      declarations: [ NzTestCollapseBasicComponent, NzTestCollapseTemplateComponent ]
    });
    TestBed.compileComponents();
  }));
  describe('collapse basic', () => {
    let fixture;
    let testComponent;
    let collapse;
    let panels;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestCollapseBasicComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      collapse = fixture.debugElement.query(By.directive(NzCollapseComponent));
      panels = fixture.debugElement.queryAll(By.directive(NzCollapsePanelComponent));
    });
    it('should className correct', () => {
      fixture.detectChanges();
      expect(collapse.nativeElement.firstElementChild.classList).toContain('ant-collapse');
      expect(panels.every(panel => panel.nativeElement.classList.contains('ant-collapse-item'))).toBe(true);
    });
    it('should border work', () => {
      fixture.detectChanges();
      expect(collapse.nativeElement.firstElementChild.classList).not.toContain('ant-collapse-borderless');
      testComponent.bordered = false;
      fixture.detectChanges();
      expect(collapse.nativeElement.firstElementChild.classList).toContain('ant-collapse-borderless');
    });
    it('should showArrow work', () => {
      fixture.detectChanges();
      expect(panels[ 0 ].nativeElement.querySelector('.arrow')).toBeDefined();
      testComponent.showArrow = false;
      fixture.detectChanges();
      expect(panels[ 0 ].nativeElement.querySelector('.arrow')).toBeNull();
    });
    it('should active work', () => {
      fixture.detectChanges();
      expect(panels[ 0 ].nativeElement.classList).not.toContain('ant-collapse-item-active');
      testComponent.active01 = true;
      fixture.detectChanges();
      expect(panels[ 0 ].nativeElement.classList).toContain('ant-collapse-item-active');
      expect(testComponent.active01Change).toHaveBeenCalledTimes(0);
    });
    it('should click work', () => {
      fixture.detectChanges();
      expect(panels[ 0 ].nativeElement.classList).not.toContain('ant-collapse-item-active');
      expect(testComponent.active01).toBe(false);
      panels[ 0 ].nativeElement.querySelector('.ant-collapse-header').click();
      fixture.detectChanges();
      expect(testComponent.active01).toBe(true);
      expect(panels[ 0 ].nativeElement.classList).toContain('ant-collapse-item-active');
      expect(testComponent.active01Change).toHaveBeenCalledTimes(1);
    });
    it('should disabled work', () => {
      testComponent.disabled = true;
      fixture.detectChanges();
      expect(panels[ 1 ].nativeElement.classList).not.toContain('ant-collapse-item-active');
      expect(testComponent.active02).toBe(false);
      panels[ 1 ].nativeElement.querySelector('.ant-collapse-header').click();
      fixture.detectChanges();
      expect(testComponent.active02).toBe(false);
      expect(panels[ 1 ].nativeElement.classList).toContain('ant-collapse-item-disabled');
      expect(panels[ 1 ].nativeElement.classList).not.toContain('ant-collapse-item-active');
      expect(testComponent.active02Change).toHaveBeenCalledTimes(0);
    });
    it('should accordion work', () => {
      testComponent.accordion = true;
      fixture.detectChanges();
      expect(panels[ 0 ].nativeElement.classList).not.toContain('ant-collapse-item-active');
      expect(testComponent.active01).toBe(false);
      panels[ 0 ].nativeElement.querySelector('.ant-collapse-header').click();
      fixture.detectChanges();
      expect(testComponent.active01).toBe(true);
      expect(testComponent.active02).toBe(false);
      expect(panels[ 0 ].nativeElement.classList).toContain('ant-collapse-item-active');
      expect(panels[ 1 ].nativeElement.classList).not.toContain('ant-collapse-item-active');
      expect(testComponent.active01Change).toHaveBeenCalledTimes(1);
      expect(testComponent.active02Change).toHaveBeenCalledTimes(0);
      panels[ 1 ].nativeElement.querySelector('.ant-collapse-header').click();
      fixture.detectChanges();
      expect(testComponent.active01).toBe(false);
      expect(testComponent.active02).toBe(true);
      expect(panels[ 0 ].nativeElement.classList).not.toContain('ant-collapse-item-active');
      expect(panels[ 1 ].nativeElement.classList).toContain('ant-collapse-item-active');
      expect(testComponent.active01Change).toHaveBeenCalledTimes(2);
      expect(testComponent.active02Change).toHaveBeenCalledTimes(1);
    });
    it('should header work', () => {
      fixture.detectChanges();
      expect(panels[ 0 ].nativeElement.querySelector('.ant-collapse-header').innerText).toBe('string');
    });
  });
  describe('collapse template', () => {
    let fixture;
    let testComponent;
    let collapse;
    let panels;
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestCollapseTemplateComponent);
      fixture.detectChanges();
      testComponent = fixture.debugElement.componentInstance;
      collapse = fixture.debugElement.query(By.directive(NzCollapseComponent));
      panels = fixture.debugElement.queryAll(By.directive(NzCollapsePanelComponent));
    });
    it('should header work', () => {
      fixture.detectChanges();
      expect(panels[ 0 ].nativeElement.querySelector('.ant-collapse-header').innerText).toBe('template');
    });
  });
});

@Component({
  selector: 'nz-test-collapse-basic',
  template: `
    <ng-template #headerTemplate>template</ng-template>
    <nz-collapse [nzAccordion]="accordion" [nzBordered]="bordered">
      <nz-collapse-panel [(nzActive)]="active01" (nzActiveChange)="active01Change($event)" [nzHeader]="header" [nzShowArrow]="showArrow">
        <p>Panel01</p>
      </nz-collapse-panel>
      <nz-collapse-panel [(nzActive)]="active02" (nzActiveChange)="active02Change($event)" [nzDisabled]="disabled">
        <p>Panel02</p>
      </nz-collapse-panel>
    </nz-collapse>
  `
})
export class NzTestCollapseBasicComponent {
  @ViewChild('headerTemplate') headerTemplate: TemplateRef<void>;
  accordion = false;
  bordered = true;
  disabled = false;
  active01 = false;
  active02 = false;
  showArrow = false;
  header = 'string';
  active01Change = jasmine.createSpy('active01 callback');
  active02Change = jasmine.createSpy('active02 callback');
}

@Component({
  selector: 'nz-test-collapse-template',
  template: `
    <ng-template #headerTemplate>template</ng-template>
    <nz-collapse>
      <nz-collapse-panel [nzHeader]="headerTemplate">
        <p>Panel01</p>
      </nz-collapse-panel>
    </nz-collapse>
  `
})
export class NzTestCollapseTemplateComponent {
}
