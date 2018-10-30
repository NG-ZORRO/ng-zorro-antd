import { CommonModule } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { async, fakeAsync, flush, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ArrowRightOutline } from '@ant-design/icons-angular/icons';

import { dispatchMouseEvent } from '../core/testing';
import { NzIconModule } from '../icon/nz-icon.module';
import { NZ_ICONS } from '../icon/nz-icon.service';

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
        imports     : [ NzBreadCrumbModule, NzIconModule ],
        declarations: [ NzDemoBreadcrumbSeparatorComponent ],
        providers   : [ { provide: NZ_ICONS, useValue: [ ArrowRightOutline ] } ]
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

  describe('auto generated', () => {
    let router: Router;
    let zone: NgZone;
    let breadcrumb;
    let items;

    it('should auto generating work', fakeAsync(() => {
      TestBed.configureTestingModule({
        imports     : [ CommonModule, NzBreadCrumbModule, RouterTestingModule.withRoutes(routes) ],
        declarations: [ NzBreadcrumbAutoGenerateDemoComponent, NzBreadcrumbNullComponent ]
      }).compileComponents();
      fixture = TestBed.createComponent(NzBreadcrumbAutoGenerateDemoComponent);
      testComponent = fixture.debugElement.componentInstance;
      breadcrumb = fixture.debugElement.query(By.directive(NzBreadCrumbComponent));
      zone = TestBed.get(NgZone);
      router = TestBed.get(Router);

      zone.run(() => {
        router.initialNavigation();
        // Generate breadcrumb items.
        router.navigate([ 'one', 'two', 'three', 'four' ]);
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        items = fixture.debugElement.queryAll(By.directive(NzBreadCrumbItemComponent));
        // Should generate 2 breadcrumbs when reaching out of the `data` scope.
        expect(breadcrumb.componentInstance.breadcrumbs.length).toBe(2);
        dispatchMouseEvent(items[ 1 ].nativeElement.querySelector('a'), 'click');
        // router.navigate([ 'one', 'two', 'three' ]);
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        expect(breadcrumb.componentInstance.breadcrumbs.length).toBe(2);
        router.navigate([ 'one', 'two' ]);
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        expect(breadcrumb.componentInstance.breadcrumbs.length).toBe(1);
        router.navigate([ 'one' ]);
        fixture.detectChanges();
        flush();
        fixture.detectChanges();
        // Shouldn't generate breadcrumb at all.
        expect(breadcrumb.componentInstance.breadcrumbs.length).toBe(0);
      });
    }));

    it('should raise error when RouterModule is not included', fakeAsync(() => {
      TestBed.configureTestingModule({
        imports     : [ NzBreadCrumbModule ], // no RouterTestingModule
        declarations: [ NzBreadcrumbAutoGenerateErrorDemoComponent ]
      });
      expect(() => {
        TestBed.compileComponents();
        fixture = TestBed.createComponent(NzBreadcrumbAutoGenerateErrorDemoComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
      }).toThrowError();
    }));
  });
});

@Component({
  selector: 'nz-breadcrumb-auto-generate-demo',
  template: `
    <nz-breadcrumb [nzAutoGenerate]="true"></nz-breadcrumb>
    <router-outlet></router-outlet>
    <router-outlet name="non-primary"></router-outlet>
  `
})
export class NzBreadcrumbAutoGenerateDemoComponent {
}

@Component({
  selector: 'nz-breadcrumb-auto-generate-error-demo',
  template: '<nz-breadcrumb [nzAutoGenerate]="true"></nz-breadcrumb>'
})
export class NzBreadcrumbAutoGenerateErrorDemoComponent {
}

@Component({
  selector: 'nz-breadcrumb-null',
  template: ''
})
export class NzBreadcrumbNullComponent {
}

const routes: Routes = [
  {
    path     : 'one',
    component: NzBreadcrumbAutoGenerateDemoComponent,
    children : [
      {
        path     : 'two',
        component: NzBreadcrumbNullComponent,
        data     : { breadcrumb: 'Layer 2' },
        children : [
          {
            path     : 'three',
            component: NzBreadcrumbNullComponent,
            data     : { breadcrumb: '' },
            children : [
              {
                path     : 'four',
                component: NzBreadcrumbNullComponent
              }
            ]
          }
        ]
      },
      {
        path     : 'two',
        outlet   : 'notprimary',
        component: NzBreadcrumbNullComponent
      }
    ]
  }
];
