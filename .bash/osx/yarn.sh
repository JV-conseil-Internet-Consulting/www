#!/usr/bin/env bash
# -*- coding: UTF-8 -*-
#
# author        : JV-conseil
# credits       : JV-conseil
# copyright     : Copyright (c) 2019-2024 JV-conseil
#                 All rights reserved
#====================================================

# shellcheck source=/dev/null
. ".bash/incl/all.sh"

_jvcl_::yarn_audit() {
  _jvcl_::h1 "npm audit..."
  yarn npm audit || :
  _jvcl_::h1 "depcheck..."
  npx depcheck --detailed || :
  _jvcl_::h1 "yarn upgrade-interactive..."
  printf "Exit the terminal to allow the command to continue\n"
  yarn upgrade-interactive || :
}

_jvcl_::webpack() {
  _jvcl_::h1 "webpack..."
  yarn run format
  if [ "${WEBPACK_MODE}" == "production" ]; then
    yarn run build
  else
    yarn run dev
  fi
}

_jvcl_::npm_package_version() {
  # shellcheck disable=SC2317
  npm info "${1%%/*}" version
}

_jvcl_::_sass_bootstrap() {
  _jvcl_::h1 "node_modules copying..."
  cp -pvrf "./node_modules/bootstrap/scss/"{_functions,_variables,_maps,_mixins,_utilities,_grid,_forms,_buttons,forms,mixins,vendor}* "./_sass/bootstrap"
}

_jvcl_::_sass_tippyjs() {
  local _gh_repo="https://github.com/atomiks/tippyjs.git" _dest="_sass/tippyjs_" _tmp="${HOME}/tmp"
  git clone "${_gh_repo}" "${_tmp}"
  mkdir -pv "${_dest}"
  cp -pvrf "${_tmp}/src/scss/"{animations,_mixins,_vars,index}* "${_dest}"
  rm -rf "${_dest}/animations/"{per,sca,shi}*.scss
  rm -rf "${_tmp}"
}

_jvcl_::yarn_update() {
  if ! type "yarn" &>/dev/null; then
    printf "\nERROR: yarn is not installed\n\n"
    return
  fi
  _jvcl_::h1 "yarn update..."
  (
    yarn set version stable &&
      yarn install &&
      yarn up
  ) || :
}

_jvcl_::main() {
  _jvcl_::yarn_update
  _jvcl_::yarn_audit || :
  _jvcl_::_sass_bootstrap
  # _jvcl_::_sass_tippyjs
  _jvcl_::webpack
}

_jvcl_::main
