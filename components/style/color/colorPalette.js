const tinycolor = require('./tinycolor2');

var hueStep = 2;
var saturationStep = 0.16;
var saturationStep2 = 0.05;
var brightnessStep1 = 0.05;
var brightnessStep2 = 0.15;
var lightColorCount = 5;
var darkColorCount = 4;

var getHue = function (hsv, i, isLight) {
  var hue;
  if (hsv.h >= 60 && hsv.h <= 240) {
    hue = isLight ? hsv.h - hueStep * i : hsv.h + hueStep * i;
  } else {
    hue = isLight ? hsv.h + hueStep * i : hsv.h - hueStep * i;
  }
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  return Math.round(hue);
};
var getSaturation = function (hsv, i, isLight) {
  // grey color don't change saturation
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }
  var saturation;
  if (isLight) {
    saturation = hsv.s - saturationStep * i;
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep;
  } else {
    saturation = hsv.s + saturationStep2 * i;
  }
  if (saturation > 1) {
    saturation = 1;
  }
  if (isLight && i === lightColorCount && saturation > 0.1) {
    saturation = 0.1;
  }
  if (saturation < 0.06) {
    saturation = 0.06;
  }
  return Number(saturation.toFixed(2));
};
var getValue = function (hsv, i, isLight) {
  var value;
  if (isLight) {
    value = hsv.v + brightnessStep1 * i;
  } else {
    value = hsv.v - brightnessStep2 * i
  }
  if (value > 1) {
    value = 1;
  }
  return Number(value.toFixed(2))
};

module.exports = {
  install: function (less, pluginManager, functions) {
    functions.add('colorPalette', function (colorRef, indexRef) {
      var color = colorRef.value;
      var index = indexRef.value;
      var isLight = index <= 6;
      var hsv = tinycolor(color).toHsv();
      var i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1;
      var hex = tinycolor({
        h: getHue(hsv, i, isLight),
        s: getSaturation(hsv, i, isLight),
        v: getValue(hsv, i, isLight),
      }).toHex();
      return new less.tree.Color(hex);
    });
  }
};
