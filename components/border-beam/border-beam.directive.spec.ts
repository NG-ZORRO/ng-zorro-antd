/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NzBorderBeamGradientStop } from './border-beam.directive';
import { NzBorderBeamModule } from './border-beam.module';

describe('border-beam', () => {
  let fixture: ComponentFixture<NzTestBorderBeamComponent>;
  let component: NzTestBorderBeamComponent;

  beforeEach(async () => {
    fixture = TestBed.createComponent(NzTestBorderBeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should append an inaccessible decorative beam to its host', () => {
    const host = getHost(fixture);
    const beam = host.querySelector<HTMLElement>('.ant-border-beam');

    expect(beam).toBeTruthy();
    expect(beam?.getAttribute('aria-hidden')).toBe('true');
    expect(beam?.parentElement).toBe(host);
  });

  it('should support multiple beams and distribute their delays evenly', async () => {
    component.count.set(3);
    fixture.detectChanges();
    await fixture.whenStable();

    const beams = getHost(fixture).querySelectorAll<HTMLElement>('.ant-border-beam');
    expect(beams).toHaveLength(3);
    expect(beams[0].style.getPropertyValue('--nz-border-beam-delay')).toBe('0s');
    expect(beams[1].style.getPropertyValue('--nz-border-beam-delay')).toBe('-2s');
    expect(beams[2].style.getPropertyValue('--nz-border-beam-delay')).toBe('-4s');
  });

  it('should support solid and gradient colors', async () => {
    component.color.set('#36cfc9');
    fixture.detectChanges();
    await fixture.whenStable();

    const beam = getHost(fixture).querySelector<HTMLElement>('.ant-border-beam')!;
    expect(beam.style.getPropertyValue('--nz-border-beam-gradient')).toBe(
      'linear-gradient(to left, #36cfc9 0%, #36cfc9 70%, transparent)'
    );

    component.color.set([
      { color: '#1677ff', percent: 0 },
      { color: '#36cfc9', percent: 55 },
      { color: '#95de64', percent: 100 }
    ]);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(beam.style.getPropertyValue('--nz-border-beam-gradient')).toBe(
      'linear-gradient(to left, #1677ff 0%, #36cfc9 38.5%, #95de64 70%, transparent)'
    );
  });

  it('should use the host border width as the default outset', () => {
    const beam = getHost(fixture).querySelector<HTMLElement>('.ant-border-beam')!;
    expect(beam.style.getPropertyValue('--nz-border-beam-inset-offset')).toBe('-2px -2px -2px -2px');
  });

  it('should remove the beam when disabled', async () => {
    component.enabled.set(false);
    fixture.detectChanges();
    await fixture.whenStable();

    expect(getHost(fixture).querySelector('.ant-border-beam')).toBeNull();
  });
});

function getHost(fixture: ComponentFixture<NzTestBorderBeamComponent>): HTMLElement {
  return (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>('.beam-host')!;
}

@Component({
  imports: [NzBorderBeamModule],
  template: `
    <div
      class="beam-host"
      nzBorderBeam
      [nzBorderBeam]="enabled()"
      [nzBorderBeamColor]="color()"
      [nzBorderBeamCount]="count()"
      style="position: relative; border: 2px solid; border-radius: 8px"
    >
      content
    </div>
  `
})
class NzTestBorderBeamComponent {
  readonly enabled = signal(true);
  readonly color = signal<NzBorderBeamGradientStop[] | string | undefined>(undefined);
  readonly count = signal(1);
}
