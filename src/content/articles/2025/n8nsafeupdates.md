---
title: "How To Safely Update n8n on Hostinger VPS (Without Losing Your Workflows)"
description: "In this tutorial, you will learn about Docker about the process of updating self-hosted version of n8n on Hostinger VPS and learn why it is safe."
pubDate: "2025-09-29T06:00:19"
updatedDate: "2025-09-28T23:01:17"
draft: false
type: "post"
slug: "n8nsafeupdates"
permalink: "/n8nsafeupdates/"
legacyPermalink: "https://www.mikemurphy.co/n8nsafeupdates/"
canonicalUrl: "https://mikemurphy.ai/articles/n8nsafeupdates/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2025/09/UPDATE-N8N.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2025/09/UPDATE-N8N.jpg"
categories: 
  - "AI"
  - "Docker"
  - "Hostinger VPS"
  - "n8n"
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
  id: "215021"
  postType: "post"
  rawWordCount: 528
seo:
  legacyTitle: "How To Safely Update n8n on Hostinger VPS (Without Losing Your Workflows) - Mike Murphy Co"
  legacyH1: "How To Safely Update n8n on Hostinger VPS (Without Losing Your Workflows)"
  legacyCanonical: "https://www.mikemurphy.co/n8nsafeupdates/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 551
youtube: 
  - "https://youtu.be/9-u3BGl0ubU"
---
<https://youtu.be/9-u3BGl0ubU>

## How To Safely Update n8n on Hostinger VPS (Without Losing Your Workflows)

**Description:  
**In this tutorial, you will learn about Docker about the process of updating self-hosted version of n8n on Hostinger VPS and learn why it is safe.

**In this tutorial, you'll learn:**

- Is it safe to update n8n on Hostinger VPS?
- What are Docker Containers?
- What are Docker Volumes?
- How To Update n8n on Hosting VPS?
- How To Use Browser Terminal & Dashboard To Inspect Docker
- Why it is safe to update n8n.

**How To Update N8N (Docker Version)  
**[https://support.hostinger.com/en/articles/11767754-how-to-update-n8n](https://support.hostinger.com/en/articles/11767754-how-to-update-n8n) 

**How To Update N8N on Hostinger VPS (Tutorial):  
**[https://youtu.be/tsSo9tC8J3g?si=CY557wDye9r0fk-6](https://youtu.be/tsSo9tC8J3g?si=CY557wDye9r0fk-6)

**Docker:**  
[https://www.docker.com/](https://www.docker.com/)

**n8n**  
[https://n8n.io](https://n8n.io/)  
——————

**List Docker Containers:** `docker ps`  
**List Docker Volumes:** `docker volume ls`  
**Inspect Volumes:** `docker volume inspect n8n_data`  
**Peek Inside Volumes:** `ls /var/lib/docker/volumes/n8n_data/_data`

——————  
✅ **Chapters:**  
00:00 Intro: About The Tutorial  
00:40 Is Your N8N Data Safe?  
00:57 What You Will Learn  
01:14 What is N8N?  
01:30 What is Hostinger VPS?  
02:03 What is Docker?  
02:17  Installing Hostinger VPS  
02:55  Check VPS OS & N8N  
03:13 What is a Docker Container?  
03:49 What is in Docker Volume?  
04:16 VPS + Container + Volume  
04:41 What is Persistent Storage?  
05:24 Updating N8N Walkthrough  
06:56 Docker Volume Role  
07:41 List Docker Containers  
08:04 Terminal_List Docker Containers  
08:27 Terminal_List Docker Volumes  
08:59 Terminal_Inspect Volumes  
09:29 Terminal_Peek Inside  
09:43 Docker Manager_Containers  
10:33 Docker Manager_Volumes  
11:19 Murphy's Law + Question  
11:59 Recap_How To Confirm N8N Setup  
12:41 Bonus: Update Demo  
13:22 Did Docker Volumes Get Removed?  
13:55 Recap of Update Steps

** **

🪜**How To Update N8n on Hostinger VPS:**

1.  Visit [Hostinger.com](http://hostinger.com/) 
2.  Sign In To Account
3.  Click ‘Browser Terminal’ to launch Terminal
4.  Visit: [https://support.hostinger.com/en/articles/11767754-how-to-update-n8n](https://support.hostinger.com/en/articles/11767754-how-to-update-n8n) 
5.  Follow the Steps (copy & paste)
6.  Pull the latest version of the n8n image `docker compose pull`
7.  Stop and remove the currently running containers: `docker compose down`
8.  Start n8n with the updated image: `docker compose up -d`
9.  Return to Hostinger
10. Click on ‘Manage App’ 
11. Confirm n8n has been updated

**How To Check Docker Containers in Terminal:**

1.  Visit [Hostinger.com](http://hostinger.com/) 
2.  Sign In To Account
3.  Click ‘Browser Terminal’ to launch Terminal
4.  **List Docker Containers:** `docker ps`
5.  **List Docker Volumes:** `docker volume ls`

**How To Check Docker Containers in VPS Dashboard:**

1.  Visit [Hostinger.com](http://hostinger.com/) 
2.  Sign In To Account
3.  Click ‘VPS' in the Sidebar
4.  Click on 'Docker Manager'
5.  Twirl open 'Root'
6.  Click 'Manage'
7.  Locate 'n8n' and click 'Edit'
8.  Image = Docker Container
9.  Volume = Docker Volume
