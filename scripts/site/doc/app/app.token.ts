import { InjectionToken, signal, WritableSignal } from '@angular/core';

export const APP_PAGE = new InjectionToken<WritableSignal<'docs' | 'components' | 'experimental' | string>>(
  'app-page',
  {
    providedIn: 'root',
    factory: () => signal('docs')
  }
);

export const APP_LANGUAGE = new InjectionToken<WritableSignal<'zh' | 'en'>>('app-language', {
  providedIn: 'root',
  factory: () => signal('en')
});
