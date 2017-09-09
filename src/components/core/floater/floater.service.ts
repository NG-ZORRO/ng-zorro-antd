import {
  Injectable,
  Inject,
  Injector,
  ViewContainerRef,
  Provider,
  Optional,
  SkipSelf
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { ComponentType } from '@angular/cdk';
import {
  Floater
} from './floater';
import {
  FloaterOptions,
  FloaterContent,
  ConnectedPositionOptions,
  FreePositionOptions,
  PositionStrategyOptions,
  PositionStrategyType,
} from './floater-props';
import { Overlay } from '../overlay/index';

Injectable()

export class FloaterService {

  constructor(private _overlay: Overlay, @Inject(DOCUMENT) private _document: Document) {
    // console.log('[FloaterService] constructed once.');
  }

  create<T>(strategyType: PositionStrategyType,
            content: FloaterContent<T>,
            viewContainerRef?: ViewContainerRef,
            strategyOptions?: PositionStrategyOptions,
            options?: FloaterOptions<T>) {
    options = Object.assign(options || {}, {
      content                : content,
      viewContainerRef       : viewContainerRef,
      positionStrategyType   : strategyType,
      positionStrategyOptions: strategyOptions
    });
    return new Floater(this._overlay, this._document, options);
  }

  createConnected<T>(content: FloaterContent<T>, viewContainerRef?: ViewContainerRef, strategyOptions?: ConnectedPositionOptions, options?: FloaterOptions<T>) {
    return this.create('connected', content, viewContainerRef, strategyOptions, options);
  }

  createFree<T>(content: FloaterContent<T>, viewContainerRef?: ViewContainerRef, strategyOptions?: FreePositionOptions, options?: FloaterOptions<T>) {
    return this.create('free', content, viewContainerRef, strategyOptions, options);
  }

  /**
   * Persistently create/initialize a Component and append it's DOM to body(under overlay)
   * NOTE: the attaching operation is persistent, means that it is no methods to detach the component while attached (no relative resources can be released), SO take care of using it!
   * @param component Component class
   * @param viewContainerRef Container reference that component will created and append to
   * @param injector Injector that will be used while creating component dynamically
   * @return Instance of the component
   */
  persistAttachComponent<T>(component: ComponentType<T>, viewContainerRef?: ViewContainerRef, injector?: Injector) {
    return this.createFree(component, viewContainerRef, null, {
      injector: injector,
      persist : true
    }).attach().getComponentInstance();
  }
}

export function FLOATER_SERVICE_PROVIDER_FACTORY(overlay, doc, floaterService) {
  return floaterService || new FloaterService(overlay, doc);
}

export const FLOATER_SERVICE_PROVIDER: Provider = {
  provide   : FloaterService,
  useFactory: FLOATER_SERVICE_PROVIDER_FACTORY,
  deps      : [ Overlay, DOCUMENT, [ new Optional(), new SkipSelf(), FloaterService ] ]
};
