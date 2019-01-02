import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NzPageHeaderComponent } from './nz-page-header.component';

describe('NzPageHeaderComponent', () => {
  let component: NzPageHeaderComponent;
  let fixture: ComponentFixture<NzPageHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NzPageHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
