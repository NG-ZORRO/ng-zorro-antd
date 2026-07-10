/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { DOCUMENT } from '@angular/common';
import { computed, CSP_NONCE, effect, inject, Injectable, Signal, signal } from '@angular/core';

import { NZ_CONFIG } from 'ng-zorro-antd/core/config';
import { warn } from 'ng-zorro-antd/core/logger';

import { nzDefaultAlgorithm } from './algorithms/default';
import { formatToken } from './alias';
import { genButtonToken } from './components/button';
import {
  genDatePickerToken,
  genFormToken,
  genInputNumberToken,
  genMentionToken,
  genRadioToken,
  genSegmentedToken,
  genSelectToken,
  genTypographyToken
} from './components/controls';
import {
  genAlertToken,
  genCalendarToken,
  genDropdownToken,
  genFloatButtonToken,
  genMenuToken,
  genModalToken,
  genPaginationToken,
  genSkeletonToken,
  genSpinToken,
  genStepsToken,
  genSwitchToken,
  genTableToken,
  genTabsToken,
  genTimelineToken,
  genTransferToken,
  genTreeToken,
  genUploadToken
} from './components/global';
import { genInputToken } from './components/input';
import { NzComponentTokens } from './components/token';
import { tokenToCssVars } from './css-variables';
import { NzAliasToken, NzMapToken, NzSeedToken, NzThemeAlgorithm, NzThemeConfig } from './interfaces';
import { NZ_THEME } from './provide-theme';
import { NZ_SEED_TOKEN_KEYS, nzDefaultSeedToken } from './seed';

const STYLE_ATTRIBUTE = 'nz-theme';

function definedEntries<T extends object>(value: T | undefined): Partial<T> {
  const result: Partial<T> = {};
  for (const [key, entry] of Object.entries(value ?? {})) {
    if (entry !== undefined) {
      result[key as keyof T] = entry as T[keyof T];
    }
  }
  return result;
}

/**
 * Resolves design tokens (seed -> map -> alias -> component) from the theme
 * config provided via `provideNzTheme` and writes them as CSS custom
 * properties into a `<style nz-theme>` element in the document head.
 *
 * All intermediate layers are exposed as signals; updating the theme through
 * `setTheme`/`updateTheme`/`setAlgorithm` re-renders the custom properties.
 */
