---
title: "How To Prune n8n & Docker Images on Hostinger VPS"
description: "Learn how to prune dangling Docker images that pile up on a Hostinger VPS after updates for n8n, Ollama, Traefik, and other containers."
pubDate: "2026-05-13T06:30:20"
updatedDate: "2026-05-13T02:46:40"
draft: false
type: "post"
slug: "prune"
permalink: "/prune/"
legacyPermalink: "https://www.mikemurphy.co/prune/"
canonicalUrl: "https://mikemurphy.ai/tutorials/prune/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2026/05/prune.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2026/05/prune.jpg"
categories:
  - "AI"
  - "Docker"
  - "Hostinger VPS"
  - "n8n"
  - "Ollama"
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
  source: wordpress-rest-recent-gap
wp:
  id: "215482"
  postType: "post"
  rawWordCount: 361
seo:
  legacyTitle: "How To Prune n8n & Docker Images on Hostinger VPS - Mike Murphy Co"
  legacyH1: "How To Prune n8n & Docker Images on Hostinger VPS"
  legacyCanonical: "https://www.mikemurphy.co/prune/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 1619
youtube:
  - "https://youtu.be/oOAv5fdkY5Y"
---

https://youtu.be/oOAv5fdkY5Y

**Description**
In this tutorial, you will learn how to prune dangling Docker images that pile up on your Hostinger VPS after running updates. If you update n8n, Ollama, Traefik, or any other Docker containers, the old image versions stay behind taking up disk space. Time to clean them up.

**🧠 What You Will Learn**

- What are dangling Docker images?
- How to check for reclaimable space on your VPS
- How to list running containers and image tags
- What is untagged?
- Prune & clean up in one command
- How to update n8n and friends
- How To Run Final Check for Free Space

------------------------------------------------------------------------

🔗 **Links**

🌐 Hostinger VPS (Affiliate Link):\
<a href="https://www.hostg.xyz/SHIDN" class="external-link" target="_blank" rel="noopener nofollow">https://www.hostg.xyz/SHIDN</a>

------------------------------------------------------------------------

**⏱️ Timestamps:**

00:00 Intro: About The Tutorial\
00:32 Tue Problem: Dangling Images\
00:59 Docker Compose Image Tag\
01:50 The Dangling n8n Story\
02:35 Sign In To VPS & Launch Terminal\
03:00 Docker Size Check (Before)\
05:26 Docker List\
06:33 Update n8n\
07:27 Check for Reclaimable Space

### **💻 Commands Used**

**Check Docker disk usage:**\
`docker system df`

**Verbose disk usage breakdown:**\
`docker system df -v`

**List running containers and image tags:**\
`docker ps`

**List dangling (untagged) Docker images:**\
`docker images -f dangling=true`

**Update an app in Docker (run from inside the app’s directory):**\
`docker compose pull`\
`docker compose stop`\
`docker compose up -d`\
`docker image prune -f`

**Update with no downtime (skip the stop):**\
`docker compose pull`\
`docker compose up -d`

**Prune all dangling Docker images:**\
`docker image prune -f`

**Questions, Comments, Feedback?**
<hello@mikemurphy.co>

**My Gear List:**
<https://mikemurphy.co/resources>

**My Amazon Store:**
<https://www.amazon.com/shop/mikemurphyco>

**My YouTube Channel:**
[https://youtube.com/mikemurphyco](https://mikemurphy.co/youtube)
