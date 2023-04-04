// Copyright (c) 2023 JV conseil <https://www.jv-conseil.net/>
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

// ⚡️ DANGER ZONE ⚡️
// ================
// 

// The shell cache keeps "landmark" resources, like CSS and JS, web fonts, etc.
// which won't change between content updates.
// 
// 
const SHELL_CACHE = 'shell-9.1.6--v13--sw/';

// A separate assets cache that won't be invalidated when there's a newer version of Hydejack.
// NOTE: Whenever you make changes to any of the files in yor `assets` folder,
//       increase the cache number, otherwise the changes will *never* be visible to returning visitors.
const ASSETS_CACHE = 'assets--v13--sw/';

// The cache for regular content, which will be invalidated every time you make a new build.
const CONTENT_CACHE = 'content--2023-04-04T19:59:35+02:00--sw/';

// A URL search parameter you can add to external assets to cache them in the service worker.
const SW_CACHE_SEARCH_PARAM = 'sw-cache';
const NO_CACHE_SEARCH_PARAM = 'no-cache';

// The regular expression used to find URLs in webfont style sheets.
const RE_CSS_URL = /url\s*\(['"]?(([^'"\\]|\\.)*)['"]?\)/u;

const ICON_FONT = "/assets/icomoon/style.css";
const KATEX_FONT = "/assets/bower_components/katex/dist/katex.min.css";

// 
// 
const GOOGLE_FONTS =
  "https://fonts.googleapis.com/css?family=Roboto+Slab:700%7CNoto+Sans:400,400i,700,700i&display=swap";
// 

const SHELL_FILES = [
  "/assets/css/deepdive-9.1.7.min.css",
  "/assets/js/service-worker.js",
];

