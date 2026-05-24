---
title: "Dropdown Menu Expression Control in After Effects"
description: "This tutorial will show you how to use the Dropdown Menu Control Effect to create simple menus with multiple choice options to control various aspects of your animations in Adobe After Effects CC 2025"
pubDate: "2024-12-25T06:30:53"
updatedDate: "2024-12-24T23:08:00"
draft: false
type: "post"
slug: "dropdownmenu"
permalink: "/dropdownmenu/"
legacyPermalink: "https://www.mikemurphy.co/dropdownmenu/"
canonicalUrl: "https://mikemurphy.ai/dropdownmenu/"
contentEra: "legacy"
visibility: "search"
author: "Mike Murphy"
featuredImage: "/assets/media/2024/12/DROPDOWN.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2024/12/DROPDOWN.jpg"
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
  prioritySample: true
  review: true
  eraRule: "pubDate before 2025-01-01 is legacy; on/after is ai"
  source: wordpress-wxr
wp:
  id: "214172"
  postType: "post"
  rawWordCount: 747
seo:
  legacyTitle: "Dropdown Menu Expression Control in After Effects - Mike Murphy Co"
  legacyH1: "Dropdown Menu Expression Control in After Effects"
  legacyCanonical: "https://www.mikemurphy.co/dropdownmenu/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 772
youtube: 
  - "https://youtu.be/2nYhUuv3C8U"
---
<https://youtu.be/2nYhUuv3C8U>

## Adobe After Effects CC 2025: Dropdown Menu Expression Control

**Description:  
**This tutorial will show you how to use the Dropdown Menu Control Effect to create simple menus with multiple choice options to control various aspects of your animations in Adobe After Effects CC 2025.

**Expression:  
**var menu = thisComp.layer("Control").effect("Dropdown Menu Control")("Menu").value;  
menu == 1 ? 100 : 0;

1.  **var** declares a variable. It tells After Effects that we’re creating a new placeholder to store some information."
2.  **menu**: This is the name of our variable. I chose menu because it describes what this variable is referencing—the Dropdown Menu. You can name it anything you want, but using clear, descriptive names is a best practice.
3.  **= (equals sign)**: The single equals sign (=) assigns a value to the variable. It’s like saying, ‘Set the value of menu to whatever we pick from the Dropdown Menu.
4.  **thisComp.layer("Control")**: This tells After Effects to look at the layer named 'Control' in our composition.
5.  **.effect("Dropdown Menu Control")("Menu")**: This looks for the effect called 'Dropdown Menu Control' on the Control layer, and specifically, it grabs the 'Menu' property of that effect.
6.  **.value**: This gets the actual numeric value of the Dropdown Menu. For example, if the first item is selected, the value is 1; if the second item is selected, it’s 2, and so on.
7.  **menu**: This references the variable we created in the first line.
8.  **== (double equals)**: The double equals (==) is a comparison operator. It asks, ‘Is the value of menu equal to 1?’ If this comparison is true, we move on to the next part of the expression.
9.  **? (question mark)**: The question mark (?) acts like an if-then statement. It separates the condition from what happens if the condition is true.
10. **100**: This is what happens if the condition is true. In this case, we’re setting the Opacity to 100.
11. **: (colon)**: The colon (:) separates the true condition from the false condition. It’s like saying, ‘Otherwise, do this.’
12. **0**: This is what happens if the condition is false. In this case, we’re setting the Opacity to 0.

———————  
**Check out my After Effects User Guide Course:**  
https://aeuserguide.com

**Gear I Use: **  
https://mikemurphy.co/resources

**To try or buy Adobe After Effects CC 2025:**  
https://mikemurphy.co/adobe (affiliate link)

**Terrapin Textures Video Assets:**  
https://mikemurphy.gumroad.com/l/orangepastel

⭕️ **Check out my Domestika Course on Adobe Audition:**  
https://mikemurphy.co/domestika

——————

**Chapters:**  
00:00 Intro: About The Tutorial  
00:16 What is a Dropdown Menu Control?  
00:38 Example: Show/Hide Layer Visibility  
01:04 How To Create Dropdown Menu  
01:16 Create Null Object  
01:33 Add Effect (Dropdown Menu)  
01:46 Edit Menu  
02:23 Rename + Add Menu Items  
03:10 Tap T for Opacity Property  
03:24 Line 1 of Expression  
04:21 Add .value  
04:46 Line 2 of Expression  
05:12 Line 2 Explanation  
05:41 Test Expression  
06:26 Copy + Paste Expressions  
07:10 Reveal All Expressions (EE)  
08:13 Animate Dropdown Menu Effect  
09:16 Merry Christmas!

**Software Used:  
**Adobe After Effects CC 2025 ([Click To Try or Buy](https://mikemurphy.co/adobe))

**How To Add Dropdown Menu Control Effect:**

1.  Add Footage Layers
2.  Create New Null Object
3.  Go to Effect Menu
4.  Select ‘Expression Controls’…Dropdown Menu Control
5.  Click the Padlock in Effect Controls for ‘Dropdown Menu’
6.  Click ‘Edit’ in the Effect Controls Panel
7.  Click + to add menu items
8.  Click in each line to Rename
9.  Click ‘OK’ to create Menu
10. Select Layer 1 to Show Hide
11. Tap T for Opacity
12. Opt/Alt + Click on the Stopwatch next to Opacity
13. Enter Expression
14. var menu = (Drag expression pick-whip to the Dropdown Menu Control)
15. Enter .value at the end of the first line
16. Tap Enter/Return to go to the next line of the Expression
17. menu == 1 ? 100 : 0;
18. Select Opacity Property
19. Go to Edit Menu
20. Select ‘Copy Expression Only’
21. Select the other layers that are in the dropdown menu
22. Paste Expression
23. Tap EE to Reveal All Expressions
24. change menu == 2 ? 100 : 0;
25. change menu == 3 ? 100 : 0;
26. change menu == 4 ? 100 : 0;
