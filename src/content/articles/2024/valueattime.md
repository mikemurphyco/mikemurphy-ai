---
title: "How To Use ValueAtTime Expression To Loop Mask & Shape Paths in After Effects"
description: "This tutorial will show you how to use the ValueAtTime Expression to loop Mask & Shape Paths in After Effects as a workaround or substitute for the loopOut Expression."
pubDate: "2024-04-23T06:30:24"
updatedDate: "2024-04-22T22:29:50"
draft: false
type: "post"
slug: "valueattime"
permalink: "/valueattime/"
legacyPermalink: "https://www.mikemurphy.co/valueattime/"
canonicalUrl: "https://mikemurphy.ai/tutorials/valueattime/"
contentEra: "legacy"
visibility: "search"
author: "Mike Murphy"
featuredImage: "/assets/media/2024/04/LOOP-MASKS-SHAPES.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2024/04/LOOP-MASKS-SHAPES.jpg"
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
  id: "213776"
  postType: "post"
  rawWordCount: 390
seo:
  legacyTitle: "How To Use ValueAtTime Expression To Loop Mask & Shape Paths in After Effects - Mike Murphy Co"
  legacyH1: "How To Use ValueAtTime Expression To Loop Mask & Shape Paths in After Effects"
  legacyCanonical: "https://www.mikemurphy.co/valueattime/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 440
youtube: 
  - "https://youtu.be/RE46KofmR4c"
---
<https://youtu.be/RE46KofmR4c>

## Adobe After Effects CC 2024: How To Use ValueAtTime Expression To Loop Mask & Shape Paths

**Description:  
**This tutorial will show you how to use the ValueAtTime Expression to loop Mask & Shape Paths in After Effects as a workaround or substitute for the loopOut Expression.

**ValueAt Time Expression: **  
valueAtTime(time%key(numKeys).time)

**loopOut Express Limitations:   
**loopOut Expression works on Transform Properties (Anchor, Position, Scale, Rotation, Opacity)  
loopOut Expression does not work on the user-defined Mask or Shape Path Properties.

**ValueAtTime Expression Notes:**   
Changing the position of the keyframe affects where the loop starts and ends.

If the keyframes are at the start of the Timeline it will loop normally.  
If you move further down the timeline it looks at the empty space as part of the loop

———————  
**To try or buy Adobe After Effects CC 2024:**  
https://mikemurphy.co/adobe (affiliate link)

⭕️ **Check out my new Domestika Course on Adobe Audition:**  
https://mikemurphy.co/domestika

**Murphy Doodle Font:**  
https://mikemurphy.gumroad.com/l/murphydoodle

**Terrapin Textures:**  
https://mikemurphy.gumroad.com/

——————

**Chapters:**  
00:00 Intro: About The Tutorial  
00:16 Transform vs. Mask/Shape Paths  
00:32 loopOut Error Message  
00:44 Workaround: Use valueAtTime  
01:01 Example: Mask + Shape Path Animation  
01:27 Preview Animation + Error Message  
01:46 Adding valueAtTime Expression  
02:15 Note: Placement of Keyframes  
02:49 Moving Keyframes Down The Timeline  
03:41 Outro

**Software Used:  
**Adobe After Effects CC 2024 ([Click To Try or Buy](https://mikemurphy.co/adobe))

**How To Use The ValueAtTime Expression:**

1.  Create a new Composition
2.  Add Text Layer
3.  Create a Mask using the Shape Tool
4.  Animate Mask Path property to reveal text
5.  Copy keyframes and move CTI forward and paste keyframes
6.  Go to Animation Menu
7.  Click on ‘Keyframe Assistant’
8.  Select ‘Time-Reverse Keyframes’ to animate text off
9.  Press Option or Alt and click on Stopwatch next to ‘Mask Path’
10. Enter ValueAtTime Expression \>\>\>\>\>
11. valueAtTime(time%key(numKeys).time)
12. Press Spacebar to Preview
13. Repeat for Shape Layer Animations**  
    **
