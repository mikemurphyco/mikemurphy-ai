---
title: "Neon Postgres: How To Enable pgvector Extension For RAG Systems (Vector Database)"
description: "In this tutorial, you will learn how to enable the pgvector extension to convert your Neon Postgres database into a vector database. This allows you to store and earch vector embeddings, which are necessary components when building Retrieval Augmented Generation (RAG) systems. The tutorial uses the Neon SQL editor for all the necessary steps.Neon Postgres: How To Enable pgvector Extension For RAG Systems (Vector Database)"
pubDate: "2025-10-22T08:30:17"
updatedDate: "2025-10-21T21:41:39"
draft: false
type: "post"
slug: "pgvector"
permalink: "/pgvector/"
legacyPermalink: "https://www.mikemurphy.co/pgvector/"
canonicalUrl: "https://mikemurphy.ai/pgvector/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2025/10/NEON_pgvector-extension.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2025/10/NEON_pgvector-extension.jpg"
categories: 
  - "AI"
  - "Neon"
  - "RAG"
  - "Tutorials"
tags: []
topics: []
search:
  include: true
  boost: 1.0
migration:
  dryRun: true
  prioritySample: true
  review: false
  eraRule: "pubDate before 2025-01-01 is legacy; on/after is ai"
  source: wordpress-wxr
wp:
  id: "215091"
  postType: "post"
  rawWordCount: 624
seo:
  legacyTitle: "Neon Postgres: How To Enable pgvector Extension For RAG Systems (Vector Database) - Mike Murphy Co"
  legacyH1: "Neon Postgres: How To Enable pgvector Extension For RAG Systems (Vector Database)"
  legacyCanonical: "https://www.mikemurphy.co/pgvector/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 629
youtube: 
  - "https://youtu.be/tF8CdHc0ZnI"
---
<https://youtu.be/tF8CdHc0ZnI>

## Neon Postgres: How To Enable pgvector Extension For RAG Systems (Vector Database)

**Description:**  
In this tutorial, you will learn how to **enable the pgvector extension** to convert your Neon Postgres database into a vector database. This allows you to store and earch vector embeddings, which are necessary components when building Retrieval Augmented Generation (RAG) systems. The tutorial uses the Neon SQL editor for all the necessary steps.

**Vector Store:**  
The database or table that holds your embeddings and metadata

**Embeddings:**  
The numeric representation of text, image, or audio content

**RAG System:**  
Process that searches vector store for relevant embeddings and then feeds to LLM for outputs.

**pgvector:**  
Postgres extension that enables Postgres to store embeddings/vectors.

**In this tutorial, you'll learn:**

- How To Use the SQL Editor
- How To Save SQL Queries
- How To Enable pgvector extension
- How To Verify pgvector is enabled
- How to create a table to store embeddings
- How to add vector index
- How to insert test row data
- How To run Similarity Search

**Neon Account Sign-Up:**  
[https://neon.com](https://neon.com/)

**The pgvector extension (Neon Documentation):**  
[https://neon.com/docs/extensions/pgvector](https://neon.com/docs/extensions/pgvector)

**How To Create Neon Postgres Database Tutorial:**  
[https://youtu.be/doIFdMp7D2E](https://youtu.be/doIFdMp7D2E)

——————  
✅ **Chapters:**  
00:00 Intro: About The Tutorial  
00:32 What You Will Learn  
00:52 Prerequites  
01:11 Tutorial: How To Setup Neon Database  
01:24 Step 1: Open SQL Editor  
01:35 Sign In To Neon.com  
01:49 Open Projects Dashboard  
01:58 Open SQL Editor  
02:07 Select Database  
02:29 Step 2: Enable pgvector  
02:41 Neon Docs (pgvector)  
03:02 IF NOT EXISTS  
03:49 SQL Editor: Enable pgvector  
04:22 RUN Command  
04:42 Step 3: Verify pgvector is enabled  
04:50 SQL Editor Basics  
05:15 Add Comments in SQL Editor  
05:53 How To Run Commands  
06:13 Step 4: Create Embeddings Table  
06:42 Create Table Code Overview  
07:27 Embedding Vector (Dimension)  
08:05 LLM Embedding Models  
08:55 Confirm Table Was Inserted  
09:14 Save Query  
09:55 Step 5: Add Vector Index  
10:42 Ivfflat little date warning  
10:58 Step 6: Insert Test Row  
11:41 Embedding Vector (4) for Demo  
12:19 Documents_Demo Table  
12:33 Embedding Dimension in Header  
12:59 Create New Query  
13:33 Confirm Test Data Row  
13:50 Similarity Search  
14:15 How RAG Works  
15:39 Similarity Search Test

 

🪜 **How To Enable PGVECTOR Extension on Neon Postgres Database:**

1.  Sign into [https://neon.com](https://neon.com/)
2.  Open the SQL Editor
3.  Log in to your Neon dashboard
4.  Select your organization
5.  Click 'Projects,' open your project
6.  Click the 'SQL editor' and select correct database
7.  Copy/Paste `CREATE EXTENSION vector IF NOT EXISTS`) into the SQL editor.
8.  Press 'Run' to enable pgvector
9.  Verify the Extension to confirm that the `pgvector` extension is successfully enabled.
10. Create the Vector Store Table (documents)
11. Ensure the embedding vector dimension number (e.g., 1536) matches the dimension used by your chosen Large Language Model.
12. Add a Vector Index: Copy and run the code snippet to add a vector index to your new table, which will speed up similarity searches.
13. Test the Functionality: Insert a test row of sample data
14. Run a similarity search query to ensure the database can correctly make a match between text and vectors.
