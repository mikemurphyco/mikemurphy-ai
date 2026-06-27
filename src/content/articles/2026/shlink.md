---
title: How To Migrate Pretty Links To Shlink on Hostinger VPS
description: Migrate Pretty Links from WordPress to a self-hosted Shlink URL shortener using Docker, Traefik, Cloudflare, and a Hostinger VPS.
pubDate: 2026-06-19T06:30:00
updatedDate: 2026-06-19T06:30:00
draft: false
type: post
slug: shlink
permalink: /shlink/
legacyPermalink: https://www.mikemurphy.co/shlink/
canonicalUrl: https://mikemurphy.ai/tutorials/shlink/
contentEra: ai
visibility: public
author: Mike Murphy
featuredImage: /assets/media/2026/06/shlink.jpg
featuredImageSource: https://www.mikemurphy.co/wp-content/uploads/2026/06/shlink.png
categories:
  - Hostinger VPS
  - WordPress
  - Tutorials
tags: []
topics:
  - hostinger-vps
  - shlink
  - pretty-links
  - wordpress-migration
  - docker
  - traefik
  - cloudflare
tools:
  - Shlink
  - Pretty Links
  - Hostinger VPS
  - Docker
  - Traefik
  - Cloudflare
  - Google Sheets
difficulty: intermediate
estimatedTime: 45–90 minutes
videoUrl: https://youtu.be/HTDCy3K1Qds
youtubeId: HTDCy3K1Qds
youtube:
  - https://youtu.be/HTDCy3K1Qds
resourceGuide: ""
search:
  include: true
  boost: 1
---

# How To Migrate Pretty Links To Shlink on Hostinger VPS

What happens to all your Pretty Links when you move a website away from WordPress?

That was one of the first questions I had when I started moving my website from WordPress to Astro. I had more than 250 custom short links scattered across YouTube descriptions, podcast show notes, articles, social posts, and affiliate promotions.

I could not let those links disappear just because I was replacing WordPress.

My solution was **Shlink**, a free and open-source URL shortener that I installed in a Docker container on my Hostinger VPS.

In this tutorial, I will walk you through the migration process I used: exporting my Pretty Links, deploying Shlink, connecting custom domains, setting up the web dashboard, and importing the old links into the new system.

## What You Will Build

By the end of this tutorial, you will have:

- A self-hosted Shlink installation running on a Hostinger VPS
- A branded short domain such as `go.example.com`
- A private web dashboard for creating and managing short links
- HTTPS certificates managed automatically through Traefik
- Cloudflare DNS records pointing your Shlink domains to the VPS
- Your old Pretty Links organized in a CSV file and imported into Shlink
- Tags for organizing links by topic, platform, or purpose

The finished setup has three parts:

| Address | Purpose |
| --- | --- |
| `https://go.example.com/your-slug` | The public short link people click |
| `https://shlink-admin.example.com` | The web dashboard you use to manage links |
| `https://shlink-api.example.com` | The backend API used by the dashboard |

You can use different domain names or subdomains. The important part is understanding that the public short-link domain, admin interface, and backend API have different jobs.

## Why I Replaced Pretty Links With Shlink

Pretty Links was one of the most useful plugins on my WordPress site.

It let me turn a long destination URL into a short, branded link such as:

```text
https://example.com/youtube
```

The word after the final slash is the **slug**. When someone opens the short link, Pretty Links redirects them to the full destination URL.

This is useful for social profiles, frequently shared resources, affiliate links, podcast links, and any destination that may change later. You can update the destination in one place without replacing the short link everywhere it has already been published.

The problem is that Pretty Links depends on WordPress. If WordPress goes away, the plugin and its redirects go away with it.

I considered hosted link-shortening services, but Shlink was a better fit for my setup:

- It is free and open source
- It runs cleanly in Docker
- I can host it on a VPS I already pay for
- It supports custom domains
- It includes a browser-based Web Client
- It provides analytics and QR codes
- It has a REST API for future automation
- It supports features such as tags, expiration dates, and password-protected links
- I control the application and its data

I also happen to think Shlink is a cool name, even if saying “Shlink” out loud five times in a tutorial is surprisingly difficult.

