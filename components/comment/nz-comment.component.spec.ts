import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NzCommentComponent } from './nz-comment.component';

describe('NzCommentComponent', () => {
  let component: NzCommentComponent;
  let fixture: ComponentFixture<NzCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NzCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NzCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
