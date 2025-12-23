/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, provideZoneChangeDetection, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzShowUploadList, NzUploadFile, NzUploadListType } from './interface';
import { NzUploadListComponent } from './upload-list.component';

describe('upload-list', () => {
  describe('basic', () => {
    let fixture: ComponentFixture<TestUploadListComponent>;
    let dl: DebugElement;
    let instance: TestUploadListComponent;

    beforeEach(() => {
      TestBed.configureTestingModule({
        // todo: use zoneless
        providers: [provideZoneChangeDetection(), provideNzIconsTesting(), provideNzNoAnimation()]
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

  describe('animation', () => {
    it('should apply animate class correctly with text', async () => {
      const fixture = TestBed.createComponent(TestUploadListComponent);
      await fixture.whenStable();

      const items = fixture.debugElement.queryAll(By.css('.ant-upload-list-item'));
      expect(items.length).toBeGreaterThan(0);
      expect(items.every(item => item.nativeElement.classList.contains('ant-upload-list-animate-enter')));
    });

    for (const type of ['picture', 'picture-card']) {
      it(`should apply animate class correctly with ${type}`, async () => {
        const fixture = TestBed.createComponent(TestUploadListComponent);
        await fixture.whenStable();

        const items = fixture.debugElement.queryAll(By.css('.ant-upload-list-item'));
        expect(items.length).toBeGreaterThan(0);
        expect(items.every(item => item.nativeElement.classList.contains('ant-upload-list-animate-inline-enter')));
      });
    }

    describe('noAnimation', () => {
      beforeEach(() => {
        TestBed.configureTestingModule({
          providers: [provideNzNoAnimation()]
        });
      });

      it('should not apply animate class correctly with text', async () => {
        const fixture = TestBed.createComponent(TestUploadListComponent);
        await fixture.whenStable();

        const items = fixture.debugElement.queryAll(By.css('.ant-upload-list-item'));
        expect(items.length).toBeGreaterThan(0);
        expect(items.every(item => !item.nativeElement.classList.contains('ant-upload-list-animate-enter')));
      });

      for (const type of ['picture', 'picture-card']) {
        it(`should apply animate class correctly with ${type}`, async () => {
          const fixture = TestBed.createComponent(TestUploadListComponent);
          await fixture.whenStable();

          const items = fixture.debugElement.queryAll(By.css('.ant-upload-list-item'));
          expect(items.length).toBeGreaterThan(0);
          expect(items.every(item => !item.nativeElement.classList.contains('ant-upload-list-animate-inline-enter')));
        });
      }
    });
  });
});

@Component({
  selector: 'nz-test-upload-list',
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
      [onRemove]="onRemove!"
    />
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
  onRemove: null | ((file: NzUploadFile) => void) = (): void => {
    this._onRemove = true;
  };
}
