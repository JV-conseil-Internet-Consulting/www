function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _asyncIterator(iterable) { var method, async, sync, retry = 2; for ("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;) { if (async && null != (method = iterable[async])) return method.call(iterable); if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable)); async = "@@asyncIterator", sync = "@@iterator"; } throw new TypeError("Object is not async iterable"); }
function AsyncFromSyncIterator(s) { function AsyncFromSyncIteratorContinuation(r) { if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object.")); var done = r.done; return Promise.resolve(r.value).then(function (value) { return { value: value, done: done }; }); } return AsyncFromSyncIterator = function AsyncFromSyncIterator(s) { this.s = s, this.n = s.next; }, AsyncFromSyncIterator.prototype = { s: null, n: null, next: function next() { return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments)); }, return: function _return(value) { var ret = this.s.return; return void 0 === ret ? Promise.resolve({ value: value, done: !0 }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments)); }, throw: function _throw(value) { var thr = this.s.return; return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments)); } }, new AsyncFromSyncIterator(s); }
import { StorageArea } from 'kv-storage-polyfill';
import MiniSearch from 'minisearch';
var once = (el, eventName) => new Promise(res => el.addEventListener(eventName, res, {
  once: true
}));
var uniqBy = (xs, k) => [...new Map(xs.map(x => [x[k], x])).values()];
function getDocuments(_x) {
  return _getDocuments.apply(this, arguments);
} ///////////////////////////////////////////////////////////////////////////////
// Mini Search
///////////////////////////////////////////////////////////////////////////////
function _getDocuments() {
  _getDocuments = _asyncToGenerator(function* (dataURL) {
    var {
      pages = [],
      documents = []
    } = yield fetch(dataURL).then(x => x.json());
    var siteData = [...pages, ...documents.map(doc => {
      if (doc.date) doc.date = new Date(doc.date);
      return doc;
    })];
    var docs = uniqBy(siteData, 'url');
    return docs;
  });
  return _getDocuments.apply(this, arguments);
}
var OPTIONS = {
  idField: 'url',
  fields: ['title', 'content', 'description', 'categories', 'tags', 'keywords'],
  storeFields: ['url', 'title', 'description', 'image'],
  extractField: (document, fieldName) => {
    var value = document[fieldName];
    return Array.isArray(value) ? value.join(' ') : value;
  }
};
var SEARCH_OPTIONS = {
  boost: {
    title: 5,
    description: 2,
    categories: 2,
    tags: 2,
    keywords: 2
  },
  prefix: true,
  fuzzy: 0.25,
  combineWith: 'AND'
};
var miniSearch;
var lastEvent;
var storeEvent = e => {
  lastEvent = e;
};
function search(_ref) {
  var {
    data: term,
    ports: [port]
  } = _ref;
  var results = miniSearch.search(term, SEARCH_OPTIONS);
  port.postMessage(results.slice(0, 20));
}
_asyncToGenerator(function* () {
  var {
    data: {
      DATA_URL,
      STORAGE_KEY,
      INDEX_KEY
    }
  } = yield once(self, 'message');
  var storage = new StorageArea(STORAGE_KEY);
  var indexData = yield storage.get(INDEX_KEY);
  if (indexData) {
    miniSearch = MiniSearch.loadJS(indexData, OPTIONS);
    self.addEventListener('message', search);
  } else {
    self.addEventListener('message', storeEvent);
    miniSearch = new MiniSearch(OPTIONS);
    miniSearch.addAll(yield getDocuments(DATA_URL));
    if (lastEvent) search(lastEvent);
    self.removeEventListener('message', storeEvent);
    self.addEventListener('message', search);
    _asyncToGenerator(function* () {
      // Delete old indices
      var oldKeys = [];
      var _iteratorAbruptCompletion = false;
      var _didIteratorError = false;
      var _iteratorError;
      try {
        for (var _iterator = _asyncIterator(storage.keys()), _step; _iteratorAbruptCompletion = !(_step = yield _iterator.next()).done; _iteratorAbruptCompletion = false) {
          var key = _step.value;
          {
            if (key !== INDEX_KEY) oldKeys.push(key);
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (_iteratorAbruptCompletion && _iterator.return != null) {
            yield _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
      yield Promise.all(oldKeys.map(oldKey => storage.delete(oldKey)));

      // Store new index
      yield storage.set(INDEX_KEY, miniSearch.toJSON());
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