## Before You Start

This tutorial assumes you have:

- A Hostinger VPS
- Docker installed on the VPS
- Traefik running as your reverse proxy
- An external Docker network that Traefik can access
- A domain managed through Cloudflare
- SSH access to your VPS
- Access to your WordPress dashboard and Pretty Links

You should also decide on three addresses:

```text
Public short domain: go.example.com
Admin dashboard:     shlink-admin.example.com
Backend API:         shlink-api.example.com
```

Do not publish your VPS IP address, API key, dashboard password, database, or real environment file. Every sensitive value in this tutorial is represented by a placeholder.

## Phase 1: Export Pretty Links To A CSV File

Before touching the VPS, get your existing links out of WordPress and into a format you can inspect.

The information you need for each Pretty Link is:

- Link title
- Destination URL
- Existing Pretty Link
- Slug

### The Pretty Links Lite Limitation

Pretty Links supports importing and exporting, but those tools may require a paid version of the plugin.

I was using Pretty Links Lite, so I could not simply click an export button.

My workaround was to use an AI browser assistant to read the Pretty Links table in the WordPress dashboard and build a CSV file containing the titles, destination URLs, full Pretty Links, and slugs.

You can use any safe export method available to you. The goal is a CSV with a structure similar to this:

```csv
title,destination_url,old_short_url,slug
YouTube Channel,https://www.youtube.com/@your-channel,https://old.example.com/youtube,youtube
Newsletter,https://example.com/newsletter,https://old.example.com/newsletter,newsletter
```

Do not include login credentials, private notes, API keys, or other secrets in the CSV.

### Clean Up The Links In Google Sheets

I imported the CSV into Google Sheets before moving anything into Shlink.

This made it easier to:

- Find duplicate slugs
- Remove links I no longer needed
- Check destination URLs
- Fix malformed URLs
- Decide how links should be tagged
- Keep a backup of the original Pretty Links

This cleanup is worth doing. Importing 250 links is easy. Cleaning up 250 disorganized links after the import is less fun.

What success looks like: you have a reviewed CSV containing one row for each short link you want to keep.

## Phase 2: Install Shlink With Docker

Hostinger includes a Docker Manager catalog where you can search for Shlink and deploy it as a container.

You can use that catalog or create the Docker Compose project yourself. I use an AI coding assistant and a reusable VPS deployment workflow so my Docker applications, domains, networks, and Traefik labels are configured consistently.

The setup I deployed uses:

- The official Shlink container
- The official Shlink Web Client container
- SQLite stored in a persistent Docker volume
- Traefik for routing and HTTPS

Create a project folder on the VPS:

```bash
mkdir -p /docker/shlink
cd /docker/shlink
```

Create an environment file:

```bash
nano .env
```

Add your own values:

```dotenv
APP_NAME=shlink
API_SUBDOMAIN=shlink-api
ADMIN_SUBDOMAIN=shlink-admin
DOMAIN_NAME=example.com
SHORT_DOMAIN=go.example.com
INITIAL_API_KEY=REPLACE_WITH_A_LONG_RANDOM_SECRET
```

Generate the API key with a secure password manager or a cryptographically secure random-value generator. Do not copy an API key from a tutorial, screenshot, repository, or another Shlink installation.

The initial key is used to connect the Web Client to the Shlink API. Treat it like a password.

## Phase 3: Configure Docker Compose And Traefik

Create the Compose file:

```bash
nano docker-compose.yml
```

The following example is based on my working setup, but all domains and secrets have been replaced with reusable variables:

