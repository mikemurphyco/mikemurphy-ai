---
title: "How to Create a Telegram Bot with BotFather + Connect to n8n for Instant Notifications"
description: "In this tutorial, you will learn how to create your own Telegram bot using BotFather and connect it to n8n for automated notifications and workflows! This step-by-step tutorial covers everything from bot creation to getting those tricky chat IDs."
pubDate: "2025-09-10T06:00:48"
updatedDate: "2025-09-09T19:48:05"
draft: false
type: "post"
slug: "telegram"
permalink: "/telegram/"
legacyPermalink: "https://www.mikemurphy.co/telegram/"
canonicalUrl: "https://mikemurphy.ai/telegram/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2025/09/TELEGRAM.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2025/09/TELEGRAM.jpg"
categories: 
  - "AI"
  - "Automation"
  - "n8n"
  - "Telegram"
tags: 
  - "n8n"
  - "telegram"
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
  id: "214930"
  postType: "post"
  rawWordCount: 507
seo:
  legacyTitle: "How to Create a Telegram Bot with BotFather + Connect to n8n for Instant Notifications - Mike Murphy Co"
  legacyH1: "How to Create a Telegram Bot with BotFather + Connect to n8n for Instant Notifications"
  legacyCanonical: "https://www.mikemurphy.co/telegram/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 542
youtube: 
  - "https://youtu.be/PGB4qj_ZEUY"
---
<https://youtu.be/PGB4qj_ZEUY>

## How to Create a Telegram Bot with BotFather + Connect to n8n for Instant Notifications

**Description:  
**In this tutorial, you will learn how to create your own Telegram bot using BotFather and connect it to n8n for automated notifications and workflows! This step-by-step tutorial covers everything from bot creation to getting those tricky chat IDs.

**Why Do This?  
**Perfect for automating n8n workflow notifications, alerts, and updates directly to your Telegram App!

🤖 **What You'll Learn:**

- Create a new Telegram bot using BotFather
- Set up the Telegram node in n8n
- Find your chat ID (with an easy template method!)
- Send automated notifications from n8n to Telegram
- Troubleshoot common setup issues

————————————

**Telegram:  
**[https://telegram.org/](https://postman.com)

**n8n:**  
<https://n8n.io/>

**Hostinger VPS (use n8n for free):  
**<https://mikemurphy.co/vps>

**1Password Password Manager:  
**<https://mikemurphy.co/1password>

**Get Chat ID:  
**https://api.telegram.org/bot\[YOUR_BOT_TOKEN\]/getUpdates

—————The API Request Recipe———————

✅** Chapters:**  
00:00 Intro: About The Tutorial   
00:12 What is Telegram?   
00:25 What is n8n?   
00:37 Why Connect n8n + Telegram?  
01:23 How To Create Telegram Chatbot  
02:00 Name Your Bot + Username  
02:46 Telegram Confirmation  
03:03 Customize Bot Profile  
03:39 HTTP API Token  
04:10 Create Saved Credentials (N8N)  
04:38 Saving API Keys  
05:03 Password Managers  
05:34 Add New N8N Workflow  
06:01 Get Chat ID  
06:22 Chat ID URL (Paste in Browser)  
06:50 Add API Key to URL  
07:14 Copy/Paste in Browser  
07:37 Paste Chat ID in N8N  
08:07 Re-using Chat IDs in N8N  
08:49 Duplicating Workflows

🪜**How To Create Telegram Bot Using BotFather:**

1.  Open Discord App
2.  Search for "@BotFather"
3.  Start a conversation with BotFather
4.  Send /newbot command to BotFather
5.  Choose a display name for your bot (e.g., "AI Mike Bot")
6.  Choose a unique username ending in "bot" (e.g., "aimikebot")
7.  BotFather will confirm creation and provide your bot token
8.  Click the Profile  Link to Customize
9.  Copy API Key (Token) in Telegram
10. Go to n8n
11. Click the Plus (+) icon and then ‘Save Credential’

🪜**How To Setup Telegram Node in N8N:**

1.  Click Plus (+) Icon, select ’Workflow’
2.  Click + To add a new Node
3.  Search for ‘Telegram’ and click to add to n8n Canvas
4.  Search Telegram Node for ‘Send Text Message’

🪜**How To Get Chat ID:**

1.  Start a conversation with your new bot (Telegram)
2.  Send any message to the bot
3.  Visit: https://api.telegram.org/bot\[YOUR_BOT_TOKEN\]/getUpdates
4.  Find your chat ID in the JSON response (under "chat" \> "id")
5.  Copy ID

• 6. Return to N8N and paste in ‘Chat ID’ field of Telegram Node
