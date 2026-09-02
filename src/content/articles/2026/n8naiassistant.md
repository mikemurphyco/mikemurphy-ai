---
title: How To Set Up the N8n AI Assistant on a Hostinger VPS
description: Learn how to set up n8n's built-in AI Assistant on a self-hosted Hostinger VPS, including the model, the required code sandbox, and optional web search.
pubDate: 2026-08-25
draft: false
type: tutorial
slug: n8naiassistant
permalink: /n8naiassistant/
canonicalUrl: https://mikemurphy.ai/tutorials/n8naiassistant/
contentEra: ai
visibility: public
author: Mike Murphy
featuredImage: /assets/media/2026/08/n8n_assistant.jpg
featuredImageSource: ""
categories:
  - Tutorials
  - n8n
  - Hostinger VPS
tags: []
topics:
  - n8n
  - ai-assistant
  - hostinger-vps
  - docker
  - self-hosted-ai
youtube:
  - https://youtu.be/_DkbT9HkORk
search:
  include: true
  boost: 1
---

N8n's self-hosted Community Edition now ships with a built-in AI Assistant: a chat box inside the editor that can build, edit, and troubleshoot your workflows just by describing what you want in plain text. Getting it running on a self-hosted Hostinger VPS looks like a simple three-step wizard, but the middle step (the code sandbox) actually requires its own service running on your server. Here's the full setup, start to finish.

## What You Will Build

- N8n confirmed on a version that supports the AI Assistant (2.35.0 or later)
- A model connected (Claude, OpenAI, OpenRouter, or a local Ollama model)
- A self-hosted code sandbox running on your VPS, which is what lets the Assistant actually execute the code it writes
- Optional web search (SearXNG or Brave Search) so the Assistant can look things up live
- A working AI Assistant that can build and test a real n8n workflow end to end

## Why This Matters

Most AI chat assistants can only talk about your workflow. N8n's AI Assistant can build it: it writes the workflow JSON, wires up nodes, and (once the sandbox is connected) runs code and live API tests to confirm the workflow actually works before handing it back to you. That sandbox is the part that makes it more than a fancy autocomplete, and it's also the part n8n doesn't fully walk you through, since it assumes you already have somewhere to deploy it.

## Before You Start

- A self-hosted n8n instance running on a Hostinger VPS
- An API key from Anthropic (Claude), OpenAI, or OpenRouter, or Ollama installed on your VPS if you'd rather run a local model
- Terminal or SSH access to your VPS, since the code sandbox and web search both run as their own Docker services
- Comfort using an AI coding tool (Claude Code or Codex) to help deploy Docker services, or willingness to follow n8n's manual setup docs instead

## Step 1: Confirm Your N8n Version

The AI Assistant requires n8n 2.35.0 or later. Sign in to n8n, click the gear icon in the bottom left, and choose **Usage and plan**. Your version number is listed in the left sidebar. If you're on 2.35.0 or later, you'll see an **AI Assistant** entry in the left sidebar; clicking it opens the setup wizard.

If you're behind, you can check the latest available version from that same sidebar: click the version number, then **Source code**, which opens the n8n GitHub repo. The **Releases** section in the right sidebar always shows the current latest tag.

## Step 2: Update N8n If Needed

If you pin your n8n version (recommended over using `latest`), update it from the Hostinger VPS dashboard:

1. Go to **Docker Manager**, find your n8n container, and click **Manage**.
2. Open the **YAML editor**. This opens your Docker Compose file.
3. At the top, find the n8n image line and update the version number to the latest tag you found on GitHub.
4. Click **Deploy** to apply the update.

For a deeper walkthrough of version pinning and rollbacks, see [How to Change n8n Version Numbers on Hostinger VPS](/tutorials/n8nversions/).

## Step 3: Select Your Model

Once you're on a supported version, sign back in to n8n and you should see the AI Assistant welcome screen. The first step in the wizard is picking a model:

1. Click the provider dropdown and choose **Anthropic** (Claude), **OpenAI** (ChatGPT), **OpenRouter**, or a self-hosted option if you have Ollama installed on your VPS.
2. Paste in an API key for that provider. You can get an OpenAI key at `platform.openai.com`, and a Claude key from the Anthropic Console. See [How To Get Anthropic API Keys To Use Claude AI in n8n](/tutorials/anthropicapi/) if you need help generating one.
3. Choose the specific model you want to use, then click **Save**.

OpenRouter is worth knowing about if you haven't used it: one API key gets you access to a large catalog of models, so you can switch between providers inside n8n without juggling separate keys for each one.

