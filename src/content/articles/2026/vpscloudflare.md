---
title: "Hostinger VPS: How To Use a Custom Domain To Open n8n (Cloudflare Setup)"
description: "In this tutorial, you will point a custom subdomain from Cloudflare to your Hostinger VPS so you can open n8n at a clean URL like flow.yourdomain.com."
pubDate: "2026-06-03T06:30:33"
updatedDate: "2026-06-02T23:52:50"
draft: false
type: "post"
slug: "vpscloudflare"
permalink: "/vpscloudflare/"
legacyPermalink: "https://www.mikemurphy.co/vpscloudflare/"
canonicalUrl: "https://mikemurphy.ai/tutorials/vpscloudflare/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2026/06/vps_custom_domains_cloudflare.png"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2026/06/vps_custom_domains_cloudflare.png"
categories:
  - "Hostinger VPS"
  - "n8n"
  - "Tutorials"
tags: []
topics: []
search:
  include: true
  boost: 1.0
migration:
  dryRun: false
  prioritySample: false
  review: false
  eraRule: "pubDate before 2025-01-01 is legacy; on/after is ai"
  source: wordpress-rest-recent-gap
wp:
  id: "215667"
  postType: "post"
  rawWordCount: 2389
seo:
  legacyTitle: "Hostinger VPS: How To Use a Custom Domain To Open n8n (Cloudflare Setup) - Mike Murphy Co"
  legacyH1: "Hostinger VPS: How To Use a Custom Domain To Open n8n (Cloudflare Setup)"
  legacyCanonical: "https://www.mikemurphy.co/vpscloudflare/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 4202
youtube:
  - "https://youtu.be/iKvZiuRu0uQ"
---

https://youtu.be/iKvZiuRu0uQ

Still opening your n8n server with a long, ugly IP address or Hostinger server URL? There is a cleaner way to do it.

In this tutorial, you will point a custom subdomain from Cloudflare to your Hostinger VPS so you can open n8n at a URL like `flow.yourdomain.com` instead of using the raw VPS address.

This is an updated version of my earlier custom domains tutorial. The big improvement is simple: you do not need to point your root domain to your VPS. You only need to point the subdomains you want to use for apps and services.

## What You Will Build

By the end, you will have:

- A custom subdomain like `flow.yourdomain.com`

- A Cloudflare DNS record pointing that subdomain to your Hostinger VPS

- An updated `docker-compose.yml` file for your n8n container

- HTTPS working through Traefik and Cloudflare

- An optional wildcard DNS record so future subdomains are easier to create

## Why This Matters

When you self-host tools like n8n on a VPS, the server has a public IP address. That IP address works, but it is not friendly, memorable, or professional.

A custom domain gives you a clean URL. Even better, subdomains let you run multiple tools from the same domain:

- `flow.yourdomain.com` for n8n

- `docs.yourdomain.com` for documentation

- `chat.yourdomain.com` for a chat app

- `status.yourdomain.com` for a status page

The domain is the name people type. The VPS IP address is the destination. Cloudflare connects those two together.

But Cloudflare only gets traffic to the front door of your VPS. Once the request reaches the server, Traefik is the traffic director that decides which Docker app should receive it.

## Before You Start

You will need:

- A Hostinger VPS

- n8n installed in Docker Compose

- A domain you own

- The domain managed in Cloudflare

- Access to Hostinger hPanel

- Access to your Cloudflare dashboard

This walkthrough uses Cloudflare, but the same basic idea works with other domain registrars or DNS providers. The names of the buttons may be different, but the DNS record you are creating is still an `A` record that points a subdomain to your VPS IP address.

## Important Update: Do Not Point Your Root Domain Unless You Want To

In an older tutorial, I showed pointing the main domain name to the VPS IP address. That can work, but it is not required.

You can use your root domain, like `yourdomain.com`, for a completely different website. You can keep it wherever it already lives.

For this setup, the only thing you need to point to your VPS is the subdomain you want to use for n8n, such as:

```text
flow.yourdomain.com
```

