documentation

This is a brief explainer on how to configure the blog, set up the CI action and deploy to Github pages.

Once you install the scaffolding you will find the file config.json in the src directory. It looks like this:

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

This JSON file allows you to configure the base_url, the subtitle (that shows under the title) and add your custom tags with their respective color.

The base_url it what comes after the origin url. E.g. in the case of this blog you can see that is what comes after https://gass-git.github.io.

.. to be continued

![whatever](intersection.svg)
