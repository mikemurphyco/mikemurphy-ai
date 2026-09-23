---
title: How To Connect VS Code to Your Hostinger VPS with the Hostinger Connector
description: Set up the Hostinger Connector extension in VS Code so your AI assistant can check, monitor, and manage your Hostinger VPS through MCP.
pubDate: 2026-09-22
draft: false
type: tutorial
slug: hostingerconnector
permalink: /hostingerconnector/
canonicalUrl: https://mikemurphy.ai/tutorials/hostingerconnector/
contentEra: ai
visibility: public
author: Mike Murphy
featuredImage: /assets/media/2026/09/vs-code-hostinger.png
featuredImageSource: ""
categories:
  - Tutorials
  - Hostinger VPS
  - AI
tags: []
topics:
  - hostinger-vps
  - mcp
  - vs-code
  - claude-code
  - ai-assistants
youtube:
  - https://youtu.be/z47Is0LtObw
search:
  include: true
  boost: 1
---

Checking on your VPS usually means logging into the Hostinger dashboard and clicking around. With the Hostinger Connector extension, you can ask the AI assistant already in your code editor instead: "Is my VPS running?", "What's my memory usage?", "When does my plan renew?" You get the answer without leaving VS Code.

This tutorial walks through installing the extension, connecting it to your Hostinger account, and testing it with Copilot and Claude Code.

## What You Will Build

- The Hostinger Connector extension installed in VS Code
- A secure OAuth connection between VS Code and your Hostinger account
- An AI assistant that can check your VPS status, pull metrics, and read account details
- The same connection working in the Claude Code CLI and Claude Code extension

## Why This Matters

The Hostinger Connector uses **MCP** (Model Context Protocol), a standard way to give an AI assistant access to outside tools. Once it's connected, your assistant can use Hostinger's tools for you: VPS, websites, domains, DNS, email marketing, e-commerce, and billing. VPS alone has 64 tools.

In practice, you can:

- Spin up a new VPS
- Change the operating system on a VPS
- Manage the firewall
- Manage domains and DNS
- Troubleshoot: check whether the server is up, and pull CPU, memory, and bandwidth metrics

One thing to be clear on: **the Connector is an admin tool, not SSH.** SSH is the master key. When you SSH into your VPS you can do anything, like installing apps in Docker containers. The Connector can't do that. Think of it as the Hostinger dashboard, driven by your AI assistant.

## Before You Start

You'll need:

- A Hostinger VPS that's already set up
- VS Code (or another editor like Cursor) with an AI assistant installed, such as GitHub Copilot or the Claude Code extension
- Node.js on your computer (the Connector runs on it)

## Step 1: Check That Node.js Is Installed

Open the terminal and run:

```bash
node --version
```

If you get a version number back (something like `v22.x.x`), you're good to go.

If you don't, go to [nodejs.org](https://nodejs.org), click **Download**, choose your operating system, and run the installer. Then run the command again to confirm.

## Step 2: Install the Hostinger Connector Extension

There are two ways to install it. Both give you the same extension.

**Option A: From the Hostinger dashboard**

1. Sign in to Hostinger and open hPanel.
2. Find your VPS on the **Home** tab (or click **VPS** in the left sidebar), then click **Manage**.
3. In the left sidebar, click **API**. This page has the setup instructions for connecting an editor to the Hostinger MCP, for Mac, Windows, and Linux.
4. Choose your editor (VS Code) and your operating system, then click **Install in VS Code**.
5. VS Code opens straight to the extension page. Click **Install**.

**Option B: From inside VS Code**

1. Open the **Extensions** tab (the four-squares icon in the left sidebar).
2. Search for `Hostinger`.
3. Select **Hostinger Connector**. Make sure it's the one marked **Hostinger Official**.
4. Click the green **Install** button.

If you ever want to pause the connection between your AI agents and Hostinger, click **Disable** on the extension page. **Uninstall** removes it completely.

## Step 3: Connect Your Hostinger Account

1. In the far-left sidebar of VS Code, find the big **H** icon near the bottom and click it. The status shows **Not connected**.
2. Click **One-Click Connect**. This uses OAuth, which is the recommended method. (You can use a Hostinger API token instead if you prefer.)
3. Your browser opens to your Hostinger account. Click **Allow**.
4. After you see "Authentication successful," go back to VS Code.

The status should now read **Connected**, using Node.js and OAuth. OAuth lets one service connect to another without ever seeing or storing your password.

Once you're connected, the panel lists every tool your AI assistant can use, grouped by category: websites, domains, VPS, subscriptions and payments, email marketing, and e-commerce. To disconnect later, click **Disconnect**.

## Step 4: Test It with Your AI Assistant

Click the chat bubble at the top of VS Code to open the chat panel, pick your assistant (I started with Copilot), and try a few plain-English prompts. You don't need to mention Hostinger. The assistant works out which tools to use.

```text
What VPS servers do I have and are they running?
```

```text
Pull the CPU, memory, and bandwidth metrics.
```

```text
When does my subscription renew for my VPS?
```

Within a few seconds you should get your VPS details, a snapshot of resource usage, and your billing info. When I ran the last prompt, it told me auto-renew was on and when I'd be billed. It's handy to know that before the charge arrives.

## Step 5: Use It in Claude Code

Connecting through OAuth also connects the **Claude Code CLI**. The extension's details page mentions this. No extra setup is needed.

Open a terminal, start Claude Code, and ask something like:

```text
When does my VPS expire?
```

The same works in the **Claude Code extension** chat inside VS Code. When it asks for permission to run the Hostinger MCP tool, approve it, and you get the same answer as in Copilot.

## Troubleshooting

| Problem | Fix |
|---|---|
| `node --version` returns "command not found" | Install Node.js from nodejs.org, then open a new terminal window and check again. |
| No **H** icon in the VS Code sidebar | Confirm the extension is installed and enabled, then reload VS Code. |
| Multiple Hostinger extensions in search | Install the one labeled **Hostinger Official**. |
| Status stays **Not connected** after allowing | Click **One-Click Connect** again and make sure you're signed in to the right Hostinger account in the browser. |
| Assistant doesn't use Hostinger tools | Check that the Connector status is **Connected**, then ask a more specific question that mentions your VPS. |
| Asked it to install an app on the VPS | That's outside the Connector's scope. Use SSH for anything inside the server. |

## Settings Reference

| Setting | Value |
|---|---|
| Extension | Hostinger Connector (Hostinger Official) |
| Connection method | OAuth, via One-Click Connect (API token optional) |
| Runtime | Node.js |
| Works with | GitHub Copilot, Claude Code CLI, Claude Code extension |
| Pause / remove | **Disable** or **Uninstall** on the extension page |

## What This Unlocks Next

With the Connector in place, routine VPS admin can happen in the same window where you write code. Use it for quick health checks, billing reminders, DNS changes, and firewall rules. When you need to work inside the server itself, switch to SSH.

Good next steps:

- [Set up UFW on your Hostinger VPS](/tutorials/ufw/) for firewall rules at the server level
- [Reinstall or change the OS on your Hostinger VPS](/tutorials/reinstallos/)
- [Install Claude Code on your Hostinger VPS](/tutorials/claudecodehostingervps/) to run an agent directly on the server

## Links

- [Hostinger VPS](https://go.mikemurphy.ai/vps)
- [Node.js](https://nodejs.org)
- [VS Code](https://code.visualstudio.com)
- [Install the Claude Code Extension in VS Code](/tutorials/claudecodeextension/)
- [Import a Claude Desktop MCP Server into Claude Code](/tutorials/claudecodemcp/)
