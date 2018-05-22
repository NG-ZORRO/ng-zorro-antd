import { async, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzDemoBreadcrumbBasicComponent } from './demo/basic';
import { NzDemoBreadcrumbSeparatorComponent } from './demo/separator';
import { NzBreadCrumbItemComponent } from './nz-breadcrumb-item.component';
import { NzBreadCrumbComponent } from './nz-breadcrumb.component';
import { NzBreadCrumbModule } from './nz-breadcrumb.module';

describe('breadcrumb', () => {
  let testComponent;
  let fixture;
  describe('basic', () => {
    let items;
    let breadcrumb;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzBreadCrumbModule ],
        declarations: [ NzDemoBreadcrumbBasicComponent ],
        providers   : []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoBreadcrumbBasicComponent);
      testComponent = fixture.debugElement.componentInstance;
      items = fixture.debugElement.queryAll(By.directive(NzBreadCrumbItemComponent));
      breadcrumb = fixture.debugElement.query(By.directive(NzBreadCrumbComponent));
    });

    it('should have correct style', () => {
      fixture.detectChanges();
      expect(items.every(item => item.nativeElement.firstElementChild.classList.contains('ant-breadcrumb-link'))).toBe(true);
      expect(items.every(item => item.nativeElement.children[ 1 ].classList.contains('ant-breadcrumb-separator'))).toBe(true);
      expect(breadcrumb.nativeElement.classList.contains('ant-breadcrumb')).toBe(true);
    });
  });
  describe('separator', () => {
    let items;
    let breadcrumbs;
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports     : [ NzBreadCrumbModule ],
        declarations: [ NzDemoBreadcrumbSeparatorComponent ],
        providers   : []
      }).compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(NzDemoBreadcrumbSeparatorComponent);
      testComponent = fixture.debugElement.componentInstance;
      items = fixture.debugElement.queryAll(By.directive(NzBreadCrumbItemComponent));
      breadcrumbs = fixture.debugElement.queryAll(By.directive(NzBreadCrumbComponent));
    });

    it('should nzSeparator work', () => {
      fixture.detectChanges();
      expect(items.every(item => item.nativeElement.firstElementChild.classList.contains('ant-breadcrumb-link'))).toBe(true);
      expect(items.every(item => item.nativeElement.children[ 1 ].classList.contains('ant-breadcrumb-separator'))).toBe(true);
      expect(breadcrumbs.every(breadcrumb => breadcrumb.nativeElement.classList.contains('ant-breadcrumb'))).toBe(true);
      expect(items[ 0 ].nativeElement.children[ 1 ].innerText.indexOf('>') > -1).toBe(true);
      expect(items[ 3 ].nativeElement.children[ 1 ].firstElementChild.classList.contains('anticon-arrow-right')).toBe(true);
    });
  });
});
