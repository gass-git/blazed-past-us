architecture

I've been enaging with several blogs and communities lately. Reading mostly about things related to software development. And since a few months ago I started to wish for a place in where I could share my own insights and notes. I didn't want to write these on community platforms for a few reasons (I don't own the data, there is no freedom and authenticity in the way these are designed, ..) so I started to look around for ways in which I could bring to
life my own blog that would allow me to write posts effortless.

I wanted to build a blog with my own unique flavour. I like feeling the freedom of the early 2000's of the internet. Each site had their own unique style. Surfing the web was exciting and unexpected. The web was full o creativity and authenticity. People used plain languages to build, not frameworks or libraries.

I ended up deciding to go for a static blog hosted in github pages that would build on git push the written content on the IDE. In this way the flow for writing a post would be as easy as typing in the IDE and pushing to github.

There were two frameworks that caught my eye: Astro and 11ty.

Gravity made me land on 11ty so I decided to check out how to work with it, but I didn't like enough to choose it. These were for a few very picky things:

I wanted to write .md files as clean as when you write them for github. I didn't want to write things like on the top of every post.

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

It feels off. An HTML file that looks like that ? ... It reminds me of Laravel blade syntax (nothing wrong with that though, I kind a liked it).

Then I had my commit 0 moment. Why not build my own blog system which would allow to write .md files in a breaze and explore just for fun how fast it can go. I had just read a book about the life of Stan Lee and reading Silver Surfer comic. Since that super hero has the "surfer" word in its name it motivated me to create a short dialogue between me and him about a blog and that gave birth to the whole theme and easthetics.

What started as a blog system it eventually mutated into a framework. Why not ? I've never build a framework before and I'm currently unemployed which means I have time, so why not ?

⚡Blazed past us was born.

Let me show you a bit what is going on under the hood. This is the server side build process architecture:

![server-side-arch](server-side-arch.svg)

And the client side (runtime) architecture

![client-side-runtime](client-side-runtime.svg)

The thing I'm most proud of is about how simple and straightforward it is to write a post. As you can [see here](https://github.com/gass-git/blazed-past-us/blob/main/src/template/src/posts/the-inspiration-and-architecture.md), the post you are now reading looks identical to a regular README.md file.