```yaml
services:
  shlink:
    image: shlinkio/shlink:stable
    restart: unless-stopped
    labels:
      - traefik.enable=true
      - traefik.http.routers.shlink.rule=Host(`${API_SUBDOMAIN}.${DOMAIN_NAME}`) || Host(`${SHORT_DOMAIN}`)
      - traefik.http.routers.shlink.tls=true
      - traefik.http.routers.shlink.tls.certresolver=mytlschallenge
      - traefik.http.routers.shlink.entrypoints=web,websecure
      - traefik.http.services.shlink.loadbalancer.server.port=8080
      - traefik.http.middlewares.shlink-headers.headers.SSLRedirect=true
      - traefik.http.middlewares.shlink-headers.headers.STSSeconds=315360000
      - traefik.http.middlewares.shlink-headers.headers.contentTypeNosniff=true
      - traefik.http.middlewares.shlink-headers.headers.forceSTSHeader=true
      - traefik.http.middlewares.shlink-headers.headers.STSIncludeSubdomains=true
      - traefik.http.middlewares.shlink-headers.headers.STSPreload=true
      - traefik.http.routers.shlink.middlewares=shlink-headers@docker
    environment:
      - DEFAULT_DOMAIN=${SHORT_DOMAIN}
      - IS_HTTPS_ENABLED=true
      - DB_DRIVER=sqlite
      - INITIAL_API_KEY=${INITIAL_API_KEY}
    volumes:
      - shlink_data:/etc/shlink/data
    networks:
      - app-net

  shlink-web-client:
    image: shlinkio/shlink-web-client:stable
    restart: unless-stopped
    labels:
      - traefik.enable=true
      - traefik.http.routers.shlink-web.rule=Host(`${ADMIN_SUBDOMAIN}.${DOMAIN_NAME}`)
      - traefik.http.routers.shlink-web.tls=true
      - traefik.http.routers.shlink-web.tls.certresolver=mytlschallenge
      - traefik.http.routers.shlink-web.entrypoints=web,websecure
      - traefik.http.services.shlink-web.loadbalancer.server.port=8080
      - traefik.http.middlewares.shlink-web-headers.headers.SSLRedirect=true
      - traefik.http.middlewares.shlink-web-headers.headers.STSSeconds=315360000
      - traefik.http.middlewares.shlink-web-headers.headers.contentTypeNosniff=true
      - traefik.http.middlewares.shlink-web-headers.headers.forceSTSHeader=true
      - traefik.http.middlewares.shlink-web-headers.headers.STSIncludeSubdomains=true
      - traefik.http.middlewares.shlink-web-headers.headers.STSPreload=true
      - traefik.http.routers.shlink-web.middlewares=shlink-web-headers@docker
    networks:
      - app-net

networks:
  app-net:
    external: true

volumes:
  shlink_data:
```

Replace `app-net` and `mytlschallenge` if your Traefik installation uses different names.

This configuration routes both the API subdomain and public short domain to the main Shlink container. The `DEFAULT_DOMAIN` setting controls which domain Shlink uses when generating new short URLs.

The Web Client runs in a separate container and gets its own admin subdomain.

Start the project:

```bash
cd /docker/shlink
docker compose up -d
```

Check the containers:

```bash
docker compose ps
```

What success looks like: both containers show a running status, and the Shlink data is stored in a persistent Docker volume.

## Phase 4: Configure Cloudflare DNS And SSL

Next, point the three Shlink addresses to your VPS.

In Cloudflare, create DNS records similar to these:

| Type | Name | Target | Proxy status |
| --- | --- | --- | --- |
| `A` | `shlink-api` | `YOUR_VPS_IP_ADDRESS` | Proxied |
| `A` | `shlink-admin` | `YOUR_VPS_IP_ADDRESS` | Proxied |
| `A` | `go` | `YOUR_VPS_IP_ADDRESS` | Proxied |

If the short domain and admin/API domains use different root domains, add the records in the correct Cloudflare zone for each domain.

Set the Cloudflare SSL/TLS encryption mode to:

```text
Full (Strict)
```

Do not use Flexible SSL with this Traefik setup. Full (Strict) keeps the connection encrypted from the visitor to Cloudflare and from Cloudflare to your server, while also validating the server certificate.

Traefik can then request and renew the HTTPS certificates using the Cloudflare DNS challenge configured in your existing reverse-proxy setup.

What success looks like:

- The admin domain opens over HTTPS
- The public short domain resolves over HTTPS
- The API domain reaches Shlink
- Your browser does not show a certificate warning

The API address may display a basic “not found” response when opened directly in a browser. That does not automatically mean it is broken. The API is intended to receive requests from the Web Client and other tools, not to act like a normal website homepage.

## Phase 5: Connect The Shlink Web Client

