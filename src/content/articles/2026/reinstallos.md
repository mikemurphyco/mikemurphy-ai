---
title: "How to Reinstall or Change the OS on Your Hostinger VPS (Step-by-Step)"
description: "In this tutorial, I'll show you exactly how to reinstall your existing operating system or swap it out for a completely different one. Whether you're recovering from a bad setup, suspected malware, or just want to start fresh with n8n, Claude Code, or another app, this guide walks you through the entire process."
pubDate: "2026-03-10T06:30:14"
updatedDate: "2026-03-09T21:56:40"
draft: false
type: "post"
slug: "reinstallos"
permalink: "/reinstallos/"
legacyPermalink: "https://www.mikemurphy.co/reinstallos/"
canonicalUrl: "https://mikemurphy.ai/reinstallos/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2026/03/REINSTALL-UNINSTALL_VPS.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2026/03/REINSTALL-UNINSTALL_VPS.jpg"
categories: 
  - "AI"
  - "Hostinger VPS"
  - "Tutorials"
tags: []
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
  id: "215394"
  postType: "post"
  rawWordCount: 590
seo:
  legacyTitle: "How to Reinstall or Change the OS on Your Hostinger VPS (Step-by-Step) - Mike Murphy Co"
  legacyH1: "How to Reinstall or Change the OS on Your Hostinger VPS (Step-by-Step)"
  legacyCanonical: "https://www.mikemurphy.co/reinstallos/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 612
youtube: 
  - "https://youtu.be/sZhF8xG0zys"
---
<https://youtu.be/sZhF8xG0zys>

**Description:  
**Something broke on your Hostinger VPS, or you picked the wrong OS at signup, and now you need a clean slate.

In this tutorial, I'll show you exactly how to reinstall your existing operating system or swap it out for a completely different one. Whether you're recovering from a bad setup, suspected malware, or just want to start fresh with n8n, Claude Code, or another app, this guide walks you through the entire process.

------------------------------------------------------------------------

**What You'll Learn**

- Why reinstall — the most common reasons to wipe and start over
- What gets deleted — files, databases, Docker containers, config files
- What survives — IP address, DNS records, SSH keys, auto-backups
- Before you reinstall — how to back up n8n workflows and SFTP files
- Reinstall OS — step-by-step walkthrough in the Hostinger dashboard
- Change OS — how to swap to a different app template (n8n, Claude Code, etc.)
- Reinstall vs. Change OS — which one to use and when

------------------------------------------------------------------------

 

🔗 **Links**

Hostinger VPS (affiliate link):  
[https://www.hostg.xyz/SHIDN](https://www.hostg.xyz/SHIDN)

How to get started with your Hostinger VPS (SFTP setup):  
[https://youtu.be/UdM7Va4JXTI](https://youtu.be/UdM7Va4JXTI)

------------------------------------------------------------------------

⏱️ **Timestamps**

00:00 Intro: About The Tutorial  
00:22 Why Change or Reinstall OS?  
01:33 What does reinstall OS do?  
02:29 Before Reinstalling OS  
03:20 Auto-Backups & Snapshots  
04:02 IP Address & DNS  
04:20 What about Claude Code?  
04:35 How To Erase & Reinstall OS  
07:08 Accessing n8n After Reinstall  
07:47 IP Address, SSH, Backups  
08:29 How To Change VPS OS  
10:55 Reinstall vs Change OS

### 🪜**What You Will Learn:**

**To Reinstall Your Current OS:**

1.  Sign in to your Hostinger dashboard and click **Manage** on your VPS
2.  In the left sidebar, go to **OS and Panel**, then click **Operating System**
3.  Scroll to the bottom and click **Reinstall OS**
4.  Check the box confirming you understand all data will be deleted, then click **Next**
5.  Enter your root password and click **Confirm** (reset it from the Overview tab if needed)
6.  Wait 5–10 minutes for the reinstall to complete

**To Change to a Different OS or App Template:**

1.  From the left sidebar, go to **OS and Panel**, then **Operating System**
2.  Scroll down to the **Change OS** section
3.  Search for or browse the available templates (n8n, Claude Code, Docker, WordPress, etc.)
4.  Click your chosen template, then click **Change OS**
5.  Check the confirmation box, click **Next**, enter your root password, and click **Confirm**
6.  Wait 5–10 minutes for the new OS to install

**After Reinstalling or Changing OS:**

- Go to the **Overview** tab and click **Manage App** to launch and configure your new setup
- Check **Settings \> SSH** to confirm your SSH keys carried over
- Go to **Security \> Firewall** and reactivate your firewall rules if they are showing as inactive

**To Back Up n8n Workflows Before You Reinstall:**

- Open each workflow in n8n, click the ellipsis (three dots) in the top right, and choose **Download** to save the JSON file locally
- Connect via SFTP to save any Docker Compose YAML files or other configs you want to restore later
