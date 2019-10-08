/**
 * @license
 * Copyright Alibaba.com All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://github.com/NG-ZORRO/ng-zorro-antd/blob/master/LICENSE
 */

import { AnimationBuilder, AnimationMetadata, AnimationPlayer } from '@angular/animations';

export function makeAnimation(
  animationBuilder: AnimationBuilder,
  element: HTMLElement,
  animationMetadata: AnimationMetadata[]
): AnimationPlayer {
  const animationFactory = animationBuilder.build(animationMetadata);
  const player = animationFactory.create(element, { delay: 1 });
  player.init();
  player.play();
  return player;
}
