---
title: How To Turn Astro HTML Web Pages Into Markdown Using Cloudflare Workers
description: Serve any page on your Astro site as clean markdown just by adding .md to the URL, using one free Cloudflare Pages Function that pulls straight from GitHub.
pubDate: 2026-07-21
draft: true
type: tutorial
slug: htmltomarkdown
permalink: /htmltomarkdown/
canonicalUrl: https://mikemurphy.ai/tutorials/htmltomarkdown/
contentEra: ai
visibility: public
author: Mike Murphy
featuredImage: assets/media/2026/07/html_markdown_cloudflare_workers.jpg
featuredImageSource: ""
categories:
  - Tutorials
  - Cloudflare
  - Astro
tags: []
topics:
  - cloudflare-workers
  - markdown
  - astro
  - github
  - obsidian
youtube:
  - https://youtu.be/N0idX2kMqiM
search:
  include: true
  boost: 1
---

Every page on my Astro site gets compiled into HTML at build time. The raw markdown file, the actual source, never gets served to anyone. But what if you could get to it anyway? Not a scraped, reformatted copy, the real source file, stripped clean and ready to paste into Obsidian or hand to an AI tool.

You can do this with one file and zero extra services. Add `.md` to the end of any URL on your site, and a Cloudflare Pages Function intercepts the request, pulls the original markdown straight from your GitHub repo, strips out the frontmatter, and serves it back as plain text. Everything else on your site works exactly as it did before.

## What You Will Build

- A `functions/_middleware.js` file that intercepts any request ending in `.md`
- A fetch straight from your GitHub repo's raw markdown source, no separate database or API
- Automatic frontmatter and MDX component stripping, so the output is clean, copy-paste-ready text
- A working `.md` version of every page on your site, for free, with no extra deploy step

## Why This Matters

Astro (and most static site generators) compile your `.md` and `.mdx` files into HTML the moment you build. That means the plain text version of your content only ever exists in your repo, nobody visiting your site can actually get to it. This Function changes that: it sits in front of your normal site and, only for `.md` requests, goes and finds the original source instead of the rendered page.

This is genuinely useful for anyone who wants to save your tutorials into a note-taking app like Obsidian, or feed a page into an LLM without the HTML, nav bar, and footer getting in the way.

You don't need Astro or Cloudflare Pages specifically for this to work. What you actually need is a markdown file that the Function can go and fetch. If your site runs on WordPress or anything else that doesn't store content as markdown natively, you'll need to keep a folder of markdown copies of your pages and point the Function at that folder instead. It's one extra step, but the Function itself works the same way either way.

## Before You Start

- An Astro site (or any site) deployed on Cloudflare Pages, connected to a GitHub repo
- Pushing to your repo already triggers an automatic Cloudflare Pages build
- Your GitHub repo is public (private repos need one extra header, noted at the end)
- You know where your raw markdown content actually lives in the repo. Mine is `src/content`

## Step 1: Create the Functions Folder and Middleware File

In your project, at the same level as `src` (not inside it), create a folder named `functions`. Inside that folder, create a file named `functions/_middleware.js`.

- The underscore in `_middleware.js` isn't optional. That exact filename is what tells Cloudflare to run this Function on every request to your site.
- In VS Code, this is just right-click the empty space at the root of the project, **New Folder**, name it `functions`, then right-click `functions` and **New File** named `_middleware.js`.

## Step 2: Paste In the Script and Point It At Your Repo

Paste the full script (below, in the Script Reference section) into `_middleware.js`, then update four variables near the top:

```js
const GITHUB_USER = 'mikemurphyco';
const GITHUB_REPO = 'mikemurphy.ai';
const GITHUB_BRANCH = 'main';
const CONTENT_BASE_PATH = 'src/content';
```

- `GITHUB_USER` and `GITHUB_REPO` are right there in your repo's URL, or the top-left corner of the GitHub page
- `GITHUB_BRANCH` is whatever branch triggers your Cloudflare build, usually `main`
- `CONTENT_BASE_PATH` is the folder where your raw markdown actually lives. In VS Code, right-click that folder and choose **Copy Relative Path** to get the exact value

