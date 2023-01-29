import { BidiModule, Dir } from '@angular/cdk/bidi';
import { Location } from '@angular/common';
import { Component, DebugElement, NO_ERRORS_SCHEMA, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

import { NzDemoPageHeaderActionsComponent } from './demo/actions';
import { NzDemoPageHeaderBasicComponent } from './demo/basic';
import { NzDemoPageHeaderBreadcrumbComponent } from './demo/breadcrumb';
import { NzDemoPageHeaderContentComponent } from './demo/content';
import { NzDemoPageHeaderGhostComponent } from './demo/ghost';
import { NzDemoPageHeaderResponsiveComponent } from './demo/responsive';
import { NzPageHeaderComponent } from './page-header.component';
import { NzPageHeaderModule } from './page-header.module';

describe('NzPageHeaderComponent', () => {
  let location: Location;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [BidiModule, NzPageHeaderModule, NzDropDownModule, NzIconTestModule, RouterTestingModule],
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [
          NzDemoPageHeaderBasicComponent,
          NzDemoPageHeaderBreadcrumbComponent,
          NzDemoPageHeaderContentComponent,
          NzDemoPageHeaderActionsComponent,
          NzDemoPageHeaderResponsiveComponent,
          NzDemoPageHeaderGhostComponent,
          NzDemoPageHeaderRtlComponent
        ]
      }).compileComponents();
      location = TestBed.inject(Location);
    })
  );

  it('should basic work', () => {
    const fixture = TestBed.createComponent(NzDemoPageHeaderBasicComponent);
    const pageHeader = fixture.debugElement.query(By.directive(NzPageHeaderComponent));
    fixture.detectChanges();
    expect(pageHeader.nativeElement.classList).toContain('ant-page-header');
    expect(pageHeader.nativeElement.classList).toContain('ant-page-header-ghost');
    expect(pageHeader.nativeElement.querySelector('.ant-page-header-heading-title')).toBeTruthy();
    expect(pageHeader.nativeElement.querySelector('.ant-page-header-heading-sub-title')).toBeTruthy();
  });

  it('should ghost work', () => {
    const fixture = TestBed.createComponent(NzDemoPageHeaderGhostComponent);
    const pageHeader = fixture.debugElement.query(By.directive(NzPageHeaderComponent));
    fixture.detectChanges();
    expect(pageHeader.nativeElement.classList).toContain('ant-page-header');
    expect(pageHeader.nativeElement.classList).not.toContain('ant-page-header-ghost');
  });

  it('should breadcrumb work', () => {
    const fixture = TestBed.createComponent(NzDemoPageHeaderBreadcrumbComponent);
    const pageHeader = fixture.debugElement.query(By.directive(NzPageHeaderComponent));
    fixture.detectChanges();
    expect(pageHeader.nativeElement.classList).toContain('has-breadcrumb');
    expect(pageHeader.nativeElement.querySelector('nz-breadcrumb[nz-page-header-breadcrumb]')).toBeTruthy();
  });

  it('should default call location back when nzBack not has observers', () => {
    const fixture = TestBed.createComponent(NzDemoPageHeaderResponsiveComponent);
    const pageHeader = fixture.debugElement.query(By.directive(NzPageHeaderComponent));
    spyOn(location, 'back');
    fixture.detectChanges();
    expect(location.back).not.toHaveBeenCalled();
    const back = pageHeader.nativeElement.querySelector('.ant-page-header-back');
    (back as HTMLElement).click();
    fixture.detectChanges();
    expect(location.back).toHaveBeenCalled();
  });

  it('should content work', () => {
    const fixture = TestBed.createComponent(NzDemoPageHeaderContentComponent);
    const pageHeader = fixture.debugElement.query(By.directive(NzPageHeaderComponent));
    fixture.detectChanges();
    const content = pageHeader.nativeElement.querySelector('nz-page-header-content.ant-page-header-content');
    expect(content).toBeTruthy();
    expect((content as HTMLElement).children.length > 0).toBe(true);
  });

  it('should actions work', () => {
    const fixture = TestBed.createComponent(NzDemoPageHeaderContentComponent);
    const pageHeader = fixture.debugElement.query(By.directive(NzPageHeaderComponent));
    fixture.detectChanges();
    expect(pageHeader.nativeElement.querySelector('nz-page-header-extra.ant-page-header-heading-extra')).toBeTruthy();
    expect(pageHeader.nativeElement.querySelector('nz-page-header-tags.ant-page-header-heading-tags')).toBeTruthy();
  });

  it('should footer work', () => {
    const fixture = TestBed.createComponent(NzDemoPageHeaderResponsiveComponent);
    const pageHeader = fixture.debugElement.query(By.directive(NzPageHeaderComponent));
    fixture.detectChanges();
    expect(pageHeader.nativeElement.classList).toContain('has-footer');
    expect(pageHeader.nativeElement.querySelector('nz-page-header-footer.ant-page-header-footer')).toBeTruthy();
  });

  it('should avatar work', () => {
    const fixture = TestBed.createComponent(NzDemoPageHeaderContentComponent);
    const pageHeader = fixture.debugElement.query(By.directive(NzPageHeaderComponent));
    fixture.detectChanges();
    expect(pageHeader.nativeElement.querySelector('nz-avatar[nz-page-header-avatar]')).toBeTruthy();
  });

  it('should have an default back icon', () => {
    const fixture = TestBed.createComponent(NzDemoPageHeaderBasicComponent);
    const pageHeader = fixture.debugElement.query(By.directive(NzPageHeaderComponent));
    fixture.detectChanges();
    expect(pageHeader.nativeElement.querySelector('.ant-page-header-back span.anticon-arrow-left')).toBeTruthy();
  });

  it('should does not have an default back icon', () => {
    const fixture = TestBed.createComponent(NzDemoPageHeaderContentComponent);
    const pageHeader = fixture.debugElement.query(By.directive(NzPageHeaderComponent));
    fixture.detectChanges();
    expect(pageHeader.nativeElement.querySelector('.ant-page-header-back')).toBeFalsy();
  });

  it('should nzBack work', () => {
    const fixture = TestBed.createComponent(NzDemoPageHeaderBasicComponent);
    const pageHeader = fixture.debugElement.query(By.directive(NzPageHeaderComponent));
    const context = fixture.componentInstance;
    spyOn(context, 'onBack');
    fixture.detectChanges();
    expect(context.onBack).not.toHaveBeenCalled();
    const back = pageHeader.nativeElement.querySelector('.ant-page-header-back');
    (back as HTMLElement).click();
    fixture.detectChanges();
    expect(context.onBack).toHaveBeenCalled();
  });

  describe('RTL', () => {
    let fixture: ComponentFixture<NzDemoPageHeaderRtlComponent>;
    let pageHeader: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoPageHeaderRtlComponent);
      pageHeader = fixture.debugElement.query(By.directive(NzPageHeaderComponent));
    });

    it('should className correct', () => {
      fixture.detectChanges();
      expect(pageHeader.nativeElement.classList).toContain('ant-page-header-rtl');
    });

    it('should className correct after change Dir', () => {
      fixture.detectChanges();
      expect(pageHeader.nativeElement.classList).toContain('ant-page-header-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();

      expect(pageHeader.nativeElement.classList).not.toContain('ant-page-header-rtl');
    });

    it('should have an default back icon', () => {
      fixture.detectChanges();
      expect(pageHeader.nativeElement.querySelector('.ant-page-header-back span.anticon-arrow-right')).toBeTruthy();
    });
  });
});

@Component({
  template: `
    <div [dir]="direction">
      <nz-demo-page-header-basic></nz-demo-page-header-basic>
    </div>
  `
})
export class NzDemoPageHeaderRtlComponent {
  @ViewChild(Dir) dir!: Dir;
  direction = 'rtl';
}
