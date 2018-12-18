import { Component, TemplateRef, ViewChild } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { NzInputGroupComponent } from './nz-input-group.component';
import { NzInputDirective } from './nz-input.directive';
import { NzInputModule } from './nz-input.module';

describe('input-group', () => {
  let testComponent;
  let fixture;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports     : [ NzInputModule, FormsModule, ReactiveFormsModule ],
      declarations: [ NzTestInputGroupAddonComponent, NzTestInputGroupAffixComponent, NzTestInputGroupMultipleComponent, NzTestInputGroupColComponent, NzTestInputGroupMixComponent ],
      providers   : []
    }).compileComponents();
  }));
  describe('input group', () => {
    describe('addon', () => {
      let inputGroupElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputGroupAddonComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputGroupElement = fixture.debugElement.query(By.directive(NzInputGroupComponent)).nativeElement;
      });
      it('should not show addon without before and after content', () => {
        expect(inputGroupElement.firstElementChild.classList).not.toContain('ant-input-group');
        expect(inputGroupElement.firstElementChild.classList).toContain('ant-input');
      });
      it('should before content string work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild.classList).toContain('ant-input-group');
        expect(inputGroupElement.firstElementChild.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild.lastElementChild.classList).toContain('ant-input');
        expect(inputGroupElement.firstElementChild.firstElementChild.innerText).toBe('before');
      });
      it('should before content template work', () => {
        testComponent.beforeContent = testComponent.beforeTemplate;
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild.classList).toContain('ant-input-group');
        expect(inputGroupElement.firstElementChild.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild.lastElementChild.classList).toContain('ant-input');
        expect(inputGroupElement.firstElementChild.firstElementChild.innerText).toBe('beforeTemplate');
      });
      it('should after content string work', () => {
        testComponent.afterContent = 'after';
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild.classList).toContain('ant-input-group');
        expect(inputGroupElement.firstElementChild.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild.firstElementChild.classList).toContain('ant-input');
        expect(inputGroupElement.firstElementChild.lastElementChild.innerText).toBe('after');
      });
      it('should after content template work', () => {
        testComponent.afterContent = testComponent.afterTemplate;
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild.classList).toContain('ant-input-group');
        expect(inputGroupElement.firstElementChild.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild.firstElementChild.classList).toContain('ant-input');
        expect(inputGroupElement.firstElementChild.lastElementChild.innerText).toBe('afterTemplate');
      });
      it('should size work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-group-wrapper');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-group-wrapper-lg');
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-group-wrapper-sm');
      });
    });
    describe('affix', () => {
      let inputGroupElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputGroupAffixComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputGroupElement = fixture.debugElement.query(By.directive(NzInputGroupComponent)).nativeElement;
      });
      it('should not show addon without before and after content', () => {
        expect(inputGroupElement.firstElementChild.classList).toContain('ant-input');
      });
      it('should before content string work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild.classList).toContain('ant-input-prefix');
        expect(inputGroupElement.children.length).toBe(2);
        expect(inputGroupElement.lastElementChild.classList).toContain('ant-input');
        expect(inputGroupElement.firstElementChild.innerText).toBe('before');
      });
      it('should before content template work', () => {
        testComponent.beforeContent = testComponent.beforeTemplate;
        fixture.detectChanges();
        expect(inputGroupElement.firstElementChild.classList).toContain('ant-input-prefix');
        expect(inputGroupElement.children.length).toBe(2);
        expect(inputGroupElement.lastElementChild.classList).toContain('ant-input');
        expect(inputGroupElement.firstElementChild.innerText).toBe('beforeTemplate');
      });
      it('should after content string work', () => {
        testComponent.afterContent = 'after';
        fixture.detectChanges();
        expect(inputGroupElement.lastElementChild.classList).toContain('ant-input-suffix');
        expect(inputGroupElement.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild.classList).toContain('ant-input');
        expect(inputGroupElement.lastElementChild.innerText).toBe('after');
      });
      it('should after content template work', () => {
        testComponent.afterContent = testComponent.afterTemplate;
        fixture.detectChanges();
        expect(inputGroupElement.lastElementChild.classList).toContain('ant-input-suffix');
        expect(inputGroupElement.children.length).toBe(2);
        expect(inputGroupElement.firstElementChild.classList).toContain('ant-input');
        expect(inputGroupElement.lastElementChild.innerText).toBe('afterTemplate');
      });
      it('should size work', () => {
        testComponent.beforeContent = 'before';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-affix-wrapper');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-affix-wrapper-lg');
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-affix-wrapper-sm');
      });
    });
    describe('multiple', () => {
      let inputGroupElement;
      let inputs;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputGroupMultipleComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputGroupElement = fixture.debugElement.query(By.directive(NzInputGroupComponent)).nativeElement;
        inputs = fixture.debugElement.queryAll(By.directive(NzInputDirective));
      });
      it('should compact work', () => {
        expect(inputGroupElement.classList).not.toContain('ant-input-group-compact');
        testComponent.compact = true;
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-group-compact');
      });
      it('should search work', () => {
        expect(inputGroupElement.classList).not.toContain('ant-input-search-enter-button');
        expect(inputGroupElement.classList).not.toContain('ant-input-search');
        testComponent.search = true;
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-search-enter-button');
        expect(inputGroupElement.classList).toContain('ant-input-search');
      });
      it('should size work', () => {
        expect(inputGroupElement.classList).toContain('ant-input-group');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-group-lg');
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-group-sm');
      });
      it('should search size work', () => {
        testComponent.search = true;
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-search');
        testComponent.size = 'large';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-search-lg');
        testComponent.size = 'small';
        fixture.detectChanges();
        expect(inputGroupElement.classList).toContain('ant-input-search-sm');
      });
    });
    describe('col', () => {
      let inputGroupElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputGroupColComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputGroupElement = fixture.debugElement.query(By.directive(NzInputGroupComponent)).nativeElement;
      });
      it('should compact work', () => {
        expect(inputGroupElement.classList).toContain('ant-input-group');
      });
    });
    describe('mix', () => {
      let inputGroupElement;
      beforeEach(() => {
        fixture = TestBed.createComponent(NzTestInputGroupMixComponent);
        testComponent = fixture.debugElement.componentInstance;
        fixture.detectChanges();
        inputGroupElement = fixture.debugElement.query(By.directive(NzInputGroupComponent)).nativeElement;
      });
      it('should mix work', () => {
        expect(inputGroupElement.querySelector('.ant-input-affix-wrapper').nextElementSibling.classList).toContain('ant-input-group-addon');
      });
    });
  });
});

