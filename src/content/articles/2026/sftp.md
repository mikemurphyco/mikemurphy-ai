---
title: "How To Connect To Your Hostinger VPS Using SFTP (3 Methods)"
description: "In this tutorial, I'll show you three different ways to connect to your Hostinger VPS using SFTP (Secure File Transfer Protocol) so you can visually browse, edit, and manage your server files just like you would in Finder on your local machine. If you've been staring at the terminal wondering where everything on your VPS is, this video is for you."
pubDate: "2026-03-04T06:45:25"
updatedDate: "2026-03-03T22:03:55"
draft: false
type: "post"
slug: "sftp"
permalink: "/sftp/"
legacyPermalink: "https://www.mikemurphy.co/sftp/"
canonicalUrl: "https://mikemurphy.ai/sftp/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2026/03/SFTP_VPS.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2026/03/SFTP_VPS.jpg"
categories: 
  - "AI"
  - "Hostinger VPS"
  - "Termius SSH"
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
  id: "215386"
  postType: "post"
  rawWordCount: 627
seo:
  legacyTitle: "How To Connect To Your Hostinger VPS Using SFTP (3 Methods) - Mike Murphy Co"
  legacyH1: "How To Connect To Your Hostinger VPS Using SFTP (3 Methods)"
  legacyCanonical: "https://www.mikemurphy.co/sftp/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 647
youtube: 
  - "https://youtu.be/5JVdlFoeYwU"
---
<https://youtu.be/5JVdlFoeYwU>

**Description:**  
Can't figure out how to actually see all the files and folders on your Hostinger VPS?

In this tutorial, I'll show you three different ways to connect to your Hostinger VPS using SFTP (Secure File Transfer Protocol) so you can visually browse, edit, and manage your server files just like you would in Finder on your local machine. If you've been staring at the terminal wondering where everything on your VPS is, this video is for you.

------------------------------------------------------------------------

**What You'll Learn**

- FTP vs SFTP: why plain FTP is outdated and insecure
- SSH keys: how they replace passwords for SFTP connections
- Why a public/private key pair is far more secure than a username and password
- Termius (SSH client): How To Connect to VPS Using SFTP
- Cyberduck: How To Connect to VPS Using SFTP
- Transmit, Forklift, FileZilla: Alternative file manager.
- Terminal / PowerShell: How To Connect to VPS Using SFTP
- Bonus SSH tip: How To Connect To VPS in Terminal

------------------------------------------------------------------------

**Commands Used in This Video**

**Connect to VPS via SFTP (Terminal — Mac or Windows PowerShell):**

```
sftp root@YOUR_VPS_IP_ADDRESS
```

**List files once connected:**

```
ls
```

**Exit the SFTP session:**

```
exit
```

**Connect to VPS via SSH (Terminal — for terminal access, not file browsing):**

```
ssh root@YOUR_VPS_IP_ADDRESS
```

------------------------------------------------------------------------

🔗 **Links Mentioned**

**Hostinger VPS (affiliate link):**  
[https://www.hostg.xyz/SHIDN](https://www.hostg.xyz/SHIDN)

**How to Generate SSH Keys (full tutorial):**  
[https://youtu.be/6--d2faQSFY](https://youtu.be/6--d2faQSFY)

**Termius (SSH Client, free plan available):**  
[https://termius.com](https://termius.com/)

**Cyberduck (free, open-source file manager):**  
[https://cyberduck.io](https://cyberduck.io/)

------------------------------------------------------------------------

⏱️ **Timestamps**

00:00 Intro: About The Tutorial  
00:40 What is FTP?  
01:08 What is SFTP?  
02:06 Passwords vs. SSH Keys  
02:52 Add SFTP Credentials  
04:42 Tool \#1: SSH Client (Termius)  
05:37 SFTP (TERMIUS)  
06:49 Creating New Shortcut to SFTP  
08:02 Tool \#2: File Manager  
10:19 Add Docker Container  
11:14 Tool \#3: Terminal  
12:32 Connect using SSH in Terminal

 

### 🪜**What You Will Learn:**

1.  Log in to your Hostinger dashboard, navigate to your VPS overview, and note your IP address and SSH username (the default is `root`)
2.  Generate an SSH key pair on your local computer if you haven't already (see the SSH keys tutorial linked above)
3.  Add your public SSH key to your VPS through the Hostinger dashboard
4.  Choose your preferred method: an SSH client like Termius, a file manager like Cyberduck, or your built-in terminal
5.  Open a new connection in your chosen tool, select SFTP as the protocol, and enter your VPS IP address
6.  Enter `root` as the username (or whatever your SSH username is), then select your private SSH key instead of entering a password
7.  Click Connect and authenticate through your SSH key manager (such as 1Password) if prompted
8.  You're now browsing the root directory of your VPS. You can open, edit, download, or upload files directly
9.  To edit a file like a `docker-compose.yml`, click Open, make your changes in the text editor, and save. The updated file uploads to your server automatically
10. To disconnect from a terminal SFTP session, type `exit` and press Return

**A note of caution:** Any file you delete while connected over SFTP is deleted directly from your VPS. There's no trash or undo, so double-check before removing anything.
