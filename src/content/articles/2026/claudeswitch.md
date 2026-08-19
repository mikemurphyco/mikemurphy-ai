---
title: "Claude Code: Easy Switch Between Work & Personal Accounts"
description: Learn how to set up separate credential folders and terminal aliases so you can switch between multiple Claude Code accounts without losing your session.
pubDate: 2026-08-18
draft: false
type: tutorial
slug: claudeswitch
permalink: /claudeswitch/
canonicalUrl: https://mikemurphy.ai/tutorials/claudeswitch/
contentEra: ai
visibility: public
author: Mike Murphy
featuredImage: /assets/media/2026/08/claude-code-easy-switch.jpg
featuredImageSource: ""
categories:
  - Tutorials
  - Claude Code
tags: []
topics:
  - claude-code
  - terminal
  - aliases
  - macos
  - productivity
youtube:
  - https://youtu.be/GZElMTT7dxc
search:
  include: true
  boost: 1
---

If you use Claude Code for both work and personal projects, you already know the annoyance: Claude Code only remembers one login at a time. Switch accounts and you have to log out, log back in, and you lose the context window on the session you just left. Do that a few times a day and it adds up fast.

Here's how to set up two separate credential folders and a pair of terminal aliases so you can jump between a personal and a work Claude Code account instantly, with no logging in or out required.

## What You Will Build

- Two separate credential folders, one per Claude Code account
- Exported login credentials saved into each folder
- Two aliases (for example `claude-mike` and `claude-work`) added to `.zshrc`
- The ability to type one word in the terminal and land in the right account, fully authenticated, every time

## Why This Matters

Claude Code stores your login in a single default location. That's fine if you only use one account, but the moment you split work and personal, every switch means a fresh login and a reset session. Keeping separate credential folders sidesteps that entirely: each folder holds its own saved login, and an alias just tells Claude Code which folder to read from before launching. No re-authorizing, no lost context.

## Before You Start

You'll need macOS with the Terminal app, Claude Code already installed, and login credentials for each Claude Code account you want to switch between (for example a personal Claude Pro account and a separate work account). This tutorial covers the terminal workflow. If you also use the [Claude Code extension for VS Code](/tutorials/claudecodeextension/), see the note at the end, since it behaves a little differently.

## Step 1: Check Which Account You're Currently Logged Into

Open Terminal and run:

```
claude /status
```

This shows which Claude Code account is currently active. You'll repeat this check later to confirm each switch worked.

## Step 2: Create a Credential Folder for Each Account

Each account gets its own hidden folder in your home directory to hold its credentials. Create both now:

```
mkdir -p ~/.claude-mike
mkdir -p ~/.claude-work
```

`mkdir` creates a folder, and `-p` (parent) means it won't throw an error if the folder already exists. Name the folders whatever makes sense for your accounts (`.claude-mike` and `.claude-work` in this example). If you want to confirm they were created, open Finder, go to your home directory, and press Shift + Command + Period to reveal hidden files. Both folders will show up empty for now.

## Step 3: Export Your Personal Account Credentials

Sign into your personal Claude Code account and save its credentials into the matching folder. In Terminal, run:

```
export CLAUDE_CONFIG_DIR=~/.claude-mike && claude
```

This does two things: it points Claude Code at the `.claude-mike` folder, then launches Claude Code so you can sign in. Walk through the setup wizard, choose your color theme, and when prompted, sign in with your subscription. That opens a browser window where you'll authorize Claude. Once authorized, return to Terminal and press Enter to continue.

Check the `.claude-mike` folder again in Finder. It now holds your exported login credentials instead of sitting empty.

## Step 4: Export Your Work Account Credentials

Repeat Step 3, this time running `export CLAUDE_CONFIG_DIR=~/.claude-work && claude` so the credentials land in the `.claude-work` folder instead. When the browser window opens for authorization, don't click authorize yet. Scroll to the bottom of the page first and check which account you're currently signed into. If it's the wrong one, click **Switch account** and sign into your work account before authorizing.

