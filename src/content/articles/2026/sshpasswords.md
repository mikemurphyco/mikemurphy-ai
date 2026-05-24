---
title: "How To Disable SSH Password Login on Hostinger VPS"
description: "In this tutorial, you will learn how to disable SSH password login on your Hostinger VPS so that only SSH keys are accepted as credentials. Passwords can be guessed or hacked, and removing them as an option eliminates that risk entirely, leaving SSH keys as the only way in."
pubDate: "2026-04-10T06:30:26"
updatedDate: "2026-04-09T20:25:08"
draft: false
type: "post"
slug: "sshpasswords"
permalink: "/sshpasswords/"
legacyPermalink: "https://www.mikemurphy.co/sshpasswords/"
canonicalUrl: "https://mikemurphy.ai/sshpasswords/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2026/04/SSH-PASSWORDS.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2026/04/SSH-PASSWORDS.jpg"
categories: 
  - "AI"
  - "Hostinger VPS"
tags: 
  - "security"
  - "ssh"
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
  id: "215431"
  postType: "post"
  rawWordCount: 506
seo:
  legacyTitle: "How To Disable SSH Password Login on Hostinger VPS - Mike Murphy Co"
  legacyH1: "How To Disable SSH Password Login on Hostinger VPS"
  legacyCanonical: "https://www.mikemurphy.co/sshpasswords/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 518
youtube: 
  - "https://youtu.be/28dKE3Owugg"
---
<https://youtu.be/28dKE3Owugg>

**Description  
**

In this tutorial, you will learn how to disable SSH password login on your Hostinger VPS so that only SSH keys are accepted as credentials. Passwords can be guessed or hacked, and removing them as an option eliminates that risk entirely, leaving SSH keys as the only way in.

🧠 **What You Will Learn**

- SSH and SSH keys: a quick refresher on what they are and why they matter
- Why disable passwords... removing the weakest link from your security stack
- SSH config file: finding the password authentication setting and editing it
- The override gotcha: the drop-in config file most tutorials miss
- Nano text editor: making, saving, and committing config changes
- Testing the result: confirming passwords are fully blocked and SSH keys still work

🔗 **Links**

**🌐 Hostinger VPS (Affiliate Link):**  
[https://www.hostg.xyz/SHIDN](https://www.hostg.xyz/SHIDN)

**How To Add Firewall Rules on Hostinger VPS:**   
[https://youtu.be/bjMGvwHKXyY](https://youtu.be/bjMGvwHKXyY)

**How To Install Fail2Ban on Hostinger VPS:**  
[https://youtu.be/E0bRbhOgsVI](https://youtu.be/E0bRbhOgsVI)

**⏱️ Timestamps**  
00:00 Intro: About The Tutorial  
01:13 SSH & SSH KEYS 101  
02:20 MacOS Terminal: SSH  
03:54 Why Disable SSH Passwords?  
05:28 Termius: SSH Client  
06:10 Step 1: Verify SSH Keys Work  
07:05 Step 2: Check SSH Config  
07:43 Gotcha Moment (Hashtag)  
08:48 Step 3: Open SSH Config File  
11:15 Attention: It didn't work!!  
12:12 Ask Kodee  
12:58 Checking Config Files  
14:14 Step 7: Search For Drop-In File  
15:43 Step 7b. Edit Drop-In Config File  
16:42 Recheck Source of Truth  
17:43 Test: MacOS Terminal  
19:14 Prove It: Connect via SSH  
19:56 Final Test: Termius  
20:38 Change Your Mind? Reverse Steps

**\# Verify key login works first (second terminal)**  
ssh your-username@your-vps-ip

**\# Check current setting in main config**  
sudo grep -i passwordauthentication /etc/ssh/sshd_config

**\# Edit the main config**  
sudo nano /etc/ssh/sshd_config

\# → Set: PasswordAuthentication no

**Save & Exit Nano Text Editor:**

``` language-bash
Ctrl + O    # Write out (save)
Enter       # Confirm filename
Ctrl + X    # Exit nano
```

------------------------------------------------------------------------

##  

**\# Check source of truth — what SSH will actually enforce**  
sshd -T \| grep -i passwordauthentication

**\# If it still says "yes", find and fix the drop-in override**  
grep -RniE '^\[\[:space:\]\]\*PasswordAuthentication\b' /etc/ssh/sshd_config /etc/ssh/sshd_config.d  
sudo nano /etc/ssh/sshd_config.d/50-cloud-init.conf  
**\# → Set: PasswordAuthentication no**

**\# Confirm source of truth now shows "no**"  
sshd -T \| grep -i passwordauthentication

**\# Restart SSH**  
sudo systemctl restart ssh

**\# Test password is blocked (second terminal)**  
ssh -o PreferredAuthentications=password -o PubkeyAuthentication=no your-username@your-vps-ip
