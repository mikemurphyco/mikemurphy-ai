---
title: "Cloudflare: How To Redirect www to Your Root Domain (Canonical URL)"
description: Learn how to create a 301 redirect in Cloudflare so www traffic automatically forwards to your root domain (canonical URL)
pubDate: 2026-07-01
updatedDate:
draft: false
type: post
slug: canonicalurl
permalink: /canonicalurl/
canonicalUrl: https://mikemurphy.ai/tutorials/canonicalurl/
contentEra: ai
visibility: public
author: Mike Murphy
featuredImage: /assets/media/2026/07/bulk_redirects_canonical_url.jpg
featuredImageSource: ""
categories:
  - Cloudflare
  - SEO
  - Tutorials
tags: []
topics:
  - cloudflare
  - redirect-rules
  - 301-redirects
  - seo
  - canonical-url
  - domain-management
youtube:
  - https://youtu.be/7-PSkvYGZd0
search:
  include: true
  boost: 1
---

If you own a website, `www.yourdomain.com` and `yourdomain.com` probably feel like the same address.

To a visitor, they usually are. Someone types either version, the same site loads, and nobody thinks twice.

But to Google, those can be two different URLs unless you tell it otherwise.

In this tutorial, you will set up a `301` permanent redirect in Cloudflare so anyone who types the `www` version of your domain automatically lands on the root domain instead.

For my new site, that means:

```text
www.mikemurphy.ai
```

redirects to:

```text
mikemurphy.ai
```

The visitor still gets to the right website. The important part is that search engines get a clear signal that there is one official version of the site.

## What You Will Build

By the end of this tutorial, you will have:

- One canonical URL for your website
- A Cloudflare Redirect Rule that sends `www` traffic to the root domain
- A `301` permanent redirect instead of a temporary redirect
- Paths preserved during the redirect
- Query strings preserved for tracking links and campaign URLs
- A quick browser test to confirm the redirect works
- A Chrome DevTools check to confirm the status code is really `301`

In my example, the canonical URL is:

```text
https://mikemurphy.ai
```

The `www` version still works, but it does not stay on `www`.

## Why This Matters

Before you set up a redirect, you can accidentally create two versions of the same website:

```text
https://www.mikemurphy.ai
https://mikemurphy.ai
```

Those look nearly identical to a person, but they are different URLs.

That matters because backlinks, SEO authority, and search indexing can get split between the two versions. You may also create duplicate content signals without realizing you created a problem in the first place.

The fix is simple: pick one main URL for your website and redirect the other one to it.

That main URL is called the canonical URL. In plain English, canonical just means "this is the official version."

There is no universal rule that says you must use the root domain instead of `www`. You can choose either one. The important thing is that you pick one and stick with it.

For this tutorial, I am choosing the root domain:

| URL | Also called | Role |
| --- | --- | --- |
| `mikemurphy.ai` | Root, naked, or apex domain | Canonical URL |
| `www.mikemurphy.ai` | `www` subdomain | Redirects to root |

I like the root domain because it is cleaner, easier to say, easier to type, and common for modern websites. But if your brand already uses `www`, you can make the opposite choice. The concept is the same.

## Before You Start

You will need:

- A Cloudflare account
- A domain added to Cloudflare
- DNS for the domain managed by Cloudflare
- Your root domain already working
- A `www` DNS record in Cloudflare
- Access to the Cloudflare dashboard

This tutorial uses Cloudflare's Redirect Rules feature. If your domain is on another registrar or DNS provider, the concept is still the same: create a permanent redirect from the version you do not want to the version you do want.

One more note before you start: if your root domain is not working yet, fix that first. This redirect should sit on top of a working website, not replace the basic domain setup.

## Step 1: Choose Your Canonical URL

Before you touch Cloudflare, decide which version of your domain should be the official one.

For this tutorial, the canonical URL is:

```text
https://mikemurphy.ai
```

That means the `www` version should redirect to the root domain:

```text
https://www.mikemurphy.ai
```

to:

```text
https://mikemurphy.ai
```

What success looks like: you know which URL you want people and search engines to end up on every time.

## Step 2: Open Your Domain In Cloudflare

Sign in to Cloudflare and open the domain you want to configure.

