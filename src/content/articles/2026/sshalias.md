---
title: How To Create SSH Aliases on Mac to Connect to Your Hostinger VPS
description: Learn how to create SSH aliases on Mac so you can connect to your Hostinger VPS with shorter, memorable terminal commands.
pubDate: 2026-06-11T06:30:12
updatedDate: 2026-06-10T23:07:44
draft: false
type: post
slug: sshalias
permalink: /sshalias/
legacyPermalink: https://www.mikemurphy.co/sshalias/
canonicalUrl: https://mikemurphy.ai/tutorials/sshalias/
contentEra: ai
visibility: public
author: Mike Murphy
featuredImage: '"/public/assets/media/2026/06/SSH ALIAS.png"'
featuredImageSource: '"https://www.mikemurphy.co/wp-content/uploads/2026/06/SSH-ALIAS.png"'
categories:
  - Hostinger VPS
  - MacOS Terminal
  - Tutorials
tags: []
topics: []
search:
  include: true
  boost: 1
migration:
  dryRun: false
  prioritySample: false
  review: true
  eraRule: pubDate before 2025-01-01 is legacy; on/after is ai
  source: wordpress-rest-recent-gap
wp:
  id: "215674"
  postType: post
  rawWordCount: 75
seo:
  legacyTitle: How To Create SSH Aliases on Mac to Connect to Your Hostinger VPS - Mike Murphy Co
  legacyH1: How To Create SSH Aliases on Mac to Connect to Your Hostinger VPS
  legacyCanonical: https://www.mikemurphy.co/sshalias/
  robots: index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1
  liveWordCount: 4106
youtube:
  - https://youtu.be/wknMMBZRHag
---
I use SSH aliases to shorten long VPS connection commands into memorable shortcuts in my Mac terminal. This tutorial walks through the basic idea, where SSH config lives, and why aliases make repeated Hostinger VPS work faster.

The full step-by-step notes are being cleaned up as part of the Astro migration. The canonical route is in place so the launch map, redirects, and search index are ready for the finished tutorial.

Original WordPress URL: <https://www.mikemurphy.co/sshalias/>


# Hostinger VPS: How To Use a Custom Domain To Open n8n (Cloudflare Setup)

Still opening n8n with a long Hostinger server URL or a raw VPS IP address? There is a much cleaner way to do it.

In this tutorial, you will point a custom subdomain from Cloudflare to your Hostinger VPS so you can open n8n at a URL like `flow.yourdomain.com`.

This is an updated version of my earlier custom domains tutorial. The big correction is simple: you do not need to point your main domain to your VPS. You only need to point the subdomains you want to use for apps and services.

## What You Will Build

By the end, you will have:

- A custom n8n URL like `flow.yourdomain.com`
- A Cloudflare `A` record pointing that subdomain to your Hostinger VPS
- An updated `docker-compose.yml` file for the n8n container
- HTTPS working through Cloudflare and Traefik
- An optional wildcard DNS record for future subdomains
- A clear mental model for how Cloudflare, your VPS, Traefik, and Docker fit together

## Why This Matters

When you self-host n8n on a VPS, the server has a public IP address. That IP address works, but it is not friendly, memorable, or professional.

A custom domain gives you a clean URL. Subdomains make that even more useful because one domain can create as many app URLs as you need:

- `flow.yourdomain.com` for n8n
- `docs.yourdomain.com` for documentation
- `chat.yourdomain.com` for a chat app
- `status.yourdomain.com` for a status page

Cloudflare is the DNS manager. It sends traffic for your subdomain to your VPS IP address.

Traefik is the traffic director on the VPS. Once the request reaches the server, Traefik looks at the hostname and sends the request to the correct Docker app, such as n8n on port `5678`.

## Before You Start

You will need:

- A Hostinger VPS
- n8n installed in Docker Compose
- A domain you own
- The domain managed in Cloudflare
- Access to Hostinger hPanel
- Access to your Cloudflare dashboard

This walkthrough uses Cloudflare, but the same basic idea works with other registrars or DNS providers. The buttons may be different, but the DNS record you are creating is still an `A` record that points a subdomain to your VPS IP address.

## Important Update: You Do Not Need To Point Your Root Domain

In an older tutorial, I showed pointing the main domain name to the VPS IP address. That can work, but it is not required.

You can keep your root domain, like `yourdomain.com`, pointed at a completely different website. It does not need to be connected to your VPS at all.

For this setup, the only thing you need to point to your Hostinger VPS is the subdomain you want to use for n8n:

