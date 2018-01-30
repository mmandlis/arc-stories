//http://api.tvmaze.com/search/shows?q=star+trek+discovery

// @license
// Copyright (c) 2017 Google Inc. All rights reserved.
// This code may only be used under the BSD style license found at
// http://polymer.github.io/LICENSE.txt
// Code distributed by Google as part of this project is also
// subject to an additional IP rights grant found at
// http://polymer.github.io/PATENTS.txt

"use strict";

defineParticle(({DomParticle, resolver}) => {

  importScripts(resolver('FindTVShows/TvMaze.js'));

  let host = "find-tv-shows";

  let template = `

  <div ${host} style="padding: 8px; background-color: black;">
    <input style="padding: 4px; border-radius: 4px;" placeholder="TV Search" on-change="_onInput">
  </div>

  `.trim();

  return class extends DomParticle {
    get template() {
      return template;
    }
    _onInput(e, state) {
      this._setState({query: e.data.value || '', count: 0});
    }
    _update(props, state) {
      if (props.shows && state.query && !state.count) {
        this._fetchShows(state.query);
      }
    }
    async _fetchShows(query) {
      this._setState({count: -1});
      let response = await fetch(`${service}?q=${query}`);
      let shows = await response.json();
      this._receiveShows(shows);
    }
    async _receiveShows(shows) {
      console.log('TVShows', shows);
      let showsView = this._views.get('shows');
      // clear old data
      //let entities = await showsView.toList();
      //entities.forEach(e => showsView.remove(e));
      // add new data
      let Show = showsView.entityClass;
      shows.forEach(show => {
        show = show.show;
        let entity = new Show({
          name: show.name,
          description: show.summary,
          image: show.image && show.image.medium || '',
          network: show.network && show.network.name || show.webChannel && show.webChannel.name || '',
          day: show.schedule && show.schedule.days && show.schedule.days.shift() || '',
          time: show.schedule && show.schedule.time
        });
        console.log('TVShows', JSON.stringify(entity.dataClone(), null, '  '));
        showsView.store(entity);
      });
    }
  };
});