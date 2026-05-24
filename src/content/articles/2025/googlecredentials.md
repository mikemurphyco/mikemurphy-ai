---
title: "How To Set Up Google Credentials For N8n | Step-By-Step Guide Using Google Cloud Console"
description: "In this tutorial, you will learn how to set up Google credentials in n8n for Drive, Docs, Gmail, Calendar, and Sheets using OAuth2 credentials created in Google Cloud Console. This allows your automations to securely read, write, and manage Google data directly within your n8n workflows."
pubDate: "2025-11-04T06:00:11"
updatedDate: "2026-01-29T07:12:25"
draft: false
type: "post"
slug: "googlecredentials"
permalink: "/googlecredentials/"
legacyPermalink: "https://www.mikemurphy.co/googlecredentials/"
canonicalUrl: "https://mikemurphy.ai/googlecredentials/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2025/11/GOOGLE-CREDS.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2025/11/GOOGLE-CREDS.jpg"
categories: 
  - "AI"
  - "Automation"
  - "Google Cloud"
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
  id: "215112"
  postType: "post"
  rawWordCount: 671
seo:
  legacyTitle: "How To Set Up Google Credentials For N8n | Step-By-Step Guide Using Google Cloud Console - Mike Murphy Co"
  legacyH1: "How To Set Up Google Credentials For N8n | Step-By-Step Guide Using Google Cloud Console"
  legacyCanonical: "https://www.mikemurphy.co/googlecredentials/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 693
youtube: 
  - "https://youtu.be/Y4iDC5z3GFg"
---
<https://youtu.be/Y4iDC5z3GFg>

## How To Set Up Google Credentials For N8n \| Step-By-Step Guide Using Google Cloud Console

 

**Description:**  
In this tutorial, you will learn how to set up Google credentials in n8n for Drive, Docs, Gmail, Calendar, and Sheets using OAuth2 credentials created in Google Cloud Console. This allows your automations to securely read, write, and manage Google data directly within your n8n workflows.

**🔑 Key Benefit:** You only need to create ONE set of OAuth credentials in Google Cloud Console, which can then be reused for all Google services in n8n.

**✅ PREREQUISITES**

- A Google or Google Workspace Account
- Access to the Google Cloud Console
- An n8n instance (Cloud, Self-hosted, or Local)

**🔧 TROUBLESHOOTING**  
If you encounter errors when using a Google service, make sure you've enabled that service's API in Google Cloud Console (Step 3).

**📚 RESOURCES**  
Google Cloud Console: console.cloud.google.com

 

**Chapters:**  
00:00 Intro: About The Tutorial  
00:15 Google Services Covered  
00:41 Prerequisites  
01:03 Overview of Tutorial  
02:19 Credentials vs. APIs  
02:58 Google Cloud Console Setup  
03:43 Step 1: Create New Project  
04:20 Step 2: Enable Required APIs  
05:06 How To Enable APIs (Google Cloud)  
06:25 Enable API  
06:52 Step 3: Configure OAuth Consent Screen  
07:02 What is OAuth?  
07:26 Configure OAuth Consent Screen  
07:41 Name Application  
07:57 App Information (Internal/External)  
08:27 Step 4: Publish Your App  
08:53 Audience Tab (Publish App)  
09:17 Step 5: Create OAuth 2.0 Credentials  
09:49 What is a Redirect URI?  
10:11 Clients: Create Credentials  
10:50 Add Redirect URIs  
11:22 ⚠️ COPY & PASTE SECRET  
12:07 Add a Secret Key  
12:28 Do Not Expose Client Secret  
12:36 Part 2: n8n Configuration  
13:26 Sign In With Google  
13:45 Set Credentials For All Services  
15:41 Add Additional Google Services  
16:46 Enable API Keys

 

 

 

**Step-by-Step (Ollama Setup on VPS):**

1.  Open Google Cloud Console

2.  Navigate to `console.cloud.google.com` and sign in with your Google account

3.  Create a New Project

4.  Use the Project Picker at the top of the page to create a new project

5.  Enable Required APIs

6.  Go to hamburger menu → APIs and Services → Library

7.  Scroll to Google Workspace section

8.  Enable APIs for all desired services (Drive, Docs, Sheets, Calendar, Gmail, Tasks)

9.  Configure OAuth Consent Screen

10. Go to hamburger menu → APIs and Services → OAuth Consent Screen

11. Click "Get Started"

12. Name your app (e.g., "N8N Automation")

13. Select your email

14. Choose "External" for user type (in most cases)

15. Publish Your App

16. Navigate to the Audience tab

17. Click "Publish App" to make it live

18. Create OAuth 2.0 Credentials

19. Go to Clients and click "Create Client"

20. Select "Web Application" (or "Desktop app" for local N8N)

21. Name your client

22. Add Redirect URI

23. In n8n, open any Google service node

24. Click "Create New Credential" to find your OAuth redirect URL

25. Copy this URL and paste it into the "Redirect URIs" field in Google Cloud Console

26. Click "Create"

27. Save Your Credentials Securely

    ⚠️ **Important:** Immediately copy both the Client ID and Client Secret. The Client Secret cannot be viewed again once you close the dialog box.

&nbsp;

1.  **Part 2: N8N Configuration**.
2.  Add Credentials to N8N
3.  In your n8n Google service node, paste the Client ID and Client Secret
4.  Authorize the Connection
5.  Click "Sign in with Google"
6.  Choose the Google account you used in Cloud Console
7.  Click "Allow" to grant permissions
8.  Reuse for Other Services**  
    **  
    Use the same Client ID and Client Secret for all other Google services you want to connect (Drive, Docs, Sheets, Calendar, Gmail, Tasks)
