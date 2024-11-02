import { BidiModule, Dir, Direction } from '@angular/cdk/bidi';
import { ApplicationRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzButtonComponent, NzButtonModule, NzButtonShape, NzButtonSize, NzButtonType } from './index';

describe('button', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideNzIconsTesting()]
    });
  });

  describe('className', () => {
    let fixture: ComponentFixture<TestButtonComponent>;
    let component: TestButtonComponent;
    let buttonElement: HTMLButtonElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestButtonComponent);
      component = fixture.componentInstance;
      buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
    });

    it('should apply classname', () => {
      expect(buttonElement.className).toBe('ant-btn');
    });

    it('should apply classname based on nzDanger', () => {
      expect(buttonElement.classList).not.toContain('ant-btn-dangerous');
      component.nzDanger = true;
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-dangerous');
    });

    it('should apply classname based on nzGhost', () => {
      expect(buttonElement.classList).not.toContain('ant-btn-background-ghost');
      component.nzGhost = true;
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-background-ghost');
    });

    it('should apply classname based on nzSearch', () => {
      expect(buttonElement.classList).not.toContain('ant-input-search-button');
      component.nzSearch = true;
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-input-search-button');
    });

    it('should apply classname based on nzLoading', () => {
      expect(buttonElement.classList).not.toContain('ant-btn-loading');
      component.nzLoading = true;
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-loading');
    });

    it('should apply classname based on nzBlock', () => {
      expect(buttonElement.classList).not.toContain('ant-btn-block');
      component.nzBlock = true;
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-block');
    });

    it('should apply classname based on nzType', () => {
      component.nzType = 'default';
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-default');
      component.nzType = 'primary';
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-primary');
      component.nzType = 'link';
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-link');
      component.nzType = 'dashed';
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-dashed');
      component.nzType = null;
      fixture.detectChanges();
      expect(buttonElement.className).toBe('ant-btn');
    });

    it('should apply classname based on nzShape', () => {
      component.nzShape = 'round';
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-round');
      component.nzShape = 'circle';
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-circle');
    });

    it('should apply classname based on nzSize', () => {
      component.nzSize = 'large';
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-lg');
      component.nzSize = 'small';
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-sm');
      component.nzSize = 'default';
      fixture.detectChanges();
      expect(buttonElement.className).toBe('ant-btn');
    });
  });

  describe('loading icon', () => {
    let fixture: ComponentFixture<TestButtonBindingComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestButtonBindingComponent);
    });

    it('should hide icon when loading correct', fakeAsync(() => {
      fixture.detectChanges();
      const buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
      expect(buttonElement.classList.contains('ant-btn-loading')).toBe(false);
      expect(buttonElement.classList).not.toContain('ant-btn-icon-only');
      expect(buttonElement.firstElementChild.querySelector('svg')).not.toBe(null);
      expect(buttonElement.firstElementChild!.classList.contains('anticon-poweroff')).toBe(true);
      expect(buttonElement.firstElementChild!.classList.contains('anticon-loading')).toBe(false);
      buttonElement.click();
      fixture.detectChanges();
      expect(buttonElement.classList.contains('ant-btn-loading')).toBe(true);
      expect(buttonElement.firstElementChild!.classList.contains('anticon-loading')).toBe(true);
      expect(buttonElement.querySelector('.anticon-poweroff').style.cssText).toBe('display: none;');
      tick(5000);
      fixture.detectChanges();
      expect(buttonElement.classList.contains('ant-btn-loading')).toBe(false);
      expect(buttonElement.firstElementChild!.classList.contains('anticon-loading')).toBe(false);
      expect(buttonElement.querySelector('.anticon-poweroff').style.cssText).toBe('');
    }));
  });

  describe('insert span', () => {
    let fixture: ComponentFixture<TestButtonWithIconComponent>;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestButtonWithIconComponent);
    });

    it('should insert span correctly', fakeAsync(() => {
      const buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
      fixture.detectChanges();
      expect(buttonElement.firstElementChild.tagName).toBe('SPAN');
      tick(5000);
      fixture.detectChanges();
      expect(buttonElement.firstElementChild.innerText).toContain('button');
    }));
  });

  describe('icon only', () => {
    it('should icon only works correctly', fakeAsync(() => {
      const fixture = TestBed.createComponent(TestButtonIconOnlyComponent);
      const buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-icon-only');
    }));

    it('should icon only works correctly with any tag', fakeAsync(() => {
      const fixture = TestBed.createComponent(TestButtonIconOnlyWithAnyTagComponent);
      const buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-icon-only');
    }));

    it('should icon only works correctly with any comments', fakeAsync(() => {
      const fixture = TestBed.createComponent(TestButtonIconOnlyWithCommentComponent);
      const buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-icon-only');
    }));

    it('should icon only works correctly with any text', fakeAsync(() => {
      const fixture = TestBed.createComponent(TestButtonIconOnlyWithTextComponent);
      const buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
      fixture.detectChanges();
      expect(buttonElement.classList).not.toContain('ant-btn-icon-only');
    }));

    it('should icon only works correctly without nz-icon', fakeAsync(() => {
      const fixture = TestBed.createComponent(TestButtonIconOnlyWithoutIconComponent);
      const buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
      fixture.detectChanges();
      expect(buttonElement.classList).not.toContain('ant-btn-icon-only');
    }));

    it('should icon only loading works correctly', () => {
      const fixture = TestBed.createComponent(TestButtonIconOnlyLoadingComponent);
      fixture.detectChanges();
      const buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-icon-only');
    });
  });

  describe('RTL', () => {
    let fixture: ComponentFixture<TestButtonRtlComponent>;
    let buttonElement: HTMLButtonElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestButtonRtlComponent);
      buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
    });

    it('should apply classname', () => {
      fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-rtl');

      fixture.componentInstance.direction = 'ltr';
      fixture.detectChanges();
      expect(buttonElement.classList).not.toContain('ant-btn-rtl');
    });
  });

  describe('change detection', () => {
    let fixture: ComponentFixture<TestButtonComponent>;
    let buttonElement: HTMLButtonElement;
    let component: TestButtonComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestButtonComponent);
      buttonElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
      component = fixture.componentInstance;
    });

    it('should not trigger change detection when the button is clicked', () => {
      const appRef = TestBed.inject(ApplicationRef);
      const spy = spyOn(appRef, 'tick').and.callThrough();
      buttonElement.dispatchEvent(new MouseEvent('click'));
      buttonElement.dispatchEvent(new MouseEvent('click'));
      // Previously, it would've caused `tick()` to be called 2 times, because 2 click events have been triggered.
      expect(spy).toHaveBeenCalledTimes(0);
    });

    it('prevent default and stop propagation when the button state is loading', fakeAsync(() => {
      component.nzLoading = true;
      fixture.detectChanges();
      const event = new MouseEvent('click');
      const preventDefaultSpy = spyOn(event, 'preventDefault').and.callThrough();
      const stopImmediatePropagationSpy = spyOn(event, 'stopImmediatePropagation').and.callThrough();
      buttonElement.dispatchEvent(event);
      expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
      expect(stopImmediatePropagationSpy).toHaveBeenCalledTimes(1);
    }));
  });

  describe('basic', () => {
    let fixture: ComponentFixture<NzButtonComponent>;
    let component: NzButtonComponent;

    beforeEach(() => {
      fixture = TestBed.createComponent(NzButtonComponent);
      component = fixture.componentInstance;
    });

    it('correct value for listOfNode', () => {
      component['elementRef'] = {
        nativeElement: {}
      };
      expect(component.iconOnly).toBeFalsy();
    });
  });
});

