architecture

I've been engaging with several blogs and communities lately. Reading mostly about software development. And since a few months ago I started to wish for a place where I could share my own insights and notes. I didn't want to write these on community platforms for a few reasons (I don't own the data, there is no freedom and authenticity in the way these are showcased, ..) so I started to look around for ways in which I could bring to
life my own blog that would allow me to write posts effortless. Little did I know, I was about to embark on a several-month journey.

A unique flavour, that was my desire. The creative internet era of the the late 90's and early 2000's. Each site had its own unique style. Surfing the web was exciting and unexpected. People built using plain code, not frameworks or libraries.

I ended up deciding to go for a static blog hosted in Github pages motivated by the free service and the convenience of building the bundle and deploying automatically on git push. In this way the flow for writing a post would be as easy as typing in the IDE and pushing to github.

There were two frameworks that caught my eye: [Astro](https://astro.build/) and [11ty](https://www.11ty.dev/).

Gravity made me land on [11ty](https://www.11ty.dev/) so I decided to check out how to work with it, but I didn't like it enough. These were for a few very picky things:

I wanted to write Markdown files as clean as when you write them for Github README.md. I didn't want to do things such as:

```md
---
title: hey! this is an article
other: stuff here
---
```

Or HTML files like:

```html
---
layout: layout.html
---

{% for post in collections.post %} {% endfor %}
```

It feels off. An HTML file that looks like that ? It reminds me of Laravel blade syntax (nothing wrong with that though, I kind a liked it).

Then I had my commit 0 moment. Why not build my own blog system which would allow to write .md files in a breeze and explore just for fun how fast it can go. I had just read The Marvelous Life (Stan Lee biography) and a few Silver Surfer comics. Since the super hero has the "surfer" word in its name, it motivated me to create a short dialogue between me and him about a blog. And that gave birth to the whole theme and aesthetics.

![silver-surfer](./images/silver-surfer.png)

What started as a blog system it eventually mutated into a framework. Why not ? I've never built a framework before and I'm currently unemployed which means I have time, so why not ?

⚡Blazed past us was born.

Let me show you a bit what is going on under the hood. This is the server side build process architecture:

![server-side-arch](server-side-arch.svg)

And the client side (runtime) architecture. Just one thing though. This is an early implementation. I have few more ideas which change this a bit.

![client-side-runtime](client-side-runtime.svg)

The thing I'm most proud of is about how simple and straightforward it is to write a post. As you can [see here](https://github.com/gass-git/blazed-past-us/blob/main/src/template/src/posts/the-inspiration-and-architecture.md), the post you are now reading looks identical to a regular README.md file.
