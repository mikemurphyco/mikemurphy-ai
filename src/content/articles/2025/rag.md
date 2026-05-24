---
title: "How I Built a RAG System to Mine My AI Chat History for Gold"
description: "In this tutorial, you will learn about RAG (Retrieval Augmented Generation) and how to build a RAG system from scratch that mines your AI Chat Conversations for ‘gold nuggets’ of information."
pubDate: "2025-08-28T06:00:10"
updatedDate: "2025-08-27T22:02:39"
draft: false
type: "post"
slug: "rag"
permalink: "/rag/"
legacyPermalink: "https://www.mikemurphy.co/rag/"
canonicalUrl: "https://mikemurphy.ai/rag/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2025/08/RAG.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2025/08/RAG.jpg"
categories: 
  - "AI"
  - "Ollama"
  - "Python"
  - "RAG"
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
  id: "214903"
  postType: "post"
  rawWordCount: 640
seo:
  legacyTitle: "How I Built a RAG System to Mine My AI Chat History for Gold  - Mike Murphy Co"
  legacyH1: "How I Built a RAG System to Mine My AI Chat History for Gold"
  legacyCanonical: "https://www.mikemurphy.co/rag/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 654
youtube: 
  - "https://youtu.be/OB4GZ_WugQI"
---
<https://youtu.be/OB4GZ_WugQI>

## How I Built a RAG System to Mine My AI Chat History for Gold 

**Description:  
**In this tutorial, you will learn about RAG (Retrieval Augmented Generation) and how to build a RAG system from scratch that mines your AI Chat Conversations for ‘gold nuggets’ of information.

**In this tutorial, you'll learn:  
**

- What is RAG (Retrieval Augmented Generation)?
- How Does RAG Work?
- How To Build A RAG System Using ChatGPT Conversations?
- What Are The Prerequisites?How To Use VS Code & Terminal To Run Python Scripts

**Download Project Files:**  
https://dub.sh/aigoldmine

**Prerequisites:**  
Python 3.8 or Later ( (https://python.org)  
Confirm Ollama is running locally (https://ollama.com)  
Embedding Model: nomic-embed-text (https://ollama.com/library/nomic-embed-text)  
LLM Model: gpt-oss:20b (https://ollama.com/library/gpt-oss)  
VS Code (or any IDE): https://code.visualstudio.com/

**Check If Python is installed:**  
python3 —version  

**Check if Ollama is running locally:**  
localhost:11434 

**Install Embedding Model:**  
ollama pull nomic-embed-text

———————

**Gear I Use:**  
<https://mikemurphy.co/resources>

**To try or buy Adobe After Effects CC 2025:  
**<https://mikemurphy.co/adobe> (affiliate link)

**Terrapin Textures:  
**<https://terrapintextures.com>

⭕️ **Check out my Domestika Course on Adobe Audition:  
**<https://mikemurphy.co/domestika>

——————

✅** Chapters:**  
00:00 Intro: About The Tutorial   
00:44 Do You Have To Be A Developer?   
01:04 What Is RAG?   
01:42 Overview: How To Build A RAG 01:55 Chunking  
02:09 Embeddings  
02:25 Storage: Vector Database  
02:37 Query  
02:55 Connect To LLM Model (AI) 03:19 Retrieval Augmented Generation  
04:07 How I Built AI Gold Mine 04:35 Gather AI Chat History Text  
04:54 Prerequisites (Requirements)  
05:11 Is Python Installed?  
05:56 Ollama Models  
06:21 Is Ollama Running Locally?  
06:53 VS Code: Open Project Directory  
07:50 Overview of Project Build  
08:58 Open Terminal + Create Virtual Environment  
09:25 Python Virtual Environment  
10:01 Chunking Script (Copy & Paste)  
10:44 Run Chunking Script  
11:09 Embeddings (Copy & Paste)  
11:30 Run Embeddings Script  
11:45 Search (Copy & Paste)  
12:10 Run Search Script  
12:24 Install ChromaDB (Vector Database)  
12:41 ChromaDB Script (Copy & Paste)  
13:03 Run ChromaDB Script  
13:26 Close RAG Loop Script  
14:03 Run Complete Rag Script  
14:40 Proof of Concept & Next Steps!

** **

🪜**How To Build A Rag System From Scratch:**

1.  Copy AI Chat Conversation (ex. from ChatGPT)
2.  Create New Text File using TextEdit or Similar
3.  Paste text and Save As conversation.txt
4.  Create New Project Directory/Folder (ex. ai-gold-mine)
5.  Install Python 3.8 or later (<https://python.org>)
6.  Confirm Ollama is running locally (<https://ollama.com>)
7.  Install Embed & LLM Models for Ollama
8.  Open Folder in VS Code
9.  Open Terminal & Navigate to Project Folder
10. Create Python Virtual Environment
11. Install Python Requests
12. Copy chunk_test.py Script
13. Paste in chunk_test.py in VS Code
14. Save
15. Open Terminal and run Chunking Script
16. Copy embedding_test.py Script
17. Paste in embedding_test.py in VS Code
18. Save
19. Open Terminal and run Embedding Script
20. Copy search_test.py Script
21. Paste in search_test.py in VS Code
22. Save
23. Open Terminal and run Search Script
24. Install ChromaDB (Vector Database)
25. Copy chromadb_test.py Script
26. Paste in chromadb_test.py in VS Code
27. Save
28. Open Terminal and run Chroma DBScript
29. Copy complete_rag\_.py Script
30. Paste in complete_rag\_.py in VS Code
31. Save
32. Open Terminal and run Complete Rag Script
