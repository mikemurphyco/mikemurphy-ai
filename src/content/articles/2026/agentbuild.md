---
title: How To Build Your First AI Agent From Scratch
description: Build a simple AI agent with two Markdown files and Claude Code in VS Code. Give it context, instructions, and a useful job to do.
pubDate: 2026-09-09
draft: false
type: tutorial
slug: agentbuild
permalink: /agentbuild/
canonicalUrl: https://mikemurphy.ai/tutorials/agentbuild/
contentEra: ai
visibility: public
author: Mike Murphy
featuredImage: /assets/media/2026/09/AI-AGENT-BUILD.png
featuredImageSource: ""
categories:
  - Tutorials
  - AI Agents
  - Claude Code
tags: []
topics:
  - ai-agents
  - claude-code
  - vscode
youtube:
  - https://youtu.be/mFVqAYxKdoo
search:
  include: true
  boost: 1
---

Everyone seems to have an AI agent. What does it actually take to make one?

In this tutorial, we'll give an agent one small job: help choose the next blog article to write. I'm calling mine Evergreen, my chief of staff agent. You'll start with a folder and two text files, then use Claude Code in VS Code to put them to work.

## What makes this an agent?

An AI agent uses a model to decide what to do and tools to take action. The software runs a loop: ask the model what to do next, carry out a tool action, and return the result so the model can continue or finish.

For our example, we'll give it four pieces:

- **Context:** Background about your work, audience, and goals.
- **Instructions:** The job and how to approach it.
- **Model:** The AI that interprets the information and decides what to do.
- **Tools:** Access to read and write files.

Claude Code supplies access to the model, file tools, and agent loop. We'll create the context and instructions that give Evergreen its job.

## What you need

- [Visual Studio Code](https://code.visualstudio.com/download).
- The official **Claude Code** extension from Anthropic. In VS Code, open **Extensions**, search for Claude Code, and install it.
- A supported Claude account or Claude Console account. Open the extension and sign in. See [Claude Code setup](https://code.claude.com/docs/en/vs-code) for current requirements.

You can also use the [OpenAI Codex extension](https://developers.openai.com/codex/ide/). The walkthrough below uses Claude Code.

## 1. Create your agent's folder

Create a folder named `Evergreen` on your computer. In VS Code, choose **File → Open Folder** and select it.

This folder will hold your agent's background information, instructions, and saved recommendation.

## 2. Add the context

In VS Code's Explorer sidebar, create a file named `context.md`. The `.md` extension means Markdown, a plain-text format.

Paste this starter context and customize it for your work:

```markdown
# About me
I'm Mike, a tutorial maker who helps non-developers
understand and use AI tools.

# Audience
Creators and small business owners who feel overwhelmed
by AI and want practical examples they can follow.

# Goal
Help readers use AI through one small, useful task.

# Constraints
- I have two hours to prepare the next article.
- Keep the example focused and beginner-friendly.

# Article ideas
- Create a reusable context file for an AI assistant.
- Use an AI agent to organize a folder of notes.
- Build a team of agents to manage a content business.
```

Save with **Cmd+S** on Mac or **Ctrl+S** on Windows.

## 3. Give your agent a job

Create `instructions.md` in the same folder. Paste this and save:

```markdown
Your name is Evergreen. You are my chief of staff agent.
Your job is to help me choose my next article.

1. Read context.md.
2. Compare the article ideas against my audience,
   goal, and available time.
3. Recommend one idea and briefly explain why it fits.
4. Suggest a working title and three points to cover.

Keep your response concise. Use short paragraphs and bullets.
Use the provided context. Do not invent facts about my work.
Do not write the article or publish anything.
Wait for my approval before saving the recommendation.
```

## 4. Ask Evergreen to choose

Open the Claude Code panel and send:

```text
Please read @instructions.md and follow it for this task.
Use @context.md to help me choose my next article.
```

Type `@` and select each file from the suggestions to reference it. [Claude Code's file references](https://code.claude.com/docs/en/vs-code#reference-files-and-folders) let you bring those files into the conversation.

Read the recommendation. Does it fit your audience and the time you have? If something is off, explain what needs to change.

## 5. Save the recommendation

When you're happy with the choice, send:

```text
Yes, please save this recommendation as next-article.md
in this folder.
```

Approve the file edit if prompted, then open `next-article.md` and check the contents.

That file is the useful result: a recommendation you can return to when you're ready to write. Reading and writing files are the tools in this example. To change Evergreen's priorities next time, update the context or instructions and ask it to run the task again.
