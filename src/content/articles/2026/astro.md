---
title: How To Build Your First Website With Astro
description: Install Astro, scaffold a new project, explore the file structure, and use AI to rebuild a real one page website in about five minutes.
pubDate: 2026-08-12
draft: false
type: tutorial
slug: astro
permalink: /astro/
canonicalUrl: https://mikemurphy.ai/tutorials/astro/
contentEra: ai
visibility: public
author: Mike Murphy
featuredImage: /assets/media/2026/08/astro-getting-started.jpg
featuredImageSource: ""
categories:
  - Tutorials
  - Astro
tags: []
topics:
  - astro
  - nodejs
  - vscode
  - static-site
  - web-development
  - ai-coding
youtube:
  - https://youtu.be/6twAecA1oJ0
search:
  include: true
  boost: 1
---
## Description

Astro is a web framework, the same category of tool as WordPress, but built specifically for content heavy sites: blogs, tutorials, portfolios, and small business pages. By default, Astro websites ship as static HTML, so they load instantly and have almost nothing for a server to slow down.

This tutorial walks through building a real Astro website from a completely empty folder: installing Astro, scaffolding a new project, understanding what each file does, and then using AI to turn a folder of images and text into a finished one page site in about five minutes.

## What You Will Build

By the end of this tutorial, you will have:

- A new Astro project running locally on your computer
- A working local dev server you can start, stop, and restart on demand
- A second custom page added to the site
- A real one page website, rebuilt from your own assets with the help of an AI coding tool

## Why This Matters

If you make content (tutorials, articles, a portfolio, a small business site), Astro is worth knowing. It is free, it is fast because it defaults to static HTML, and the project structure is simple enough that you can hand an AI coding tool a folder of assets and a one line prompt and get a clean, responsive site back in minutes.

This is also the foundation for two things I will cover in later tutorials: pushing an Astro project to GitHub, and deploying it to Cloudflare Pages. Everything here happens locally first, so you can learn the framework before you worry about publishing it to the world.

## Before You Start

You need three things:

- **Node.js** installed on your computer, version 22.12 or later
- **An IDE or text editor** you can work in. I use VS Code, with its built in terminal
- **Your assets**: any images, text, or logos you want on the site, gathered somewhere handy

## Step 1: Confirm Node.js and npm Are Installed

Open Terminal on a Mac, or Command Prompt on Windows, and run:

```bash
node --version
npm --version
```

Both commands should print a version number. If `node --version` says command not found, go to `nodejs.org`, click **Download**, choose your operating system, and install it. Then reopen your terminal and check again. Your Node version needs to be 22.12 or later.

## Step 2: Create a Project Folder and Open It in VS Code

Create a new, empty folder anywhere on your computer and give it a name (I would put it in your home folder, though the desktop works fine too). Drag that folder onto the VS Code icon to open it, then open the built in terminal: go to **Terminal → New Terminal** from the top menu, or click the warning triangle at the bottom of the window and select **Terminal** from the panel that opens.

Your terminal should now be sitting inside your new, empty project folder.

## Step 3: Scaffold a New Astro Project

Open a browser and go to `astro.build`. Click to copy the install command to your clipboard, then paste it into your VS Code terminal and hit return. That command is:

```bash
npm create astro@latest
```

This launches a setup wizard:

1. **Where should we create your new project?** Type a name starting with a dot and a forward slash, for example `./my-astro-site`. The dot just means "start in this directory," it does not hide the folder.
2. **How would you like to start your new project?** Pick a starting template. I use the minimal template, which gives you an empty starting point, but Astro also offers fuller starter themes if you want more built in.
3. **Install dependencies?** Choose yes.
4. **Initialize a new git repository?** Choose yes. This tutorial stays local, so we are not pushing anywhere yet, but it is good practice to have git tracking your project from the start.

Astro scaffolds the project, installs its dependencies, and initializes git in one pass. It also creates a `package.json` file automatically, so your folder is a fully set up Node.js project when it finishes.

## Step 4: Start the Local Dev Server

The wizard finishes by telling you to `cd` into your new project folder using the name you gave it, then run the dev server:

```bash
cd my-astro-site
npm run dev
```

If you run `npm run dev` before changing into the project folder, you will get a scary looking error. That just means you skipped the `cd` step, so do it and try again.

Once the server starts, copy the local address it prints (Astro defaults to `http://localhost:4321`) and paste it into a browser. That page is your new Astro website, running locally on your machine.

## Step 5: Explore the Project Structure

Two folders matter most while you are getting started:

- **`public`**: where assets live, images, favicons, and anything else you want served as is
- **`src`**: where your Astro pages live. Every page ends in `.astro`

Open `src/index.astro` and you will find plain HTML with an `<h1>` tag. Change the text inside it, save the file, and refresh your browser. Whatever you typed now shows up on the homepage, confirming the connection between the file and the live page.

To add a second page, right click inside `src` and create a new file, for example `contact.astro`. Copy the contents of `index.astro` into it (including the top section, that part matters), then change the heading text. Save the file, then visit it in your browser by adding the filename to the end of your local address, for example `localhost:4321/contact`. You now have a two page site.

## Step 6: Rebuild a Real Site With AI

Once you understand the structure, an AI coding tool can move fast inside it. Drag a folder of real assets (images, logos, copy) into your project's `public` folder, then prompt your AI coding tool (I used Codex) with something like: rebuild this existing website as a clean, responsive, one page Astro site, using the assets in the public folder, and do not copy markup from the old platform.

In my case, that turned a folder of images and a single prompt into a full one page site, complete with a navigation menu, a services section, a bio section, a testimonial, and a footer with a call to action, in about five minutes.

## Step 7: Stop and Restart the Dev Server

When you are done for the session, go back to the VS Code terminal and press **Control** and **C** together to stop the local server. Refreshing the page in your browser afterward will show a "site cannot be reached" error, which is expected.

To pick up where you left off, run `npm run dev` again from inside your project folder. This is a command worth memorizing, you will run it constantly while building an Astro site.

## Troubleshooting

| Problem | Likely Cause | Fix |
| --- | --- | --- |
| `node --version` says command not found | Node.js is not installed | Install it from `nodejs.org`, then reopen your terminal |
| `npm run dev` throws a big error message | You have not `cd`'d into your project folder yet | Run `cd <your-project-folder-name>`, then try `npm run dev` again |
| The dev server URL will not load | The server was stopped, or never started | Run `npm run dev` from inside your project folder and copy the fresh local address |
| Editing a `.astro` file does not change the live page | The file was not saved | Save the file (Command+S on a Mac), then refresh the browser |

## Commands Reference

```bash
node --version
npm --version
npm create astro@latest
cd <your-project-folder-name>
npm run dev
```

To stop the dev server, press **Control** and **C** in the terminal.

## What This Unlocks Next

Right now, this site only exists on your own computer. The next steps are pushing the project to GitHub and deploying it to Cloudflare Pages so the rest of the world can see it, which I will cover in an upcoming tutorial (TODO: link once published).

If you are migrating an existing site onto Astro rather than starting fresh, my [WordPress to Astro migration tutorial](/tutorials/wordpresstoastro/) covers the domain cutover and SEO side of that move once your new site is ready to go live.

## Links

- [Astro documentation](https://docs.astro.build)
- [Astro.build](https://astro.build)
- [Node.js](https://nodejs.org)
- [How To Migrate WordPress to Astro Without Losing SEO](/tutorials/wordpresstoastro/)