In my example, I search for and select:

```text
mikemurphy.ai
```

Then open the rules area.

You can get there from the left sidebar:

```text
Rules -> Overview
```

Or, from the domain list, you can use the three-dot menu and choose:

```text
Configure rules
```

Both paths take you to the same general area in Cloudflare.

What success looks like: you are inside the Cloudflare rules section for the correct domain.

## Step 3: Start The WWW To Root Template

Cloudflare includes templates for common rule setups. Think of them like presets.

In the rules area, filter or look for redirect templates. The one you want is:

```text
Redirect from WWW to root
```

Cloudflare may describe the root domain as the apex domain or naked domain. Those all mean the same thing here.

Click:

```text
Create from template
```

Cloudflare will open a rule that already works without changes. We are still going to walk through the settings so you know what it is doing.

What success looks like: you are looking at Cloudflare's prefilled redirect rule template.

## Step 4: Name The Redirect Rule

The template may already include a name. You can leave it alone, or rename it to something simpler.

I use:

```text
Redirect www to root
```

This is just an internal label in Cloudflare. Visitors will never see it, and it does not change how the redirect works.

What success looks like: the rule has a name you will understand later.

## Step 5: Keep Wildcard Pattern Selected

Under the matching section, keep:

```text
Wildcard pattern
```

This tells Cloudflare to match a URL pattern instead of writing a custom expression.

For this tutorial, the template already has the right matching method selected. You do not need to switch to a custom filter expression.

What success looks like: `Wildcard pattern` is selected.

## Step 6: Check The Request URL

The request URL is the incoming URL. In other words, this is what somebody types into the browser before Cloudflare redirects them.

The template should use:

```text
https://www.*
```

The `*` is the wildcard.

In plain English, this says:

```text
Match HTTPS URLs that start with www., then capture everything after www.
```

So if someone visits:

```text
https://www.mikemurphy.ai
```

the wildcard captures:

```text
mikemurphy.ai
```

If someone visits:

```text
https://www.mikemurphy.ai/resources
```

the wildcard captures:

```text
mikemurphy.ai/resources
```

That matters because we do not only want the homepage to work. We want any `www` URL to redirect to the matching root-domain URL.

What success looks like: the request URL is `https://www.*`.

## Step 7: Check The Target URL

The target URL is where Cloudflare sends the visitor.

The template should use:

```text
https://${1}
```

The `https://` part stays.

There is no `www.` in the target URL, because the goal is to remove `www`.

The `${1}` part means:

```text
Use whatever the first wildcard captured.
```

Here is the full idea:

```text
Request URL:      https://www.mikemurphy.ai/resources
Wildcard capture: mikemurphy.ai/resources
Target URL:       https://${1}
Final URL:        https://mikemurphy.ai/resources
```

Cloudflare strips off `www`, keeps the rest of the domain, and preserves the page path.

What success looks like: the target URL is `https://${1}`.

## Step 8: Use A 301 Permanent Redirect

Confirm the status code is:

```text
301 - Permanent Redirect
```

This is important.

A `301` tells browsers and search engines that the old URL has permanently moved to the new URL. That is the redirect you want for a canonical domain choice.

Do not use a `302` for this setup. A `302` means temporary, which is the wrong signal when you are telling Google which version of your site is official.

| Status code | Meaning | Use here? |
| --- | --- | --- |
| `301` | Permanent redirect | Yes |
| `302` | Temporary redirect | No |

What success looks like: the redirect status code is set to `301`.

## Step 9: Preserve The Query String

This is the one box I recommend checking even if the template mostly works without changes.

Turn on:

```text
Preserve query string
```

Query strings are the extra parameters that sometimes appear at the end of a URL:

```text
https://www.mikemurphy.ai/page?ref=newsletter
```

With query strings preserved, that redirects to:

```text
https://mikemurphy.ai/page?ref=newsletter
```

Without this setting, Cloudflare can drop the tracking parameters during the redirect.

For most regular visitors, that might not matter. But if you use newsletter links, affiliate links, UTM campaign tracking, or analytics parameters, preserving the query string keeps those URLs cleaner and safer.

What success looks like: `Preserve query string` is checked.

## Step 10: Deploy The Rule

When everything looks right, click:

