---
title: "Remotion: How To Get Started Making Videos With Code (Beginner's Guide)"
description: Set up your first Remotion project, launch the preview studio, and animate a logo using a plain English prompt to Claude Code.
pubDate: 2026-07-28
draft: false
type: tutorial
slug: remotion
permalink: /remotion/
canonicalUrl: https://mikemurphy.ai/tutorials/remotion/
contentEra: ai
visibility: public
author: Mike Murphy
featuredImage: /assets/media/2026/07/remotion_getting_started.jpg
featuredImageSource: ""
categories:
  - Tutorials
  - Remotion
  - AI Tools
tags: []
topics:
  - remotion
  - claude-code
  - video-with-code
  - ai-agents
  - vs-code
  - nodejs
youtube:
  - https://youtu.be/PP9kekHoXRk
search:
  include: true
  boost: 1
---

Most video editing means dragging clips on a timeline and nudging keyframes until something looks right. Remotion takes a different path: you describe the video, code builds it, and you preview the result live in your browser. Pair it with an AI agent like Claude Code and you never have to write the animation code yourself. You just say what you want.

This walkthrough takes you from a completely empty folder to a rendered, animated logo.

## What You Will Build

- A working Remotion project scaffolded from a single command
- Remotion Studio running locally in your browser as a live preview editor
- A logo animation built entirely from a plain English prompt to Claude Code
- A rendered MP4 or animated GIF sitting in your project's `out` folder

## Why This Matters

Remotion lets you make real videos programmatically. That sounds intimidating if you are not a developer, but here is what it means in practice: your video is a code file, so it is repeatable, editable, and version-controlled. Change a hex color, save, and the preview updates instantly. No re-rendering a timeline, no hunting for the right layer.

The part that makes this genuinely accessible is the AI agent. Remotion ships with agent skills for Claude Code, Codex, Cursor, Gemini, and others, so the agent already knows Remotion's conventions and best practices before you ask it anything. You describe the animation you want, the agent writes the composition, and you preview it. That is the whole loop.

If you make tutorial intros, logo stings, social clips, or anything you rebuild over and over, this workflow gets fast in a hurry.

## Before You Start

- **Node.js** installed on your computer (this is what gives you the `npm` and `npx` commands)
- **VS Code** installed
- **Claude Code** installed and working. If you are not set up yet, start with [How To Install Claude Code On Mac](/tutorials/claudecodeinstall2026/) and come back
- A logo or graphic ready to animate: PNG or SVG

To confirm Node is installed, open your terminal and run:

```bash
node -v
```

If you get a version number back, you are set. If you get `command not found`, head to nodejs.org, click **Get Node.js**, and install the version for your operating system.

## Step 1: Create a Project Folder and Open It in VS Code

Remotion is a codebase, so it needs somewhere to live. Make a new empty folder wherever you keep your coding projects (desktop is fine for a first run) and name it something like `my-remotion-project`.

Drag that folder straight onto the VS Code icon, or drop it into an open VS Code window. It will show up empty in the file explorer, which is exactly right. If you would rather do it from the terminal, `cd` into the folder and type `code .` ([here is how to set that up](/tutorials/codedot/)).

Now open the built-in terminal with **Terminal → New Terminal**. Confirm the terminal is pointed at your project folder before you run anything. VS Code opens it there automatically when you load the folder.

## Step 2: Scaffold the Project

