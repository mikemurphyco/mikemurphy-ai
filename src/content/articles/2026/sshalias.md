---
title: "How To Create SSH Aliases on Mac to Connect to Your Hostinger VPS"
description: "Learn how to create SSH aliases on Mac so you can connect to your Hostinger VPS with shorter, memorable terminal commands."
pubDate: "2026-06-11T06:30:12"
updatedDate: "2026-06-10T23:07:44"
draft: false
type: "post"
slug: "sshalias"
permalink: "/sshalias/"
legacyPermalink: "https://www.mikemurphy.co/sshalias/"
canonicalUrl: "https://mikemurphy.ai/tutorials/sshalias/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2026/06/ssh_alias.png"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2026/06/SSH-ALIAS.png"
categories:
  - "Hostinger VPS"
  - "MacOS Terminal"
  - "Tutorials"
tags: []
topics:
  - hostinger-vps
  - ssh
  - macos-terminal
  - ssh-config
  - developer-workflow
search:
  include: true
  boost: 1.0
migration:
  dryRun: false
  prioritySample: false
  review: false
  eraRule: "pubDate before 2025-01-01 is legacy; on/after is ai"
  source: "wordpress-rest-recent-gap"
wp:
  id: "215674"
  postType: "post"
  rawWordCount: 75
seo:
  legacyTitle: "How To Create SSH Aliases on Mac to Connect to Your Hostinger VPS - Mike Murphy Co"
  legacyH1: "How To Create SSH Aliases on Mac to Connect to Your Hostinger VPS"
  legacyCanonical: "https://www.mikemurphy.co/sshalias/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 4106
youtube:
  - "https://youtu.be/wknMMBZRHag"
---

https://youtu.be/wknMMBZRHag

# How To Create SSH Aliases on Mac to Connect to Your Hostinger VPS

If you connect to your Hostinger VPS from the Mac terminal, you may be typing a long SSH command every time:

```bash
ssh root@123.456.789.000
```

Or, if you use an SSH key, maybe something even longer:

```bash
ssh -i ~/.ssh/my_key root@123.456.789.000
```

That works, but it gets old fast.

In this tutorial, you will create an SSH config file on your Mac so you can connect to your VPS with a short alias instead:

```bash
ssh myvps
```

No extra tools. No shell scripting. No `.zshrc` edits. Just the built-in SSH config file that macOS already knows how to use.

## What You Will Build

By the end, you will have:

- An SSH config file at `~/.ssh/config`
- A short SSH alias for your Hostinger VPS
- Your VPS IP address, username, and private key path saved in one place
- A faster command for connecting from Terminal, iTerm2, Warp, or any other Mac terminal app
- A reusable pattern for adding more VPS connections later

## Why This Matters

The more often you work on a VPS, the more annoying long SSH commands become.

An SSH alias gives you one memorable shortcut. Instead of remembering the IP address, username, port, and private key path, you save those details once in `~/.ssh/config`.

Then you connect with:

```bash
ssh myvps
```

If your VPS IP address changes later, you update one config file. The alias stays the same.

This is one of those developer workflow tricks that has been around forever, but beginner VPS tutorials often skip it. Once you set it up, it feels obvious.

## Before You Start

You will need:

- A Mac
- Terminal access
- A Hostinger VPS or any server you connect to with SSH
- Your VPS IP address
- Your SSH username, usually `root` on a default Hostinger VPS
- Your private SSH key path, if you use SSH keys

If you do not use SSH keys yet, you can still create an alias with only `Host`, `HostName`, and `User`. But if you already have SSH keys set up, adding `IdentityFile` makes the alias more reliable.

## The Important File: `~/.ssh/config`

The SSH config file is a plain text file on your Mac.

It lives here:

```text
~/.ssh/config
```

That path means:

- `~` is your Mac user home folder
- `.ssh` is the hidden SSH folder
- `config` is the file where SSH shortcuts live

This is not your `.zshrc` file. This is not your `.bashrc` file. You do not need to edit your shell settings.

For this tutorial, the only file we care about is:

```text
~/.ssh/config
```

## Step 1: Check Your `.ssh` Folder

Open Terminal on your Mac and run:

```bash
ls ~/.ssh/
```

This shows the files inside your SSH folder.

If you see a file named `config`, great. You already have the file and can add a new host block to it.

If you do not see `config`, that is fine. You will create it in the next step.

If the `.ssh` folder does not exist, create it:

```bash
mkdir -p ~/.ssh
```

What success looks like: your Mac has a `~/.ssh/` folder, and you are ready to open or create the config file.

## Step 2: Open Or Create The SSH Config File

Open the config file with nano:

```bash
nano ~/.ssh/config
```

If the file already exists, nano opens it.

If the file does not exist, nano creates a new blank file.

You can use another plain text editor if you prefer, such as VS Code, Cursor, Zed, or BBEdit. Just make sure the file is named exactly:

```text
config
```

Do not save it as `config.txt`.

## Step 3: Add Your First SSH Alias

Add a host block like this:

