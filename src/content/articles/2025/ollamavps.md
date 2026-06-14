---
title: "How To Install Ollama on Hostinger VPS: Free AI Models for n8n (No API Costs)"
description: "Learn how to install Ollama in a Docker container on your Hostinger VPS with persistent storage. Perfect for using local AI models in n8n workflows without API costs. Complete beginner-friendly guide for non-developers."
pubDate: "2025-10-30T06:00:48"
updatedDate: "2025-10-29T22:26:55"
draft: false
type: "post"
slug: "ollamavps"
permalink: "/ollamavps/"
legacyPermalink: "https://www.mikemurphy.co/ollamavps/"
canonicalUrl: "https://mikemurphy.ai/tutorials/ollamavps/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2025/10/OLLAMA_VPS_surprised.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2025/10/OLLAMA_VPS_surprised.jpg"
categories: 
  - "AI"
  - "Automation"
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
  prioritySample: true
  review: false
  eraRule: "pubDate before 2025-01-01 is legacy; on/after is ai"
  source: wordpress-wxr
wp:
  id: "215101"
  postType: "post"
  rawWordCount: 648
seo:
  legacyTitle: "How To Install Ollama on Hostinger VPS: Free AI Models for n8n (No API Costs) - Mike Murphy Co"
  legacyH1: "How To Install Ollama on Hostinger VPS: Free AI Models for n8n (No API Costs)"
  legacyCanonical: "https://www.mikemurphy.co/ollamavps/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 674
youtube: 
  - "https://youtu.be/nvdpOXk-fU4"
---
<https://youtu.be/nvdpOXk-fU4>

## How To Install Ollama on Hostinger VPS: Free AI Models for n8n (No API Costs)

**Description**  
Learn how to install Ollama in a Docker container on your Hostinger VPS with persistent storage. Perfect for using local AI models in n8n workflows without API costs. Complete beginner-friendly guide for non-developers.

**What You Will Learn (How):**  
Ollama is like a mini AI server that runs models locally. Think of it as your personal ChatGPT, but it lives on your VPS instead of OpenAI's servers.

- Install Ollama in Docker with persistent model storage
- Create a private Docker network (so it can talk to other containers later)
- Downloading and manage Ollama AI Models
- Verify setup is not exposed to public internet

**Why Install Ollama on VPS?**

- Use Local & Private AI models in n8n Workflows for free!  
  - RAG Chat Interfaces, summaries, article writing, data extraction
- No API Costs!
- Beginner-friendly (no developer skills)

**Heads Up:**

- Ollama models are local (not connected to internet)
- Ollama models are pre-trained (knowledge contained
- Running a large language model will be resource-heavy on VPS

**Prerequisites:**

- Hostinger VPS with Ubuntu OS
- Docker & Docker Compose installed
- 5GB Free Hard Disk Space

**Cheatsheet (Snippets):**  
📁 Tutorial Resources & Code:  
[https://dub.sh/ollama_1](https://dub.sh/ollama_1)

**Hostinger VPS:**  
[https://mikemurphy.co/vps](https://mikemurphy.co/vps)

**Ollama:**  
[https://olama.com](https://olama.com/)

**Tutorials:**  
How To Safely Update n8n on Hostinger VPS (Without Losing Your Workflows)  
[https://youtu.be/9-u3BGl0ubU](https://youtu.be/9-u3BGl0ubU)

How To Update n8n:  
[https://youtu.be/tsSo9tC8J3g](https://youtu.be/tsSo9tC8J3g)

Ollama Desktop App:  
[https://youtu.be/vkhuduZWOIw](https://youtu.be/vkhuduZWOIw)

**Ollama Models:**  
llama 3.2:latest  
qwen 2.5:0.5b (good for KVM1 Plan)  
gemma2:2b

**Chapters:**  
00:00 About The Tutorial  
00:28 In Part 1 of Tutorial  
01:15 In Part 2 of Tutorial  
01:50 VPS Account + LLM Performance  
02:54 Prerequisites For Tutorial  
03:24 What Is Ollama?  
04:04 Confirm Unbuntu OS  
04:24 VPS + Network Overview  
05:18 n8n Update Tutorial  
05:51 VPS Browser Terminal  
06:04 Step 1: Docker & Docker Compose  
06:38 Ask Kodee (ChatBot)  
07:06 Step 2: Create Project Folder  
08:28 Step 3: Create Shared Docker Network  
09:10 Verify Network Settings  
09:33 Shared Docker Network Overview  
09:53 Step 4: Create Docker-Compose YAML  
10:17 pwd = print working directory  
10:49 docker-compose.yml Overview  
11:57 Create Docker-Compose File  
12:25 Nano Text Editor  
13:34 Write Out Sequence (Nano)  
15:08 Verify File Was Created  
15:37 Step 5: Start Docker Container  
16:28 Step 6: Ollama Models  
17:02 Pull (Download) Ollama Models  
18:03 Pull llama3.2:latest  
19:20 Fun Llama Facts!  
20:03 /bye  
20:37 qwen model (KVM1 Plans)  
20:58 Name of Models  
22:41 Remove (Delete) Models  
23:58 Step 7: Security Check  
24:38 Step 8: Inspect Setup  
25:57 Docker Manager  
26:59 Recap & Preview

 

**Step-by-Step (Ollama Setup on VPS):**

1.  Sign in to the Hostinger dashboard and open the Terminal.
2.  Confirm Docker and Docker Compose are installed
3.  Create a dedicated project folder for Ollama (mkdir)
4.  Navigate into Ollama Directory (cd)
5.  Create the shared Docker network called 'App-Net'
6.  Create the docker-compose.yml file using Nano editor
7.  Paste the configuration content (defining the container, network settings, volume storage)
8.  Save (Write Out) of Nano (Control+O). Press Return. Exit (Control + X)
9.  Launch the Ollama Docker container in the background
10. Confirm Ollama is running using docker.ps
11. Pull in Llama 3.2 Models
12. Run a security port check to ensure ports are not exposed externally
