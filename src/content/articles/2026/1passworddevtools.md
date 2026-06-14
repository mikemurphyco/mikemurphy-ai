---
title: "1Password Developer Tools: SSH Agent, CLI & Watchtower Setup"
description: "Stop managing SSH keys the hard way. In this tutorial, I'll walk you through enabling and setting up the 1Password Developer Tools."
pubDate: "2026-02-24T06:45:10"
updatedDate: "2026-02-24T19:47:56"
draft: false
type: "post"
slug: "1passworddevtools"
permalink: "/1passworddevtools/"
legacyPermalink: "https://www.mikemurphy.co/1passworddevtools/"
canonicalUrl: "https://mikemurphy.ai/tutorials/1passworddevtools/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2026/02/1PASSWORD.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2026/02/1PASSWORD.jpg"
categories: 
  - "1Password"
  - "AI"
  - "Macs & iOS"
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
  id: "215363"
  postType: "post"
  rawWordCount: 593
seo:
  legacyTitle: "1Password Developer Tools: SSH Agent, CLI & Watchtower Setup - Mike Murphy Co"
  legacyH1: "1Password Developer Tools: SSH Agent, CLI & Watchtower Setup"
  legacyCanonical: "https://www.mikemurphy.co/1passworddevtools/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 607
youtube: 
  - "https://youtu.be/rle97m_vKuE"
---
<https://youtu.be/rle97m_vKuE>

 

**Description:**

Stop managing SSH keys the hard way. In this tutorial, I'll walk you through enabling and setting up the 1Password Developer Tools — including the SSH Agent, CLI, Environments, Watchtower, and VS Code integration — so you can store and access all your SSH keys securely in one place, connect to GitHub and servers without passwords, and even reach your secrets directly from the terminal.

If you're already a 1Password user and you've been overlooking the Developer tab, this is the video for you. These tools are built right into 1Password and they make managing SSH keys, signing Git commits, and working with environment variables dramatically simpler and more secure.

------------------------------------------------------------------------

**What You'll Learn:**

- How to enable the 1Password Developer Tools (it takes one checkbox)
- SSH Agent — securely store, sync, and access SSH keys with biometric authorization
- How to add, import, or create new SSH keys inside 1Password
- The difference between private and public key pairs and how 1Password manages both
- Environments — how to manage your .env secrets inside 1Password (currently in beta)
- CLI — how to install the 1Password CLI via Homebrew and use `op` commands in the terminal
- Watchtower — your personal security guard for SSH keys that alerts you to risks and flags redundant files you can safely remove
- How to install and use the official 1Password extension inside VS Code

------------------------------------------------------------------------

**Install 1Password CLI (macOS via Homebrew):**

```
brew install 1password-cli
```

Confirm the install: `op --version`

------------------------------------------------------------------------

🔗 **Links Mentioned**

Try or Buy 1Password (affiliate link):  
[https://1password.partnerlinks.io/mikemurphy](https://1password.partnerlinks.io/mikemurphy)

1Password Developer Tools Docs:  
[https://developer.1password.com/](https://developer.1password.com/)

SSH Agent Docs:  
[https://developer.1password.com/docs/ssh/](https://developer.1password.com/docs/ssh/)

1Password CLI — Getting Started:  
[https://developer.1password.com/docs/cli/get-started/](https://developer.1password.com/docs/cli/get-started/)

------------------------------------------------------------------------

⏱️ **Timestamps**

00:00 About This Tutorial  
00:52 Enable Developer Tools  
01:30 Developer Tools Overview  
02:28 SSH Agent Manager  
03:21 Set Up SSH Agent  
04:32 Add, Import & Create SSH Keys  
05:09 Private + Public SSH Keys  
06:47 Environments  
07:23 Install CLI  
08:11 Turn On 1Password Integration  
09:08 Enter op Command in CLI  
09:44 op Help  
10:45 op Command Flags  
11:11 Watchtower  
12:57 Delete Redundant Keys  
13:43 1Password in VS Code

### 🪜**Step-By-Step:**

1.  Open 1Password and go to Settings
2.  Click Developer in the sidebar and tick "Show 1Password Developer Experience"
3.  Click SSH Agent → Set Up SSH Agent → Edit Automatically
4.  Add, import, or create SSH keys via New Item → SSH Key
5.  Drag a private key file directly onto 1Password to import it (the private key has no .pub extension)
6.  Click Environments → New Environment to begin managing .env secrets
7.  Install CLI: `brew install 1password-cli` — confirm with `op --version`
8.  Go to Settings → Developer → tick "Integrate with 1Password CLI"
9.  In terminal, run `op vault list` and click Authorize to link your vault
10. Run `op --help` to see all available commands and flags
11. Enable Watchtower → tick "Check for developer credentials"
12. Delete redundant SSH key files from disk using Watchtower's Delete from Disk option
13. In VS Code, search the Extensions marketplace for "1Password" and install the official extension
