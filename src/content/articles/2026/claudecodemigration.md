---
title: "How To Migrate Claude Code From npm to Native Installer"
description: "In this tutorial, I will show you how to migrate your current version of Claude Code installed using the old npm package manger to the new Native Installer Version."
pubDate: "2026-01-30T22:14:53"
updatedDate: "2026-01-30T22:18:03"
draft: false
type: "post"
slug: "claudecodemigration"
permalink: "/claudecodemigration/"
legacyPermalink: "https://www.mikemurphy.co/claudecodemigration/"
canonicalUrl: "https://mikemurphy.ai/tutorials/claudecodemigration/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2026/01/CLAUDE_MIGRATE.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2026/01/CLAUDE_MIGRATE.jpg"
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
  id: "215316"
  postType: "post"
  rawWordCount: 360
seo:
  legacyTitle: "How To Migrate Claude Code From npm to Native Installer - Mike Murphy Co"
  legacyH1: "How To Migrate Claude Code From npm to Native Installer"
  legacyCanonical: "https://www.mikemurphy.co/claudecodemigration/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 388
youtube: 
  - "https://youtu.be/Gyh_ox9C1cI"
---
<https://youtu.be/Gyh_ox9C1cI>

**Description:  
**In this tutorial, I will show you how to migrate your current version of Claude Code installed using the old npm package manger to the new Native Installer Version.

**Problem:**  
When you launch Claude Code, you see an Alert Message about switching from npm to native installer.

**Fix:**  
Migrate Claude Code to Native Installer (claude install)

**📌 Links:**  
🔗 Official Claude Code Docs:  
[https://docs.anthropic.com/en/docs/claude-code/getting-started](https://docs.anthropic.com/en/docs/claude-code/getting-started)

**What You Will Learn:**

- Show Current State of Claude Code
- Run Migration Command (claude install)
- Run Diagnostics (claude doctor)
- Confirm Settings Preserved
- Uninstall Old npm Version

**⚡ Migration Command:**  
claude install

**[\#️⃣](app://obsidian.md/index.html#%EF%B8%8F%E2%83%A3) Check Version:**  
claude --version

**🛠️ Check Binary Location:**  
which claude (Mac)  
where claude (Win)

**🏥 Verify Installation:**  
claude doctor

**🔎 Verify Settings:**  
cat ~/.claude/settings.json

**🧹 Cleanup:**  
npm uninstall -g @anthropic-ai/claude-code

------------------------------------------------------------------------

**🕒 Timestamps:**  
00:00 Intro: About The Tutorial  
00:39 Reason For Alert Message  
00:49 Old vs. New Method  
01:24 Benefits of Native Installer  
01:51 Why Are You Seeing Message?  
02:18 What Does Migration Do?  
02:49 Purpose of Claude Install  
03:24 Preview of Migration Steps  
03:49 Check Version & Binary Location  
04:31 Migrate (Claude Install)  
05:19 Claude Doctor  
05:45 Check Version & Location  
06:07 Confirm Settings  
06:21 Remove Old npm Package  
07:37 Launch Claude Code

### 🪜**What You Will Learn:**

1.  1.  1\. Open MacOS Terminal

&nbsp;

1.  1.  2\. Check Claude Code Version (claude --version)

&nbsp;

1.  1.  3\. Check Binary Location (what/where claude)

&nbsp;

1.  1.  4\. Migrate Claude Code (claude install)

&nbsp;

1.  1.  5\. Verify Migration Success (claude doctory)

&nbsp;

1.  1.  6\. Confirm Settings Preserved

&nbsp;

1.  1.                 cat ~/.claude/settings.json

&nbsp;

1.  1.  7\. Remove npm Version

&nbsp;

1.  1.                npm uninstall -g @anthropic-ai/claude-code
