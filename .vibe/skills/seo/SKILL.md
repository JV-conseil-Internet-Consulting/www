---
name: seo
description: >-
  Load when asked to improve, complete, or audit the SEO of a blog post in
  _posts/. Follow this repo's AGENTS.md "Blog Posts and SEO" conventions:
  required front-matter fields, taxonomy md files, responsive WebP hero under
  Git LFS, and verification with a production Jekyll build.
user-invocable: true
---

# SEO for blog posts

Apply to the post named in the request. Reference posts with complete front
matter: `_posts/2024-04-25-earma-conference-odense-2024.md`,
`_posts/2025-05-08-inorms-congress-madrid-2025.md`,
`_posts/2026-10-27-funding-apps-danish-universities-7-years-collaboration.md`.

## Required front matter

Never publish with missing or placeholder values. Every post needs:

- `layout: post`
- `title` — descriptive and keyword-rich, wrapped in quotes.
- `image` — hero picture:
  - `path`: full-width WebP under `assets/posts/`
  - `srcset`: a `900w` variant plus the full-width original (key named with
    its width, e.g. `1600w`)
  - `alt`: meaningful alt text for accessibility and image search
- `description` — meta description served by jekyll-seo-tag, about 150
  characters.
- `excerpt` — one-paragraph summary shown on listing pages.
- `category`, `tags` — lowercase taxonomies. Every `category` entry must exist
  as `_featured_categories/<slug>.md` and every `tags` entry as
  `_featured_tags/<slug>.md`; when introducing a new term, create that md file
  first, otherwise the post is silently dropped from the taxonomy pages.
- `keywords` — capitalized keyword list.
- `author` — must match an entry in `_data/authors.yml` (here
  `"Julien Vieillefont"`).
- `seo` — structured-data block consumed by jekyll-seo-tag:
  - `type` (e.g. `TechArticle`, `ScholarlyArticle`)
  - `links`: canonical post URL `https://jv-conseil.dev/blog/<YYYY-MM-DD-slug>/`
  - `json_ld`: `dependencies`, `proficiencyLevel`, `timeRequired`, `keywords`
- `hide_last_modified: true`

Body conventions: start with `- &nbsp;` and `{:toc .large-only}`, then the
`<!-- markdownlint-disable MD026 MD033 MD041 -->` comment, then
`_Reading time: X min._`.

## Images

- WebP only, tracked by Git LFS (`*.webp` in `.gitattributes`).
- Generate the 900w variant from the original with cwebp, e.g.
  `cwebp -q 80 -resize 900 0 assets/posts/<name>.png -o assets/posts/<name>-900.webp`
  (cwebp lives at `/opt/homebrew/bin/cwebp`).

## Verify

Build with the pinned Homebrew Ruby 4.0.x (the system Ruby 2.6 lacks Bundler
4.1 required by `Gemfile.lock`):

```bash
PATH=/opt/homebrew/opt/ruby/bin:$PATH bundle exec jekyll build
```

Then check `_site/blog/<slug>/index.html`: meta description, canonical link,
JSON-LD `@type`, preload `imagesrcset` mirroring the hero `<img>` srcset — and
that the post appears on each of its category pages (`/<slug>/`), tag pages
(`/tag-<slug>/`), and `sitemap.xml`.

## New posts

Scaffold with `bundle exec jekyll post "Title"` (jekyll-compose is installed),
then complete the front matter above.
