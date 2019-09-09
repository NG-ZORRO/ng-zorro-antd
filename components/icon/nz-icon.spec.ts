import { CommonModule } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { async, fakeAsync, inject, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  LeftOutline,
  LoadingOutline,
  QuestionCircleFill,
  QuestionCircleOutline,
  QuestionOutline,
  RightOutline
} from '@ant-design/icons-angular/icons';

import { NzConfigService } from 'ng-zorro-antd/core';

import { NzIconDirective } from './nz-icon.directive';
import { NzIconModule } from './nz-icon.module';
import { NzIconService, NZ_ICON_DEFAULT_TWOTONE_COLOR, NZ_ICONS } from './nz-icon.service';

describe('nz icon', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, NzIconModule],
      declarations: [
        NzTestIconExtensionsComponent,
        NzTestIconCustomComponent,
        NzTestIconIconfontComponent,
        NzTestIconOldApiComponent,
        NzTestIconPrefixComponent
      ],
      providers: [
        {
          provide: NZ_ICONS,
          useValue: [
            LeftOutline,
            RightOutline,
            QuestionOutline,
            QuestionCircleOutline,
            LoadingOutline,
            QuestionCircleFill
          ]
        },
        {
          provide: NZ_ICON_DEFAULT_TWOTONE_COLOR,
          useValue: '#3344cc'
        }
      ]
    }).compileComponents();
  });

  /**
   * Extended features built on `@ant-design/icons-angular`.
   */
  describe('extensions', () => {
    let testComponent: NzTestIconExtensionsComponent;
    let fixture: ComponentFixture<NzTestIconExtensionsComponent>;
    let icons: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestIconExtensionsComponent);
      testComponent = fixture.debugElement.componentInstance;
      icons = fixture.debugElement.queryAll(By.directive(NzIconDirective));
    });

    it('should get icon class name back', () => {
      fixture.detectChanges();
      expect(icons[0].nativeElement.classList.contains('anticon')).toBe(true);
      expect(icons[0].nativeElement.classList.contains('anticon-question')).toBe(true);
      expect(icons[1].nativeElement.classList.contains('anticon-loading')).toBe(true);
    });

    it('should change class name when type changes', () => {
      testComponent.type = 'question-circle';
      fixture.detectChanges();
      expect(icons[0].nativeElement.classList.contains('anticon')).toBe(true);
      expect(icons[0].nativeElement.classList.contains('anticon-question-circle')).toBe(true);
      expect(icons[0].nativeElement.classList.contains('anticon-question')).not.toBe(true);
    });

    it('should support spin and cancel', fakeAsync(() => {
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(icons[0].nativeElement.firstChild.classList.contains('anticon-spin')).toBe(true);

      testComponent.spin = false;
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(icons[0].nativeElement.firstChild.classList.contains('anticon-spin')).toBe(false);
    }));

    it('should make loading spin', fakeAsync(() => {
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(icons[1].nativeElement.firstChild.classList.contains('anticon-spin')).toBe(true);
    }));

    it('should type support old API', () => {
      testComponent.type = 'anticon anticon-cross';
      fixture.detectChanges();
      expect(icons[0].nativeElement.className).toContain('anticon');
      expect(icons[0].nativeElement.className).toContain('anticon-close');
      expect(icons[0].nativeElement.innerHTML).toContain('svg');

      // An invalid type should not affect the actual type.
      testComponent.type = 'anticon';
      fixture.detectChanges();
      expect(icons[0].nativeElement.className).toContain('anticon');
      expect(icons[0].nativeElement.className).toContain('anticon-close');
      expect(icons[0].nativeElement.innerHTML).toContain('svg');
    });

    it('should rotate work', fakeAsync(() => {
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(icons[0].nativeElement.firstChild.style.transform).toBeFalsy();

      testComponent.rotate = 120;
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(icons[0].nativeElement.firstChild.style.transform).toBe('rotate(120deg)');

      testComponent.rotate = 0;
      fixture.detectChanges();
      tick(1000);
      fixture.detectChanges();
      expect(icons[0].nativeElement.firstChild.style.transform).toBeFalsy();
    }));
  });

  describe('custom', () => {
    let fixture: ComponentFixture<NzTestIconCustomComponent>;
    let icons: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestIconCustomComponent);
    });

    it('should support custom svg element', () => {
      fixture.detectChanges();
      icons = fixture.debugElement.queryAll(By.directive(NzIconDirective));
      const icon1 = icons[0];
      expect(icon1.nativeElement.className).toContain('anticon');
      expect(icon1.nativeElement.innerHTML).toContain('svg');
      expect(icon1.nativeElement.innerHTML).toContain(
        'viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor"'
      );
    });
  });

  describe('iconfont', () => {
    let fixture: ComponentFixture<NzTestIconIconfontComponent>;
    let icons: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestIconIconfontComponent);
    });

    it('should support iconfont', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        icons = fixture.debugElement.queryAll(By.directive(NzIconDirective));
        expect(icons[0].nativeElement.className).toContain('anticon');
        expect(icons[0].nativeElement.innerHTML).toContain('xlink:href="#icon-tuichu"');
        expect(icons[1].nativeElement.innerHTML).toContain('link:href="#icon-facebook"');
        expect(icons[2].nativeElement.innerHTML).toContain('xlink:href="#icon-twitter"');
      });
    }));
  });

  /**
   * @deprecated Would be removed in 9.0.0.
   */
  describe('old api', () => {
    let fixture: ComponentFixture<NzTestIconOldApiComponent>;
    let icons: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestIconOldApiComponent);
      icons = fixture.debugElement.queryAll(By.directive(NzIconDirective));
    });

    it('should be compatible to old API', () => {
      fixture.detectChanges();
      expect(icons[0].nativeElement.className).toContain('anticon');
      expect(icons[0].nativeElement.innerHTML).toContain('svg');
    });
  });

  /**
   * @deprecated Would be removed in 9.0.0.
   */
  describe('prefix', () => {
    let fixture: ComponentFixture<NzTestIconPrefixComponent>;
    let icons: DebugElement[];

    beforeEach(() => {
      fixture = TestBed.createComponent(NzTestIconPrefixComponent);
      icons = fixture.debugElement.queryAll(By.directive(NzIconDirective));
    });

    it('should prefixes work', () => {
      fixture.detectChanges();
      expect(icons[0].nativeElement.className).toContain('anticon');
      expect(icons[0].nativeElement.className).toContain('anticon-question');
      expect(icons[0].nativeElement.innerHTML).toContain('svg');
    });
  });
});

