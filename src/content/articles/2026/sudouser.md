---
title: "Hostinger VPS: How To Create a Non-Root Sudo User"
description: "In this tutorial, I'll show you how to create a non-root sudo user on your Hostinger VPS and add it to the sudo group so it still has full admin privileges when you need them. If you've just set up a new VPS and want to follow security best practices from day one, this is your starting point."
pubDate: "2026-03-12T06:30:08"
updatedDate: "2026-03-11T18:12:02"
draft: false
type: "post"
slug: "sudouser"
permalink: "/sudouser/"
legacyPermalink: "https://www.mikemurphy.co/sudouser/"
canonicalUrl: "https://mikemurphy.ai/tutorials/sudouser/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2026/03/NON_ROOT_SSH.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2026/03/NON_ROOT_SSH.jpg"
categories: 
  - "AI"
  - "Hostinger VPS"
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
  id: "215401"
  postType: "post"
  rawWordCount: 818
seo:
  legacyTitle: "Hostinger VPS: How To Create a Non-Root Sudo User - Mike Murphy Co"
  legacyH1: "Hostinger VPS: How To Create a Non-Root Sudo User"
  legacyCanonical: "https://www.mikemurphy.co/sudouser/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 869
youtube: 
  - "https://youtu.be/00mrjyTB_Lk"
---
<https://youtu.be/00mrjyTB_Lk>

**Description:  
**

Logging into your VPS as root every time is one of the biggest security risks you can make.

In this tutorial, I'll show you how to create a non-root sudo user on your Hostinger VPS and add it to the sudo group so it still has full admin privileges when you need them. If you've just set up a new VPS and want to follow security best practices from day one, this is your starting point.

------------------------------------------------------------------------

**What You'll Learn**

- Root user — what it is and why using it daily is risky
- Sudo group — how to grant a normal user temporary admin privileges
- adduser — create a new username on your VPS
- usermod — add the new user to the sudo group
- SSH — sign in remotely as both root and your new user
- whoami — verify which user you're currently signed in as
- \$ vs. \# — how to read your terminal prompt at a glance
- sudo command — how to run admin commands without being root

------------------------------------------------------------------------

**Commands Used in This Video**

**Check current user:**

```
whoami
```

**Create new user:**

```
adduser [username]
```

**Add user to sudo group:**

```
usermod -aG sudo [username]
```

**SSH into VPS as root:**

```
ssh root@[your-vps-ip]
```

**SSH into VPS as new (non-root) user:**

```
ssh [username]@[your-vps-ip]
```

**Switch users inside the terminal:**

```
su - [username]
```

**Run a command with temporary root privileges:**

```
sudo [command]
```

**Exit SSH session or return to previous user:**

```
exit
```

------------------------------------------------------------------------

🔗 **Links**

Hostinger VPS (affiliate link):  
[https://www.hostg.xyz/SHIDN](https://www.hostg.xyz/SHIDN)

How To Install Fail2Ban (Reduce Brute Force Attacks)  
[https://youtu.be/E0bRbhOgsVI](https://youtu.be/E0bRbhOgsVI)

------------------------------------------------------------------------

⏱️ **Timestamps**  
00:00 Intro: About The Tutorial  
00:16 What is Root User?  
01:12 What is SUDO?  
01:56 Root vs. Sudo User  
02:57 Reasons For Creating New User  
03:24 Fail To Ban (Brute Force)  
04:17 Reason \#2: Safety Prevention  
05:23 How To Add New Non-Root User  
05:34 whoami  
05:56 Create Password in Advance  
06:25 Add New User  
06:43 Add New User  
07:19 Enter Password in Terminal  
07:48 GECOS Information  
08:24 Add User to Sudo Group  
09:52 Sign In Remotely Using SSH  
11:49 SSH (NON-ROOT)  
13:02 Exit SSH Connection  
13:45 How To Switch Users  
14:19 Sudo Command  
15:07 sudo whoami  
16:38 \$ vs. \#  
18:20 Update Packaage as Non-Root  
20:04 Recap: Root vs. Sudo User  
21:06 Root vs Sudo Users  
22:09 Security Benefits

### 🪜 Step-by-Step:

 

1.  Sign in to your Hostinger dashboard and click the Terminal button in the top right corner.
2.  Type `whoami` and press Return to confirm you're currently signed in as root.
3.  Before creating the new user, generate a strong password in your password manager (1Password is used in this video) and copy it to your clipboard.
4.  Run `adduser [username]` — replacing \[username\] with the name you want to use — and press Return.
5.  Paste in your new password when prompted. The terminal won't show any characters as you type. This is normal. Press Return.
6.  Paste the same password again when asked to confirm, then press Return. You'll see "password updated successfully." If you get a mismatch error, repeat the step.
7.  Work through the GECOS prompts (Full Name, Room Number, Work Phone, Home Phone, Other) by pressing Return to skip each one. When asked "Is the information correct?", type `Y` and press Return.
8.  Run `usermod -aG sudo [username]` to add your new user to the sudo group. The `-aG` flag appends the user to the group without removing them from any other groups.
9.  Open a local terminal on Mac or Command Prompt / PowerShell on Windows and test SSH as root: `ssh root@[your-vps-ip]`. Enter the root password when prompted.
10. Type `whoami` to confirm you're connected as root. Then type `exit` to close the SSH session.
11. Now SSH in using your new username: `ssh [username]@[your-vps-ip]`. Enter the new user's password when prompted.
12. Type `whoami` again. It should return your new username, confirming the login works.
13. Type `exit` to close that session and return to your local command line.
14. Back inside the Hostinger terminal, switch to the new user with `su - [username]`.
15. To run any admin-level command as the new user, prefix it with `sudo` (for example, `sudo apt update`). You'll be prompted for the user's password.
16. Watch the terminal prompt symbol: `$` means you're a normal user, `#` means you're root. The `~` before it means you're in the home directory.
17. To switch back to root from inside the new user session, type `exit`. The session will fall back to root automatically.
