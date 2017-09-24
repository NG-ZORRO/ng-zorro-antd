import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NzUploadComponent } from './nz-upload.component';

describe('NzUploadComponent', () => {
  let component: NzUploadComponent;
  let fixture: ComponentFixture<NzUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NzUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
