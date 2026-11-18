---
title: "How To Set Up Nod: Free Personal AI Agent by n8n (Mac)"
description: "Install Nod, the free open source personal agent by n8n. Connect Gmail, power it with your ChatGPT subscription, and schedule your first task."
pubDate: "2026-11-17"
draft: false
type: "tutorial"
slug: "nod"
permalink: "/nod/"
canonicalUrl: "https://mikemurphy.ai/tutorials/nod/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2026/11/Nod-personal-agent.jpg"
featuredImageSource: ""
categories:
  - "Tutorials"
  - "n8n"
  - "AI Agents"
tags: []
topics:
  - "nod"
  - "n8n"
  - "ai-agents"
  - "chatgpt"
  - "mcp"
youtube: []
search:
  include: true
  boost: 1.0
---

Want a personal AI agent that runs on your own computer and doesn't add another monthly bill?

Nod is a free, open source personal agent from the team behind n8n. In this tutorial, I'm going to show you how to install it on a Mac, connect it to your email and your ChatGPT subscription, and give it its first recurring job.

## What You Will Learn

You'll install Nod on your Mac and set it up to send you a weekly research roundup on its own.

- Install Nod from GitHub
- Connect Gmail (or Outlook) so Nod can work with your email
- Power Nod with your existing ChatGPT subscription
- Find your way around the Nod sidebar and its keyboard shortcuts
- Create, test, pause, and edit a scheduled task
- Replay the onboarding wizard when you need it

## What is Nod?

Nod is a personal agent: an AI assistant that can take action for you, not only answer questions. It can research, handle recurring tasks, manage your calendar, and help you stay on top of email.

A few things set it apart:

- **It runs on your computer,** so you keep full control over the agent.
- **You choose the brain.** Nod uses the AI provider you connect, such as OpenAI or Anthropic.
- **It's free and open source.** Builds are available for Mac and Windows. This tutorial uses a Mac.

## What You Need

- **A Mac or Windows computer**
- **A Gmail or Outlook account** (optional, but it's where Nod becomes useful fast)
- **An AI provider:** a ChatGPT subscription, or an API key from a provider like Anthropic
- **Telegram or WhatsApp** (optional) to chat with Nod from your phone

## Step 1: Download and install Nod

1. Go to the [Nod GitHub page](https://github.com/n8n-io/nod) and click **Download for Mac** (or the Windows download).
2. Double-click the downloaded `.dmg` file.
3. Drag `Nod.app` into your **Applications** folder and wait a few seconds for it to copy.
4. Open **Applications** and double-click **Nod**. Drag it to your Dock if you want quick access.

Nod opens with a short overview. Click **Get Started**.

## Step 2: Connect your email

The setup wizard asks if you want to connect an email account.

1. Choose **Gmail** or **Outlook**.
2. Sign in and choose the account you want Nod to use.
3. Select the permissions to grant (I chose **All**), then click **Continue**.

Nod connects your email through [Composio](https://composio.dev), a third-party connector service. When it's done, the wizard confirms that your email is connected.

## Step 3: Tell Nod about yourself

Next, the wizard chats with you to learn how you want help. It asks:

- Whether you want help with work, personal tasks, or both
- What you do, who Nod is for, and how big your company is
- What you'd like to take off your plate, such as research, recurring tasks, calendar, and email

Pick as many as you like and click **Continue**. Nod uses these answers to tailor its suggestions. You can change the focus later just by telling Nod in chat.

## Step 4: Connect an AI provider and choose a model

Nod needs a large language model to do its thinking. You pick the provider.

I chose **OpenAI**, because Nod can run on your existing ChatGPT subscription. Usage counts against your ChatGPT plan, so you don't pay anything extra.

1. Select **OpenAI** and click **Continue**.
2. Sign in and select the ChatGPT account you want to use.
3. Give the connection a name and click **Continue**.
4. Choose a model. I used the recommended **GPT-6 Sol**.

Finish the remaining wizard screens. You can decline data sharing with **Not now** and skip the mailing list.

## Step 5: Tour the Nod app

Click the **gear icon** in the bottom left corner to open Nod settings. Click **Back** to return to the main window. To search past chats, use the **search icon** in the top right.

The left sidebar has six sections, each with a keyboard shortcut (`Cmd` on Mac, `Ctrl` on Windows):

| Section | Shortcut | What it does |
| --- | --- | --- |
| Chat | `Cmd + 1` | Talk with Nod, or start from a preset |
| Scheduled | `Cmd + 2` | Set up recurring tasks and reminders |
| Apps | `Cmd + 3` | Connect apps like Gmail, Calendar, and Google Drive |
| Channels | `Cmd + 4` | Chat with Nod from Telegram or WhatsApp |
| Usage | `Cmd + 5` | See how much of your AI provider Nod is using |
| Vault | `Cmd + 6` | Store secrets Nod can use, like logins and payment info |

A few notes:

- **Apps:** If the app you want isn't in the list, click **+ Connect MCP** in the top right and add your own MCP server details.
- **Usage:** With a ChatGPT subscription, this shows usage of your plan. With an API key, you can see exactly what Nod is costing you.
- **Vault:** Only store the secrets you want your agent to be able to use.

## Step 6: Create your first scheduled task

Start by connecting the apps you use most, like Gmail, Calendar, and Google Drive. Then open **Chat** and tell Nod what you want, or pick a preset.

I used the preset **Scan news in my field every Monday**. Because I told the wizard I work in product and design, Nod assumed that was my focus. I changed it in the chat message:

```text
Focus the research on AI development and AI tools to help me find ideas and topics for making my tutorials.
```

Nod also picked up my time zone. Click **Send Message**. You can also attach files or use the microphone, like in other AI assistants.

Nod confirms the new task. Mine runs every Monday at 6 a.m. Central Time and sends a roundup of AI development and AI tool news, with source links and tutorial ideas.

## Step 7: Manage your scheduled tasks

Open the **Scheduled** tab (`Cmd + 2`) and click a task to see its schedule, next run time, and details. From there you can:

- **Run Now** to test the task immediately
- **Edit** the schedule to change the day or time
- **Ask Nod** to change the task in chat
- **Toggle off Recurring** to pause the task, and toggle it back on to resume
- **Delete** the task if you no longer need it

To add another task, click **+ New Schedule** and tell Nod what you want to schedule.

## Bonus: Replay the onboarding wizard

Need to run setup again? Maybe you're re-recording a step, or showing a teammate how Nod works. In the Mac menu bar, click **Nod** and choose **Replay Onboarding**. The setup wizard starts over.

That's it. You now have a personal agent running on your computer, connected to your email, and working on a schedule.

## Links

- [Nod on GitHub](https://github.com/n8n-io/nod)
- [n8n](https://n8n.io)
- [Composio](https://composio.dev)

## Related Tutorials

- [How To Set Up OpenAI Dots, Your Always-On Personal AI Agent](/tutorials/openaidots/)
- [How To Get Started Using Claude Cowork](/tutorials/claudecowork/)
- [How To Set Up the N8n AI Assistant on a Hostinger VPS](/tutorials/n8naiassistant/)