Open your admin address:

```text
https://shlink-admin.example.com
```

The first time you use the Web Client, add your Shlink server:

1. Open **Servers**
2. Select **Manage servers**
3. Click **Add a server**
4. Enter any friendly server name
5. Enter the API base URL: `https://shlink-api.example.com`
6. Paste the initial API key from your private `.env` file
7. Create the server connection
8. Select the new server to enter the dashboard

The server name is only a label inside the Web Client. The base URL and API key are the important parts.

### Test One Short Link

Before importing hundreds of links, create one test link in the dashboard.

Use:

- A safe destination URL
- A temporary slug such as `shlink-test`
- Your public short domain

Open the finished URL:

```text
https://go.example.com/shlink-test
```

What success looks like: the short URL redirects to the destination you selected.

Delete the test link when you are finished if you do not need it.

## Secure The Admin Dashboard

The Web Client is an administration tool, so do not leave it casually exposed.

I placed HTTP Basic Authentication in front of the admin subdomain through Traefik. You could also protect it with another access layer, such as Cloudflare Access.

If you use Basic Auth with a Cloudflare-proxied admin domain, make sure Cloudflare does not cache and serve the dashboard in a way that bypasses the authentication prompt. Create a cache-bypass rule for:

```text
shlink-admin.example.com/*
```

The exact Cloudflare menu and rule type may change over time, but the goal is simple: do not cache the private admin interface.

Never place a plaintext dashboard password directly in a public Compose file. Store credentials securely and keep generated password hashes private.

## Phase 6: Import The Pretty Links Into Shlink

The Shlink Web Client does not provide a simple CSV import button for this migration.

Shlink imports and bulk operations can be handled through its command-line tools or REST API. Because Shlink and its data were already running on my VPS, I connected to the VPS over SSH and used an AI coding assistant to process the cleaned CSV and create the short links through Shlink.

The import mapped:

- The old Pretty Link slug to the new Shlink slug
- The old target URL to the new destination URL
- Categories and link types to Shlink tags

For example:

```text
Old Pretty Link: https://old.example.com/youtube
New Shlink URL:  https://go.example.com/youtube
Destination:     https://www.youtube.com/@your-channel
Tag:             youtube
```

Before running a bulk import:

1. Back up the original CSV
2. Confirm which column contains the slug
3. Confirm which column contains the destination URL
4. Check for duplicate slugs
5. Test the process with one or two links
6. Confirm the test links redirect properly
7. Import the remaining links
8. Compare the number of source rows with the number of links created
9. Spot-check important affiliate and frequently shared links

The exact import command depends on the columns in your CSV and whether you use Shlink’s CLI or REST API. Do not paste an unverified bulk-import script into your production server.

What success looks like: the imported links appear in the Web Client, retain their intended slugs, and redirect to the correct destinations.

## Add Tags To Keep Shlink Organized

Tags make a large link collection much easier to manage.

I used tags for groups such as:

- YouTube
- Podcasts
- Social media
- Affiliate links
- Software tools
- Tutorials
- Products

You do not need a complicated taxonomy. Use tags that make sense when you are searching for a link six months from now.

The Web Client lets you view short URLs, filter by tags, inspect analytics, create QR codes, export data, and manage domains from one interface.

## The Migration Is Not Finished Until Old Links Redirect

Importing the links into Shlink gives you working URLs on the new domain, but it does not automatically preserve the old Pretty Links.

For example:

```text
Old URL: https://old.example.com/youtube
New URL: https://go.example.com/youtube
```

When the old WordPress site is replaced, the old address still needs to redirect to the new Shlink address.

That is the final piece of the migration:

```text
old.example.com/slug → go.example.com/slug
```

I am handling that as a separate Cloudflare redirect tutorial because the redirect should be tested as part of the actual website and DNS cutover.

Do not shut down WordPress or remove Pretty Links until you have a plan for these legacy redirects. Existing links may be spread across years of videos, articles, emails, show notes, and social posts.

## Troubleshooting

