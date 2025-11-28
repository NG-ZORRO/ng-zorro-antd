/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { ENTER, TAB } from '@angular/cdk/keycodes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import {
  ApplicationRef,
  Component,
  DebugElement,
  provideZoneChangeDetection,
  TemplateRef,
  ViewChild
} from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Observable, Observer, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { dispatchKeyboardEvent } from 'ng-zorro-antd/core/testing';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzI18nService } from 'ng-zorro-antd/i18n';
import en_US from 'ng-zorro-antd/i18n/languages/en_US';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';
import { NzUploadModule } from 'ng-zorro-antd/upload/upload.module';

import {
  NzIconRenderTemplate,
  NzShowUploadList,
  NzUploadChangeParam,
  NzUploadFile,
  NzUploadListType,
  NzUploadTransformFileType,
  NzUploadType,
  UploadFilter,
  ZipButtonOptions
} from './interface';
import { NzUploadBtnComponent } from './upload-btn.component';
import { NzUploadListComponent } from './upload-list.component';
import { NzUploadComponent } from './upload.component';

const FILE_CONTENT = [
  `iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==`
];
const FILE = new File(FILE_CONTENT, '');
const PNG_SMALL = {
  target: {
    files: [
      new File(FILE_CONTENT, 'test.png', {
        type: 'image/png'
      })
    ]
  }
};
const JPG_SMALL = {
  target: {
    files: [
      new File(FILE_CONTENT, 'test.jpg', {
        type: 'image/jpg'
      })
    ]
  }
};
const LARGE_FILE = {
  name: 'test.png',
  size: 500001,
  type: 'image/png'
};
const PNG_BIG = { target: { files: { 0: LARGE_FILE, length: 1, item: () => LARGE_FILE } } };

class Item {
  children?: Item[];
  constructor(public name: string) {}
}

