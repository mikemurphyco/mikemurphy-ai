---
title: "Claude Code Skills: How To Turn a Video Transcript Into a Blog Post"
description: Use a Claude Code skill to turn a raw video transcript into a clean, consistent blog post, and learn what goes inside a SKILL.md file.
pubDate: 2026-11-05
draft: false
type: tutorial
slug: claudeskills
permalink: /claudeskills/
canonicalUrl: https://mikemurphy.ai/tutorials/claudeskills/
contentEra: ai
visibility: public
author: Mike Murphy
featuredImage: /assets/media/2026/11/Claude-Skill-Transcript-Blog.jpg
featuredImageSource: ""
categories:
  - Tutorials
  - Claude Code
  - AI Tools
tags: []
topics:
  - claude-code
  - claude-code-skills
  - skill-md
  - ai-agents
  - ai-writing
  - content-workflow
youtube:
  - https://youtu.be/AhgBwub_fuQ
search:
  include: true
  boost: 1
---

The raw transcript from a video tutorial is messy. Mine has garbled text, repeated lines, and misspellings. But it also has the steps, the commands, and the way I explain things.

I'm going to show you how I use a Claude Code skill to turn that transcript into a clean, step-by-step blog post, with the same format every time.

## What You Will Learn

You'll use Claude Code and a `SKILL.md` file to turn a raw video transcript into a consistent blog post draft.

- Teach Claude Code your writing style
- Turn a finished post into a reusable skill
- Find your skills in the hidden `.claude` folder
- Read the main parts of a `SKILL.md` file
- Run a skill on a transcript from the Claude Code prompt
- Save a test draft without touching your website

## What Is a Claude Code Skill?

A skill is a folder of instructions that tells Claude Code how to do a job. Think of it as a recipe. You write the recipe once, and then Claude Code follows it each time you make that dish.

The main file in the folder is `SKILL.md`. It's a plain text Markdown file that holds the rules for the job. The folder can also hold reference files, such as templates and checklists.

Skills aren't only for Claude Code. Codex also uses skills with a `SKILL.md` file, but it keeps personal skills in a different folder and starts them differently. See the [Codex skills docs](https://learn.chatgpt.com/docs/build-skills) for those details.

## What You Need