describe('anchor', () => {
  let fixture: ComponentFixture<TestAnchorComponent>;
  let anchorElement: HTMLAnchorElement;
  let component: TestAnchorComponent;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestAnchorComponent);
    anchorElement = fixture.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
    component = fixture.componentInstance;
  });

  it('should prevent default and stop propagation when the anchor is disabled', () => {
    component.disabled = true;
    fixture.detectChanges();
    const event = new MouseEvent('click');
    const preventDefaultSpy = spyOn(event, 'preventDefault').and.callThrough();
    const stopImmediatePropagationSpy = spyOn(event, 'stopImmediatePropagation').and.callThrough();
    anchorElement.dispatchEvent(event);
    expect(preventDefaultSpy).toHaveBeenCalledTimes(1);
    expect(stopImmediatePropagationSpy).toHaveBeenCalledTimes(1);
  });
});

@Component({
  standalone: true,
  imports: [NzButtonModule],
  template: `
    <button
      nz-button
      [nzType]="nzType"
      [nzGhost]="nzGhost"
      [nzSearch]="nzSearch"
      [nzLoading]="nzLoading"
      [nzDanger]="nzDanger"
      [nzShape]="nzShape"
      [nzBlock]="nzBlock"
      [nzSize]="nzSize"
    >
      button
    </button>
  `
})
export class TestButtonComponent {
  @Input() nzBlock: boolean = false;
  @Input() nzGhost: boolean = false;
  @Input() nzSearch: boolean = false;
  @Input() nzLoading: boolean = false;
  @Input() nzDanger: boolean = false;
  @Input() nzType: NzButtonType = null;
  @Input() nzShape: NzButtonShape = null;
  @Input() nzSize: NzButtonSize = 'default';
}