describe('upload', () => {
  describe('component', () => {
    let fixture: ComponentFixture<TestUploadComponent>;
    let dl: DebugElement;
    let instance: TestUploadComponent;
    let pageObject: NzUploadPageObject;
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        providers: [
          // todo: use zoneless
          provideZoneChangeDetection(),
          provideNzIconsTesting(),
          provideNoopAnimations(),
          provideHttpClient(withInterceptorsFromDi()),
          provideHttpClientTesting()
        ]
      });
      fixture = TestBed.createComponent(TestUploadComponent);
      dl = fixture.debugElement;
      instance = dl.componentInstance;
      fixture.detectChanges();
      pageObject = new NzUploadPageObject();
      httpMock = TestBed.inject(HttpTestingController);
    });

    describe('[default]', () => {
      it('should be upload a file', () => {
        expect(instance._nzChange).toBeUndefined();
        pageObject.postFile(FILE);
        const req = httpMock.expectOne(instance.nzAction as string);
        pageObject.expectChange();
        req.flush({});
        pageObject.expectChange('success');
        httpMock.verify();
      });

      it('should notify progress when upload a large file', () => {
        pageObject.postLarge();
        const req = httpMock.expectOne(instance.nzAction as string);
        req.event({ type: 1, loaded: 0, total: 0 });
        pageObject.expectChange('progress');
        req.event({ type: 1, loaded: 10, total: 100 });
        pageObject.expectChange('progress');
        expect(instance._nzChange.event!.percent).toBe(10);
        req.event({ type: 1, loaded: 20, total: 100 });
        expect(instance._nzChange.event!.percent).toBe(20);
        req.flush({ status: 'ok' });
        httpMock.verify();
      });

      it('should be error when using 404 http', () => {
        pageObject.postLarge();
        const req = httpMock.expectOne(instance.nzAction as string);
        req.error(new ProgressEvent('network'), { status: 404, statusText: 'not found' });
        pageObject.expectChange('error');
        httpMock.verify();
      });

      it('should limit 2 file when allow multiple', () => {
        instance.nzLimit = 2;
        instance.nzMultiple = true;
        fixture.detectChanges();
        expect(instance._beforeUploadList.length).toBe(0);
        pageObject.postFile([...PNG_SMALL.target.files, ...PNG_SMALL.target.files, ...PNG_SMALL.target.files]);
        expect(instance._beforeUploadList.length).toBe(instance.nzLimit);
      });

      it('should limit png file type', () => {
        instance.nzFileType = 'image/png';
        fixture.detectChanges();
        expect(instance._beforeUploadList.length).toBe(0);
        pageObject.postFile(JPG_SMALL.target.files);
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
        const req = httpMock.expectOne(instance.nzAction as string);
        req.event({ type: 1, loaded: 10, total: 100 });
        pageObject.expectLength(1);
        pageObject.getByCss('.anticon-delete').nativeElement.click();
        fixture.detectChanges();
        pageObject.expectLength(0);
        httpMock.verify();
      });

      it('should be removed via list', () => {
        instance.nzFileList = [
          {
            uid: 1,
            name: 'xxx.png',
            status: 'done',
            response: 'Server Error 500', // custom error message to show
            url: 'http://www.baidu.com/xxx.png'
          } as NzSafeAny
        ];
        fixture.detectChanges();
        pageObject.expectLength(1);
        pageObject.getByCss('.anticon-delete').nativeElement.click();
        fixture.detectChanges();
        pageObject.expectLength(0);
      });

      it('should be upload a file via drag', () => {
        instance.nzType = 'drag';
        fixture.detectChanges();
        instance.comp.fileDrop({ type: 'dragover' } as NzSafeAny);
        instance.comp.fileDrop({ type: 'dragover' } as NzSafeAny);
        fixture.detectChanges();
        expect(pageObject.getByCss('.ant-upload-drag-hover') != null).toBe(true);
      });

      it('should be show uploading status when via drag', () => {
        instance.nzType = 'drag';
        instance.nzFileList = [
          {
            uid: 1,
            name: 'xxx.png',
            status: 'uploading'
          } as NzSafeAny
        ];
        fixture.detectChanges();
        expect(pageObject.getByCss('.ant-upload-drag-uploading') != null).toBe(true);
      });

      it('#i18n', () => {
        instance.nzFileList = [
          {
            uid: 1,
            name: 'xxx.png',
            status: 'done',
            response: 'Server Error 500', // custom error message to show
            url: 'http://www.baidu.com/xxx.png'
          } as NzSafeAny
        ];
        fixture.detectChanges();
        TestBed.inject(NzI18nService).setLocale(en_US);
        fixture.detectChanges();
        const removeFileText = pageObject.getByCss('.ant-upload-list-item-card-actions-btn > .anticon-delete')
          .nativeElement as HTMLElement;
        expect(removeFileText.parentElement!.title).toBe(en_US.Upload.removeFile);
      });
    });

    describe('property', () => {
      describe('[nzActive]', () => {
        it('should be return string when is function', () => {
          const url = `/new-url`;
          instance.nzAction = () => url;
          fixture.detectChanges();
          pageObject.postSmall();
          const req = httpMock.expectOne(() => true);
          expect(req.request.url).toBe(url);
        });

        it('should be return Observable when is function', () => {
          const url = `/new-url-with-observable`;
          instance.nzAction = () => of(url);
          fixture.detectChanges();
          pageObject.postSmall();
          const req = httpMock.expectOne(() => true);
          expect(req.request.url).toBe(url);
        });
      });

      describe('[nzData]', () => {
        it('should custom form data vis function', () => {
          instance.nzData = () => ({ a: 1 });
          fixture.detectChanges();
          pageObject.postSmall();
          const req = httpMock.expectOne(instance.nzAction as string);
          expect((req.request.body as FormData).get('a')).toBe('1');
          req.flush({});
          httpMock.verify();
        });

        it('should custom form data via object', () => {
          instance.nzData = { a: 1 };
          fixture.detectChanges();
          pageObject.postSmall();
          const req = httpMock.expectOne(instance.nzAction as string);
          expect((req.request.body as FormData).get('a')).toBe('1');
          req.flush({});
          httpMock.verify();
        });

        it('should custom form data via Observable', () => {
          instance.nzData = () => of({ a: 1 });
          fixture.detectChanges();
          pageObject.postSmall();
          const req = httpMock.expectOne(instance.nzAction as string);
          expect((req.request.body as FormData).get('a')).toBe('1');
          req.flush({});
          httpMock.verify();
        });

        it('should custom filter work', () => {
          instance.nzFilter = [{ name: 'custom', fn: () => [] }];
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
          instance.nzHeaders = () => ({ a: '1' });
          fixture.detectChanges();
          pageObject.postSmall();
          const req = httpMock.expectOne(instance.nzAction as string);
          expect(req.request.headers.get('a')).toBe('1');
          req.flush({});
          httpMock.verify();
        });

        it('should custom form data vis object', () => {
          instance.nzHeaders = { a: '1' };
          fixture.detectChanges();
          pageObject.postSmall();
          const req = httpMock.expectOne(instance.nzAction as string);
          expect(req.request.headers.get('a')).toBe('1');
          req.flush({});
          httpMock.verify();
        });

        it('should custom form data vis Observable', () => {
          instance.nzHeaders = () => of({ a: '1' });
          fixture.detectChanges();
          pageObject.postSmall();
          const req = httpMock.expectOne(instance.nzAction as string);
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

      describe('[nzTransformFile]', () => {
        it('should be from small to big', () => {
          instance.nzTransformFile = () => new File([`1`], `1.png`);
          fixture.detectChanges();
          pageObject.postLarge();
          const req = httpMock.expectOne(instance.nzAction as string);
          expect((req.request.body.get('file') as NzUploadFile).size).toBe(1);
          req.flush({});
          httpMock.verify();
        });

        it('should return Observable', () => {
          instance.nzTransformFile = () => of(new File([`123`], `1.png`));
          fixture.detectChanges();
          pageObject.postLarge();
          const req = httpMock.expectOne(instance.nzAction as string);
          expect((req.request.body.get('file') as NzUploadFile).size).toBe(3);
          req.flush({});
          httpMock.verify();
        });
      });

      describe('when nzType is drag', () => {
        it('should working', () => {
          instance.nzType = 'drag';
          fixture.detectChanges();
          expect(pageObject.getByCss('.ant-upload-drag') != null).toBe(true);
        });

        it('should be remove item', () => {
          instance.nzType = 'drag';
          instance.nzFileList = [
            {
              uid: 1,
              name: 'xxx.png',
              status: 'done',
              response: 'Server Error 500', // custom error message to show
              url: 'http://www.baidu.com/xxx.png'
            }
          ] as NzSafeAny[];
          fixture.detectChanges();
          expect(instance._onRemove).toBe(false);
          dl.query(By.css('.anticon-delete')).nativeElement.click();
          expect(instance._onRemove).toBe(true);
        });
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
        const req = httpMock.expectOne(instance.nzAction as string);
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
          it('can return true', () => {
            spyOn(instance, 'nzChange');
            instance.beforeUpload = (): Observable<NzSafeAny> => of(true);
            fixture.detectChanges();
            pageObject.postSmall();
            expect(instance.nzChange).toHaveBeenCalled();
          });

          it('can return same file', () => {
            let ret = false;
            instance.beforeUpload = (file: NzUploadFile): Observable<NzSafeAny> => {
              ret = true;
              return of(file);
            };
            fixture.detectChanges();
            pageObject.postSmall();
            expect(ret).toBe(true);
          });

          it('can return a string file', () => {
            let ret = false;
            instance.beforeUpload = (): Observable<NzSafeAny> => {
              ret = true;
              return of('file');
            };
            fixture.detectChanges();
            pageObject.postSmall();
            expect(ret).toBe(true);
          });

          it('can return a blob file', () => {
            let ret = false;
            instance.beforeUpload = (): Observable<NzSafeAny> => {
              ret = true;
              return of(new Blob([JSON.stringify(1, null, 2)], { type: 'application/json' }));
            };
            fixture.detectChanges();
            pageObject.postSmall();
            expect(ret).toBe(true);
          });

          it('cancel upload when return a false value', () => {
            expect(instance._nzChange).toBeUndefined();
            instance.beforeUpload = (): Observable<NzSafeAny> => of(false);
            fixture.detectChanges();
            pageObject.postSmall();
            expect(instance._nzChange).toBeUndefined();
          });

          it('should be console.warn error', () => {
            let warnMsg = '';
            console.warn = jasmine.createSpy().and.callFake((...res: string[]) => (warnMsg = res.join(' ')));
            expect(instance._nzChange).toBeUndefined();
            instance.beforeUpload = (): Observable<NzSafeAny> => throwError(() => '');
            fixture.detectChanges();
            pageObject.postSmall();
            expect(warnMsg).toContain(`Unhandled upload beforeUpload error`);
          });
        });

        describe('using promise', () => {
          it('should upload when promise resolves to true', fakeAsync(() => {
            let hookExecuted = false;
            instance.beforeUpload = (): Promise<boolean> => {
              hookExecuted = true;
              return Promise.resolve(true);
            };
            fixture.detectChanges();
            pageObject.postSmall();
            tick();
            expect(hookExecuted).toBe(true);
          }));

          it('should upload when promise resolves to file', fakeAsync(() => {
            let hookExecuted = false;
            instance.beforeUpload = (file: NzUploadFile): Promise<NzUploadFile> => {
              hookExecuted = true;
              return Promise.resolve(file);
            };
            fixture.detectChanges();
            pageObject.postSmall();
            tick();
            expect(hookExecuted).toBe(true);
          }));

          it('should upload with blob when promise resolves to blob', fakeAsync(() => {
            let hookExecuted = false;
            const testBlob = new Blob(['test content'], { type: 'text/plain' });
            instance.beforeUpload = (): Promise<Blob> => {
              hookExecuted = true;
              return Promise.resolve(testBlob);
            };
            fixture.detectChanges();
            pageObject.postSmall();
            tick();
            expect(hookExecuted).toBe(true);
          }));

          it('should cancel upload when promise resolves to false', fakeAsync(() => {
            expect(instance._nzChange).toBeUndefined();
            instance.beforeUpload = (): Promise<boolean> => Promise.resolve(false);
            fixture.detectChanges();
            pageObject.postSmall();
            tick();
            expect(instance._nzChange).toBeUndefined();
          }));

          it('should work with promise that resolves to boolean true', fakeAsync(() => {
            let hookCalled = false;
            instance.beforeUpload = (): Promise<boolean> => {
              hookCalled = true;
              return Promise.resolve(true);
            };
            fixture.detectChanges();
            pageObject.postSmall();
            tick();
            expect(hookCalled).toBe(true);
          }));

          it('should cancel upload when promise rejects with false', fakeAsync(() => {
            expect(instance._nzChange).toBeUndefined();
            instance.beforeUpload = (): Promise<boolean> => Promise.reject(false);
            fixture.detectChanges();
            pageObject.postSmall();
            tick();
            expect(instance._nzChange).toBeUndefined();
          }));
        });
      });

      describe('[nzFilter]', () => {
        it('should be custom limit', () => {
          instance.nzMultiple = true;
          instance.nzLimit = 1;
          instance.nzFilter = [
            {
              name: 'limit',
              fn: (fileList: NzUploadFile[]) => fileList.slice(-instance.nzLimit)
            }
          ];
          fixture.detectChanges();
          expect(instance._beforeUploadList.length).toBe(0);
          pageObject.postFile([...PNG_SMALL.target.files, ...PNG_SMALL.target.files, ...PNG_SMALL.target.files]);
          expect(instance._beforeUploadList.length).toBe(instance.nzLimit);
        });

        it('should be custom size', () => {
          instance.nzSize = 1;
          instance.nzFilter = [
            {
              name: 'size',
              fn: (fileList: NzUploadFile[]) => fileList.filter(w => w.size! / 1024 <= instance.nzSize)
            }
          ];
          fixture.detectChanges();
          expect(instance._beforeUploadList.length).toBe(0);
          pageObject.postLarge();
          expect(instance._beforeUploadList.length).toBe(0);
        });

        it('should be custom type', () => {
          instance.nzFileType = 'image/png';
          instance.nzFilter = [
            {
              name: 'type',
              fn: (fileList: NzUploadFile[]) => fileList.filter(w => ~[instance.nzFileType].indexOf(w.type))
            }
          ];
          fixture.detectChanges();
          expect(instance._beforeUploadList.length).toBe(0);
          pageObject.postFile(JPG_SMALL.target.files);
          expect(instance._beforeUploadList.length).toBe(0);
        });

        describe('with Observable', () => {
          it('should working', () => {
            instance.nzFilter = [
              {
                name: 'f1',
                fn: (fileList: NzUploadFile[]) =>
                  new Observable((observer: Observer<NzUploadFile[]>) => {
                    observer.next(fileList.slice(1));
                    observer.complete();
                  })
              },
              {
                name: 'f2',
                fn: (fileList: NzUploadFile[]) =>
                  new Observable((observer: Observer<NzUploadFile[]>) => {
                    observer.next(fileList.slice(1));
                    observer.complete();
                  })
              }
            ];
            fixture.detectChanges();
            expect(instance._beforeUploadList.length).toBe(0);
            pageObject.postFile([...PNG_SMALL.target.files, ...PNG_SMALL.target.files, ...PNG_SMALL.target.files]);
            expect(instance._beforeUploadList.length).toBe(1);
          });

          it('should be console.warn error', () => {
            let warnMsg = '';
            console.warn = jasmine.createSpy().and.callFake((...res: string[]) => (warnMsg = res.join(' ')));
            instance.nzFilter = [
              {
                name: 'f1',
                fn: () =>
                  new Observable((observer: Observer<NzUploadFile[]>) => {
                    observer.error('filter error');
                  })
              }
            ];
            fixture.detectChanges();
            pageObject.postFile(PNG_SMALL.target.files);
            expect(warnMsg).toContain(`Unhandled upload filter error`);
          });
        });
      });

      it('#nzFileList, should be allow empty', () => {
        instance.nzFileList = null!;
        fixture.detectChanges();
        expect(instance._nzChange).toBeUndefined();
        pageObject.postFile(FILE);
        const req = httpMock.expectOne(instance.nzAction as string);
        pageObject.expectChange();
        req.flush({});
        pageObject.expectChange('success');
        httpMock.verify();
      });

      describe('[nzRemove]', () => {
        const count = 3;

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
          ] as NzSafeAny[];
          fixture.detectChanges();
        });

        it('should be return a Observable', () => {
          instance.onRemove = () => of(false);
          fixture.detectChanges();
          expect(dl.queryAll(By.css('.anticon-delete')).length).toBe(count);
          dl.query(By.css('.anticon-delete')).nativeElement.click();
          expect(dl.queryAll(By.css('.anticon-delete')).length).toBe(count);
        });

        it('should be return a Observable includes a delay operation', (done: () => void) => {
          const DELAY = 20;
          instance.onRemove = () => of(true).pipe(delay(DELAY));
          fixture.detectChanges();
          expect(dl.queryAll(By.css('.anticon-delete')).length).toBe(count);
          dl.query(By.css('.anticon-delete')).nativeElement.click();
          setTimeout(() => {
            expect(dl.queryAll(By.css('.anticon-delete')).length).toBe(count - 1);
            done();
          }, DELAY + 1);
        });

        it('should be return a truth value', () => {
          instance.onRemove = () => true;
          fixture.detectChanges();
          expect(dl.queryAll(By.css('.anticon-delete')).length).toBe(count);
          dl.query(By.css('.anticon-delete')).nativeElement.click();
          expect(dl.queryAll(By.css('.anticon-delete')).length).toBe(count - 1);
        });

        it('should be return a falsy value', () => {
          instance.onRemove = () => false;
          fixture.detectChanges();
          expect(dl.queryAll(By.css('.anticon-delete')).length).toBe(count);
          dl.query(By.css('.anticon-delete')).nativeElement.click();
          expect(dl.queryAll(By.css('.anticon-delete')).length).toBe(count);
        });

        it('should be with null', () => {
          instance.onRemove = undefined;
          fixture.detectChanges();
          expect(dl.queryAll(By.css('.anticon-delete')).length).toBe(count);
          dl.query(By.css('.anticon-delete')).nativeElement.click();
          expect(dl.queryAll(By.css('.anticon-delete')).length).toBe(count - 1);
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

      it('#nzIconRender', () => {
        instance.nzFileList = [
          {
            uid: 1,
            name: 'xxx.png',
            status: 'uploading'
          } as NzSafeAny
        ];
        instance.nzIconRender = instance.customIconRender;
        fixture.detectChanges();
        const el = pageObject.getByCss(`.customIconRender`);
        expect(el != null).toBe(true);
        expect((el.nativeElement as HTMLElement).textContent).toBe('asdf');
      });

      it('#nzFileListRender', () => {
        instance.nzFileList = [
          {
            uid: 1,
            name: 'xxx.png',
            status: 'uploading'
          } as NzSafeAny
        ];
        instance.nzFileListRender = instance.fileListRender;
        fixture.detectChanges();
        const el = pageObject.getByCss(`.fileListRender`);
        expect(el != null).toBe(true);
        expect((el.nativeElement as HTMLElement).textContent).toBe('asdf');
      });

      describe('[nzMaxCount]', () => {
        it('should replace existing file when nzMaxCount is 1', () => {
          instance.nzMaxCount = 1;
          instance.nzFileList = [
            {
              uid: 1,
              name: 'existing.png',
              status: 'done'
            } as NzSafeAny
          ];
          fixture.detectChanges();

          expect(instance.nzFileList.length).toBe(1);
          expect(instance.nzFileList[0].name).toBe('existing.png');

          // Upload a new file
          pageObject.postSmall();
          const req = httpMock.expectOne(instance.nzAction as string);
          req.flush({});

          // Should replace the existing file
          expect(instance.nzFileList.length).toBe(1);
          expect(instance.nzFileList[0].name).toBe('test.png');
        });

        it('should limit files when nzMaxCount is greater than 1', () => {
          instance.nzMaxCount = 2;
          instance.nzFileList = [];
          fixture.detectChanges();

          // Upload first file
          pageObject.postSmall();
          let req = httpMock.expectOne(instance.nzAction as string);
          req.flush({});
          expect(instance.nzFileList.length).toBe(1);

          // Upload second file
          pageObject.postFile([new File(['content'], 'second.png', { type: 'image/png' })]);
          req = httpMock.expectOne(instance.nzAction as string);
          req.flush({});
          expect(instance.nzFileList.length).toBe(2);

          // Upload third file - upload happens but file is not added to list due to max count
          pageObject.postFile([new File(['content'], 'third.png', { type: 'image/png' })]);
          req = httpMock.expectOne(instance.nzAction as string);
          req.flush({});
          // File list should still be 2 because max count prevents adding more files
          expect(instance.nzFileList.length).toBe(2);
        });

        it('should allow unlimited files when nzMaxCount is undefined', () => {
          instance.nzMaxCount = undefined;
          instance.nzFileList = [];
          fixture.detectChanges();

          // Upload multiple files
          for (let i = 0; i < 5; i++) {
            pageObject.postFile([new File(['content'], `file${i}.png`, { type: 'image/png' })]);
            const req = httpMock.expectOne(instance.nzAction as string);
            req.flush({});
          }

          expect(instance.nzFileList.length).toBe(5);
        });

        it('should only accept positive values for nzMaxCount', () => {
          // Test with positive value (should limit)
          instance.nzMaxCount = 2;
          instance.nzFileList = [];
          fixture.detectChanges();

          // Upload first file
          pageObject.postSmall();
          let req = httpMock.expectOne(instance.nzAction as string);
          req.flush({});
          expect(instance.nzFileList.length).toBe(1);

          // Upload second file
          pageObject.postFile([new File(['content'], 'second.png', { type: 'image/png' })]);
          req = httpMock.expectOne(instance.nzAction as string);
          req.flush({});
          expect(instance.nzFileList.length).toBe(2);

          // Upload third file - should not be added due to limit
          pageObject.postFile([new File(['content'], 'third.png', { type: 'image/png' })]);
          req = httpMock.expectOne(instance.nzAction as string);
          req.flush({});
          expect(instance.nzFileList.length).toBe(2); // Still 2, not 3
        });

        it('should handle edge cases for nzMaxCount', () => {
          // Test with 0 (should behave like undefined - no limit)
          instance.nzMaxCount = 0;
          instance.nzFileList = [];
          fixture.detectChanges();

          pageObject.postSmall();
          let req = httpMock.expectOne(instance.nzAction as string);
          req.flush({});
          expect(instance.nzFileList.length).toBe(1);

          // Add another file to confirm no limit with 0
          pageObject.postFile([new File(['content'], 'second.png', { type: 'image/png' })]);
          req = httpMock.expectOne(instance.nzAction as string);
          req.flush({});
          expect(instance.nzFileList.length).toBe(2);

          // Test with negative value (should behave like undefined - no limit)
          instance.nzMaxCount = -1;
          fixture.detectChanges();

          pageObject.postFile([new File(['content'], 'third.png', { type: 'image/png' })]);
          req = httpMock.expectOne(instance.nzAction as string);
          req.flush({});
          expect(instance.nzFileList.length).toBe(3);
        });

        it('should work with existing nzLimit when both are set', () => {
          instance.nzMaxCount = 3;
          instance.nzLimit = 2; // This should be overridden by nzMaxCount logic
          instance.nzMultiple = true;
          fixture.detectChanges();

          // Upload files one by one to test the maxCount behavior
          pageObject.postSmall();
          let req = httpMock.expectOne(instance.nzAction as string);
          req.flush({});
          expect(instance.nzFileList.length).toBe(1);

          pageObject.postFile([new File(['content'], 'second.png', { type: 'image/png' })]);
          req = httpMock.expectOne(instance.nzAction as string);
          req.flush({});
          expect(instance.nzFileList.length).toBe(2);

          pageObject.postFile([new File(['content'], 'third.png', { type: 'image/png' })]);
          req = httpMock.expectOne(instance.nzAction as string);
          req.flush({});
          expect(instance.nzFileList.length).toBe(3);

          // Fourth file - upload happens but file is not added to list due to max count
          pageObject.postFile([new File(['content'], 'fourth.png', { type: 'image/png' })]);
          req = httpMock.expectOne(instance.nzAction as string);
          req.flush({});
          // File list should still be 3 because max count prevents adding more files
          expect(instance.nzFileList.length).toBe(3);
        });
      });
    });

    describe('CORS', () => {
      it('should be auto setting [X-Requested-With]', () => {
        pageObject.postSmall();
        const req = httpMock.expectOne(instance.nzAction as string);
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
        const req = httpMock.expectOne(instance.nzAction as string);
        expect(req.request.headers.has('X-Requested-With')).toBe(false);
        req.flush({});
        httpMock.verify();
      });
    });

    describe('[test boundary]', () => {
      it('clean a not exists request', () => {
        instance.comp.uploadComp.reqs = {};
        instance.show = false;
        fixture.detectChanges();
        expect(true).toBe(true);
      });
    });

    class NzUploadPageObject {
      private files: NzSafeAny;

      constructor() {
        spyOn(this.btnComp, 'onClick').and.callFake(() =>
          this.btnComp.onChange({ target: { files: this.files } } as NzSafeAny)
        );
      }

      get btnEl(): DebugElement {
        return dl.query(By.directive(NzUploadBtnComponent));
      }

      get btnComp(): NzUploadBtnComponent {
        return this.btnEl.injector.get(NzUploadBtnComponent) as NzUploadBtnComponent;
      }

      getByCss(css: string): DebugElement {
        return dl.query(By.css(css));
      }

      postFile(files: NzSafeAny): this {
        this.files = Array.isArray(files) ? files : [files];
        this.btnEl.nativeElement.click();
        return this;
      }

      postSmall(): this {
        this.postFile(PNG_SMALL.target.files);
        return this;
      }

      postLarge(): this {
        this.postFile(PNG_BIG.target.files);
        return this;
      }

      expectChange(type: string = 'start'): this {
        expect(instance._nzChange.type).toBe(type);
        return this;
      }

      expectLength(value: number = 0): this {
        expect(instance.nzFileList!.length).toBe(value);
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
        // todo: use zoneless
        providers: [provideZoneChangeDetection(), provideNzIconsTesting(), provideNoopAnimations()]
      });
      fixture = TestBed.createComponent(TestUploadListComponent);
      dl = fixture.debugElement;
      instance = dl.componentInstance;
      fixture.detectChanges();
    });

    describe('[listType]', () => {
      for (const type of ['text', 'picture', 'picture-card']) {
        it(`with [${type}]`, () => {
          instance.listType = type as NzUploadListType;
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
        instance.onPreview = undefined;
        fixture.detectChanges();
        dl.query(By.css('.ant-upload-list-item-actions a')).nativeElement.click();
        expect(instance._onPreview).toBe(false);
      });

      it('should support linkProps as object', fakeAsync(() => {
        instance.items = [
          {
            uid: '-1',
            name: 'foo.png',
            status: 'done',
            url: 'http://www.baidu.com/xxx.png',
            linkProps: {
              download: 'image'
            }
          }
        ];
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        const el = dl.query(By.css('.ant-upload-list-item-name')).nativeElement as HTMLElement;
        expect(el.attributes.getNamedItem('download')!.textContent).toBe('image');
      }));

      it('should support linkProps as json stringify', fakeAsync(() => {
        const linkPropsString = JSON.stringify({ download: 'image' });
        instance.items = [
          {
            uid: '-1',
            name: 'foo.png',
            status: 'done',
            url: 'http://www.baidu.com/xxx.png',
            linkProps: linkPropsString
          }
        ];
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
        const el = dl.query(By.css('.ant-upload-list-item-name')).nativeElement as HTMLElement;
        expect(el.attributes.getNamedItem('download')!.textContent).toBe('image');
      }));
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

    describe('[isImageUrl]', () => {
      describe('via image type', () => {
        it('should be true when file object type value is a valid image', () => {
          expect(instance.comp.isImageUrl({ type: 'image/' } as NzSafeAny)).toBe(true);
        });
      });

      describe('via thumbUrl or url', () => {
        it('should be false when not found url & thumbUrl', () => {
          expect(instance.comp.isImageUrl({} as NzSafeAny)).toBe(false);
        });

        describe('via extension', () => {
          it('with valid image extension', () => {
            expect(instance.comp.isImageUrl({ url: '1.svg' } as NzSafeAny)).toBe(true);
          });

          it('with invalid image extension', () => {
            expect(instance.comp.isImageUrl({ url: '1.pdf' } as NzSafeAny)).toBe(false);
          });
        });

        describe('when url is base64', () => {
          it('with valid image base64', () => {
            expect(instance.comp.isImageUrl({ url: 'data:image/png;base64,1' } as NzSafeAny)).toBe(true);
          });

          it('with invalid image base64', () => {
            expect(instance.comp.isImageUrl({ url: 'data:application/pdf;base64,1' } as NzSafeAny)).toBe(false);
          });
        });
      });

      it('#previewIsImage', fakeAsync(() => {
        instance.previewIsImage = () => true;
        instance.listType = 'picture';
        instance.items = [{}];
        fixture.detectChanges();
        tick();
        expect(instance.items[0].isImageUrl).toBe(true);
      }));
    });

    describe('[genThumb]', () => {
      class MockImage {
        width = 1;
        height = 2;

        addEventListener(_name: string, callback: VoidFunction): void {
          callback();
        }
        removeEventListener(): void {}

        set src(_: string) {}
      }

      it('should be generate thumb when is valid image data', fakeAsync(() => {
        spyOn(window as NzSafeAny, 'Image').and.returnValue(new MockImage());

        instance.listType = 'picture';
        instance.items = [{ originFileObj: new File([''], '1.png', { type: 'image/' }), thumbUrl: undefined }];
        fixture.detectChanges();
        tick();
        expect(instance.items[0].thumbUrl.length).toBeGreaterThan(1);
      }));

      it('should be generate thumb when width greater than height', fakeAsync(() => {
        const img = new MockImage();
        img.width = 2;
        img.height = 1;
        spyOn(window as NzSafeAny, 'Image').and.returnValue(img);

        instance.listType = 'picture';
        instance.items = [{ originFileObj: new File([''], '1.png', { type: 'image/' }), thumbUrl: undefined }];
        fixture.detectChanges();
        tick();
        expect(instance.items[0].thumbUrl.length).toBeGreaterThan(1);
      }));

      it('should be ignore thumb when is invalid image data', () => {
        instance.listType = 'picture';
        instance.items = [{ originFileObj: new File([''], '1.pdf', { type: 'pdf' }), thumbUrl: undefined }];
        fixture.detectChanges();
        expect(instance.items[0].thumbUrl).toBe('');
      });

      it('should be customize preview file', fakeAsync(() => {
        instance.previewFile = () => of('11');
        instance.listType = 'picture';
        instance.items = [{ originFileObj: new File([''], '1.png', { type: 'image/' }), thumbUrl: undefined }];
        fixture.detectChanges();
        tick();
        expect(instance.items[0].thumbUrl).toBe('11');
      }));
    });
  });

  describe('btn', () => {
    describe('component', () => {
      let fixture: ComponentFixture<TestUploadBtnComponent>;
      let dl: DebugElement;
      let instance: TestUploadBtnComponent;

      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [
            // todo: use zoneless
            provideZoneChangeDetection(),
            provideNzIconsTesting(),
            provideNoopAnimations(),
            provideHttpClient(withInterceptorsFromDi()),
            provideHttpClientTesting()
          ]
        });
        fixture = TestBed.createComponent(TestUploadBtnComponent);
        dl = fixture.debugElement;
        instance = dl.componentInstance;
        fixture.detectChanges();
      });

      describe('should trigger upload', () => {
        describe('change detection', () => {
          it('should not run change detection when the <input type=file> is being clicked', () => {
            const appRef = TestBed.inject(ApplicationRef);
            spyOn(appRef, 'tick');
            spyOn(instance.comp.file.nativeElement, 'click');
            expect(instance.comp.file.nativeElement.click).not.toHaveBeenCalled();
            fixture.debugElement.query(By.css('div')).nativeElement.click();
            // Caretaker note: previously click events on the `nz-upload-btn` elements did trigger
            // change detection since they were added via the `host` property.
            expect(appRef.tick).toHaveBeenCalledTimes(0);
            expect(instance.comp.file.nativeElement.click).toHaveBeenCalled();
          });
        });

        describe('via onClick', () => {
          it('', () => {
            spyOn(instance.comp.file.nativeElement, 'click');
            expect(instance.comp.file.nativeElement.click).not.toHaveBeenCalled();
            instance.comp.onClick();
            expect(instance.comp.file.nativeElement.click).toHaveBeenCalled();
          });

          it(', when nzOpenFileDialogOnClick is false', () => {
            instance.options.openFileDialogOnClick = false;
            spyOn(instance.comp.file.nativeElement, 'click');
            expect(instance.comp.file.nativeElement.click).not.toHaveBeenCalled();
            instance.comp.onClick();
            expect(instance.comp.file.nativeElement.click).not.toHaveBeenCalled();
          });
        });

        describe('via onKeyDown', () => {
          it('normal', () => {
            const appRef = TestBed.inject(ApplicationRef);
            spyOn(appRef, 'tick');
            spyOn(instance.comp, 'onClick');
            expect(instance.comp.onClick).not.toHaveBeenCalled();
            const uploadBtn = fixture.debugElement.query(By.css('div')).nativeElement;
            dispatchKeyboardEvent(uploadBtn, 'keydown', ENTER);
            expect(instance.comp.onClick).toHaveBeenCalled();
            expect(appRef.tick).toHaveBeenCalledTimes(0);
          });

          it('when expect Enter', () => {
            const appRef = TestBed.inject(ApplicationRef);
            spyOn(appRef, 'tick');
            spyOn(instance.comp, 'onClick');
            expect(instance.comp.onClick).not.toHaveBeenCalled();
            const uploadBtn = fixture.debugElement.query(By.css('div')).nativeElement;
            dispatchKeyboardEvent(uploadBtn, 'keydown', TAB);
            expect(instance.comp.onClick).not.toHaveBeenCalled();
            expect(appRef.tick).toHaveBeenCalledTimes(0);
          });
        });

        describe('via Drop', () => {
          it('normal', () => {
            spyOn(instance.comp, 'uploadFiles');
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
            instance.comp.onFileDrop({
              type: 'dragend',
              dataTransfer: { files: [FILE] },
              preventDefault: () => {}
            } as NzSafeAny);
            expect(instance.comp.uploadFiles).toHaveBeenCalled();
          });

          it('when dragover event', () => {
            spyOn(instance.comp, 'uploadFiles');
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
            instance.comp.onFileDrop({ type: 'dragover', preventDefault: () => {} } as NzSafeAny);
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
          });

          it('limit gif using resource type', () => {
            instance.options.accept = 'image/gif';
            fixture.detectChanges();
            spyOn(instance.comp, 'uploadFiles');
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
            instance.comp.onFileDrop({
              type: 'dragend',
              dataTransfer: { files: PNG_SMALL.target.files },
              preventDefault: () => {}
            } as NzSafeAny);
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
          });

          it('limit gif using file name', () => {
            instance.options.accept = '.gif';
            fixture.detectChanges();
            spyOn(instance.comp, 'uploadFiles');
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
            instance.comp.onFileDrop({
              type: 'dragend',
              dataTransfer: { files: PNG_SMALL.target.files },
              preventDefault: () => {}
            } as NzSafeAny);
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
          });

          it('allow type image/*', () => {
            instance.options.accept = 'image/*';
            fixture.detectChanges();
            spyOn(instance.comp, 'uploadFiles');
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
            instance.comp.onFileDrop({
              type: 'dragend',
              dataTransfer: { files: PNG_SMALL.target.files },
              preventDefault: () => {}
            } as NzSafeAny);
            expect(instance.comp.uploadFiles).toHaveBeenCalled();
          });

          it(`allow type [ 'image/png', 'image/jpg' ]`, () => {
            instance.options.accept = ['image/png', 'image/jpg'];
            fixture.detectChanges();
            spyOn(instance.comp, 'uploadFiles');
            expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
            instance.comp.onFileDrop({
              type: 'dragend',
              dataTransfer: { files: PNG_SMALL.target.files },
              preventDefault: () => {}
            } as NzSafeAny);
            expect(instance.comp.uploadFiles).toHaveBeenCalled();
          });
        });

        it('via onChange', () => {
          spyOn(instance.comp, 'uploadFiles');
          expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
          instance.comp.onChange(PNG_SMALL as NzSafeAny);
          expect(instance.comp.uploadFiles).toHaveBeenCalled();
        });

        describe('via directory', () => {
          const makeFileSystemEntry = (item: Item): FileSystemEntry => {
            const isDirectory = Array.isArray(item.children);
            return {
              isDirectory,
              isFile: !isDirectory,
              file: (handle: NzSafeAny): void => {
                handle(new Item(item.name));
              },
              createReader: () => ({
                readEntries: (handle: NzSafeAny) => handle(item.children!.map(makeFileSystemEntry))
              })
            } as unknown as FileSystemEntry;
          };
          const makeDataTransferItem = (item: Item): DataTransferItem =>
            ({
              webkitGetAsEntry: () => makeFileSystemEntry(item)
            }) as DataTransferItem;

          beforeEach(() => (instance.options.directory = true));

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
            } as NzSafeAny);
            expect(instance.comp.uploadFiles).toHaveBeenCalled();
          });

          it('should be ignore invalid extension', () => {
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
            } as NzSafeAny);
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
          spyOn<NzSafeAny>(instance.comp, 'file');
          expect(instance.comp.file).not.toHaveBeenCalled();
          instance.comp.onClick();
          expect(instance.comp.file).not.toHaveBeenCalled();
        });

        it('[onKeyDown]', () => {
          spyOn(instance.comp, 'onClick');
          expect(instance.comp.onClick).not.toHaveBeenCalled();
          // instance.comp.onKeyDown(null);
          // expect(instance.comp.onClick).not.toHaveBeenCalled();
        });

        it('[onFileDrop]', () => {
          spyOn(instance.comp, 'uploadFiles');
          expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
          instance.comp.onFileDrop({ type: 'dragover', preventDefault: () => {} } as NzSafeAny);
          expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
        });

        it('[onChange]', () => {
          spyOn(instance.comp, 'uploadFiles');
          expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
          // instance.comp.onChange(null);
          // expect(instance.comp.uploadFiles).not.toHaveBeenCalled();
        });
      });

      describe('when has destroy', () => {
        it('should be abort all uploading file', () => {
          instance.comp.onChange({
            target: {
              files: [...PNG_SMALL.target.files, ...JPG_SMALL.target.files]
            }
          } as NzSafeAny);
          expect(Object.keys(instance.comp.reqs).length).toBe(2);
          fixture.destroy();
          expect(Object.keys(instance.comp.reqs).length).toBe(0);
        });

        it('should be subsequent uploading', () => {
          instance.comp.onChange(PNG_SMALL as NzSafeAny);
          expect(Object.keys(instance.comp.reqs).length).toBe(1);
          fixture.destroy();
          instance.comp.onChange(PNG_SMALL as NzSafeAny);
          expect(Object.keys(instance.comp.reqs).length).toBe(0);
        });
      });
    });

    describe('methods', () => {
      let fixture: ComponentFixture<NzUploadBtnComponent>;
      let comp: NzUploadBtnComponent;
      let http: HttpTestingController;

      beforeEach(() => {
        TestBed.configureTestingModule({
          // todo: use zoneless
          providers: [
            provideZoneChangeDetection(),
            provideHttpClient(withInterceptorsFromDi()),
            provideHttpClientTesting()
          ]
        });
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
          onStart: () => {},
          onProgress: () => {},
          onSuccess: () => {},
          onError: () => {}
        } as ZipButtonOptions;
        http = TestBed.inject(HttpTestingController);
      });

      it('should uploading a png file', fakeAsync(() => {
        spyOn<NzSafeAny>(comp.options, 'onStart');
        spyOn<NzSafeAny>(comp.options, 'onProgress');
        spyOn<NzSafeAny>(comp.options, 'onSuccess');
        comp.onChange(PNG_SMALL as NzSafeAny);
        tick(1);
        const req = http.expectOne('/test');
        req.event({ type: 1, loaded: 10, total: 100 });
        req.flush('ok');
        expect(comp.options.onProgress).toHaveBeenCalled();
        expect(comp.options.onStart).toHaveBeenCalled();
        expect(comp.options.onSuccess).toHaveBeenCalled();
      }));

      it('should contain the parameters of http request', fakeAsync(() => {
        comp.onChange(PNG_SMALL as NzSafeAny);
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
        spyOn<NzSafeAny>(comp.options, 'onStart');
        comp.options.filters = [
          {
            name: '',
            fn: (fileList: NzUploadFile[]) => fileList.filter(w => w.size! / 1024 <= 0)
          }
        ];
        comp.onChange(PNG_BIG as NzSafeAny);
        expect(comp.options.onStart).not.toHaveBeenCalled();
      });

      it('should be no request when beforeUpload is false', () => {
        spyOn<NzSafeAny>(comp.options, 'beforeUpload').and.returnValue(false);
        spyOn<NzSafeAny>(comp.options, 'onStart');
        comp.onChange(PNG_SMALL as NzSafeAny);
        expect(comp.options.beforeUpload).toHaveBeenCalled();
        expect(comp.options.onStart).not.toHaveBeenCalled();
      });

      it('should handle promise-based beforeUpload that resolves to true', fakeAsync(() => {
        spyOn<NzSafeAny>(comp.options, 'onStart');
        comp.options.beforeUpload = (): Promise<boolean> => Promise.resolve(true);
        comp.onChange(PNG_SMALL as NzSafeAny);
        tick();
        const req = http.expectOne('/test');
        expect(comp.options.onStart).toHaveBeenCalled();
        req.flush('ok');
      }));

      it('should not start upload when promise-based beforeUpload resolves to false', fakeAsync(() => {
        spyOn<NzSafeAny>(comp.options, 'onStart');
        comp.options.beforeUpload = (): Promise<boolean> => Promise.resolve(false);
        comp.onChange(PNG_SMALL as NzSafeAny);
        tick();
        expect(comp.options.onStart).not.toHaveBeenCalled();
        http.expectNone('/test');
      }));

      it('should handle promise-based beforeUpload with file transformation', fakeAsync(() => {
        spyOn<NzSafeAny>(comp.options, 'onStart');
        const baseFile = new File(['modified'], 'modified.txt', { type: 'text/plain' });
        const transformedFile: NzUploadFile = {
          ...baseFile,
          uid: 'test-uid',
          name: baseFile.name,
          size: baseFile.size,
          type: baseFile.type,
          lastModified: baseFile.lastModified.toString(),
          originFileObj: baseFile
        };
        comp.options.beforeUpload = (): Promise<NzUploadFile> => Promise.resolve(transformedFile);
        comp.onChange(PNG_SMALL as NzSafeAny);
        tick();
        const req = http.expectOne('/test');
        expect(comp.options.onStart).toHaveBeenCalled();
        req.flush('ok');
      }));

      it('should handle promise rejection in beforeUpload', fakeAsync(() => {
        let warnMsg = '';
        console.warn = jasmine.createSpy().and.callFake((...res: string[]) => (warnMsg = res.join(' ')));
        spyOn<NzSafeAny>(comp.options, 'onStart');
        comp.options.beforeUpload = (): Promise<boolean> => Promise.reject(new Error('Validation failed'));
        comp.onChange(PNG_SMALL as NzSafeAny);
        tick();
        expect(comp.options.onStart).not.toHaveBeenCalled();
        expect(warnMsg).toContain('Unhandled upload beforeUpload error');
        http.expectNone('/test');
      }));

      it('should error when request error', fakeAsync(() => {
        spyOn<NzSafeAny>(comp.options, 'onStart');
        spyOn<NzSafeAny>(comp.options, 'onSuccess');
        spyOn<NzSafeAny>(comp.options, 'onError');
        comp.onChange(PNG_SMALL as NzSafeAny);
        tick(1);
        http.expectOne('/test').error({ status: 403 } as unknown as ProgressEvent);
        expect(comp.options.onStart).toHaveBeenCalled();
        expect(comp.options.onError).toHaveBeenCalled();
        expect(comp.options.onSuccess).not.toHaveBeenCalled();
      }));

      it('should custom request', () => {
        comp.options.customRequest = () => of(true).subscribe(() => {});
        spyOn<NzSafeAny>(comp.options, 'customRequest');
        comp.onChange(PNG_SMALL as NzSafeAny);
        expect(comp.options.customRequest).toHaveBeenCalled();
      });

      it('should be warn "Must return Subscription type in [nzCustomRequest] property"', () => {
        let warnMsg = '';
        console.warn = jasmine.createSpy().and.callFake((...res: string[]) => (warnMsg = res.join(' ')));
        comp.options.customRequest = (() => {}) as NzSafeAny;
        comp.onChange(PNG_SMALL as NzSafeAny);
        expect(warnMsg).toContain(`Must return Subscription type in '[nzCustomRequest]' property`);
      });
    });
  });
});

