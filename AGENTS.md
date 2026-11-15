# AGENTS.md

Guidance for AI coding agents (Vibe Code and any agent honoring the AGENTS.md convention) working in this repository. Vibe Code loads this file from the repository root automatically at session start.

## Project Overview

This repository builds and deploys the personal website and blog of JV conseil at <https://www.jv-conseil.dev>. It is a Jekyll 4 static site that embeds the custom theme `jekyll-theme-deepdive` and is published to GitHub Pages by a GitHub Actions workflow.

The repository is public and its content is published live on the web through GitHub Pages: every file committed to `main` becomes publicly visible, both to developers reading the source and to every visitor of `www.jv-conseil.dev`. Treat every commit as a publication.

Stacks:

- Ruby / Jekyll 4.4 managed with Bundler (`Gemfile`, `Gemfile.lock`); the pinned interpreter is in `.ruby-version`.
- JavaScript toolchain managed with Yarn 4 (pinned via `packageManager` in `package.json`): webpack 5, Babel, Bootstrap 5.3 SCSS.
- Git LFS tracks `*.webp` assets (`.gitattributes`).

## Repository Layout

- `_config.yml`, `_config-dev.yml` — site configuration; `_config-dev.yml` is a copy for local `jekyll serve` runs.
- `_posts/` — blog posts; filename format `YYYY-MM-DD-title.md`; permalinks resolve to `/blog/:year-:month-:day-:title/`.
- `assets/` — built and static assets; `assets/posts/` holds post images (WebP via LFS); webpack bundles land in `assets/js/`.
- `_sass/` — theme and Bootstrap SCSS sources, compiled by `.scripts/build-css.js`.
- `_js/src/` — JavaScript sources bundled by webpack.
- `_data/`, `_includes/`, `_layouts/`, `_featured_categories/`, `_featured_tags/` — theme data and Liquid templates.
- `.scripts/`, `.bash/` — build and maintenance scripts (several are macOS-oriented: BSD `sed -i ''`, `uglifyjs` shell scripts).
- `docs/` — theme documentation.
- `.github/workflows/` — CI: Pages deployment, CodeQL, Dependabot.

## Commands

Ruby / Jekyll:

```bash
bundle install                                     # install gems
bundle exec jekyll serve --config _config-dev.yml  # local preview on http://localhost:4000
bundle exec jekyll build                           # production build into _site/
```

The helper script `.bash/osx/jekyll.sh` wraps `jekyll clean`, `jekyll doctor`, and `jekyll serve` with the `_config-dev.yml` configuration (macOS-oriented, branch-aware).

JavaScript / assets (all through Yarn):

```bash
yarn install
yarn build        # clean + webpack (JS) + build-css (SCSS) + uglify scripts
yarn dev          # alias for yarn watch
yarn watch        # watch JS and SCSS sources
yarn format       # Prettier on _js/src/**/*.js
```

Checks:

- `yarn test` is a placeholder that exits 0; there is no automated test suite. Verify every change with a local Jekyll build and visual inspection.
- ESLint (`.eslintrc.json`), Prettier (`.prettierrc`), depcheck (`.depcheckrc`), and `.editorconfig` apply.

## Workflow Rules

1. Branches: `main` is the default and production branch, protected by a GitHub ruleset: direct pushes to `main` are rejected, merging requires a pull request, and pull requests touching files with a designated code owner require review from a Code Owner. Always create working branches from `dev`, following the existing naming (for example `perf/pagespeed-insights`), and merge into `main` through a pull request. Never commit directly to `main`. No status checks currently gate merges, so verify the build locally before requesting review.
2. Commits: follow Conventional Commits, with a scope when useful (`perf: ...`, `fix(assets): ...`, `fix(post): ...`). Attribute commits produced by agents to `bot@jv-conseil.dev`.
3. Deployment: pushing to `main` triggers the "Deploy Jekyll v4 to GitHub Pages" workflow, which runs `bundle exec jekyll build` with `JEKYLL_ENV=production` and publishes to GitHub Pages at `www.jv-conseil.dev` (`CNAME`). Always verify the build locally before pushing.
4. Dependabot opens dependency PRs on `dependabot/npm_and_yarn/...` branches; follow that naming for dependency work.
5. Security: CodeQL runs on `dev`; consult `SECURITY.md` and do not introduce unvetted third-party scripts.
6. License: EUPL-1.2 (`LICENSE.md`, `NOTICE.md`); preserve license headers and notices.

## Blog Posts and SEO

Every post must be SEO optimized. Scaffold the file with `bundle exec jekyll post "Title"`, then complete the front matter following the conventions of existing posts in `_posts/`. Required fields:

