---
title: "Fix: Hand-Drawn Effect Stopping At 22 Seconds (After Effects)"
description: "This tutorial will show you how to fix the issue of the animation stopping after a certain amount of time when using using the Time Expression + Turbulent Displace in Adobe After Effects CC 2023."
pubDate: "2023-10-03T06:30:59"
updatedDate: "2023-10-04T22:06:37"
draft: false
type: "post"
slug: "handdrawnfix"
permalink: "/handdrawnfix/"
legacyPermalink: "https://www.mikemurphy.co/handdrawnfix/"
canonicalUrl: "https://mikemurphy.ai/handdrawnfix/"
contentEra: "legacy"
visibility: "search"
author: "Mike Murphy"
featuredImage: "/assets/media/2023/10/Hand-Drawn-Fix_Wide.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2023/10/Hand-Drawn-Fix_Wide.jpg"
categories: 
  - "Adobe After Effects"
  - "Tutorials"
tags: []
topics: []
search:
  include: true
  boost: 0.7
migration:
  dryRun: false
  prioritySample: false
  review: false
  eraRule: "pubDate before 2025-01-01 is legacy; on/after is ai"
  source: wordpress-wxr
wp:
  id: "212923"
  postType: "post"
  rawWordCount: 430
seo:
  legacyTitle: "Fix: Hand-Drawn Effect Stopping At 22 Seconds (After Effects) - Mike Murphy Co"
  legacyH1: "Fix: Hand-Drawn Effect Stopping At 22 Seconds (After Effects)"
  legacyCanonical: "https://www.mikemurphy.co/handdrawnfix/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 490
youtube: 
  - "https://youtu.be/AEMuhZINkaY"
---
<https://youtu.be/AEMuhZINkaY>

## Adobe After Effects CC 2023: Fix: Hand-Drawn Effect Stopping At 22 Seconds

**Description:  
**This tutorial will show you how to fix the issue of the animation stopping after a certain amount of time when using using the Time Expression + Turbulent Displace in Adobe After Effects CC 2023.

**Note:  
**This fix will work for the Hand-Drawn Effect or anytime you are using the Time Expression on the Evolution Property of Turbulent Express (such as Line Boil Effect) and the animation stops before the end of the Timeline

**The Issue:  
**The Evolution Options has a limit of 91 Evolutions and when that number is reached by the Time Expression, the animation stops. The higher the number of time\*expression, the faster the number of Evolutions will reach 91 and stop the animation.

**The Fix (Snippet):  
**%32768

**Example:  
**Add the snippet at the end of the Time Expression…time\*1500%32768

**Resources Mentioned in Tutorial:**

- <https://youtu.be/VJwjBiLje68?si=Dm7KYQXQTbCQl5mq> (YouTube Channel)**  
  **
- <https://creativecow.net/forums/thread/evolution-time-expression-cap/> (Creative Cow Forum)\|  
- <https://community.adobe.com/t5/after-effects-discussions/turbulent-displace-stops/td-p/13780566> (Dan Ebberts, AE Expression guru)

**  
Hand-Drawn Effect Tutorial:  
**<https://youtu.be/xyfocwjQlew?si=82yAKnF990s3JS7U>

Chapters:  
00:00  Intro: About This Tutorial  
00:11  Why Make This Tutorial?  
00:25  The Fix (TLDR Version)  
00:37  Sources For The Fix  
00:50  Demo: Hand-Drawn Effect  
01:20  The Culprit: Turbulent Displace + Time Expression  
01:38  Evolution Options Limit (Magic Number 91)  
01:51  Reveal All Expressions (EE)  
02:29  Evolutions Explained (1 = 360)  
02:45  Calculator Math Explanation  
03:15  Fix \#1 (Decrease Wiggle Value Amount)  
03:38  Fix \#2: Cut & Paste from Evolution to Random Seed  
04:03  Fix 3 (Easiest): Add Snippet  
04:22  What does the snippet do?

**Software Used:  
**Adobe After Effects CC 2023 ([Click To Try or Buy](https://mikemurphy.co/adobe))

**How To Fix The Hand-Drawn Effect From Stopping in Adobe After Effects CC 2023:**

1.  Open or create new Composition
2.  Add Layers such as Text or Graphics
3.  Add the Hand-Drawn Effect via the Effects & Presets Panel
4.  Locate the 2 Turbulent Displace Effects in ‘Effect Controls’
5.  Tap EE to Reveal All Expressions
6.  Add %32768  at the end of the Time\* Expression
