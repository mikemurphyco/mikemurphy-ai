---
title: "How to Backup & Uninstall Claude Code (Mac & Windows)"
description: "In this tutorial, I'll walk you through how to take inventory of your current Claude Code setup, create a full backup of your settings and custom skills, and do a clean uninstall on both Mac and Windows."
pubDate: "2026-02-25T06:45:27"
updatedDate: "2026-02-24T19:58:32"
draft: false
type: "post"
slug: "claudecodebackup"
permalink: "/claudecodebackup/"
legacyPermalink: "https://www.mikemurphy.co/claudecodebackup/"
canonicalUrl: "https://mikemurphy.ai/claudecodebackup/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2026/02/CLAUDE_BACKUP.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2026/02/CLAUDE_BACKUP.jpg"
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
  id: "215369"
  postType: "post"
  rawWordCount: 537
seo:
  legacyTitle: "How to Backup & Uninstall Claude Code (Mac & Windows) - Mike Murphy Co"
  legacyH1: "How to Backup & Uninstall Claude Code (Mac & Windows)"
  legacyCanonical: "https://www.mikemurphy.co/claudecodebackup/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 567
youtube: 
  - "https://youtu.be/QdAtrdBHjBY"
---
<https://youtu.be/QdAtrdBHjBY>

 

**Description:**

Before you wipe your computer or move to a new machine, make sure your Claude Code settings are safe. In this tutorial, I'll walk you through how to take inventory of your current Claude Code setup, create a full backup of your settings and custom skills, and do a clean uninstall on both Mac and Windows.

If you're switching machines, starting fresh, or just want a clean slate before reinstalling, this is the process to follow before you touch anything.

------------------------------------------------------------------------

**What You'll Learn:**

- How to check your Claude Code version and confirm which installer you used (npm or native)
- How to view your global config settings and custom skills before you back up
- What gets removed during uninstall and what stays untouched (project files and Claude Desktop are safe)
- How to create a backup folder and copy your entire .claude directory in one command
- How to reveal hidden files on Mac to confirm your backup actually worked
- How to uninstall Claude Code cleanly for both the native installer and the npm installer
- How to verify Claude Code has been fully removed from your system

------------------------------------------------------------------------

**Key Commands:**

Check version:

```
claude --version
```

Check install location (Mac):

```
which claude
```

Check install location (Windows):

```
where claude
```

View Claude Code settings:

```
ls -la ~/.claude/
```

Create backup folder:

```
mkdir -p ~/claude-backup
```

Backup all Claude Code data:

```
cp -R ~/.claude ~/claude-backup/
```

------------------------------------------------------------------------

🔗 **Links Mentioned**

How to Install Claude Code (Native Installer): \[link coming soon\]  
How to Restore Claude Code from Backup: \[link coming soon\]

------------------------------------------------------------------------

⏱️ **Timestamps**

00:00 Intro: About This Tutorial  
00:14 Who Is This For?  
00:42 Prepare For Backup  
00:56 Check Current Version of Claude Code  
01:17 Which (Where) Claude  
02:32 Global Config Settings  
02:52 What is Removed & What is Not?  
03:24 Backup Location  
04:29 Backup Al Claude Code Data  
05:52 Confirm Backup Worked  
07:06 Uninstall (Clean Removal)  
08:38 Remove Claude Code  
09:27 Verify Removal

### 🪜**The Step-By-Step:**

1.  Run `claude --version` to note your current version
2.  Run `which claude` (Mac) or `where claude` (Windows) to confirm which installer you used
3.  Run `ls -la ~/.claude/` to view your global config, history, and custom skills
4.  Create a backup folder: `mkdir -p ~/claude-backup`
5.  Copy all Claude Code data: `cp -R ~/.claude ~/claude-backup/`
6.  Open the backup folder in Finder or File Explorer and press Shift + Command + . (Mac) to show hidden files and confirm the .claude folder copied over
7.  Run `which claude` again to confirm your install type, then run the matching uninstall command (native installer or npm)
8.  Remove global settings, auth tokens, and cache using the three removal commands (covered at 08:38)
9.  Run `which claude` and `claude --version` to verify Claude Code has been fully removed
10.
