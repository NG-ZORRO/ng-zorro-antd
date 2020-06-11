import { Component, Input, OnInit } from '@angular/core';
import { fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ɵComponentBed as ComponentBed, ɵcreateComponentBed as createComponentBed } from 'ng-zorro-antd/core/testing';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';
import { NzButtonComponent, NzButtonModule, NzButtonShape, NzButtonSize, NzButtonType } from './index';

describe('button', () => {
  describe('anchor', () => {
    let testBed: ComponentBed<TestAnchorButtonComponent>;
    let buttonElement: HTMLAnchorElement;

    beforeEach(() => {
      testBed = createComponentBed(TestAnchorButtonComponent, { imports: [NzButtonModule] });
      buttonElement = testBed.debugElement.query(By.css('a')).nativeElement;
    });

    it('should disabled work', () => {
      testBed.component.disabled = false;
      testBed.fixture.detectChanges();

      expect(buttonElement.getAttribute('disabled')).toBeNull();

      testBed.component.disabled = true;
      testBed.fixture.detectChanges();

      expect(buttonElement.getAttribute('disabled')).not.toBeNull();
      expect(buttonElement.getAttribute('tabindex')).toBe('-1');

      // If the page reloads will be thrown an error
      expect(() => {
        buttonElement.click();
      }).not.toThrowError();
    });
  });
  describe('className', () => {
    let testBed: ComponentBed<TestButtonComponent>;
    let buttonElement: HTMLButtonElement;
    beforeEach(() => {
      testBed = createComponentBed(TestButtonComponent, { declarations: [NzButtonComponent] });
      buttonElement = testBed.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
    });

    it('should apply classname', () => {
      expect(buttonElement.className).toBe('ant-btn');
    });
    it('should apply classname based on nzDanger', () => {
      expect(buttonElement.classList).not.toContain('ant-btn-dangerous');
      testBed.component.nzDanger = true;
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-dangerous');
    });
    it('should apply classname based on nzGhost', () => {
      expect(buttonElement.classList).not.toContain('ant-btn-background-ghost');
      testBed.component.nzGhost = true;
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-background-ghost');
    });
    it('should apply classname based on nzSearch', () => {
      expect(buttonElement.classList).not.toContain('ant-input-search-button');
      testBed.component.nzSearch = true;
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-input-search-button');
    });
    it('should apply classname based on nzLoading', () => {
      expect(buttonElement.classList).not.toContain('ant-btn-loading');
      testBed.component.nzLoading = true;
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-loading');
    });
    it('should apply classname based on nzBlock', () => {
      expect(buttonElement.classList).not.toContain('ant-btn-block');
      testBed.component.nzBlock = true;
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-block');
    });
    it('should apply classname based on nzType', () => {
      testBed.component.nzType = 'primary';
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-primary');
      testBed.component.nzType = 'link';
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-link');
      testBed.component.nzType = 'danger';
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-danger');
      testBed.component.nzType = 'dashed';
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-dashed');
      testBed.component.nzType = null;
      testBed.fixture.detectChanges();
      expect(buttonElement.className).toBe('ant-btn');
    });
    it('should apply classname based on nzShape', () => {
      testBed.component.nzShape = 'round';
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-round');
      testBed.component.nzShape = 'circle';
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-circle');
    });
    it('should apply classname based on nzSize', () => {
      testBed.component.nzSize = 'large';
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-lg');
      testBed.component.nzSize = 'small';
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-sm');
      testBed.component.nzSize = 'default';
      testBed.fixture.detectChanges();
      expect(buttonElement.className).toBe('ant-btn');
    });
  });
  describe('loading icon', () => {
    it('should hide icon when loading correct', fakeAsync(() => {
      const testBed = createComponentBed(TestButtonBindingComponent, { imports: [NzIconTestModule], declarations: [NzButtonComponent] });
      const buttonElement = testBed.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
      expect(buttonElement.classList.contains('ant-btn-loading')).toBe(false);
      expect(buttonElement.classList).not.toContain('ant-btn-icon-only');
      expect(buttonElement.firstElementChild.querySelector('svg')).not.toBe(null);
      expect(buttonElement.firstElementChild!.classList.contains('anticon-poweroff')).toBe(true);
      expect(buttonElement.firstElementChild!.classList.contains('anticon-loading')).toBe(false);
      buttonElement.click();
      testBed.fixture.detectChanges();
      expect(buttonElement.classList.contains('ant-btn-loading')).toBe(true);
      expect(buttonElement.firstElementChild!.classList.contains('anticon-loading')).toBe(true);
      expect(buttonElement.querySelector('.anticon-poweroff').style.cssText).toBe('display: none;');
      tick(5000);
      testBed.fixture.detectChanges();
      expect(buttonElement.classList.contains('ant-btn-loading')).toBe(false);
      expect(buttonElement.firstElementChild!.classList.contains('anticon-loading')).toBe(false);
      expect(buttonElement.querySelector('.anticon-poweroff').style.cssText).toBe('');
    }));
  });
  describe('insert span', () => {
    it('should insert span correctly', fakeAsync(() => {
      const testBed = createComponentBed(TestButtonWithIconComponent, { imports: [NzIconTestModule], declarations: [NzButtonComponent] });
      const buttonElement = testBed.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
      testBed.fixture.detectChanges();
      expect(buttonElement.firstElementChild.tagName).toBe('SPAN');
      tick(5000);
      testBed.fixture.detectChanges();
      expect(buttonElement.firstElementChild.innerText).toContain('button');
    }));
  });
  describe('icon only', () => {
    it('should icon only works correctly', fakeAsync(() => {
      const testBed = createComponentBed(TestButtonIconOnlyComponent, { imports: [NzIconTestModule], declarations: [NzButtonComponent] });
      const buttonElement = testBed.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-icon-only');
    }));
    it('should icon only loading works correctly', () => {
      const testBed = createComponentBed(TestButtonIconOnlyLoadingComponent, {
        imports: [NzIconTestModule],
        declarations: [NzButtonComponent]
      });
      testBed.fixture.detectChanges();
      const buttonElement = testBed.debugElement.query(By.directive(NzButtonComponent)).nativeElement;
      testBed.fixture.detectChanges();
      expect(buttonElement.classList).toContain('ant-btn-icon-only');
    });
  });
});

@Component({
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
  template: `
    <button nz-button nzType="primary" (click)="load()" [nzLoading]="loading">
      <i nz-icon nzType="poweroff"></i>
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
  template: `
    <button nz-button>
      {{ title }}
      <i nz-icon nzType="caret-down"></i>
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
  template: `
    <button nz-button>
      <i nz-icon nzType="caret-down"></i>
    </button>
  `
})
export class TestButtonIconOnlyComponent {}

@Component({
  template: `
    <button nz-button nzLoading>
      <i nz-icon nzType="caret-down"></i>
    </button>
  `
})
export class TestButtonIconOnlyLoadingComponent {}

@Component({
  template: ` <a nz-button href="https://ng.ant.design/" [disabled]="disabled">anchor</a> `
})
export class TestAnchorButtonComponent {
  disabled = false;
}
