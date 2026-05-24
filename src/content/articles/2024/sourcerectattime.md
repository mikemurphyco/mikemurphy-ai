---
title: "How To Create Auto-Resize Text Boxes in After Effects (sourceRectAtTime)"
description: "This tutorial will show you how to add the sourceRectAtTime Expression to the Size Property of a Shape to create auto-resizing text boxes in Adobe After Effects CC 2024."
pubDate: "2024-06-26T06:30:03"
updatedDate: "2024-06-17T21:49:18"
draft: false
type: "post"
slug: "sourcerectattime"
permalink: "/sourcerectattime/"
legacyPermalink: "https://www.mikemurphy.co/sourcerectattime/"
canonicalUrl: "https://mikemurphy.ai/sourcerectattime/"
contentEra: "legacy"
visibility: "search"
author: "Mike Murphy"
featuredImage: "/assets/media/2024/06/SOURCE-RECT.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2024/06/SOURCE-RECT.jpg"
categories: 
  - "Adobe"
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
  id: "213874"
  postType: "post"
  rawWordCount: 349
seo:
  legacyTitle: "How To Create Auto-Resize Text Boxes in After Effects (sourceRectAtTime) - Mike Murphy Co"
  legacyH1: "How To Create Auto-Resize Text Boxes in After Effects (sourceRectAtTime)"
  legacyCanonical: "https://www.mikemurphy.co/sourcerectattime/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 396
youtube: 
  - "https://youtu.be/BunGpgMtm08"
---
<https://youtu.be/BunGpgMtm08>

## Adobe After Effects CC 2024: How To Create Auto-Resize Text Boxes

**Description:  
**This tutorial will show you how to add the sourceRectAtTime Expression to the Size Property of a Shape to create auto-resizing text boxes in Adobe After Effects CC 2024.

**Keyboard Shortcuts: **  
F2: Deselect All Layers  
SS: Solo Property  
 Expression: sourceRectAtTime()

**Final Tutorial Expression:**  
w= thisComp.layer(index+1).sourceRectAtTime().width;  
h= thisComp.layer(index+1).sourceRectAtTime().height; \[w,h\];

———————  
**To try or buy Adobe After Effects CC 2024:**  
https://mikemurphy.co/adobe (affiliate link)

⭕️ **Check out my new Domestika Course on Adobe Audition:**  
https://mikemurphy.co/domestika

——————

**Chapters:**  
00:00 Intro: About The Tutorial  
00:22 Add Text  
00:34 Align Text + Anchor Point  
00:44 Create Shape Layer  
00:58 Fill & Stroke  
01:13 Uncheck 'Bezier Path'  
01:34 Rectangle Size Property  
01:51 Solo Property  
02:03 Width & Height  
02:15 Add Expression  
02:29 Add Width Variable  
03:04 Add Height Variable  
03:29 Add Array  
03:59 Add Padding  
04:32 Change Layer Name To Index  
04:58 Fix: Lock Anchor Point

**Software Used:  
**Adobe After Effects CC 2024 ([Click To Try or Buy](https://mikemurphy.co/adobe))

**How To Use sourceRectAtTime Expression:**

1.  Create New Composition
2.  Add Parametric Shape (uncheck Bezier Path)
3.  Add Text Layer Below Shape Layer
4.  Twirl open Shape Layer and locate ‘Size’ Property
5.  Hold Option/Alt key and click on stopwatch for ‘Size’ Property
6.  Add variable
7.  w= thisComp.layer(index+1).sourceRectAtTime().width+100;
8.  h= thisComp.layer(index+1).sourceRectAtTime().height+100;
9.  Add Array: \[w,h\];
10. Shape should fit around Text with some padding (+100)

**How To Add Fix Alignment Issue:**

1.  Open Effects & Presets Panel
2.  Search for ‘Anchor Point’
3.  Drag ‘Lock Ancho Point’ on Shape & Text Layer
4.  Fixed!