@Component({
  selector: 'nz-test-input-group-addon',
  template: `
    <nz-input-group [nzAddOnBefore]="beforeContent" [nzAddOnAfter]="afterContent" [nzSize]="size">
      <input type="text" nz-input>
    </nz-input-group>
    <ng-template #beforeTemplate>beforeTemplate</ng-template>
    <ng-template #afterTemplate>afterTemplate</ng-template>
  `
})
export class NzTestInputGroupAddonComponent {
  @ViewChild('beforeTemplate') beforeTemplate: TemplateRef<void>;
  @ViewChild('afterTemplate') afterTemplate: TemplateRef<void>;
  beforeContent;
  afterContent;
  size = 'default';
}

@Component({
  selector: 'nz-test-input-group-affix',
  template: `
    <nz-input-group [nzPrefix]="beforeContent" [nzSuffix]="afterContent" [nzSize]="size">
      <input type="text" nz-input>
    </nz-input-group>
    <ng-template #beforeTemplate>beforeTemplate</ng-template>
    <ng-template #afterTemplate>afterTemplate</ng-template>
  `
})
export class NzTestInputGroupAffixComponent {
  @ViewChild('beforeTemplate') beforeTemplate: TemplateRef<void>;
  @ViewChild('afterTemplate') afterTemplate: TemplateRef<void>;
  beforeContent;
  afterContent;
  size = 'default';
}

@Component({
  selector: 'nz-test-input-group-multiple',
  template: `
    <nz-input-group [nzCompact]="compact" [nzSearch]="search" [nzSize]="size">
      <input type="text" nz-input>
      <input type="text" nz-input>
    </nz-input-group>
  `
})
export class NzTestInputGroupMultipleComponent {
  compact = false;
  search = false;
  size = 'default';
}

/** https://github.com/NG-ZORRO/ng-zorro-antd/issues/1795 **/
@Component({
  selector: 'nz-test-input-group-mix',
  template: `
    <nz-input-group nzPrefixIcon="anticon anticon-user" nzAddOnAfter="@example.com">
      <input type="text" nz-input placeholder="邮箱地址">
    </nz-input-group>
  `
})
export class NzTestInputGroupMixComponent {
}

@Component({
  selector: 'nz-test-input-group-col',
  template: `
    <nz-input-group>
      <div nz-col nzSpan="4">
        <input type="text" nz-input [ngModel]="'0571'">
      </div>
      <div nz-col nzSpan="8">
        <input type="text" nz-input [ngModel]="'26888888'">
      </div>
    </nz-input-group>
  `
})
export class NzTestInputGroupColComponent {
}
