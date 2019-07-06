import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTableComponent } from './date-table.component';

describe('DateTableComponent', () => {
  let component: DateTableComponent;
  let fixture: ComponentFixture<DateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
