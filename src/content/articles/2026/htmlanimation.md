---
title: How To Create Branded HTML Animations With Claude Code
description: Describe an animation in plain English and Claude Code builds it as one self-contained HTML file that plays in any browser.
pubDate: 2026-10-01
draft: false
type: tutorial
slug: htmlanimation
permalink: /htmlanimation/
canonicalUrl: https://mikemurphy.ai/tutorials/htmlanimation/
contentEra: ai
visibility: public
author: Mike Murphy
featuredImage: /assets/media/2026/10/claude-code-html-animations.png
featuredImageSource: ""
categories:
  - Tutorials
  - Claude Code
  - AI Tools
tags:
  - claude code
  - html animation
  - vs code
  - design system
  - creative brief
topics:
  - claude-code
  - html-animation
  - video-with-code
  - vs-code
  - design-systems
youtube:
  - https://youtu.be/nuzHYv702-4
search:
  include: true
  boost: 1
---

You can make a short, branded animation without opening a video editor. Describe your idea to Claude Code, and it builds the whole thing as a single HTML file that plays in your browser. My first one took one prompt and about six minutes. It used my logo, colors, and fonts, and it even included a soundtrack.

## What You Will Build

- A short branded animation in one self-contained `.html` file
- Visuals, motion, and music all generated in code: no video files, no images, no audio files
- A file that opens in any browser with no installs, no server, and no external libraries
- A simple loop for making changes: prompt Claude, refresh the browser, watch again

## Why This Matters

There is a lot of AI video noise right now, with plenty of tools, methods, and frameworks to choose from. This approach is about as simple as it gets. An HTML animation is just HTML, CSS, and JavaScript, which is how most websites are built.

That has some real advantages:

- **It's tiny.** My file was about 1 MB, and that included the music.
- **It's fast.** Scrubbing the timeline has no lag, because nothing has to load or decode.
- **It's portable.** If you have a website, you can drop it right in.
- **It's on brand.** Point Claude at your design system, and the animation uses your actual colors, fonts, logos, and button styles.

You also don't need any brand assets. If you just want to animate an idea, Claude can build it from your description alone.

## Before You Start

You will need:

- **A code editor.** I use VS Code in this tutorial.
- **The Claude Code extension for VS Code.** This is how you chat with Claude. If you're brand new to Claude Code, start with [How To Install Claude Code On Mac](/tutorials/claudecodeinstall2026/).
- **A web browser.** Chrome, Safari, or anything else works.
- **Your idea.** Know roughly what you want the animation to say.
- **Optional: brand assets.** A logo, a design system, or anything else you want Claude to use.

## Step 1: Create a Project Folder and Open It in VS Code

Make a new empty folder anywhere on your computer. I right-clicked on my desktop, chose **New Folder**, and named it `animation-html`.

Drag that empty folder onto the VS Code window to open it as your project. When Claude finishes, the animation file will appear here.

## Step 2: Install and Open Claude Code

If you don't have the Claude Code extension yet:

1. Click the **Extensions** icon in the VS Code sidebar (the four squares).
2. Search for **Claude Code**. Make sure the publisher is Anthropic.
3. Click **Install**, then close the extension info tab.

Click the top icon in the sidebar to get back to the **Explorer**. That's where your project files show up.

To open the chat, click the **Claude logo** in the top right of the editor.

**If you don't see the Claude logo:** It only shows up when a file is open in the editor. With nothing open, click the **chat bubble icon** at the top instead. The chat panel lists Copilot, Claude Code, and Codex. Pick **Claude Code**.

## Step 3: Add Your Design System (Optional)

This step is only for animations that should match your brand. If that's you, give Claude your brand files.

Right-click an empty area of the **Explorer** panel, choose **Add Folder to Workspace**, select your design system folder, and click **Add**. Claude can now read your logos, colors, fonts, and styles alongside the project.

If you don't have a design system, you can skip this. A logo file in the project folder works too, or you can use no assets at all.

## Step 4: Write Your Creative Brief

The creative brief is the recipe Claude follows to build your animation. The more clearly you describe what you want, the closer the first version will be. Cover these four things:

| Element | The question it answers |
|---|---|
| **Subject** | What is the animation about? |
| **Message** | What should people remember after watching? |
| **Style** | How should it look and feel? |
| **Format** | Square, vertical, or horizontal? Include exact dimensions if you know them, like 1080 x 1080. |

Also tell Claude how to deliver it. You want one self-contained HTML file that opens in a browser, with no packages to install, no server, and no external libraries or frameworks.

