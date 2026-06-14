---
title: "Hostinger VPS: What the Heck Is Traefik ?"
description: ""
pubDate: "2025-12-30T06:45:05"
updatedDate: "2026-01-29T07:12:18"
draft: false
type: "post"
slug: "traefik"
permalink: "/traefik/"
legacyPermalink: "https://www.mikemurphy.co/traefik/"
canonicalUrl: "https://mikemurphy.ai/tutorials/traefik/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2025/12/TRAEFIK.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2025/12/TRAEFIK.jpg"
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
  id: "215231"
  postType: "post"
  rawWordCount: 705
seo:
  legacyTitle: "Hostinger VPS: What the Heck Is Traefik ? - Mike Murphy Co"
  legacyH1: "Hostinger VPS: What the Heck Is Traefik ?"
  legacyCanonical: "https://www.mikemurphy.co/traefik/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 733
youtube: 
  - "https://youtu.be/i515M0FwK7s"
---
<https://youtu.be/i515M0FwK7s>

**Description:**  
In this tutorial, you will learn what **Traefik** is and why it is a critical component of your **Hostinger Virtual Private Server (VPS)**. You will learn the three main roles of Traefik: Reverse Proxy, Auto HTTPS/SSL Certificates & Service Discovery (Docker).

**What is Traefik on Hostinger VPS?:**  
A cloud-native reverse proxy and load balancer that simplifies deploying and managing containerized applications (like Docker) by automatically discovering services, routing traffic, and handling SSL certificates (Let's Encrypt) without complex manual configuration, making your microservices easily accessible via domain names.

**Traefik (Hotel Receptionist Analogy)?:**  
Think of Traefik like a **hotel receptionist**.  
The hotel’s street address is your **IP address**.  
When a guest (web traffic) arrives, they don’t need to know the exact room number (port); they simply ask the receptionist for the "n8n room."  
The receptionist (Traefik) looks at their directory, checks their ID (SSL certificate), and tells them exactly which floor and room to go to, ensuring they get there safely and efficiently

**Resources/Links Mentioned:**

- Get Hostinger VPS + n8n: [https://www.hostg.xyz/SHIDN](https://www.hostg.xyz/SHIDN)
- **Hostinger VPS Dashboard** (Docker Manager)
- **n8n Self-Hosted Template**
- **Let’s Encrypt** (For automated SSL certificates)
- **Termius** (SSH client for remote connection)
- **Ask Kodee** (Hostinger’s AI tech support)

**What You Will Learn:**  
• The **official pronunciation** of Traefik (hint: it's just like the word "traffic").  
• The **three core jobs** of Traefik: Reverse Proxy, Auto SSL, and Service Discovery.  
• How Traefik manages **Ports 80 and 443** to route incoming web requests.  
• The importance of the **Docker socket** in helping Traefik detect new containers automatically.  
• How to configure **Traefik labels** and environment variables in your **YAML editor**.

------------------------------------------------------------------------

**📌 Links**

Traefik Blog: [https://traefik.io/blog/how-to-pronounce-traefik-d06696a3f026](https://traefik.io/blog/how-to-pronounce-traefik-d06696a3f026)  
Custom Domains (Tutorial): [https://youtu.be/2XJbZIi5JBs?si=C8kIgfzQQ6915gQA](https://youtu.be/2XJbZIi5JBs?si=C8kIgfzQQ6915gQA)  
Hostinger & n8n: [https://www.hostg.xyz/SHIDN](https://www.hostg.xyz/SHIDN)

------------------------------------------------------------------------

**🕒 Timestamps:**  
00:00 Intro: About The Tutorial  
00:16 Is it Tray-Fick or Traffic?  
00:43 Where is the Traefik Container?  
01:12 Do I Need Traefik?  
01:28 What is Traefik?  
02:26 Traefik Job \#1: Reverse Proxy  
03:14 Traefik Job \#2: HTTPS + SSL  
04:02 Traefik Job \#3: Service DIscovery  
04:29 Traefik Cop Roles Explained  
06:30 Traefik & Docker Containers  
07:01 Ports 80 & 443  
07:48 Traefik Passport Office (Volumes)  
08:57 Service Discovery (Docker Socket)  
09:38 Domains: With & Without Traefik  
10:01 Subdomains + Custom Domains  
10:56 Docker Manager  
11:23 Edit docker-compose.yml  
13:07 Traefik Labels (docker-compose)  
14:09 Traefik: 80 & 443 Only

### 🪜**What You Will Learn:**

1.  **Introduction and Pronunciation:** Clearing up how to say "Traefik" and why it appears in your Docker manager.
2.  **The "Traffic Cop" Analogy:** Understanding Traefik’s role as a **reverse proxy** that stands at the front of your VPS to guide guests (web traffic) to the right room (app).
3.  **Role \#1: Reverse Proxy:** How Traefik listens on **Port 80 (HTTP)** and **Port 443 (HTTPS)** to manage all incoming requests.
4.  **Role \#2: Auto SSL (The Passport Office):** How Traefik automatically requests and renews **Let’s Encrypt certificates** to ensure your connection is always secure.
5.  **Role \#3: Service Discovery:** Exploring the **Docker socket**, which gives Traefik access to the "Docker brain" to see new containers as soon as they are created.
6.  **Dashboard Walkthrough:** Navigating the **Hostinger Docker Manager** to find the Traefik container and its configuration settings.
7.  **Configuration via YAML:** How to use the **YAML editor** to set up the blueprint for your apps, including essential **Traefik labels**.
8.  **Setting Environment Variables:** Adding your email for SSL registration and defining **custom subdomains** for apps like n8n.
9.  **Verification:** Demonstrating how a clean URL (e.g., flow.yourdomain.com) replaces ugly IP addresses and port numbers.
10. **Troubleshooting:** Using **Ask Kodee** for help with labels and technical support.