```ssh-config
Host myvps
  HostName 123.456.789.000
  User root
  IdentityFile ~/.ssh/your_key_name
```

Replace the placeholder values with your real VPS details.

| Line | What It Does |
| --- | --- |
| `Host myvps` | The short alias you will type in Terminal |
| `HostName 123.456.789.000` | Your VPS IP address or domain name |
| `User root` | The SSH username for your VPS |
| `IdentityFile ~/.ssh/your_key_name` | The private SSH key your Mac should use |

The alias can be almost anything that makes sense to you:

```ssh-config
Host hostinger-vps
  HostName 123.456.789.000
  User root
  IdentityFile ~/.ssh/hostinger_vps
```

Then your connection command becomes:

```bash
ssh hostinger-vps
```

What success looks like: your config file has one `Host` block with your alias, VPS IP address, username, and private key path.

## Step 4: Add More VPS Aliases

You can add more than one host block to the same config file.

For example:

```ssh-config
Host myvps
  HostName 123.456.789.000
  User root
  IdentityFile ~/.ssh/your_key_name

Host stagingvps
  HostName 98.765.432.100
  User ubuntu
  IdentityFile ~/.ssh/staging_key
```

Each `Host` block is separate.

That means you can have different aliases for different servers:

- `ssh myvps`
- `ssh stagingvps`
- `ssh production-vps`
- `ssh client-vps`

This is where the config file becomes really useful. The connection details stay organized in one place, and your daily commands stay short.

## Step 5: Save And Exit Nano

If you are using nano:

1. Press `Control + O` to save
2. Press `Enter` to confirm the filename
3. Press `Control + X` to exit

After you exit, you will be back at the regular terminal prompt.

## Step 6: Set The Correct File Permissions

SSH is picky about file permissions.

Run:

```bash
chmod 600 ~/.ssh/config
```

This makes the config file readable and writable only by your Mac user.

You can also make sure the `.ssh` folder itself has the right permissions:

```bash
chmod 700 ~/.ssh
```

Do not skip this if SSH complains about permissions. A config file with loose permissions can cause confusing errors.

What success looks like: SSH accepts the config file without warning about bad permissions.

## Step 7: Test Your SSH Alias

Now connect using the alias:

```bash
ssh myvps
```

Or, if you used a different alias:

```bash
ssh hostinger-vps
```

If this is your first time connecting to that server from this Mac, SSH may ask you to confirm the server fingerprint. Type:

```text
yes
```

If everything is set up correctly, you will connect to your Hostinger VPS without typing the IP address, username, or key path.

What success looks like: `ssh myvps` connects to the same VPS as your old long SSH command.

## Troubleshooting

| Problem | Likely Cause | Fix |
| --- | --- | --- |
| `ssh myvps` says the host cannot be resolved | The `Host` alias does not match what you typed | Check the exact alias after `Host` in `~/.ssh/config` |
| SSH still asks for a password | The wrong key is being used or no key is configured | Check the `IdentityFile` path and confirm the key exists in `~/.ssh/` |
| SSH says permissions are too open | The config file or `.ssh` folder permissions are too loose | Run `chmod 600 ~/.ssh/config` and `chmod 700 ~/.ssh` |
| The connection goes to the wrong server | The `HostName` value is wrong | Replace `HostName` with the correct VPS IP address |
| The alias works in one terminal app but not another | The terminal app may be using a different user or environment | Confirm both apps are running as the same Mac user |
| Nano created an empty file | You opened the file but did not save before exiting | Reopen `nano ~/.ssh/config`, add the host block, then save with `Control + O` |

## Commands Reference

Check your SSH folder:

```bash
ls ~/.ssh/
```

Create the SSH folder if needed:

```bash
mkdir -p ~/.ssh
```

Open or create the SSH config file:

```bash
nano ~/.ssh/config
```

Set config file permissions:

```bash
chmod 600 ~/.ssh/config
```

Set `.ssh` folder permissions:

```bash
chmod 700 ~/.ssh
```

Connect with your alias:

```bash
ssh myvps
```

## Complete SSH Config Example

Here is a clean starter config for two VPS connections:

```ssh-config
Host myvps
  HostName 123.456.789.000
  User root
  IdentityFile ~/.ssh/your_key_name

Host stagingvps
  HostName 98.765.432.100
  User ubuntu
  IdentityFile ~/.ssh/staging_key
```

After saving that file, you can connect with:

```bash
ssh myvps
ssh stagingvps
```

## What This Unlocks Next

SSH aliases make VPS work feel a lot less clunky.

Instead of remembering long commands, IP addresses, usernames, and key paths, you give each server a short name and let your Mac handle the details.

That means:

- No more memorizing VPS IP addresses
- No more typing private key paths every time
- Multiple servers organized in one config file
- Faster terminal workflow when working with Hostinger VPS, Docker, Claude Code, or any other remote server setup

Once you have it set up, connecting to your VPS is as simple as:

```bash
ssh myvps
```

## Watch The Video

Watch the full walkthrough here:

https://youtu.be/wknMMBZRHag
