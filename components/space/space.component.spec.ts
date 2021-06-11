import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NzSpaceAlign } from 'ng-zorro-antd/space';
import { NzSpaceComponent } from 'ng-zorro-antd/space/space.component';

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
    let items = fixture.debugElement.queryAll(By.css('.ant-space-item'));
    expect(items.length).toBe(2);

    items.forEach((item, i) => {
      const element = item.nativeElement as HTMLElement;
      if (i < items.length - 1) {
        expect(element.style.marginRight).toBe('8px');
      } else {
        expect(element.style.marginRight).toBe('');
      }
    });

    component.show = true;
    fixture.detectChanges();

    items = fixture.debugElement.queryAll(By.css('.ant-space-item'));
    expect(items.length).toBe(3);
    items.forEach((item, i) => {
      const element = item.nativeElement as HTMLElement;
      if (i < items.length - 1) {
        expect(element.style.marginRight).toBe('8px');
      } else {
        expect(element.style.marginRight).toBe('');
      }
    });
  });

  it('should render size', () => {
    const items = fixture.debugElement.queryAll(By.css('.ant-space-item'));
    items.forEach((item, i) => {
      const element = item.nativeElement as HTMLElement;
      if (i < items.length - 1) {
        expect(element.style.marginRight).toBe('8px');
      } else {
        expect(element.style.marginRight).toBe('');
      }
    });

    component.size = 'middle';
    fixture.detectChanges();

    items.forEach((item, i) => {
      const element = item.nativeElement as HTMLElement;
      if (i < items.length - 1) {
        expect(element.style.marginRight).toBe('16px');
      } else {
        expect(element.style.marginRight).toBe('');
      }
    });

    component.size = 'large';
    fixture.detectChanges();

    items.forEach((item, i) => {
      const element = item.nativeElement as HTMLElement;
      if (i < items.length - 1) {
        expect(element.style.marginRight).toBe('24px');
      } else {
        expect(element.style.marginRight).toBe('');
      }
    });
  });

  it('should render customize size', () => {
    component.size = 36;
    fixture.detectChanges();

    const items = fixture.debugElement.queryAll(By.css('.ant-space-item'));

    items.forEach((item, i) => {
      const element = item.nativeElement as HTMLElement;
      if (i < items.length - 1) {
        expect(element.style.marginRight).toBe('36px');
      } else {
        expect(element.style.marginRight).toBe('');
      }
    });

    component.size = 18;
    fixture.detectChanges();

    items.forEach((item, i) => {
      const element = item.nativeElement as HTMLElement;
      if (i < items.length - 1) {
        expect(element.style.marginRight).toBe('18px');
      } else {
        expect(element.style.marginRight).toBe('');
      }
    });
  });

  it('should set direction', () => {
    const items = fixture.debugElement.queryAll(By.css('.ant-space-item'));

    component.direction = 'vertical';
    fixture.detectChanges();

    const spaceComponent = fixture.debugElement.query(By.directive(NzSpaceComponent));

    expect((spaceComponent.nativeElement as HTMLElement).classList).toContain('ant-space-vertical');

    items.forEach((item, i) => {
      const element = item.nativeElement as HTMLElement;
      if (i < items.length - 1) {
        expect(element.style.marginRight).toBeFalsy();
        expect(element.style.marginBottom).toBeTruthy();
      } else {
        expect(element.style.marginRight).toBeFalsy();
        expect(element.style.marginBottom).toBeFalsy();
      }
    });

    component.direction = 'horizontal';
    fixture.detectChanges();

    expect((spaceComponent.nativeElement as HTMLElement).classList).toContain('ant-space-horizontal');

    items.forEach((item, i) => {
      const element = item.nativeElement as HTMLElement;
      if (i < items.length - 1) {
        expect(element.style.marginRight).toBeTruthy();
        expect(element.style.marginBottom).toBeFalsy();
      } else {
        expect(element.style.marginRight).toBeFalsy();
        expect(element.style.marginBottom).toBeFalsy();
      }
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

  it('should render split', () => {
    component.showSplit = true;
    fixture.detectChanges();

    let items = fixture.debugElement.queryAll(By.css('.ant-space-item'));
    let splits = fixture.debugElement.queryAll(By.css('.ant-space-split'));
    expect(items.length).toBe(2);
    expect(splits.length).toBe(1);

    items.forEach((item, i) => {
      const element = item.nativeElement as HTMLElement;
      if (i < items.length - 1) {
        expect(element.style.marginRight).toBe('4px');
      } else {
        expect(element.style.marginRight).toBe('');
      }
    });

    splits.forEach(item => {
      const element = item.nativeElement as HTMLElement;
      expect(element.style.marginRight).toBe('4px');
    });

    component.show = true;
    fixture.detectChanges();

    items = fixture.debugElement.queryAll(By.css('.ant-space-item'));
    splits = fixture.debugElement.queryAll(By.css('.ant-space-split'));

    expect(items.length).toBe(3);
    expect(splits.length).toBe(2);

    splits.forEach(item => {
      const element = item.nativeElement as HTMLElement;
      expect(element.style.marginRight).toBe('4px');
    });
  });
});

@Component({
  template: `
    <nz-space [nzSplit]="showSplit ? spaceSplit : null" [nzSize]="size" [nzDirection]="direction" [nzAlign]="align">
      <div *nzSpaceItem>item</div>
      <div *nzSpaceItem>item</div>
      <ng-container *ngIf="show">
        <div *nzSpaceItem>item</div>
      </ng-container>
    </nz-space>

    <ng-template #spaceSplit>|</ng-template>
  `
})
class SpaceTestComponent {
  size: string | number = 'small';
  direction = 'horizontal';
  show = false;
  align?: NzSpaceAlign;
  showSplit = false;
}
