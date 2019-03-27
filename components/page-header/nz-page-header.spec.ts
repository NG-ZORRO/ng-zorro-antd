import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzIconTestModule } from '../icon/nz-icon-test.module';
import { NzDemoPageHeaderActionsComponent } from './demo/actions';
import { NzDemoPageHeaderBasicComponent } from './demo/basic';
import { NzDemoPageHeaderBreadcrumbComponent } from './demo/breadcrumb';
import { NzDemoPageHeaderContentComponent } from './demo/content';

import { NzPageHeaderComponent } from './nz-page-header.component';
import { NzPageHeaderModule } from './nz-page-header.module';

describe('NzPageHeaderComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NzPageHeaderModule, NzIconTestModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        NzDemoPageHeaderBasicComponent,
        NzDemoPageHeaderBreadcrumbComponent,
        NzDemoPageHeaderContentComponent,
        NzDemoPageHeaderActionsComponent
      ]
    }).compileComponents();
  }));

  it('should basic work', () => {
    const fixture = TestBed.createComponent(NzDemoPageHeaderBasicComponent);
    const pageHeader = fixture.debugElement.query(By.directive(NzPageHeaderComponent));
    fixture.detectChanges();
    expect(pageHeader.nativeElement.classList).toContain('ant-page-header');
    expect(pageHeader.nativeElement.querySelector('.ant-page-header-title-view-title')).toBeTruthy();
    expect(pageHeader.nativeElement.querySelector('.ant-page-header-title-view-sub-title')).toBeTruthy();
  });

  it('should breadcrumb work', () => {
    const fixture = TestBed.createComponent(NzDemoPageHeaderBreadcrumbComponent);
    const pageHeader = fixture.debugElement.query(By.directive(NzPageHeaderComponent));
    fixture.detectChanges();
    expect(pageHeader.nativeElement.querySelector('nz-breadcrumb[nz-page-header-breadcrumb]')).toBeTruthy();
  });

  it('should content work', () => {
    const fixture = TestBed.createComponent(NzDemoPageHeaderContentComponent);
    const pageHeader = fixture.debugElement.query(By.directive(NzPageHeaderComponent));
    fixture.detectChanges();
    const content = pageHeader.nativeElement.querySelector('nz-page-header-content.ant-page-header-content-view');
    expect(content).toBeTruthy();
    expect((content as HTMLElement).children.length > 0).toBe(true);
  });

  it('should actions work', () => {
    const fixture = TestBed.createComponent(NzDemoPageHeaderActionsComponent);
    const pageHeader = fixture.debugElement.query(By.directive(NzPageHeaderComponent));
    fixture.detectChanges();
    expect(pageHeader.nativeElement.classList).toContain('ant-page-header-has-footer');
    expect(
      pageHeader.nativeElement.querySelector('nz-page-header-extra.ant-page-header-title-view-extra')
    ).toBeTruthy();
    expect(pageHeader.nativeElement.querySelector('nz-page-header-tags.ant-page-header-title-view-tags')).toBeTruthy();
    expect(pageHeader.nativeElement.querySelector('nz-page-header-footer.ant-page-header-footer')).toBeTruthy();
  });

  it('should have an default back icon', () => {
    const fixture = TestBed.createComponent(NzDemoPageHeaderBasicComponent);
    const pageHeader = fixture.debugElement.query(By.directive(NzPageHeaderComponent));
    fixture.detectChanges();
    expect(pageHeader.nativeElement.querySelector('.ant-page-header-back-icon > i.anticon-arrow-left')).toBeTruthy();
  });

  it('should does not have an default back icon', () => {
    const fixture = TestBed.createComponent(NzDemoPageHeaderContentComponent);
    const pageHeader = fixture.debugElement.query(By.directive(NzPageHeaderComponent));
    fixture.detectChanges();
    expect(pageHeader.nativeElement.querySelector('.ant-page-header-back-icon')).toBeFalsy();
  });

  it('should nzBack work', () => {
    const fixture = TestBed.createComponent(NzDemoPageHeaderBasicComponent);
    const pageHeader = fixture.debugElement.query(By.directive(NzPageHeaderComponent));
    const context = fixture.componentInstance;
    spyOn(context, 'onBack');
    fixture.detectChanges();
    expect(context.onBack).not.toHaveBeenCalled();
    const back = pageHeader.nativeElement.querySelector('.ant-page-header-back-icon');
    (back as HTMLElement).click();
    fixture.detectChanges();
    expect(context.onBack).toHaveBeenCalled();
  });
});
