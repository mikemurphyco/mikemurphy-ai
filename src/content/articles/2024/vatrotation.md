---
title: "valueAtTime Expression (Rotation) in After Effects"
description: "This tutorial will show you how to add the valueAtTime Expression to the Rotation Property in Adobe After Effects CC 2024 to reference the value of rotation property of another layer at a specified time on the animation. This will also work on Scale & Opacity Properties."
pubDate: "2024-06-18T06:30:36"
updatedDate: "2024-06-17T12:53:28"
draft: false
type: "post"
slug: "vatrotation"
permalink: "/vatrotation/"
legacyPermalink: "https://www.mikemurphy.co/vatrotation/"
canonicalUrl: "https://mikemurphy.ai/tutorials/vatrotation/"
contentEra: "legacy"
visibility: "search"
author: "Mike Murphy"
featuredImage: "/assets/media/2024/06/VAT_ROTATION.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2024/06/VAT_ROTATION.jpg"
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
  id: "213860"
  postType: "post"
  rawWordCount: 396
seo:
  legacyTitle: "valueAtTime Expression (Rotation) in After Effects - Mike Murphy Co"
  legacyH1: "valueAtTime Expression (Rotation) in After Effects"
  legacyCanonical: "https://www.mikemurphy.co/vatrotation/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 432
youtube: 
  - "https://youtu.be/quVQ507NR7E"
---
<https://youtu.be/quVQ507NR7E>

## Adobe After Effects CC 2024: How To Add valueAtTime Expression (Rotation)​

**Description:  
**This tutorial will show you how to add the valueAtTime Expression to the Rotation Property in Adobe After Effects CC 2024 to reference the value of rotation property of another layer at a specified time on the animation. This will also work on Scale & Opacity Properties.

**valueAtTime (t):**   
Returns the value of a property at the specified time, in seconds.

**Keyboard Shortcuts:   
**R: Rotation Property

**Expression:**   
.valueAtTime(time);  
index - 1 (look at layer above)  
index + 1 (look at layer below)

**Tutorial Expression:**  
thisComp.layer(index-1).transform.scale.valueAtTime(time-2);

**valueAtTime (Position): **

———————  
**To try or buy Adobe After Effects CC 2024:**  
https://mikemurphy.co/adobe (affiliate link)

⭕️ **Check out my new Domestika Course on Adobe Audition:**  
https://mikemurphy.co/domestika

——————

**Chapters:**  
00:00 Intro: About The Tutorial  
00:30 What is valueAtTime?  
01:04 Create Animation  
01:41 Add Expression  
02:25 Breakdown of Expression  
03:05 Layer Index (index -1)  
04:19 Duplicating Layer Fun

**Software Used:  
**Adobe After Effects CC 2024 ([Click To Try or Buy](https://mikemurphy.co/adobe))

**How To Use valueAtTime Expression On Rotation, Scale + Opacity:**

1.  Create New Composition
2.  Add 2 Logos or Graphic Layers
3.  Logo 1 on Layer 1
4.  Logo 2 on Layer 2
5.  Select Both Layers
6.  Tap R for Rotation
7.  Click stopwatch to add 2 keyframes
8.  Move CTI forward in time and enter 2 for rotations
9.  Hold Option/Alt key and click on stopwatch for Rotation on Layer 1
10. Change “Layer Name” to index-1
11. Go to the end of the expression
12. add a Period (.)
13. Enter valueAtTime(time-2);
14. Tap Spacebar to preview

**How To Add Layer Styles To Track Mattes:**  
1. Create a New Composition or Open Existing Comp  
2. Drag Track Matte Comp into any other Composition  
3. Select Track Matte Comp in Layers Panel  
4. Go to ‘Layer’ menu and select Layer Styles  
5. Add Layer Style to Track Matte Comp  
6. Layer Style should show up on the Track Matte