Go to [remotion.dev](https://remotion.dev) and copy the create command off the homepage, or just type it in:

```bash
npx create-video@latest
```

This kicks off a short setup wizard. It does not ask you to name the project. It builds directly into the folder you are already in.

Working through the wizard:

- Use the **arrow keys** to move through the template list, **spacebar** to select
- Choose **Blank**. It gives you a clean starting point with no demo animation to delete, and Remotion specifically recommends it when you plan to write your code with AI
- Say yes to **Tailwind CSS**
- When it asks about **agent skills**, keep the default (Remotion best practices) selected. This is what teaches Claude Code how to work in your project
- Accept the installation scope and symlink method, then let it build

## Step 3: Install the Dependencies

This is the step almost everyone skips, including me the first time.

```bash
npm i
```

The `i` is short for install. The wizard scaffolded your project files, but the actual packages Remotion needs are not on your machine yet. This command reads your `package.json` and pulls them all down.

Skip it and the next command fails with an error that does not obviously point back to this. Run it now and save yourself the detour.

While it installs, take thirty seconds to look at what Remotion built. You only need to know three things:

| Folder or file | What it does |
|---|---|
| `src` | Where the animation code lives. This is where Claude Code works |
| `public` | Where you drop images and logos you want to animate |
| `package.json` | Stores the project's dependencies. Leave it alone for now |

No rabbit holes. That is enough to get moving.

## Step 4: Launch Remotion Studio

```bash
npm run dev
```

This is the command worth committing to memory. It starts a local server in your terminal and opens **Remotion Studio** in your browser at `localhost:3000`. That browser tab is your editor.

The mental model here is the one piece that trips people up on their first try, so it is worth pausing on:

- The **terminal** runs a small local server on your machine
- The **browser** is where you actually work
- Closing the browser tab does not shut anything down. The server is still running. Just reopen `localhost:3000` to get the Studio back
- To fully stop it, go back to that terminal and press **Ctrl + C**

Since we picked Blank, there is not much on screen yet. What matters is that it opened. Everything is wired up.

## Step 5: Drop In Your Logo

Grab your logo file and drag it into the **`public`** folder in VS Code.

If you are more comfortable working in Finder or File Explorer, that works too. What you see in VS Code is the same folder structure sitting on your computer, so dropping the file into `public` either way lands in the same place.

Remotion can now find it.

## Step 6: Animate It With Claude Code

Do not close the terminal running Remotion Studio. That would kill your local server. Instead, open a second terminal by clicking the **+** icon in the terminal panel. You will now have two: one running the dev server (labeled `node`) and one free to use.

In the new terminal, launch Claude Code:

```bash
claude
```

Then just describe what you want in plain English. Keep the first one simple:

> Animate my logo from the public folder in Remotion. Make it wave and bounce like it is saying hello.

Claude Code loads the Remotion best practices skill automatically, so it already knows the project conventions. It will create a new `.tsx` file in `src`, ask permission before writing it, and when it finishes it explains what it built: the pop-in, the bounce, the wave, the secondary motion.

Switch to your browser tab, select the new composition from the list on the left, and hit play. That is your animation.

## Step 7: Iterate Without Touching the Code

To change something, do not edit the code yourself. Go back to the Claude Code terminal and describe the change:

> Change the background to a cream color, hex FDF6EC.

Flip back to the browser and the update is already there. No refresh, no re-render. That back-and-forth between prompt and preview is the entire workflow.

This works from the code side too. If you open the composition file in VS Code, change a hex value, and save with Cmd+S, the Studio updates instantly. Same live connection either direction.

## Step 8: Render Your Video

You can render straight from the Studio, no terminal required.

Click the **Render** button at the bottom of the Studio. In the inspector you can adjust dimensions before exporting if you need a different aspect ratio. Choose your format (MP4 for video, GIF for a looping animation) and let it run.

Your finished file lands in the **`out`** folder inside your project. That is true whether you render from the Studio or Claude Code renders one for you automatically. Open the project folder on your desktop and you will find the exact same `out` folder with your files in it.

## Step 9: Shut Down and Restart

When you are done for the day, go to the terminal running the dev server and press **Ctrl + C**. The browser tab will say the studio server has disconnected, which is what you want to see.

To pick back up later, run `npm run dev` from the same project folder and you are back in business.

## Troubleshooting

| Problem | Fix |
|---|---|
| `node: command not found` | Node.js is not installed. Get it at nodejs.org |
| `npm run dev` errors right after scaffolding | You skipped `npm i`. Run it, then try again |
| Terminal looks busy but nothing happened | Check your browser. Remotion Studio opens in a tab at `localhost:3000` |
| Closed the browser tab and lost the Studio | The server is still running. Just navigate to `localhost:3000` again |
| Studio says "server has disconnected" | The local server stopped. Run `npm run dev` in the terminal |
| Running Claude Code killed Remotion Studio | You used the same terminal. Open a second one with the **+** icon and run `claude` there |
| Ran `npm run dev` inside the Claude Code prompt | That command belongs in the terminal, not in Claude's input box |

## Commands Reference

```bash
# Confirm Node is installed
node -v

# Scaffold a new Remotion project (run from your empty folder)
npx create-video@latest

# Skip the template picker and go straight to Blank
npx create-video@latest --blank

# Install the dependencies (do not skip this)
npm i

# Launch Remotion Studio
npm run dev

# Launch Claude Code inside the project
claude
```

To stop the local server, press **Ctrl + C** in the terminal running it.

## What This Unlocks Next

Once the basic loop clicks, the interesting work starts:

- **Try the other templates.** Blank is one of several starters listed at remotion.dev/templates. Each has a flag you can add to the create command to skip the picker
- **Feed better prompts.** Remotion publishes a page of AI-ready prompts at remotion.dev/prompts, built specifically for coding agents
- **Build reusable intros.** Because your video is code, you can duplicate a composition, swap the logo and text, and render a new variant in seconds
- **Explore the agent skills.** The project ships with skills for Claude, Cline, Codex, Cursor, and Gemini, so the same workflow carries over to whichever agent you prefer

## Links

- [Remotion](https://remotion.dev) - the official site
- [Remotion Docs](https://remotion.dev/docs) - full documentation
- [Remotion Prompts](https://remotion.dev/prompts) - ready-made prompts for AI coding tools
- [Remotion Templates](https://remotion.dev/templates) - the full starter catalog
- [Node.js](https://nodejs.org) - required to run any of this


## Related Tutorials

- [How To Install Claude Code On Mac (Native Installer 2026)](/tutorials/claudecodeinstall2026/) - get the agent side of this workflow set up first
- [How To Open VS Code From Terminal with Code Dot](/tutorials/codedot/) - a faster way to open your project folder than dragging it onto the icon
- [How To Install Claude Code Extension in VS Code](/tutorials/claudecodeextension/) - run Claude Code inside the editor instead of a second terminal tab
- [How to Create a CLAUDE.md File in Claude Code](/tutorials/claudemd/) - give Claude standing instructions for your Remotion project so you stop repeating yourself
- [Git & GitHub for Beginners: Turn Any Project Into a Repo Using VS Code](/tutorials/git/) - version-control your compositions, which is half the point of video-as-code
