#!/usr/bin/env bash
# -*- coding: UTF-8 -*-
#
# author        : JV-conseil
# credits       : JV-conseil
# copyright     : Copyright (c) 2019-2023 JV-conseil
#                 All rights reserved
#====================================================

# shellcheck source=/dev/null
. ".bash/incl/all.sh"

_jvcl_::update_npm() {
  _jvcl_::h1 "Update Node.js packages..."
  npm install npm@latest --verbose
  npm update --save --verbose
  npm list --omit=dev
  npm list
  _jvcl_::h1 "Npm audit..."
  npm audit || :
  npx depcheck --detailed || :
}

_jvcl_::webpack() {
  npm run format
  if [ "${WEBPACK_MODE}" == "production" ]; then
    npm run build
  else
    npm run dev
  fi
}

_jvcl_::npm_package_version() {
  # shellcheck disable=SC2317
  npm info "${1%%/*}" version
}

_jvcl_::npm_package_version() {
  npm info "${1}" version
}

if _jvcl_::brew_install_formula "node"; then
  _jvcl_::update_npm
  _jvcl_::webpack
fi
