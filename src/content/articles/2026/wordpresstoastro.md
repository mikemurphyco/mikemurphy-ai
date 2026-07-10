---
title: "How To Migrate WordPress to Astro Without Losing SEO (Live Domain Cutover)"
description: "Migrate a WordPress website to Astro, switch domains, and keep 10+ years of SEO using bulk 301 redirects and a Cloudflare DNS cutover."
pubDate: "2026-07-10"
draft: true
type: "tutorial"
slug: "wordpresstoastro"
permalink: "/wordpresstoastro/"
canonicalUrl: "https://mikemurphy.ai/tutorials/wordpresstoastro/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: ""
featuredImageSource: ""
categories:
  - "Tutorials"
  - "WordPress"
  - "Astro"
tags: []
topics:
  - wordpress
  - astro
  - website-migration
  - 301-redirects
  - cloudflare
  - seo
youtube: []
search:
  include: true
  boost: 1.0
---

After more than 10 years on WordPress, I migrated my website to Astro. And I did not just change platforms. I changed domains too, moving from `mikemurphy.co` to `mikemurphy.ai`.

That combination (new platform plus new domain) is about the riskiest migration you can do. Google spent a decade learning to trust my old domain, and the new one was a total stranger. Done wrong, you throw away years of SEO and break every link anyone has ever shared to your site.

This tutorial walks through the exact cutover: the order I did everything in, why that order matters, and the rollback plan I had ready in case it all went sideways.

## What You Will Build

By the end of this tutorial, you will have:

- Your old domain permanently forwarding to your new one with 301 redirects
- Every old page, post, and link redirecting to its matching URL on the new site
- DNS cut over from your old host to your new site through Cloudflare
- Old shortlinks redirecting to their new destinations
- A rollback plan you can execute in under a minute
- A short monitoring checklist for the first few days after cutover

## Why This Matters

A 301 permanent redirect tells browsers and search engines: this content no longer lives here, it has permanently moved over there. When somebody types your old domain or clicks a 10-year-old link, they land on the matching page of your new site instead of an error.

That is what protects your SEO. Backlinks, search rankings, and trust built up on the old domain get forwarded to the new one instead of abandoned. Skip the redirects and every old link on the internet becomes a dead end, and Google treats your new domain like it appeared out of nowhere.

The other thing that matters here is sequence. The steps below are ordered so there is never a moment where a visitor (or Google) can hit a broken link mid-migration.

## Before You Start

A cutover is the last step of a migration, not the first. Before you flip anything, you want:

- Your new website built and live on its new domain (mine is Astro, hosted on Cloudflare)
- DNS for both your old and new domains managed in Cloudflare
- Your bulk 301 redirects created and staged, but not enabled yet. I had 3,114 of them ready to go. I covered that setup in [How To Create Bulk 301 Redirects on Cloudflare](/tutorials/bulkredirects/)
- Old shortlinks migrated if you use them. I moved my WordPress Pretty Links to a self-hosted Shlink server in [this tutorial](/tutorials/shlink/)
- A canonical URL decision for the new site, so `www` and root do not compete. Here is [how I set that up](/tutorials/canonicalurl/)

My starting point: the old WordPress site at `mikemurphy.co` was still live on SiteGround, and the new Astro site at `mikemurphy.ai` was already running on Cloudflare.

## Step 1: Write Down Your Rollback Plan

As Ben Franklin said, failing to plan is planning to fail. Before touching anything, know exactly how you would undo the whole migration.

Mine was two toggles:

1. Turn off the bulk 301 redirects in Cloudflare
2. Turn off the Cloudflare proxy on the old domain's DNS records

Do those two things and all traffic flows back to the old WordPress site on SiteGround, exactly like before. No harm, no foul, troubleshoot, and try again another day.

Knowing the rollback is that simple takes most of the fear out of the cutover.

## Step 2: Enable the Bulk 301 Redirects

Order matters here: redirects go live before the DNS flip. That way, the instant traffic starts flowing to Cloudflare, the redirects are already waiting, and there is no window where somebody can hit a broken link.

In Cloudflare, from the account home page, go to **Delivery and Performance → Bulk Redirects**. You will see your staged redirect lists. I had two:

