import { NO_ERRORS_SCHEMA } from '@angular/core';
import { fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzDemoCardBasicComponent } from './demo/basic';
import { NzDemoCardBorderLessComponent } from './demo/border-less';
import { NzDemoCardFlexibleContentComponent } from './demo/flexible-content';
import { NzDemoCardGridCardComponent } from './demo/grid-card';
import { NzDemoCardInColumnComponent } from './demo/in-column';
import { NzDemoCardInnerComponent } from './demo/inner';
import { NzDemoCardLoadingComponent } from './demo/loading';
import { NzDemoCardMetaComponent } from './demo/meta';
import { NzDemoCardSimpleComponent } from './demo/simple';
import { NzDemoCardTabsComponent } from './demo/tabs';

import { NzCardComponent } from './nz-card.component';
import { NzCardModule } from './nz-card.module';

describe('card', () => {
  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ NzCardModule ],
      schemas     : [ NO_ERRORS_SCHEMA ],
      declarations: [
        NzDemoCardBasicComponent,
        NzDemoCardBorderLessComponent,
        NzDemoCardFlexibleContentComponent,
        NzDemoCardGridCardComponent,
        NzDemoCardInColumnComponent,
        NzDemoCardInnerComponent,
        NzDemoCardLoadingComponent,
        NzDemoCardMetaComponent,
        NzDemoCardSimpleComponent,
        NzDemoCardTabsComponent
      ]
    });
    TestBed.compileComponents();
  }));
  it('should basic work', () => {
    const fixture = TestBed.createComponent(NzDemoCardBasicComponent);
    const card = fixture.debugElement.query(By.directive(NzCardComponent));
    fixture.detectChanges();
    expect(card.nativeElement.classList).toContain('ant-card');
    expect(card.nativeElement.classList).toContain('ant-card-bordered');
    expect(card.nativeElement.querySelector('.ant-card-head-title').innerText).toBe('Card title');
    expect(card.nativeElement.querySelector('.ant-card-extra').innerText).toBe('More');
  });
  it('should border-less work', () => {
    const fixture = TestBed.createComponent(NzDemoCardBorderLessComponent);
    const card = fixture.debugElement.query(By.directive(NzCardComponent));
    fixture.detectChanges();
    expect(card.nativeElement.classList).toContain('ant-card');
    expect(card.nativeElement.classList).not.toContain('ant-card-bordered');
  });
  it('should simple work', () => {
    const fixture = TestBed.createComponent(NzDemoCardSimpleComponent);
    const card = fixture.debugElement.query(By.directive(NzCardComponent));
    fixture.detectChanges();
    expect(card.nativeElement.firstElementChild.classList).toContain('ant-card-body');
  });
  it('should flexible content work', () => {
    const fixture = TestBed.createComponent(NzDemoCardFlexibleContentComponent);
    const card = fixture.debugElement.query(By.directive(NzCardComponent));
    fixture.detectChanges();
    expect(card.nativeElement.classList).toContain('ant-card-hoverable');
    expect(card.nativeElement.firstElementChild.classList).toContain('ant-card-cover');
    expect(card.nativeElement.querySelector('.ant-card-meta-title').innerText).toBe('Europe Street beat');
    expect(card.nativeElement.querySelector('.ant-card-meta-description').innerText).toBe('www.instagram.com');
  });
  it('should in column work', () => {
    const fixture = TestBed.createComponent(NzDemoCardInColumnComponent);
    const card = fixture.debugElement.query(By.directive(NzCardComponent));
    fixture.detectChanges();
    expect(card.nativeElement.classList).toContain('ant-card');
  });
  it('should loading work', () => {
    const fixture = TestBed.createComponent(NzDemoCardLoadingComponent);
    const card = fixture.debugElement.query(By.directive(NzCardComponent));
    fixture.detectChanges();
    expect(card.nativeElement.classList).toContain('ant-card-loading');
    expect(card.nativeElement.querySelector('nz-card-loading').classList).toContain('ant-card-loading-content');
  });
  it('should grid work', () => {
    const fixture = TestBed.createComponent(NzDemoCardGridCardComponent);
    const card = fixture.debugElement.query(By.directive(NzCardComponent));
    fixture.detectChanges();
    expect(card.nativeElement.querySelector('.ant-card-body').firstElementChild.classList).toContain('ant-card-grid');
  });
  it('should inner work', () => {
    const fixture = TestBed.createComponent(NzDemoCardInnerComponent);
    const card = fixture.debugElement.query(By.directive(NzCardComponent));
    fixture.detectChanges();
    expect(card.nativeElement.classList).not.toContain('ant-card-type-inner');
    expect(card.nativeElement.querySelectorAll('.ant-card-type-inner').length).toBe(2);
  });
  it('should card work', () => {
    const fixture = TestBed.createComponent(NzDemoCardTabsComponent);
    const cards = fixture.debugElement.queryAll(By.directive(NzCardComponent));
    fixture.detectChanges();
    expect(cards[ 0 ].nativeElement.classList).toContain('ant-card-contain-tabs');
    expect(cards[ 0 ].nativeElement.firstElementChild.firstElementChild.classList).toContain('ant-card-head-wrapper');
    expect(cards[ 1 ].nativeElement.classList).toContain('ant-card-contain-tabs');
    expect(cards[ 1 ].nativeElement.firstElementChild.firstElementChild.classList).toContain('ant-card-head-wrapper');
  });
  it('should meta work', () => {
    const fixture = TestBed.createComponent(NzDemoCardMetaComponent);
    const card = fixture.debugElement.query(By.directive(NzCardComponent));
    fixture.detectChanges();
    expect(card.nativeElement.querySelector('.ant-card-actions').children.length).toBe(3);
  });
});
