/* global jQuery, Api, Renderer */
'use strict';

const ITEMS_URL = '/v1/notes/';

class Store {
  constructor() {
    this.view = 'list'; // current view: list | details | create | edit 
    this.query = {};    // search query values
    this.list = null;   // search result - array of objects (documents)
    this.item = null;   // currently selected document
  }
}

const api = new Api();
const store = new Store();
const render = new Renderer(store, api);

//on document ready bind events
jQuery(function ($) {

  $('#search').on('submit', (e) => render.search(e));
  $('#edit').on('submit', (e) => render.update(e));
  $('#create').on('submit', render.create);

  $('#result').on('click', '.detail', (e) => render.details(e));
  $('#detail').on('click', '.remove', render.remove);
  $('#detail').on('click', '.edit', (e) => render.showEdit(e));

  $(document).on('click', '.viewCreate', render.showCreate);
  $(document).on('click', '.viewList', (e) => render.showList(e));

  // start app by triggering a search
  $('#search').trigger('submit');

});

