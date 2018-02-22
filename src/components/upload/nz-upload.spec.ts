// tslint:disable
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { Component, Injector, ViewChild, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NzLocaleModule } from '../locale/nz-locale.module';
import { NzUploadModule } from './nz-upload.module';
import { NzUploadComponent } from './nz-upload.component';

describe('NzUpload', () => {
  let fixture: ComponentFixture<TestComponent>;
  let dl: DebugElement;
  let instance: TestComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule, NzUploadModule ],
      declarations: [ TestComponent ]
    });
    fixture = TestBed.createComponent(TestComponent);
    dl = fixture.debugElement;
    instance = dl.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(instance).toBeTruthy();
  });

  it('recreate bug https://github.com/NG-ZORRO/ng-zorro-antd/issues/1038', () => {
    expect(instance.ref._btnOptions.disabled).toBe(false);
    instance.fileList = [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }];
    fixture.detectChanges();
    expect(instance.ref._btnOptions.disabled).toBe(true);
  });
});

@Component({
  template: `<nz-upload #ref
  [(nzFileList)]="fileList"
  [nzDisabled]="fileList.length >= 1"
  [nzShowUploadList]="false">Upload</nz-upload>`
})
class TestComponent {

  @ViewChild('ref') ref: NzUploadComponent;

  fileList = [];

}
