import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzSpaceAlign } from 'ng-zorro-antd/space';
import { NzSpaceComponent } from 'ng-zorro-antd/space/space.component';

import { NzSpaceItemComponent } from './space-item.component';
import { NzSpaceModule } from './space.module';

describe('Space', () => {
  let component: SpaceTestComponent;
  let fixture: ComponentFixture<SpaceTestComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [NzSpaceModule],
        declarations: [SpaceTestComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SpaceTestComponent);
    component = fixture.componentInstance;
    component.size = 'small';
    component.direction = 'horizontal';
    fixture.detectChanges();
  });

  it('should render size when the items changes', () => {
    let items = fixture.debugElement.queryAll(By.directive(NzSpaceItemComponent));
    expect(items.length).toBe(2);

    items.forEach(item => {
      const element = item.nativeElement as HTMLElement;
      expect(element.style.marginRight).toBe('8px');
    });

    component.show = true;
    fixture.detectChanges();

    items = fixture.debugElement.queryAll(By.directive(NzSpaceItemComponent));
    expect(items.length).toBe(3);
    items.forEach(item => {
      const element = item.nativeElement as HTMLElement;
      expect(element.style.marginRight).toBe('8px');
    });
  });

  it('should render size', () => {
    const items = fixture.debugElement.queryAll(By.directive(NzSpaceItemComponent));
    items.forEach(item => {
      const element = item.nativeElement as HTMLElement;
      expect(element.style.marginRight).toBe('8px');
    });

    component.size = 'middle';
    fixture.detectChanges();

    items.forEach(item => {
      const element = item.nativeElement as HTMLElement;
      expect(element.style.marginRight).toBe('16px');
    });

    component.size = 'large';
    fixture.detectChanges();

    items.forEach(item => {
      const element = item.nativeElement as HTMLElement;
      expect(element.style.marginRight).toBe('24px');
    });
  });

  it('should render customize size', () => {
    component.size = 36;
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.directive(NzSpaceItemComponent));
    items.forEach(item => {
      const element = item.nativeElement as HTMLElement;
      expect(element.style.marginRight).toBe('36px');
    });

    component.size = 18;
    fixture.detectChanges();

    items.forEach(item => {
      const element = item.nativeElement as HTMLElement;
      expect(element.style.marginRight).toBe('18px');
    });
  });

  it('should set direction', () => {
    const items = fixture.debugElement.queryAll(By.directive(NzSpaceItemComponent));

    component.direction = 'vertical';
    fixture.detectChanges();

    const spaceComponent = fixture.debugElement.query(By.directive(NzSpaceComponent));

    expect((spaceComponent.nativeElement as HTMLElement).classList).toContain('ant-space-vertical');

    items.forEach(item => {
      const element = item.nativeElement as HTMLElement;
      expect(element.style.marginRight).toBeFalsy();
      expect(element.style.marginBottom).toBeTruthy();
    });

    component.direction = 'horizontal';
    fixture.detectChanges();

    expect((spaceComponent.nativeElement as HTMLElement).classList).toContain('ant-space-horizontal');

    items.forEach(item => {
      const element = item.nativeElement as HTMLElement;
      expect(element.style.marginRight).toBeTruthy();
      expect(element.style.marginBottom).toBeFalsy();
    });
  });
  it('should set align', () => {
    component.direction = 'vertical';
    fixture.detectChanges();

    const spaceComponent = fixture.debugElement.query(By.directive(NzSpaceComponent));
    const spaceNativeElement = spaceComponent.nativeElement as HTMLElement;
    expect(spaceNativeElement.classList).toContain('ant-space-vertical');

    spaceNativeElement.classList.forEach(className => {
      expect(className.indexOf('ant-space-align') === -1).toBe(true);
    });

    component.direction = 'horizontal';
    fixture.detectChanges();

    expect(spaceNativeElement.classList).toContain('ant-space-align-center');

    component.align = 'end';
    fixture.detectChanges();

    expect(spaceNativeElement.classList).toContain('ant-space-align-end');
  });
});

@Component({
  template: `
    <nz-space [nzSize]="size" [nzDirection]="direction" [nzAlign]="align">
      <nz-space-item>
        <div>item</div>
      </nz-space-item>
      <nz-space-item>
        <div>item</div>
      </nz-space-item>
      <nz-space-item *ngIf="show">
        <div>item</div>
      </nz-space-item>
    </nz-space>
  `
})
class SpaceTestComponent {
  size: string | number = 'small';
  direction = 'horizontal';
  show = false;
  align?: NzSpaceAlign;
}
