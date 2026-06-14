---
title: "How To Create Number Counters with Decimals, Symbols & Commas in After Effects"
description: "This tutorial will show you how to create a number counter and control decimal places, add symbols and commas in Adobe After Effects CC 2024."
pubDate: "2024-05-03T06:30:49"
updatedDate: "2024-05-03T06:57:10"
draft: false
type: "post"
slug: "decimals"
permalink: "/decimals/"
legacyPermalink: "https://www.mikemurphy.co/decimals/"
canonicalUrl: "https://mikemurphy.ai/tutorials/decimals/"
contentEra: "legacy"
visibility: "search"
author: "Mike Murphy"
featuredImage: "/assets/media/2024/05/DECIMALS.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2024/05/DECIMALS.jpg"
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
  id: "213796"
  postType: "post"
  rawWordCount: 607
seo:
  legacyTitle: "How To Create Number Counters with Decimals, Symbols & Commas in After Effects - Mike Murphy Co"
  legacyH1: "How To Create Number Counters with Decimals, Symbols & Commas in After Effects"
  legacyCanonical: "https://www.mikemurphy.co/decimals/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 635
youtube: 
  - "https://youtu.be/Jm4wjq_Vsn0"
---
<https://youtu.be/Jm4wjq_Vsn0>

## Adobe After Effects CC 2024: Slider Control Counter, Decimals, Symbols & Commas

**Description:  
**This tutorial will show you how to create a number counter and control decimal places, add symbols and commas in Adobe After Effects CC 2024.

**Keyboard Shortcuts:**   
EE: Reveal Expressions  
UU: Reveal Keyframes

**Control Decimal Places:  
.**value.toFixed()…no decimal places  
.value.toFixed(2)…2 decimal places

Countdown Timer Tutorial (from 2023):   
https://youtu.be/bY1CD8Cr0a8?si=z4E4yUPveZPJNo-Q

**Note:**  
Slider Controls are limited to 1,000,000 for Number Counters (there are tons of workarounds if you search on YouTube if you need to go higher than 1 million)

 

——————

    Auto-Add Commas Expression (Default):  
    num = value;
    function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    addCommas(num)

    Modified Expression Used in Tutorial: 
    num = effect("Slider Control")("Slider").value.toFixed(); 
    function addCommas(x) { return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
    } 
    addCommas(num)

**Expression Source:  **  
[Ukra Media](https://youtu.be/dhWo9-0NgG8?si=YRwZsfBOzI2-cyEO)

———————  
**To try or buy Adobe After Effects CC 2024:**  
https://mikemurphy.co/adobe (affiliate link)

⭕️ **Check out my new Domestika Course on Adobe Audition:**  
https://mikemurphy.co/domestika

——————

**Chapters:**  
00:00 Intro: About The Tutorial  
00:28 Add Text Layer  
00:41 Center Text + Number Counter  
01:00 Add Slider Control  
01:11 PickWhip Source Text To Slider Control  
01:30 How To Animate Number Counter  
01:59 How To Control Decimal Places  
02:18 Add .value.toFixed()  
02:50 How To Add Symbols (\$,%)  
02:19 Add Symbols Before (\$)  
03:42 Add Symbols After (%)  
04:02 Add Commas

**Software Used:  
**Adobe After Effects CC 2024 ([Click To Try or Buy](https://mikemurphy.co/adobe))

**How Create Number Counter Using Slider Control:**

1.  Create New Composition (1920 x 1080, 10 seconds)
2.  Add Text Layer
3.  Select Text Layer
4.  Go to Paragraph Panel…Click on ’Center Text’
5.  Go to Align Panel and center the text
6.  Press Cmd/Ctrl + Double-Click on Pan Behind Tool to center Anchor Point
7.  Go to Effect Menu…Expression Controls…Slider Control
8.  Twirl open the Text Layer
9.  Twirl open ‘Text’
10. Press Option or Alt Key and click on stopwatch next to Source Text
11. Locate pick-whip and drag it to ‘Slider Control’ in the Effect Controls panel
12. Drag Playhead to the beginning of the Timeline
13. Click on the stopwatch for Slider Control
14. Enter Value of 0
15. Drag playhead down the timeline
16. Change the Slider Control value to 500 or desired end number
17. Press Spacebar to Preview
18. The countdown should be working but with decimals

**How To Remove Decimals & Round Down Countdown Timer:**

1.  Select Text Layer
2.  Tap ‘EE’ to reveal expressions
3.  Click in the expression editor on Timeline
4.  Move the cursor to the end of the expression
5.  Add .value.toFixed()
6.  .value.toFixed() for no decimals
7.  .value.toFixed(2) for 2 decimals

**How To Add Symbols Before & After Numbers:**

1.  Select Text Layer
2.  Tap ‘EE’ to reveal expressions
3.  Click in the expression editor on Timeline
4.  Move the cursor to the beginning of the expression
5.  “\$” + to add dollar sign before number
6.  Move the cursor to the end of the expression
7.  \+ “%” + to add percent sign after number

**How To Add Commas for numbers over 999:**

1.  Select Text Layer
2.  Tap ‘EE’ to reveal expressions
3.  Click in the expression editor on Timeline
4.  Paste expression from above
5.  Replace ‘value’ with the expression created from Slider Control
6.  Tap Spacebar to preview
