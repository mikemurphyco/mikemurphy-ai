---
title: How To Build a Claude Dashboard From Your Own Data
description: Build a Claude dashboard from spreadsheets, CSV or JSON files, or live connector data, then ask Claude what your numbers mean.
pubDate: 2026-10-20
draft: false
type: tutorial
slug: claudedashboards
permalink: /claudedashboards/
canonicalUrl: https://mikemurphy.ai/tutorials/claudedashboards/
contentEra: ai
visibility: public
author: Mike Murphy
featuredImage: /assets/media/2026/10/CLAUDE-DASHBOARDS.png
featuredImageSource: ""
categories:
  - Tutorials
  - AI
  - Claude Desktop
tags: []
topics:
  - claude
  - claude-dashboards
  - claude-artifacts
  - mcp
  - connectors
  - beehiiv
  - data-visualization
  - design-system
youtube:
  - https://youtu.be/8No6sNbQJ-Y
search:
  include: true
  boost: 1
---
Do you track numbers in a spreadsheet or an app and wish you could see them all on one clean page? Claude dashboards turn your data into charts, numbers, and tables. Each item shows where its data came from.

In this tutorial, I'll show you where to find Claude dashboards and what data you can use. Then we'll build a live dashboard from a Beehiiv newsletter.

## What data can a Claude dashboard show?

A dashboard can use any data that comes in rows, like a spreadsheet or a table. You can supply the data in two ways:

- **Upload a file:** Add a spreadsheet, CSV file, or JSON file. Claude reads the data and builds the dashboard from it. Upload a new file later to update the dashboard.
- **Use a connector:** Connect Claude to an app, like Beehiiv, vidIQ, or Supermetrics. The dashboard pulls live data from that app.

So if you export analytics from YouTube, keep records in Google Sheets or Excel, or use an app that tracks your social channels, you can probably turn that data into a dashboard.

## What you need

- A paid Claude plan. As of October 2026, dashboards are available on [Claude Pro and higher plans](https://claude.com/pricing), not the free plan.
- The [Claude desktop app](https://claude.ai/download), or [claude.ai](https://claude.ai) in a web browser.
- Your data: a spreadsheet, CSV file, or JSON file, or an app connected to Claude. I use the [Beehiiv](https://www.beehiiv.com) connector.
- Optional: a design system saved as an artifact in Claude, so the dashboard uses your colors, fonts, and logo.

## Step 1: Start a new dashboard

1. Open Claude and go to **Chat** (not Code).
2. In the left sidebar, click **Artifacts**.
3. Under **Make something new**, click **Dashboard**.

Type your request in the prompt box at the bottom. Claude builds the dashboard on the right side of the window.

## Step 2: Add your data

Choose the option that matches your data:

- **File:** Click the **+** button, choose to upload or add files, and select your spreadsheet, CSV file, or JSON file.
- **Connector:** Tell Claude which connector to use, for example "Use my Beehiiv connector." If the connector is already set up, you don't need to select anything else.

## Step 3: Tell Claude what to build

Be specific about the data you want and how to lay it out. Here is an example prompt like the one I used for my AI Unplugged newsletter:

```text
Build a Dashboard for my AI Unplugged newsletter using my Beehiiv connector.

Pull live data for:
- Total subscribers and subscriber growth over the last 90 days
- My 10 most recent posts with open rate, click rate, and unique clicks
- Best and worst performing post in that window
- Website traffic and top sources, if available

Layout: KPI cards across the top (subscribers, 30-day growth, avg open rate, avg click rate), a growth line chart below, then a sortable table of recent posts.

Design: Use my AI Handyman design system for colors, fonts, spacing, and the logo mark. Don't invent a new palette.

Keep it simple and readable at a glance, and add a one-line takeaway under each section. Tell me which Beehiiv metrics you couldn't get.
```

The last line is useful. Your plan on the connected app can limit the data. I'm on the free Beehiiv plan, so Claude told me it could only get 30 days of daily history, and no website traffic or top traffic sources.

A design system keeps the dashboard on brand. If you want to see the same idea in Claude Code, I use my design system in [How To Create Branded HTML Animations With Claude Code](/tutorials/htmlanimation/).

Click send. When Claude finishes, it summarizes what's on the dashboard and what it couldn't get.

## Step 4: Open and explore the dashboard

Click the menu at the top of the artifact and choose **Pop out** to open the dashboard in its own window.

My dashboard shows:

- Subscriber count, new subscribers in the past four weeks, open rate, and click rate
- Subscriber growth over time
- My 10 most recent issues
- Where new subscribers come from
- A list of the data Beehiiv did not give me

## Step 5: Ask Claude about your data

A dashboard is not only a static picture. Go to the chat and ask questions about the data, for example:

- "How did this month's new subscribers compare to August?"
- "How did this issue compare to issue 50?"

Claude reads the data and explains what it shows.

## Step 6: Share it or keep it private

- **Share:** Click **Share** at the top and invite people by email.
- **Hide:** Turn off the toggle to remove the dashboard from your artifact list.

You can also open your dashboards in a web browser or the Claude mobile app. Go to **Artifacts** in the left sidebar to find them. Pretty cool.

## Try it with your own data

You can create a dashboard from any chat. Ask Claude for one, then upload a file or name the connector to use. Start with one set of data you check often, and add more once the first dashboard works.

New to the Claude desktop app? [How To Get Started Using Claude Cowork](/tutorials/claudecowork/) walks through another way to put Claude to work there.