Here's a starter brief you can adapt:

```text
Create a short, branded animation.

Deliver it as ONE self-contained HTML file that opens directly in a browser.
No packages to install, no server, no external libraries or frameworks.

Subject: [what the animation is about]
Message: [what viewers should remember]
Style: [look and feel, pacing, mood, music]
Format: [square / vertical / horizontal, e.g. 1080x1080]

Use my brand design system:
[paste the design system path here]
```

```
Create a short branded animation and save it as animation.html in this folder.

Make it one self-contained HTML file with embedded CSS and JavaScript. It should open directly in a browser without installing packages or running a server. Avoid external libraries, remote fonts, and network requests.

Creative direction:
- Square format, designed at 1080 × 1080 and scaled to fit the browser window.
- Approximately 20 seconds long.
- Handmade paper-cutout collage: torn edges, layered paper, subtle texture, and playful movement.
- Story: Mike Murphy, the AI Handyman, makes confusing AI topics easier through practical, step-by-step tutorials.
- Start with AI feeling overwhelming, introduce Mike, show the confusion becoming clear steps, and finish with his name and a short message.
- Use large, readable text and give each message time to land.
- Use the brand files I reference. If none are provided, use a simple cream, dark navy, and orange palette.

Include play/pause and replay controls outside the animation area. Keep paper textures stable so they do not flicker randomly during playback. Leave audio out of this first version.

Create the working file, then tell me which file to open and briefly describe the scenes.
```

To get the exact path, right-click your design system folder in the Explorer, choose **Copy Path**, and paste it under that line. That way Claude knows exactly which folder you mean.

## Step 5: Send the Brief and Let Claude Build

Paste the brief into the Claude Code prompt box and send it. (I used Claude Opus 5.5 on medium effort.)

Claude will work for a few minutes. My animation took about six. When it's done, you'll see a new `animation.html` file in the Explorer. Click it to see the HTML, CSS, and JavaScript Claude wrote. In the chat panel, Claude will also explain what it built.

## Step 6: Preview It in Your Browser

You can open the file in a few ways:

- Drag `animation.html` from VS Code straight onto a browser window
- Right-click the file and choose **Reveal in Finder**, then double-click it
- Open the project folder on your desktop and double-click the file

Press **Play** and watch it. Drag the timeline slider around. It responds instantly, because the whole animation is code.

## Step 7: Make Changes With a Prompt

The first version won't be perfect. In mine, the music felt a little dark and had a section that didn't sound right.

To fix something, go back to Claude Code and describe the change in plain English. Here's what I sent:

```text
The music feels a little dark. Something happens at the [timestamp] mark
that does not sound right. I want this animation to feel more positive
and happier.
```

Claude rewrote the score with major chords, a brighter pad, a bouncier bass line, and a more cheerful melody. When it finishes, go back to the browser and refresh (**Cmd + R** on Mac, **Ctrl + R** on Windows) to load the new version.

Repeat as many times as you like: prompt, refresh, watch.

## Step 8: Share Your Animation

Social platforms won't accept an HTML file as an upload, so you'll need to turn the animation into a video or GIF first. You have two options:

- **Ask Claude Code to export it** as an MP4, a GIF, or whatever format you need.
- **Screen record it.** Open the animation in your browser, press play, and record it with QuickTime, ScreenFlow, or any other screen recorder.

## Troubleshooting

| Problem | Fix |
|---|---|
| No Claude logo in VS Code | Open any file, or click the chat bubble icon at the top and choose Claude Code |
| Animation doesn't use your brand | Make sure the design system is added to the workspace and its path is in your brief |
| Browser shows the old version | Refresh the page after Claude finishes writing the new file |
| Claude tries to install packages or use a framework | Restate in the brief: one self-contained HTML file, no installs, no external libraries |
| Music or pacing feels off | Point Claude to the timestamp and describe the feeling you want |
| Can't upload the file to social media | Ask Claude to export to MP4 or GIF, or screen record the browser playback |

## What This Unlocks Next

Once you've got this workflow down, you can make branded intros, logo reveals, social clips, and website hero animations, all from a prompt. If you want a more structured way to make videos with code (templates, a preview studio, and rendering to MP4), check out [Remotion: How To Get Started Making Videos With Code](/tutorials/remotion/).

## Links

- [VS Code](https://code.visualstudio.com)
- [Claude Code](https://claude.com/claude-code)
- [How To Install Claude Code On Mac](/tutorials/claudecodeinstall2026/)
- [Remotion: How To Get Started Making Videos With Code](/tutorials/remotion/)
