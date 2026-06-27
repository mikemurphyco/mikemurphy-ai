---
title: "How To Create Bulk 301 Redirects on Cloudflare (Pretty Links to Shlink)"
description: "Use Cloudflare Bulk Redirects to forward old WordPress Pretty Links to new Shlink URLs during a site migration."
pubDate: "2026-06-24T06:30:00"
updatedDate: "2026-06-24T06:30:00"
draft: false
type: "post"
slug: "bulkredirects"
permalink: "/bulkredirects/"
legacyPermalink: "https://www.mikemurphy.co/bulkredirects/"
canonicalUrl: "https://mikemurphy.ai/tutorials/bulkredirects/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2026/06/bulk_redirects_cloudflare.jpg"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2026/06/bulk_redirects.jpg"
categories:
  - Cloudflare
  - WordPress
  - Tutorials
tags: []
topics:
  - cloudflare
  - bulk-redirects
  - pretty-links
  - shlink
  - wordpress-migration
  - astro
  - seo
tools:
  - Cloudflare
  - Pretty Links
  - Shlink
  - WordPress
  - Astro
  - CSV
difficulty: "beginner"
estimatedTime: "15 minutes"
videoUrl: "https://youtu.be/cc10GAx7ppc"
youtubeId: "cc10GAx7ppc"
youtube:
  - "https://youtu.be/cc10GAx7ppc"
resourceGuide: ""
search:
  include: true
  boost: 1.0
---

# How To Create Bulk 301 Redirects on Cloudflare (Pretty Links to Shlink)

If you are moving a website away from WordPress, one of the sneaky problems is what happens to all the short links you created with Pretty Links.

On my WordPress site, I used Pretty Links for years to create branded short URLs like:

```text
https://mikemurphy.co/youtube
```

Those links are scattered across YouTube descriptions, blog posts, podcast notes, course resources, affiliate promotions, and probably a few places I have forgotten about.

As I move my site from WordPress to Astro, I cannot take the Pretty Links plugin with me. My replacement is Shlink, which gives me new branded short links like:

```text
https://go.mikemurphy.ai/youtube
```

The goal of this tutorial is to make sure the old Pretty Links do not break. We will use Cloudflare Bulk Redirects to create permanent `301` redirects from the old Pretty Links to the new Shlink URLs.

Instead of creating hundreds of redirects one at a time, we will upload a CSV file and stage the redirect rule so it is ready to enable during the final DNS cutover.

## What You Will Build

By the end of this tutorial, you will have:

- A Cloudflare Bulk Redirect List containing your old Pretty Links and new Shlink URLs
- A CSV import with all URL variations covered
- A `301` permanent redirect for each old Pretty Link
- A Bulk Redirect Rule connected to the redirect list
- The rule saved as a draft or left disabled until your site migration is ready
- A simple final switch you can enable after changing DNS from WordPress to Astro

In my case, the CSV contained `908` redirect entries. That number sounds high, but it includes four variations for each Pretty Link:

```text
https://mikemurphy.co/youtube
https://mikemurphy.co/youtube/
https://www.mikemurphy.co/youtube
https://www.mikemurphy.co/youtube/
```

All four point to the same Shlink URL:

```text
https://go.mikemurphy.ai/youtube
```

That gives the migration a safety net. Whether someone clicks the `www` version, the naked domain version, the trailing slash version, or the no-trailing-slash version, Cloudflare knows where to send them.

## Why This Matters

A Pretty Link is just a redirect managed by WordPress.

That is fine as long as WordPress is still running your site. But once you move to Astro, that WordPress plugin is no longer sitting there to catch the old URLs and forward people to the right place.

If you do nothing, old links can break.

That is bad for visitors, bad for SEO, and especially bad for any links you have already published in places you do not control anymore.

A `301` redirect is a permanent redirect. It tells browsers and search engines that the old URL has permanently moved to a new URL.

Cloudflare Bulk Redirects is a good fit because it lets you upload a large list of exact redirects and apply them at the Cloudflare level. You do not need to recreate every link manually in Astro. You do not need to keep WordPress alive just for Pretty Links. You do not need to make hundreds of individual page rules.

## Before You Start

You will need:

- A Cloudflare account
- Your domain added to Cloudflare
- Access to the account-level Cloudflare dashboard
- A prepared CSV file with your old Pretty Links and new Shlink URLs
- Shlink already set up and working
- Your old WordPress Pretty Links exported or organized
- A plan for when you will switch DNS from WordPress to your new Astro site

This tutorial assumes you already created the CSV file. If you have not done that yet, the important idea is simple: each row should map one source URL to one target URL.

