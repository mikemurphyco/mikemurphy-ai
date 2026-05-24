---
title: "How To Setup Tailscale on IOS, MacOS & Hostinger VPS"
description: "In this tutorial, you will learn how to set up a Tailscale private mesh network so all of your devices (iPhone, MacBook Pro, and a Hostinger VPS) can talk to each other from anywhere in the world over a free, private, and end-to-end encrypted network. No port forwarding, no firewall rules, and no exposed IP addresses."
pubDate: "2026-04-29T06:30:22"
updatedDate: "2026-04-28T21:38:00"
draft: false
type: "post"
slug: "tailscale"
permalink: "/tailscale/"
legacyPermalink: "https://www.mikemurphy.co/tailscale/"
canonicalUrl: "https://mikemurphy.ai/tailscale/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2026/04/TAILSCALE.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2026/04/TAILSCALE.jpg"
categories: 
  - "Hostinger VPS"
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
  id: "215454"
  postType: "post"
  rawWordCount: 471
seo:
  legacyTitle: "How To Setup Tailscale on IOS, MacOS & Hostinger VPS - Mike Murphy Co"
  legacyH1: "How To Setup Tailscale on IOS, MacOS & Hostinger VPS"
  legacyCanonical: "https://www.mikemurphy.co/tailscale/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 519
youtube: 
  - "https://youtu.be/3UePiR7_AFg"
---
<https://youtu.be/3UePiR7_AFg>

In this tutorial, you will learn how to set up a Tailscale private mesh network so all of your devices (iPhone, MacBook Pro, and a Hostinger VPS) can talk to each other from anywhere in the world over a free, private, and end-to-end encrypted network. No port forwarding, no firewall rules, and no exposed IP addresses.

🧠 **What You Will Learn**

- Tailscale: what a mesh VPN is and why it beats traditional VPNs
- WireGuard: the encryption powering your private network
- iPhone: install Tailscale and join the network
- MacBook Pro: install Tailscale and authenticate
- Hostinger VPS: install Tailscale from the terminal
- Tailscale CLI: sudo tailscale up, status, and logout
- Admin dashboard: rename machines for easy identification
- Private IPs: how devices talk without exposing anything publicly

------------------------------------------------------------------------

🔗 **Links**

**🌐 Hostinger VPS (Affiliate Link):**  
[https://www.hostg.xyz/SHIDN](https://www.hostg.xyz/SHIDN)

**Tailscale:**  
[https://tailscale.com](https://tailscale.com)

**⏱️ Timestamps  
**

00:00 Intro: About The Tutorial  
00:36 What is Tailscale?  
02:23 Traditional Setup vs Tailscale Mesh  
03:44 Prerequisites (Requirements)  
04:18 Step 1: Setup Tailscale on Mac  
05:01 Tailscale Plans (Free)  
06:14 Download & Install Tailscale  
07:10 Login & Connect To Tailnet  
08:51 Step 2: Setup on iPhone  
11:33 Step 3: Install on VPS  
12:26 VPS Terminal Install  
13:11 Bring Tailscale Up on VPS  
14:33 Rename Devices on Tailscale Network  
15:38 VPS: Check Status  
16:50 Outro

 

### What is Tailscale?

- A free VPN that creates a private **mesh network** across your devices
- Every device gets a fake IP address (`100.x.y.z`) that only your other devices can reach
- No port forwarding. No router config. No public IP exposure.
- Works across cellular, Wi-Fi, and wired connections — anywhere in the world
- Built on WireGuard under the hood, but you never have to think about that

##  

## Core Commands Reference

**VPS — check Tailscale status  
**`sudo tailscale status`  

**  
VPS — see your VPS's Tailscale IP  
**`tailscale ip -4`  

**VPS — bring Tailscale up or down  
**`sudo tailscale up`  
  
`sudo tailscale down`  

**VPS — log out and disconnect  
**`sudo tailscale logout`  

------------------------------------------------------------------------

## Complete Setup Summary

**On the VPS, the entire setup is just two commands:  
**`curl -fsSL https://tailscale.com/install.sh |`  
`sudo tailscale up`  

Then authenticate in the browser, and you're done. iPhone and Mac are point-and-click installs from the App Store and tailscale.com.
