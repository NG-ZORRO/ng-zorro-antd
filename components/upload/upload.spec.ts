// tslint:disable:no-any
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component, DebugElement, Injector, ViewChild, ViewEncapsulation } from '@angular/core';
import { fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { NzI18nModule, NzI18nService } from '../i18n';
import en_US from '../i18n/languages/en_US';
import { NzIconModule } from '../icon/nz-icon.module';
import { NzProgressModule } from '../progress/nz-progress.module';
import { NzToolTipModule } from '../tooltip/nz-tooltip.module';

import { ShowUploadListInterface, UploadChangeParam, UploadFile, UploadFilter, UploadListType, UploadType, UploadXHRArgs, ZipButtonOptions } from './interface';
import { NzUploadBtnComponent } from './nz-upload-btn.component';
import { NzUploadListComponent } from './nz-upload-list.component';
import { NzUploadComponent } from './nz-upload.component';

const FILECONTENT = [`iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==`];
const FILE = new File(FILECONTENT, null, { type: null });
const PNGSMALL = { target: { files: [new File(FILECONTENT, 'test.png', {
  type: 'image/png'
})] } };
const JPGSMALL = { target: { files: [new File(FILECONTENT, 'test.jpg', {
  type: 'image/jpg'
})] } };
const LARGEFILE = {
  name: 'test.png',
  size: 500001,
  type: 'image/png'
};
const PNGBIG = { target: { files: { 0: LARGEFILE, length: 1, item: () => LARGEFILE } } };

describe('upload', () => {

  it('should be throw error when not import HttpClient module', () => {
    expect(() => {
      TestBed.configureTestingModule({
        declarations: [NzUploadBtnComponent, TestUploadBtnComponent]
      }).createComponent(TestUploadBtnComponent);
    }).toThrow();
  });

  describe('component', () => {
    let injector: Injector;
    let fixture: ComponentFixture<TestUploadComponent>;
    let dl: DebugElement;
    let instance: TestUploadComponent;
    let pageObject: NzUploadPageObject;
    let httpMock: HttpTestingController;
    beforeEach(() => {
      injector = TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, HttpClientTestingModule, CommonModule, FormsModule, NzToolTipModule, NzProgressModule, NzI18nModule, NzIconModule],
        declarations: [NzUploadComponent, NzUploadListComponent, TestUploadComponent, NzUploadBtnComponent]
      });
      fixture = TestBed.createComponent(TestUploadComponent);
      dl = fixture.debugElement;
      instance = dl.componentInstance;
      fixture.detectChanges();
      pageObject = new NzUploadPageObject();
      httpMock = injector.get(HttpTestingController);
    });

    describe('[default]', () => {

      it('should be upload a file', () => {
        expect(instance._nzChange).toBeUndefined();
        pageObject.postFile(FILE);
        const req = httpMock.expectOne(instance.nzAction);
        pageObject.expectChange();
        req.flush({});
        pageObject.expectChange('success');
        httpMock.verify();
      });

      it('should notify progress when upload a large file', () => {
        pageObject.postLarge();
        const req = httpMock.expectOne(instance.nzAction);
        req.event({ type: 1, loaded: 0, total: 0 });
        pageObject.expectChange('progress');
        req.event({ type: 1, loaded: 10, total: 100 });
        pageObject.expectChange('progress');
        expect(instance._nzChange.event.percent).toBe(10);
        req.event({ type: 1, loaded: 20, total: 100 });
        expect(instance._nzChange.event.percent).toBe(20);
        req.flush({ status: 'ok' });
        httpMock.verify();
      });

      it('should be error when using 404 http', () => {
        pageObject.postLarge();
        const req = httpMock.expectOne(instance.nzAction);
        req.error(null, { status: 404, statusText: 'not found' });
        pageObject.expectChange('error');
        httpMock.verify();
      });

      it('should limit 2 file when allow multiple', () => {
        instance.nzLimit = 2;
        instance.nzMultiple = true;
        fixture.detectChanges();
        expect(instance._beforeUploadList.length).toBe(0);
        pageObject.postFile([
          ...PNGSMALL.target.files,
          ...PNGSMALL.target.files,
          ...PNGSMALL.target.files
        ]);
        expect(instance._beforeUploadList.length).toBe(instance.nzLimit);
      });

      it('should limit png file type', () => {
        instance.nzFileType = 'image/png';
        fixture.detectChanges();
        expect(instance._beforeUploadList.length).toBe(0);
        pageObject.postFile(JPGSMALL.target.files);
        expect(instance._beforeUploadList.length).toBe(0);
      });

      it('should limit 1kb size', () => {
        instance.nzSize = 1;
        fixture.detectChanges();
        expect(instance._beforeUploadList.length).toBe(0);
        pageObject.postLarge();
        expect(instance._beforeUploadList.length).toBe(0);
      });

      it('should be abort when user canceled', () => {
        pageObject.postLarge();
        const req = httpMock.expectOne(instance.nzAction);
        req.event({ type: 1, loaded: 10, total: 100 });
        pageObject.expectLength(1);
        pageObject.getByCss('.anticon-close').nativeElement.click();
        fixture.detectChanges();
        pageObject.expectLength(0);
        httpMock.verify();
      });

      it('should be removed via list', () => {
        instance.nzFileList = [{
          uid: 1,
          name: 'xxx.png',
          status: 'done',
          response: 'Server Error 500', // custom error message to show
          url: 'http://www.baidu.com/xxx.png'
        } as any];
        fixture.detectChanges();
        pageObject.expectLength(1);
        pageObject.getByCss('.anticon-close').nativeElement.click();
        fixture.detectChanges();
        pageObject.expectLength(0);
      });

      it('should be upload a file via drag', () => {
        instance.nzType = 'drag';
        fixture.detectChanges();
        instance.comp.fileDrop({ type: 'dragover' } as any);
        instance.comp.fileDrop({ type: 'dragover' } as any);
        fixture.detectChanges();
        expect(pageObject.getByCss('.ant-upload-drag-hover') != null).toBe(true);
      });

      it('should be show uploading status when via drag', () => {
        instance.nzType = 'drag';
        instance.nzFileList = [{
          uid: 1,
          name: 'xxx.png',
          status: 'uploading'
        } as any];
        fixture.detectChanges();
        expect(pageObject.getByCss('.ant-upload-drag-uploading') != null).toBe(true);
      });

      it('#i18n', () => {
        instance.nzFileList = [{
          uid: 1,
          name: 'xxx.png',
          status: 'done',
          response: 'Server Error 500', // custom error message to show
          url: 'http://www.baidu.com/xxx.png'
        } as any];
        fixture.detectChanges();
        injector.get(NzI18nService).setLocale(en_US);
        fixture.detectChanges();
        const removeFileText = (pageObject.getByCss('.anticon-close').nativeElement as HTMLElement).title;
        expect(removeFileText).toBe(en_US.Upload.removeFile);
      });
    });

    describe('property', () => {
      describe('[nzData]', () => {
        it('should custom form data vis function', () => {
          instance.nzData = (file: any) => {
            return { a: 1 };
          };
          fixture.detectChanges();
          pageObject.postSmall();
          const req = httpMock.expectOne(instance.nzAction);
          expect((req.request.body as FormData).get('a')).toBe('1');
          req.flush({});
          httpMock.verify();
        });

        it('should custom form data vis object', () => {
          instance.nzData = { a: 1 };
          fixture.detectChanges();
          pageObject.postSmall();
          const req = httpMock.expectOne(instance.nzAction);
          expect((req.request.body as FormData).get('a')).toBe('1');
          req.flush({});
          httpMock.verify();
        });

        it('should comst fileter', () => {
          instance.nzFilter = [
            { name: 'custom', fn: (a: any) => [] }
          ];
          fixture.detectChanges();
          expect(instance._beforeUploadList.length).toBe(0);
          pageObject.postLarge();
          expect(instance._beforeUploadList.length).toBe(0);
        });
      });

      it('[nzDisabled]', () => {
        instance.nzDisabled = true;
        fixture.detectChanges();
        expect(pageObject.getByCss('.ant-upload-disabled') != null).toBe(true);
      });

      describe('[nzHeaders]', () => {
        it('should custom form data vis function', () => {
          instance.nzHeaders = (file: any) => {
            return { a: '1' };
          };
          fixture.detectChanges();
          pageObject.postSmall();
          const req = httpMock.expectOne(instance.nzAction);
          expect(req.request.headers.get('a')).toBe('1');
          req.flush({});
          httpMock.verify();
        });

        it('should custom form data vis object', () => {
          instance.nzHeaders = { a: '1' };
          fixture.detectChanges();
          pageObject.postSmall();
          const req = httpMock.expectOne(instance.nzAction);
          expect(req.request.headers.get('a')).toBe('1');
          req.flush({});
          httpMock.verify();
        });

        it('should be allow null header', () => {
          instance.nzHeaders = null;
          fixture.detectChanges();
          pageObject.postSmall().expectChange();
        });
      });

      it('[nzType]', () => {
        instance.nzType = 'drag';
        fixture.detectChanges();
        expect(pageObject.getByCss('.ant-upload-drag') != null).toBe(true);
      });

      it('[nzShowButton]', () => {
        instance.nzShowButton = false;
        fixture.detectChanges();
        const btnAreaEl = pageObject.getByCss(`.ant-upload-${instance.nzType}`);
        expect(btnAreaEl.styles.display).toBe('none');
      });

      it('[nzWithCredentials]', () => {
        instance.nzWithCredentials = true;
        fixture.detectChanges();
        pageObject.postSmall();
        const req = httpMock.expectOne(instance.nzAction);
        expect(req.request.withCredentials).toBe(true);
        req.flush({});
        httpMock.verify();
      });

      describe('[nzBeforeUpload]', () => {
        it('should be allow null', () => {
          instance.beforeUpload = null;
          fixture.detectChanges();
          expect(instance._beforeUpload).toBe(false);
          pageObject.postSmall();
          expect(instance._beforeUpload).toBe(false);
        });
        describe('using observable', () => {
          it('can return same file', () => {
            let ret = false;
            instance.beforeUpload = (file: UploadFile, fileList: UploadFile[]): Observable<any> => {
              ret = true;
              return of(file);
            };
            fixture.detectChanges();
            pageObject.postSmall();
            expect(ret).toBe(true);
          });
          it('can return a string file', () => {
            let ret = false;
            instance.beforeUpload = (file: UploadFile, fileList: UploadFile[]): Observable<any> => {
              ret = true;
              return of('file');
            };
            fixture.detectChanges();
            pageObject.postSmall();
            expect(ret).toBe(true);
          });
          it('can return a blob file', () => {
            let ret = false;
            instance.beforeUpload = (file: UploadFile, fileList: UploadFile[]): Observable<any> => {
              ret = true;
              return of(new Blob([JSON.stringify(1, null, 2)], {type : 'application/json'}));
            };
            fixture.detectChanges();
            pageObject.postSmall();
            expect(ret).toBe(true);
          });
          it('cancel upload when returan a false value', () => {
            expect(instance._nzChange).toBeUndefined();
            instance.beforeUpload = (file: UploadFile, fileList: UploadFile[]): Observable<any> => {
              return of(false);
            };
            fixture.detectChanges();
            pageObject.postSmall();
            expect(instance._nzChange).toBeUndefined();
          });
        });
      });

      describe('[nzFilter]', () => {
        it('shoule be custom limit', () => {
          instance.nzMultiple = true;
          instance.nzLimit = 1;
          instance.nzFilter = [
            {
              name: 'limit',
              fn: (fileList: UploadFile[]) => fileList.slice(-instance.nzLimit)
            }
          ];
          fixture.detectChanges();
          expect(instance._beforeUploadList.length).toBe(0);
          pageObject.postFile([
            ...PNGSMALL.target.files,
            ...PNGSMALL.target.files,
            ...PNGSMALL.target.files
          ]);
          expect(instance._beforeUploadList.length).toBe(instance.nzLimit);
        });
        it('shoule be custom size', () => {
          instance.nzSize = 1;
          instance.nzFilter = [
            {
              name: 'size',
              fn: (fileList: UploadFile[]) => fileList.filter(w => (w.size / 1024) <= instance.nzSize)
            }
          ];
          fixture.detectChanges();
          expect(instance._beforeUploadList.length).toBe(0);
          pageObject.postLarge();
          expect(instance._beforeUploadList.length).toBe(0);
        });
        it('shoule be custom type', () => {
          instance.nzFileType = 'image/png';
          instance.nzFilter = [
            {
              name: 'type',
              fn: (fileList: UploadFile[]) => fileList.filter(w => ~[ instance.nzFileType ].indexOf(w.type))
            }
          ];
          fixture.detectChanges();
          expect(instance._beforeUploadList.length).toBe(0);
          pageObject.postFile(JPGSMALL.target.files);
          expect(instance._beforeUploadList.length).toBe(0);
        });
      });

      it('#nzFileList, should be allow empty', () => {
        instance.nzFileList = null;
        fixture.detectChanges();
        expect(instance._nzChange).toBeUndefined();
        pageObject.postFile(FILE);
        const req = httpMock.expectOne(instance.nzAction);
        pageObject.expectChange();
        req.flush({});
        pageObject.expectChange('success');
        httpMock.verify();
      });

      describe('[nzRemove]', () => {
        const INITCOUNT = 3;
        beforeEach(() => {
          instance.nzFileList = [
            {
              uid: 1,
              name: 'xxx.png',
              status: 'done',
              response: 'Server Error 500', // custom error message to show
              url: 'http://www.baidu.com/xxx.png'
            },
            {
              uid: 2,
              name: 'yyy.png',
              status: 'done',
              url: 'http://www.baidu.com/yyy.png'
            },
            {
              uid: 3,
              name: 'zzz.png',
              status: 'error',
              response: 'Server Error 500', // custom error message to show
              url: 'http://www.baidu.com/zzz.png'
            }
          ] as any[];
          fixture.detectChanges();
        });
        it('should be return a Observable', () => {
          instance.onRemove = () => of(false);
          fixture.detectChanges();
          expect(dl.queryAll(By.css('.anticon-close')).length).toBe(INITCOUNT);
          dl.query(By.css('.anticon-close')).nativeElement.click();
          expect(dl.queryAll(By.css('.anticon-close')).length).toBe(INITCOUNT);
        });
        it('should be return a Observable includes a delay operation', (done: () => void) => {
          const DELAY = 20;
          instance.onRemove = (file: UploadFile) => of(true).pipe(delay(DELAY));
          fixture.detectChanges();
          expect(dl.queryAll(By.css('.anticon-close')).length).toBe(INITCOUNT);
          dl.query(By.css('.anticon-close')).nativeElement.click();
          setTimeout(() => {
            expect(dl.queryAll(By.css('.anticon-close')).length).toBe(INITCOUNT - 1);
            done();
          }, DELAY + 1);
        });
        it('should be return a truth value', () => {
          instance.onRemove = () => true;
          fixture.detectChanges();
          expect(dl.queryAll(By.css('.anticon-close')).length).toBe(INITCOUNT);
          dl.query(By.css('.anticon-close')).nativeElement.click();
          expect(dl.queryAll(By.css('.anticon-close')).length).toBe(INITCOUNT - 1);
        });
        it('should be return a falsy value', () => {
          instance.onRemove = () => false;
          fixture.detectChanges();
          expect(dl.queryAll(By.css('.anticon-close')).length).toBe(INITCOUNT);
          dl.query(By.css('.anticon-close')).nativeElement.click();
          expect(dl.queryAll(By.css('.anticon-close')).length).toBe(INITCOUNT);
        });
        it('should be with null', () => {
          instance.onRemove = null;
          fixture.detectChanges();
          expect(dl.queryAll(By.css('.anticon-close')).length).toBe(INITCOUNT);
          dl.query(By.css('.anticon-close')).nativeElement.click();
          expect(dl.queryAll(By.css('.anticon-close')).length).toBe(INITCOUNT - 1);
        });
      });

      describe('[nzListType]', () => {
        describe(`should be only allow type is picture or picture-card generate thumbnail`, () => {
          it('with text', () => {
            instance.nzListType = 'text';
            fixture.detectChanges();
            pageObject.postSmall();
            fixture.detectChanges();
            expect(instance.comp.nzFileList[0].thumbUrl).toBeUndefined();
          });
          it('with picture', () => {
            instance.nzListType = 'picture';
            fixture.detectChanges();
            pageObject.postSmall();
            fixture.detectChanges();
            expect(instance.comp.nzFileList[0].thumbUrl).not.toBeUndefined();
          });
        });
      });
    });

    describe('CORS', () => {
      it('should be auto setting [X-Requested-With]', () => {
        pageObject.postSmall();
        const req = httpMock.expectOne(instance.nzAction);
        expect(req.request.headers.get('X-Requested-With')).toBe('XMLHttpRequest');
        req.flush({});
        httpMock.verify();
      });
      it('should be allow override [X-Requested-With]', () => {
        instance.nzHeaders = {
          'X-Requested-With': null
        };
        fixture.detectChanges();
        pageObject.postSmall();
        const req = httpMock.expectOne(instance.nzAction);
        expect(req.request.headers.has('X-Requested-With')).toBe(false);
        req.flush({});
        httpMock.verify();
      });
    });

    describe('[test boundary]', () => {
      it('clean a not exists request', () => {
        instance.comp.upload.reqs.test = null;
        instance.show = false;
        fixture.detectChanges();
        expect(true).toBe(true);
      });
    });

    class NzUploadPageObject {
      private files: any;
      constructor() {
        spyOn(this.btnComp, 'onClick').and.callFake(() => this.btnComp.onChange({ target: { files: this.files } } as any));
      }

      get btnEl(): DebugElement {
        return dl.query(By.directive(NzUploadBtnComponent));
      }

      get btnComp(): NzUploadBtnComponent {
        return this.btnEl.injector.get(NzUploadBtnComponent) as NzUploadBtnComponent;
      }

      getByCss(css: string): any {
        return dl.query(By.css(css));
      }

      postFile(files: any): this {
        this.files = Array.isArray(files) ? files : [ files ];
        this.btnEl.nativeElement.click();
        return this;
      }

      postSmall(): this {
        this.postFile(PNGSMALL.target.files);
        return this;
      }

      postLarge(): this {
        this.postFile(PNGBIG.target.files);
        return this;
      }

      expectChange(type: string = 'start'): this {
        expect(instance._nzChange.type).toBe(type);
        return this;
      }

      expectLength(value: number = 0): this {
        expect(instance.nzFileList.length).toBe(value);
        return this;
      }
    }
  });

  describe('list', () => {
    let fixture: ComponentFixture<TestUploadListComponent>;
    let dl: DebugElement;
    let instance: TestUploadListComponent;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [CommonModule, FormsModule, NzToolTipModule, NzProgressModule, NzI18nModule, NoopAnimationsModule, NzIconModule ],
        declarations: [NzUploadListComponent, TestUploadListComponent]
      });
      fixture = TestBed.createComponent(TestUploadListComponent);
      dl = fixture.debugElement;
      instance = dl.componentInstance;
      fixture.detectChanges();
    });

    describe('[listType]', () => {
      for (const type of [ 'text', 'picture', 'picture-card' ]) {
        it(`with [${type}]`, () => {
          instance.listType = type as UploadListType;
          fixture.detectChanges();
          expect(dl.query(By.css(`.ant-upload-list-${type}`)) != null).toBe(true);
        });
      }
    });

    it('[items]', () => {
      expect(dl.queryAll(By.css(`.ant-upload-list-item`)).length).toBe(instance.items.length);
    });

    describe('[icons]', () => {
      it('should be show preview', () => {
        expect(instance._onPreview).toBe(false);
        const actions = dl.queryAll(By.css('.ant-upload-list-item-actions'));
        expect(actions.length).toBe(instance.items.length);
        actions[0].query(By.css('a')).nativeElement.click();
        fixture.detectChanges();
        expect(instance._onPreview).toBe(true);
      });
      it('should be hide preview', () => {
        instance.icons = {
          showPreviewIcon: false,
          showRemoveIcon: true
        };
        fixture.detectChanges();
        const actions = dl.queryAll(By.css('.ant-upload-list-item-actions a'));
        expect(actions.length).toBe(0);
        expect(instance._onPreview).toBe(false);
      });
      it('should be show remove', () => {
        expect(instance._onRemove).toBe(false);
        const actions = dl.queryAll(By.css('.ant-upload-list-item-actions'));
        expect(actions.length).toBe(instance.items.length);
        actions[0].query(By.css('.anticon-delete')).nativeElement.click();
        fixture.detectChanges();
        expect(instance._onRemove).toBe(true);
      });
      it('should be hide remove', () => {
        instance.icons = {
          showPreviewIcon: true,
          showRemoveIcon: false
        };
        fixture.detectChanges();
        const actions = dl.queryAll(By.css('.ant-upload-list-item-actions .anticon-delete'));
        expect(actions.length).toBe(0);
        expect(instance._onRemove).toBe(false);
      });
    });

    describe('[onPreview]', () => {
      it('should be handle preview', () => {
        expect(instance._onPreview).toBe(false);
        dl.query(By.css('.ant-upload-list-item-actions a')).nativeElement.click();
        expect(instance._onPreview).toBe(true);
      });
      it('should be invalid handle preview when is a null', () => {
        expect(instance._onPreview).toBe(false);
        instance.onPreview = null;
        fixture.detectChanges();
        dl.query(By.css('.ant-upload-list-item-actions a')).nativeElement.click();
        expect(instance._onPreview).toBe(false);
      });
    });

    describe('[onRemove]', () => {
      it('should be handle remove', () => {
        expect(instance._onRemove).toBe(false);
        dl.query(By.css('.ant-upload-list-item-actions .anticon-delete')).nativeElement.click();
        expect(instance._onRemove).toBe(true);
      });
      it('should be invalid handle remove when is a null', () => {
        expect(instance._onRemove).toBe(false);
        instance.onRemove = null;
        fixture.detectChanges();
        dl.query(By.css('.ant-upload-list-item-actions .anticon-delete')).nativeElement.click();
        expect(instance._onRemove).toBe(false);
      });
    });
  });

  describe('btn', () => {
    describe('component', () => {
      let fixture: ComponentFixture<TestUploadBtnComponent>;
      let dl: DebugElement;
      let instance: TestUploadBtnComponent;
      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [HttpClientTestingModule, NzIconModule],
          declarations: [NzUploadBtnComponent, TestUploadBtnComponent]
        });
        fixture = TestBed.createComponent(TestUploadBtnComponent);
        dl = fixture.debugElement;
        instance = dl.componentInstance;
        fixture.detectChanges();
      });

      describe('should be trigger upload', () => {
        it('via onClick', () => {
          spyOn(instance.comp.file.nativeElement, 'click');
          expect(instance.comp.file.nativeElement.click).not.toHaveBeenCalled();
          instance.comp.onClick();
          expect(instance.comp.file.nativeElement.click).toHaveBeenCalled();
        });
        describe('via onKeyDown', () => {
          it('normal', () => {
            spyOn(instance.comp, 'onClick');
            expect(instance.comp.onClick).not.toHaveBeenCalled();
            instance.comp.onKeyDown({ key: 'Enter' } as any);
            expect(instance.comp.onClick).toHaveBeenCalled();
          });
          it('when expect Enter', () => {
            spyOn(instance.comp, 'onClick');
            expect(instance.comp.onClick).not.toHaveBeenCalled();
            instance.comp.onKeyDown({ key: 'A' } as any);
            expect(instance.comp.onClick).not.toHaveBeenCalled();
          });
        });
        describe('via Drop', () => {
          it('normal', () => {
            spyOn(instance.comp, 'uploadFiles');
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
            instance.comp.onFileDrop({
              type: 'dragend',
              dataTransfer: { files: [ FILE ] },
              preventDefault: () => {}
            } as any);
            expect(instance.comp.uploadFiles).toHaveBeenCalled();
          });
          it('when dragover event', () => {
            spyOn(instance.comp, 'uploadFiles');
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
            instance.comp.onFileDrop({ type: 'dragover', preventDefault: () => {} } as any);
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
          });
          it('limit gif using resource type', () => {
            instance.options.accept = 'image/gif';
            fixture.detectChanges();
            spyOn(instance.comp, 'uploadFiles');
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
            instance.comp.onFileDrop({ type: 'dragend', dataTransfer: { files: PNGSMALL.target.files }, preventDefault: () => {} } as any);
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
          });
          it('limit gif using file name', () => {
            instance.options.accept = '.gif';
            fixture.detectChanges();
            spyOn(instance.comp, 'uploadFiles');
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
            instance.comp.onFileDrop({ type: 'dragend', dataTransfer: { files: PNGSMALL.target.files }, preventDefault: () => {} } as any);
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
          });
          it('allow type image/*', () => {
            instance.options.accept = 'image/*';
            fixture.detectChanges();
            spyOn(instance.comp, 'uploadFiles');
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
            instance.comp.onFileDrop({ type: 'dragend', dataTransfer: { files: PNGSMALL.target.files }, preventDefault: () => {} } as any);
            expect(instance.comp.uploadFiles).toHaveBeenCalled();
          });
          it(`allow type [ 'image/png', 'image/jpg' ]`, () => {
            instance.options.accept = [ 'image/png', 'image/jpg' ];
            fixture.detectChanges();
            spyOn(instance.comp, 'uploadFiles');
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
            instance.comp.onFileDrop({ type: 'dragend', dataTransfer: { files: PNGSMALL.target.files }, preventDefault: () => {} } as any);
            expect(instance.comp.uploadFiles).toHaveBeenCalled();
          });
        });
        it('via onChange', () => {
          spyOn(instance.comp, 'uploadFiles');
          expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
          instance.comp.onChange(PNGSMALL as any);
          expect(instance.comp.uploadFiles).toHaveBeenCalled();
        });
        describe('via directory', () => {
          // tslint:disable:no-invalid-this
          // tslint:disable-next-line:typedef
          function Item(name) {
            this.name = name;
            this.toString = () => this.name;
          }
          const makeFileSystemEntry = (item) => {
            const isDirectory = Array.isArray(item.children);
            const ret = {
              isDirectory,
              isFile: !isDirectory,
              file: (handle) => {
                handle(new Item(item.name));
              },
              createReader: () => {
                return {
                  readEntries: handle => handle(item.children.map(makeFileSystemEntry))
                };
              }
            };
            return ret;
          };
          const makeDataTransferItem = (item) => ({ webkitGetAsEntry: () => makeFileSystemEntry(item) });
          beforeEach(() => instance.options.directory = true);
          it('should working', () => {
            spyOn(instance.comp, 'uploadFiles');
            const files = {
              name: 'foo',
              children: [
                {
                  name: 'bar',
                  children: [
                    {
                      name: 'is.webp'
                    }
                  ]
                }
              ]
            };
            instance.comp.onFileDrop({
              type: 'dragend',
              dataTransfer: {
                items: [makeDataTransferItem(files)]
              },
              preventDefault: () => {}
            } as any);
            expect(instance.comp.uploadFiles).toHaveBeenCalled();
          });
          it('should be ingore invalid extension', () => {
            instance.options.accept = ['.webp'];
            spyOn(instance.comp, 'uploadFiles');
            const files = {
              name: 'foo',
              children: [
                {
                  name: 'is.jpg'
                }
              ]
            };
            instance.comp.onFileDrop({
              type: 'dragend',
              dataTransfer: {
                items: [makeDataTransferItem(files)]
              },
              preventDefault: () => {}
            } as any);
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
          });
        });
      });

      describe('should be disabled upload', () => {
        beforeEach(() => {
          instance.options.disabled = true;
          fixture.detectChanges();
        });
        it('[onClick]', () => {
          spyOn(instance.comp, 'file');
          expect(instance.comp.file).not.toHaveBeenCalled();
          instance.comp.onClick();
          expect(instance.comp.file).not.toHaveBeenCalled();
        });
        it('[onKeyDown]', () => {
          spyOn(instance.comp, 'onClick');
          expect(instance.comp.onClick).not.toHaveBeenCalled();
          instance.comp.onKeyDown(null);
          expect(instance.comp.onClick).not.toHaveBeenCalled();
        });
        it('[onFileDrop]', () => {
          spyOn(instance.comp, 'uploadFiles');
          expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
          instance.comp.onFileDrop({ type: 'dragover', preventDefault: () => {} } as any);
          expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
        });
        it('[onChange]', () => {
          spyOn(instance.comp, 'uploadFiles');
          expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
          instance.comp.onChange(null);
          expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
        });
      });

      describe('when has destroy', () => {
        it('should be abort all uploading file', () => {
          instance.comp.onChange({
            target: {
              files: [
                ...PNGSMALL.target.files,
                ...JPGSMALL.target.files
              ]
            }
          } as any);
          expect(Object.keys(instance.comp.reqs).length).toBe(2);
          instance.comp.ngOnDestroy();
          expect(Object.keys(instance.comp.reqs).length).toBe(0);
        });
        it('should be subsequent uploading', () => {
          instance.comp.onChange(PNGSMALL as any);
          expect(Object.keys(instance.comp.reqs).length).toBe(1);
          instance.comp.ngOnDestroy();
          instance.comp.onChange(PNGSMALL as any);
          expect(Object.keys(instance.comp.reqs).length).toBe(0);
        });
      });
    });

    describe('methods', () => {
      let injector: Injector;
      let fixture: ComponentFixture<NzUploadBtnComponent>;
      let comp: NzUploadBtnComponent;
      let http: HttpTestingController;
      beforeEach(() => {
        injector = TestBed.configureTestingModule({
          imports: [HttpClientTestingModule],
          declarations: [NzUploadBtnComponent]
        });
        (injector as TestBed).compileComponents();
        fixture = TestBed.createComponent(NzUploadBtnComponent);
        comp = fixture.debugElement.componentInstance;
        comp.options = {
          action: '/test',
          accept: 'image/png',
          filters: [],
          data: { a: 1 },
          headers: { token: 'asdf' },
          name: 'avatar',
          multiple: true,
          withCredentials: true,
          beforeUpload: () => true,
          onStart: (file: {}) => {},
          onProgress: () => {},
          onSuccess: () => {},
          onError: () => {}
        } as ZipButtonOptions;
        http = injector.get(HttpTestingController);
      });

      it('should uploading a png file', fakeAsync(() => {
          spyOn(comp.options, 'onStart');
          spyOn(comp.options, 'onProgress');
          spyOn(comp.options, 'onSuccess');
          comp.onChange(PNGSMALL as any);
          tick(1);
          const req = http.expectOne('/test');
          req.event({ type: 1, loaded: 10, total: 100 });
          req.flush('ok');
          expect(comp.options.onProgress).toHaveBeenCalled();
          expect(comp.options.onStart).toHaveBeenCalled();
          expect(comp.options.onSuccess).toHaveBeenCalled();
        })
      );

      it('should contain the parameters of http request', fakeAsync(() => {
          comp.onChange(PNGSMALL as any);
          tick(1);
          const req = http.expectOne('/test');
          expect(req.request.withCredentials).toBe(true);
          expect(req.request.headers.get('token')).toBe('asdf');
          const body = req.request.body as FormData;
          expect(body.has('avatar')).toBe(true);
          expect(body.has('a')).toBe(true);
          req.flush('ok');
        })
      );

      it('should filter size', () => {
        spyOn(comp.options, 'onStart');
        comp.options.filters = [
          {
            name: '',
            fn: (fileList: UploadFile[]) => fileList.filter(w => w.size / 1024 <= 0)
          }
        ];
        comp.onChange(PNGBIG as any);
        expect(comp.options.onStart).not.toHaveBeenCalled();
      });

      it('should be no request when beforeUpload is false', () => {
        spyOn(comp.options, 'beforeUpload').and.returnValue(false);
        spyOn(comp.options, 'onStart');
        comp.onChange(PNGSMALL as any);
        expect(comp.options.beforeUpload).toHaveBeenCalled();
        expect(comp.options.onStart).not.toHaveBeenCalled();
      });

      it('should error when request error', fakeAsync(() => {
          spyOn(comp.options, 'onStart');
          spyOn(comp.options, 'onSuccess');
          spyOn(comp.options, 'onError');
          comp.onChange(PNGSMALL as any);
          tick(1);
          http.expectOne('/test').error({ status: 403 } as any);
          expect(comp.options.onStart).toHaveBeenCalled();
          expect(comp.options.onError).toHaveBeenCalled();
          expect(comp.options.onSuccess).not.toHaveBeenCalled();
        })
      );

      it('should custom request', () => {
        comp.options.customRequest = () => of(true).subscribe(() => {});
        spyOn(comp.options, 'customRequest');
        comp.onChange(PNGSMALL as any);
        expect(comp.options.customRequest).toHaveBeenCalled();
      });

      it('should be warn "Must return Subscription type in [nzCustomRequest] property"', () => {
        let warnMsg = '';
        console.warn = jasmine.createSpy().and.callFake(res => warnMsg = res);
        comp.options.customRequest = ((item: UploadXHRArgs) => { }) as any;
        comp.onChange(PNGSMALL as any);
        expect(warnMsg).toContain(`Must return Subscription type`);
      });
    });
  });
});

