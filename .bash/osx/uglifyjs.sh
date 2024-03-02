#!/usr/bin/env bash
# -*- coding: UTF-8 -*-
#
# author        : JV-conseil
# credits       : JV-conseil
# copyright     : Copyright (c) 2019-2024 JV-conseil
#                 All rights reserved
#====================================================
set -Eeou pipefail
shopt -s failglob

_jvcl_::_uglifyjs() {
  local _file
  while IFS= read -rd '' _file; do
    (
      printf "yarn run uglifyjs %s -cmo %s\n" "${_file}" "${_file/.js/.min.js}" &&
        yarn run uglifyjs "${_file}" -cmo "${_file/.js/.min.js}"
    ) || :
  done < <(find _includes/scripts -type f -name "*.js" ! -name "*.min.js" -print0)
}

_jvcl_::_uglifyjs
