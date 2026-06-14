---
title: "Free AI for n8n: How To Connect Ollama to n8n Workflows – No API Costs! (Part 2)"
description: "In this Part 2, learn how to connect n8n to shared Docker Network and how to use Ollama AI Models in n8n automation workflows with no API Costs, Rate Limits and 100% free (excluding the cost of monthly Hostinger VPS Plan)."
pubDate: "2025-11-01T11:45:33"
updatedDate: "2025-11-01T11:45:39"
draft: false
type: "post"
slug: "ollaman8n-2"
permalink: "/ollaman8n-2/"
legacyPermalink: "https://www.mikemurphy.co/ollaman8n-2/"
canonicalUrl: "https://mikemurphy.ai/tutorials/ollaman8n-2/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2025/11/OLLAMA_N8N.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2025/11/OLLAMA_N8N.jpg"
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
  prioritySample: false
  review: false
  eraRule: "pubDate before 2025-01-01 is legacy; on/after is ai"
  source: wordpress-wxr
wp:
  id: "215107"
  postType: "post"
  rawWordCount: 640
seo:
  legacyTitle: "Free AI for n8n: How To Connect Ollama to n8n Workflows – No API Costs! (Part 2) - Mike Murphy Co"
  legacyH1: "Free AI for n8n: How To Connect Ollama to n8n Workflows – No API Costs! (Part 2)"
  legacyCanonical: "https://www.mikemurphy.co/ollaman8n-2/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 672
youtube: 
  - "https://youtu.be/5qFNxvj59hw"
---
<https://youtu.be/5qFNxvj59hw>

## Free AI for n8n: How To Connect Ollama to n8n Workflows – No API Costs! (Part 2)

**Description**  
In this Part 2, learn how to connect n8n to shared Docker Network and how to use Ollama AI Models in n8n automation workflows with no API Costs, Rate Limits and 100% free (excluding the cost of monthly Hostinger VPS Plan).

**What You Will Learn (How):**

- Inspect Docker Network
- Terminal Tips
- Edit n8n docker-compose.yml file
- 3-Step Nano Editor Process (Write out, Commit, Exit)
- Stop & Restart n8n Docker container
- Verify that n8n is connected to the shared network
- Setup Ollama Chat Model Node credentials (internal URL)
- Test Ollama Models
- How To Pull, Remove & List Ollama Models

**Tutorials:**  
(Part 1: Ollama + Docker Network): [https://youtu.be/9-u3BGl0ubU](https://youtu.be/9-u3BGl0ubU)  
(Part 2: Ollama + N8N Workflows): [https://youtu.be/5qFNxvj59hw](https://youtu.be/5qFNxvj59hw)

**Cheatsheet (Snippets) on GitHub:**  
[https://dub.sh/ollama_1](https://dub.sh/ollama_1) (Part 1)  
[https://dub.sh/ollama_2](https://dub.sh/ollama_2) (Part 2)

Resources Mentioned:

- Hostinger VPS ([https://mikemurphy.co/vps](https://mikemurphy.co/vps))
- Ollama [https://olama.com](https://olama.com/)
- N8N (Self-hosted)
- Shared Docker Network (App.net)
- docker-compose.yml file
- Nano text editor
- GitHub repo cheatsheet [https://dub.sh/ollama_1](https://dub.sh/ollama_1)

Ollama Models:  
llama 3.2:latest ([https://ollama.com/library/llama3.2:latest](https://ollama.com/library/llama3.2:latest))  
qwen 2.5:0.5b ([https://ollama.com/library/qwen2.5:0.5b](https://ollama.com/library/qwen2.5:0.5b))  
gemma2:2b ([https://ollama.com/library/gemma2:2b](https://ollama.com/library/gemma2:2b))

**Chapters:**  
00:00 Intro: About The Tutorial  
00:18 What You Will Learn  
00:42 Recap: Part 1  
01:20 Inspect Docker Network  
02:04 Containers (Connected Apps)  
02:45 Change Directory (n8n)  
03:20 Root Directory  
04:11 Edit docker-compose.yml  
04:58 Nano Editor Navigation  
06:09 Add Networks To YAML file  
07:43 Write Out Nano File  
09:06 Restart n8n Container  
10:46 YAML Editor (VPS Dashboard)  
11:22 Fix syntax error in .yaml editor  
12:10 Confirm n8n is connect to Docker Network (app-net)  
14:02 Docker Container Ports  
14:20 Test Ollama in n8n  
14:44 Create new n8n workflow  
15:18 Edit Fields (Set)  
15:49 Ollama Chat Model Node  
16:18 Docker Container Internal URLs  
17:31 Base URL (Ollama Node)  
18:39 Select Ollama Model  
19:19 Customize LLM Chain  
19:44 Execute Workflow  
19:58 On the fence about Ollama?  
20:50 Try, try again!! (don't quit on models!)  
21:21 Test different Ollama Models  
21:59 Chat with Ollama Models  
23:07 Pull & Remove Ollama Models  
23:55 Test New Model in n8n  
24:31 List all Models Installed  
24:47 GitHub Repo (Cheatsheets)

 

 

 

**Step-by-Step (Ollama Setup on VPS):**

1.  Sign in to the Hostinger dashboard and launch the terminal.
2.  Check connected containers to the App.net network
3.  Change directory (CD) into the N8N folder if it was moved from the default root directory.
4.  Open the existing docker-compose.yml file for n8n
5.  Add network settings in docker-compose.yaml
6.  Save the file using Ctrl+O, tap Return, and exit using Ctrl+X.
7.  Stop and remove the N8N Docker container using docker compose down.
8.  Restart and recreate the N8N container
9.  Confirm N8N is connected to App.net
10. In the N8N workflow editor, add the Ollama Chat Model node.
11. Create a new credential for Ollama
12. Set Base URL to the internal address: http://olama:11434.
13. Select a model and configure the Basic LM Chain node
14. Execute the workflow to confirm successful communication between N8N and Ollama.
15. Pull new models, remove unwanted, list all Models
