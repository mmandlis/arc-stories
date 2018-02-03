/**
 * @license
 * Copyright (c) 2017 Google Inc. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * Code distributed by Google as part of this project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

defineParticle(({DomParticle}) => {

  const template = `
    <div style="padding: 8px;">
      <i class="material-icons">favorite_border</i>
      <i class="material-icons">share</i>
      <i class="material-icons">playlist_play</i>
    </div>
  `.trim();

  return class extends DomParticle {
    get template() {
      return template;
    }
  };
});