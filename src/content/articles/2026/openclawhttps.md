---
title: "How To Deploy OpenClaw Securely with HTTPS & SSL on a Hostinger VPS"
description: "In this tutorial, you will learn how to convert insecure HTTP to HTTPS Custom Domain for OpenClaw Docker Container on a Hostinger VPS using Traefik (Reverse Proxy) & SSL Certificate."
pubDate: "2026-02-18T06:30:11"
updatedDate: "2026-02-17T21:21:39"
draft: false
type: "post"
slug: "openclawhttps"
permalink: "/openclawhttps/"
legacyPermalink: "https://www.mikemurphy.co/openclawhttps/"
canonicalUrl: "https://mikemurphy.ai/articles/openclawhttps/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2026/02/OPENCLAW_SSL_HTTPS.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2026/02/OPENCLAW_SSL_HTTPS.jpg"
categories: 
  - "Docker"
  - "Hostinger VPS"
  - "OpenClaw"
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
  id: "215355"
  postType: "post"
  rawWordCount: 447
seo:
  legacyTitle: "How To Deploy OpenClaw Securely with HTTPS & SSL on a Hostinger VPS - Mike Murphy Co"
  legacyH1: "How To Deploy OpenClaw Securely with HTTPS & SSL on a Hostinger VPS"
  legacyCanonical: "https://www.mikemurphy.co/openclawhttps/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 463
youtube: 
  - "https://youtu.be/LnUlz_EqBLY"
---
<https://youtu.be/LnUlz_EqBLY>

**Description:**  
In this tutorial, you will learn how to convert insecure HTTP to HTTPS Custom Domain for OpenClaw Docker Container on a Hostinger VPS using Traefik (Reverse Proxy) & SSL Certificate.

**What You Will Learn:**  
1. How To Convert HTTP to HTTPS  
2. How To Add A-Records & Create Subdomain  
3. How to Edit Docker-Compose.yml  
4. How does SSL Work?  
5. What are Environment Variables?  
6. How does Traefik Work  
7. What are Labels & Headers  
8. How & Why To Disable Ports  
9. How To Create Custom URL for any Docker Container

[Hostinger VPS (affiliate link)](https://www.hostg.xyz/SHIDN)  
Use coupon code DISCOUNT7 for an additional 7% offa

**⭐ Resources Mentioned:**

- [Download CheatSheet](https://bit.ly/dockeryaml)
- [How To Install OpenClaw on Hostinger VPS (Part 1)](https://youtu.be/XvEDmYObHaI)
- [What The Heck is Traefik?:](https://youtu.be/i515M0FwK7s)
- [How to Connect Custom Domains to Hostinger VPS](https://youtu.be/2XJbZIi5JBs)
- [How To Create Docker Network on VPS](https://youtu.be/nvdpOXk-fU4)

 

**—————🕰️ TimeStamps———————**  
00:00 Intro: About The Tutorial  
00:19 What is Docker Catalog?  
00:31 Problem To Fix  
01:29 Step-by-Step Overview  
02:54 Prerequisites (Requirements)  
04:39 One Traefik To Rule Them All  
05:39 How To Create A-Record (Subdomain)  
06:04 VPS IP ADDRESS  
06:35 Add A-Record  
08:23 View docker-compose.yml  
09:05 Traefik Container Configuration  
10:14 A-HA \#1: Certificate Resolvers  
10:47 How Does SSL Work?  
11:28 What are Environment Variables?  
12:49 SSL Storage Location  
13:03 SSL Process Explained  
13:46 Challenge \#1: HTTP (80)  
14:19 Challenge \#2: HTTPS (443)  
14:32 Challenge \#3: Domain Verification  
15:05 Traefik Roles Post-SSL  
16:21 Open Claw Deploy: Bare Bones  
18:16 The Essential Labels  
20:23 Internal vs. External Ports  
21:04 Security Headers  
25:27 OpenClaw: Edit docker-compose.yml  
26:24 Add Traefik Labels  
27:40 .yaml Syntax  
28:17 Environment Variables (.env)  
29:31 Stop & Restart Docker (Deploy)  
30:40 Delete Firewall Rule

### 🪜**What You Will Learn:**

1\. Add A-Record in DNS Manager  
2. Confirm SSL Email Address is in \`traefik\` Container  
3. Open OpenClaw \`docker-compose.yml\` file  
4. Comment Out Ports  
5. Add Network Configuration  
6. Add 5 Essential Labels  
7. Add Security Headers  
8. Add Environment Variables  
9. Deploy  
10. Delete Firewall Rule
