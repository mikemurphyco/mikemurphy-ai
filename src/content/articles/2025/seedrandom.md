---
title: "How To Use seedRandom Expression in After Effects"
description: "This tutorial will show you how to use the seedRandom Expression with the wiggle expression in Adobe After Effects CC 2025."
pubDate: "2025-02-26T06:30:33"
updatedDate: "2025-02-25T21:51:59"
draft: false
type: "post"
slug: "seedrandom"
permalink: "/seedrandom/"
legacyPermalink: "https://www.mikemurphy.co/seedrandom/"
canonicalUrl: "https://mikemurphy.ai/tutorials/seedrandom/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2025/02/SeedRandom.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2025/02/SeedRandom.jpg"
categories: 
  - "Adobe After Effects"
  - "Tutorials"
tags: []
topics: []
search:
  include: true
  boost: 1.0
migration:
  dryRun: false
  prioritySample: false
  review: true
  eraRule: "pubDate before 2025-01-01 is legacy; on/after is ai"
  source: wordpress-wxr
wp:
  id: "214276"
  postType: "post"
  rawWordCount: 503
seo:
  legacyTitle: "How To Use seedRandom Expression in After Effects - Mike Murphy Co"
  legacyH1: "How To Use seedRandom Expression in After Effects"
  legacyCanonical: "https://www.mikemurphy.co/seedrandom/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 539
youtube: 
  - "https://youtu.be/SIVg9yXXeoQ"
---
<https://youtu.be/SIVg9yXXeoQ>

## After Effects + Photoshop CC 2025: How To Use seedRandom Expression

**Description:  
**This tutorial will show you how to use the seedRandom Expression with the wiggle expression in Adobe After Effects CC 2025.

**wiggle(3,50);**  
Frequency (3): It wiggles 3 times per second.  
Amplitude (50): It moves up to 50 pixels away from its original spot.

- **seedRandom(seed,true):**  
  ‘Seed’ is just an identifier: The seed (whether a number like 1 or index or a slider value) is like a label that tells After Effects, “Hey, use this random pattern.” It doesn’t change the size or speed—just picks which wiggle you get.
- **“index** is the layer’s number—1, 2, 3—so each layer gets a unique seed.
- **‘true’** keeps it consistent: Spot on. Setting seedRandom(seed, true) makes the randomness “timeless”—the wiggle pattern stays the same throughout the animation and every time you play it.
- **‘false’** makes it unpredictable: If you use seedRandom(seed, false), the randomness becomes “time-based”—the wiggle pattern changes every frame, making it unpredictable.

———————  
**After Effects User Guide Course:**  
https://aeuserguide.com

**Gear I Use: \|  
**https://mikemurphy.co/resources   
**  
To try or buy Adobe After Effects CC 2025:**  
https://mikemurphy.co/adobe (affiliate link)

**Terrapin Textures:**  
https://terrapintextures.com

⭕️ **Check out my Domestika Course on Adobe Audition:**  
https://mikemurphy.co/domestika

——————  
**Chapters:**  
00:00 Intro: About The Tutorial  
00:30 Add Wiggle Expression to Position  
00:50 Wiggle Expression Values  
01:17 Copy + Paste Wiggle  
01:44 Seed Number  
02:14 Seed Random Expression  
02:33 seedRandom + True/False  
03:23 Control Wiggle (Seed Number)  
04:31 Seed Random + Index  
04:54 Index Column in Layers Panel  
05:29 Duplicating Layers w/Seed Numbers  
05:57 Change Seed Number to Index  
06:30 Advantage of Using Index  
06:57 Change Index to Seed Number

**Software Used:  
**Adobe After Effects CC 2025 ([Click To Try or Buy](https://mikemurphy.co/adobe))

**How To Use seedRandom Expression (Seed Number****)**

1.  Add Logo, Text or Footage Layer
2.  Select Footage Layer
3.  Tap ‘P’ for Position Property
4.  Enter seedRandom(1, true);  
    wiggle(3,50)
5.  Duplicate footage layer (as many times as you want)
6.  Tap Spacebar to Preview
7.  Animations will wiggle the same because Seed Number is the same.
8.  Change the seed number (first number in seedRandom) to add variety of wiggle

**How To Use seedRandom Expression (Index)**

1.  Add Logo, Text or Footage Layer
2.  Select Footage Layer
3.  Tap ‘P’ for Position Property
4.  Enter seedRandom(index,true);  
    wiggle(3,50)
5.  Duplicate footage layer (as many times as you want)
6.  Tap Spacebar to Preview
7.  Animations will wiggle differently because Seed Number Index assigns random seed to each layer
