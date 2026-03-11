> 🚧 **Work in progress** This framework is still under active development. Expect changes.

# Blazed Past Us..
[![Downloads](https://img.shields.io/npm/dm/blazed-past-us.svg?style=flat-square)](https://www.npmjs.com/package/blazed-past-us)
[![version](https://img.shields.io/npm/v/blazed-past-us.svg?style=flat-square)](https://www.npmjs.com/package/blazed-past-us)
[![MIT License](https://img.shields.io/npm/l/blazed-past-us.svg?style=flat-square)](https://github.com/alvinometric/blazed-past-us/blob/main/LICENSE)

Developer centric static blog framework. Write in Markdown from your IDE, share code and SVGs effortlessly, and ship server-rendered HTML for blazing⚡fast load times.

[Live demo](https://gass-git.github.io/blazed-past-us/) 

## Commit 0

**Silver Surfer asked:**  
_"How fast can a dev blog go?"_

**Gass Git, intrigued, answered:**  
_"I don't know… shall we see?"_

**Silver Surfer looked dubious and curious:**  
_"Very well… let the cosmos bear witness."_

## About the framework

- Designed for static hosting environments (e.g. GitHub Pages) — no server-side rewrites required.
- Uses hash routing.
- Fetches static JSON.
- Fetches HTML fragments.
- Avoids history API clean URLs.
- Doesn’t rely on server fallback.

## How to write posts ?

- The post file name will be the title.
- There is no need to add the title within the .md file, this will be set by the meta data.
- Post tags are written in every post on the very top as `tag1, tag2,...`
- The descriptions of the posts will be a brief showcase of the first paragraph (below the tags).
- Add svg images by dropping the svg file within the directory `src/assets/svgs/` and using the following Markdown native syntax `![whatever](filename.svg)`

## Useful notes

- The HTML layout can be modified in `src/layout.js`
- Append `/#/?tags=` to the base URL to filter home page posts by tag.
- Posts creation dates are persisted.
- The creation date is not updated when editing a post.
- The posts titles are used as the identifiers (slugs).

## Installation

### Set up scaffold:

```sh
npx blazed-past-us
```

### Install dependencies:

```sh
npm i
```

### Run locally:

```
npm run dev
```

### For final build:

```
npm run build
```

## Links of interest

- [How to configure and deploy to Github pages](https://gass-git.github.io/blazed-past-us/#/configuration-and-deployment-to-github-pages)
- [Inspiration and architecture](https://gass-git.github.io/blazed-past-us/#/the-inspiration-and-architecture)

