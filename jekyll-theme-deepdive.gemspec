Gem::Specification.new do |spec|
  spec.name          = "jekyll-theme-deepdive"
  spec.version       = "9.1.7"
  spec.authors       = ["JV conseil"]
  spec.email         = ["contact@jv-conseil.net"]

  spec.summary       = %q{"A boutique Jekyll theme for hackers, nerds, and academics"}
  spec.homepage      = "https://www.jv-conseil.net/"
  spec.license       = "EUPL-1.2"
  spec.metadata = {
    "bug_tracker_uri"   => "https://github.com/JV-conseil/jekyll-theme-deepdive/issues",
    "changelog_uri"     => "https://jv-conseil.github.io/jekyll-theme-deepdive/CHANGELOG/",
    "documentation_uri" => "https://jv-conseil.github.io/jekyll-theme-deepdive/docs/",
    "homepage_uri"      => "https://jv-conseil.github.io/jekyll-theme-deepdive/",
    "source_code_uri"   => "https://github.com/JV-conseil/jekyll-theme-deepdive/",
    "github_repo"       => "ssh://github.com/JV-conseil/jekyll-theme-deepdive"
  }

  spec.files         = `git ls-files -z`.split("\x0").select { |f| f.match(%r{^(assets|_layouts|_includes|_sass|_config.yml|README|LICENSE|NOTICE|CHANGELOG)}i) }

  spec.required_ruby_version = ">= 3.2.1"

  spec.add_runtime_dependency "jekyll", ">= 3.9.3", "< 5.0"
  spec.add_runtime_dependency "jekyll-include-cache", "~> 0.2.1"
  spec.add_runtime_dependency "github-pages", "~> 228"

  spec.add_development_dependency "bundler", "~> 2.4.10"
  spec.add_development_dependency "rake", "~> 12.3.3"
end