- [Claude Code](https://code.claude.com/docs/en/overview), installed and signed in
- A transcript saved as a plain text file
- Writing samples, such as old transcripts, YouTube descriptions, or blog posts

I use a Mac and ScreenFlow in this tutorial. Any recording app works if it can export audio or a transcript.

## Step 1: Teach Claude Code Your Writing Style

A blog post skill needs to know how you sound. I gave Claude Code a batch of my raw transcripts, YouTube descriptions, and previous blog posts so it could learn my voice and teaching style.

Then I had Claude Code save those patterns as a separate writing style skill. Now I can point any writing job at that one skill.

Here's an example prompt you can adapt:

```text
Read the transcripts, YouTube descriptions, and blog posts in this folder. Describe my writing voice and teaching style. Then create a skill that I can use whenever I write something new.
```

## Step 2: Turn One Good Post Into a Skill

Next, give Claude Code one raw transcript and ask for a blog post that uses your writing style skill. Revise the draft until you like the formatting and the writing.

When the post looks right, tell Claude Code to turn the process into a skill:

```text
Create a skill from this process so I can turn any tutorial transcript into a blog post with this same format and voice.
```

## Step 3: Find Your Skill Folder

Claude Code keeps your personal skills in a hidden folder at `~/.claude/skills/`. To see that folder on a Mac:

1. Open Finder and go to your home folder.
2. Press `Shift + Command + .` to show hidden files and folders.
3. Open `.claude`, then open `skills`.

Each skill has its own folder. Here's mine:

```text
astro-tutorial-blog-post/
├── SKILL.md
└── references/
    └── site-publishing.md
```

The `site-publishing.md` file holds the front matter, the paths, and other details about my website. `SKILL.md` holds the recipe.

## Step 4: Check the Rules in SKILL.md

The top of a `SKILL.md` file is the front matter. This is where you'll usually see the skill's name and description. Claude Code uses the description to decide when the skill applies, and the name appears in the `/` menu.

Here's the front matter from my skill:

```yaml
---
name: astro-tutorial-blog-post
description: "Write or revise Mike Murphy's AI tutorial posts, articles, and explainers from notes, outlines, conversations, or recordings. Use for mikemurphy.ai writing and Scribe drafts. Default tutorial posts to a light, practical format with short paragraphs, numbered steps, links, and copyable examples, then package them site-ready (front matter, internal links, draft: true) in the mikemurphy-ai Astro repo."
---
```

Below the front matter, my skill covers:

- **Writing style:** Use my shared writing style skill.
- **Format:** Short intro, just enough explanation, requirements, numbered steps, and a useful result.
- **Voice:** Essentials only, no fluff.
- **Accuracy:** Check commands and claims instead of trusting the transcript.
- **Packaging:** Get the finished post ready for my Astro site.
- **Test or workshop mode:** Skip the packaging and save the draft locally.

The format is consistent, but it isn't rigid. The skill can adapt to the topic or style of a tutorial, so a different kind of video won't break it.

## Step 5: Create the Transcript

Claude Code needs a text file to work from, and you only need the audio to make one.

1. Export an audio-only file from your video editor. In ScreenFlow, this takes only a few seconds.
2. Start your full video export. This can take 20 minutes or more, and you can leave it running while you work on the transcript.
3. Run the audio file through your transcription tool. I use a small transcriber app I made for myself.
4. Save the transcript as a text file in your tutorial folder.

## Step 6: Run the Skill

1. In Finder, right-click your tutorial folder and choose **Services > New Terminal at Folder**. You can also open Terminal and use `cd` to go to the folder.
2. Start Claude Code:

```bash
claude
```

3. Type `/` and the first few letters of your skill name. Claude Code shows a list of matching skills.
4. With your skill selected, press `Tab` to fill in the name.
5. Type your request. To reference the transcript, type `@`, select the file with the arrow keys, and press `Tab`.
6. Press `Return`.

My skill has a test or workshop mode, so I use that for a demo. Your skill only has a mode like this if you add one to its instructions. Here's the kind of request I use:

```text
/astro-tutorial-blog-post Use test workshop mode. Write a tutorial blog post for @REMOTION.txt. Save the post in this same directory. Do not write to the mikemurphy-ai directory.
```

Claude Code reads `SKILL.md` for the rules and then writes the draft. In my test, it also checked the commands against the Remotion documentation and fixed the mistakes from my transcriber.

## Step 7: Review the Draft

Open the draft in the folder you chose and read it next to your transcript. Check that:

- The commands and product names are correct.
- The garbled transcript lines did not become steps.
- The sections match the format in your skill.
- The links go to the right pages.

If something is off, tell Claude Code what to fix in the draft. If you see the same problem again and again, fix the rule in `SKILL.md`.

Pretty cool. I compared my test draft with my published Remotion tutorial, and the two were close, including the links and related tutorials.

For a real post, I run the skill without workshop mode. Claude Code saves the draft in my Astro project with `draft: true`. Then I add the thumbnail path and the YouTube URL before I publish it.

## Links

- [Claude Code skills docs](https://code.claude.com/docs/en/skills): How skills work, where they live, and the `SKILL.md` format.
- [Codex skills docs](https://learn.chatgpt.com/docs/build-skills): The same idea in Codex.
- [Astro](https://astro.build/): The framework I use for my website.

## Related Tutorials

- [How To Create a CLAUDE.md File in Claude Code](https://mikemurphy.ai/tutorials/claudemd/)
- [How To Install Claude Code On Mac Using Native Installer 2026](https://mikemurphy.ai/tutorials/claudecodeinstall2026/)
- [Remotion: How To Get Started Making Videos With Code](https://mikemurphy.ai/tutorials/remotion/)
