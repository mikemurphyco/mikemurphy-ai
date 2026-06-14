---
title: "Fix: Line Boil Turbulent Displace Stopping"
description: "This tutorial will show you how to fix the issue of a Line Boil animation using Turbulent Displace Effect stopping after a certain amount of time when using using the Time Expression on the Evolutions Property Adobe After Effects CC 2023."
pubDate: "2023-10-05T06:30:22"
updatedDate: "2023-10-04T22:11:32"
draft: false
type: "post"
slug: "fixlineboil"
permalink: "/fixlineboil/"
legacyPermalink: "https://www.mikemurphy.co/fixlineboil/"
canonicalUrl: "https://mikemurphy.ai/tutorials/fixlineboil/"
contentEra: "legacy"
visibility: "search"
author: "Mike Murphy"
featuredImage: "/assets/media/2023/10/LINE-BOIL_WIDE.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2023/10/LINE-BOIL_WIDE.jpg"
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
  id: "212939"
  postType: "post"
  rawWordCount: 404
seo:
  legacyTitle: "Fix: Line Boil Turbulent Displace Stopping - Mike Murphy Co"
  legacyH1: "Fix: Line Boil Turbulent Displace Stopping"
  legacyCanonical: "https://www.mikemurphy.co/fixlineboil/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 453
youtube: 
  - "https://youtu.be/VSU9S7siGCI"
---
<https://youtu.be/VSU9S7siGCI>

## Adobe After Effects CC 2023: Fix: Hand-Drawn Effect Stopping At 22 Seconds

**Description:  
**This tutorial will show you how to fix the issue of a Line Boil animation using Turbulent Displace Effect stopping after a certain amount of time when using using the Time Expression on the Evolutions Property Adobe After Effects CC 2023.

**The Issue:  
**The Evolution Options has a limit of 91 Evolutions and when that number is reached by the Time Expression, the animation stops. The higher the number of time\*expression, the faster the number of Evolutions will reach 91 and stop the animation.

**The Fix (Add Snippet to the end of the Time Expression):**  
%32768

**Example:**  
time\*20000%32768

**Resources Mentioned in Tutorial:**

- https://youtu.be/VJwjBiLje68?si=Dm7KYQXQTbCQl5mq (YouTube Channel)
- https://creativecow.net/forums/thread/evolution-time-expression-cap/ (Creative Cow Forum)
- https://community.adobe.com/t5/after-effects-discussions/turbulent-displace-stops/td-p/13780566 (Dan Ebberts, AE Expression guru)

**  
Hand-Drawn Effect Tutorial:  
**https://youtu.be/xyfocwjQlew?si=82yAKnF990s3JS7U

**Chapters:  
**00:00  Intro: About This Tutorial  
00:19  SideNote: This Video Is Similar To Previous Tutorial  
00:40  Comp Overview + Line Boil Effect  
01:06  Problem: Animation Stops At 16 Seconds  
01:18  Cause of Problem: Evolution Property Limit (91)  
01:48  Time Expression + Evolution Limit  
02:17  The Fix: Adding Snippet of Code (%32768)

**Software Used:  
**Adobe After Effects CC 2023 ([Click To Try or Buy](https://mikemurphy.co/adobe))

**How To Fix Line Boil Turbulent Displace Stopping in Adobe After Effects CC 2023:**

1.  Open or create new Composition (30 seconds or longer)
2.  Add Text Layer
3.  Add the Turbulent Displace Effect
4.  Option + Click on the Stopwatch next to Evolution
5.  Enter Expression time\*1500 (or any higher number)
6.  Tap the Spacebar to preview and notice that it stops after about 15-20 seconds
7.  Tap EE to Reveal All Expressions
8.  Add %32768  at the end of the Time\* Expression and that will fix the issue
9.  The expression should now look like this time\*1500%32768
10. The animation will run as long as you need it after adding the snippet %32768
