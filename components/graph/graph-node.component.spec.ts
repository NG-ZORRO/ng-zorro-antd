/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { vi } from 'vitest';

import { NzGraph } from './graph';
import { NzGraphNodeComponent } from './graph-node.component';
import { NzGraphNode } from './interface';

describe('graph node', () => {
  let fixture: ComponentFixture<NzGraphNodeComponent>;
  let component: NzGraphNodeComponent;
  let element: HTMLElement;

  const node = {
    id: 'node',
    name: 'node',
    x: 160,
    y: 100,
    width: 120,
    height: 40,
    coreBox: { width: 120 }
  } as NzGraphNode;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      providers: [{ provide: NzGraph, useValue: { nzNodeClick: new EventEmitter() } }]
    });

    fixture = TestBed.createComponent(NzGraphNodeComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.componentRef.setInput('node', { ...node });
    await fixture.whenStable();
  });

  it('should use unitless coordinates for SVG transforms without animation', () => {
    component.makeNoAnimation();

    expect(element.getAttribute('transform')).toBe('translate(100, 80)');
  });

  it('should use CSS pixel values for animation and unitless coordinates for the SVG transform', async () => {
    await component.makeAnimation();

    expect(element.getAttribute('transform')).toBe('translate(100, 80)');

    const parentAnimation = { onfinish: null } as unknown as Animation;
    const animate = vi.fn().mockReturnValue(parentAnimation);
    const group = element.querySelector('g')!;
    Object.defineProperty(element, 'animate', { configurable: true, value: animate });
    Object.defineProperty(group, 'animate', { configurable: true, value: vi.fn() });

    component.node = { ...node, x: 220 };
    const animationFinished = component.makeAnimation();

    expect(animate).toHaveBeenCalledWith(
      [{ transform: 'translate(100px, 80px)' }, { transform: 'translate(160px, 80px)' }],
      { duration: 150, easing: 'ease-out', fill: 'forwards' }
    );

    parentAnimation.onfinish!(new Event('finish') as AnimationPlaybackEvent);
    await animationFinished;

    expect(element.getAttribute('transform')).toBe('translate(160, 80)');
  });
});
