import { createNzRootInitializer, NzRootConfig } from './nz-root-config';

describe('NzRootConfig', () => {
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

  it('should apply extra font style when option provided', () => {
    const iniliatizer = createNzRootInitializer(mockDocument, mockConfig);
    iniliatizer();

    expect(mockDocument.createElement).toHaveBeenCalledWith('style');
    expect(mockDocument.head.appendChild).toHaveBeenCalledWith(mockElement);
  });

  it('should not apply extra font style when option not provided', () => {
    const iniliatizer = createNzRootInitializer(mockDocument);
    iniliatizer();

    expect(mockDocument.createElement).not.toHaveBeenCalled();
    expect(mockDocument.head.appendChild).not.toHaveBeenCalled();
  });
});