| Problem | Likely cause | What to check |
| --- | --- | --- |
| The containers will not start | Compose syntax, missing variables, or missing external network | Run `docker compose config`, verify `.env`, and confirm the Traefik network exists |
| The admin domain does not load | DNS or Traefik router problem | Check the Cloudflare record, container logs, router rule, and Docker network |
| The browser shows an SSL warning | Certificate or Cloudflare SSL mode problem | Use Full (Strict), verify the certificate resolver, and check Traefik logs |
| The API domain shows “not found” | You opened an API root in a browser | Confirm the Web Client can connect before treating this as a failure |
| The Web Client cannot add the server | Incorrect API URL or API key | Use the API subdomain, include `https://`, and retrieve the key from the private `.env` file |
| New links use the wrong domain | `DEFAULT_DOMAIN` is incorrect | Set it to the public short domain and recreate or update the affected links |
| Imported links have wrong slugs | CSV columns were mapped incorrectly | Stop the import, inspect the headers, and test with one row |
| Some links fail during import | Duplicate slugs or malformed destinations | Check duplicates, URL formatting, and the import response |
| Admin authentication appears to be bypassed | Cloudflare cached the admin page | Add a cache-bypass rule for the admin subdomain |
| Data disappears after recreating a container | Shlink data was not persisted | Verify the volume is mounted at `/etc/shlink/data` |
| Removing `INITIAL_API_KEY` does not revoke the key | The variable only creates the key on first boot | Revoke or replace the key through Shlink instead of only editing `.env` |

## Commands Reference

### Open The Shlink Project

```bash
cd /docker/shlink
```

### Start Or Apply Changes

```bash
docker compose up -d
```

### Check Container Status

```bash
docker compose ps
```

### Validate The Compose Configuration

```bash
docker compose config
```

Be careful: the rendered output may include environment values. Do not paste it into a public issue, article, chat, or screenshot without removing secrets.

### View Logs

```bash
docker compose logs --tail=100 shlink
docker compose logs --tail=100 shlink-web-client
```

### Follow Logs Live

```bash
docker compose logs -f shlink
```

Press `Control + C` to stop following the logs.

### Restart The Project

```bash
docker compose restart
```

### Stop The Project

```bash
docker compose down
```

The named data volume remains unless you explicitly remove it. Do not add the `--volumes` option unless you intentionally want to delete the stored Shlink data.

## Back Up Your Shlink Data

In this setup, the SQLite database is stored in the named Docker volume:

```text
shlink_shlink_data
```

The exact volume name may differ if your Compose project uses a different project name.

Add the Shlink data to your normal VPS backup routine. A link shortener becomes infrastructure once important links depend on it.

Keep at least:

- A backup of the original Pretty Links CSV
- A current Shlink export
- A backup of the persistent Shlink data volume
- A private copy of the Compose and environment configuration
- A record of the DNS and redirect rules

## What This Unlocks Next

With Shlink running, I am no longer depending on WordPress to manage branded short links.

I can:

- Create and edit short URLs in a browser
- Keep using memorable branded links
- Organize hundreds of links with tags
- View analytics
- Generate QR codes
- Use multiple domains
- Automate link creation through the API
- Move the Docker project to another VPS later if needed

The next step is to redirect every old Pretty Link to its matching Shlink URL when the WordPress site is replaced.

That closes the loop and keeps old links working after the move to Astro.

## Links

- [Shlink](https://shlink.io/)
- [Shlink Documentation](https://shlink.io/documentation/)
- [Shlink on GitHub](https://github.com/shlinkio/shlink)
- [Docker Documentation](https://docs.docker.com/)
- [Traefik Documentation](https://doc.traefik.io/traefik/)
- [Cloudflare DNS Documentation](https://developers.cloudflare.com/dns/)
- [Pretty Links](https://prettylinks.com/)
- Hostinger VPS setup tutorial: TODO
- Cloudflare legacy redirect tutorial: TODO
- Downloadable migration resource guide: TODO

## Watch The Video

Video URL: https://youtu.be/HTDCy3K1Qds

In the video, you can see the original Pretty Links setup, the Hostinger Docker Manager, the Shlink Web Client, the Cloudflare DNS records, and the completed link library running on the VPS.

My name is Mike Murphy, your AI Handyman. Cheers!
