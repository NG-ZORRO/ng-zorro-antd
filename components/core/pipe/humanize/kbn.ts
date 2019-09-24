/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

/**
 * ==============================================================================
 * This product contains a modified version of 'kbn of Grafana'.
 * It is written in TypeScript and fully tree-shakable.
 *
 * Copyright 2018 The ng-zorro-antd Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ==============================================================================
 */

// tslint:disable

export namespace kbn {
  export const regexEscape = function(value: string) {
    return value.replace(/[\\^$*+?.()|[\]{}\/]/g, '\\$&');
  };

  ///// HELPER FUNCTIONS /////

  export const round_interval = function(interval: number) {
    switch (true) {
      // 0.015s
      case interval < 15:
        return 10; // 0.01s
      // 0.035s
      case interval < 35:
        return 20; // 0.02s
      // 0.075s
      case interval < 75:
        return 50; // 0.05s
      // 0.15s
      case interval < 150:
        return 100; // 0.1s
      // 0.35s
      case interval < 350:
        return 200; // 0.2s
      // 0.75s
      case interval < 750:
        return 500; // 0.5s
      // 1.5s
      case interval < 1500:
        return 1000; // 1s
      // 3.5s
      case interval < 3500:
        return 2000; // 2s
      // 7.5s
      case interval < 7500:
        return 5000; // 5s
      // 12.5s
      case interval < 12500:
        return 10000; // 10s
      // 17.5s
      case interval < 17500:
        return 15000; // 15s
      // 25s
      case interval < 25000:
        return 20000; // 20s
      // 45s
      case interval < 45000:
        return 30000; // 30s
      // 1.5m
      case interval < 90000:
        return 60000; // 1m
      // 3.5m
      case interval < 210000:
        return 120000; // 2m
      // 7.5m
      case interval < 450000:
        return 300000; // 5m
      // 12.5m
      case interval < 750000:
        return 600000; // 10m
      // 12.5m
      case interval < 1050000:
        return 900000; // 15m
      // 25m
      case interval < 1500000:
        return 1200000; // 20m
      // 45m
      case interval < 2700000:
        return 1800000; // 30m
      // 1.5h
      case interval < 5400000:
        return 3600000; // 1h
      // 2.5h
      case interval < 9000000:
        return 7200000; // 2h
      // 4.5h
      case interval < 16200000:
        return 10800000; // 3h
      // 9h
      case interval < 32400000:
        return 21600000; // 6h
      // 1d
      case interval < 86400000:
        return 43200000; // 12h
      // 1w
      case interval < 604800000:
        return 86400000; // 1d
      // 3w
      case interval < 1814400000:
        return 604800000; // 1w
      // 6w
      case interval < 3628800000:
        return 2592000000; // 30d
      default:
        return 31536000000; // 1y
    }
  };

  export const secondsToHms = function(seconds: number) {
    const numyears = Math.floor(seconds / 31536000);
    if (numyears) {
      return numyears + 'y';
    }
    const numdays = Math.floor((seconds % 31536000) / 86400);
    if (numdays) {
      return numdays + 'd';
    }
    const numhours = Math.floor(((seconds % 31536000) % 86400) / 3600);
    if (numhours) {
      return numhours + 'h';
    }
    const numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
    if (numminutes) {
      return numminutes + 'm';
    }
    const numseconds = Math.floor((((seconds % 31536000) % 86400) % 3600) % 60);
    if (numseconds) {
      return numseconds + 's';
    }
    const nummilliseconds = Math.floor(seconds * 1000);
    if (nummilliseconds) {
      return nummilliseconds + 'ms';
    }

    return 'less than a millisecond'; // 'just now' //or other string you like;
  };

  export const secondsToHhmmss = function(seconds: number) {
    const strings = [];
    const numhours = Math.floor(seconds / 3600);
    const numminutes = Math.floor((seconds % 3600) / 60);
    const numseconds = Math.floor((seconds % 3600) % 60);
    numhours > 9 ? strings.push('' + numhours) : strings.push('0' + numhours);
    numminutes > 9 ? strings.push('' + numminutes) : strings.push('0' + numminutes);
    numseconds > 9 ? strings.push('' + numseconds) : strings.push('0' + numseconds);
    return strings.join(':');
  };