@Component({
  template: `
  <nz-upload #upload *ngIf="show"
    [nzType]="nzType"
    [nzLimit]="nzLimit"
    [nzSize]="nzSize"
    [nzFileType]="nzFileType"
    [nzAccept]="nzAccept"
    [nzAction]="nzAction"
    [nzBeforeUpload]="beforeUpload"
    [nzCustomRequest]="nzCustomRequest"
    [nzData]="nzData"
    [nzFilter]="nzFilter"
    [(nzFileList)]="nzFileList"
    [nzDisabled]="nzDisabled"
    [nzHeaders]="nzHeaders"
    [nzListType]="nzListType"
    [nzMultiple]="nzMultiple"
    [nzName]="nzName"
    [nzShowUploadList]="nzShowUploadList"
    [nzShowButton]="nzShowButton"
    [nzWithCredentials]="nzWithCredentials"
    [nzPreview]="onPreview"
    [nzRemove]="onRemove"
    [nzDirectory]="directory"
    (nzFileListChange)="nzFileListChange($event)"
    (nzChange)="nzChange($event)">
    <button nz-button>
      <i nz-icon type="upload"></i><span>Click to Upload</span>
    </button>
  </nz-upload>
  `
})
class TestUploadComponent {
  @ViewChild('upload') comp: NzUploadComponent;
  show = true;
  nzType: UploadType = 'select';
  nzLimit = 0;
  nzSize = 0;
  nzFileType: any;
  nzAccept = 'image/png';
  nzAction = '/upload';
  _beforeUpload = false;
  _beforeUploadList: UploadFile[] = [];
  beforeUpload: any = (file: UploadFile, fileList: UploadFile[]): any => {
    this._beforeUpload = true;
    this._beforeUploadList = fileList;
    return true;
  }
  nzCustomRequest: any;
  nzData: any;
  nzFilter: UploadFilter[] = [];
  nzFileList: UploadFile[] = [];
  nzDisabled = false;
  nzHeaders: any = {};
  nzListType: UploadListType = 'text';
  nzMultiple = false;
  nzName = 'file';
  nzShowUploadList: boolean | ShowUploadListInterface = true;
  nzShowButton = true;
  nzWithCredentials = false;
  _onPreview = false;
  onPreview = (file: UploadFile): void => {
    this._onPreview = true;
  }
  _onRemove = false;
  onRemove: (file: UploadFile) => boolean | Observable<boolean> = (file: UploadFile): boolean => {
    this._onRemove = true;
    return true;
  }
  _nzChange: UploadChangeParam;
  nzChange(value: UploadChangeParam): void { this._nzChange = value; }
  _nzFileListChange: any;
  nzFileListChange(value: any): void { this._nzChange = value; }
  directory = false;
}

