---
title: "How To Add valueAtTime Expression (Position) in After Effects"
description: "This tutorial will show you how to add the valueAtTime Expression to the Rotation Property in Adobe After Effects CC 2024 to reference the value of rotation property of another layer at a specified time on the animation. This will also work on Scale & Opacity Properties"
pubDate: "2024-06-20T06:30:23"
updatedDate: "2024-06-17T14:18:59"
draft: false
type: "post"
slug: "vatposition"
permalink: "/vatposition/"
legacyPermalink: "https://www.mikemurphy.co/vatposition/"
canonicalUrl: "https://mikemurphy.ai/tutorials/vatposition/"
contentEra: "legacy"
visibility: "search"
author: "Mike Murphy"
featuredImage: "/assets/media/2024/06/VAT_POSITION.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2024/06/VAT_POSITION.jpg"
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
  id: "213866"
  postType: "post"
  rawWordCount: 411
seo:
  legacyTitle: "How To Add valueAtTime Expression (Position) in After Effects - Mike Murphy Co"
  legacyH1: "How To Add valueAtTime Expression (Position) in After Effects"
  legacyCanonical: "https://www.mikemurphy.co/vatposition/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 458
youtube: 
  - "https://youtu.be/0beWF6-ZjXE"
---
<https://youtu.be/0beWF6-ZjXE>

## Adobe After Effects CC 2024: How To Add valueAtTime Expression (Position)​

**Description:  
**This tutorial will show you how to add the valueAtTime Expression to the Position Property in Adobe After Effects CC 2024 to reference the value of Position (X) property of another layer at a specified time on the animation. This will also work on Anchor Point Property.

**valueAtTime (t):**   
Returns the value of a property at the specified time, in seconds.

**Keyboard Shortcuts**:   
P: Position Property

**Expression:**   
.valueAtTime(time);  
index - 1 (look at layer above)  
index + 1 (look at layer below)

**Tutorial Expression:**  
temp=thisComp.layer(index+1).transform.position.valueAtTime(time-1); \[temp\[0\], value\[1\]\]

**valueAtTime (Rotation Tutorial):**   
https://youtu.be/quVQ507NR7E 

———————  
**To try or buy Adobe After Effects CC 2024:**  
https://mikemurphy.co/adobe (affiliate link)

⭕️ **Check out my new Domestika Course on Adobe Audition:**  
https://mikemurphy.co/domestika

——————

**Chapters:**  
00:00 Intro: About The Tutorial  
00:25 What is valueAtTime?  
00:43 Create Animation  
01:10 Add Expression (Press Opt/Alt)  
01:22 Why Did Layer Disappear?  
01:35 X&Y Values of Position  
01:50 Create Variables for X & Y  
02:01 Add Temp Variable  
02:20 Add .valueAtTime to Expression  
02:41 Enter Time Value  
02:54 Preview Animation  
03:04 Position Property Index (0,1,2)  
03:28 Add Array for X&Y  
03:50 Adding Values in Array  
04:06 Layer 1 Reappears!  
04:17 Add Index (Layer Name)

**Software Used:  
**Adobe After Effects CC 2024 ([Click To Try or Buy](https://mikemurphy.co/adobe))

**How To Use valueAtTime Expression On Position (X Value):**

1.  Create New Composition
2.  Add 2 Logos or Graphic Layers
3.  Logo 1 on Layer 1
4.  Logo 2 on Layer 2
5.  Select Both Layers
6.  Tap P for Rotation
7.  Click stopwatch to add 2 keyframes
8.  Move CTI forward in time
9.  Shift + Click and move layers to the right
10. Press Spacebar to preview simple left to right animation
11. Hold Option/Alt key and click on stopwatch for Position on Layer 1
12. Add variable
13. temp=thisComp.layer(index+1).transform.position.valueAtTime(time-1);
14. Add Array: \[temp\[0\], value\[1\]\]
15. Tap Spacebar to preview
