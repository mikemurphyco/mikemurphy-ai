---
title: "Remotion + Claude Code: How To Make a Branded Video From Script to Render"
description: Build a branded stop-motion YouTube channel trailer with Remotion and Claude Code, from the creative brief and voiceover to the final MP4.
pubDate: 2026-10-28
draft: false
type: tutorial
slug: remotiontrailer
permalink: /remotiontrailer/
canonicalUrl: https://mikemurphy.ai/tutorials/remotiontrailer/
contentEra: ai
visibility: public
author: Mike Murphy
featuredImage: /assets/media/2026/10/trailer-remotion-claude-code.png
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
  - remotion-studio
  - youtube-trailer
  - stop-motion
  - vs-code
  - nodejs
youtube:
  - https://youtu.be/WvnRHbB_G3Y
search:
  include: true
  boost: 1.0
---
I made my new YouTube channel trailer with Remotion and Claude Code. It's a papercut, stop-motion video where every scrap of paper and sound effect lands on a word I say.

You can't follow a creative video click by click, so this post covers the workflow behind it. Most of the work happens before you open your code editor.

## What Remotion does

Remotion is a React framework that makes videos with code. Each frame is a web page, so anything a browser can show, your video can show.

You don't need to write the code yourself. An AI coding agent like Claude Code or Codex writes and edits it, and you direct.

## What you need

- [Node.js](https://nodejs.org) installed. Run `node --version` in Terminal. If it prints a version number, you're good to go.
- [Claude Code](https://claude.com/claude-code) or another AI coding agent
- VS Code or another code editor
- Your brand: colors, fonts, and logo files
- A microphone for the voiceover

New to Remotion? Start with [Remotion: How To Get Started Making Videos With Code](/tutorials/remotion/).

## 1. Write the creative brief

Write down what you want before you make anything. The brief guides every prompt that follows.

- **Goal:** what the video is for. Mine is a YouTube channel trailer.
- **Style:** the look. Mine is papercut, hand-drawn, and stop-motion.
- **Brand:** your design system colors and fonts.
- **Length:** about 60 seconds plus an outro.

When you give Claude style references, say "style only." Otherwise it may copy details you don't want.

## 2. Prepare your branded assets

I asked Claude Design to turn graphics from my design system into the papercut style: logos, props, torn paper strips, and a cutout of my photo.

Ask for transparent PNGs, one consistent texture, and separate pieces you can move. Keep the kit in a shared folder so every future video can use it.

## 3. Write the script and record the voiceover

Write your own rough draft first, then let Claude tighten it. Keep the lines that sound like you.

Speech runs about 150 words per minute, so a 60-second trailer is about 150 words. Record the voiceover before you build anything. Every animation is timed to it.

## 4. Build a storyboard and shot list

This is where the heavy lifting happens. I put everything in one document:

- The creative brief
- The voiceover script
- A storyboard and shot list with every scene, its timing, and what appears on screen
- Where the voiceover and audio files live

Because all the planning was done up front, the build step only took one prompt.

## 5. Set up the Remotion project

I keep every video in a folder called `mike-video-factory`, organized by framework: Remotion, HyperFrames, and plain HTML. Each video gets its own folder.

Open your new video folder in VS Code, then open the terminal and run:

```bash
npx create-video@latest
```

Choose the **Blank** template. When it asks to install the Remotion skills, choose **Install all skills**. The skills teach Claude Code Remotion's best practices.

Then add your files to the `public/` folder: the voiceover, thumbnails, footage clips, and design assets.

## 6. Have Claude Code build the video

Open a second terminal in VS Code with the **+** icon and start Claude Code:

```bash
claude
```

Point Claude at your planning document:

```text
Build the trailer video using the instructions in [your document].
```

Mine took about five to ten minutes.

## 7. Preview and edit in Remotion Studio

Switch back to the first terminal and start Remotion Studio:

```bash
npm run dev
```

Studio opens in your browser at `localhost:3000`. Scrub the timeline and play the video with sound.

To change something, tell Claude what you want, like a director: rotate this, slow this down, lower the music. You can also edit the scene files in `src/scenes/` yourself. Save the file, and Studio updates in real time.

To stop Studio, press **Control + C** in its terminal.

## 8. Render the final video

In Remotion Studio, click **Render** in the bottom right of the inspector panel. Choose **H.264**, name the output file, and click **Render video**.

The finished MP4 lands in the `out/` folder of your project. Right-click it in VS Code and choose **Reveal in Finder** to open it. Bingo, you have a branded video you can edit any time.

## Related tutorials

- [Remotion: How To Get Started Making Videos With Code](/tutorials/remotion/)
- [HyperFrames Studio: How To Make a Branded Promo Video With AI Agents](/tutorials/hyperframesstudio/)