## Step 4: Deploy the Code Sandbox

This is the step the wizard makes look like a single click, but it isn't. The model is the brain of the Assistant; the sandbox is where it actually runs the code it writes, so without one the Assistant can plan a workflow but can't verify it works.

Click **Not set** next to the code sandbox option. You'll see two choices: **Daytona**, a paid hosted sandbox, or the **N8n sandbox**, which is free and self-hosted. Click **N8n sandbox**. You'll need a service URL and an API key for it, both of which come from deploying the sandbox yourself.

Click **Install instructions** to open the "set up the host sandbox manually" page in the n8n docs. From here you have two paths:

- Follow n8n's manual Docker instructions yourself.
- Use an AI coding tool (Claude Code or Codex) with a skill or prompt that already knows how to deploy Docker services to your VPS, and just point it at the n8n docs page.

If you go the AI-assisted route, be specific in your prompt: tell it you want the sandbox deployed internally on your VPS, not publicly exposed, and that you need it to return the service URL and API key when it's done. On a properly scoped VPS automation setup, this deploy typically takes two to three minutes with no follow-up questions.

Once it finishes, copy the service URL and the API key it gives you, then back in n8n:

1. Paste the service URL into the **Service URL** field.
2. Paste the API key into the **API key** field.
3. Click **Save**.

You should see a confirmation that the sandbox connection works.

If you'd rather see how a VPS Docker deployment like this actually gets scoped and run, see [How To Use Claude Code For Docker Management on Hostinger VPS](/tutorials/claudecodedocker/).

## Step 5: Enable Web Search (Optional)

The last wizard step lets the Assistant search the internet, which is useful if you want it to look up API docs or current information while building a workflow. Click **Not set** next to web search and choose one of two options:

- **SearXNG**: free to run since you're self-hosting it, and takes the same Docker deployment approach as the sandbox in Step 4.
- **Brave Search API key**: faster to set up, includes a free usage tier, then moves to paid usage once you exceed it.

If you go with SearXNG, deploy it the same way you deployed the sandbox (manually, or via your AI coding tool's VPS deployment skill), and n8n will restart once it's connected.

## Step 6: Add the Search Service as a Credential

After n8n restarts, you'll have a service URL for SearXNG but it isn't wired into n8n as a credential yet. To use it in your own workflows (not just inside the Assistant), add it manually:

1. Click the **+** icon in the top left and choose **New credential**.
2. Search for `SearXNG` and select it.
3. Click **Continue**, paste in the API URL, and click **Save**.

You'll see a confirmation that the credential saved successfully.

## Step 7: Open and Test the AI Assistant

With all three steps complete (model, sandbox, and optionally web search), open the Assistant from the **+** icon in the top left (**New AI chat**) or from the AI Assistant icon in the left sidebar. From here it behaves like any chat assistant, except it can actually build inside your n8n instance.

Try a real prompt to confirm everything is wired up correctly. For example: "I want to see the top 10 most popular AI-related GitHub repositories created in the last 30 days." The Assistant will draft the workflow, then (because the sandbox is connected) offer to run a live test against the real API. Approve the test, and it will execute the workflow, summarize the results, and can answer follow-up questions about the output, all without you touching a single node manually.

## Troubleshooting

| Problem | Fix |
|---|---|
| No AI Assistant option in the sidebar | Confirm your n8n version is 2.35.0 or later under **Usage and plan** |
| Sandbox shows "not set" after saving | Double-check the service URL has no trailing slash and the API key was pasted without extra whitespace |
| Assistant can't run a live test | The code sandbox connection likely failed; re-check the service URL and API key, and confirm the sandbox container is running on your VPS |
| Web search step won't save | Confirm SearXNG finished deploying and n8n has fully restarted before retrying |

## What This Unlocks Next

Once the Assistant is running, it's worth revisiting workflows you've built manually and asking it to add features you've been avoiding (Telegram support, error handling, retries) since it can often wire those up faster than doing it node by node. It's also a good sanity check on any workflow's logic before you rely on it in production.

## Links

- TODO: link the exact n8n docs page for the manual sandbox setup (the one opened from **Install instructions** in the wizard)
- [How to Change n8n Version Numbers on Hostinger VPS](/tutorials/n8nversions/)
- [How To Get Anthropic API Keys To Use Claude AI in n8n](/tutorials/anthropicapi/)
- [How To Use Claude Code For Docker Management on Hostinger VPS](/tutorials/claudecodedocker/)
