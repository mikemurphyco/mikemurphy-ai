---
title: "How to Restore Claude Code Settings From a Backup"
description: "In this tutorial, I'll show you how to restore all of your custom commands, skills, and settings from a backup folder on your computer. If you followed my previous video on backing up Claude Code before uninstalling, this is the next step."
pubDate: "2026-02-26T06:45:04"
updatedDate: "2026-02-25T22:00:05"
draft: false
type: "post"
slug: "claudecoderestore"
permalink: "/claudecoderestore/"
legacyPermalink: "https://www.mikemurphy.co/claudecoderestore/"
canonicalUrl: "https://mikemurphy.ai/claudecoderestore/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2026/02/CLAUDE_RESTORE.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2026/02/CLAUDE_RESTORE.jpg"
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
  id: "215377"
  postType: "post"
  rawWordCount: 489
seo:
  legacyTitle: "How to Restore Claude Code Settings From a Backup - Mike Murphy Co"
  legacyH1: "How to Restore Claude Code Settings From a Backup"
  legacyCanonical: "https://www.mikemurphy.co/claudecoderestore/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 522
youtube: 
  - "https://youtu.be/LkDIKZBQLic"
---
<https://youtu.be/LkDIKZBQLic>

 

**Description:  
**Reinstalling Claude Code doesn't have to mean starting from scratch.

In this tutorial, I'll show you how to restore all of your custom commands, skills, and settings from a backup folder on your computer. If you followed my previous video on backing up Claude Code before uninstalling, this is the next step.

------------------------------------------------------------------------

**What You'll Learn:**

- How to confirm Claude Code is installed and check its version on a fresh install
- How to verify your install method (native vs. npm) and what to do if you're on the older npm method
- How to check that your fresh Claude Code install is a blank slate before restoring
- How to restore all custom commands, skills, and settings with a single terminal command
- How to run Claude Doctor to confirm your restored install is healthy and working

------------------------------------------------------------------------

**Key Commands:**

**Check version:**

```
claude --version
```

**Check install location (Mac):**

```
which claude
```

**Check install location (Windows):**

```
where claude
```

**View Claude Code settings:**

```
ls -la ~/.claude/
```

**Check Global Config:**

``` language-bash
cat ~/.claude/settings.json
```

**Restore Everything:**

``` language-bash
cp -r ~/claude-backup/.claude ~/
```

**Verify everything:**

```
claude doctor
```

```
```

🔗 **Links Mentioned**

How to Backup & Uninstall Claude Code: [https://youtu.be/QdAtrdBHjBY](https://youtu.be/QdAtrdBHjBY)  
How to Install Claude Code (Native Installer): [https://youtu.be/uPpj6CZ6LLo](https://youtu.be/uPpj6CZ6LLo)

------------------------------------------------------------------------

⏱️ **Timestamps**  
00:00 Intro: About The Tutrial  
00:37 Confirm Claude Code Status  
01:11 Which Claude  
01:21 .local Directory (Native Installer)  
02:31 Restore Everything from Backup  
03:38 Claude Doctor

### 🪜**The Step-By-Step:**

1.  Open a terminal window on your computer.
2.  Confirm Claude Code is installed by running claude --version.
3.  Check where Claude Code was installed. On Mac, run which claude. On Windows, run where claude.
4.  Before restoring, confirm the fresh install is empty.
5.  Run ls -la ~/.claude/ to check for custom commands and skills
6.  Run cat ~/.claude/settings.json to check the settings file. Both should be blank or minimal.
7.  Run the restore command to copy everything from your backup folder into the Claude Code directory:
8.  cp -r ~/claude-backup/.claude ~/.
9.  The cp stands for copy and the -r flag means recursive, so it copies the entire folder and everything inside it.
10. Verify the restore worked by running the same two commands from Step 4 again.
11. You should now see your custom commands, skills, and settings populated.
12. Run claude doctor in the terminal to let Claude Code run a quick diagnostics check and confirm everything is working correctly.
13. Press Return to exit when done.
14.