Custom domains and subdomains are for opening apps, services, websites, and tools running on your VPS. They are not for opening your Hostinger hPanel itself.

## Step 1: Find Your VPS IP Address In Hostinger

Log into Hostinger hPanel and open your VPS dashboard.

From the VPS overview page, look for the server’s public IPv4 address. In Hostinger, it is shown near the root access information.

Copy that IP address. You will paste it into Cloudflare later.

What success looks like: you have a public IPv4 address copied from Hostinger, something like this:

```text
123.123.123.123
```

That number is the address Cloudflare will send visitors to when they type your custom subdomain.

## Step 2: Open Your n8n Docker Compose File

Inside Hostinger hPanel, go to your VPS Docker Manager.

Open the n8n project, then open the YAML editor for the `docker-compose.yml` file.

You are looking for two parts of the file:

- The Traefik labels

- The environment variables

In the Traefik labels, you should see a router rule that looks similar to this:

```text
- traefik.http.routers.n8n.rule=Host(`${SUBDOMAIN}.${DOMAIN_NAME}`)
```

That line tells Traefik which domain name should route to n8n.

Then, in the environment section, look for the variables that set the domain and subdomain:

```text
environment:
  - DOMAIN_NAME=srv1712662.hstgr.cloud
  - SUBDOMAIN=n8n
```

The exact default values may be different on your VPS, but the idea is the same.

`DOMAIN_NAME` is the domain you own. `SUBDOMAIN` is the word before the domain.

Together, they create the full URL:

```text
SUBDOMAIN.DOMAIN_NAME
```

So if:

```text
DOMAIN_NAME=yourdomain.com
SUBDOMAIN=flow
```

Your n8n URL becomes:

```text
flow.yourdomain.com
```

## Step 3: Update DOMAIN_NAME And SUBDOMAIN

In your `docker-compose.yml` file, replace the default Hostinger server name with your own domain.

For example:

```text
environment:
  - DOMAIN_NAME=yourdomain.com
  - SUBDOMAIN=flow
```

Use the root domain only in `DOMAIN_NAME`. Do not include `https://`, `www`, or the subdomain.

Use only the prefix in `SUBDOMAIN`.

Good examples:

```text
DOMAIN_NAME=yourdomain.com
SUBDOMAIN=flow
```

```text
DOMAIN_NAME=yourdomain.com
SUBDOMAIN=automation
```

Avoid this:

```text
DOMAIN_NAME=https://flow.yourdomain.com
SUBDOMAIN=flow.yourdomain.com
```

If your Docker Compose file includes SSL email and timezone variables, update those while you are in there.

For example:

```text
environment:
  - DOMAIN_NAME=yourdomain.com
  - SUBDOMAIN=flow
  - SSL_EMAIL=you@example.com
  - GENERIC_TIMEZONE=America/New_York
```

Use your real email address for the SSL certificate. Use your own timezone.

When you are done, save the file or click **Deploy** in Hostinger.

What success looks like: the Docker Compose file now says your real domain and the subdomain you want to use for n8n.

## Step 4: Add The Cloudflare A Record

Now Cloudflare needs to know where `flow.yourdomain.com` should go.

Log into Cloudflare and choose the domain you are using.

Go to **DNS** and then **Records**. Click **Add record**.

Use these settings:

<figure class="md-table-fig table-figure">
<table class="md-table">
<thead>
<tr class="md-end-block">
<th>Field</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr class="md-end-block">
<td>Type</td>
<td><code>A</code></td>
</tr>
<tr class="md-end-block">
<td>Name</td>
<td><code>flow</code></td>
</tr>
<tr class="md-end-block">
<td>IPv4 address</td>
<td>Your Hostinger VPS IP address</td>
</tr>
<tr class="md-end-block">
<td>Proxy status</td>
<td>Proxied, orange cloud</td>
</tr>
<tr class="md-end-block">
<td>TTL</td>
<td>Auto</td>
</tr>
</tbody>
</table>
</figure>

