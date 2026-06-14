---
title: "How to Secure Your Hostinger VPS with Firewall Rules (n8n Protection)"
description: "In this tutorial, you will learn how to add Firewall Rules on your Hostinger VPS to block unauthorized access and protect all of the services on your VPS."
pubDate: "2025-10-20T07:45:17"
updatedDate: "2025-10-19T22:01:40"
draft: false
type: "post"
slug: "vpsfirewall"
permalink: "/vpsfirewall/"
legacyPermalink: "https://www.mikemurphy.co/vpsfirewall/"
canonicalUrl: "https://mikemurphy.ai/tutorials/vpsfirewall/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2025/10/VPS_FIREWALL.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2025/10/VPS_FIREWALL.jpg"
categories: 
  - "AI"
  - "Hostinger VPS"
  - "n8n"
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
  id: "215071"
  postType: "post"
  rawWordCount: 628
seo:
  legacyTitle: "How to Secure Your Hostinger VPS with Firewall Rules (n8n Protection) - Mike Murphy Co"
  legacyH1: "How to Secure Your Hostinger VPS with Firewall Rules (n8n Protection)"
  legacyCanonical: "https://www.mikemurphy.co/vpsfirewall/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 666
youtube: 
  - "https://youtu.be/bjMGvwHKXyY"
---
<https://youtu.be/bjMGvwHKXyY>

## How to Secure Your Hostinger VPS with Firewall Rules (n8n Protection)

**Description:**  
In this tutorial, you will learn how to add Firewall Rules on your Hostinger VPS to **block unauthorized access** and protect all of the services on your VPS.

**What is a Firewall?**  
Firewalls act as the security blanket for your VPS, controlling which network and internet traffic is allowed or blocked based on a set of rules. This process is crucial because if your firewall is inactive, all 65,535 ports on your VPS are wide open and vulnerable to hackers, bots, and random internet noise.

**Why Add Firewall Rules?**  
If your firewall is inactive, all ports are wide open. This vulnerability means your VPS is weak and susceptible to malicious external traffic. Hackers scan for open ports and can easily bypass domain-level authentication to steal N8N credentials.

**Three essential firewall rules:**

• **Port 22:** Allows SSH access for remote login to your VPS. Add this rule first!  
• **Port 80:** Necessary for HTTP traffic and for Let's Encrypt to perform SSL certificate validation.  
• **Port 443:** Used for HTTPS or secure encrypted web traffic, allowing the use of a custom domain.

**In this tutorial, you'll learn:**

- What is a Firewall?
- How To Test N8N Vulnerability?
- How Do Firewalls Work?
- How To Add Firewall Rules
- How To Check n8n Exposure?
- How To Test Firewall?

**Hostinger VPS:**  
[https://mikemurphy.co/vps](https://mikemurphy.co/vps)

**SSH Client:**  
Termius ([https://termius.com/](https://termius.com/))  
——————

——————  
✅ **Chapters:**  
00:00 Intro: About The Tutorial  
00:19 What is a Firewall?  
01:09 How do Firewalls work?  
01:24 Inactive Firewalls = All Ports Open  
01:43 Active Firewall = Ports Blocked  
03:09 n8n = Port 5678  
03:45 Is your n8n exposed?  
04:00 VPS IP Address  
04:23 Terminal: curl_ip:5678  
05:45 VPS Dashboard: Firewall  
06:10 Firewall Rules: Open Ports  
07:14 Recap of Ports (22,80.4443)  
08:25 Add Firewall Rules  
09:07 Rule \#1: Port 22  
09:34 Default Policy Rule (Drop)  
10:19 Rule \#2: Port 80  
10:30 Rule \#3: Port 443  
10:46 Add Rules, Edit, Delete  
11:53 Test Firewall: SSH (Port 22)  
12:50 Test Port 443 (https://)  
13:29 Test n8n in Terminal  
14:10 Recap: Firewall

🪜 **How To Add Firewall Rules on Hostinger VPS**

1.  Sign in to your Hostinger dashboard.
2.  Click on VPS...Overview Page
3.  Twirl open Security, click on Firewall
4.  Click the plus sign +Add New Firewall Rule
5.  Give your firewall a name (n8n-firewall)  
    ◦ *Note:* Upon creation, a default rule with the action "drop" (block) is automatically created, blocking all incoming traffic.
6.  Click the ellipsis (three dots) next to the new firewall name and choose "edit" to add rules.
7.  **Add Rule 1 (Port 22):** Set the action to "Accept" (allow), Protocol to "TCP," Port to **22**, and Source to "Anywhere" (0.0.0.0/0), then click "Add rule".
8.  **Add Rule 2 (Port 80):** Set the action to "Accept," Protocol to "TCP," Port to **80**, and Source to "Anywhere," then click "Add rule".
9.  **Add Rule 3 (Port 443):** Set the action to "Accept," Protocol to "TCP," Port to **443**, and Source to "Anywhere," then click "Add rule".
10. To activate the firewall, toggle on. (may take up to 5 minutes)
11. Test your connections (e.g., SSH on port 22 using Termius HQ)
12. Test your connection (https://)
