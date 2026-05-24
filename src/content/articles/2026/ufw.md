---
title: "How To Setup UFW on Hostinger VPS (Step-by-Step)"
description: "In this tutorial, you will learn how to set up UFW (Uncomplicated Firewall) on your Hostinger VPS. UFW is a command-line utility that runs at the operating system level, adding a second layer of protection alongside the network firewall in your Hostinger dashboard."
pubDate: "2026-04-01T06:30:46"
updatedDate: "2026-03-31T22:11:00"
draft: false
type: "post"
slug: "ufw"
permalink: "/ufw/"
legacyPermalink: "https://www.mikemurphy.co/ufw/"
canonicalUrl: "https://mikemurphy.ai/ufw/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2026/03/UFWpsd.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2026/03/UFWpsd.jpg"
categories: 
  - "AI"
  - "Hostinger VPS"
  - "Tutorials"
tags: 
  - "firewall"
topics: []
search:
  include: true
  boost: 1.0
migration:
  dryRun: false
  prioritySample: false
  review: false
  eraRule: "pubDate before 2025-01-01 is legacy; on/after is ai"
  source: wordpress-wxr
wp:
  id: "215423"
  postType: "post"
  rawWordCount: 735
seo:
  legacyTitle: "How To Setup UFW on Hostinger VPS (Step-by-Step) - Mike Murphy Co"
  legacyH1: "How To Setup UFW on Hostinger VPS (Step-by-Step)"
  legacyCanonical: "https://www.mikemurphy.co/ufw/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 724
youtube: 
  - "https://youtu.be/4IOx9ArJFdk"
---
<https://youtu.be/4IOx9ArJFdk>

**Description  
**In this tutorial, you will learn how to set up UFW (Uncomplicated Firewall) on your Hostinger VPS. UFW is a command-line utility that runs at the operating system level, adding a second layer of protection alongside the network firewall in your Hostinger dashboard. By the end of this tutorial, your VPS will have two locks protecting it from the outside world.

🧠 **What You Will Learn**

- Two-firewall setup: outer network layer vs. inner OS level
- UFW explained... what it is and why your VPS needs it
- SSH port 22: why you must allow it before enabling UFW
- Web ports 80 and 443: opening them on the inner firewall
- Default policies: deny all incoming, allow outgoing
- Common UFW commands: add ports, delete rules, reset, disable

🔗 **Links**

🌐 Hostinger VPS:  
[https://www.hostg.xyz/SHIDN](https://www.hostg.xyz/SHIDN)

How To Add Firewall Rules on Hostinger VPS  
[https://youtu.be/bjMGvwHKXyY](https://youtu.be/bjMGvwHKXyY)

Hostinger VPS: How To Create a Non-Root Sudo User  
[https://youtu.be/00mrjyTB_Lk](https://youtu.be/00mrjyTB_Lk)

——————  
**Timestamps**

00:00 Intro: About The Tutorial  
00:27 What is UFW?  
01:20 Two Layers of Protection  
02:26 Network vs. OS Level Firewalls  
03:08 Prerequisites  
03:54 Confirm Outer Firewall is Active  
04:57 Firewall Rules (Outer)  
06:35 Check UFW Status  
07:00 VPS Terminal  
07:17 FYI: Why Sudo?  
07:52 Root vs. Sudo User  
09:30 Check Current Status  
10:16 Critical Note: SSH  
11:02 Locked Out of SSH?  
11:26 Secure Your SSH  
11:48 Allow OpenSSH (Port 22)  
12:24 Enable UFW (Inner Firewall)  
13:16 Open Web Ports  
13:45 Allow Port 80 (HTTP)  
14:11 Allow 443 (HTTPS)  
14:25 Verify & Audit  
15:03 Set Default UFW Rules  
16:12 Core Commands CheatSheet

** **

## Connect to Your VPS Terminal

Open the terminal in your Hostinger dashboard, or SSH in.

------------------------------------------------------------------------

## Check UFW Status

``` language-bash
sudo ufw status verbose
```

**What you might see:**

| Result              | Meaning                                          |
|---------------------|--------------------------------------------------|
| `inactive`          | Normal — UFW is installed but not running        |
| `active`            | UFW is already running                           |
| `command not found` | UFW isn't installed — run `sudo apt install ufw` |

> ⚠️ **Do NOT run `sudo ufw enable` yet.** You must allow SSH first or you'll lock yourself out of your VPS.

------------------------------------------------------------------------

## Step 1: Allow SSH (Port 22)

``` language-bash
sudo ufw allow OpenSSH
sudo ufw allow 22/tcp #does the exact same thing as OpenSSH
```

This opens port 22 so your SSH connection isn't cut off when you enable the firewall.

------------------------------------------------------------------------

## Step 2: Set Default Behavior

Block all incoming traffic. Allow all outgoing.

``` language-bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
```

------------------------------------------------------------------------

## Step 3: Open Ports 80 & 443

A port is just a door into your server. Open only the ones you need.

| Port | Purpose | Command |
|----|----|----|
| 22 | SSH remote access | `sudo ufw allow OpenSSH` *(already done)* |
| 80 | HTTP / Let's Encrypt SSL validation | `sudo ufw allow 80/tcp` |
| 443 | HTTPS / custom domain traffic | `sudo ufw allow 443/tcp` |

``` language-bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

------------------------------------------------------------------------

## Step 4: Enable UFW

``` language-bash
sudo ufw enable
```

- Type `Y` and press Enter when prompted
- It'll warn you about disrupting SSH connections — that's fine, you already allowed port 22

------------------------------------------------------------------------

## Step 5: Verify Your Rules

``` language-bash
sudo ufw status verbose
```

You should see ports 22, 80, and 443 listed as **ALLOW**. Everything else is blocked by default.

> 📝 Note: If something goes wrong on Hostinger, you can recover using the browser terminal — but don't rely on that. Do it right the first time.

------------------------------------------------------------------------

## Core Commands Reference

UFW Maintenance

### Check status

``` language-bash
sudo ufw status
sudo ufw status verbose
```

### Allow a port

``` language-bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
```

### Remove a rule or disable

``` language-bash
sudo ufw delete allow 80/tcp
sudo ufw reset
sudo ufw disable
```

------------------------------------------------------------------------

## Complete Setup Summary

``` language-bash
sudo ufw allow OpenSSH
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status verbose
```