@Injectable({ providedIn: 'root' })
export class NzThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly cspNonce = inject(CSP_NONCE, { optional: true });

  private readonly config = signal<NzThemeConfig>(inject(NZ_THEME, { optional: true }) ?? {});

  readonly themeConfig: Signal<NzThemeConfig> = this.config.asReadonly();

  readonly seedToken: Signal<NzSeedToken> = computed(() => {
    const overrides = definedEntries(this.config().token);
    const seed = { ...nzDefaultSeedToken };
    for (const key of NZ_SEED_TOKEN_KEYS) {
      if (key in overrides) {
        (seed as Record<string, unknown>)[key] = (overrides as Record<string, unknown>)[key];
      }
    }
    return seed;
  });

  readonly mapToken: Signal<NzMapToken> = computed(() => {
    const configured = this.config().algorithm;
    const algorithms: NzThemeAlgorithm[] = Array.isArray(configured)
      ? configured
      : configured
        ? [configured]
        : [nzDefaultAlgorithm];
    const seed = this.seedToken();
    let map: NzMapToken | undefined;
    for (const algorithm of algorithms) {
      map = algorithm(seed, map);
    }
    return map ?? nzDefaultAlgorithm(seed);
  });

  readonly token: Signal<NzAliasToken> = computed(() => {
    const overrides = definedEntries(this.config().token);
    for (const key of NZ_SEED_TOKEN_KEYS) {
      // Seed-level overrides already fed the algorithms.
      delete (overrides as Record<string, unknown>)[key];
    }
    return { ...formatToken({ ...this.mapToken(), ...overrides }), ...overrides };
  });

  readonly componentTokens: Signal<NzComponentTokens> = computed(() => {
    const alias = this.token();
    const overrides = this.config().components ?? {};
    const input = { ...genInputToken(alias), ...definedEntries(overrides.input) };
    return {
      button: { ...genButtonToken(alias), ...definedEntries(overrides.button) },
      input,
      select: { ...genSelectToken(alias, input), ...definedEntries(overrides.select) },
      datePicker: { ...genDatePickerToken(alias, input), ...definedEntries(overrides.datePicker) },
      inputNumber: { ...genInputNumberToken(alias), ...definedEntries(overrides.inputNumber) },
      mention: { ...genMentionToken(alias), ...definedEntries(overrides.mention) },
      radio: { ...genRadioToken(alias), ...definedEntries(overrides.radio) },
      segmented: { ...genSegmentedToken(alias), ...definedEntries(overrides.segmented) },
      typography: { ...genTypographyToken(alias, input), ...definedEntries(overrides.typography) },
      form: { ...genFormToken(alias, input), ...definedEntries(overrides.form) },
      alert: { ...genAlertToken(alias), ...definedEntries(overrides.alert) },
      calendar: { ...genCalendarToken(alias), ...definedEntries(overrides.calendar) },
      dropdown: { ...genDropdownToken(alias), ...definedEntries(overrides.dropdown) },
      floatButton: { ...genFloatButtonToken(alias), ...definedEntries(overrides.floatButton) },
      menu: { ...genMenuToken(alias), ...definedEntries(overrides.menu) },
      modal: { ...genModalToken(alias), ...definedEntries(overrides.modal) },
      pagination: { ...genPaginationToken(alias), ...definedEntries(overrides.pagination) },
      skeleton: { ...genSkeletonToken(alias), ...definedEntries(overrides.skeleton) },
      spin: { ...genSpinToken(alias), ...definedEntries(overrides.spin) },
      steps: { ...genStepsToken(alias), ...definedEntries(overrides.steps) },
      switch: { ...genSwitchToken(alias), ...definedEntries(overrides.switch) },
      table: { ...genTableToken(alias), ...definedEntries(overrides.table) },
      tabs: { ...genTabsToken(alias), ...definedEntries(overrides.tabs) },
      timeline: { ...genTimelineToken(alias), ...definedEntries(overrides.timeline) },
      transfer: { ...genTransferToken(alias), ...definedEntries(overrides.transfer) },
      tree: { ...genTreeToken(alias), ...definedEntries(overrides.tree) },
      upload: { ...genUploadToken(alias), ...definedEntries(overrides.upload) }
    };
  });

  constructor() {
    if (typeof ngDevMode !== 'undefined' && ngDevMode) {
      const legacyConfig = inject(NZ_CONFIG, { optional: true });
      if (legacyConfig?.theme) {
        warn(
          `Both 'provideNzTheme' and the legacy 'NzConfig.theme' are configured. ` +
            `The design-token theme takes precedence; consider removing 'theme' from 'provideNzConfig'.`
        );
      }
    }

    // Synchronous first write: during server-side rendering the style element
    // becomes part of the server DOM and is serialized into the HTML.
    this.writeCssVariables();
    effect(() => this.writeCssVariables());
  }

  /** Replaces the whole theme config. */
  setTheme(config: NzThemeConfig): void {
    this.config.set(config ?? {});
  }

  /** Merges the given patch into the current config (`token`/`components` are merged per key). */
  updateTheme(patch: Partial<NzThemeConfig>): void {
    this.config.update(current => {
      let components = current.components;
      if (patch.components) {
        components = { ...current.components };
        for (const [name, overrides] of Object.entries(patch.components)) {
          (components as Record<string, object>)[name] = {
            ...(current.components as Record<string, object> | undefined)?.[name],
            ...overrides
          };
        }
      }
      return {
        ...current,
        ...patch,
        token: patch.token ? { ...current.token, ...patch.token } : current.token,
        components
      };
    });
  }

  setAlgorithm(algorithm: NzThemeAlgorithm | NzThemeAlgorithm[]): void {
    this.updateTheme({ algorithm });
  }

  private writeCssVariables(): void {
    const prefix = this.config().cssVarPrefix ?? 'ant';
    const vars = tokenToCssVars(this.token(), this.componentTokens(), prefix);
    const css = `:root{${Object.entries(vars)
      .map(([name, value]) => `${name}:${value};`)
      .join('')}}`;

    const head = this.document.head;
    if (!head) {
      return;
    }
    let styleElement = head.querySelector<HTMLStyleElement>(`style[${STYLE_ATTRIBUTE}]`);
    if (!styleElement) {
      styleElement = this.document.createElement('style');
      styleElement.setAttribute(STYLE_ATTRIBUTE, '');
      if (this.cspNonce) {
        styleElement.nonce = this.cspNonce;
      }
      head.appendChild(styleElement);
    }
    if (styleElement.textContent !== css) {
      styleElement.textContent = css;
    }
  }
}
