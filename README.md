<p align="center">
  <img src="https://github.com/gass-git/blazed-past-us/raw/main/bolt.png" width="150">
</p>

> 🚧 **Work in progress** This framework is still under active development. Expect changes.

# Blazed Past Us..

A static blog framework made for developers that allows content to be written in Markdown directly from the IDE. Plus it's fast.

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

## Useful notes

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

## Action that works for deploying to Github pages

```
name: deploy to Github pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write
  deployments: write

jobs:
  build-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 24

      - run: npm install
      - run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

      - uses: actions/deploy-pages@v4

      - name: Create Deployment Record
        uses: chrnorm/deployment-action@v2
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          environment: github-pages
          environment-url: https://{you-username-here}.github.io/
          ref: main
```
