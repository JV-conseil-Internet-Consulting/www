// Copyright (c) 2023 JV conseil <https://www.jv-conseil.dev/>
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

import { StorageArea } from 'kv-storage-polyfill';

import MiniSearch from 'minisearch';

const once = (el, eventName) => new Promise((res) => el.addEventListener(eventName, res, { once: true }));

const uniqBy = (xs, k) => [...new Map(xs.map((x) => [x[k], x])).values()];

async function getDocuments(dataURL) {
  const { pages = [], documents = [] } = await fetch(dataURL).then((x) => x.json());
  const siteData = [
    ...pages,
    ...documents.map((doc) => {
      if (doc.date) doc.date = new Date(doc.date);
      return doc;
    }),
  ];
  const docs = uniqBy(siteData, 'url');
  return docs;
}

///////////////////////////////////////////////////////////////////////////////
// Mini Search
///////////////////////////////////////////////////////////////////////////////

const OPTIONS = {
  idField: 'url',
  fields: ['title', 'content', 'description', 'categories', 'tags', 'keywords'],
  storeFields: ['url', 'title', 'description', 'image'],
  extractField: (document, fieldName) => {
    const value = document[fieldName];
    return Array.isArray(value) ? value.join(' ') : value;
  },
};

const SEARCH_OPTIONS = {
  boost: { title: 5, description: 2, categories: 2, tags: 2, keywords: 2 },
  prefix: true,
  fuzzy: 0.25,
  combineWith: 'AND',
};

let miniSearch;

let lastEvent;
const storeEvent = (e) => {
  lastEvent = e;
};

function search({ data: term, ports: [port] }) {
  const results = miniSearch.search(term, SEARCH_OPTIONS);
  port.postMessage(results.slice(0, 20));
}

(async () => {
  const {
    data: { DATA_URL, STORAGE_KEY, INDEX_KEY },
  } = await once(self, 'message');

  const storage = new StorageArea(STORAGE_KEY);
  const indexData = await storage.get(INDEX_KEY);
  if (indexData) {
    miniSearch = MiniSearch.loadJS(indexData, OPTIONS);
    self.addEventListener('message', search);
  } else {
    self.addEventListener('message', storeEvent);

    miniSearch = new MiniSearch(OPTIONS);
    miniSearch.addAll(await getDocuments(DATA_URL));

    if (lastEvent) search(lastEvent);

    self.removeEventListener('message', storeEvent);
    self.addEventListener('message', search);

    (async () => {
      // Delete old indices
      const oldKeys = [];
      for await (const key of storage.keys()) {
        if (key !== INDEX_KEY) oldKeys.push(key);
      }
      await Promise.all(oldKeys.map((oldKey) => storage.delete(oldKey)));

      // Store new index
      await storage.set(INDEX_KEY, miniSearch.toJSON());
    })();
  }
})();

/*{% comment %}*/
///////////////////////////////////////////////////////////////////////////////
// Lunr
///////////////////////////////////////////////////////////////////////////////

// // TODO: Multi language
// importScripts(
//   '{{ "/assets/bower_components/lunr/lunr.js"                           | relative_url }}',
//   '{{ "/assets/bower_components/lunr-languages/lunr.stemmer.support.js" | relative_url }}',
//   '{{ "/assets/bower_components/lunr-languages/lunr.de.js"              | relative_url }}',
// );

// const INDEX_KEY = 'index--{{ site.time | date_to_xmlschema }}';
// const storage = new StorageArea('lunr{{ '/' | relative_url }}');

// // TODO: update index
// (async () => {
//   let { indexData, documentMap } = await storage.get(INDEX_KEY) || {};
//   let index;

//   if (indexData && documentMap) {
//     index = lunr.Index.load(indexData);
//   } else {
//     const [documents, dm] = await getDocuments();
//     documentMap = dm;
//     index = lunr(function () {
//       this.ref('url');
//       this.field('title');
//       this.field('content');
//       this.field('description');
//       this.field('categories');
//       this.field('tags');

//       documents.forEach(({ categories, tags, ...doc }) => this.add({
//         ...doc,
//         ...categories ? { categories: categories.join() } : {},
//         ...tags ? { tags: tags.join() } : {},
//       }));
//     });

//     // delete old indices
//     const oldKeys = [];
//     await forAwait(storage.keys(), (key) => { if (key !== INDEX_KEY) oldKeys.push(key); });
//     await Promise.all(oldKeys.map(oldKey => storage.delete(oldKey)));

//     // store new index
//     await storage.set(INDEX_KEY, {
//       indexData: index.toJSON(),
//       documentMap,
//     });
//   }

//   addEventListener('message', ({ data, ports: [port] }) => {
//     const results = data !== '' ? index.search(data) : [];
//     port.postMessage(results.map(({ ref }) => documentMap.get(ref)));
//   });
// })();

///////////////////////////////////////////////////////////////////////////////
// js-search
///////////////////////////////////////////////////////////////////////////////

// importScripts('{{ "/assets/bower_components/js-search/dist/umd/js-search.js" | relative_url }}');
// ;(async () => {
//   const [documents] = await getDocuments();

//   const jsSearch = new JsSearch.Search('url');
//   jsSearch.addIndex('title');
//   jsSearch.addIndex('description');
//   jsSearch.addIndex('content');
//   // search.addIndex('categories');
//   // search.addIndex('tags');

//   jsSearch.addDocuments(documents);

//   addEventListener('message', ({ data, ports: [port] }) => {
//     const results = jsSearch.search(data);
//     // console.log(results);
//     port.postMessage(results);
//   });
// })();

///////////////////////////////////////////////////////////////////////////////
// Flex Search
///////////////////////////////////////////////////////////////////////////////

// importScripts('https://cdn.jsdelivr.net/gh/nextapps-de/flexsearch/dist/flexsearch.compact.js');
// ;(async () => {
//   const index = new FlexSearch({
//     doc: {
//       id: 'url',
//       field: ['title' , 'content', 'description'],
//       store: ['title' , 'description', 'image', 'url'],
//     },
//     // async: true,
//   });

//   const [documents] = await getDocuments();
//   // console.log(documents)
//   index.add(documents);

//   addEventListener('message', ({ data, ports: [port] }) => {
//     const results = index.search(data);
//     // console.log(results);
//     port.postMessage(results);
//   });
// })();
/*{% endcomment %}*/