const STATIC_FILES = [
  /**/ '/CNAME',
  /**/ '/README.md',
  /**/ '/assets/bower.json',
  /**/ '/assets/bower_components/MathJax/LICENSE',
  /**/ '/assets/bower_components/MathJax/bower.json',
  /**/ '/assets/bower_components/MathJax/composer.json',
  /**/ '/assets/bower_components/MathJax/es5/a11y/assistive-mml.js',
  /**/ '/assets/bower_components/MathJax/es5/a11y/complexity.js',
  /**/ '/assets/bower_components/MathJax/es5/a11y/explorer.js',
  /**/ '/assets/bower_components/MathJax/es5/a11y/semantic-enrich.js',
  /**/ '/assets/bower_components/MathJax/es5/adaptors/liteDOM.js',
  /**/ '/assets/bower_components/MathJax/es5/core.js',
  /**/ '/assets/bower_components/MathJax/es5/input/asciimath.js',
  /**/ '/assets/bower_components/MathJax/es5/input/mml.js',
  /**/ '/assets/bower_components/MathJax/es5/input/mml/entities.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex-base.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex-full.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/action.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/all-packages.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/ams.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/amscd.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/autoload.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/bbox.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/boldsymbol.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/braket.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/bussproofs.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/cancel.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/color.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/colorV2.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/configMacros.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/enclose.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/extpfeil.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/html.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/mhchem.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/newcommand.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/noerrors.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/noundefined.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/physics.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/require.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/tagFormat.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/textmacros.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/unicode.js',
  /**/ '/assets/bower_components/MathJax/es5/input/tex/extensions/verb.js',
  /**/ '/assets/bower_components/MathJax/es5/latest.js',
  /**/ '/assets/bower_components/MathJax/es5/loader.js',
  /**/ '/assets/bower_components/MathJax/es5/mml-chtml.js',
  /**/ '/assets/bower_components/MathJax/es5/mml-svg.js',
  /**/ '/assets/bower_components/MathJax/es5/node-main.js',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml.js',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/tex.js',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_AMS-Regular.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Calligraphic-Bold.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Calligraphic-Regular.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Fraktur-Bold.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Fraktur-Regular.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Main-Bold.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Main-Italic.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Main-Regular.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Math-BoldItalic.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Math-Italic.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Math-Regular.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_SansSerif-Bold.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_SansSerif-Italic.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_SansSerif-Regular.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Script-Regular.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size1-Regular.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size2-Regular.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size3-Regular.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Size4-Regular.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Typewriter-Regular.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Vector-Bold.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Vector-Regular.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2/MathJax_Zero.woff',
  /**/ '/assets/bower_components/MathJax/es5/output/svg.js',
  /**/ '/assets/bower_components/MathJax/es5/output/svg/fonts/tex.js',
  /**/ '/assets/bower_components/MathJax/es5/sre/mathmaps/de.js',
  /**/ '/assets/bower_components/MathJax/es5/sre/mathmaps/en.js',
  /**/ '/assets/bower_components/MathJax/es5/sre/mathmaps/es.js',
  /**/ '/assets/bower_components/MathJax/es5/sre/mathmaps/fr.js',
  /**/ '/assets/bower_components/MathJax/es5/sre/mathmaps/mathmaps_ie.js',
  /**/ '/assets/bower_components/MathJax/es5/sre/mathmaps/nemeth.js',
  /**/ '/assets/bower_components/MathJax/es5/sre/sre-node.js',
  /**/ '/assets/bower_components/MathJax/es5/sre/sre_browser.js',
  /**/ '/assets/bower_components/MathJax/es5/startup.js',
  /**/ '/assets/bower_components/MathJax/es5/tex-chtml-full.js',
  /**/ '/assets/bower_components/MathJax/es5/tex-chtml.js',
  /**/ '/assets/bower_components/MathJax/es5/tex-mml-chtml.js',
  /**/ '/assets/bower_components/MathJax/es5/tex-mml-svg.js',
  /**/ '/assets/bower_components/MathJax/es5/tex-svg-full.js',
  /**/ '/assets/bower_components/MathJax/es5/tex-svg.js',
  /**/ '/assets/bower_components/MathJax/es5/ui/menu.js',
  /**/ '/assets/bower_components/MathJax/es5/ui/safe.js',
  /**/ '/assets/bower_components/MathJax/package.json',
  /**/ '/assets/bower_components/html5shiv/Gruntfile.js',
  /**/ '/assets/bower_components/html5shiv/bower.json',
  /**/ '/assets/bower_components/html5shiv/dist/html5shiv-printshiv.js',
  /**/ '/assets/bower_components/html5shiv/dist/html5shiv-printshiv.min.js',
  /**/ '/assets/bower_components/html5shiv/dist/html5shiv.js',
  /**/ '/assets/bower_components/html5shiv/dist/html5shiv.min.js',
  /**/ '/assets/bower_components/html5shiv/package.json',
  /**/ '/assets/bower_components/katex/LICENSE',
  /**/ '/assets/bower_components/katex/bower.json',
  /**/ '/assets/bower_components/katex/dist/contrib/auto-render.js',
  /**/ '/assets/bower_components/katex/dist/contrib/auto-render.min.js',
  /**/ '/assets/bower_components/katex/dist/contrib/auto-render.mjs',
  /**/ '/assets/bower_components/katex/dist/contrib/copy-tex.css',
  /**/ '/assets/bower_components/katex/dist/contrib/copy-tex.js',
  /**/ '/assets/bower_components/katex/dist/contrib/copy-tex.min.css',
  /**/ '/assets/bower_components/katex/dist/contrib/copy-tex.min.js',
  /**/ '/assets/bower_components/katex/dist/contrib/copy-tex.mjs',
  /**/ '/assets/bower_components/katex/dist/contrib/mathtex-script-type.js',
  /**/ '/assets/bower_components/katex/dist/contrib/mathtex-script-type.min.js',
  /**/ '/assets/bower_components/katex/dist/contrib/mathtex-script-type.mjs',
  /**/ '/assets/bower_components/katex/dist/contrib/mhchem.js',
  /**/ '/assets/bower_components/katex/dist/contrib/mhchem.min.js',
  /**/ '/assets/bower_components/katex/dist/contrib/mhchem.mjs',
  /**/ '/assets/bower_components/katex/dist/contrib/render-a11y-string.js',
  /**/ '/assets/bower_components/katex/dist/contrib/render-a11y-string.min.js',
  /**/ '/assets/bower_components/katex/dist/contrib/render-a11y-string.mjs',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_AMS-Regular.ttf',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_AMS-Regular.woff',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_AMS-Regular.woff2',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Bold.ttf',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Bold.woff',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Bold.woff2',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Regular.ttf',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Regular.woff',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Caligraphic-Regular.woff2',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Bold.ttf',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Bold.woff',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Bold.woff2',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Regular.ttf',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Regular.woff',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Fraktur-Regular.woff2',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Main-Bold.ttf',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Main-Bold.woff',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Main-Bold.woff2',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Main-BoldItalic.ttf',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Main-BoldItalic.woff',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Main-BoldItalic.woff2',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Main-Italic.ttf',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Main-Italic.woff',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Main-Italic.woff2',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Main-Regular.ttf',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Main-Regular.woff',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Main-Regular.woff2',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Math-BoldItalic.ttf',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Math-BoldItalic.woff',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Math-BoldItalic.woff2',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Math-Italic.ttf',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Math-Italic.woff',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Math-Italic.woff2',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Bold.ttf',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Bold.woff',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Bold.woff2',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Italic.ttf',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Italic.woff',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Italic.woff2',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Regular.ttf',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Regular.woff',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_SansSerif-Regular.woff2',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Script-Regular.ttf',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Script-Regular.woff',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Script-Regular.woff2',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Size1-Regular.ttf',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Size1-Regular.woff',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Size1-Regular.woff2',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Size2-Regular.ttf',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Size2-Regular.woff',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Size2-Regular.woff2',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Size3-Regular.ttf',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Size3-Regular.woff',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Size3-Regular.woff2',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Size4-Regular.ttf',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Size4-Regular.woff',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Size4-Regular.woff2',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Typewriter-Regular.ttf',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Typewriter-Regular.woff',
  /**/ '/assets/bower_components/katex/dist/fonts/KaTeX_Typewriter-Regular.woff2',
  /**/ '/assets/bower_components/katex/dist/katex.css',
  /**/ '/assets/bower_components/katex/dist/katex.js',
  /**/ '/assets/bower_components/katex/dist/katex.min.css',
  /**/ '/assets/bower_components/katex/dist/katex.min.js',
  /**/ '/assets/bower_components/katex/dist/katex.mjs',
  /**/ '/assets/bower_components/katex/flow-typed/npm/jest_v24.x.x.js',
  /**/ '/assets/bower_components/katex/yarn.lock',
  /**/ '/assets/icomoon/fonts/icomoon.eot',
  /**/ '/assets/icomoon/fonts/icomoon.svg',
  /**/ '/assets/icomoon/fonts/icomoon.ttf',
  /**/ '/assets/icomoon/fonts/icomoon.woff',
  /**/ '/assets/icomoon/selection.json',
  /**/ '/assets/icomoon/style.css',
  /**/ '/assets/icons/apple-touch-icon-300x300.jpg',
  /**/ '/assets/icons/apple-touch-icon-300x300.png',
  /**/ '/assets/icons/apple-touch-icon.png',
  /**/ '/assets/icons/favicon-128x128.png',
  /**/ '/assets/icons/favicon-144x144.png',
  /**/ '/assets/icons/favicon-152x152.png',
  /**/ '/assets/icons/favicon-16x16.png',
  /**/ '/assets/icons/favicon-192x192.png',
  /**/ '/assets/icons/favicon-32x32.png',
  /**/ '/assets/icons/favicon-384x384.png',
  /**/ '/assets/icons/favicon-48x48.ico',
  /**/ '/assets/icons/favicon-512x512.png',
  /**/ '/assets/icons/favicon-72x72.png',
  /**/ '/assets/icons/favicon-96x96.png',
  /**/ '/assets/icons/favicon.ico',
  /**/ '/assets/icons/favicon.svg',
  /**/ '/assets/img/blog/9.1.0-1.png',
  /**/ '/assets/img/blog/9.1.0-2.png',
  /**/ '/assets/img/blog/9.1.0-3.png',
  /**/ '/assets/img/blog/COLOURlovers.com-Hydejack.png',
  /**/ '/assets/img/blog/blog-layout.jpg',
  /**/ '/assets/img/blog/caleb-george-old.jpg',
  /**/ '/assets/img/blog/caleb-george.jpg',
  /**/ '/assets/img/blog/cover-page.jpg',
  /**/ '/assets/img/blog/dark-mode-ii.jpg',
  /**/ '/assets/img/blog/dark-mode.jpg',
  /**/ '/assets/img/blog/example-content-ii.jpg',
  /**/ '/assets/img/blog/example-content-iii.jpg',
  /**/ '/assets/img/blog/example-content-iii@0,25x.jpg',
  /**/ '/assets/img/blog/example-content-iii@0,5x.jpg',
  /**/ '/assets/img/blog/grid.jpg',
  /**/ '/assets/img/blog/hydejack-8.jpg',
  /**/ '/assets/img/blog/hydejack-8.png',
  /**/ '/assets/img/blog/hydejack-8@0,25x.jpg',
  /**/ '/assets/img/blog/hydejack-8@0,25x.png',
  /**/ '/assets/img/blog/hydejack-8@0,5x.jpg',
  /**/ '/assets/img/blog/hydejack-8@0,5x.png',
  /**/ '/assets/img/blog/hydejack-9-dark.jpg',
  /**/ '/assets/img/blog/hydejack-9-dark@0,25x.jpg',
  /**/ '/assets/img/blog/hydejack-9-dark@0,5x.jpg',
  /**/ '/assets/img/blog/hydejack-9.jpg',
  /**/ '/assets/img/blog/hydejack-9@0,25x.jpg',
  /**/ '/assets/img/blog/hydejack-9@0,5x.jpg',
  /**/ '/assets/img/blog/jeremy-bishop.jpg',
  /**/ '/assets/img/blog/jeremy-bishop@0,5x.jpg',
  /**/ '/assets/img/blog/jj-ying.jpg',
  /**/ '/assets/img/blog/lazy-images.jpg',
  /**/ '/assets/img/blog/louis-hansel.jpg',
  /**/ '/assets/img/blog/louis-hansel@0,25x.jpg',
  /**/ '/assets/img/blog/louis-hansel@0,5x.jpg',
  /**/ '/assets/img/blog/nuage-de-mots-1200x800.jpg',
  /**/ '/assets/img/blog/resume.png',
  /**/ '/assets/img/blog/steve-harvey.jpg',
  /**/ '/assets/img/blog/steve-harvey@0,125x.jpg',
  /**/ '/assets/img/blog/steve-harvey@0,25x.jpg',
  /**/ '/assets/img/blog/steve-harvey@0,5x.jpg',
  /**/ '/assets/img/blog/w3m.png',
  /**/ '/assets/img/blog/wade-lambert.jpg',
  /**/ '/assets/img/docs/chrome-print.png',
  /**/ '/assets/img/docs/google-fonts.png',
  /**/ '/assets/img/logo.png',
  /**/ '/assets/img/sidebar-bg-0.jpg',
  /**/ '/assets/img/sidebar-bg-1.jpg',
  /**/ '/assets/img/sidebar-bg-2.jpg',
  /**/ '/assets/img/sidebar-bg-3.jpg',
  /**/ '/assets/img/sidebar-bg-4.jpg',
  /**/ '/assets/img/sidebar-bg.jpg',
  /**/ '/assets/img/social-media-preview.png',
  /**/ '/assets/img/swipe.svg',
  /**/ '/assets/js/1a46a0eb216ac99ee023.js',
  /**/ '/assets/js/30ccf4318d60e572c894.js',
  /**/ '/assets/js/36827ddaec352eb0750a.js',
  /**/ '/assets/js/3ef0783c8b604fb0017d.js',
  /**/ '/assets/js/3f7c621b1559fabf49f4.js',
  /**/ '/assets/js/4183bb25f132692427b9.js',
  /**/ '/assets/js/4676dbfb3889ccb83ecd.js',
  /**/ '/assets/js/468a9f165d907d12bd9e.js',
  /**/ '/assets/js/50e605542ab875696995.js',
  /**/ '/assets/js/5b037713ff55e45bf739.js',
  /**/ '/assets/js/68af5cfb51dd6bd0a0be.js',
  /**/ '/assets/js/852bc847b44379c78d84.js',
  /**/ '/assets/js/937b3f6661341d45f787.js',
  /**/ '/assets/js/9e9d0166ef065f346312.js',
  /**/ '/assets/js/abebd940673553adc7a0.js',
  /**/ '/assets/js/afce4b9e3332a0c37023.js',
  /**/ '/assets/js/b8191b875c3083cd6a63.js',
  /**/ '/assets/js/cdef798ed1ac3f4faae6.js',
  /**/ '/assets/js/d5ff2f301cc8be439a5b.js',
  /**/ '/assets/js/deepdive-9.1.7.min.js',
  /**/ '/assets/js/deepdive-9.1.7.min.js.map',
  /**/ '/assets/js/drawer-deepdive-9.1.7.min.js',
  /**/ '/assets/js/drawer-deepdive-9.1.7.min.js.map',
  /**/ '/assets/js/e8e8db6b2e3ddf3ca684.js',
  /**/ '/assets/js/fetch-deepdive-9.1.7.min.js',
  /**/ '/assets/js/fetch-deepdive-9.1.7.min.js.map',
  /**/ '/assets/js/ff49f8194712820baca3.js',
  /**/ '/assets/js/intersection-observer-deepdive-9.1.7.min.js',
  /**/ '/assets/js/intersection-observer-deepdive-9.1.7.min.js.map',
  /**/ '/assets/js/navbar-deepdive-9.1.7.min.js',
  /**/ '/assets/js/navbar-deepdive-9.1.7.min.js.map',
  /**/ '/assets/js/push-state-deepdive-9.1.7.min.js',
  /**/ '/assets/js/push-state-deepdive-9.1.7.min.js.map',
  /**/ '/assets/js/resize-observer-deepdive-9.1.7.min.js',
  /**/ '/assets/js/resize-observer-deepdive-9.1.7.min.js.map',
  /**/ '/assets/js/search-deepdive-9.1.7.min.js',
  /**/ '/assets/js/search-deepdive-9.1.7.min.js.map',
  /**/ '/assets/js/shadydom-deepdive-9.1.7.min.js',
  /**/ '/assets/js/shadydom-deepdive-9.1.7.min.js.map',
  /**/ '/assets/js/toc-deepdive-9.1.7.min.js',
  /**/ '/assets/js/toc-deepdive-9.1.7.min.js.map',
  /**/ '/assets/js/vendors-node_modules_abortcontroller-polyfill_dist_polyfill-patch-fetch_js-node_modules_whatw-d9768c-deepdive-9.1.7.min.js',
  /**/ '/assets/js/vendors-node_modules_abortcontroller-polyfill_dist_polyfill-patch-fetch_js-node_modules_whatw-d9768c-deepdive-9.1.7.min.js.map',
  /**/ '/assets/js/vendors-node_modules_juggle_resize-observer_lib_exports_resize-observer_js-deepdive-9.1.7.min.js',
  /**/ '/assets/js/vendors-node_modules_juggle_resize-observer_lib_exports_resize-observer_js-deepdive-9.1.7.min.js.map',
  /**/ '/assets/js/vendors-node_modules_lit-html_lit-html_js-deepdive-9.1.7.min.js',
  /**/ '/assets/js/vendors-node_modules_lit-html_lit-html_js-deepdive-9.1.7.min.js.map',
  /**/ '/assets/js/vendors-node_modules_lit_directives_if-defined_js-node_modules_lit_directives_repeat_js-node_-3b502f-deepdive-9.1.7.min.js',
  /**/ '/assets/js/vendors-node_modules_lit_directives_if-defined_js-node_modules_lit_directives_repeat_js-node_-3b502f-deepdive-9.1.7.min.js.map',
  /**/ '/assets/js/vendors-node_modules_rxjs_dist_esm5_internal_BehaviorSubject_js-node_modules_rxjs_dist_esm5_i-387635-deepdive-9.1.7.min.js',
  /**/ '/assets/js/vendors-node_modules_rxjs_dist_esm5_internal_BehaviorSubject_js-node_modules_rxjs_dist_esm5_i-387635-deepdive-9.1.7.min.js.map',
  /**/ '/assets/js/vendors-node_modules_rxjs_dist_esm5_internal_lastValueFrom_js-node_modules_rxjs_dist_esm5_int-253611-deepdive-9.1.7.min.js',
  /**/ '/assets/js/vendors-node_modules_rxjs_dist_esm5_internal_lastValueFrom_js-node_modules_rxjs_dist_esm5_int-253611-deepdive-9.1.7.min.js.map',
  /**/ '/assets/js/vendors-node_modules_rxjs_dist_esm5_internal_observable_combineLatest_js-node_modules_rxjs_di-7f5a75-deepdive-9.1.7.min.js',
  /**/ '/assets/js/vendors-node_modules_rxjs_dist_esm5_internal_observable_combineLatest_js-node_modules_rxjs_di-7f5a75-deepdive-9.1.7.min.js.map',
  /**/ '/assets/js/vendors-node_modules_rxjs_dist_esm5_internal_observable_merge_js-node_modules_rxjs_dist_esm5_-b60bb4-deepdive-9.1.7.min.js',
  /**/ '/assets/js/vendors-node_modules_rxjs_dist_esm5_internal_observable_merge_js-node_modules_rxjs_dist_esm5_-b60bb4-deepdive-9.1.7.min.js.map',
  /**/ '/assets/js/vendors-node_modules_rxjs_dist_esm5_internal_operators_throttleTime_js-node_modules_hydecorp_-ce9e75-deepdive-9.1.7.min.js',
  /**/ '/assets/js/vendors-node_modules_rxjs_dist_esm5_internal_operators_throttleTime_js-node_modules_hydecorp_-ce9e75-deepdive-9.1.7.min.js.map',
  /**/ '/assets/js/vendors-node_modules_webcomponents_custom-elements_custom-elements_min_js-node_modules_webcom-66572f-deepdive-9.1.7.min.js',
  /**/ '/assets/js/vendors-node_modules_webcomponents_custom-elements_custom-elements_min_js-node_modules_webcom-66572f-deepdive-9.1.7.min.js.map',
  /**/ '/assets/js/vendors-node_modules_webcomponents_shadycss_entrypoints_scoping-shim_js-node_modules_webcompo-1611f4-deepdive-9.1.7.min.js',
  /**/ '/assets/js/vendors-node_modules_webcomponents_shadycss_entrypoints_scoping-shim_js-node_modules_webcompo-1611f4-deepdive-9.1.7.min.js.map',
  /**/ '/assets/js/webanimations-deepdive-9.1.7.min.js',
  /**/ '/assets/js/webanimations-deepdive-9.1.7.min.js.map',
  /**/ '/assets/js/webcomponents-deepdive-9.1.7.min.js',
  /**/ '/assets/js/webcomponents-deepdive-9.1.7.min.js.map',
  /**/ '/assets/version.json',
  /**/ '/jekyll-theme-deepdive.gemspec',
  /**/ '/package-lock.json',
  /**/ '/package.json',
  /**/ '/webpack.config.js',
  /**/
];

