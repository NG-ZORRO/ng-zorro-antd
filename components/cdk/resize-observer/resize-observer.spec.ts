/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { Component, EventEmitter, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';

import { NzResizeObserverDirective } from 'ng-zorro-antd/cdk/resize-observer/resize-observer.directive';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

describe('resize observer', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let directive: NzResizeObserverDirective;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    directive = fixture.debugElement.children[0].injector.get(NzResizeObserverDirective);
  });

  it('should have correct initial values', () => {
    expect(directive.nzResizeObserve).toBeDefined();
    expect(directive.nzResizeObserve).toBeInstanceOf(EventEmitter);

    expect(directive.nzResizeObserverDisabled).toEqual(false);

    expect(directive['currentSubscription']).toEqual(null);
  });

  it('should call subscribe when all the conditions are met', () => {
    directive['currentSubscription'] = null;
    directive.nzResizeObserverDisabled = false;
    spyOn<NzSafeAny>(directive, 'subscribe');
    directive.ngAfterContentInit();
    expect(directive['subscribe']).toHaveBeenCalled();
  });

  it('should not call subscribe when nzResizeObserverDisabled is true', () => {
    directive['currentSubscription'] = null;
    directive.nzResizeObserverDisabled = true;
    spyOn<NzSafeAny>(directive, 'subscribe');
    directive.ngAfterContentInit();
    expect(directive['subscribe']).not.toHaveBeenCalled();
  });

  it('should not call subscribe when currentSubscription is truthy', () => {
    directive['currentSubscription'] = new Subscription();
    directive.nzResizeObserverDisabled = false;
    spyOn<NzSafeAny>(directive, 'subscribe');
    directive.ngAfterContentInit();
    expect(directive['subscribe']).not.toHaveBeenCalled();
  });

  it('should call unsubscribe when nzResizeObserve is changed and nzResizeObserverDisabled is true', () => {
    const change = {
      nzResizeObserve: {}
    };
    spyOn<NzSafeAny>(directive, 'unsubscribe');
    directive.nzResizeObserverDisabled = true;
    directive.ngOnChanges(change as unknown as SimpleChanges);
    expect(directive['unsubscribe']).toHaveBeenCalled();
  });

  it('should call subscribe when nzResizeObserve is changed and nzResizeObserverDisabled is false', () => {
    const change = {
      nzResizeObserve: {}
    };
    spyOn<NzSafeAny>(directive, 'subscribe');
    directive.nzResizeObserverDisabled = false;
    directive.ngOnChanges(change as unknown as SimpleChanges);
    expect(directive['subscribe']).toHaveBeenCalled();
  });

  it('should call correct methods when calling subscribe', () => {
    spyOn<NzSafeAny>(directive, 'unsubscribe');
    directive['subscribe']();
    expect(directive['unsubscribe']).toHaveBeenCalled();
  });

  it('should destroy the observedElements', () => {
    const element = document.createElement('div');
    directive['nzResizeObserver'].observe(element);
    fixture.detectChanges();
    spyOn<NzSafeAny>(directive['nzResizeObserver'], 'cleanupObserver');
    fixture.destroy();
    expect(directive['nzResizeObserver']['cleanupObserver']).toHaveBeenCalled();
  });

  it('should return correct resizeObserver if it is supported', () => {
    // eslint-disable-next-line no-global-assign
    ResizeObserver = undefined as NzSafeAny;
    const result = directive['nzResizeObserver']['nzResizeObserverFactory'].create(jasmine.createSpy('callback'));
    expect(result).toEqual(null);
  });
});

@Component({
  template: `<div nzResizeObserver></div>`,
  imports: [NzResizeObserverDirective]
})
class TestHostComponent {}
