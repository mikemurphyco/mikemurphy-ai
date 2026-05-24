---
title: "How to Change n8n Version Numbers on Hostinger VPS"
description: "In this tutorial, you will learn how to manually set, roll back, or \"pin\" the version of n8n on your self-hosted Hostinger Virtual Private Server (VPS) using the VPS Dashboard & Terminal/SSH."
pubDate: "2025-12-23T06:45:02"
updatedDate: "2026-01-29T07:12:20"
draft: false
type: "post"
slug: "n8nversions"
permalink: "/n8nversions/"
legacyPermalink: "https://www.mikemurphy.co/n8nversions/"
canonicalUrl: "https://mikemurphy.ai/n8nversions/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2025/12/n8n-VERSIONS.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2025/12/n8n-VERSIONS.jpg"
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
  prioritySample: false
  review: false
  eraRule: "pubDate before 2025-01-01 is legacy; on/after is ai"
  source: wordpress-wxr
wp:
  id: "215223"
  postType: "post"
  rawWordCount: 575
seo:
  legacyTitle: "How to Change n8n Version Numbers on Hostinger VPS - Mike Murphy Co"
  legacyH1: "How to Change n8n Version Numbers on Hostinger VPS"
  legacyCanonical: "https://www.mikemurphy.co/n8nversions/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 584
youtube: 
  - "https://youtu.be/tR0LnhlWzpA"
---
<https://youtu.be/tR0LnhlWzpA>

**Description:**  
In this tutorial, you will learn how to manually set, roll back, or "pin" the version of n8n on your self-hosted Hostinger Virtual Private Server (VPS) using the VPS Dashboard & Terminal/SSH.

**What You Will Learn:**

• How to locate current n8n version number  
• How to find n8n version numbers on GitHub  
• How to edit docker-compose YAML file in VPS Dashboard  
• How to set n8n version number & Deploy Docker containers  
• How to use the Terminal and Nano editor to change n8n version numbers.  
• How to "pin" a version to prevent it from updating, and how to revert to the "latest" image.

**Docker Commands:**  
docker compose pull (pulls latest image)  
docker compose down (stop & remove container)  
docker compose up -d (create &start new container)

------------------------------------------------------------------------

**📌 Links**  
n8n GitHub: [https://github.com/n8n-io/n8n](https://github.com/n8n-io/n8n)  
Hostinger & n8n: [https://www.hostg.xyz/SHIDN](https://www.hostg.xyz/SHIDN)

------------------------------------------------------------------------

**🕒 Timestamps**  
00:00 Intro: About The Tutorial  
00:26 Why Change Version Number?  
01:29 How to check version number of n8n  
01:58 GitHub Releases  
02:30 Method 1: VPS Dashboard  
02:54 Edit docker-compose.yml File  
03:18 Updating n8n Docker Commands  
03:52 Add n8n Version Number  
04:54 Deploy Button  
05:32 Confirm n8n Version Number  
06:00 Pin Version Number  
06:50 Method 2: VPS Terminal  
08:14 Edit in Nano Editor  
09:17 Write Out + Exit Nano  
09:47 Docker Compose Down & Up  
10:37 Dashboard = Terminal Docker-Compose  
11:29 Practice Run \#2: Terminal  
13:59 Recap: Change n8n Versions

### 🪜**What You Will Learn:**

**Method 1: Change n8n Version (VPS Dashboard):**

1.  Open n8n in browser
2.  Click Settings...About n8n...Check Version
3.  Go to n8n GitHub & Click Releases and select version number
4.  Sign in to Hostinger VPS Dashboard
5.  Go to Docker Manager and click 'Manage'
6.  Select the YAML editor
7.  Find the n8n image line and add :version number at the end of the line
8.  Scroll to the top and click Deploy to run Docker down & Docker up
9.  Return to n8n to confirm version number changed.

**Method 2: Change n8n Version (VPS Terminal):**  
1. Open VPS Terminal and ensure you are in the n8n directory (root)  
2. Type pwd to confirm directory  
3. Type ls to list files and confirm docker-compose.yml file is listed  
4. Enter nano docker-compose.yml to edit in Nano Editory  
5. file is located (use the `ls` command to confirm).  
6. Use the arrow keys to find the n8n **image line**  
7. Add colon + version tag at the end,  
8. Press Ctrl+O to Write Out (Save)  
9. Press Enter to Commit (Write Out)  
10. Enter Ctrl+X to exit Nano  
11. Run docker compose down to stop and remove n8n container  
12. Run docker compose up -d to spin up new n8n container  
13. Return to n8n & refresh browser to confirm changes  
14. 'Pin' (keep) version number to keep the same version  
15. Remove version number to pull latest versions of n8n
