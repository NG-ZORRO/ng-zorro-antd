import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, fakeAsync, tick, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LeftOutline, LoadingOutline, QuestionCircleOutline, QuestionOutline, RightOutline } from '@ant-design/icons-angular/icons';
import { NzIconDirective } from './nz-icon.directive';
import { NzIconModule } from './nz-icon.module';
import { NzIconService, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS } from './nz-icon.service';

describe('icon', () => {
  let testComponent;
  let fixture;
  let icons;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports     : [ CommonModule, NzIconModule ],
      declarations: [ NzTestIconExtensionsComponent, NzTestIconCustomComponent, NzTestIconIconfontComponent, NzTestIconOldApiComponent ]
    }).compileComponents();
  });

  describe('extensions', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestIconExtensionsComponent);
      testComponent = fixture.debugElement.componentInstance;
      icons = fixture.debugElement.queryAll(By.directive(NzIconDirective));
    });

    it('should get icon class name back', fakeAsync(() => {
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(icons[ 0 ].nativeElement.classList.contains('anticon')).toBe(true);
      expect(icons[ 0 ].nativeElement.classList.contains('anticon-question')).toBe(true);
      expect(icons[ 1 ].nativeElement.classList.contains('anticon-loading')).toBe(true);
    }));

    it('should change class name when type changes', fakeAsync(() => {
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      testComponent.type = 'question-circle';
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(icons[ 0 ].nativeElement.classList.contains('anticon')).toBe(true);
      expect(icons[ 0 ].nativeElement.classList.contains('anticon-question-circle')).toBe(true);
      expect(icons[ 0 ].nativeElement.classList.contains('anticon-question')).not.toBe(true);
    }));

    it('should support spin and cancel', fakeAsync(() => {
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(icons[ 0 ].nativeElement.firstChild.classList.contains('anticon-spin')).toBe(true);
      testComponent.spin = false;
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(icons[ 0 ].nativeElement.firstChild.classList.contains('anticon-spin')).toBe(false);
    }));

    it('should make loading spin', fakeAsync(() => {
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(icons[ 1 ].nativeElement.firstChild.classList.contains('anticon-spin')).toBe(true);
    }));
  });

  describe('custom', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestIconCustomComponent);
      testComponent = fixture.debugElement.componentInstance;

    });

    it('should support custom svg element', () => {
      fixture.detectChanges();
      icons = fixture.debugElement.queryAll(By.directive(NzIconDirective));
      const icon1 = icons[ 0 ];
      expect(icon1.nativeElement.className).toContain('anticon');
      expect(icon1.nativeElement.innerHTML).toContain('svg');
      expect(icon1.nativeElement.innerHTML).toContain('viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"');
    });
  });

  describe('iconfont', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestIconIconfontComponent);
      testComponent = fixture.debugElement.componentInstance;
    });

    it('should support iconfont', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        icons = fixture.debugElement.queryAll(By.directive(NzIconDirective));
        const icon1 = icons[ 0 ];
        const icon2 = icons[ 1 ];
        const icon3 = icons[ 2 ];
        expect(icon1.nativeElement.className).toContain('anticon');
        expect(icon1.nativeElement.innerHTML).toContain('xlink:href="#icon-tuichu"');
        expect(icon2.nativeElement.innerHTML).toContain('link:href="#icon-facebook"');
        expect(icon3.nativeElement.innerHTML).toContain('xlink:href="#icon-twitter"');
      });
    }));
  });

  describe('old api', () => {
    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestIconOldApiComponent);
      testComponent = fixture.debugElement.componentInstance;
      icons = fixture.debugElement.queryAll(By.directive(NzIconDirective));
    });

    it('should be compatible to old API', () => {
      fixture.detectChanges();
      expect(icons[ 0 ].nativeElement.className).toContain('anticon');
      expect(icons[ 0 ].nativeElement.innerHTML).toContain('svg');
    });
  });
});

describe('icon static importing', () => {
  let testComponent;
  let fixture;
  let icons;

  it('should support injected icons and default color', fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ CommonModule, NzIconModule ],
      declarations: [ NzTestIconExtensionsComponent ],
      providers   : [ { provide: NZ_ICONS, useValue: [ LeftOutline, RightOutline ] }, { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#3344cc' } ]
    });

    fixture = TestBed.createComponent(NzTestIconExtensionsComponent);
    testComponent = fixture.debugElement.componentInstance;
    icons = fixture.debugElement.queryAll(By.directive(NzIconDirective));

    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    testComponent.type = 'left';

    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    expect(icons[ 0 ].nativeElement.querySelector('svg')).not.toBe(null);
    expect(icons[ 0 ].componentInstance.type).toBe('left');
    expect(icons[ 0 ].componentInstance._iconService.twoToneColor.primaryColor).toBe('#3344cc');
  }));

  it('should not set non-hashed-started-with string', fakeAsync(() => {
    TestBed.configureTestingModule({
      imports     : [ CommonModule, NzIconModule ],
      declarations: [ NzTestIconExtensionsComponent ],
      providers   : [ { provide: NZ_ICONS, useValue: [ LeftOutline, RightOutline ] }, { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '3344cc' } ]
    });

    fixture = TestBed.createComponent(NzTestIconExtensionsComponent);
    testComponent = fixture.debugElement.componentInstance;
    icons = fixture.debugElement.queryAll(By.directive(NzIconDirective));

    fixture.detectChanges();
    tick(1000);
    fixture.detectChanges();

    expect(icons[ 0 ].componentInstance._iconService.twoToneColor.primaryColor).not.toBe('3344cc');
    expect(icons[ 0 ].componentInstance._iconService.twoToneColor.primaryColor).toBe('#1890ff');
  }));
});

@Component({
  selector: 'nz-test-icon-extensions',
  template: `
    <i nz-icon [type]="type" [theme]="theme" [spin]="spin"></i>
    <i nz-icon [type]="'loading'" [theme]="theme"></i>
  `
})
export class NzTestIconExtensionsComponent {
  type = 'question';
  theme = 'outline';
  spin = true;

  constructor(private _iconService: NzIconService) {
    this._iconService.addIcon(QuestionOutline, QuestionCircleOutline, LoadingOutline);
  }
}

@Component({
  selector: 'nz-test-icon-custom',
  template: `
    <i nz-icon style="color: hotpink;">
      <svg>
        <path
          d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z"/>
      </svg>
    </i>
  `
})
export class NzTestIconCustomComponent {
}

@Component({
  selector: 'nz-test-icon-iconfont',
  template: `
    <i nz-icon [iconfont]="'icon-tuichu'"></i>
    <i nz-icon [iconfont]="'icon-facebook'"></i>
    <i nz-icon [iconfont]="'icon-twitter'"></i>
  `
})
export class NzTestIconIconfontComponent {
  constructor(private _iconService: NzIconService) {
    this._iconService.fetchFromIconfont({
      scriptUrl: 'https://at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
    });
  }
}

@Component({
  selector: 'nz-test-icon-old-api',
  template: `
    <i class="anticon anticon-question"></i>
    <!-- Just to improve codecov. Compatibility code would be removed in 2.0.  -->
    <i class="anticon anticon-verticle"></i>
    <i class="anticon anticon-cross"></i>
  `
})
export class NzTestIconOldApiComponent {
  spin = true;

  constructor(private _iconService: NzIconService) {
    this._iconService.addIcon(QuestionOutline, QuestionCircleOutline, LoadingOutline);
  }
}
