# Vidhan Kashyap — Personal Website

This repository contains the source code for my personal academic website, hosted at
[https://7vidhan.github.io](https://7vidhan.github.io).

The site is built with [Jekyll](https://jekyllrb.com/) using the
[al-folio](https://github.com/alshedivat/al-folio) theme — a clean, minimalist theme designed
for academics, researchers, and students to showcase projects, publications, and writing.

## About Me

Vidhan Kashyap — Master's student in Mechanical Engineering at The University of Osaka, Japan.
This site includes my background, projects, research interests, and blog posts.

## Tech Stack

- **Static site generator:** [Jekyll](https://jekyllrb.com/)
- **Theme:** [al-folio](https://github.com/alshedivat/al-folio)
- **Hosting:** GitHub Pages
- **Languages:** HTML, Liquid, SCSS, YAML

## Local Development

To run this site locally:

1. **Install prerequisites**
   - [Ruby](https://www.ruby-lang.org/en/documentation/installation/) (2.7+)
   - [Bundler](https://bundler.io/): `gem install bundler`

2. **Clone the repository**
   ```bash
   git clone https://github.com/7vidhan/7vidhan.github.io.git
   cd 7vidhan.github.io
   ```

3. **Install dependencies**
   ```bash
   bundle install
   ```

4. **Serve locally**
   ```bash
   bundle exec jekyll serve
   ```
   The site will be available at `http://localhost:4000`.

   Alternatively, if using Docker (recommended by al-folio for consistent builds):
   ```bash
   docker compose up
   ```

## Project Structure

```
.
├── _config.yml          # Site-wide settings (name, social links, SEO, features)
├── _data/                # Structured data (CV, coauthors, repositories, etc.)
├── _includes/            # Reusable HTML/Liquid partials (head, metadata, nav, etc.)
├── _layouts/             # Page layout templates
├── _news/                # Short announcement/news items shown on homepage
├── _pages/               # Static pages (about, publications, projects, CV, etc.)
├── _posts/                # Blog posts
├── _projects/            # Project entries
├── _sass/                 # Stylesheets
├── assets/                # Images, PDFs, custom CSS/JS
└── README.md
```

## Key Configuration

Most personalization happens in `_config.yml`, including:

- Name, title, and site description
- Social and academic profile links (GitHub, LinkedIn, Google Scholar, ORCID, etc.)
- SEO settings — Open Graph metadata and Schema.org structured data
- Google Search Console / Bing Webmaster verification
- Analytics integration

## Deployment

This site is automatically deployed via **GitHub Pages** from this repository. Any push to the
default branch triggers a rebuild through GitHub Actions (see `.github/workflows/`), and the
live site updates within a few minutes at `https://7vidhan.github.io`.

## SEO Notes

To help this site surface correctly in search results:

- `serve_og_meta` and `serve_schema_org` are enabled in `_config.yml` to output Open Graph and
  Schema.org (`Person` / `WebSite`) structured data.
- The site is verified and submitted via
  [Google Search Console](https://search.google.com/search-console).
- A sitemap is generated automatically at `/sitemap.xml`.

## Acknowledgements

Built on top of the excellent [al-folio](https://github.com/alshedivat/al-folio) Jekyll theme,
originally based on [*folio](https://github.com/bogoli/-folio) by [Amir Pourmand](https://amirpourmand.me/).

## License

The al-folio theme is released under the [MIT License](https://github.com/alshedivat/al-folio/blob/main/LICENSE).
Content and personal materials (writing, images, CV, etc.) are © Vidhan Kashyap unless otherwise noted.