@Component({
  imports: [NzButtonModule, NzIconModule, NzUploadModule],
  template: `
    @if (show) {
      <nz-upload
        #upload
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
        [nzPreviewFile]="previewFile"
        [nzRemove]="onRemove"
        [nzDirectory]="directory"
        [nzTransformFile]="nzTransformFile"
        [nzIconRender]="nzIconRender"
        [nzFileListRender]="nzFileListRender"
        [nzMaxCount]="nzMaxCount"
        (nzFileListChange)="nzFileListChange($event)"
        (nzChange)="nzChange($event)"
      >
        <button nz-button>
          <nz-icon nzType="upload" />
          <span>Click to Upload</span>
        </button>
      </nz-upload>
    }
    <ng-template #customIconRender>
      <span class="customIconRender">asdf</span>
    </ng-template>
    <ng-template #fileListRender>
      <span class="fileListRender">asdf</span>
    </ng-template>
  `
})
class TestUploadComponent {
  @ViewChild('upload', { static: false }) comp!: NzUploadComponent;
  @ViewChild('customIconRender', { static: false }) customIconRender!: NzIconRenderTemplate;
  @ViewChild('fileListRender', { static: false }) fileListRender!: TemplateRef<{ $implicit: NzUploadFile[] }>;
  show = true;
  nzType: NzUploadType = 'select';
  nzLimit = 0;
  nzSize = 0;
  nzFileType: NzSafeAny;
  nzAccept = 'image/png';
  nzAction: string | ((file: NzUploadFile) => string | Observable<string>) = '/upload';
  _beforeUpload = false;
  _beforeUploadList: NzUploadFile[] = [];
  beforeUpload: NzSafeAny = (_file: NzUploadFile, fileList: NzUploadFile[]): NzSafeAny => {
    this._beforeUpload = true;
    this._beforeUploadList = fileList;
    return true;
  };
  nzCustomRequest: NzSafeAny;
  nzData: NzSafeAny;
  nzFilter: UploadFilter[] = [];
  nzFileList: NzUploadFile[] = [];
  nzDisabled = false;
  nzHeaders: NzSafeAny = {};
  nzListType: NzUploadListType = 'text';
  nzMultiple = false;
  nzName = 'file';
  nzShowUploadList: boolean | NzShowUploadList = true;
  nzShowButton = true;
  nzWithCredentials = false;
  nzTransformFile!: (file: NzUploadFile) => NzUploadTransformFileType;
  nzIconRender: NzIconRenderTemplate | null = null;
  nzFileListRender: TemplateRef<{ $implicit: NzUploadFile[] }> | null = null;
  nzMaxCount: number | undefined = undefined;
  _onPreview = false;
  onPreview = (): void => {
    this._onPreview = true;
  };
  previewFile!: (file: NzUploadFile) => Observable<string>;
  _onRemove = false;
  onRemove: undefined | ((file: NzUploadFile) => boolean | Observable<boolean>) = (): boolean => {
    this._onRemove = true;
    return true;
  };
  _nzChange!: NzUploadChangeParam;

