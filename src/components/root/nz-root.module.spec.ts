/* tslint:disable:no-any ban-types */
import { APP_INITIALIZER, ComponentFactory, ComponentFactoryResolver, ComponentRef, Injector } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { NzRootStyleComponent } from './nz-root-style.component';
import { NzRootModule } from './nz-root.module';

describe('NzRootModule', () => {
  let ngModule: NzRootModule;
  let mockDocument: Document;
  let mockInjector: Injector;
  let mockFactoryResolver: ComponentFactoryResolver;
  let mockElement: HTMLDivElement;
  let mockComponentFactory: ComponentFactory<NzRootStyleComponent>;
  let mockComponentRef: ComponentRef<NzRootStyleComponent>;

  beforeEach(() => {
    mockDocument = { createElement: () => null } as any;
    mockInjector = {} as any;
    mockFactoryResolver = { resolveComponentFactory: () => null } as any;
    mockElement = {} as any;
    mockComponentFactory = { create: () => null } as any;
    mockComponentRef = { destroy: () => null } as any;

    spyOn(mockDocument, 'createElement').and.returnValue(mockElement);
    spyOn(mockComponentRef, 'destroy');
    spyOn(mockComponentFactory, 'create').and.returnValue(mockComponentRef);
    spyOn(mockFactoryResolver, 'resolveComponentFactory').and.returnValue(mockComponentFactory);
  });

  beforeEach(() => {
    ngModule = new NzRootModule(mockDocument, mockInjector, mockFactoryResolver);
  });

  it('should create style component when start', () => {
    expect(mockDocument.createElement).toHaveBeenCalledWith('div');
    expect(mockFactoryResolver.resolveComponentFactory).toHaveBeenCalledWith(NzRootStyleComponent);
    expect(mockComponentFactory.create).toHaveBeenCalledWith(mockInjector, null, mockElement);
  });

  it('should destroy style component when terminate', () => {
    ngModule.ngOnDestroy();

    expect(mockComponentRef.destroy).toHaveBeenCalled();
  });
});

describe('NzRootModule with Angular integration', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NzRootModule],
      declarations: [],
      providers: [],
    }).compileComponents();
  }));

  it('should provide APP_INITIALIZER', inject([APP_INITIALIZER], (initializers: Function[]) => {
    expect(initializers.some(x => x.name === 'nzRootInitializer')).toBe(true);
  }));
});
