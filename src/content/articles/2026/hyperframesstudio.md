---
title: "HyperFrames Studio: How To Make a Branded Promo Video With AI Agents"
description: Install HyperFrames Studio, build an on-brand promo video from your website URL with Claude Code or Codex, and set up your own project folders.
pubDate: 2026-10-15
draft: false
type: tutorial
slug: hyperframesstudio
permalink: /hyperframesstudio/
canonicalUrl: https://mikemurphy.ai/tutorials/hyperframesstudio/
contentEra: ai
visibility: public
author: Mike Murphy
featuredImage: /assets/media/2026/10/Hyperframes-Studio.png
featuredImageSource: ""
categories:
  - Tutorials
  - HyperFrames
  - AI Tools
tags: []
topics:
  - hyperframes
  - hyperframes-studio
  - heygen
  - claude-code
  - codex
  - video-with-code
  - ai-agents
  - promo-video
youtube:
  - https://youtu.be/c7y09NIzxbE
search:
  include: true
  boost: 1
---
Want a short promo video for your newsletter, podcast, or website without opening a traditional video editor? HyperFrames Studio lets an AI agent like Claude Code or Codex build the video for you, styled to match your own site.

In this tutorial, you'll install HyperFrames Studio, build a promo video from your website URL, edit it, add music, and export it. Then I'll show you where your projects live on your computer and how to turn any folder into a HyperFrames project. That second part confuses a lot of people at first.

## What is HyperFrames Studio?

HyperFrames is an open source video framework from HeyGen. It's similar to [Remotion](/tutorials/remotion/): you make videos with code and AI agents. Remotion uses React components, while HyperFrames builds videos from HTML.

HyperFrames Studio is the free desktop app for it. It gives you a preview, a timeline, and a chat box, and your AI agent does the building.

## What you need

- A Mac, Windows, or Linux computer
- A free [HeyGen](https://www.heygen.com) account
- Claude Code or Codex installed and signed in
- Your website, newsletter, or product URL

HyperFrames Studio is free. You only pay HeyGen if you add an API key for premium services. Your agent's work counts against your Claude or ChatGPT plan.

## 1. Install HyperFrames Studio

1. Go to [hyperframes.dev/studio](https://hyperframes.dev/studio).
2. Click **Download**. The page detects your operating system.
3. Open the download and follow the installer.
4. Click **Open HyperFrames** when it finishes.

## 2. Install the HyperFrames skills

The skills are instructions that teach your AI agent how to use HyperFrames. Copy the install command from the Studio page, or run it in Terminal:

```bash
npx skills add heygen-com/hyperframes
```

1. Use the arrow keys to highlight **Core Skills**, then press the space bar to select them.
2. Press **Return**.
3. The installer lists the AI agents it found, such as Claude Code, Codex, and Cursor. Press **Return** to accept the list.
4. Confirm **Proceed with installation**.

To check the install, start Claude Code with `claude`, type `/hyperframes`, and look for the HyperFrames skills in the list.

## 3. Sign in to the app

1. Open **HyperFrames** from your Applications folder.
2. Skip or answer the short survey. Every question is optional.
3. Click **Continue with HeyGen** and sign in with your HeyGen account.
4. Click **Authorize access**, then **Open HyperFrames**.

The little green triangle floating around the screen is Framey, the app's AI helper. To hide it or change its color, open **Settings** (the gear icon in the bottom left corner). The **Permissions** section is also where you pick your Claude Code, Codex, or Grok account.

## 4. Build a promo video from a template

1. On the home screen, click **Make my launch video**. If you don't see it, look under **Get inspired** for the step-by-step option.
2. Pick a style for each of the four parts:
   - **Hook:** grab attention in the first seconds
   - **Proof:** show the product doing its job
   - **Turn:** flip from the problem to the answer
   - **Call to action:** tell viewers what to do next
3. Click **Browse** to see all 44 templates, or click the dice icon to roll a random one.
4. Type your website URL. Studio pulls your fonts, colors, and logo from the page.
5. Click the play icon to preview the animation, then click **Use this cut**.

Studio creates a new project and opens the editor. Your agent starts building, and the hook, proof, and turn layers fill in on the timeline. Assets appear in the inspector panel on the right.

Be patient here. My build with Claude Code and Opus 5.5 took about 15 minutes. Earlier test runs took about 7.

## 5. Edit the video

Press the space bar to play the video. If you want a change, you have a few options:

- **Draw:** click the pencil icon, circle a spot, and say "make this bigger."
- **Comment:** pin a comment to a section of the video.
- **Select:** click an individual element to edit it.
- **Prompt:** type a request in the chat box. Type `@` to open the template library.

## 6. Add a music bed

Type a prompt like this in the chat:

```text
Add a soft acoustic or felt piano bed. Happy and positive vibes. Add a gentle tick when each track number lands. No vocals or voiceover. Use free music from the library.
```

If Studio asks whether you want to buy music from HeyGen, choose the free option. The music and click tracks appear on the timeline and in the inspector panel. To drop a track, mute it or select it and delete it.

## 7. Export the video

1. Click **Export** in the top right corner.
2. Choose **1080p** or **4K**, plus a frame rate.
3. Click **Render**.
4. When it finishes, click **Open video** or **Show in Finder**.

For a vertical version, open the sidebar, click the menu next to your project, and choose **Duplicate**. Rename the copy, then ask your agent for a 9:16 version.

## Where your projects live

New projects go into a hidden `.hyperframes-studio` folder in your home folder. On a Mac, folders that start with a dot are hidden, so this one is easy to miss.

To find a project, hover over it in the sidebar, click the three dots, and choose **Reveal in Finder**.

When you first open Studio, it also scans your drive for existing HyperFrames projects. Click **Import projects** to bring them in.

## Use your own project folder

Want to keep your videos in a folder you choose, like `Hyperframes Videos`? If you drag an empty folder into Studio, you'll get a warning that it isn't a HyperFrames project.

A HyperFrames project folder needs an `index.html` file and at least one of these:

- `hyperframes.json`
- `project.json`
- `meta.json`

The easiest way to set that up is to initialize the folder:

1. Right-click your folder in Finder and choose **Services** > **New Terminal at Folder**.
2. Run this command:

```bash
npx hyperframes init
```

3. Type **Y** to proceed, give the project a name, and choose a template. **Blank** is a good start.
4. The HyperFrames editor opens in your browser. Click **Edit with Framey** in the top right corner to switch back to the Studio app.

Your new project now shows up in Studio, and the folder contains `index.html` and `hyperframes.json`. Select the project and tell your agent what video to build. It'll work inside that folder.
