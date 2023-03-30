#!/usr/bin/env bash
# -*- coding: UTF-8 -*-
#
# author        : JV-conseil
# credits       : JV-conseil
# copyright     : Copyright (c) 2019-2023 JV-conseil
#                 All rights reserved
#
# Jekyll on macOS
# <https://jekyllrb.com/docs/installation/macos/>
#
# bundle add github-pages --group "jekyll_plugins"
# bundle add sass --group "development"
# bundle add jekyll-avatar
# bundle add jekyll webrick faraday-retry --group "development"
#
#====================================================

# shellcheck source=/dev/null
{
  . ".bash/incl/all.sh"
  . ".bash/osx/gem.sh"
}

_jvcl_::html_to_liquid() {
  local _file

  cat <<EOF

Convert to .liquid format
-------------------------

Run the script with _jvcl_::html_to_liquid

Then search with [Aa] and [.*] options activated for pattern ' (.+)\.html ' and replace with ' $1.liquid '

EOF

  while IFS= read -r -d '' _file; do
    if mv "${_file}" "${_file/.html/.liquid}"; then
      echo "renaming ${_file} to ${_file/.html/.liquid}"
    fi
  done < <(find . -name "*.html" ! -path "*_site/*" ! -path "*assets/*" -print0)
}

_jvcl_::jekyll_serve() {
  _jvcl_::h1 "Launching Jekyll..."
  bundle exec jekyll clean --config "_config_dev.yml"
  bundle exec jekyll doctor --config "_config_dev.yml"
  bundle exec jekyll serve --config "_config_dev.yml" --livereload
}

_jvcl_::github_pages() {
  bundle exec github-pages health-check || :
}

# shellcheck disable=SC2317
if _jvcl_::brew_install_formula "ruby"; then
  _jvcl_::gem_update
  _jvcl_::bundle_update
  _jvcl_::github_pages
  _jvcl_::jekyll_serve
fi
