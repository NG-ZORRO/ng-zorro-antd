import { NgModule, OnDestroy, ComponentRef, ComponentFactoryResolver, Inject, Optional, Injector, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';
import { NzRootComponent } from './nz-root.component';
import { NzRootStyleComponent } from './nz-root-style.component';
import { NZ_ROOT_CONFIG, createNzRootInitializer } from './nz-root-config';

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
  private styleHostComponent: ComponentRef<NzRootStyleComponent>;

  constructor(@Inject(DOCUMENT) _document: Document, injector: Injector, resolver: ComponentFactoryResolver) {
    const componentFactory = resolver.resolveComponentFactory(NzRootStyleComponent);
    const div = _document.createElement('div');
    this.styleHostComponent = componentFactory.create(injector, null, div);
  }

  ngOnDestroy() {
    this.styleHostComponent.destroy();
  }
}