```text
flow.yourdomain.com
```

Custom domains and subdomains are for opening apps, services, websites, and tools running on your VPS. They are not for opening Hostinger hPanel itself.

## Step 1: Find Your VPS IP Address In Hostinger

Log into Hostinger hPanel and open your VPS dashboard.

On the VPS overview page, look for the public IPv4 address. In Hostinger, it appears near the root access information.

Copy that IP address. You will paste it into Cloudflare in a later step.

What success looks like: you have your VPS IPv4 address copied, something like:

```text
123.123.123.123
```

That number is the address Cloudflare will use when someone visits your custom n8n URL.

## Step 2: Open The n8n Docker Compose File

Inside Hostinger hPanel, go to **Docker Manager** and open your n8n project.

Open the YAML editor for the `docker-compose.yml` file.

You are looking for two areas:

- The Traefik labels
- The environment variables

In the Traefik labels, you should see a router rule that looks similar to this:

```yaml
- traefik.http.routers.n8n.rule=Host(`${SUBDOMAIN}.${DOMAIN_NAME}`)
```

That line tells Traefik which hostname should route to n8n.

Then look for the environment variables near the bottom of the file:

```yaml
environment:
  - DOMAIN_NAME=srv1712662.hstgr.cloud
  - SUBDOMAIN=n8n
```

Your default values may be different. The important part is the pattern.

`DOMAIN_NAME` is the domain you own. `SUBDOMAIN` is the word before the domain.

Together, they create the full URL:

```text
SUBDOMAIN.DOMAIN_NAME
```

So this:

```yaml
DOMAIN_NAME=yourdomain.com
SUBDOMAIN=flow
```

Becomes this:

```text
flow.yourdomain.com
```

## Step 3: Update DOMAIN_NAME And SUBDOMAIN

In `docker-compose.yml`, replace the default Hostinger server name with your own domain.

For example:

```yaml
environment:
  - DOMAIN_NAME=yourdomain.com
  - SUBDOMAIN=flow
```

Use only the root domain in `DOMAIN_NAME`.

Do not include `https://`, `www`, or the subdomain.

Use only the prefix in `SUBDOMAIN`.

Good examples:

```yaml
DOMAIN_NAME=yourdomain.com
SUBDOMAIN=flow
```

```yaml
DOMAIN_NAME=yourdomain.com
SUBDOMAIN=automation
```

Avoid this:

```yaml
DOMAIN_NAME=https://flow.yourdomain.com
SUBDOMAIN=flow.yourdomain.com
```

If your Docker Compose file includes SSL email and timezone variables, update those while you are already in the file:

```yaml
environment:
  - DOMAIN_NAME=yourdomain.com
  - SUBDOMAIN=flow
  - SSL_EMAIL=you@example.com
  - GENERIC_TIMEZONE=America/New_York
```

Use your real email address for the SSL certificate. Use your own timezone.

When you are done, save the file or click **Deploy** in Hostinger.

What success looks like: your Docker Compose file now has your real domain and the subdomain you want to use for n8n.

## Step 4: Add The Cloudflare A Record

Now Cloudflare needs to know where `flow.yourdomain.com` should go.

Log into Cloudflare and choose the domain you are using.

Go to **DNS** and then **Records**. Click **Add record**.

Use these settings:

| Field        | Value                         |
| ------------ | ----------------------------- |
| Type         | `A`                           |
| Name         | `flow`                        |
| IPv4 address | Your Hostinger VPS IP address |
| Proxy status | Proxied, orange cloud         |
| TTL          | Auto                          |

The `Name` field should match your `SUBDOMAIN` value from Docker Compose.

If Docker Compose says:

```yaml
SUBDOMAIN=flow
```

Then the Cloudflare record name should be:

```text
flow
```

Click **Save**.

What success looks like: Cloudflare now has an `A` record for your n8n subdomain pointing to your Hostinger VPS IP address.

## Step 5: Fix The Cloudflare SSL Error

If you open the new URL and see an invalid SSL certificate error, Cloudflare may be set to **Full (strict)**.

In Cloudflare:

1. Go to **SSL/TLS**
2. Open **Overview**
3. Click **Configure**
4. Change the encryption mode from **Full (strict)** to **Full**
5. Save the change

Then refresh your n8n URL:

```text
https://flow.yourdomain.com
```

What success looks like: n8n opens in the browser and the address bar shows a secure HTTPS connection.

## Step 6: Add A Wildcard Record For Future Subdomains