  export const to_percent = function(nr: number, outof: number) {
    return Math.floor((nr / outof) * 10000) / 100 + '%';
  };

  export const addslashes = function(str: string) {
    str = str.replace(/\\/g, '\\\\');
    str = str.replace(/\'/g, "\\'");
    str = str.replace(/\"/g, '\\"');
    str = str.replace(/\0/g, '\\0');
    return str;
  };

  export const interval_regex = /(\d+(?:\.\d+)?)(ms|[Mwdhmsy])/;

  // histogram & trends
  export const intervals_in_seconds = {
    y: 31536000,
    M: 2592000,
    w: 604800,
    d: 86400,
    h: 3600,
    m: 60,
    s: 1,
    ms: 0.001
  };

  export type Intervals = keyof typeof intervals_in_seconds;

  export const calculateInterval = function(
    range: { from: number; to: number },
    resolution: number,
    lowLimitInterval: string
  ) {
    let lowLimitMs = 1; // 1 millisecond default low limit
    let intervalMs;

    if (lowLimitInterval) {
      if (lowLimitInterval[0] === '>') {
        lowLimitInterval = lowLimitInterval.slice(1);
      }
      lowLimitMs = interval_to_ms(lowLimitInterval);
    }

    intervalMs = round_interval((range.to.valueOf() - range.from.valueOf()) / resolution);
    if (lowLimitMs > intervalMs) {
      intervalMs = lowLimitMs;
    }

    return {
      intervalMs,
      interval: secondsToHms(intervalMs / 1000)
    };
  };

  export const describe_interval = function(str: string) {
    const matches = str.match(interval_regex);
    if (!matches || intervals_in_seconds[matches[2] as Intervals] === undefined) {
      throw new Error('Invalid interval string, expecting a number followed by one of "Mwdhmsy"');
    } else {
      return {
        sec: intervals_in_seconds[matches[2] as Intervals],
        type: matches[2],
        count: parseInt(matches[1], 10)
      };
    }
  };

  export const interval_to_ms = function(str: string) {
    const info = describe_interval(str);
    return info.sec * 1000 * info.count;
  };

  export const interval_to_seconds = function(str: string) {
    const info = describe_interval(str);
    return info.sec * info.count;
  };

  export const query_color_dot = function(color: string, diameter: string) {
    return (
      '<div class="icon-circle" style="' +
      ['display:inline-block', 'color:' + color, 'font-size:' + diameter + 'px'].join(';') +
      '"></div>'
    );
  };

  export const slugifyForUrl = function(str: string) {
    return str
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  export const stringToJsRegex = function(str: string) {
    if (str[0] !== '/') {
      return new RegExp('^' + str + '$');
    }

    const match = str.match(new RegExp('^/(.*?)/(g?i?m?y?)$'))!;
    return new RegExp(match[1], match[2]);
  };

  export const toFixed = function(value: number, decimals: number) {
    if (value === null) {
      return '';
    }

    const factor = decimals ? Math.pow(10, Math.max(0, decimals)) : 1;
    const formatted = String(Math.round(value * factor) / factor);

    // if exponent return directly
    if (formatted.indexOf('e') !== -1 || value === 0) {
      return formatted;
    }

    // If tickDecimals was specified, ensure that we have exactly that
    // much precision; otherwise default to the value's own precision.
    if (decimals != null) {
      const decimalPos = formatted.indexOf('.');
      const precision = decimalPos === -1 ? 0 : formatted.length - decimalPos - 1;
      if (precision < decimals) {
        return (precision ? formatted : formatted + '.') + String(factor).substr(1, decimals - precision);
      }
    }

    return formatted;
  };

  export const toFixedScaled = function(
    value: number,
    decimals: number,
    scaledDecimals: number,
    additionalDecimals: number,
    ext: string
  ) {
    if (scaledDecimals === null) {
      return toFixed(value, decimals) + ext;
    } else {
      return toFixed(value, scaledDecimals + additionalDecimals) + ext;
    }
  };

  export const roundValue = function(num: number | null, decimals: number) {
    if (num === null) {
      return null;
    }
    const n = Math.pow(10, decimals);
    const formatted = (n * num).toFixed(decimals);
    return Math.round(parseFloat(formatted)) / n;
  };

  ///// FORMAT FUNCTION CONSTRUCTORS /////

  export const formatBuilders = {};

  // Formatter which always appends a fixed unit string to the value. No
  // scaling of the value is performed.
  export const fixedUnit = function(unit: string) {
    return function(size: number, decimals: number) {
      if (size === null) {
        return '';
      }
      return toFixed(size, decimals) + ' ' + unit;
    };
  };

  // Formatter which scales the unit string geometrically according to the given
  // numeric factor. Repeatedly scales the value down by the factor until it is
  // less than the factor in magnitude, or the end of the array is reached.
  export const scaledUnits = function(factor: number, extArray: string[]) {
    return function(size: number, decimals: number, scaledDecimals: number | null) {
      if (size === null) {
        return '';
      }

      let steps = 0;
      const limit = extArray.length;

      while (Math.abs(size) >= factor) {
        steps++;
        size /= factor;

        if (steps >= limit) {
          return 'NA';
        }
      }

      if (steps > 0 && scaledDecimals !== null) {
        decimals = scaledDecimals + 3 * steps;
      }

      return toFixed(size, decimals) + extArray[steps];
    };
  };

  // Extension of the scaledUnits builder which uses SI decimal prefixes. If an
  // offset is given, it adjusts the starting units at the given prefix; a value
  // of 0 starts at no scale; -3 drops to nano, +2 starts at mega, etc.
  export const decimalSIPrefix = function(unit: string, offset: number = 0) {
    let prefixes = ['n', 'µ', 'm', '', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];
    prefixes = prefixes.slice(3 + (offset || 0));
    const units = prefixes.map(function(p) {
      return ' ' + p + unit;
    });
    return scaledUnits(1000, units);
  };

  // Extension of the scaledUnits builder which uses SI binary prefixes. If
  // offset is given, it starts the units at the given prefix; otherwise, the
  // offset defaults to zero and the initial unit is not prefixed.
  export const binarySIPrefix = function(unit: string, offset?: number) {
    const prefixes = ['', 'K', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'].slice(offset);
    const units = prefixes.map(function(p) {
      return ' ' + p + unit;
    });
    return scaledUnits(1024, units);
  };

  // Currency formatter for prefixing a symbol onto a number. Supports scaling
  // up to the trillions.
  export const currency = function(symbol: string) {
    const units = ['', 'K', 'M', 'B', 'T'];
    const scaler = scaledUnits(1000, units);
    return function(size: number, decimals: number, scaledDecimals: number) {
      if (size === null) {
        return '';
      }
      const scaled = scaler(size, decimals, scaledDecimals);
      return symbol + scaled;
    };
  };

  export const simpleCountUnit = function(symbol: string) {
    const units = ['', 'K', 'M', 'B', 'T'];
    const scaler = scaledUnits(1000, units);
    return function(size: number, decimals: number, scaledDecimals: number) {
      if (size === null) {
        return '';
      }
      const scaled = scaler(size, decimals, scaledDecimals);
      return scaled + ' ' + symbol;
    };
  };

  ///// VALUE FORMATS /////

  // Dimensionless Units
  export const none = toFixed;
  export const short = scaledUnits(1000, ['', ' K', ' Mil', ' Bil', ' Tri', ' Quadr', ' Quint', ' Sext', ' Sept']);
  export const dB = fixedUnit('dB');

  export const percent = function(size: number, decimals: number) {
    if (size === null) {
      return '';
    }
    return toFixed(size, decimals) + '%';
  };

  export const percentunit = function(size: number, decimals: number) {
    if (size === null) {
      return '';
    }
    return toFixed(100 * size, decimals) + '%';
  };

  /* Formats the value to hex. Uses float if specified decimals are not 0.
   * There are two options, one with 0x, and one without */

  export const hex = function(value: number, decimals: number) {
    if (value == null) {
      return '';
    }
    return parseFloat(toFixed(value, decimals))
      .toString(16)
      .toUpperCase();
  };

  export const hex0x = function(value: number, decimals: number) {
    if (value == null) {
      return '';
    }
    const hexString = hex(value, decimals);
    if (hexString.substring(0, 1) === '-') {
      return '-0x' + hexString.substring(1);
    }
    return '0x' + hexString;
  };

  export const sci = function(value: number, decimals: number) {
    return value.toExponential(decimals);
  };

  export const locale = function(value: number, decimals: number) {
    return value.toLocaleString(undefined, { maximumFractionDigits: decimals });
  };

  // Currencies
  export const currencyUSD = currency('$');
  export const currencyGBP = currency('£');
  export const currencyEUR = currency('€');
  export const currencyJPY = currency('¥');
  export const currencyRUB = currency('₽');
  export const currencyUAH = currency('₴');
  export const currencyBRL = currency('R$');
  export const currencyDKK = currency('kr');
  export const currencyISK = currency('kr');
  export const currencyNOK = currency('kr');
  export const currencySEK = currency('kr');

  // Data (Binary)
  export const bits = binarySIPrefix('b');
  export const bytes = binarySIPrefix('B');
  export const kbytes = binarySIPrefix('B', 1);
  export const mbytes = binarySIPrefix('B', 2);
  export const gbytes = binarySIPrefix('B', 3);

  // Data (Decimal)
  export const decbits = decimalSIPrefix('b');
  export const decbytes = decimalSIPrefix('B');
  export const deckbytes = decimalSIPrefix('B', 1);
  export const decmbytes = decimalSIPrefix('B', 2);
  export const decgbytes = decimalSIPrefix('B', 3);

  // Data Rate
  export const pps = decimalSIPrefix('pps');
  export const bps = decimalSIPrefix('bps');
  export const Bps = decimalSIPrefix('B/s');
  export const KBs = decimalSIPrefix('Bs', 1);
  export const Kbits = decimalSIPrefix('bps', 1);
  export const MBs = decimalSIPrefix('Bs', 2);
  export const Mbits = decimalSIPrefix('bps', 2);
  export const GBs = decimalSIPrefix('Bs', 3);
  export const Gbits = decimalSIPrefix('bps', 3);

  // Hash Rate
  export const Hs = decimalSIPrefix('H/s');
  export const KHs = decimalSIPrefix('H/s', 1);
  export const MHs = decimalSIPrefix('H/s', 2);
  export const GHs = decimalSIPrefix('H/s', 3);
  export const THs = decimalSIPrefix('H/s', 4);
  export const PHs = decimalSIPrefix('H/s', 5);
  export const EHs = decimalSIPrefix('H/s', 6);

  // Throughput
  export const ops = simpleCountUnit('ops');
  export const rps = simpleCountUnit('rps');
  export const wps = simpleCountUnit('wps');
  export const iops = simpleCountUnit('iops');
  export const opm = simpleCountUnit('opm');
  export const rpm = simpleCountUnit('rpm');
  export const wpm = simpleCountUnit('wpm');

  // Energy
  export const watt = decimalSIPrefix('W');
  export const kwatt = decimalSIPrefix('W', 1);
  export const mwatt = decimalSIPrefix('W', -1);
  export const kwattm = decimalSIPrefix('W/Min', 1);
  export const voltamp = decimalSIPrefix('VA');
  export const kvoltamp = decimalSIPrefix('VA', 1);
  export const voltampreact = decimalSIPrefix('var');
  export const kvoltampreact = decimalSIPrefix('var', 1);
  export const watth = decimalSIPrefix('Wh');
  export const kwatth = decimalSIPrefix('Wh', 1);
  export const joule = decimalSIPrefix('J');
  export const ev = decimalSIPrefix('eV');
  export const amp = decimalSIPrefix('A');
  export const kamp = decimalSIPrefix('A', 1);
  export const mamp = decimalSIPrefix('A', -1);
  export const volt = decimalSIPrefix('V');
  export const kvolt = decimalSIPrefix('V', 1);
  export const mvolt = decimalSIPrefix('V', -1);
  export const dBm = decimalSIPrefix('dBm');
  export const ohm = decimalSIPrefix('Ω');
  export const lumens = decimalSIPrefix('Lm');

  // Temperature
  export const celsius = fixedUnit('°C');
  export const farenheit = fixedUnit('°F');
  export const kelvin = fixedUnit('K');
  export const humidity = fixedUnit('%H');

  // Pressure
  export const pressurebar = decimalSIPrefix('bar');
  export const pressurembar = decimalSIPrefix('bar', -1);
  export const pressurekbar = decimalSIPrefix('bar', 1);
  export const pressurehpa = fixedUnit('hPa');
  export const pressurehg = fixedUnit('"Hg');
  export const pressurepsi = scaledUnits(1000, [' psi', ' ksi', ' Mpsi']);

  // Force
  export const forceNm = decimalSIPrefix('Nm');
  export const forcekNm = decimalSIPrefix('Nm', 1);
  export const forceN = decimalSIPrefix('N');
  export const forcekN = decimalSIPrefix('N', 1);

  // Length
  export const lengthm = decimalSIPrefix('m');
  export const lengthmm = decimalSIPrefix('m', -1);
  export const lengthkm = decimalSIPrefix('m', 1);
  export const lengthmi = fixedUnit('mi');
  export const lengthft = fixedUnit('ft');

  // Area
  export const areaM2 = fixedUnit('m²');
  export const areaF2 = fixedUnit('ft²');
  export const areaMI2 = fixedUnit('mi²');

  // Mass
  export const massmg = decimalSIPrefix('g', -1);
  export const massg = decimalSIPrefix('g');
  export const masskg = decimalSIPrefix('g', 1);
  export const masst = fixedUnit('t');

  // Velocity
  export const velocityms = fixedUnit('m/s');
  export const velocitykmh = fixedUnit('km/h');
  export const velocitymph = fixedUnit('mph');
  export const velocityknot = fixedUnit('kn');

  // Acceleration
  export const accMS2 = fixedUnit('m/sec²');
  export const accFS2 = fixedUnit('f/sec²');
  export const accG = fixedUnit('g');

  // Volume
  export const litre = decimalSIPrefix('L');
  export const mlitre = decimalSIPrefix('L', -1);
  export const m3 = fixedUnit('m3');
  export const Nm3 = fixedUnit('Nm3');
  export const dm3 = fixedUnit('dm3');
  export const gallons = fixedUnit('gal');

  // Flow
  export const flowgpm = fixedUnit('gpm');
  export const flowcms = fixedUnit('cms');
  export const flowcfs = fixedUnit('cfs');
  export const flowcfm = fixedUnit('cfm');

  // Angle
  export const degree = fixedUnit('°');
  export const radian = fixedUnit('rad');
  export const grad = fixedUnit('grad');

  // Radiation
  export const radbq = decimalSIPrefix('Bq');
  export const radci = decimalSIPrefix('Ci');
  export const radgy = decimalSIPrefix('Gy');
  export const radrad = decimalSIPrefix('rad');
  export const radsv = decimalSIPrefix('Sv');
  export const radrem = decimalSIPrefix('rem');
  export const radexpckg = decimalSIPrefix('C/kg');
  export const radr = decimalSIPrefix('R');
  export const radsvh = decimalSIPrefix('Sv/h');

  // Concentration
  export const conppm = fixedUnit('ppm');
  export const conppb = fixedUnit('ppb');
  export const conngm3 = fixedUnit('ng/m3');
  export const conngNm3 = fixedUnit('ng/Nm3');
  export const conμgm3 = fixedUnit('μg/m3');
  export const conμgNm3 = fixedUnit('μg/Nm3');
  export const conmgm3 = fixedUnit('mg/m3');
  export const conmgNm3 = fixedUnit('mg/Nm3');
  export const congm3 = fixedUnit('g/m3');
  export const congNm3 = fixedUnit('g/Nm3');

  // Time
  export const hertz = decimalSIPrefix('Hz');

  export const ms = function(size: number, decimals: number, scaledDecimals: number) {
    if (size === null) {
      return '';
    }

    if (Math.abs(size) < 1000) {
      return toFixed(size, decimals) + ' ms';
    } else if (Math.abs(size) < 60000) {
      // Less than 1 min
      return toFixedScaled(size / 1000, decimals, scaledDecimals, 3, ' s');
    } else if (Math.abs(size) < 3600000) {
      // Less than 1 hour, devide in minutes
      return toFixedScaled(size / 60000, decimals, scaledDecimals, 5, ' min');
    } else if (Math.abs(size) < 86400000) {
      // Less than one day, devide in hours
      return toFixedScaled(size / 3600000, decimals, scaledDecimals, 7, ' hour');
    } else if (Math.abs(size) < 31536000000) {
      // Less than one year, devide in days
      return toFixedScaled(size / 86400000, decimals, scaledDecimals, 8, ' day');
    }

    return toFixedScaled(size / 31536000000, decimals, scaledDecimals, 10, ' year');
  };

  export const s = function(size: number, decimals: number, scaledDecimals: number) {
    if (size === null) {
      return '';
    }

    // Less than 1 µs, devide in ns
    if (Math.abs(size) < 0.000001) {
      return toFixedScaled(size * 1e9, decimals, scaledDecimals - decimals, -9, ' ns');
    }
    // Less than 1 ms, devide in µs
    if (Math.abs(size) < 0.001) {
      return toFixedScaled(size * 1e6, decimals, scaledDecimals - decimals, -6, ' µs');
    }
    // Less than 1 second, devide in ms
    if (Math.abs(size) < 1) {
      return toFixedScaled(size * 1e3, decimals, scaledDecimals - decimals, -3, ' ms');
    }

    if (Math.abs(size) < 60) {
      return toFixed(size, decimals) + ' s';
    } else if (Math.abs(size) < 3600) {
      // Less than 1 hour, devide in minutes
      return toFixedScaled(size / 60, decimals, scaledDecimals, 1, ' min');
    } else if (Math.abs(size) < 86400) {
      // Less than one day, devide in hours
      return toFixedScaled(size / 3600, decimals, scaledDecimals, 4, ' hour');
    } else if (Math.abs(size) < 604800) {
      // Less than one week, devide in days
      return toFixedScaled(size / 86400, decimals, scaledDecimals, 5, ' day');
    } else if (Math.abs(size) < 31536000) {
      // Less than one year, devide in week
      return toFixedScaled(size / 604800, decimals, scaledDecimals, 6, ' week');
    }

    return toFixedScaled(size / 3.15569e7, decimals, scaledDecimals, 7, ' year');
  };

  export const µs = function(size: number, decimals: number, scaledDecimals: number) {
    if (size === null) {
      return '';
    }

    if (Math.abs(size) < 1000) {
      return toFixed(size, decimals) + ' µs';
    } else if (Math.abs(size) < 1000000) {
      return toFixedScaled(size / 1000, decimals, scaledDecimals, 3, ' ms');
    } else {
      return toFixedScaled(size / 1000000, decimals, scaledDecimals, 6, ' s');
    }
  };

  export const ns = function(size: number, decimals: number, scaledDecimals: number) {
    if (size === null) {
      return '';
    }

    if (Math.abs(size) < 1000) {
      return toFixed(size, decimals) + ' ns';
    } else if (Math.abs(size) < 1000000) {
      return toFixedScaled(size / 1000, decimals, scaledDecimals, 3, ' µs');
    } else if (Math.abs(size) < 1000000000) {
      return toFixedScaled(size / 1000000, decimals, scaledDecimals, 6, ' ms');
    } else if (Math.abs(size) < 60000000000) {
      return toFixedScaled(size / 1000000000, decimals, scaledDecimals, 9, ' s');
    } else {
      return toFixedScaled(size / 60000000000, decimals, scaledDecimals, 12, ' min');
    }
  };

  export const m = function(size: number, decimals: number, scaledDecimals: number) {
    if (size === null) {
      return '';
    }

    if (Math.abs(size) < 60) {
      return toFixed(size, decimals) + ' min';
    } else if (Math.abs(size) < 1440) {
      return toFixedScaled(size / 60, decimals, scaledDecimals, 2, ' hour');
    } else if (Math.abs(size) < 10080) {
      return toFixedScaled(size / 1440, decimals, scaledDecimals, 3, ' day');
    } else if (Math.abs(size) < 604800) {
      return toFixedScaled(size / 10080, decimals, scaledDecimals, 4, ' week');
    } else {
      return toFixedScaled(size / 5.25948e5, decimals, scaledDecimals, 5, ' year');
    }
  };

  export const h = function(size: number, decimals: number, scaledDecimals: number) {
    if (size === null) {
      return '';
    }

    if (Math.abs(size) < 24) {
      return toFixed(size, decimals) + ' hour';
    } else if (Math.abs(size) < 168) {
      return toFixedScaled(size / 24, decimals, scaledDecimals, 2, ' day');
    } else if (Math.abs(size) < 8760) {
      return toFixedScaled(size / 168, decimals, scaledDecimals, 3, ' week');
    } else {
      return toFixedScaled(size / 8760, decimals, scaledDecimals, 4, ' year');
    }
  };

  export const d = function(size: number, decimals: number, scaledDecimals: number) {
    if (size === null) {
      return '';
    }

    if (Math.abs(size) < 7) {
      return toFixed(size, decimals) + ' day';
    } else if (Math.abs(size) < 365) {
      return toFixedScaled(size / 7, decimals, scaledDecimals, 2, ' week');
    } else {
      return toFixedScaled(size / 365, decimals, scaledDecimals, 3, ' year');
    }
  };

  export const toDuration = function(size: number, decimals: number, timeScale: string): string {
    if (size === null) {
      return '';
    }
    if (size === 0) {
      return '0 ' + timeScale + 's';
    }
    if (size < 0) {
      return toDuration(-size, decimals, timeScale) + ' ago';
    }

    const units = [
      { short: 'y', long: 'year' },
      { short: 'M', long: 'month' },
      { short: 'w', long: 'week' },
      { short: 'd', long: 'day' },
      { short: 'h', long: 'hour' },
      { short: 'm', long: 'minute' },
      { short: 's', long: 'second' },
      { short: 'ms', long: 'millisecond' }
    ];
    // convert $size to milliseconds
    // intervals_in_seconds uses seconds (duh), convert them to milliseconds here to minimize floating point errors
    size *= intervals_in_seconds[units.find(e => e.long === timeScale)!.short as Intervals] * 1000;

    const strings = [];
    // after first value >= 1 print only $decimals more
    let decrementDecimals = false;
    for (let i = 0; i < units.length && decimals >= 0; i++) {
      const interval = intervals_in_seconds[units[i].short as Intervals] * 1000;
      const value = size / interval;
      if (value >= 1 || decrementDecimals) {
        decrementDecimals = true;
        const floor = Math.floor(value);
        const unit = units[i].long + (floor !== 1 ? 's' : '');
        strings.push(floor + ' ' + unit);
        size = size % interval;
        decimals -= 1;
      }
    }

    return strings.join(', ');
  };

  export const dtdurationms = function(size: number, decimals: number) {
    return toDuration(size, decimals, 'millisecond');
  };

  export const dtdurations = function(size: number, decimals: number) {
    return toDuration(size, decimals, 'second');
  };

  export const dthms = function(size: number, _decimals: number) {
    return secondsToHhmmss(size);
  };

  export const timeticks = function(size: number, decimals: number, scaledDecimals: number) {
    return s(size / 100, decimals, scaledDecimals);
  };
}
