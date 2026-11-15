#!/usr/bin/env bash
#
# Script Name : git.sh
# Description : ...
# Created     : November 15, 2026
# Author      : JV-conseil
# Contact     : contact@jv-conseil.dev
# Website     : https://www.jv-conseil.dev
# Copyright   : (c) 2026 JV-conseil
#               All rights reserved
#
# To sign every commit on local `dev` that is ahead of `main`, rebase the branch over `origin/main` with a sign-each-commit step. Only the range `origin/main..dev` matters for the protection rule; the older shared history does not need to be touched.
#
# ```bash
# git fetch origin
# git switch dev
# git rebase --rebase-merges --exec 'git commit --amend --no-edit -S' origin/main
# ```
#
# Explanation of the two options:
#
# - `--rebase-merges` preserves the merge structure of `dev`, including the merge commit of PR #478 and any merge of `perf/responsive-variants-850`. If you prefer a fully linear history, omit it; the merges will be flattened, and the content will be preserved.
# - `--exec 'git commit --amend --no-edit -S'` rewrites each commit with a signature, keeping its message and author untouched.
#
# If `git config --global commit.gpgsign true` is already active, the `-S` flag is redundant but harmless.
#
# Then verify before pushing:
#
# ```bash
# git log --pretty="format:%h %G? %s" origin/main..dev
# ```
#
# Every line must display `G` in the second column. Lines displaying `N` mean the commit was not signed; lines displaying `U` mean the signature is valid but the key is not registered on your GitHub account, which will not clear the check.
#
# Finally, publish the rewritten branch:
#
# ```bash
# git push --force-with-lease origin dev
# ```
#
# Please note that this rewrites the commit hashes on `dev`, which is expected and required. Any other local branches based on the old `dev` commits will need to be rebased again afterwards. Once the push is accepted, kindly inform me and I will confirm that the block on PR #479 has cleared.
#
# ========================================================

# shellcheck source=/dev/null
. ".bash/incl/all.sh"

_jvcl_::git_sign_local() {
  _jvcl_::h1 "Sign every commit on local dev branch..."
  git fetch origin
  git switch dev
  git rebase --rebase-merges --exec 'git commit --amend --no-edit -S' origin/main
}

_jvcl_::main() {
  if _jvcl_::git_sign_local; then
    git push --force-with-lease origin dev
  fi
}

_jvcl_::main
