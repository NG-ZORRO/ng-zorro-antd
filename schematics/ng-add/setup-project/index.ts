/**
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { chain, noop, Rule } from '@angular-devkit/schematics';

import { Schema } from '../schema';
import { addAnimationsModule } from './add-animations-module';
import { addIconToAssets } from './add-icon-assets';
import { addRequiredModules } from './add-required-modules';
import { hammerjsImport } from './hammerjs-import';
import { registerLocale } from './register-locale';
import { addThemeToAppStyles } from './theming';

export default function (options: Schema): Rule {
  return chain([
    registerLocale(options),
    addRequiredModules(options),
    addAnimationsModule(options),
    addThemeToAppStyles(options),
    options.dynamicIcon ? addIconToAssets(options) : noop(),
    options.gestures ? hammerjsImport(options) : noop()
  ]);
}
