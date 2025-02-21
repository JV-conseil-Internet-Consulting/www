#!/usr/bin/env bash
# -*- coding: UTF-8 -*-
#
# author        : JV-conseil
# credits       : JV-conseil
# copyright     : Copyright (c) 2019-2024 JV-conseil
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
  . "${HOME}/.env/jekyll/.env"
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
  local -a _cmd=() _args

  _jvcl_::h1 "Launching Jekyll..."

  for _arg in "clean" "doctor" "serve"; do
    _cmd=("bundle" "exec" "jekyll" "${_arg}" "--config" "_config-dev.yml")
    if [ "${_arg}" == "serve" ]; then
      _cmd+=("--livereload" "--trace")
      open -na /Applications/Firefox.app --args '--private-window' 'http://localhost:4000/'
    fi
    "${_cmd[@]}"
  done
}

_jvcl_::github_pages() {
  bundle exec github-pages health-check ||
    printf "\nERROR: bundle exec github-pages health-check failed\n"
}

# shellcheck disable=SC2317
_jvcl_::main() {
  if ! _jvcl_::brew_install_formula "ruby"; then
    return 1
  fi
  _jvcl_::gem_update
  _jvcl_::bundle_update
  # _jvcl_::github_pages
  _jvcl_::jekyll_serve
}

_jvcl_::main
