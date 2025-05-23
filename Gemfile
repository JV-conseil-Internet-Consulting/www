source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
# https://jekyllrb.com/

gem "jekyll", "~> 4.4.1"

# IMPORTANT: The followign gem is used to compile math formulas to
# KaTeX during site building.
#
# There are a couple of things to know about this gem:
# *  It is not supported on GitHub Pages.
#    You have to build the site on your machine before uploading to GitHub,
#    or use a more permissive cloud building tool such as Netlify.
# *  You need some kind of JavaScript runtime on your machine.
#    Usually installing NodeJS will suffice.
#    For details, see <https://github.com/kramdown/math-katex#documentation>
#
# If you're using the MathJax math engine instead, free to remove the line below:
gem "kramdown-math-katex"

# A JavaScript runtime for ruby that helps with running the katex gem above.
gem "duktape"
# gem "execjs"

# This is the default theme for new Jekyll sites. You may change this to anything you like.
# gem "minima", "~> 2.0"

# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
# gem "github-pages", group: :jekyll_plugins

# If you have any plugins, put them here!
group :jekyll_plugins do
  gem "jekyll-avatar", "~> 0.8.0"
  gem "jekyll-default-layout"
  gem "jekyll-feed"
  gem "jekyll-include-cache"
  gem "jekyll-mentions"
  gem "jekyll-optional-front-matter"
  gem "jekyll-paginate"
  gem "jekyll-readme-index"
  gem "jekyll-redirect-from"
  gem "jekyll-relative-links"
  gem "jekyll-seo-tag"
  gem "jekyll-sitemap"
  gem "jekyll-titles-from-headings"

  # Non-Github Pages plugins:
  gem "jekyll-last-modified-at"
  gem "jekyll-compose"

  # Non-Jekyll plugins:
  gem "jemoji", "~> 0.13.0"
  # gem "github-pages", "~> 232"
end

# Windows and JRuby does not include zoneinfo files, so bundle the tzinfo-data gem
# and associated library.
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end

# Performance-booster for watching directories on Windows
gem "wdm", "~> 0.2.0", :install_if => Gem.win_platform?

# The CSV library provides a complete interface to CSV files and data.
# It offers tools to enable you to read and write to and from Strings or IO objects, as needed.
gem "csv", "~> 3.3"

# kramdown v2 ships without the gfm parser by default. If you're using
# kramdown v1, comment out this line.
# gem "kramdown-parser-gfm"

# Lock `http_parser.rb` gem to `v0.6.x` on JRuby builds since newer versions of the gem
# do not have a Java counterpart.
# gem "http_parser.rb", "~> 0.6.0", :platforms => [:jruby]

# Development
group :development do
  gem "faraday-retry", "~> 2.3.1"
  # gem "sass", "~> 3.7"
  gem "webrick", "~> 1.9"
end

# Dependabot
group :dependabot do
  gem "json", "~> 2.11.3"
end