const PRE_CACHED_ASSETS = [
  '/assets/icons/favicon.ico',
  /**/ '/assets/img/sidebar-bg.jpg' /**/,
  /**/ '/assets/img/logo.png' /**/,
  /**/ '/assets/img/swipe.svg',
  /**/
];

// Files we add on every service worker installation.
const CONTENT_FILES = [
  "/",
  "/offline.html",
  /**/ '/LICENSE',
  /**/ '/NOTICE',
  /**/ '/CHANGELOG',
  /**/
];

const SITE_URL = new URL("/", self.location);
const OFFLINE_PAGE_URL = new URL("/offline.html", self.location);

self.addEventListener('install', (e) => e.waitUntil(onInstall(e)));
self.addEventListener('activate', (e) => e.waitUntil(onActivate(e)));
self.addEventListener('fetch', (e) => e.respondWith(onFetch(e)));

// Takes a URL with pathname like `/foo/bar/file.txt` and returns just the dirname like `/foo/bar/`.
const dirname = ({ pathname }) => pathname.replace(/[^/]*$/, '');

function matchAll(text, regExp) {
  const globalRegExp = new RegExp(regExp, 'g'); // force global regexp to prevent infinite loop
  const matches = [];
  let lastMatch;
  while ((lastMatch = globalRegExp.exec(text))) matches.push(lastMatch);
  return matches;
}

