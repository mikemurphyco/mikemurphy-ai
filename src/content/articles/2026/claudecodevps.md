---
title: "How to Connect Claude Code to a Hostinger VPS (SSH + macOS Terminal)"
description: "In this tutorial, you will learn how to connect Claude Code to a Hostinger VPS using SSH and the macOS Terminal."
pubDate: "2026-01-01T06:45:15"
updatedDate: "2026-01-29T07:12:17"
draft: false
type: "post"
slug: "claudecodevps"
permalink: "/claudecodevps/"
legacyPermalink: "https://www.mikemurphy.co/claudecodevps/"
canonicalUrl: "https://mikemurphy.ai/claudecodevps/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2025/12/claude-code.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2025/12/claude-code.jpg"
categories: 
  - "AI"
  - "Claude Code"
  - "Hostinger VPS"
  - "MacOS Terminal"
  - "Termius SSH"
  - "Tutorials"
tags: []
topics: []
search:
  include: true
  boost: 1.0
migration:
  dryRun: false
  prioritySample: true
  review: false
  eraRule: "pubDate before 2025-01-01 is legacy; on/after is ai"
  source: wordpress-wxr
wp:
  id: "215240"
  postType: "post"
  rawWordCount: 474
seo:
  legacyTitle: "How to Connect Claude Code to a Hostinger VPS (SSH + macOS Terminal) - Mike Murphy Co"
  legacyH1: "How to Connect Claude Code to a Hostinger VPS (SSH + macOS Terminal)"
  legacyCanonical: "https://www.mikemurphy.co/claudecodevps/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 469
youtube: 
  - "https://youtu.be/5X1FgNwYnkc"
---
<https://youtu.be/5X1FgNwYnkc>

**Description:**  
In this tutorial, you will learn how to connect Claude Code to a Hostinger VPS using SSH and the macOS Terminal.

**📌 Links:**

- Get Hostinger VPS + n8n: [https://www.hostg.xyz/SHIDN](https://www.hostg.xyz/SHIDN)
- SSH Keys (Tutorial): [https://youtu.be/6--d2faQSFY](https://youtu.be/6--d2faQSFY)
- What the Heck is Traefik?: [https://youtu.be/i515M0FwK7s](https://youtu.be/i515M0FwK7s)

**What You Will Learn:**

1.  Create custom SSH key
2.  Send public key to VPS
3.  Activate key on Mac
4.  Create server nickname
5.  Test connection
6.  Connect Claude to your VPS
7.  Manage servers with plain English
8.  Real workflow examples

**Real-world Use Case:**

- Check server health
- Monitor container status
- Review disk space
- Audit security
- Deploy new containers
- Update applications
- Verify services running
- Roll back if needed
- Investigate errors
- Check logs
- Test connectivity
- Find bottlenecks

### 🪜**What You Will Learn:**

## **Phase 1: SSH Setup**

1.  **Create SSH KEY:**
    1.  `ssh-keygen -t ed25519 -C "hostinger-vps-key"`
2.  **Send Key To VPS:**
    1.  `cat ~/.ssh/id_hostinger_vps.pub | pbcopy`
3.  **Add Public SSH Key To Hostinger VPS Dashboard**
    1.  Navigate to VPS → SSH Access
    2.  Click "Add SSH Key"
    3.  Paste key (Command + V)
    4.  Label it "My Mac"
    5.  Save
4.  **Tell Mac To Use This Key**
    1.  `ssh-add ~/.ssh/id_hostinger_vps`
5.  **Create Server Nickname (Edit Config File)**
    1.  `nano ~/.ssh/config`

**Add This:**

- Host hostinger-vps
- HostName YOUR_VPS_IP_ADDRESS
- User root
- IdentityFile ~/.ssh/id_hostinger_vps

6.  **Test Connection**
    1.  `ssh hostinger-vps`

## **Phase 2: Launch Claude Code**

6.  In MacOS Terminal, enter 'claude'
7.  Tell Claude to 'connect to hostinger-vps'  
      
    6.  List all running Docker containers
    7.  Check disk usage
    8.  Show system uptime and load averages
    9.  Check for pending OS security updates
    10. Display memory usage
8.  Exit when finished

**⏰ Timestamps:**

00:00 Intro: About The Tutorial  
00:23 What You Will Learn  
01:30 Why This Setup?  
02:50 Step 1: Create SSH Key  
04:15 .SSH Directory (Folder)  
04:58 List SSH Keys (Terminal Command)  
05:28 Step 2: Send Key To VPS  
07:09 Step 3: Tell Mac To Use SSH Key  
07:45 Step 4: Create Server Nickname  
08:32 Edit Config File in Nano Editor  
09:57 IP Address & User Name (VPS)  
11:10 Step 5: Test SSH Connection  
13:45 System Restart Using Terminal  
15:06 Phase 2: Claude Code  
16:32 Chat with Claude Code about VPS  
18:16 Update VPS Using Claude Code  
19:37 Clean Up VPS Disk Space (Claude Code)  
23:36 Termius (SSH Client) vs. Terminal
