---
title: "Hostinger VPS: How To Generate & Add SSH Keys & Connect Remotely Using Termius"
description: "In this tutorial, you will learn how to generate SSH Keys, add the Public SSH Key to your Hostinger VPS Dashboard & How To Connect Remotely using the SSH Client, Termius."
pubDate: "2025-11-12T07:30:21"
updatedDate: "2025-11-12T00:47:03"
draft: false
type: "post"
slug: "sshkeys"
permalink: "/sshkeys/"
legacyPermalink: "https://www.mikemurphy.co/sshkeys/"
canonicalUrl: "https://mikemurphy.ai/sshkeys/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2025/11/SSH-KEYS.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2025/11/SSH-KEYS.jpg"
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
  id: "215137"
  postType: "post"
  rawWordCount: 713
seo:
  legacyTitle: "Hostinger VPS: How To Generate & Add SSH Keys & Connect Remotely Using Termius - Mike Murphy Co"
  legacyH1: "Hostinger VPS: How To Generate & Add SSH Keys & Connect Remotely Using Termius"
  legacyCanonical: "https://www.mikemurphy.co/sshkeys/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 747
youtube: 
  - "https://youtu.be/6--d2faQSFY"
---
<https://youtu.be/6--d2faQSFY>

## Hostinger VPS: How To Generate & Add SSH Keys & Connect Remotely Using Termius

**Description:**  
In this tutorial, you will learn how to generate SSH Keys, add the Public SSH Key to your Hostinger VPS Dashboard & How To Connect Remotely using the SSH Client, Termius.

**Hostinger VPS (Discount Referral Lin):**  
[https://mikemurphy.co/vps](https://mikemurphy.co/vps)  
DISCOUNT7 (Discount code)

**SSH Client:**  
Termius ([https://termius.com/](https://termius.com/))

**What is SSH?:**  
SSH, or Secure Shell, is a cryptographic network protocol used to securely access and manage computers or servers over unsecured networks, such as the internet.

**Why Are SSH Keys?:**  
SSH keys are cryptographic credentials used in the SSH protocol for secure authentication and encrypted communications. Each SSH key pair consists of a public key, which can be shared with servers, and a private key, which must be kept secret by the user to ensure secure remote access without transmitting passwords over the network.

**Snippets:**

- ssh-keygen -t ed25519 -C "[you@youremail.com](mailto:you@youremail.com)" (Generate Keys)
- pbcopy \< ~/.ssh/id_ed25519.pub (Copy Public Key To Clipboard)
- open ~/.ssh (Open .ssh Directory)

**How To Add Firewall Rules on Hostinger VPS:**  
[https://youtu.be/bjMGvwHKXyY](https://youtu.be/bjMGvwHKXyY)

**Hostinger Support Article:**  
[https://www.hostinger.com/support/5634532-how-to-generate-ssh-keys-and-add-them-to-hostinger-hpanel/](https://www.hostinger.com/support/5634532-how-to-generate-ssh-keys-and-add-them-to-hostinger-hpanel/)

**Part 1:** Create SSH Keys in Terminal (Private & Public)  
**Part 2:** Add SSH Key in Hostinger & Allow Port 22 on Firewall  
**Part 3:** Connect to VPS Remotely using SSH Key & Termius (SSH Client)

**In this tutorial, you'll learn:**

- What is SSH & SSH Keys?
- How To Generate SSH Keys in the Terminal
- How Do Add Public Key To Hostinger VPS
- How To Confirm Port 22 is Open on VPS
- How To Add Add Private Key to Termius SSH Client
- How To Connect to VPS Remotely Using SSH & SSH Keys as Credentials

——————

——————  
✅ **Chapters:**  
00:00 Intro: About The Tutorial  
00:16 Tutorial Breakdown  
01:05 Part 1: What Are SSH Keys?  
01:28 Public & Private Keys  
02:13 Types of SSH Keys  
02:30 How To Create SSH Keys  
03:37 Where to find 'keygen' snippet on VPS  
04:06 Generate SSH Keys (Terminal)  
04:55 Tap Return 3 Types  
05:11 Key Fingerprint & Randart  
05:30 Copy Public Key To Clipboard  
05:59 What is pbcopy in Terminal?  
06:33 Ctrl + C (Terminal Cursor)  
06:43 Open /.ssh Folder  
07:22 Open Public Key in Text Editor  
07:36 Part 2: Add SSH Keys To VPS  
08:01 Paste SSH Key & Name  
08:41 Confirm Port 22 is Open  
09:44 No Firewall Rules?  
10:13 Part 3: Connect Remotely Using SSH Client  
11:00 What is an SSH Client?  
11:32 VPS Phone Number (IP Address)  
12:01 Types of Credentials  
13:09 How Does SSH Client Connect?  
13:43 Create Host Connection in Termius  
14:04 IP Address on Hostinger VPS  
14:22 Where is Root Password?  
15:04 Host Details Sidebar  
15:24 Entter Host Details  
16:26 Add Private SSH Key  
17:00 New Key Options  
17:32 Import Private Key File  
17:57 Drag & Drop Private Key File  
18:37 Connect To VPS!  
19:10 Browser vs SSH Terminal  
19:45 SFTP

🪜 **How To Generate SSH Keys Using MacOS Terminal:**

1.  Open MacOS Terminal
2.  Enter 'ssh-keygen' snippet (look above) to generate keys
3.  Run 'pbcopy' snippet (above) to copy Public Key to clipboard

**How To Add SSH Keys To Hostinger VPS Dashboard:**

1.  Login to Hostinger VPS Dashboard
2.  Go to Overview
3.  Click on SSH Keys
4.  Click on +Add SSH Keys
5.  Paste Public Key
6.  Name Key (mike-macbook-key)
7.  Click 'Save' to add Public Key

**How To Connect To VPS Remotely Using Termius SSH Clientl:**

1.  Open SSH Client Termius ([https://termius.com](https://termius.com/))
2.  Create New Host
3.  Enter VPS IP Address
4.  Click 'Continue'
5.  Enter Host Details in right sidebar
6.  Confirm Port 22 is listed
7.  Add 'root' username
8.  Click +Key
9.  Enter name of key (mike-macbook-key)
10. Click 'Create New Key'
11. Select Import and drag & drop 'id_ed25519' Private Key File
12. Press 'Connect'
13. Voila!
