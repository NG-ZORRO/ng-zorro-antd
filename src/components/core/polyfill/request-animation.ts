
const availablePrefixs = ['moz', 'ms', 'webkit'];

function requestAnimationFramePolyfill(): typeof requestAnimationFrame {
  let lastTime = 0;
  return function (callback: FrameRequestCallback): number {
    const currTime = new Date().getTime();
    const timeToCall = Math.max(0, 16 - (currTime - lastTime));
    const id = window.setTimeout(() => { callback(currTime + timeToCall); }, timeToCall);
    lastTime = currTime + timeToCall;
    return id;
  };
}

function getRequestAnimationFrame(): typeof requestAnimationFrame {
  if (typeof window === 'undefined') {
    return () => null;
  }
  if (window.requestAnimationFrame) {
    // https://github.com/vuejs/vue/issues/4465
    return window.requestAnimationFrame.bind(window);
  }

  const prefix = availablePrefixs.filter(key => `${key}RequestAnimationFrame` in window)[0];

  return prefix
    ? window[`${prefix}RequestAnimationFrame`]
    : requestAnimationFramePolyfill();
}

export const reqAnimFrame = getRequestAnimationFrame();
