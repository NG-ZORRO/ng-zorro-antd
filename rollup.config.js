import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';
import sourcemaps from 'rollup-plugin-sourcemaps';

const target = process.env.ROLLUP_TARGET || 'esm';

let globals = {
  '@angular/animations'                 : 'ng.animations',
  '@angular/core'                       : 'ng.core',
  '@angular/common'                     : 'ng.common',
  '@angular/forms'                      : 'ng.forms',
  '@angular/common/http'                : 'ng.common.http',
  '@angular/router'                     : 'ng.router',
  '@angular/platform-browser'           : 'ng.platformBrowser',
  '@angular/platform-server'            : 'ng.platformServer',
  '@angular/platform-browser-dynamic'   : 'ng.platformBrowserDynamic',
  '@angular/platform-browser/animations': 'ng.platformBrowser.animations',
  '@angular/core/testing'               : 'ng.core.testing',
  '@angular/common/testing'             : 'ng.common.testing',
  '@angular/common/http/testing'        : 'ng.common.http.testing',

  '@angular/cdk'            : 'ng.cdk',
  '@angular/cdk/keycodes'   : 'ng.cdk.keycodes',
  '@angular/cdk/a11y'       : 'ng.cdk.a11y',
  '@angular/cdk/accordion'  : 'ng.cdk.accordion',
  '@angular/cdk/bidi'       : 'ng.cdk.bidi',
  '@angular/cdk/coercion'   : 'ng.cdk.coercion',
  '@angular/cdk/collections': 'ng.cdk.collections',
  '@angular/cdk/layout'     : 'ng.cdk.layout',
  '@angular/cdk/observers'  : 'ng.cdk.observers',
  '@angular/cdk/overlay'    : 'ng.cdk.overlay',
  '@angular/cdk/platform'   : 'ng.cdk.platform',
  '@angular/cdk/portal'     : 'ng.cdk.portal',
  '@angular/cdk/scrolling'  : 'ng.cdk.scrolling',
  '@angular/cdk/stepper'    : 'ng.cdk.stepper',
  '@angular/cdk/table'      : 'ng.cdk.table',

  'date-fns/add_days'                     : 'date-fns/add_days/index',
  'date-fns/difference_in_calendar_days'  : 'date-fns/difference_in_calendar_days/index',
  'date-fns/difference_in_calendar_months': 'date-fns/difference_in_calendar_months/index',
  'date-fns/difference_in_calendar_weeks' : 'date-fns/difference_in_calendar_weeks/index',
  'date-fns/end_of_month'                 : 'date-fns/end_of_month/index',
  'date-fns/is_same_day'                  : 'date-fns/is_same_day/index',
  'date-fns/is_same_month'                : 'date-fns/is_same_month/index',
  'date-fns/is_same_year'                 : 'date-fns/is_same_year/index',
  'date-fns/is_this_month'                : 'date-fns/is_this_month/index',
  'date-fns/is_this_year'                 : 'date-fns/is_this_year/index',
  'date-fns/set_month'                    : 'date-fns/set_month/index',
  'date-fns/set_year'                     : 'date-fns/set_year/index',
  'date-fns/start_of_month'               : 'date-fns/start_of_month/index',
  'date-fns/start_of_week'                : 'date-fns/start_of_week/index',
  'date-fns/start_of_year'                : 'date-fns/start_of_year/index',
  'date-fns/parse'                        : 'date-fns/parse/index',
  'date-fns/add_months'                   : 'date-fns/add_months/index',
  'date-fns/add_years'                    : 'date-fns/add_years/index',
  'date-fns/set_day'                      : 'date-fns/set_day/index',

  'rxjs'          : 'Rx',
  'rxjs/operators': 'Rx.Observable.prototype',
};

const listOfDateFns = [
  'addDays',
  'differenceInCalendarDays',
  'differenceInCalendarMonths',
  'differenceInCalendarWeeks',
  'endOfMonth',
  'isSameDay',
  'isSameMonth',
  'isSameYear',
  'isThisMonth',
  'isThisYear',
  'setMonth',
  'setYear',
  'startOfMonth',
  'startOfWeek',
  'startOfYear',
  'parse',
  'addMonths',
  'addYears',
  'setDay'
];
const listOfReplace = listOfDateFns.map(name => {
  const map = {};
  // map[`import * as ${name} `] = `var ${name}=_${name};\nimport * as _${name} `;
  map[`import * as ${name}`] = `import ${name}`;
  return replace(map)
});

let plugins = [
  sourcemaps(),
  ...listOfReplace,
  // replace({ "import * as setMonth ": "import " }),
  resolve(),
];

switch (target) {
  case 'esm':
    Object.assign(globals, {
      'tslib': 'tslib',
    });
    break;
  case 'mumd':
    plugins.push(uglify());
    break;
}

export default {
  plugins,
  external : Object.keys(globals),
  output   : {
    exports  : 'named',
    name     : 'ngZorro.antd',
    globals,
    sourcemap: true,
  }
}