@Component({
  template: `<nz-upload-list #list
  [listType]="listType"
  [items]="items"
  [icons]="icons"
  [onPreview]="onPreview"
  [onRemove]="onRemove"></nz-upload-list>`,
  styleUrls: [ './style/index.less' ],
  encapsulation: ViewEncapsulation.None
})
class TestUploadListComponent {
  @ViewChild('list') comp: NzUploadListComponent;
  listType: UploadListType = 'picture-card';
  items: any[] = [
    {
      uid: 1,
      name: 'xxx.png',
      status: 'done',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/xxx.png'
    },
    {
      uid: 2,
      name: 'yyy.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png'
    },
    {
      uid: 3,
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500', // custom error message to show
      url: 'http://www.baidu.com/zzz.png'
    }
  ];
  icons: ShowUploadListInterface = {
    showPreviewIcon: true,
    showRemoveIcon: true
  };
  _onPreview = false;
  onPreview = (file: UploadFile): void => {
    this._onPreview = true;
  }
  _onRemove = false;
  onRemove: any = (file: UploadFile): void => {
    this._onRemove = true;
  }
}

@Component({
  template: `<div nz-upload-btn #btn [options]="options" [classes]="classes">UPLAOD</div>`
})
class TestUploadBtnComponent {
  @ViewChild('btn') comp: NzUploadBtnComponent;
  classes: string[] = ['test'];
  options: ZipButtonOptions = {
    filters: [],
    customRequest: null,
    onStart: () => {},
    onError: () => {}
  };
}
