// tslint:disable
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component, ViewChild, DebugElement, Injector } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { ZipButtonOptions, UploadFile } from './interface';
import { NzUploadBtnComponent } from './nz-upload-btn.component';
import { NzUploadModule } from './nz-upload.module';

const PNGSMALL = { target: { files: [ new File([`iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==`], 'test.png' ) ] } };
const LARGEFILE = {
  name: "test.png",
  size: 500001,
  type: "image/png"
};
const PNGBIG = { target: { files: { 0: LARGEFILE, length: 1, item: () => LARGEFILE } } };

describe('NzUpload：btn', () => {
  describe('component', () => {
    let fixture: ComponentFixture<TestComponent>;
    let dl: DebugElement;
    let instance: TestComponent;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        declarations: [ NzUploadBtnComponent, TestComponent ]
      });
      fixture = TestBed.createComponent(TestComponent);
      dl = fixture.debugElement;
      instance = dl.componentInstance;
      fixture.detectChanges();
    });

    it('should create an instance', () => {
      expect(instance).toBeTruthy();
    });
  });

  describe('methods', () => {
    let injector: Injector;
    let fixture: ComponentFixture<NzUploadBtnComponent>;
    let comp: NzUploadBtnComponent;
    let http: HttpTestingController;
    beforeEach(() => {
      injector = TestBed.configureTestingModule({
        imports: [ HttpClientTestingModule ],
        declarations: [ NzUploadBtnComponent ]
      });
      (injector as TestBed).compileComponents();
      fixture = TestBed.createComponent(NzUploadBtnComponent);
      comp = fixture.debugElement.componentInstance;
      comp.options = <ZipButtonOptions>{
        action: '/test',
        accept: 'image/png',
        filters: [],
        data: { a: 1 },
        headers: { token: 'asdf' },
        name: 'avatar',
        multiple: true,
        withCredentials: true,
        beforeUpload: () => true,
        onStart: (file: any) => { },
        onProgress: () => { },
        onSuccess: () => { },
        onError: () => { }
      };
      http = injector.get(HttpTestingController);
    });

    it('should uploading a png file', fakeAsync(() => {
      spyOn(comp.options, 'onStart');
      spyOn(comp.options, 'onProgress');
      spyOn(comp.options, 'onSuccess');
      comp.onChange(PNGSMALL);
      tick(1);
      const req = http.expectOne('/test');
      req.event({ type: 1, loaded: 10, total: 100 })
      req.flush('ok');
      expect(comp.options.onProgress).toHaveBeenCalled();
      expect(comp.options.onStart).toHaveBeenCalled();
      expect(comp.options.onSuccess).toHaveBeenCalled();
    }));

    it('should contain the parameters of http request', fakeAsync(() => {
      comp.onChange(PNGSMALL);
      tick(1);
      const req = http.expectOne('/test');
      expect(req.request.withCredentials).toBe(true);
      expect(req.request.headers.get('token')).toBe('asdf');
      const body = req.request.body as FormData;
      expect(body.has('avatar')).toBe(true);
      expect(body.has('a')).toBe(true);
      req.flush('ok');
    }));

    it('should filter size', () => {
      spyOn(comp.options, 'onStart');
      comp.options.filters = [ { name: '', fn: (fileList: UploadFile[]) => fileList.filter(w => (w.size / 1024) <= this.nzSize) } ];
      comp.onChange(PNGBIG);
      expect(comp.options.onStart).not.toHaveBeenCalled();
    });

    it('should request when beforeUpload return false', () => {
      spyOn(comp.options, 'beforeUpload').and.returnValue(false);
      spyOn(comp.options, 'onStart');
      comp.onChange(PNGSMALL);
      expect(comp.options.beforeUpload).toHaveBeenCalled();
      expect(comp.options.onStart).not.toHaveBeenCalled();
    });

    it('should error if request error', fakeAsync(() => {
      spyOn(comp.options, 'onStart');
      spyOn(comp.options, 'onSuccess');
      spyOn(comp.options, 'onError');
      comp.onChange(PNGSMALL);
      tick(1);
      http.expectOne('/test').error(<any>{ status: 403 });
      expect(comp.options.onStart).toHaveBeenCalled();
      expect(comp.options.onError).toHaveBeenCalled();
      expect(comp.options.onSuccess).not.toHaveBeenCalled();
    }));

    it('should custom request', () => {
      comp.options.customRequest = () => of(true).subscribe(() => {});
      spyOn(comp.options, 'customRequest');
      comp.onChange(PNGSMALL);
      expect(comp.options.customRequest).toHaveBeenCalled();
    });
  });
});

@Component({
  template: `<div nz-upload-btn #upload [options]="options" [classes]="classes">UPLAOD</div>`
})
class TestComponent {
  @ViewChild('upload') comp: NzUploadBtnComponent;
  classes: string[] = [ 'test' ];
  options: ZipButtonOptions = {
    filters: []
  };
}
