---
title: "How To Use Inertial Bounce Expression in After Effects"
description: "This tutorial will show you how to use the Inertial Bounce Expression to add bouncing motion to any property  from one keyframe to the next based on velocity Adobe After Effects CC 2024."
pubDate: "2024-05-16T06:30:52"
updatedDate: "2024-05-15T21:34:51"
draft: false
type: "post"
slug: "inertialbounce"
permalink: "/inertialbounce/"
legacyPermalink: "https://www.mikemurphy.co/inertialbounce/"
canonicalUrl: "https://mikemurphy.ai/tutorials/inertialbounce/"
contentEra: "legacy"
visibility: "search"
author: "Mike Murphy"
featuredImage: "/assets/media/2024/05/INERTIAL-BOUNCE.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2024/05/INERTIAL-BOUNCE.jpg"
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
  id: "213821"
  postType: "post"
  rawWordCount: 545
seo:
  legacyTitle: "How To Use Inertial Bounce Expression in After Effects - Mike Murphy Co"
  legacyH1: "How To Use Inertial Bounce Expression in After Effects"
  legacyCanonical: "https://www.mikemurphy.co/inertialbounce/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 575
youtube: 
  - "https://youtu.be/dZML8QkhYmc"
---
<https://youtu.be/dZML8QkhYmc>

## Adobe After Effects CC 2024: How To Reverse Paste Keyframes

**Description:  
**This tutorial will show you how to use the Inertial Bounce Expression to add bouncing motion to any property from one keyframe to the next based on velocity Adobe After Effects CC 2024.

**Keyboard Shortcuts:**   
UU: Reveal All Keyframes  
EE: Reveal All Expressions  
Cmd/Ctrl + D: Duplicate  
P: Position Property  
S: Scale Property  
R: Rotation Property  
T: Opacity Property

**Expression Source:**   
[Intertial Bounce v1.2](https://www.graymachine.com/top-5-effects-expressions)

    Inertial Bounce Expression:
    amp = .1;
    freq = 2.0;
    decay = 2.0;
    n = 0;
    time_max = 4;
    if (numKeys > 0){
    n = nearestKey(time).index;
    if (key(n).time > time){
    n--;
    }}
    if (n == 0){ t = 0;
    }else{
    t = time - key(n).time;
    }
    if (n > 0 && t < time_max){
    v = velocityAtTime(key(n).time - thisComp.frameDuration/10);
    value + v*amp*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);
    }else{value}

**Variables To Customize:**   
amp = .1;  
freq = 2.0;  
decay = 2.0;

 

———————  
**To try or buy Adobe After Effects CC 2024:**  
https://mikemurphy.co/adobe (affiliate link)

⭕️ **Check out my new Domestika Course on Adobe Audition:**  
https://mikemurphy.co/domestika

——————

**Chapters:**  
00:00 Intro: About The Tutorial  
00:22 Expression In Description of Tutorial  
00:32 Expression + Transform Properties  
01:01 How To Add Inertial Bounce Expression  
01:11 Add To Position Property  
01:35 Add To Scale, Rotation & Opacity  
01:59 Preview Bounce Expression On All Properties  
02:11 Customize Expression  
02:39 How To Add Slider Controls  
02:54 Duplicate & Rename Slider Controls  
03:25 Expression Pick-whip To Slider Control  
04:04 Manually Change Values of Slider Controls  
04:28 Benefit of Slider Controls

**Software Used:  
**Adobe After Effects CC 2024 ([Click To Try or Buy](https://mikemurphy.co/adobe))

**How Add Expression To Transform Properties:**

1.  Create New Composition (1920 x 1080, 10 seconds)
2.  Add Graphic such as logo animating
3.  Animate on Position, Scale, Rotation and/or Opacity Properties
4.  Copy Inertial Bounce Expression to Clipboard (Cmd/Ctrl + C)
5.  Select Layer & Tap UU To Reveal All Keyframes
6.  Hold Option/Alt and click on stopwatch next to each property
7.  Past Inertial Bounce Expression (Cmd/Ctrl + V)

**How To Add Slider Controls:**

1.  Select Animated Layer
2.  Go to Effect Menu and then ‘Expression Controls’
3.  Click on ‘Slider Control’
4.  Duplicate Slider Control in ‘Effect Controls’ for each property with Expression added
5.  Rename Slider Controls to match Amplitude, Frequency, Delay for each Property (ex. Position-Amp, Position-Freq., Position-Decay

**How To Connect Expression To Slider Controls :**

1.  Select Animated Layer
2.  Tap EE to Reveal All Expressions
3.  Click in the Expression Editor on the Timeline
4.  Select/Highlight value for ‘amp=’
5.  Drag Expression Pick-whip to Slider Control
6.  Select/Highlight value for ‘freq=’
7.  Drag Expression Pick-whip to Slider Control
8.  Select/Highlight value for ‘decay=’
9.  Drag Expression Pick-whip to Slider Control
10. Repeat for each variable, property & Slider Control
11. Manually change values of all Slider Controls to original values in Expression
12. Customize to taste
13. Tap Spacebar to Preview