// Returns the second element of an iterable (first match in RegExp match array)
const second = ([, _]) => _;

const toAbsoluteURL = (url) => new URL(url, self.location);

// Creates a URL that bypasses the browser's HTTP cache by appending a random search parameter.
function noCache(url) {
  return new Request(url, { cache: 'no-store' });
}

// Removes the sw search paramter, if present.
function noSWParam(url) {
  const url2 = new URL(url);
  if (url2.searchParams.has(SW_CACHE_SEARCH_PARAM)) {
    url2.searchParams.delete(SW_CACHE_SEARCH_PARAM);
    return url2.href;
  }
  return url;
}

const warn = (e) => {
  console.warn(e);
  return new Response(e.message, { status: 500 });
};

async function getIconFontFiles() {
  const fontURLs = STATIC_FILES.filter(
    (x) => x.startsWith('/assets/icomoon/fonts/') && x.endsWith('.woff'),
  );
  return [ICON_FONT, ...fontURLs];
}

async function getKaTeXFontFiles() {
  const fontURLs = STATIC_FILES.filter(
    (x) => x.startsWith('/assets/bower_components/katex/dist/fonts/') && x.endsWith('.woff2'),
  );
  return [KATEX_FONT, ...fontURLs];
}

async function getMathJaxFiles() {
  // NOTE: Removed due to MathJax' enormous size.
  // Uncomment if you're using MathJax and don't mind forcing a 50 MB download on every visitor...
  /*
  const mathJaxFiles = STATIC_FILES.filter(x => (
    x.startsWith('/assets/bower_components/MathJax/es5/') &&
    x.endsWith('.js')
  ));
  const fontURLs = STATIC_FILES.filter(x => (
    x.startsWith('/assets/bower_components/MathJax/es5/output/chtml/fonts/woff-v2') &&
    x.endsWith('.woff')
  ));
  return [...mathJaxFiles, ...fontURLs];
  */
}

