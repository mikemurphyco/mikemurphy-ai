---
title: "Hostinger VPS: How To Install Claude Code Safely as a Non-Root User"
description: "In this tutorial, I'll walk you through creating a non-root user on your Hostinger VPS, setting up SSH access, and installing Claude Code safely so it runs with proper guardrails from day one. If you're already running Claude Code on your VPS as root, this is the video to watch before you go any further."
pubDate: "2026-03-19T06:30:01"
updatedDate: "2026-03-18T21:38:55"
draft: false
type: "post"
slug: "claudecodesudo"
permalink: "/claudecodesudo/"
legacyPermalink: "https://www.mikemurphy.co/claudecodesudo/"
canonicalUrl: "https://mikemurphy.ai/claudecodesudo/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2026/03/CLAUDE-CODE_SUDO.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2026/03/CLAUDE-CODE_SUDO.jpg"
categories: 
  - "AI"
  - "Claude Code"
  - "Hostinger VPS"
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
  id: "215409"
  postType: "post"
  rawWordCount: 868
seo:
  legacyTitle: "Hostinger VPS: How To Install Claude Code Safely as a Non-Root User - Mike Murphy Co"
  legacyH1: "Hostinger VPS: How To Install Claude Code Safely as a Non-Root User"
  legacyCanonical: "https://www.mikemurphy.co/claudecodesudo/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 903
youtube: 
  - "https://youtu.be/jaqQQ8LEdqA"
---
<https://youtu.be/jaqQQ8LEdqA>

**Description:  
**Running Claude Code as root on your VPS is a real security risk. In this tutorial, I'll walk you through creating a non-root user on your Hostinger VPS, setting up SSH access, and installing Claude Code safely so it runs with proper guardrails from day one. If you're already running Claude Code on your VPS as root, this is the video to watch before you go any further.

**What You Will Learn:**

- Root vs. non-root — why running Claude Code as root is dangerous
- Non-root user setup — create a user with its own directory
- Sudo privileges — borrow root access only when needed
- SSH key setup — copy your public key to the new user
- SSH config on Mac — add a shortcut for the new user
- Claude Code native install — recommended Linux method from the docs
- Authorization — sign in with Claude Pro or Max

**📌 Links:**  
🔗 Official Claude Code Docs:  
[https://docs.anthropic.com/en/docs/claude-code/getting-started](https://docs.anthropic.com/en/docs/claude-code/getting-started)

Get Hostinger VPS (n8n for free):  
[https://www.hostg.xyz/SHIDN](https://www.hostg.xyz/SHIDN)

▶️ Tutorials:

Hostinger VPS: How To Create a Non-Root Sudo User  
[https://youtu.be/00mrjyTB_Lk?si=zTtrJqPrlg_OOaVu](https://youtu.be/00mrjyTB_Lk?si=zTtrJqPrlg_OOaVu)

Hostinger VPS: How To Generate & Add SSH Keys  
[https://youtu.be/6--d2faQSFY](https://youtu.be/6--d2faQSFY)

How To Connect To Your Hostinger VPS Using SFTP:  
[https://youtu.be/5JVdlFoeYwU](https://youtu.be/5JVdlFoeYwU)

**Requirements:**  
Hostinger VPS  
Claude Subscription (Pro or Max)

**Claude Code Install Command:**  
curl -fsSL [https://claude.ai/install.sh](https://claude.ai/install.sh) \| bash

------------------------------------------------------------------------

🕒 Timestamps:  
00:00 Intro: About The Tutorial  
00:43 Root User  
01:24 Root User Risks  
02:07 Solution: Create Non-Root User  
03:20 Sudo Priveleges  
04:21 Step-By-Step Overview  
05:32 Prerequisites  
06:19 Check Username (whoami)  
06:45 Create & Save Password  
07:05 Create New User (VPS Terminal)  
08:15 GECOS Information  
08:58 Add To Sudo Group  
09:36 Switch Users  
10:54 SSH Keys  
12:35 How does SSH work?  
13:37 SSH Key + Multiple Users  
15:04 Edit .SSH Config (Mac)  
16:12 Copy Public SSH Key To New User  
19:08 Nano Editor SSH (Mac)  
21:23 Exit Nano Text Editor  
22:04 Test: SSH to VPS (Mac Terminal)  
23:07 Install Claude Code!!!  
24:59 Add Claude Code to PATH  
25:49 Launch Claude Code  
26:56 Authorize Claude Code (Browser)  
28:42 Confirm Claude Code Install  
30:46 Claude + Sudo Commands

**Check your current user:**

```
whoami
```

**Create a new non-root user:**

```
adduser mike
```

**Add user to the sudo group:**

```
usermod -aG sudo mike
```

**Switch to new user (with home directory):**

```
su - mike
```

**Copy public SSH key to new user's directory (run as root):**

```
mkdir -p /home/mike/.ssh
cp /root/.ssh/authorized_keys /home/mike/.ssh/authorized_keys
chown -R mike:mike /home/mike/.ssh
chmod 700 /home/mike/.ssh
chmod 600 /home/mike/.ssh/authorized_keys
```

**Edit SSH config on Mac (add new host shortcut):**

```
nano ~/.ssh/config
```

Add a new entry with your VPS IP address and new username, then save with `Ctrl+O` → `Return` → `Ctrl+X`

**Connect via SSH as the new user:**

```
ssh hostinger-vpn-mike
```

**Install Claude Code (native Linux install, run as non-root user):**

```
curl -fsSL https://claude.ai/install.sh | sh
```

**Add Claude Code to PATH (run the command provided after install):**

**Verify the install:**

```
claude --version
```

**Launch Claude Code:**

```
claude
```

**Run the health check inside Claude Code:**

```
/doctor
```

### 🪜 Step-by-Step:

1.  Open your Hostinger terminal and confirm you're signed in as root: `whoami`
2.  Create a new non-root user: `adduser [username]` and follow the prompts (have a strong password ready in your password manager)
3.  Add the new user to the sudo group: `usermod -aG sudo [username]`
4.  Switch to the new user to test: `su [username]`, confirm with `whoami`, then switch back to root: `su root`
5.  Copy your public SSH key from the root directory to the new user's directory using the five-line command block above (run this as root)
6.  On your Mac, open the SSH config file: `nano ~/.ssh/config` and add a new host entry with your VPS IP and new username, then save and exit
7.  Test the SSH connection from your Mac terminal: `ssh [your-new-host-alias]` and confirm with `whoami`
8.  Switch to the non-root user in your terminal: `su - [username]` (the dash ensures you land in the user's home directory)
9.  Install Claude Code using the native Linux install command from the Anthropic docs, then run the PATH export command it gives you after installation
10. Launch Claude Code: `claude`, select your authorization method, and paste the URL into a browser to sign in with your Claude Pro or Max account
11. Run `/doctor` inside Claude Code to confirm everything is healthy, then `/exit` to return to the terminal
12. Switch back to root and run `claude --version` to confirm Claude Code is not installed there — only on your non-root user