The source URL is the old Pretty Link:

```text
https://mikemurphy.co/youtube
```

The target URL is the new Shlink URL:

```text
https://go.mikemurphy.ai/youtube
```

## Step 1: Open Bulk Redirects in Cloudflare

Log into Cloudflare and go to your account home.

This is important: Bulk Redirects lives at the account level in Cloudflare, not inside one specific domain dashboard.

If you are already inside a domain, click the Cloudflare logo in the top left corner or go back to **Account Home**.

Then open:

```text
Delivery & Performance -> Bulk Redirects
```

What success looks like: you are on the Cloudflare Bulk Redirects page and can see the area for creating redirect lists and redirect rules.

## Step 2: Create a Bulk Redirect List

First, create the list that will hold your redirect data.

Click:

```text
+ Create Bulk Redirect List
```

Give the list a clear name. In the tutorial, I used:

```text
Mike_Murphy_CO_Pretty_Links
```

The description is optional, but I recommend adding one for future you.

For example:

```text
Creates 301 permanent redirects from Pretty Links WordPress URLs to Shlink URLs.
```

Then click **Next** and save the list changes when Cloudflare asks you to confirm.

What success looks like: Cloudflare creates the redirect list and moves you to the CSV upload step.

## Step 3: Upload the CSV File

Now upload the CSV file that contains your redirects.

Click **Browse**, choose your CSV file, and upload it.

In my case, the file was named:

```text
Pretty Links Bulk Redirects.csv
```

The first column contained the source URLs. Those were the old Pretty Links.

The second column contained the target URLs. Those were the new Shlink URLs.

Each row tells Cloudflare:

```text
When someone visits this old Pretty Link, permanently redirect them to this Shlink URL.
```

For example:

```csv
https://mikemurphy.co/youtube,https://go.mikemurphy.ai/youtube,301,true
https://mikemurphy.co/youtube/,https://go.mikemurphy.ai/youtube,301,true
https://www.mikemurphy.co/youtube,https://go.mikemurphy.ai/youtube,301,true
https://www.mikemurphy.co/youtube/,https://go.mikemurphy.ai/youtube,301,true
```

Use the CSV format Cloudflare expects for Bulk Redirects. Do not include a header row with column names. The key thing to verify is that the source URL, target URL, and status code columns are being read correctly.

What success looks like: Cloudflare imports the rows and shows them as redirect entries in the list.

## Step 4: Confirm Every Redirect Imported

Before saving the list, confirm that the CSV import worked.

In my tutorial, I scrolled to the bottom of the imported list and confirmed that Cloudflare imported all `908` redirect entries.

Spot-check a few rows:

- The source URL should be the old Pretty Link
- The target URL should be the new Shlink URL
- The status should be `301`
- Preserve query string should be set to `true`

Preserving the query string means that if someone visits an old link with extra tracking parameters, Cloudflare can keep those parameters when it redirects the visitor.

One small Cloudflare interface warning: if you expand the edit parameters area for a redirect entry, click **Edit parameters** again to collapse it. Do not click the `X` unless you want to delete the redirect entry.

After you confirm the import, click **Save**, then **Save and Exit**.

What success looks like: the redirect list exists in Cloudflare and shows the full number of imported entries.

## Step 5: Create a Bulk Redirect Rule

The redirect list is only the data. It does not do anything by itself.

Next, create a rule that uses the list.

Go back to:

```text
Delivery & Performance -> Bulk Redirects
```

At the top of the Bulk Redirects page, click:

```text
+ Create Bulk Redirect Rule
```

Give the rule a clear name. I used the same name as the list:

```text
Mike_Murphy_CO_Pretty_Links
```

Then choose the Bulk Redirect List you just created.

What success looks like: the rule is connected to the list that contains your Pretty Links to Shlink redirect entries.

## Step 6: Save the Rule as a Draft

This is the most important part of the tutorial.

If you have not officially migrated your site yet, do not deploy the rule.

In my case, my WordPress site was still live. I had not switched DNS from WordPress to Astro yet. So I created the redirect rule, but I saved it as a draft and left it disabled.

That means:

- The redirect list is ready
- The redirect rule is ready
- Nothing is actively redirecting yet
- The existing Pretty Links keep working on WordPress

When the DNS switch happens later, I can come back to Cloudflare, open Bulk Redirects, and toggle the rule on.

What success looks like: the Bulk Redirect Rule appears in Cloudflare, but the status is disabled or saved as a draft.

## Step 7: Enable the Rule After the DNS Cutover

When you are ready to move from WordPress to Astro, update your DNS as planned.

After the DNS switch is complete, return to:

