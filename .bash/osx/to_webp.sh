#!/usr/bin/env bash
#
# Script Name : to_webp.sh
# Description : ...
# Created     : May 24, 2026
# Author      : JV-conseil
# Contact     : contact@jv-conseil.dev
# Website     : https://www.jv-conseil.dev
# Copyright   : (c) 2026 JV-conseil
#               All rights reserved
# ========================================================

set -Eeou pipefail
shopt -s failglob nullglob

# Get the directory of the current script
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &>/dev/null && pwd)
declare -r SCRIPT_DIR

TARGET_DIR="${1:-.}"

if [[ ! -d "$TARGET_DIR" ]]; then
  echo "Error: Directory '$TARGET_DIR' does not exist." >&2
  exit 1
fi

if ! command -v cwebp &>/dev/null; then
  echo "Error: 'cwebp' command not found. Please install it using 'brew install webp'" >&2
  exit 1
fi

echo "Scanning for images in: $TARGET_DIR"
echo "----------------------------------------"

count=0

# Use find with Extended Regex to look for files case-insensitively (-iregex)
# We read the output using a while loop with a null delimiter (-print0) to safely handle spaces
while IFS= read -r -d '' img; do
  count=$((count + 1))

  filename=$(basename -- "$img")
  filename_no_ext="${filename%.*}"
  dirname=$(dirname -- "$img")

  output_file="$dirname/$filename_no_ext.webp"

  echo "${count}. Converting: $filename -> $filename_no_ext.webp" >&2

  if ! cwebp -q 80 "$img" -o "$output_file" &>/dev/null; then
    echo "Failed to convert: $filename" >&2
  fi

done < <(find -E "${TARGET_DIR}" -maxdepth 1 -type f -iregex '.*\.(jpg|jpeg|png|tiff)' -print0)

echo "----------------------------------------"
echo "Done! Successfully converted $count images to WebP."