```text
Deploy
```

Cloudflare may show a warning that says the rule may not apply to your traffic.

In the tutorial, I saw that warning because my `www` traffic was already proxied through Cloudflare. Since that was expected, I kept the rule selected and deployed it anyway.

If you see a warning, pause and read it. The main thing to confirm is that your `www` traffic is actually going through Cloudflare.

What success looks like: Cloudflare creates the rule and shows it in your list of redirect rules.

## Step 11: Test The Redirect In Your Browser

Open a new browser tab and type the `www` version of your domain.

For my site:

```text
www.mikemurphy.ai
```

After the page loads, check the address bar.

It should show:

```text
https://mikemurphy.ai
```

The `www` should be gone.

Then test a page path too:

```text
www.mikemurphy.ai/resources
```

That should redirect to:

```text
https://mikemurphy.ai/resources
```

What success looks like: both the homepage and inner pages redirect from `www` to the root domain.

## Step 12: Confirm The 301 In Chrome DevTools

The address bar test confirms the redirect works.

If you want to confirm the status code, use Chrome DevTools.

In Google Chrome:

1. Right-click on the page.
2. Choose **Inspect**.
3. Open the **Network** tab.
4. Type a `www` URL in the address bar.
5. Press Return.
6. Look for the original request in the Network list.

For example:

```text
www.mikemurphy.ai/resources
```

In the Network tab, the original `www` request should show:

```text
301
```

That confirms Cloudflare is using a permanent redirect.

What success looks like: Chrome DevTools shows a `301` status for the original `www` request.

## Troubleshooting

| Problem | Likely Cause | Fix |
| --- | --- | --- |
| The `www` URL does not redirect | The rule is not deployed or the wrong domain is selected | Go back to Cloudflare, open the correct domain, and confirm the redirect rule is active |
| The homepage redirects, but inner pages do not | The wildcard pattern or target URL was changed | Use `https://www.*` as the request URL and `https://${1}` as the target URL |
| The redirect works, but tracking parameters disappear | Preserve query string is not enabled | Edit the rule and check `Preserve query string` |
| Cloudflare shows a warning during deploy | Cloudflare may not see matching traffic for the rule | Confirm your `www` DNS record exists and traffic is proxied through Cloudflare |
| Chrome does not show the `301` request | The Network tab was opened after the redirect already happened | Open DevTools first, then type the `www` URL again and press Return |
| The browser keeps showing an old result | The browser cached the redirect | Test in a private window or clear cached redirects for the domain |
| You chose the wrong canonical URL | The redirect points to the version you do not want | Edit the rule or create the opposite redirect pattern for your chosen canonical URL |

## Settings Reference

Use these settings for a `www` to root redirect:

```text
Rule name:        Redirect www to root
Match type:       Wildcard pattern
Request URL:      https://www.*
Target URL:       https://${1}
Status code:      301 - Permanent Redirect
Preserve query:   Checked
```

Here is how the wildcard works:

```text
Pattern:  https://www.*
Input:    https://www.mikemurphy.ai/resources
Capture:  mikemurphy.ai/resources

Target:   https://${1}
Result:   https://mikemurphy.ai/resources
```

And here is the full dashboard path:

```text
Cloudflare -> your domain -> Rules -> Redirect Rules
Create rule -> Redirect from WWW to root
Deploy
```

## What This Unlocks Next

Once this is set up, your website has one clear canonical domain.

People can still type `www`. Old links that include `www` can still work. But Cloudflare quietly sends everyone to the root domain you chose.

That gives search engines a cleaner signal, keeps SEO authority focused on one URL, and removes a small but common source of duplicate content trouble.

This is one of those tiny setup steps that is easy to skip when launching a new website. But it is worth doing early, especially before you start publishing content, building backlinks, or sharing the site widely.

## Links

- [Cloudflare Redirect Rules documentation](https://developers.cloudflare.com/rules/url-forwarding/single-redirects/)
- [Cloudflare URL forwarding documentation](https://developers.cloudflare.com/rules/url-forwarding/)

## Watch The Video

Watch the full tutorial on YouTube: [Cloudflare: How To Redirect www to Your Root Domain](https://youtu.be/7-PSkvYGZd0)
