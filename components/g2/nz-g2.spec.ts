import { DebugElement, Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { NzDemoG2BasicComponent } from 'ng-zorro-antd/g2/demo/basic';
import { NzG2Directive } from 'ng-zorro-antd/g2/nz-g2.directive';
import { NzG2Module } from 'ng-zorro-antd/g2/nz-g2.module';

describe('nz g2', () => {
  // tslint:disable-next-line no-any
  function configureG2TestingModule(declarations: Array<Type<any>>): void {
    TestBed.configureTestingModule({
      imports: [NzG2Module],
      declarations: declarations
    }).compileComponents();
  }

  it('should render graph correctly', () => {
    let fixture: ComponentFixture<NzDemoG2BasicComponent>;
    let g2Directive: DebugElement;

    configureG2TestingModule([NzDemoG2BasicComponent]);
    fixture = TestBed.createComponent(NzDemoG2BasicComponent);
    fixture.detectChanges();

    g2Directive = fixture.debugElement.query(By.directive(NzG2Directive));
    expect(g2Directive).toBeTruthy();
    expect((g2Directive.nativeElement as HTMLDivElement).classList).toContain('ant-g2');
  });
});
