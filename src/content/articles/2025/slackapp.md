---
title: "How To Create a Slack App for n8n Workflows"
description: "In this tutorial, you will learn how to create a Slack App/Bot to send messages from Slack to trigger n8n workflows and have n8n send messages back."
pubDate: "2025-11-19T07:15:10"
updatedDate: "2026-01-29T07:12:25"
draft: false
type: "post"
slug: "slackapp"
permalink: "/slackapp/"
legacyPermalink: "https://www.mikemurphy.co/slackapp/"
canonicalUrl: "https://mikemurphy.ai/tutorials/slackapp/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: ""
featuredImageSource: ""
categories: 
  - "AI"
  - "Hostinger VPS"
  - "n8n"
  - "Slack"
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
  id: "215145"
  postType: "post"
  rawWordCount: 1563
seo:
  legacyTitle: ""
  legacyH1: ""
  legacyCanonical: ""
  robots: ""
  liveWordCount: 0
youtube: 
  - "https://youtu.be/oC8UZiQV3OU"
---
<https://youtu.be/oC8UZiQV3OU>

## How To Create a Slack App for n8n Workflows

**Description:**  
In this tutorial, you will learn how to create a Slack App/Bot to send messages from Slack to trigger n8n workflows and have n8n send messages back.

The Step-By-Step Guide:  
Step 1: Setup n8n Workflow Nodes (Slack Trigger, AI Agent, Open AI Model, Slack Message)  
Step 2: Create New Slack Channel  
Step 3: Create New Slack App/Bot ([https://api.slack.com/apps](https://api.slack.com/apps))  
Step 4: Go to OAuth & Permissions and add Scopes  
Step 5: Set Credentials for Slack API in n8n  
Step 6: Event Subscriptions in Slack API (Verify WebHook URLs)  
Step 7: Add Slack App/Bot to Slack Channel  
Step 8: Test n8n Workflow and Activate when ready

**Detailed Step By Step Blog Post:**  
[https://mikemurphy.co/slackapp](https://mikemurphy.co/slackapp)

**Get Hostinger VPS for n8n:**  
[https://mikemurphy.co/vps](https://mikemurphy.co/vps)

**n8n Docs (OAuth Scopes):**  
[https://docs.n8n.io/integrations/builtin/credentials/slack/#scopes](https://docs.n8n.io/integrations/builtin/credentials/slack/#scopes)  
——————

——————  
✅ **Chapters:**  
00:00 Intro: About The Tutorial  
00:59 Pre-Tutorial Tip: Add More Scopes!  
01:37 Purpose of Tutorial  
02:36 Step-By-Step Guide Begins  
02:48 Create New Workflow (n8n)  
03:01 Add Slack Trigger  
03:14 Add Slack Message Node  
03:24 Add AI Agent + LLM  
03:51 Overview of SlackApp Steps  
05:10 Create New Slack Channel  
05:27 Go to Slack API  
06:15 OAuth & Permissions (Slack API)  
06:42 n8n Docs (Scopes)  
07:45 How To Add OAuth Scopes  
08:34 Install App in Workplace  
09:09 OAuth Token  
10:26 Set Credentials for Slack  
11:18 Channels to Watch  
11:58 Attention: Change Trigger On Field  
13:08 Create New Slack Message Credential  
14:00 Inactive/Active Workflows  
14:30 Event Subscriptions  
14:47 Subscribe to bot events  
15:26 Request URL (Enable Events)  
16:23 Reinstall Warning Banner  
16:47 Add SlackApp To Channel  
17:36 Fix AI Agent Node  
18:30 Slack Message Node Configuration  
19:15 Remove n8n Attribution  
19:54 Inactive & Active Wbhook URLs  
20:34 Production WebHook URL (Active)  
21:12 Test Workflow!  
22:10 Recap  
——————

** **

 

## THE CHEATSHEET FOR SLACK + N8N

**Step 1: Set Up (n8n)**

1.  Create New Workflow in n8n
2.  Rename Workflow (top-left)
3.  Click 'Save'
4.  Click + symbol and search for Slack
5.  Search for 'Message' and click on Slack Node (On New Message Posted To Channel)
6.  Click + symbol and search for Slack
7.  Search for 'Message' and click on Slack Node (Send a Message)
8.  Click + symbol and search for AI. Click to add 'AI Agent' node
9.  Click + at the bottom of AI Agent node and add 'Open AI Chat Model'

**Step 2: Create New Slack Channel**

1.  Open Slack
2.  Right-click on Channels in left sidebar
3.  Click 'Create New Channel'
4.  Enter name of Channel
    1.  Click 'Next'
    2.  Click 'Skip'
    3.  Click 'Create'

**Step 3: Create New Slack App**

1.  Go to api.slack.com/apps (Slack API)
2.  Click 'Create New App'
3.  Click 'From scratch'
4.  Enter App Name
5.  Pick Slack Workspace
6.  Click 'Create'
7.  Basic Credentials Page
    1.  Signing Secret needed for Slack API Credentials

**Step 4: OAuth & Permissions (Scopes):**

1.  Click on 'OAuth & Permissions' in left sidebar
2.  Go to Scopes Section
3.  Bot Token Scopes
    1.  Click 'Add an OAuth Scope and add:
        1.  app_mentions:read, assistant:write, channels:history, channels:join, channels:read,chat:write, files:read, files:write, groups:history, groups:read, im: history, im: read, mpim:history, mpim:read, reactions:read, reactions:write, search:read.files, usergroups:read, usergroups:write
4.  User Token Scopes
    1.  Click 'Add an OAuth Scope and add:
        1.  channels:history, channels:write, stars:read, stars:write
5.  Click 'Install to Slack Workspace Name'
6.  Confirm Workspace is selected
7.  Review app permissions
8.  Click 'Install'
9.  OAuth Bot User Token Create
    1.  Used as 'Authorization Token in Slack API Credentials in n8n'

**Step 5: Set Slack API Credentials (n8n):**

1.  Go to n8n
2.  Double-click on Slack Trigger Node
3.  Go to 'Credential to connect with' in Parameters
4.  Click drop-down menu and select:
5.  Click on + New Credential
6.  For Access Token field, return to Slack API OAuth & Permissions Page
7.  Click 'Copy' button to copy 'Bot User OAuth Token'
8.  Return to n8n and Paste in Access Token field
9.  Return to Slack API...Basic Information
10. Copy Signing Secret and return to n8n
11. Paste in 'Signature Secret' field
12. Click in top left to rename credentials to 'Slack Trigger'
13. Click 'Save' and confirm 'Connection Successful'
14. **In Slack Trigger Node Parameters:**
    1.  Change 'Trigger On' field to Bot/App Mention
    2.  Click 'Add Field' in Options Section
        1.  Select 'Usernames or IDs toIgnore '
        2.  Select SlackApp name
15. (Optional) Set 2nd set of Credentials for Slack Message Node
    1.  Click on + New Credential
    2.  For Access Token field, return to Slack API OAuth & Permissions Page
    3.  Click 'Copy' button to copy 'Bot User OAuth Token'
    4.  Return to n8n and Paste in Access Token field
    5.  Return to Slack API...Basic Information
    6.  Copy Signing Secret and return to n8n
    7.  Paste in 'Signature Secret' field
    8.  Click in top left to rename credentials to 'Slack Message'
    9.  Click 'Save' and confirm 'Connection Successful'
    10. Slack Message Node Parameterss
        1.  Resource: Message
        2.  Operation: Send
        3.  Send Message To: Channel
        4.  Channel: Select Channel Name
        5.  Message Type: Simple Text Message
        6.  Message Text: Add Placeholder

**Step 6: Event Subscriptions in Slack API (Verify WebHook URLs)**

1.  Go to Slack API and click on 'Event Subscriptions' in left sidebar
2.  Toggle On 'Enable Events'
3.  Click 'Subscribe to Bot Events'
4.  Click 'Add Bot User Event'
    1.  app_mention
    2.  message.channels
    3.  message.groups
    4.  message.im
5.  Go to n8n
6.  Double-click on Slack Trigger Node
7.  Twirl open 'WebHook URLs'
8.  Select 'Test'
9.  Click to Copy Test WebHook URL to clipboard
10. Return to Slack API
11. Paste in Test WebHook URL and look for 'Verified'
12. Click 'Save Changes' at the bottom of the page

**Step 7: Add Slack App/Bot to Slack Channel**

1.  Open Slack
2.  Click on new channel name
3.  Go to message field
4.  Type @nameofslackappbot and type anything
5.  Press Return to send message
6.  Look for Slackbot message and click 'Add Them' to channel

**Step 8: Test n8n Workflow and Activate when ready**

1.  Return to n8n
2.  Save Workflow
3.  Click 'Execute Workflow' (while workflow is set to Inactive)
4.  Return to Slack and send @slackapp message so Slack Trigger can catch it
5.  If Prompt error in AI Agent, double-click to open
6.  Change Source for Prompt to 'Define Below'
7.  Go to left panel where 'Slack Trigger' info is
8.  Select 'Text' field and drag on Prompt field
9.  Click 'Execute Step' to test AI Agent & Model (output in right panel)
10. Double-click on Slack Message Node
11. In left panel (Input) select 'Text Output' from AI Agent
12. Drag 'Text Output' into 'Message Text' field
13. Execute Step and it should be sent to Slack channel
14. To turn of 'Automated with this n8n Workflow'
    1.  Go to Options
    2.  Select 'Include Link to Workflow'
    3.  Toggle Off
15. Click 'Save'
16. Toggle Inactive to Active
17. Double-click 'Slack Trigger Node'
18. Expand 'WebHook URLs'
19. Click 'Production' and click on URL to copy to clipboard
20. Go to Slack API
21. Go to 'Event Subscriptions'
22. Click 'Change'
23. Paste in Production WebHook URL and wait for 'Verified'
24. Go to bottom and click 'Save'
25. Test in Slack
    1.  Select Channel
    2.  Enter Message to @slackappbot
    3.  Type anything
    4.  Tap Return to Send
    5.  Wait for response

## Scopes (Bot Token)

`app_mentions:read`  
View messages that directly mention @finbar in conversations that the app is in

`assistant:write`  
Allow "finbar" to act as an App Agent

`channels:history`  
View messages and other content in public channels that "finbar" has been added to

`channels:join`  
Join public channels in a workspace

`channels:read`  
View basic information about public channels in a workspace

`chat:write`  
Send messages as @finbar

`files:read`  
View files shared in channels and conversations that "finbar" has been added to

`files:write`  
Upload, edit, and delete files as "finbar"

`groups:history`  
View messages and other content in private channels that "finbar" has been added to

`groups:read`  
View basic information about private channels that "finbar" has been added to

`im:history`  
View messages and other content in direct messages that "finbar" has been added to

`im:read`  
View basic information about direct messages that "finbar" has been added to

`mpim:history`  
View messages and other content in group direct messages that "finbar" has been added to

`mpim:read`  
View basic information about group direct messages that "finbar" has been added to

`reactions:read`  
View emoji reactions and their associated content in channels and conversations that "aimike" has been added to

`reactions:write`  
Add and edit emoji reactions

`search:read.files`  
Search a workspace's files

`usergroups:read`  
View user groups in a workspace

`usergroups:write`  
Create and manage user groups

`users.profile:read`  
View profile details about people in a workspace

`users:read`  
View people in a workspace

### Scopes (User Token)

Scopes that access user data and act on behalf of users that authorize them.

1.  `channels:history`
    1.  View messages and other content in a user’s public channels
2.  `channels:write`
    1.  Manage a user’s public channels and create new ones on a user’s behalf
3.  `stars:read`
    1.  View a user’s starred messages and files
4.  `stars:write`
    1.  Add or remove stars for a user

## Subscribe to bot events

1.  `app_mention`
2.  `message.channels`
3.  `message.groups`
4.  `message.im`