async function getGoogleFontsFiles() {
  const googleFontRes = await fetch(noCache(GOOGLE_FONTS)).catch(warn);
  if (googleFontRes.ok) {
    const text = await googleFontRes.text();
    return [GOOGLE_FONTS, ...matchAll(text, RE_CSS_URL).map(second)];
  }
  return [];
}

function addAll(cache, urls) {
  return Promise.all(
    urls.map((url) =>
      fetch(noCache(toAbsoluteURL(url)))
        .then((res) => cache.put(url, res))
        .catch(warn),
    ),
  );
}

async function cacheShell(cache) {
  const fontFiles = await Promise.all([
    getIconFontFiles(),
    /**/ getGoogleFontsFiles() /**/,
    /**/,
    /**/ getMathJaxFiles() /**/,
  ]);

  // const jsFiles = STATIC_FILES.filter(
  //   (url) => url.startsWith('/assets/js/') && url.endsWith('.js') && !url.includes('LEGACY'),
  // );
  const jsFiles = STATIC_FILES.filter(
    (url) => url.startsWith('/assets/js/') && url.endsWith('.js') && !url.includes('legacy/'),
  );

  const urls = SHELL_FILES.concat(jsFiles, ...fontFiles).filter((x) => !!x);
  return addAll(cache, urls);
}