This step is optional, but it can save time if you plan to run more apps on the same VPS.

Instead of creating a separate Cloudflare `A` record every time you add a new subdomain, you can create one wildcard record.

In Cloudflare, add another DNS record:

| Field        | Value                         |
| ------------ | ----------------------------- |
| Type         | `A`                           |
| Name         | `*`                           |
| IPv4 address | Your Hostinger VPS IP address |
| Proxy status | Proxied, orange cloud         |
| TTL          | Auto                          |

That `*` means any subdomain can point to your VPS:

```text
flow.yourdomain.com
docs.yourdomain.com
chat.yourdomain.com
anything.yourdomain.com
```

Cloudflare sends those subdomains to the VPS. Traefik still decides which Docker container should receive the request.

You can keep both records:

- A specific record like `flow`
- A wildcard record like `*`

The specific record handles the exact subdomain. The wildcard catches anything else.

## Step 7: Map More Than One URL To n8n

If you want n8n to open from more than one domain or subdomain, update the Traefik router rule in `docker-compose.yml`.

The default rule may look like this:

```yaml
- traefik.http.routers.n8n.rule=Host(`${SUBDOMAIN}.${DOMAIN_NAME}`)
```

You can add more hostnames with `||`, which means "or":

```yaml
- traefik.http.routers.n8n.rule=Host(`${SUBDOMAIN}.${DOMAIN_NAME}`) || Host(`flow.myotherdomain.com`) || Host(`automation.myseconddomain.com`)
```

That tells Traefik to send any of those hostnames to n8n.

Every extra hostname still needs a DNS record pointing to your VPS IP address unless it is covered by a wildcard record.

What success looks like: more than one custom URL can open the same n8n instance.

## Step 8: Restart And Test n8n

If Hostinger redeployed the container when you saved the YAML file, you may not need to run anything manually.

If you are using the terminal, restart the Docker Compose project:

```bash
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

| Problem                                                      | Likely Cause                                                 | Fix                                                          |
| ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| The custom URL does not load                                 | Cloudflare DNS record is missing or wrong                    | Make sure the `A` record points your subdomain to the VPS IPv4 address |
| n8n opens at the old Hostinger URL but not the custom domain | Docker Compose still has the old `DOMAIN_NAME` or `SUBDOMAIN` | Update the environment variables and redeploy the Docker project |
| Cloudflare shows an invalid SSL certificate error            | SSL/TLS mode is set to **Full (strict)**                     | Change Cloudflare SSL/TLS encryption mode to **Full**        |
| The wrong app opens                                          | Traefik is routing the hostname to another container         | Check the Traefik router rule for the n8n service            |
| Chrome warns that the site may be dangerous when using `n8n` as the subdomain | The browser may flag that hostname pattern                   | Try a different subdomain like `flow` or `automation`        |
| A second domain does not open n8n                            | DNS exists, but Traefik is not listening for that hostname   | Add another `Host(...)` rule with `||` in the Traefik router label |
| A wildcard subdomain does not work                           | Cloudflare points the request to the VPS, but Traefik has no matching rule | Add the subdomain to the correct Docker Compose Traefik rule |
| The page works, but HTTPS is not ready immediately           | DNS or certificate setup is still settling                   | Wait a minute, then refresh and test again                   |

## Commands Reference

Restart the n8n Docker Compose project:

```bash
cd ~/docker/n8n
docker compose down && docker compose up -d
```

Check running containers:

```bash
docker ps
```

View Traefik logs:

```bash
docker logs traefik
```

## Docker Compose Reference

Basic environment variables:

```yaml
environment:
  - DOMAIN_NAME=yourdomain.com
  - SUBDOMAIN=flow
```

Optional SSL email and timezone:

```yaml
environment:
  - DOMAIN_NAME=yourdomain.com
  - SUBDOMAIN=flow
  - SSL_EMAIL=you@example.com
  - GENERIC_TIMEZONE=America/New_York
```

Basic Traefik router rule:

```yaml
- traefik.http.routers.n8n.rule=Host(`${SUBDOMAIN}.${DOMAIN_NAME}`)
```

Multiple hostnames for the same n8n instance:

```yaml
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

- Hostinger VPS: https://www.hostg.xyz/SHIDN
- Coupon code: `DISCOUNT7`
- Earlier custom domains tutorial: https://youtu.be/2XJbZIi5JBs
- Cloudflare dashboard: https://dash.cloudflare.com
- Hostinger hPanel: https://hpanel.hostinger.com
