/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { OverlayContainer } from '@angular/cdk/overlay';
import { ApplicationRef, Component, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';

import { provideNzNoAnimation } from 'ng-zorro-antd/core/animation';
import { provideNzIconsTesting } from 'ng-zorro-antd/icon/testing';

import { NzDrawerContentDirective } from './drawer-content.directive';
import { NzDrawerFooterDirective } from './drawer-footer.directive';
import { NzDrawerComponent } from './drawer.component';
import { NzDrawerService } from './drawer.service';

describe('NzDrawerFooterDirective', () => {
  let overlay: HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NzDrawerService, provideNzNoAnimation(), provideNzIconsTesting()]
    });
    overlay = TestBed.inject(OverlayContainer).getContainerElement();
  });

  it('should render a projected footer with the standalone imports', async () => {
    const fixture = TestBed.createComponent(NzDrawerWithFooterComponent);
    await fixture.whenStable();

    expect(overlay.querySelector('.ant-drawer-footer')?.textContent).toContain('Save');
    expect(overlay.querySelector('.ant-drawer-body')?.textContent).toContain('Body');
    expect(overlay.querySelector('.ant-drawer-body')?.textContent).not.toContain('Save');
  });

  it('should render a service content footer with working bindings and actions', async () => {
    const ref = TestBed.inject(NzDrawerService).create({ nzContent: NzDrawerFooterContentComponent });
    await firstValueFrom(ref.afterOpen);
    await TestBed.inject(ApplicationRef).whenStable();

    const button = overlay.querySelector<HTMLButtonElement>('.ant-drawer-footer button')!;
    expect(button.textContent).toBe('Save 0');
    button.click();
    await TestBed.inject(ApplicationRef).whenStable();
    expect(button.textContent).toBe('Save 1');
    expect(overlay.querySelector('.ant-drawer-body')?.textContent).not.toContain('Save');
    ref.close();
  });

  it('should add, remove and recreate a conditional footer after opening', async () => {
    const ref = TestBed.inject(NzDrawerService).create({ nzContent: NzDrawerFooterContentComponent });
    await firstValueFrom(ref.afterOpen);
    await TestBed.inject(ApplicationRef).whenStable();
    const content = ref.getContentComponent()!;

    content.showFooter.set(false);
    await TestBed.inject(ApplicationRef).whenStable();
    expect(overlay.querySelector('.ant-drawer-footer')).toBeNull();
    expect(ref.nzFooter).toBeUndefined();

    content.showFooter.set(true);
    await TestBed.inject(ApplicationRef).whenStable();
    expect(overlay.querySelector('.ant-drawer-footer')?.textContent).toContain('Save 0');
    ref.close();
  });

  it('should not clear a replacement footer when the directive is destroyed', async () => {
    const ref = TestBed.inject(NzDrawerService).create({ nzContent: NzDrawerFooterContentComponent });
    await firstValueFrom(ref.afterOpen);
    await TestBed.inject(ApplicationRef).whenStable();

    ref.updateConfig({ nzFooter: 'Replacement' });
    ref.getContentComponent()!.showFooter.set(false);
    await TestBed.inject(ApplicationRef).whenStable();

    expect(overlay.querySelector('.ant-drawer-footer')?.textContent).toBe('Replacement');
    ref.close();
  });

  it('should render late footer updates without manually running change detection', async () => {
    const ref = TestBed.inject(NzDrawerService).create({ nzContent: NzDrawerFooterContentComponent });
    await firstValueFrom(ref.afterOpen);
    await TestBed.inject(ApplicationRef).whenStable();

    ref.updateConfig({ nzFooter: 'Late footer' });
    await TestBed.inject(ApplicationRef).whenStable();
    expect(overlay.querySelector('.ant-drawer-footer')?.textContent).toBe('Late footer');

    ref.nzFooter = 'Assigned footer';
    await TestBed.inject(ApplicationRef).whenStable();
    expect(overlay.querySelector('.ant-drawer-footer')?.textContent).toBe('Assigned footer');
    ref.close();
  });

  it('should support a footer template outside a drawer', async () => {
    const fixture = TestBed.createComponent(NzStandaloneFooterComponent);
    await fixture.whenStable();
    expect(fixture.nativeElement.textContent).not.toContain('Unused footer');
  });
});

@Component({
  imports: [NzDrawerComponent, NzDrawerContentDirective, NzDrawerFooterDirective],
  template: `
    <nz-drawer nzVisible>
      <ng-container *nzDrawerContent>Body</ng-container>
      <div *nzDrawerFooter><button>Save</button></div>
    </nz-drawer>
  `
})
class NzDrawerWithFooterComponent {}

@Component({
  imports: [NzDrawerFooterDirective],
  template: `
    <p>Body</p>
    @if (showFooter()) {
      <ng-template nzDrawerFooter>
        <button (click)="save()">Save {{ count() }}</button>
      </ng-template>
    }
  `
})
class NzDrawerFooterContentComponent {
  readonly showFooter = signal(true);
  readonly count = signal(0);

  save(): void {
    this.count.update(value => value + 1);
  }
}

@Component({
  imports: [NzDrawerFooterDirective],
  template: `<ng-template nzDrawerFooter>Unused footer</ng-template>`
})
class NzStandaloneFooterComponent {}