// https://github.com/NG-ZORRO/ng-zorro-antd/issues/2191
@Component({
  standalone: true,
  imports: [NzIconModule, NzButtonModule],
  template: `
    <button nz-button nzType="primary" (click)="load()" [nzLoading]="loading">
      <span nz-icon nzType="poweroff"></span>
      {{ 'Click me!' }}
    </button>
  `
})
export class TestButtonBindingComponent {
  loading = false;
  load(): void {
    this.loading = true;
    setTimeout(() => (this.loading = false), 5000);
  }
}

// https://github.com/NG-ZORRO/ng-zorro-antd/issues/3079
@Component({
  standalone: true,
  imports: [NzIconModule, NzButtonModule],
  template: `
    <button nz-button>
      {{ title }}
      <span nz-icon nzType="caret-down"></span>
    </button>
  `
})
export class TestButtonWithIconComponent implements OnInit {
  title?: string;
  ngOnInit(): void {
    setTimeout(() => (this.title = 'button'), 5000);
  }
}

@Component({
  standalone: true,
  imports: [NzIconModule, NzButtonModule],
  template: `
    <button nz-button>
      <span nz-icon nzType="caret-down"></span>
    </button>
  `
})
export class TestButtonIconOnlyComponent {}

@Component({
  standalone: true,
  imports: [NzIconModule, NzButtonModule],
  template: `
    <button nz-button>
      <u nz-icon nzType="up"></u>
    </button>
  `
})
export class TestButtonIconOnlyWithAnyTagComponent {}

@Component({
  standalone: true,
  imports: [NzIconModule, NzButtonModule],
  template: `
    <button nz-button>
      <i nz-icon nzType="down"></i>
      <!-- comment -->
    </button>
  `
})
export class TestButtonIconOnlyWithCommentComponent {}

@Component({
  standalone: true,
  imports: [NzIconModule, NzButtonModule],
  template: `
    <button nz-button>
      <i nz-icon nzType="down"></i>
      text
    </button>
  `
})
export class TestButtonIconOnlyWithTextComponent {}

@Component({
  standalone: true,
  imports: [NzButtonModule],
  template: `
    <button nz-button>
      <span>text</span>
    </button>
  `
})
export class TestButtonIconOnlyWithoutIconComponent {}

@Component({
  standalone: true,
  imports: [NzIconModule, NzButtonModule],
  template: `
    <button nz-button nzLoading>
      <span nz-icon nzType="caret-down"></span>
    </button>
  `
})
export class TestButtonIconOnlyLoadingComponent {}

@Component({
  standalone: true,
  imports: [BidiModule, NzButtonModule],
  template: `
    <div [dir]="direction">
      <button
        nz-button
        [nzType]="nzType"
        [nzGhost]="nzGhost"
        [nzSearch]="nzSearch"
        [nzLoading]="nzLoading"
        [nzDanger]="nzDanger"
        [nzShape]="nzShape"
        [nzBlock]="nzBlock"
        [nzSize]="nzSize"
      >
        button
      </button>
    </div>
  `
})
export class TestButtonRtlComponent extends TestButtonComponent {
  @ViewChild(Dir) dir!: Dir;
  direction: Direction = 'rtl';
}

@Component({
  standalone: true,
  imports: [NzButtonModule],
  template: '<a nz-button [disabled]="disabled">anchor</a>'
})
export class TestAnchorComponent {
  disabled = false;
}