  nzChange(value: NzUploadChangeParam): void {
    this._nzChange = value;
  }

  nzFileListChange(value: NzSafeAny): void {
    this._nzChange = value;
  }

  directory = false;
}

@Component({
  imports: [NzUploadListComponent],
  template: `
    <nz-upload-list
      #list
      [listType]="listType"
      [items]="items"
      [icons]="icons"
      [onPreview]="onPreview"
      [previewFile]="previewFile"
      [previewIsImage]="previewIsImage"
      [onRemove]="onRemove"
    ></nz-upload-list>
  `
})
class TestUploadListComponent {
  @ViewChild('list', { static: false }) comp!: NzUploadListComponent;
  listType: NzUploadListType = 'picture-card';
  items: NzSafeAny[] = [
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
  icons: NzShowUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true
  };
  _onPreview = false;
  onPreview: VoidFunction | undefined = (): void => {
    this._onPreview = true;
  };
  previewFile!: (file: NzUploadFile) => Observable<string>;
  previewIsImage!: (file: NzUploadFile) => boolean;
  _onRemove = false;
  onRemove: NzSafeAny = (): void => {
    this._onRemove = true;
  };
}

@Component({
  imports: [NzUploadBtnComponent],
  template: `<div nz-upload-btn #btn [options]="options" class="test">UPLOAD</div>`
})
class TestUploadBtnComponent {
  @ViewChild('btn', { static: false }) comp!: NzUploadBtnComponent;
  options: ZipButtonOptions = {
    disabled: false,
    openFileDialogOnClick: true,
    filters: [],
    customRequest: undefined,
    onStart: () => {},
    onError: () => {}
  };
}
