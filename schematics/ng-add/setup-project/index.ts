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
    addRequiredModules(options),
    addAnimationsModule(options),
    registerLocale(options),
    addThemeToAppStyles(options),
    options.dynamicIcon ? addIconToAssets(options) : noop(),
    options.gestures ? hammerjsImport(options) : noop()
  ]);
}
