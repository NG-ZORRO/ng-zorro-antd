import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NzTabSetComponent } from './tabset.component';

describe('NzTabSetComponent', () => {
  let component: NzTabSetComponent;
  let fixture: ComponentFixture<NzTabSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NzTabSetComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzTabSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
