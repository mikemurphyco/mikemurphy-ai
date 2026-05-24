---
title: "Beginner’s Guide: How to Test OpenAI API Keys in Postman"
description: "In this tutorial, I will show you step-by-step how to use Postman to test your OpenAI API keys and make your first API Requests."
pubDate: "2025-09-04T06:00:02"
updatedDate: "2025-09-03T21:12:26"
draft: false
type: "post"
slug: "postman"
permalink: "/postman/"
legacyPermalink: "https://www.mikemurphy.co/postman/"
canonicalUrl: "https://mikemurphy.ai/postman/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2025/09/OpenAI.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2025/09/OpenAI.jpg"
categories: 
  - "AI"
  - "API"
  - "Postman"
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
  id: "214921"
  postType: "post"
  rawWordCount: 518
seo:
  legacyTitle: "Beginner’s Guide: How to Test OpenAI API Keys in Postman - Mike Murphy Co"
  legacyH1: "Beginner’s Guide: How to Test OpenAI API Keys in Postman"
  legacyCanonical: "https://www.mikemurphy.co/postman/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 557
youtube: 
  - "https://youtu.be/rn6alwafU5Q"
---
<https://youtu.be/rn6alwafU5Q>

## Beginner’s Guide: How to Test OpenAI API Keys in Postman

**Description:  
**You know how to generate OpenAI API Keys, but how exactly do you use them?

**Description:**  
In this tutorial, I will show you step-by-step how to use Postman to test your OpenAI API keys and make your first API Requests.

**What you’ll learn:**

- How to set up **Postman**
- Where to find your **OpenAI API key**
- How to find API Address
- How to better understand API Documentation
- How to test and send requests to OpenAI’s AP

**Postman API Platform:  
**<https://postman.com>

**OpenAI API Documentation:**  
<https://platform.openai.com/docs/api-reference/chat/create>

**How To Get OpenAI API Keys (Tutorial):  
**<https://youtu.be/Lj43aSwNpog>

—————The API Request Recipe———————

**Part 1: The Address  
**<https://api.openai.com/v1/chat/completions>

**Part 2:** **Authorization:  
Key:** Authorization  
**Value:** Bearer YOUR_API_KEY

``` p1
The Message (Body):
{
  "model": "gpt-3.5-turbo",
"messages": [
    {
   "role": "user",
    "content": "Write a 3-sentence story about a lighthouse keeper who finds a message from a sea creature."
  }
 ]
}
```

————————————

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
00:00 Intro: About The Tutorial 00:12 What You Will Learn 01:01 Requirements: What You Need 01:40 Set Up Free Postman Account  
02:03 Create Postman Workspace  
02:24 Workspace Description  
02:48 3-Part Recipe (API Requests)  
03:17 Confusing API Terminology  
03:43 GET Requests  
04:04 POST Requests  
04:24 Part 1: The Address (URL)  
04:40 Open AI API Docs  
05:25 Create Chat Completion URL  
05:53 Base URL + Endpoint  
06:23 Part 2: Authorization  
07:19 Part 3: Message (Body)  
07:34 Request Body Requirements  
08:17 Message: Role & Content  
08:45 Postman: New API Request  
09:18 Add OpenAI API Key  
09:41 Part 3: The Message  
10:17 Send API Request!  
10:37 Status Code: 200 OK  
11:15 Review Response  
12:11 Lighthouse Keeper Story Response

🪜**How To Use Postman for OpenAI API Requests:**

1.  Visit [Postman.com](http://Postman.com) and create a Free Account
2.  Click ‘New Workspace’ and enter name for new Workspace
3.  Add Description & Notes
4.  Gather API Request Address (URL)
5.  Gather your OpenAI API  ([openai.com](http://openai.com))
6.  Go to [Postman.com](http://Postman.com)
7.  Click (+) to create new API Request
8.  Paste OpenAI Secret (API) Key
9.  Change ‘GET’ to ‘POST’
10. Go to ‘Authorization’
11. Click drop-down menu for Auth Type
12. Select ‘OpenAI Bearer Token’
13. Go to ‘Body’
14. Select ‘RAW’
15. Select ‘JSON’
16. Paste in Body Snippet of code for message
17. Click ’SEND’ to send API Request
18. Look for 200 OK Status Code to determine success or not
19. Review Response
20. 20\. Save & Create New Collection