- The main redirects: all 3,114 URLs from the old WordPress site, each pointing to its matching page on the new domain
- The Pretty Links redirects: old WordPress shortlinks pointing to their new Shlink URLs

Click **Enable** on each list. The redirects are active instantly. Nothing changes for visitors yet, because traffic is still flowing to the old host, but the safety net is now in place.

## Step 3: Flip the DNS

This is the official cutover moment. You are switching the old domain's traffic away from your old host and into Cloudflare, where the redirects take over.

In Cloudflare, open the old domain and go to **DNS → Records**. Find the A records for the root domain and `www`, select both, and choose **Edit records**. Turn on the proxy status for each one: the gray cloud becomes an orange cloud. Click **Save**.

The moment those clouds turn orange, traffic to the old domain stops going to the old host and starts going through Cloudflare, where your 301 redirects catch it and forward it to the new site.

## Step 4: Test the Redirects

Time to confirm the migration actually worked. Open a browser and check each of these:

| Test | Type this | You should land on |
| --- | --- | --- |
| Old homepage | `mikemurphy.co` | `mikemurphy.ai` |
| Old inner page | `mikemurphy.co/some-page` | The matching page on the new domain |
| Old shortlink | A Pretty Links URL | The new shortlink destination |
| New www | `www.mikemurphy.ai` | `mikemurphy.ai` (your canonical URL) |

The address bar is the tell. If the old domain disappears and the new one shows up, the redirect chain is working end to end.

If any of these fail, do not panic. Check the [Troubleshooting](#troubleshooting) table below, and remember the rollback plan is right there if you need time to figure something out.

## Step 5: Monitor the First Few Days

The cutover is done, but keep an eye on a few places while the dust settles:

- **Cloudflare Analytics**: you should see traffic on the new domain start to climb
- **Google Search Console**: watch for crawl errors and 404s on the new domain, and fix any old URLs that slipped through the redirect map
- **Your own links**: any time you run into an old shortlink or affiliate link in the wild, click it and confirm it forwards
- **Email**: if your email runs on your old domain, it should keep working untouched, as long as you never changed the MX records. The cutover only touched the A records

## Troubleshooting

| Problem | Likely Cause | Fix |
| --- | --- | --- |
| Old domain still shows the old website | DNS proxy not enabled, or your browser cached the old site | Confirm the A records show the orange cloud, then retest in a private window |
| Old URLs return errors instead of redirecting | Bulk redirect lists are not enabled | Go to **Delivery and Performance → Bulk Redirects** and confirm both lists show as enabled |
| Some old pages 404 on the new site | Those URLs are missing from the redirect map | Add them to the bulk redirect list, or create the missing page on the new site |
| Shortlinks do not forward | The Pretty Links redirect list is not enabled, or the slug does not match | Confirm the list is enabled and the old slug maps to the right new URL |
| Email stopped working | MX records were changed during the cutover | Restore the original MX records; only the A records should have changed |
| Everything is on fire | Something unexpected | Execute the rollback: disable the redirect lists, turn the proxy back off, and traffic returns to the old host |

## Cutover Checklist

The whole migration, in order:

1. Rollback plan written down
2. Bulk 301 redirects enabled (main site + shortlinks)
3. Cloudflare proxy turned on for the old domain's A records (gray cloud to orange)
4. Redirects tested: homepage, inner pages, shortlinks, www to root
5. Monitoring: Cloudflare Analytics, Google Search Console, email

## What This Unlocks Next

The old domain now quietly hands every visitor and every search engine over to the new site. Ten years of links keep working, and all future SEO builds on one clean, canonical domain.

From here, the work shifts to the fun part: publishing new content on the new site and letting Google get to know the new domain. Watch Search Console over the coming weeks, fix any stray 404s as they surface, and update old shortlinks and affiliate links as you run into them.

## Links

- [Cloudflare Bulk Redirects documentation](https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/)
- [Astro documentation](https://docs.astro.build)
- [How To Create Bulk 301 Redirects on Cloudflare (Pretty Links to Shlink)](/tutorials/bulkredirects/)
- [How To Migrate Pretty Links To Shlink on Hostinger VPS](/tutorials/shlink/)
- [Cloudflare: How To Redirect www to Your Root Domain](/tutorials/canonicalurl/)
