documentation

This is a brief explainer on how to configure the blog, set up the CI action and deploy to Github pages.

Once you install the scaffolding you will find the file `config.json` in the src directory. It looks like this:

```json
{
  "base_url": "/blazed-past-us/",
  "subtitle": "let the cosmos bear witness...",
  "tags": {
    "javascript": { "color": "#f5dd42" },
    "typescript": { "color": "#42adf5" },
    "default": { "color": "#e0e0e0" }
  }
}
```

This JSON file allows you to configure the `base_url`, the `subtitle` and add your custom `tags` with their respective font color.

The `base_url` is what comes after the origin url. E.g. in the case of this blog you can see that is what comes after `https://gass-git.github.io`

In your Github repository create a new workflow with the following code and replace where it says `blazed-past-us` with your `base_url`

```yml {42} showLineNumbers
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
    defaults:
      run:
        working-directory: ./src/template

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 24

      - run: npm i
      - run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./src/template/dist

      - uses: actions/deploy-pages@v4

      - name: Create Deployment Record
        uses: chrnorm/deployment-action@v2
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          environment: github-pages
          environment-url: https://gass-git.github.io/blazed-past-us/
          ref: main
```