describe('nz config service', () => {
  let fixture: ComponentFixture<NzTestIconExtensionsComponent>;
  let nzConfigService: NzConfigService;
  let icons: DebugElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, NzIconModule],
      declarations: [NzTestIconExtensionsComponent],
      providers: [
        {
          provide: NZ_ICONS,
          useValue: [LeftOutline, RightOutline, QuestionOutline]
        }
      ]
    });

    fixture = TestBed.createComponent(NzTestIconExtensionsComponent);
    fixture.detectChanges();
    icons = fixture.debugElement.queryAll(By.directive(NzIconDirective));
  });

  beforeEach(inject([NzConfigService], (c: NzConfigService) => {
    nzConfigService = c;
  }));

  it('should support config service', () => {
    nzConfigService!.set('icon', { nzTwotoneColor: '234567' });
    expect(icons[0].componentInstance._iconService.twoToneColor.primaryColor).not.toBe('234567');
    expect(icons[0].componentInstance._iconService.twoToneColor.primaryColor).toBe('#1890ff');
  });
});

/**
 * @deprecated This API is not going to be provided in 9.0.0.
 */
describe('nz icon twotone color injection', () => {
  let fixture: ComponentFixture<NzTestIconExtensionsComponent>;
  let icons: DebugElement[];

  it('should support default twotone color', () => {
    TestBed.configureTestingModule({
      imports: [CommonModule, NzIconModule],
      declarations: [NzTestIconExtensionsComponent],
      providers: [
        {
          provide: NZ_ICONS,
          useValue: [LeftOutline, RightOutline, QuestionOutline]
        },
        {
          provide: NZ_ICON_DEFAULT_TWOTONE_COLOR,
          useValue: '#3344cc'
        }
      ]
    });

    fixture = TestBed.createComponent(NzTestIconExtensionsComponent);
    fixture.detectChanges();

    icons = fixture.debugElement.queryAll(By.directive(NzIconDirective));
    expect(icons[0].nativeElement.querySelector('svg')).not.toBe(null);
    expect(icons[0].componentInstance._iconService.twoToneColor.primaryColor).toBe('#3344cc');
  });

  it('should not set non-hashed-started string', () => {
    TestBed.configureTestingModule({
      imports: [CommonModule, NzIconModule],
      declarations: [NzTestIconExtensionsComponent],
      providers: [
        {
          provide: NZ_ICONS,
          useValue: [LeftOutline, RightOutline, QuestionOutline]
        },
        {
          provide: NZ_ICON_DEFAULT_TWOTONE_COLOR,
          useValue: '3344cc'
        }
      ]
    });

    fixture = TestBed.createComponent(NzTestIconExtensionsComponent);
    icons = fixture.debugElement.queryAll(By.directive(NzIconDirective));

    fixture.detectChanges();
    expect(icons[0].componentInstance._iconService.twoToneColor.primaryColor).not.toBe('3344cc');
    expect(icons[0].componentInstance._iconService.twoToneColor.primaryColor).toBe('#1890ff');
  });
});

@Component({
  template: `
    <i nz-icon [nzType]="type" [nzTheme]="theme" [nzSpin]="spin" [nzRotate]="rotate"></i>
    <i nz-icon [nzType]="'loading'" [nzTheme]="theme"></i>
  `
})
export class NzTestIconExtensionsComponent {
  type = 'question';
  theme = 'outline';
  spin = true;
  rotate = 0;

  constructor(public _iconService: NzIconService) {}
}

@Component({
  template: `
    <i nz-icon [nzType]="'question-circle'" [nzTheme]="'fill'"></i>
  `
})
export class NzTestIconPrefixComponent {}

@Component({
  template: `
    <i nz-icon style="color: hotpink;">
      <svg>
        <path
          d="M923 283.6c-13.4-31.1-32.6-58.9-56.9-82.8-24.3-23.8-52.5-42.4-84-55.5-32.5-13.5-66.9-20.3-102.4-20.3-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5-24.4 23.9-43.5 51.7-56.9 82.8-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3 0.1-35.3-7-69.6-20.9-101.9z"
        />
      </svg>
    </i>
  `
})
export class NzTestIconCustomComponent {}

@Component({
  template: `
    <i nz-icon [nzIconfont]="'icon-tuichu'"></i>
    <i nz-icon [nzIconfont]="'icon-facebook'"></i>
    <i nz-icon [nzIconfont]="'icon-twitter'"></i>
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
  template: `
    <i class="anticon anticon-question"></i>
    <i class="anticon anticon-verticle"></i>
    <i class="anticon anticon-cross"></i>
  `
})
export class NzTestIconOldApiComponent {}