async function cacheAssets(cache) {
  const urls = PRE_CACHED_ASSETS.filter((x) => !!x);
  return addAll(cache, urls);
}

async function cacheContent(cache) {
  const urls = CONTENT_FILES.filter((x) => !!x);
  return addAll(cache, urls);
}

async function preCache() {
  const keys = await caches.keys();

  if (keys.includes(SHELL_CACHE) && keys.includes(ASSETS_CACHE)) {
    const contentCache = await caches.open(CONTENT_CACHE);
    return cacheContent(contentCache);
  } else {
    const [shellCache, assetsCache, contentCache] = await Promise.all([
      caches.open(SHELL_CACHE),
      caches.open(ASSETS_CACHE),
      caches.open(CONTENT_CACHE),
    ]);
    return Promise.all([cacheShell(shellCache), cacheAssets(assetsCache), cacheContent(contentCache)]);
  }
}

async function onInstall() {
  await preCache();
  return self.skipWaiting();
}

const isSameSite = ({ origin, pathname }) => origin === SITE_URL.origin && pathname.startsWith(SITE_URL.pathname);
const isAsset = ({ pathname }) => pathname.startsWith("/assets");
const hasSWParam = ({ searchParams }) => searchParams.has(SW_CACHE_SEARCH_PARAM);
const hasNoCacheParam = ({ searchParams }) => searchParams.has(NO_CACHE_SEARCH_PARAM);
const isGoogleFonts = ({ hostname }) => hostname === 'fonts.googleapis.com' || hostname === 'fonts.gstatic.com';