The `Name` field should match your `SUBDOMAIN` value from Docker Compose.

If Docker Compose says:

```text
SUBDOMAIN=flow
```

Then the Cloudflare record name should be:

```text
flow
```

Click **Save**.

What success looks like: Cloudflare now has an `A` record for your subdomain pointing to your VPS IP address.

## Step 5: Fix The Cloudflare SSL Error

If you open your new URL and see an invalid SSL certificate error, Cloudflare may be set to **Full (strict)**.

In Cloudflare:

1.  Go to **SSL/TLS**

2.  Open **Overview**

3.  Click **Configure**

4.  Change the encryption mode from **Full (strict)** to **Full**

5.  Save the change

Then refresh your n8n URL:

```text
https://flow.yourdomain.com
```

What success looks like: n8n opens in the browser and the address bar shows a secure HTTPS connection.

## Step 6: Add A Wildcard Record For Future Subdomains

This is optional, but it saves time if you plan to run more apps on the same VPS.

Instead of creating a separate Cloudflare `A` record every time you create a new subdomain, you can create one wildcard record.

In Cloudflare, add another DNS record:

<figure class="md-table-fig table-figure">
<table class="md-table">
<thead>
<tr class="md-end-block">
<th>Field</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr class="md-end-block">
<td>Type</td>
<td><code>A</code></td>
</tr>
<tr class="md-end-block">
<td>Name</td>
<td><code>*</code></td>
</tr>
<tr class="md-end-block">
<td>IPv4 address</td>
<td>Your Hostinger VPS IP address</td>
</tr>
<tr class="md-end-block">
<td>Proxy status</td>
<td>Proxied, orange cloud</td>
</tr>
<tr class="md-end-block">
<td>TTL</td>
<td>Auto</td>
</tr>
</tbody>
</table>
</figure>

That `*` means any subdomain can point to your VPS:

```text
flow.yourdomain.com
docs.yourdomain.com
chat.yourdomain.com
anything.yourdomain.com
```

Cloudflare will send those subdomains to the VPS. Then Traefik decides which Docker container should receive the request.

You can keep both records:

- A specific record like `flow`

- A wildcard record like `*`

The specific record handles the exact subdomain. The wildcard catches anything else.

## Step 7: Map More Than One URL To n8n

If you want n8n to open from more than one domain or subdomain, update the Traefik router rule in your `docker-compose.yml`.

The default rule may look like this:

```text
- traefik.http.routers.n8n.rule=Host(`${SUBDOMAIN}.${DOMAIN_NAME}`)
```

You can add more hostnames with `||`, which means “or”:

```text
- traefik.http.routers.n8n.rule=Host(`${SUBDOMAIN}.${DOMAIN_NAME}`) || Host(`flow.myotherdomain.com`) || Host(`automation.myseconddomain.com`)
```

That tells Traefik:

```text
Send any of these hostnames to n8n.
```

Every extra hostname still needs a DNS record pointing to your VPS IP address unless it is covered by a wildcard record.

What success looks like: more than one custom URL can open the same n8n instance.

## Step 8: Restart And Test n8n

If Hostinger already redeployed the container when you saved the YAML file, you may not need to run anything manually.

If you are using the terminal, restart the Docker Compose project:

```text
cd ~/docker/n8n
docker compose down && docker compose up -d
```

Then open your browser and visit your new URL:

```text
https://flow.yourdomain.com
```

If n8n loads, you are done.

If it does not load right away, wait a minute and refresh. DNS and SSL changes can take a little time to settle.

## Troubleshooting

