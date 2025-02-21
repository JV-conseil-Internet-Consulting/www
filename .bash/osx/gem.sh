#!/usr/bin/env bash
# -*- coding: UTF-8 -*-
#
# author        : JV-conseil
# credits       : JV-conseil
# copyright     : Copyright (c) 2019-2024 JV-conseil
#                 All rights reserved
#
# bundle add github-pages jekyll-avatar jekyll-mentions --group "jekyll_plugins"
# bundle add jekyll webrick faraday-retry --group "development"
#
#====================================================

# shellcheck source=/dev/null
. ".bash/incl/all.sh"

_jvcl_::gem_update() {
  local _gem _gems=("bundler")

  gem update --system ||
    printf "Oops command failed: gem update --system"

  # save ruby version in file
  ruby --version | awk '{print $2}' >"./.ruby-version"

  # remove Gemfile.lock
  rm -vrf "./Gemfile.lock" ||
    printf "Oops command failed: rm -vrf ./Gemfile.lock"

  gem info bundler && gem update bundler
}

_jvcl_::bundle_update() {
  local _opt
  for _opt in "check" "doctor" "install" "update" "lock"; do
    bundle "${_opt}" --verbose ||
      printf "Oops command failed: bundle %s --verbose" "${_opt}"
  done
}

_jvcl_::build_gem() {
  local _pkg
  if _pkg="$(cat <'package.json' | jq -r '.name')"; then
    gem uninstall "${_pkg}"
    gem build ./*.gemspec
    gem install ./*.gem && rm -f ./*.gem
  fi
}

# Bash equivalent of Python if __name__ == "__main__":
# <https://stackoverflow.com/a/70662116/2477854>
if [ "${BASH_SOURCE[0]}" = "${0}" ]; then
  if _jvcl_::brew_install_formula "ruby"; then
    _jvcl_::build_gem
  fi
fi
