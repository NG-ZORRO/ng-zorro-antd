import { ComponentFactoryResolver, Injector, ComponentRef, ComponentFactory, APP_INITIALIZER } from '@angular/core';
import { async, inject, TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';
import { NzRootComponent } from './nz-root.component';
import { NZ_ROOT_CONFIG, NzRootConfig } from './nz-root-config';

describe('NzRootComponent', () => {
  let component: NzRootComponent;
  let mockDocument: Document;
  let mockConfig: NzRootConfig;
  let mockElement: HTMLDivElement;

  beforeEach(() => {
    mockDocument = { head: { appendChild: () => null }, createElement: () => null } as any;
    mockConfig = { extraFontName: '', extraFontUrl: '' } as any;
    mockElement = {} as any;

    spyOn(mockDocument, 'createElement').and.returnValue(mockElement);
    spyOn(mockDocument.head, 'appendChild');
  });

  it('should apply extra font style when input being set & option not provided', () => {
    component = new NzRootComponent(mockDocument, undefined);
    component.nzExtraFontName = 'some-name';
    component.nzExtraFontUrl = 'some-url';

    component.ngOnInit();

    expect(mockDocument.createElement).toHaveBeenCalledWith('style');
    expect(mockDocument.head.appendChild).toHaveBeenCalledWith(mockElement);
  });

  it('should not apply extra font style when option being provided', () => {
    component = new NzRootComponent(mockDocument, mockConfig);
    component.nzExtraFontName = 'some-name';
    component.nzExtraFontUrl = 'some-url';

    component.ngOnInit();

    expect(mockDocument.createElement).not.toHaveBeenCalled();
    expect(mockDocument.head.appendChild).not.toHaveBeenCalled();
  });

  it('should not apply extra font style when option being provided', () => {
    component = new NzRootComponent(mockDocument, undefined);

    component.ngOnInit();

    expect(mockDocument.createElement).not.toHaveBeenCalled();
    expect(mockDocument.head.appendChild).not.toHaveBeenCalled();
  });
});