<figure class="md-table-fig table-figure">
<table class="md-table">
<thead>
<tr class="md-end-block">
<th>Problem</th>
<th>Likely Cause</th>
<th>Fix</th>
</tr>
</thead>
<tbody>
<tr class="md-end-block">
<td>The custom URL does not load</td>
<td>Cloudflare DNS record is missing or wrong</td>
<td>Make sure the <code>A</code> record points your subdomain to the VPS IPv4 address</td>
</tr>
<tr class="md-end-block">
<td>n8n opens at the old Hostinger URL but not the custom domain</td>
<td>Docker Compose still has the old <code>DOMAIN_NAME</code> or <code>SUBDOMAIN</code></td>
<td>Update the environment variables and redeploy the Docker project</td>
</tr>
<tr class="md-end-block">
<td>Cloudflare shows an SSL certificate error</td>
<td>SSL/TLS mode is set to **Full (strict)**</td>
<td>Change Cloudflare SSL/TLS encryption mode to **Full**</td>
</tr>
<tr class="md-end-block">
<td>The wrong app opens</td>
<td>Traefik is routing the hostname to another container</td>
<td>Check the Traefik router rule for the n8n service</td>
</tr>
<tr class="md-end-block">
<td>The browser says the site is dangerous when using <code>n8n</code> as the subdomain</td>
<td>The browser may flag that hostname pattern</td>
<td>Try a different subdomain like <code>flow</code> or <code>automation</code></td>
</tr>
<tr class="md-end-block">
<td>A second domain does not open n8n</td>
<td>DNS exists, but Traefik is not listening for that hostname</td>
<td>Add another <code>Host(...)</code> rule with <code>||</code> in the Traefik router label</td>
</tr>
<tr class="md-end-block">
<td>A wildcard subdomain does not work</td>
<td>Cloudflare points to the VPS, but Traefik has no matching rule</td>
<td>Add the subdomain to the correct Docker Compose Traefik rule</td>
</tr>
</tbody>
</table>
</figure>

## Commands Reference

Restart the n8n Docker Compose project:

```text
cd ~/docker/n8n
docker compose down && docker compose up -d
```

Check running containers:

```text
docker ps
```

View Traefik logs:

```text
docker logs traefik
```

## Docker Compose Reference

Basic environment variables:

```text
environment:
  - DOMAIN_NAME=yourdomain.com
  - SUBDOMAIN=flow
```

Optional SSL email and timezone:

```text
environment:
  - DOMAIN_NAME=yourdomain.com
  - SUBDOMAIN=flow
  - SSL_EMAIL=you@example.com
  - GENERIC_TIMEZONE=America/New_York
```

Basic Traefik router rule:

```text
- traefik.http.routers.n8n.rule=Host(`${SUBDOMAIN}.${DOMAIN_NAME}`)
```

Multiple hostnames for the same n8n instance:

```text
- traefik.http.routers.n8n.rule=Host(`${SUBDOMAIN}.${DOMAIN_NAME}`) || Host(`flow.myotherdomain.com`)
```

## What This Unlocks Next

Once you understand this pattern, every new self-hosted tool becomes easier to publish.

Cloudflare points the subdomain to your VPS. Traefik routes that hostname to the right Docker container. Your browser opens a clean, memorable URL with HTTPS.

That is the basic pattern for running multiple apps on one Hostinger VPS with custom domains:

```text
subdomain -> Cloudflare A record -> VPS IP -> Traefik -> Docker app
```

For n8n, that means no more raw IP addresses and no more long default Hostinger server names. Just a clean URL like:

```text
https://flow.yourdomain.com
```

## Links

- Hostinger VPS: <https://www.hostg.xyz/SHIDN>

- Coupon code: `DISCOUNT7`

- Earlier custom domains tutorial: <https://youtu.be/2XJbZIi5JBs>

- Cloudflare dashboard: [https://dash.cloudflare.com](https://dash.cloudflare.com/)

- Hostinger hPanel: [https://hpanel.hostinger.com](https://hpanel.hostinger.com/)

## Watch The Video

TODO: Add the YouTube URL and video ID when the tutorial is published.

**Questions, Comments, Feedback?**
<hello@mikemurphy.co>

**My Gear List:**
<https://mikemurphy.co/resources>

**My Amazon Store:**
<https://www.amazon.com/shop/mikemurphyco>

**My YouTube Channel:**
[https://youtube.com/mikemurphyco](https://mikemurphy.co/youtube)
