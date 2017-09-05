import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NzBasicUploadComponent } from './nz-basic-upload.component';

describe('NzBasicUploadComponent', () => {
  let component: NzBasicUploadComponent;
  let fixture: ComponentFixture<NzBasicUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NzBasicUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzBasicUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
