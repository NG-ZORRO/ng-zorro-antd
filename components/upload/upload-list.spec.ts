/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, DebugElement, TemplateRef, ViewChild, signal, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

import { vi } from 'vitest';

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
        providers: [provideNzIconsTesting(), provideNzNoAnimation()]
      });
      fixture = TestBed.createComponent(TestUploadListComponent);
      dl = fixture.debugElement;
      instance = dl.componentInstance;
      fixture.detectChanges();
    });

    describe('[listType]', () => {
      for (const type of ['text', 'picture', 'picture-card']) {
        it(`with [${type}]`, () => {
          instance.listType.set(type as NzUploadListType);
          fixture.detectChanges();
          expect(dl.query(By.css(`.ant-upload-list-${type}`)) != null).toBe(true);
        });
      }
    });

    it('[items]', () => {
      expect(dl.queryAll(By.css(`.ant-upload-list-item`)).length).toBe(instance.items().length);
    });

    describe('[icons]', () => {
      it('should be show preview', () => {
        expect(instance._onPreview).toBe(false);
        const actions = dl.queryAll(By.css('.ant-upload-list-item-actions'));
        expect(actions.length).toBe(instance.items().length);
        actions[0].query(By.css('a')).nativeElement.click();
        fixture.detectChanges();
        expect(instance._onPreview).toBe(true);
      });

      it('should be hide preview', () => {
        instance.icons.set({
          showPreviewIcon: false,
          showRemoveIcon: true
        });
        fixture.detectChanges();
        const actions = dl.queryAll(By.css('.ant-upload-list-item-actions a'));
        expect(actions.length).toBe(0);
        expect(instance._onPreview).toBe(false);
      });

      it('should be show remove', () => {
        expect(instance._onRemove).toBe(false);
        const actions = dl.queryAll(By.css('.ant-upload-list-item-actions'));
        expect(actions.length).toBe(instance.items().length);
        actions[0].query(By.css('.anticon-delete')).nativeElement.click();
        fixture.detectChanges();
        expect(instance._onRemove).toBe(true);
      });

      it('should be hide remove', () => {
        instance.icons.set({
          showPreviewIcon: true,
          showRemoveIcon: false
        });
        fixture.detectChanges();
        const actions = dl.queryAll(By.css('.ant-upload-list-item-actions .anticon-delete'));
        expect(actions.length).toBe(0);
        expect(instance._onRemove).toBe(false);
      });

      it('should show remove icon only for files matching function predicate', () => {
        instance.icons.set({
          showPreviewIcon: false,
          showRemoveIcon: (file: NzUploadFile) => file.status === 'done'
        });
        fixture.detectChanges();
        // 2 done files, 1 error file — only done files get the delete button
        const deleteIcons = dl.queryAll(By.css('.ant-upload-list-item-actions .anticon-delete'));
        expect(deleteIcons.length).toBe(2);
      });

      it('should show preview icon only for files matching function predicate', () => {
        instance.icons.set({
          showPreviewIcon: (file: NzUploadFile) => file.status === 'done',
          showRemoveIcon: false
        });
        fixture.detectChanges();
        // 2 done files, 1 error file — only done files get the preview link
        const previewLinks = dl.queryAll(By.css('.ant-upload-list-item-actions a'));
        expect(previewLinks.length).toBe(2);
      });

      it('should show download icon for done files when showDownloadIcon is true', () => {
        instance.icons.set({
          showPreviewIcon: false,
          showRemoveIcon: false,
          showDownloadIcon: true
        });
        fixture.detectChanges();
        // 2 done files, 1 error file — only done files get the download button
        const downloadIcons = dl.queryAll(By.css('.anticon-download'));
        expect(downloadIcons.length).toBe(2);
      });

      it('should show download icon only for files matching function predicate', () => {
        instance.icons.set({
          showPreviewIcon: false,
          showRemoveIcon: false,
          showDownloadIcon: (file: NzUploadFile) => file.name === 'xxx.png'
        });
        fixture.detectChanges();
        // Only xxx.png (done) matches the predicate; yyy.png (done) and zzz.png (error) do not
        const downloadIcons = dl.queryAll(By.css('.anticon-download'));
        expect(downloadIcons.length).toBe(1);
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
        instance.onPreview.set(undefined);
        fixture.detectChanges();
        dl.query(By.css('.ant-upload-list-item-actions a')).nativeElement.click();
        expect(instance._onPreview).toBe(false);
      });

      it('should support linkProps as object', async () => {
        instance.items.set([
          {
            uid: '-1',
            name: 'foo.png',
            status: 'done',
            url: 'http://www.baidu.com/xxx.png',
            linkProps: {
              download: 'image'
            }
          }
        ]);
        await fixture.whenStable();
        const el = dl.query(By.css('.ant-upload-list-item-name')).nativeElement as HTMLElement;
        expect(el.attributes.getNamedItem('download')!.textContent).toBe('image');
      });

      it('should support linkProps as json stringify', async () => {
        const linkPropsString = JSON.stringify({ download: 'image' });
        instance.items.set([
          {
            uid: '-1',
            name: 'foo.png',
            status: 'done',
            url: 'http://www.baidu.com/xxx.png',
            linkProps: linkPropsString
          }
        ]);
        await fixture.whenStable();
        const el = dl.query(By.css('.ant-upload-list-item-name')).nativeElement as HTMLElement;
        expect(el.attributes.getNamedItem('download')!.textContent).toBe('image');
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
        instance.onRemove.set(null);
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

      it('#previewIsImage', async () => {
        instance.previewIsImage.set(() => true);
        instance.listType.set('picture');
        instance.items.set([{}]);
        await fixture.whenStable();
        expect(instance.items()[0].isImageUrl).toBe(true);
      });
    });

    describe('[genThumb]', () => {
      afterEach(() => vi.unstubAllGlobals());

      class MockImage {
        width = 1;
        height = 2;

        addEventListener(_name: string, callback: VoidFunction): void {
          callback();
        }
        removeEventListener(): void {}

        set src(_: string) {}
      }

      it('should be generate thumb when is valid image data', async () => {
        vi.stubGlobal('Image', class extends MockImage {});

        instance.listType.set('picture');
        instance.items.set([{ originFileObj: new File([''], '1.png', { type: 'image/' }), thumbUrl: undefined }]);
        await fixture.whenStable();
        expect(instance.items()[0].thumbUrl.length).toBeGreaterThan(1);
      });

      it('should be generate thumb when width greater than height', async () => {
        const img = new MockImage();
        img.width = 2;
        img.height = 1;
        vi.stubGlobal(
          'Image',
          class {
            constructor() {
              return img;
            }
          }
        );

        instance.listType.set('picture');
        instance.items.set([{ originFileObj: new File([''], '1.png', { type: 'image/' }), thumbUrl: undefined }]);
        await fixture.whenStable();
        expect(instance.items()[0].thumbUrl.length).toBeGreaterThan(1);
      });

      it('should be ignore thumb when is invalid image data', () => {
        instance.listType.set('picture');
        instance.items.set([{ originFileObj: new File([''], '1.pdf', { type: 'pdf' }), thumbUrl: undefined }]);
        fixture.detectChanges();
        expect(instance.items()[0].thumbUrl).toBe('');
      });

      it('should be customize preview file', async () => {
        instance.previewFile.set(() => of('11'));
        instance.listType.set('picture');
        instance.items.set([{ originFileObj: new File([''], '1.png', { type: 'image/' }), thumbUrl: undefined }]);
        await fixture.whenStable();
        expect(instance.items()[0].thumbUrl).toBe('11');
      });
    });
  });

  describe('[custom icon templates]', () => {
    let fixture: ComponentFixture<TestUploadListWithTemplateComponent>;
    let dl: DebugElement;
    let instance: TestUploadListWithTemplateComponent;

    beforeEach(async () => {
      TestBed.configureTestingModule({
        providers: [provideNzIconsTesting(), provideNzNoAnimation()]
      });
      fixture = TestBed.createComponent(TestUploadListWithTemplateComponent);
      dl = fixture.debugElement;
      instance = dl.componentInstance;
      await fixture.whenStable();
    });

    it('should render default delete icon when no removeIcon template is provided', () => {
      expect(dl.query(By.css('.anticon-delete'))).not.toBeNull();
      expect(dl.query(By.css('.custom-remove-icon'))).toBeNull();
    });

    it('should render custom removeIcon template instead of default delete icon', async () => {
      instance.icons.set({ showRemoveIcon: true, removeIcon: instance.removeIconTpl() });
      await fixture.whenStable();
      expect(dl.query(By.css('.custom-remove-icon'))).not.toBeNull();
      expect(dl.query(By.css('.anticon-delete'))).toBeNull();
    });

    it('should render default download icon when no downloadIcon template is provided', async () => {
      instance.icons.set({ showDownloadIcon: true });
      await fixture.whenStable();
      expect(dl.query(By.css('.anticon-download'))).not.toBeNull();
      expect(dl.query(By.css('.custom-download-icon'))).toBeNull();
    });

    it('should render custom downloadIcon template instead of default download icon', async () => {
      instance.icons.set({ showDownloadIcon: true, downloadIcon: instance.downloadIconTpl() });
      await fixture.whenStable();
      expect(dl.query(By.css('.custom-download-icon'))).not.toBeNull();
      expect(dl.query(By.css('.anticon-download'))).toBeNull();
    });

    it('should render default eye icon when no previewIcon template is provided', () => {
      expect(dl.query(By.css('.anticon-eye'))).not.toBeNull();
      expect(dl.query(By.css('.custom-preview-icon'))).toBeNull();
    });

    it('should render custom previewIcon template instead of default eye icon', async () => {
      instance.icons.set({ showPreviewIcon: true, previewIcon: instance.previewIconTpl() });
      await fixture.whenStable();
      expect(dl.query(By.css('.custom-preview-icon'))).not.toBeNull();
      expect(dl.query(By.css('.anticon-eye'))).toBeNull();
    });

    it('should not render extra content when no extra template is provided', () => {
      expect(dl.query(By.css('.custom-extra'))).toBeNull();
    });

    it('should render extra template inside the file name anchor when file has a url', async () => {
      instance.icons.set({ extra: instance.extraTpl() });
      await fixture.whenStable();
      const anchor = dl.query(By.css('a.ant-upload-list-item-name'));
      expect(anchor).not.toBeNull();
      expect(anchor.query(By.css('.custom-extra'))).not.toBeNull();
    });

    it('should render extra template inside the file name span when file has no url', async () => {
      instance.items.set([{ uid: '1', name: 'xxx.png', status: 'done', size: 100 }]);
      instance.icons.set({ extra: instance.extraTpl() });
      await fixture.whenStable();
      const span = dl.query(By.css('span.ant-upload-list-item-name'));
      expect(span).not.toBeNull();
      expect(span.query(By.css('.custom-extra'))).not.toBeNull();
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
  selector: 'nz-test-upload-list-with-template',
  imports: [NzUploadListComponent],
  template: `
    <ng-template #removeIcon><span class="custom-remove-icon">X</span></ng-template>
    <ng-template #downloadIcon><span class="custom-download-icon">D</span></ng-template>
    <ng-template #previewIcon><span class="custom-preview-icon">P</span></ng-template>
    <ng-template #extra let-file>
      <span class="custom-extra">{{ file.size }}</span>
    </ng-template>

    <nz-upload-list
      [listType]="listType()"
      [items]="items()"
      [icons]="icons()"
      [onRemove]="onRemove"
      [onPreview]="onPreview"
    />
  `
})
class TestUploadListWithTemplateComponent {
  readonly removeIconTpl = viewChild.required<TemplateRef<{ $implicit: NzUploadFile }>>('removeIcon');
  readonly downloadIconTpl = viewChild.required<TemplateRef<{ $implicit: NzUploadFile }>>('downloadIcon');
  readonly previewIconTpl = viewChild.required<TemplateRef<{ $implicit: NzUploadFile }>>('previewIcon');
  readonly extraTpl = viewChild.required<TemplateRef<{ $implicit: NzUploadFile }>>('extra');

  readonly listType = signal<NzUploadListType>('picture-card');
  readonly items = signal<NzSafeAny[]>([
    { uid: '1', name: 'xxx.png', status: 'done', url: 'http://www.example.com/xxx.png', size: 100 }
  ]);
  readonly icons = signal<NzShowUploadList>({
    showRemoveIcon: true,
    showPreviewIcon: true,
    showDownloadIcon: true
  });
  onRemove = (): void => {};
  onPreview = (): void => {};
}

@Component({
  selector: 'nz-test-upload-list',
  imports: [NzUploadListComponent],
  template: `
    <nz-upload-list
      #list
      [listType]="listType()"
      [items]="items()"
      [icons]="icons()"
      [onPreview]="onPreview()"
      [previewFile]="previewFile()"
      [previewIsImage]="previewIsImage()"
      [onRemove]="onRemove()!"
    />
  `
})
class TestUploadListComponent {
  @ViewChild('list', { static: false }) comp!: NzUploadListComponent;
  readonly listType = signal<NzUploadListType>('picture-card');
  readonly items = signal<NzSafeAny[]>([
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
  ]);
  readonly icons = signal<NzShowUploadList>({
    showPreviewIcon: true,
    showRemoveIcon: true
  });
  _onPreview = false;
  readonly onPreview = signal<VoidFunction | undefined>((): void => {
    this._onPreview = true;
  });
  readonly previewFile = signal<((file: NzUploadFile) => Observable<string>) | undefined>(undefined);
  readonly previewIsImage = signal<((file: NzUploadFile) => boolean) | undefined>(undefined);
  _onRemove = false;
  readonly onRemove = signal<null | ((file: NzUploadFile) => void)>((): void => {
    this._onRemove = true;
  });
}
