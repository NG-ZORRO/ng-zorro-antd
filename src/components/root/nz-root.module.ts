import { CommonModule, DOCUMENT } from '@angular/common';
import { APP_INITIALIZER, ComponentFactoryResolver, ComponentRef, Inject, Injector, NgModule, OnDestroy, Optional } from '@angular/core';
import { createNzRootInitializer, NZ_ROOT_CONFIG } from './nz-root-config';
import { NzRootStyleComponent } from './nz-root-style.component';
import { NzRootComponent } from './nz-root.component';

@NgModule({
  exports         : [ NzRootComponent ],
  declarations    : [ NzRootComponent, NzRootStyleComponent ],
  imports         : [ CommonModule ],
  entryComponents : [ NzRootStyleComponent ],
  providers       : [
    { provide: APP_INITIALIZER, multi: true, useFactory: createNzRootInitializer, deps: [DOCUMENT, [new Optional(), NZ_ROOT_CONFIG]] },
  ],
})
export class NzRootModule implements OnDestroy {
  private _document: Document;
  private styleHostComponent: ComponentRef<NzRootStyleComponent>;

  /* tslint:disable-next-line:no-any */
  constructor(@Inject(DOCUMENT) _document: any, injector: Injector, resolver: ComponentFactoryResolver) {
    this._document = _document;
    const componentFactory = resolver.resolveComponentFactory(NzRootStyleComponent);
    const div = this._document.createElement('div');
    this.styleHostComponent = componentFactory.create(injector, null, div);
  }

  ngOnDestroy(): void {
    this.styleHostComponent.destroy();
  }
}