> If your posts live under an extra layer, like a year folder, add that segment to the path patterns in the script (or to `CONTENT_BASE_PATH`) so it matches where your files actually sit in the repo.

## Step 3: How the Function Finds and Cleans the File

Once a request ends in `.md`, the Function strips that extension off the URL and tries a few common filename patterns against your GitHub repo (`.mdx`, `.md`, `index.mdx`, `index.md`) until one of them resolves. It pulls the raw text with a plain `fetch()` call, no auth needed for a public repo.

From there, it runs the result through a cleanup pass that removes the YAML frontmatter block at the top of the file, any `import` lines used by MDX, and any JSX-style component tags. What's left is just the tutorial content itself, no metadata, no leftover component code.

## Step 4: Commit and Push

```bash
git add functions/_middleware.js
git commit -m "Add .md raw markdown serving via Pages Function"
git push
```

This kicks off your normal Cloudflare Pages build. No dashboard configuration, no separate deployment.

## Step 5: Test It

Once the build finishes, open any existing page on your site and add `.md` to the end of the URL:

```
https://mikemurphy.ai/tutorials/your-tutorial-name.md
```

Instead of the rendered page, you should get the raw markdown as plain text, no frontmatter, no HTML. Select all, copy, and paste it straight into Obsidian, or save the page as a `.md` file from your browser's **File → Save Page As** menu.

To get back to the normal article, just delete the `.md` from the end of the URL.

## Troubleshooting

| What you see | What's going on |
|---|---|
| Plain text markdown, no frontmatter | It worked, that's the raw source |
| Your normal rendered page, not plain text | The Function isn't matching. Check the file location and `CONTENT_BASE_PATH` |
| A 404 | Either the filename patterns don't match your repo's naming, or the repo isn't public |
| Build succeeds but `.md` still returns HTML | Double-check `CONTENT_BASE_PATH` and confirm the folder structure matches what the script expects |

## Script Reference

This is the complete `functions/_middleware.js` file:

```js
export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);

  if (!url.pathname.endsWith('.md')) {
    return next();
  }

  const pagePath = url.pathname.slice(0, -3);

  const GITHUB_USER = 'mikemurphyco';
  const GITHUB_REPO = 'mikemurphy.ai';
  const GITHUB_BRANCH = 'main';
  const CONTENT_BASE_PATH = 'src/content';

  const candidates = [
    `${pagePath}.mdx`,
    `${pagePath}.md`,
    `${pagePath}/index.mdx`,
    `${pagePath}/index.md`,
  ];

  let rawText = null;

  for (const candidate of candidates) {
    const githubUrl = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${CONTENT_BASE_PATH}${candidate}`;
    const response = await fetch(githubUrl);

    if (response.ok) {
      rawText = await response.text();
      break;
    }
  }

  if (!rawText) {
    return next();
  }

  const cleaned = stripFrontmatterAndMdx(rawText);

  return new Response(cleaned, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

function stripFrontmatterAndMdx(text) {
  let result = text.replace(/^---\n[\s\S]*?\n---\n/, '');
  result = result.replace(/^import .*(\n|$)/gm, '');
  result = result.replace(/<[A-Z][A-Za-z0-9]*[^>]*\/>/g, '');
  result = result.replace(/<[A-Z][A-Za-z0-9]*[^>]*>[\s\S]*?<\/[A-Z][A-Za-z0-9]*>/g, '');
  return result.trim();
}
```

> If your repo is private, add a `GITHUB_TOKEN` environment variable in your Cloudflare Pages project settings, then include `headers: { Authorization: \`Bearer ${context.env.GITHUB_TOKEN}\` }` on the `fetch()` call. Same script, one extra header.

## What This Unlocks Next

Once this is live, every page on your site doubles as a plain-text export, no extra publishing step, no second copy to maintain. That's a clean source for note-taking apps, AI tools, or anyone who wants your content without the page chrome around it.

## Links

- [Astro](https://astro.build)
- [Cloudflare Workers](https://workers.cloudflare.com)
- [Obsidian](https://obsidian.md)
- [VS Code](https://code.visualstudio.com)

_My name is Mike Murphy, your AI Handyman, cheers!_
