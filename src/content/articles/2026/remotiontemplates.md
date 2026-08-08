---
title: "Remotion: How To Open & Use Templates"
description: Browse Remotion's full template catalog, install any template with one command, and run multiple templates side by side in the same project.
pubDate: 2026-08-05
draft: true
type: tutorial
slug: remotiontemplates
permalink: /remotiontemplates/
canonicalUrl: https://mikemurphy.ai/tutorials/remotiontemplates/
contentEra: ai
visibility: public
author: Mike Murphy
featuredImage: ""
featuredImageSource: /assets/media/2026/07/remotion-templates.png
categories:
  - Tutorials
  - Remotion
  - AI Tools
tags: []
topics:
  - remotion
  - claude-code
  - video-with-code
  - templates
  - vs-code
  - nodejs
youtube: []
search:
  include: true
  boost: 1
---
## Description

Remotion does not just give you one starting point. It gives you a whole catalog of them, and every single one is one command away. Instead of building from a blank canvas, you can install a template that already has animation, layout, and structure built in, then customize it from there.

## What You Will Build

- A single project folder set up to hold multiple Remotion templates at once
- The Hello World template, installed and previewed in Remotion Studio
- A swapped-in logo, applied to Hello World with a plain English prompt to Claude Code
- The Audiogram template, installed alongside Hello World and customized entirely in the inspector panel
- A rendered video exported from Remotion Studio

## Why This Matters