async function cacheResponse(cacheName, req, res) {
  const cache = await caches.open(cacheName);
  return cache.put(req, res);
}

async function onActivate() {
  await self.clients.claim();

  const keys = await caches.keys();

  return Promise.all(
    keys
      // Only consider caches created by this baseurl, i.e. allow multiple Hydejack installations on same domain.
      .filter((key) => key.endsWith("sw/"))
      // Delete old caches
      .filter((key) => key !== SHELL_CACHE && key !== ASSETS_CACHE && key !== CONTENT_CACHE)
      .map((key) => caches.delete(key)),
  );
}

const NEVER = new Promise(() => {});

// Returns the first promise that resolves with non-nullish value,
// or `undefined` if all promises resolve with a nullish value.
// Note that this inherits the behavior of `Promise.race`,
// where the returned promise rejects as soon as one input promise rejects.
async function raceTruthy(iterable) {
  const ps = [...iterable].map((_) => Promise.resolve(_));
  let { length } = ps;
  const continueWhenNullish = (value) => (value != null ? value : --length > 0 ? NEVER : undefined);
  return Promise.race(ps.map((p) => p.then(continueWhenNullish)));
}

async function fromNetwork(url, ...args) {
  const cacheName = isAsset(url) || hasSWParam(url) ? ASSETS_CACHE : CONTENT_CACHE;
  return fetchAndCache(cacheName, url, ...args);
}