Back in Terminal, confirm you see your work email address and a "login successful" message, then click **Continue**. Both folders now hold a full set of credentials: `.claude-mike` for personal, `.claude-work` for work.

## Step 5: Add Aliases to .zshrc

Aliases are shortcuts: type the alias, and the terminal runs the full command behind it. You'll add one alias per account.

Open your shell config file in a text editor:

```
open -e ~/.zshrc
```

Scroll to the bottom of the file and add a header comment so you can find these later, then add both aliases:

```
# Claude Code Switcher: Personal and Work
alias claude-mike="export CLAUDE_CONFIG_DIR=~/.claude-mike && claude"
alias claude-work="export CLAUDE_CONFIG_DIR=~/.claude-work && claude"
```

Each alias uses a double ampersand (`&&`) to chain two commands: first it points Claude Code at the right credential folder, then it launches Claude. Rename `claude-mike` and `claude-work` to whatever you'd rather type; the folder paths just need to match what you created in Step 2.

Save the file, then reload your terminal so it picks up the new aliases:

```
source ~/.zshrc
```

Nothing visible happens when you run this, and that's expected. It just tells the terminal to re-read the config file.

## Step 6: Test the Aliases

Type your personal alias and confirm it signs you straight in:

```
claude-mike
```

You'll see a one-time trust prompt for the folder, then you're in your personal account, no login required. Exit the Claude REPL with `/exit`, and try the work alias:

```
claude-work
```

Same result: an instant switch straight into your work account. From here you can bounce back and forth between `claude-mike` and `claude-work` all day without re-authorizing either one.

## The VS Code Extension Gotcha

Everything above works great in any terminal, including the terminal panel inside VS Code. If you type `claude-mike` in a VS Code terminal, it launches Claude Code under that account exactly the same way.

The [Claude Code extension for VS Code](/tutorials/claudecodeextension/) is a different story. It doesn't read your terminal aliases, so switching accounts inside the extension itself means using `/login` each time, which resets your session context just like the old workflow did. It's not a dealbreaker, since you can always fall back to the terminal panel inside VS Code and switch just as easily there. Just know the extension and the terminal don't share this shortcut.

## Troubleshooting

| Problem | Fix |
|---|---|
| Alias runs but launches the wrong account | Double-check the folder path in the alias matches the folder you exported credentials into |
| Typing the alias does nothing new | Confirm you saved `.zshrc` and ran `source ~/.zshrc` afterward |
| Credential folders look empty in Finder | Press Shift + Command + Period to reveal hidden files; folders starting with a dot are hidden by default |
| Extension still asks you to log in every time | Expected. The extension doesn't use terminal aliases; switch in the VS Code terminal panel instead |

## Commands Reference

```
# Check current login
claude /status

# Create credential folders
mkdir -p ~/.claude-mike
mkdir -p ~/.claude-work

# Open .zshrc for editing
open -e ~/.zshrc

# Aliases to add
alias claude-mike="export CLAUDE_CONFIG_DIR=~/.claude-mike && claude"
alias claude-work="export CLAUDE_CONFIG_DIR=~/.claude-work && claude"

# Reload terminal config after saving
source ~/.zshrc
```

## What This Unlocks Next

Once you're comfortable with alias-based switching, the same pattern works for any number of Claude Code accounts, not just two. It also pairs well with other alias-driven shortcuts, like turning long directory paths into one-word commands. If you haven't set those up yet, check out [Creating Terminal Alias Shortcuts](/tutorials/termnalaliases/) for the general technique.

## Links

- [How To Install Claude Code On Mac](/tutorials/claudecode/)
- [How To Install Claude Code Extension in VS Code](/tutorials/claudecodeextension/)
- [Create MacOS Terminal Alias Shortcuts](/tutorials/termnalaliases/)