Every template on [remotion.dev/templates](https://remotion.dev/templates) uses the exact same install command, just with a different flag on the end. Once you know the pattern, you are never guessing at setup steps again. You just pick a template, copy one line, and paste it into your terminal.

This also means you are not locked into one template per project. You can install Hello World, try it out, then install a completely different template like Audiogram or 3D into that same folder. Remotion adds each one as a separate composition, so they live side by side and you can flip between them in Remotion Studio like browser tabs.

If you went through the [beginner Remotion tutorial](/tutorials/remotion/), you used the Blank template on purpose, a clean canvas for building with AI. This tutorial does the opposite: grabbing templates that already animate, so you can see what Remotion can actually do out of the box.

## Before You Start

- **Node.js** installed on your computer (this is what gives you the `npm` and `npx` commands)
- **VS Code** installed
- An AI agent like **Claude Code** or Codex, for the steps where you swap in your own assets
- Set up your first Remotion project already. If you have not, start with [How To Get Started Making Videos With Code](/tutorials/remotion/) and come back

To confirm Node is installed, open your terminal and run:

```bash
node -v
```

If you get a version number back, you are set. If you get `command not found`, head to nodejs.org, click **Get Node.js**, and install it.

## Step 1: Create a Project Folder and Open It in VS Code

Just like last time, start from a brand new, empty folder rather than reusing an old project. Name it something like `remotion-templates`. This is the one folder you will launch every template into today.

Drag it onto the VS Code icon, or drop it into an open VS Code window, then open the built-in terminal with **Terminal → New Terminal**. VS Code points the terminal at this folder automatically.

## Step 2: Initialize the Folder with npm

This is a step a lot of developer READMEs skip because they assume you already know it. Before Remotion can install anything, this needs to be a real npm project:

```bash
npm init -y
```

This creates a `package.json` file, which is what tells npm this folder is a project it can work with. The `-y` auto-accepts the defaults so it does not ask you a string of questions. You only have to do this once per folder, even if you plan to add several templates to it later.

## Step 3: Learn the Install Pattern

Head to [remotion.dev](https://remotion.dev) and you will see the main install command front and center:

```bash
npx create-video@latest
```

Running that on its own kicks off a setup wizard that walks you through picking a template from a list. But there is a shortcut: add `--` and the template's name to the end of that same command, and it skips the wizard entirely and builds that exact template straight into your folder.

Every template on the templates page follows this same pattern, just with a different name after the dashes. Multi-word template names use a dash between each word, for example `--hello-world`.

## Step 4: Install and Preview Hello World

Go to [remotion.dev/templates](https://remotion.dev/templates) and click **Hello World**, a simple animated playground template. Its page hands you the full, ready-to-copy install command:

```bash
npx create-video@latest --hello-world
```

Paste that into your terminal and hit Enter. The wizard will ask a few quick questions:

- Name the project directory (`hello-world` is fine)
- Add Tailwind CSS: yes
- Add agent skills: yes, and keep **Remotion Best Practices** selected
- Choose your AI agent (Claude Code, in this case)

When it finishes, it gives you three commands to run. `cd` into the new folder, install dependencies, then launch the Studio:

```bash
cd hello-world
npm i
npm run dev
```

`npm run dev` is the command worth committing to memory. It opens Remotion Studio in your browser, and this time, since Hello World actually has animation built in, hit the play button and watch it move. Click between compositions in the left sidebar (Hello World and Only Logo) to preview each one.

## Step 5: Swap In Your Own Logo with Claude Code

Drag your own logo file into the **`public`** folder in VS Code, right alongside the default assets.

The terminal running `npm run dev` is busy serving the Studio, so open a second terminal (click the **+** icon in the terminal panel) and launch your AI agent there:

```bash
claude
```

Then describe what you want in plain English:

> Please swap out the default Hello World logo and use my logo in the public folder.

Claude Code picks up the Remotion Best Practices skill automatically, makes the swap, and tells you what it changed. Flip back to your browser tab and the update is already there.

## Step 6: Stop the Studio and Go Back to the Project Root

Before installing a second template, stop Remotion Studio. Click into the terminal tab running it (labeled `node`) and press **Ctrl + C**.

You are currently inside the `hello-world` folder, but the next template needs to be installed from the project root. Step back out with:

```bash
cd ..
```

## Step 7: Install a Second Template Alongside the First

Go back to [remotion.dev/templates](https://remotion.dev/templates) and pick a different one. This time, try **Audiogram**, a text and waveform visualization template built for podcasts. Copy its install command from the template's page:

```bash
npx create-video@latest --audiogram
```

Paste it into your terminal from the project root and run it. This does not touch or overwrite Hello World. Remotion adds Audiogram as a completely separate project folder sitting next to it. Walk through the same wizard questions as before (Tailwind, agent skills, AI agent), name the directory `audiogram`, then install and launch it:

```bash
cd audiogram
npm i
npm run dev
```

## Step 8: Customize Audiogram in the Inspector

Not every template needs an AI agent to customize. Audiogram exposes its assets and settings directly in the Studio's inspector panel on the right:

- **Cover image, captions, and audio file**: click each field and select your own files (drop them into the `public` folder first, same as before)
- **Colors**: change the visualizer, title, and caption colors, and watch the canvas update live
- **Title text**: edit it directly in the inspector

If a setting is missing, that is a sign the template hardcoded it. For example, Audiogram's background color was not exposed by default, so I opened a second terminal, launched Claude Code, and asked it to add a background color swatch to the inspector. Claude Code made the change in the `src` folder, and a new color control appeared in the panel a few seconds later. That same move, asking your AI agent to expose a setting the template author hardcoded, works on any template.

## Step 9: Render Your Video

From Remotion Studio, click **Render** in the bottom right. Choose your codec and settings, then let it run.

Your finished file lands in a folder called `out` inside that template's project folder (for example, `audiogram/out`). That is the same whether you render from the Studio or have your AI agent trigger a render for you.

## Troubleshooting

| Problem | Fix |
|---|---|
| `npm run dev` fails right after installing a template | You skipped `npm i` in that template's folder. Run it, then try again |
| Claude Code will not launch in the terminal running the Studio | That terminal is busy serving Remotion Studio. Open a second terminal with the **+** icon and run `claude` there |
| New template command fails or acts on the wrong project | Confirm you `cd ..` back to the project root before running a new `npx create-video@latest --<template>` command |
| Studio does not reflect your new logo or assets | Confirm the file landed in that template's `public` folder, not the project root |
| A setting you want is missing from the inspector | The template likely hardcoded it. Ask your AI agent to expose it as a color, text, or file field |

## Commands Reference

```bash
# One-time setup for the project folder
npm init -y

# Install any template by name (find names at remotion.dev/templates)
npx create-video@latest --hello-world
npx create-video@latest --audiogram
npx create-video@latest --three

# Inside a template's folder: install dependencies and preview
npm i
npm run dev

# Launch your AI agent inside a template folder
claude
```

## What This Unlocks Next

- **Browse the full catalog.** Hello World and Audiogram are two of many templates at remotion.dev/templates, including 3D, Next.js SaaS starters, and music visualizers
- **Mix and match templates in one folder.** Any project can hold as many templates as you want, each as its own subfolder, previewed independently
- **Use AI agents to unlock hardcoded settings.** If a template's inspector is missing a control you want, that is a prompt away, not a rebuild
- **Combine this with the beginner workflow.** Once you find a template close to what you need, use the same Claude Code prompting loop from the [beginner tutorial](/tutorials/remotion/) to customize it further

## Links

- [Remotion](https://remotion.dev) - the official site
- [Remotion Templates](https://remotion.dev/templates) - the full starter catalog
- [Remotion Docs](https://remotion.dev/docs) - full documentation
- [Node.js](https://nodejs.org) - required to run any of this

## Related Tutorials

- [Remotion: How To Get Started Making Videos With Code (Beginner's Guide)](/tutorials/remotion/) - set up your first Remotion project and animate a logo with Claude Code
- [How To Install Claude Code On Mac (Native Installer 2026)](/tutorials/claudecodeinstall2026/) - get the agent side of this workflow set up first
- [How To Install Claude Code Extension in VS Code](/tutorials/claudecodeextension/) - run Claude Code inside the editor instead of a second terminal tab