async function fetchAndCache(cacheName, url, request, e) {
  const response = await fetch(noCache(noSWParam(url)));
  if (response.ok) e.waitUntil(cacheResponse(cacheName, request, response.clone()));
  return response;
}

async function onFetch(e) {
  const { request } = e;
  const url = new URL(request.url);

  // Bypass
  // ------
  // Go to network for non-GET request and Google Analytics right away.
  const shouldCache = isSameSite(url) || hasSWParam(url) || isGoogleFonts(url);
  if (request.method !== 'GET' || !shouldCache || hasNoCacheParam(url)) {
    return fetch(request).catch((e) => Promise.reject(e));
  }

  try {
    // Caches
    // ------
    const matching = await raceTruthy([
      caches.open(SHELL_CACHE).then((c) => c.match(url.href, { ignoreSearch: true })),
      caches.open(ASSETS_CACHE).then((c) => c.match(url.href, { ignoreSearch: true })),
      caches.open(CONTENT_CACHE).then((c) => c.match(url.href, { ignoreSearch: true })),
    ]);

    if (matching) return matching;

    // Network
    // -------
    // Got to network otherwise. Show 404 when there's a network error.
    // TODO: Use separate offline site instead of 404!?
    return await fromNetwork(url, request, e);
  } catch (err) {
    // console.error(err)
    const cache = await caches.open(CONTENT_CACHE);
    return cache.match(OFFLINE_PAGE_URL);
  }
}

// 

