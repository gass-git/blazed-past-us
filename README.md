<p align="center">
  <img src="https://github.com/gass-git/blazed-past-us/raw/main/bolt.png" width="150">
</p>

> 🚧 **Work in progress** This framework is still under active development. Expect changes.

# Blazed Past Us..

A static blog framework that lets you write content in Markdown directly from your IDE.

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
