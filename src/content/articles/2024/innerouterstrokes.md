---
title: "Inside & Outside Shape Layer Strokes in After Effects"
description: "This tutorial will show you how to change the stroke on shape layers to the inside and outside of the shape layer paths in Adobe After Effects CC 2024."
pubDate: "2024-01-30T00:30:50"
updatedDate: "2024-01-29T22:14:03"
draft: false
type: "post"
slug: "innerouterstrokes"
permalink: "/innerouterstrokes/"
legacyPermalink: "https://www.mikemurphy.co/innerouterstrokes/"
canonicalUrl: "https://mikemurphy.ai/innerouterstrokes/"
contentEra: "legacy"
visibility: "search"
author: "Mike Murphy"
featuredImage: "/assets/media/2024/01/STROKE_WIDE.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2024/01/STROKE_WIDE.jpg"
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
  id: "213503"
  postType: "post"
  rawWordCount: 425
seo:
  legacyTitle: "Inside & Outside Shape Layer Strokes in After Effects - Mike Murphy Co"
  legacyH1: "Inside & Outside Shape Layer Strokes in After Effects"
  legacyCanonical: "https://www.mikemurphy.co/innerouterstrokes/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 464
youtube: 
  - "https://youtu.be/2Z-SyKScHy0"
---
<https://youtu.be/2Z-SyKScHy0>

## Adobe After Effects CC 2024: How To Get Inner & Outer Strokes on Shape Layers

**Description:  
**This tutorial will show you how to change the stroke on shape layers to the inside and outside of the shape layer paths in Adobe After Effects CC 2024.

**Expression Used: **  
content("Ellipse 1").content("Stroke 1").strokeWidth/2 (outside path)  
content("Ellipse 1").content("Stroke 1").strokeWidth/-2 (inside path)

———————  
**To try or buy Adobe After Effects CC 2024:**  
https://mikemurphy.co/adobe (affiliate link)

**Terrapin Textures Video Assets:**  
https://mikemurphy.gumroad.com/l/orangepastel

⭕️ **Check out my new Domestika Course on Adobe Audition:**  
https://mikemurphy.co/domestika

——————

**Chapters:**  
00:00 Intro: About The Tutorial  
00:22 Create A New Shape Layer  
00:48 Strokes + Path Position  
01:08 Add Offset Paths  
01:52 Problem: Changing Stroke Width & Offset  
02:10 Fix: Add Expression  
02:42 Stroke Width = Offset Path  
03:01 Divide Expression In Half  
03:52 Change from Outer to Inner Stroke  
04:10 Recap: Inner & Outer Strokes  
04:37 Flip Inner Stroke To Outer Stroke

**Software Used:  
**Adobe After Effects CC 2024 ([Click To Try or Buy](https://mikemurphy.co/adobe))

**How To Change Stroke Position on Shape Layers to Inside or Outside Path:**

1.  Create a new shape using the Shape Took (Rectangle Tool, for example)
2.  Set Fill & Stroke Color & Stroke Width (px)
3.  Click and drag out a Shape
4.  Go to Layers Panel and twirl open shape layer properties
5.  Click the arrow next to ‘Add’
6.  Select ‘Offset Paths’
7.  Change ‘Amount’ to offset the position of the path to stroke
8.  Setting the Offset Path Amount to 1/2 of the Stroke Width will place stroke on the outside
9.  Setting the Offset Path Amount to -1/2 Stroke Width will place stroke on the inside

**How To Add Expression To Offset Path:**

1.  Press Option or Alt Key
2.  Click on the stopwatch next to ‘Amount’
3.  Click on Expression PickWhip
4.  Drag to ‘Stroke Width’
5.  Click in the Expression Editor and add /2 at the end to place the stroke on the outside of path
6.  Click in the Expression Editor and add /-2 at the end to place the stroke on the inside of path
