import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzSkeletonModule } from './nz-skeleton.module';

describe('skeleton', () => {
  let fixture: ComponentFixture<NzTestSkeletonComponent>;
  let testComp: NzTestSkeletonComponent;
  let dl: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NzSkeletonModule],
      declarations: [NzTestSkeletonComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(NzTestSkeletonComponent);
    testComp = fixture.componentInstance;
    dl = fixture.debugElement;
    fixture.detectChanges();
  });

  describe('#nzActive', () => {
    it('should active work', () => {
      expect(dl.nativeElement.querySelector('.ant-skeleton-active')).toBeFalsy();
      testComp.nzActive = true;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.ant-skeleton-active')).toBeTruthy();
    });
  });

  describe('#nzTitle', () => {
    it('should basic width prop work', () => {
      expect(dl.nativeElement.querySelector('.ant-skeleton-title')).toBeFalsy();
      testComp.nzTitle = true;
      testComp.nzAvatar = false;
      testComp.nzParagraph = true;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.ant-skeleton-title').style.width).toBe('38%');
      testComp.nzAvatar = true;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.ant-skeleton-title').style.width).toBe('50%');
      testComp.nzParagraph = false;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.ant-skeleton-title').style.width).toBe('');
    });
    it('should customize width props work', () => {
      testComp.nzTitle = true;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.ant-skeleton-title').style.width).toBe('');
      testComp.nzTitle = { width: '50%' };
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.ant-skeleton-title').style.width).toBe('50%');
      testComp.nzTitle = { width: 200 };
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.ant-skeleton-title').style.width).toBe('200px');
    });
  });

  describe('#nzAvatar', () => {
    it('should basic avatar props work', () => {
      testComp.nzTitle = true;
      testComp.nzAvatar = true;
      testComp.nzParagraph = false;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.ant-skeleton-avatar-square')).toBeTruthy();
      expect(dl.nativeElement.querySelector('.ant-skeleton-with-avatar')).toBeTruthy();
      testComp.nzParagraph = true;
      fixture.detectChanges();
      expect(dl.nativeElement.querySelector('.ant-skeleton-avatar-circle')).toBeTruthy();
    });
    for (const type of ['square', 'circle']) {
      it(`should customize shape ${type} work`, () => {
        testComp.nzAvatar = { shape: type };
        fixture.detectChanges();
        expect(dl.query(By.css(`.ant-skeleton-avatar-${type}`)) !== null).toBe(true);
      });
    }
    for (const type of [{ size: 'large', cls: 'lg' }, { size: 'small', cls: 'sm' }]) {
      it(`should customize size ${type.size} work`, () => {
        testComp.nzAvatar = { size: type.size };
        fixture.detectChanges();
        expect(dl.query(By.css(`.ant-skeleton-avatar-${type.cls}`)) !== null).toBe(true);
      });
    }
  });

  describe('#nzParagraph', () => {
    it('should basic rows and width work', () => {
      testComp.nzTitle = true;
      testComp.nzAvatar = true;
      testComp.nzParagraph = true;
      fixture.detectChanges();
      let paragraphs = dl.nativeElement.querySelectorAll('.ant-skeleton-paragraph > li');
      expect(paragraphs.length).toBe(2);
      expect(paragraphs[0].style.width).toBe('');
      expect(paragraphs[1].style.width).toBe('');
      testComp.nzAvatar = false;
      fixture.detectChanges();
      paragraphs = dl.nativeElement.querySelectorAll('.ant-skeleton-paragraph > li');
      expect(paragraphs.length).toBe(3);
      expect(paragraphs[1].style.width).toBe('');
      expect(paragraphs[2].style.width).toBe('61%');
    });
    it('should width type is string or number work', () => {
      testComp.nzParagraph = { width: 100 };
      fixture.detectChanges();
      let paragraphs = dl.nativeElement.querySelectorAll('.ant-skeleton-paragraph > li');
      expect(paragraphs[0].style.width).toBe('');
      expect(paragraphs[1].style.width).toBe('100px');
      expect(paragraphs[2]).toBeFalsy();
      testComp.nzParagraph = { width: 100, rows: 3 };
      fixture.detectChanges();
      paragraphs = dl.nativeElement.querySelectorAll('.ant-skeleton-paragraph > li');
      expect(paragraphs[1].style.width).toBe('');
      expect(paragraphs[2].style.width).toBe('100px');
    });
    it('should define width type is Array work', () => {
      testComp.nzParagraph = { width: [200, '100px', '90%'] };
      fixture.detectChanges();
      let paragraphs = dl.nativeElement.querySelectorAll('.ant-skeleton-paragraph > li');
      expect(paragraphs[0].style.width).toBe('200px');
      expect(paragraphs[1].style.width).toBe('100px');
      expect(paragraphs[2]).toBeFalsy();
      testComp.nzParagraph = { width: [200, '100px', '90%'], rows: 4 };
      fixture.detectChanges();
      paragraphs = dl.nativeElement.querySelectorAll('.ant-skeleton-paragraph > li');
      expect(paragraphs[2].style.width).toBe('90%');
      expect(paragraphs[3].style.width).toBe('');
    });
  });
});

@Component({
  selector: 'nz-test-skeleton',
  template: `
    <nz-skeleton
      [nzActive]="nzActive"
      [nzAvatar]="nzAvatar"
      [nzTitle]="nzTitle"
      [nzParagraph]="nzParagraph"
    >
    </nz-skeleton>
  `
})
export class NzTestSkeletonComponent {
  nzActive;
  nzAvatar;
  nzTitle;
  nzParagraph;
}
