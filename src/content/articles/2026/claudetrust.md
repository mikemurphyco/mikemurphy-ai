---
title: "Claude Code: How To Add Trusted Directories"
description: "In this tutorial, you will learn how to add Trusted Directories (Folders) to prevent Claude Code from asking 'Do You Trust Files?' when launching from a trusted directory."
pubDate: "2026-01-19T06:00:47"
updatedDate: "2026-01-29T07:12:10"
draft: false
type: "post"
slug: "claudetrust"
permalink: "/claudetrust/"
legacyPermalink: "https://www.mikemurphy.co/claudetrust/"
canonicalUrl: "https://mikemurphy.ai/claudetrust/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2026/01/TRUST.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2026/01/TRUST.jpg"
categories: 
  - "AI"
  - "Claude Code"
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
  id: "215261"
  postType: "post"
  rawWordCount: 330
seo:
  legacyTitle: "Claude Code: How To Add Trusted Directories - Mike Murphy Co"
  legacyH1: "Claude Code: How To Add Trusted Directories"
  legacyCanonical: "https://www.mikemurphy.co/claudetrust/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 349
youtube: 
  - "https://youtu.be/j-XErWms1gM"
---
<https://youtu.be/j-XErWms1gM>

**Description:**  
In this tutorial, you will learn how to add Trusted Directories (Folders) to prevent Claude Code from asking 'Do You Trust Files?' when launching from a trusted directory.

**Code Snippets:**  
nano ~/.claude/settings.json  
"trustedDirectories": \[/Users/homefolder/TrustedDirectory"\]

**Keyboard Shortcuts:**  
Show/Hide Hidden Files: Shift + Command + Period  
Print Working Directory (pwd)

**Nano Editor:**  
Write Out: Ctrl + O  
Write Files: Return  
Exit: Ctrl + X

**📌 Links:**

- Install Claude Code (Tutorial): [https://youtu.be/veztzLX4Kd4](https://youtu.be/veztzLX4Kd4)
- Claude Code: [https://www.anthropic.com/claude/code](https://www.anthropic.com/claude/code)
- -Get Hostinger VPS + n8n: [https://www.hostg.xyz/SHIDN](https://www.hostg.xyz/SHIDN)

**What You Will Learn:**

- Locate Claude Code Settings.json file
- Add Folder as Trusted Directory
- Save & Exit Nano Text Editor
- Launch Claude Code from Trusted Directory

------------------------------------------------------------------------

**🕒 Timestamps:**  
00:00 Intro: About The Tutorial  
00:54 The Fix: Overview  
02:20 Step 1: Open Terminal  
03:17 Finder Navigation  
03:44 Show & Hide Hidden Files/Folders  
05:15 Bonus Tip: Copy File Pathname  
05:53 Add Additional Trusted Directories  
06:14 Write Out & Exit Nano  
06:38 Quit & Relaunch Terminal  
06:58 Open Trusted Directory in Terminal  
07:07 Print Working Directory (pwd)  
07:54 Test Directory 'Inside' Trusted Directory

 

 

 

### 🪜**What You Will Learn:**

1.  Open Terminal
2.  Open Claude Settings File (nano ~/.claude/settings.json)
3.  Add "trustedDirectories": \[/Users/homefolder/TrustedDirectory"\]
4.  Write Out (Ctrl + O)
5.  Write Files (Return)
6.  Exit Nan (Ctrl + X)
7.  Open Trusted Directory in Terminal
8.  Launch Claude Code (claude)
9.  Claude should open without prompt: Do You Trust Files?
10. Exit Claude Code (/exit)
