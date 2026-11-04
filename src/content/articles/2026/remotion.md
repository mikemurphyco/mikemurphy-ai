---
title: "Remotion: How To Get Started Making Videos With Code"
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
# What You Will Learn

In this tutorial, you will use Remotion and Claude Code to create a logo animation.

- Set up a local Remotion project.
- Add a logo and animate it with Claude Code.
- Preview and refine the animation.
- Export an MP4 video or animated GIF.

# What is Remotion

[Remotion](https://www.remotion.dev/) is a framework that uses React components to make videos programmatically—with code. Components are reusable building blocks for elements such as text, images, and animation.

You’ll use two interfaces:

- **VS Code:** Manage files and code, run terminal commands, and send prompts to Claude Code.
- **Remotion Studio:** The browser-based video editor where you preview and render your animation.

# What You Need

- [Node.js](https://nodejs.org/) installed on your computer.
- [Visual Studio Code](https://code.visualstudio.com/) installed.
- [Claude Code](https://code.claude.com/docs/en/setup) installed and signed in.
- A logo or image to animate.

To check whether Node.js is installed, open a terminal and run:

```bash
node -v
```

A version number means Node.js is available. If the command isn’t found, install Node.js before continuing.

# Step-by-Step

## Step 1: Create a Remotion Project

One Remotion project can hold multiple videos.

**Create the project folder:**

- Create an empty folder named `my-remotion-project` in your Documents folder.
- In VS Code, choose **File → Open Folder** and open `Documents/my-remotion-project`.
- Choose **Terminal → New Terminal**.

Run this project-creation command once, with the terminal inside `my-remotion-project`. The `.` means “create the project in this folder”:

```bash
npx create-video@latest .
```

The video runs the wizard without the final dot; adding it here makes the destination explicit. Follow the setup prompts. The choices shown in the video are:

- **Template:** Blank.
- **Tailwind CSS:** Yes.
- **Agent skills:** Yes, with the Remotion best-practices skill available to Claude Code.
- **Skill scope:** Project.
- **Installation method:** Symlink.

Setup options can change between releases. Use [Remotion’s setup guide](https://www.remotion.dev/docs) if your prompts differ.

When setup finishes:

- Check that `package.json`, `src`, and `public` are inside `my-remotion-project`.
- Keep this folder open in VS Code. Run the remaining commands from here, not from Documents.

## Step 2: Install the Project Dependencies

**Dependencies** are the software packages this project needs to run.

If setup already installed the dependencies, continue to Step 3. Otherwise, run this command inside `my-remotion-project`, the folder containing `package.json`:

```bash
npm i
```

The `i` is short for `install`. This installs the packages listed in `package.json`. Wait for it to finish before starting the preview.

**Project files and folders:**

- `src`: The code that defines your animations.
- `public`: Assets such as logos and images.
- `package.json`: The project’s dependencies and commands.

## Step 3: Start Remotion Studio

From the same `my-remotion-project` folder, run this command to launch Remotion Studio, the browser-based video editor:

```bash
npm run dev
```

- If Studio does not open automatically, open the local URL shown in the terminal.
- The address will typically look like `http://localhost:3000`, but the port can differ. **Localhost** means the preview is running on your computer.

[Remotion Studio](https://www.remotion.dev/docs/studio) displays your project’s compositions. A **composition** is a video with its own dimensions, duration, and frame rate.

**Keep this terminal running.** It keeps the preview server active while you work.

## Step 4: Add Your Logo

**Assets** are files your video uses, such as logos, images, fonts, or audio. You can add your logo in either of these ways:

- **Manually:** Copy your logo into the project’s `public` folder using VS Code or your computer’s file manager.
- **With Claude Code:** In Step 5, provide a path or link to a design system it can read. Ask it to follow your brand guidelines and copy the logo into this project’s `public` folder.

Files in `public` are available to the browser preview and render. A logo elsewhere on your computer is not automatically included. See [Remotion’s asset guide](https://www.remotion.dev/docs/assets).

**Example filename:** `logo.png`.

Use your image’s actual filename in the prompt in Step 5.

## Step 5: Create the Animation with Claude Code

Prepare a terminal for Claude Code:

- Open a **second terminal** in VS Code.
- Confirm that it is in the same project folder.
- Keep the first terminal running Remotion Studio.

Start Claude Code in the second terminal:

```bash
claude
```

A **prompt** is a plain-language description of what you want to create. Tell Claude which asset to use and how it should move. For example:

```text
Use the Remotion best-practices skill to animate public/logo.png.
Make it wave and bounce like it is saying hello.
Add the animation as a composition I can preview in Remotion Studio.
```

- Replace `logo.png` with your image’s filename before sending the prompt.
- Review any requested file changes or command permissions before approving them.

Claude writes the animation code into your project. When it finishes:

- Return to Remotion Studio.
- Select the new composition.
## Step 6: Preview and Refine the Animation

In Remotion Studio:

- Play the composition.
    
- Check the movement, timing, and background.
    

Return to Claude Code in VS Code and describe the change you want. For example:

```text
Change the background to a light cream color.
Keep the animation and timing the same.
```

If you need an exact brand color, include its hex value in the prompt.

- After Claude saves the changes, switch back to Remotion Studio in your browser and preview the result.
- You can also edit the code directly in VS Code. Saved changes appear in the Studio preview.

## Step 7: Export the Animation

**Rendering** turns your composition into a video or animated image file.

In Remotion Studio:

- Select your composition.
- Click **Render**.

Choose the output settings:

- **Format:** MP4 for a video file or GIF for an animated image.
- **Filename and destination:** Check where the file will be saved.
- Start the render.
- When it finishes, open the exported file and check that the animation plays as expected.

## Step 8: Stop and Restart Remotion Studio

Closing the browser tab does not stop the preview server.

### Stop the Preview Server

- Return to the terminal running Remotion Studio.
- Press **Ctrl+C**.

### Restart the Preview Server

- Open the project folder in VS Code.
- Open a terminal in that folder.

Run:

```bash
npm run dev
```

- Open the local URL shown in the terminal.

# Links

- [Remotion](https://www.remotion.dev/): The official site.
- [Remotion Docs](https://www.remotion.dev/docs): Setup instructions and documentation.
- [Remotion Prompts](https://www.remotion.dev/prompts): Example prompts and videos made with AI coding tools.
- [Remotion Templates](https://www.remotion.dev/templates): Starter projects, including Blank and Hello World.
- [Node.js](https://nodejs.org/): The JavaScript runtime used in this tutorial.

# Related Tutorials

- [Remotion + Claude Code: How To Make a Branded Video From Script to Render](https://mikemurphy.ai/tutorials/remotiontrailer/) 
- [How To Install Claude Code on Mac](https://mikemurphy.ai/tutorials/claudecodeinstall2026/)
- [How To Open VS Code from Terminal with Code Dot](https://mikemurphy.ai/tutorials/codedot/)
- [How To Install the Claude Code Extension in VS Code](https://mikemurphy.ai/tutorials/claudecodeextension/)