- `title` — descriptive and keyword-rich, wrapped in quotes.
- `image` — hero picture with `path`, responsive `srcset` variants (a 900w variant and the full-width original, both under `assets/posts/`, produced with `cwebp` under Git LFS), and meaningful `alt` text for accessibility and image search.
- `description` — the meta description served by `jekyll-seo-tag` (about 150 characters).
- `excerpt` — one-paragraph summary shown on listing pages.
- `category`, `tags`, `keywords` — lowercase taxonomies consistent with `_featured_categories/` and `_featured_tags/`; `author` must match an entry in `_data/authors.yml`.
- `seo` — structured-data block consumed by `jekyll-seo-tag`: `type` (for example `TechArticle`), canonical `links` to the post URL, and `json_ld` extras (`dependencies`, `proficiencyLevel`, `timeRequired`, `keywords`).

Reference example from an existing post:

```md
---
layout: post
title: "7 Years Building Funding Apps for Danish Universities"
image:
  path: /assets/posts/2026-10-27-funding-apps-danish-universities-7-years-collaboration.webp
  srcset:
    - [900w, /assets/posts/2026-10-27-funding-apps-danish-universities-7-years-collaboration-900.webp]
    - [1408w, /assets/posts/2026-10-27-funding-apps-danish-universities-7-years-collaboration.webp]
  alt: "Map of Denmark locating the Funding Apps platforms of SDU, DTU, Aarhus University, Aalborg University, and Copenhagen Business School."
description: >
  How an independent French senior full-stack developer spent seven years building AI-powered research funding tools for Danish universities
excerpt: >
  Over seven years, one independent French developer and Denmark's leading universities turned a single campus tool into a national ecosystem of AI-powered grant matching — one that has helped researchers secure millions of euros in European funding.
# hide_description: true
hide_last_modified: true
category: [projects, europe, science, denmark]
keywords: [Freelance Development, Higher Education, Research Funding, Horizon Europe, Denmark, NLP, Full-Stack Development]
tags: [python, django, postgresql, azure]
author: "Julien Vieillefont"

seo:
  type: TechArticle
  links:
    - https://jv-conseil.dev/blog/2026-10-27-funding-apps-danish-universities-7-years-collaboration/
  json_ld:
    dependencies: "Python, Django, PostgreSQL, OpenAlex API, Bootstrap 5, Azure Cloud, NLP"
    proficiencyLevel: "Expert"
    timeRequired: "PT13M"
    keywords: "Grant Management Software, Django Architecture, OpenAlex, NLP, ETL Pipelines, Academic Tech, Funding Apps Danish universities, research funding tools, Horizon Europe grant matching, university research support software, AI grant discovery, freelance full-stack developer, SDU, DTU, Aarhus University, Aalborg University, Copenhagen Business School"
---
```

Do not publish posts with missing or placeholder SEO fields: every field above is required unless explicitly commented out in the example.

## Conventions and Cautions

- Privacy (GDPR): the repository is public and the site serves visitors in the European Union. Never commit personal data (private postal addresses, phone numbers, IP logs, API keys, tokens, or credentials), and strip EXIF metadata from photographs of people. The only personal data permitted is the contact information the owner has deliberately published (`_config.yml`, `_data/authors.yml`). Do not add analytics, cookies, or tracking scripts without consent management, and never log or expose visitor data.
- This file is agent-only content, not site content: `AGENTS.md` must stay in the `exclude` list of both `_config.yml` and `_config-dev.yml` so Jekyll never renders it as a page. It must not appear in the site search index, in the sitemap, or anywhere on `www.jv-conseil.dev`; if it resurfaces in the top search bar results, the exclusion has been lost and must be restored.
- Images: use WebP under Git LFS. Convert with `cwebp` (for example `cwebp logo.png -o logo.webp`). Never commit large binaries outside LFS.
- Math rendering uses `kramdown-math-katex` with the `duktape` JavaScript runtime; the site cannot be built with the `github-pages` gem, which is why CI builds it with the full `Gemfile`. Do not remove those gems.
- Performance: the site is periodically audited with PageSpeed Insights. Do not regress the existing patterns: MathJax loads only on pages that contain math (`_includes/body/scripts.liquid`), icon fonts use `font-display: swap` (`assets/icomoon/style.css`), and post images declare explicit dimensions.
- Do not upgrade `sass-embedded` (`arm64-darwin`) in `Gemfile.lock` as long as `envygeeks/jekyll-docker` has not updated its base image to `ruby:3.1.1-alpine3.18` (see the note in `README.md`).
- Minified bundles and source maps under `assets/js/` are generated by webpack and the uglify scripts; regenerate them, never hand-edit them.
- New blog posts: scaffold with `bundle exec jekyll post "Title"` (`jekyll-compose` is installed) and complete the SEO front matter described in the Blog Posts and SEO section.
- Formatting: run `yarn format` for any JavaScript change; keep SCSS consistent with the existing partials in `_sass/`.
- Several helper scripts assume macOS (BSD `sed`, `wait`); adapt them when working on Linux rather than replacing them.
- Keep this file accurate: when commands, branch policy, or tooling change, update `AGENTS.md` in the same commit.