```text
Delivery & Performance -> Bulk Redirects
```

Find the Bulk Redirect Rule you created and enable it.

The redirects should start working immediately. When someone visits an old Pretty Link, Cloudflare will forward them to the matching Shlink URL.

What success looks like: opening an old Pretty Link sends you to the correct new Shlink URL with a `301` redirect.

## Pre-Switch Checklist

Before you enable the rule, confirm:

- Your Shlink URLs are working
- Your CSV has one source URL and one target URL per row
- Each redirect uses status code `301`
- You included the `www` and non-`www` versions you need
- You included trailing slash and no-trailing-slash versions where needed
- Cloudflare imported the expected number of rows
- The Bulk Redirect Rule is connected to the correct list
- The rule is saved as a draft or disabled until the migration
- You know when you are switching DNS from WordPress to Astro

## Troubleshooting

| Problem | Likely Cause | Fix |
| --- | --- | --- |
| You cannot find Bulk Redirects inside your domain settings | You are looking inside a specific site instead of the account-level dashboard | Go back to Cloudflare Account Home, then open **Delivery & Performance -> Bulk Redirects** |
| The imported redirect count is lower than expected | The CSV may be missing rows or Cloudflare may not have parsed the file correctly | Check the CSV formatting, confirm the columns, and re-upload the list |
| A no-slash URL redirects but a trailing-slash URL does not | Bulk Redirects are matching the exact source URL you imported | Add both versions of the source URL to your CSV |
| The `www` version does not redirect | The CSV only includes the naked domain version | Add `www` and non-`www` variations for each Pretty Link |
| Redirects start before you are ready | The rule was deployed or enabled too early | Disable the Bulk Redirect Rule until the DNS cutover |
| A redirect sends visitors to the wrong Shlink URL | The source and target were mismatched in the CSV | Fix the CSV row, update the redirect list, and test that specific slug again |
| You accidentally opened the edit parameters section | Cloudflare shows the delete `X` near redirect entries | Click **Edit parameters** again to collapse the section instead of clicking `X` |

## Reference: URL Variations

For each Pretty Link slug, I recommend preparing the variations that people might actually visit.

For a Pretty Link like:

```text
youtube
```

Use source URLs like:

```text
https://example.com/youtube
https://example.com/youtube/
https://www.example.com/youtube
https://www.example.com/youtube/
```

Point each one to the same Shlink URL:

```text
https://go.example.com/youtube
```

This is why a site with a couple hundred Pretty Links can become a CSV with many more rows. You are not creating extra short links. You are covering the variations people and browsers may request.

## Reference: CSV Pattern

Your exact CSV columns should match the format Cloudflare asks for during the Bulk Redirects upload.

The practical pattern is:

```csv
https://example.com/youtube,https://go.example.com/youtube,301,true
https://example.com/youtube/,https://go.example.com/youtube,301,true
https://www.example.com/youtube,https://go.example.com/youtube,301,true
https://www.example.com/youtube/,https://go.example.com/youtube,301,true
```

Cloudflare's Bulk Redirects CSV format is:

```text
<SOURCE_URL>,<TARGET_URL>[,<STATUS_CODE>,<PRESERVE_QUERY_STRING>,<INCLUDE_SUBDOMAINS>,<SUBPATH_MATCHING>,<PRESERVE_PATH_SUFFIX>]
```

Only the source URL and target URL are required. In this tutorial, I include the `301` status code and set preserve query string to `true` so the intent is explicit.

In the Cloudflare interface, verify:

- Source URL maps to the old Pretty Link
- Target URL maps to the new Shlink URL
- Status is `301`
- Preserve query string is `true`

## What This Unlocks Next

Once the redirect list and rule are staged, the hard part of the Pretty Links migration is done.

You can keep the old WordPress site live while you finish the Astro migration. Your existing Pretty Links continue working through WordPress until the final switch.

Then, when you are ready:

1. Switch DNS from WordPress to Astro
2. Open Cloudflare Bulk Redirects
3. Enable the Bulk Redirect Rule
4. Test several old Pretty Links

That gives you a cleaner migration path. Pretty Links can retire with WordPress, and Shlink can take over as the new branded short-link system.

## Links

- Cloudflare Bulk Redirects documentation: https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/
- Cloudflare Bulk Redirects CSV file format: https://developers.cloudflare.com/rules/url-forwarding/bulk-redirects/reference/csv-file-format/
- Shlink website: https://shlink.io/
- Previous tutorial: [How To Migrate Pretty Links To Shlink on Hostinger VPS](/tutorials/shlink/)

## Watch the Video

Video URL: https://youtu.be/cc10GAx7ppc
