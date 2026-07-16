---
title: How to Install Directus on a Hostinger VPS (Self-Hosted Airtable Alternative)
description: Install Directus, a free self-hosted Airtable alternative, on a Hostinger VPS with Docker and Claude Code, locked down behind Tailscale.
pubDate: 2026-07-15
draft: false
type: tutorial
slug: directus
permalink: /directus/
canonicalUrl: https://mikemurphy.ai/tutorials/directus/
contentEra: ai
visibility: public
author: Mike Murphy
featuredImage: /assets/media/2026/07/directus.jpg
featuredImageSource: ""
categories:
  - Tutorials
  - Docker
  - Self-Hosting
tags:
  - directus
  - airtable-alternative
  - docker
  - hostinger
  - tailscale
  - self-hosted
  - headless-cms
  - postgres
topics:
  - directus
  - airtable-alternative
  - docker
  - hostinger-vps
  - tailscale
  - self-hosted
youtube:
  - https://youtu.be/W_mTSa7StsU
search:
  include: true
  boost: 1
---

I've used and loved Airtable for years to organize my content. I don't have a problem with it, I just don't love paying $20 a month, $240 a year, when there are open-source options I can self-host for free on infrastructure I already own. So I went looking for an Airtable replacement I could run on my Hostinger VPS, and I ended up somewhere I didn't expect: Directus.

## What You Will Build

- Directus running in a Docker container on your Hostinger VPS
- A separate Postgres database with its own persistent volume
- Directus locked down to your private Tailscale network, never exposed to the public internet
- Instant REST and GraphQL APIs for every collection you create, with zero backend code
- A starting point for migrating your existing Airtable content into Directus

## Why This Matters

Before landing on Directus, I tried the usual Airtable alternatives. NocoDB felt a little clunky next to Airtable. Baserow looked great, almost identical to Airtable, but kept locking basic features behind an upgrade prompt. Grist was genuinely good. All three are solid options if you just want a self-hosted spreadsheet tool.

But a spreadsheet tool, even a self-hosted one, is still just a spreadsheet tool. The moment you want your website to pull that data, or an AI agent to read it, or an automation to react to it, you're exporting CSVs or hunting for a plugin. Directus takes a different approach: it sits on top of a real Postgres database, and the second you create a table (Directus calls them **Collections**), it hands you a working REST and GraphQL API for it automatically.

That matters because my new site at mikemurphy.ai is built on Astro, and I want that site, my AI agents, and my automation workflows all reading from and writing to the same place, over plain HTTP, instead of a pile of one-off exports. Directus becomes the hub everything else plugs into.

## Before You Start

- A Hostinger VPS with Docker and Docker Compose already installed
- Tailscale already installed and running on the VPS
- Basic comfort with SSH and the terminal
- Claude Code, if you want it to handle the install for you (this tutorial uses it, but you don't need any coding experience)

I'm intentionally not exposing Directus to the public internet. I'm accessing it exclusively over my private Tailscale network, so it's reachable from my phone, my iPad, or any device with Tailscale installed, but never from the open web.

## Step 1: Connect to Your VPS and Confirm Docker and Tailscale Are Running

Open a terminal and connect to your VPS over SSH. I like to launch Claude Code from a project folder even though it isn't installing anything locally, so if I ever want a README generated, it lands in the right place. On a Mac, right-click your project folder, choose **Services → New Terminal at Folder**, then run `claude` to launch it there.

Before doing anything else, confirm both pieces you're depending on are actually working:

```bash
docker --version
tailscale status
```

If Docker prints a version and Tailscale shows your device online, you're good to continue. If either command isn't found, install that piece first. The whole point of this setup is that Directus is never reachable outside your Tailscale network, so both need to be working before you start.

## Step 2: Ask Claude Code to Install Directus With Its Own Postgres Database

Tell Claude Code to connect to your VPS over SSH, then hand it a clear prompt describing exactly what you want. Here's the prompt I used:

```text
Use my vps-docker-internal skill to install Directus with its own Postgres
database on my VPS. Requirements: Two containers, Postgres (with a named
persistent volume for data) and Directus, connected via standard DB_*
environment variables. This should be internal-only, I'll access Directus
exclusively over Tailscale, so don't expose it on the public interface.
Bind it to the Tailscale IP/hostname (or set it up with tailscale serve,
whichever fits how the skill normally handles internal-only services).
Use a named volume for the Directus uploads folder too, not just Postgres.
Generate a secure password for the Postgres user, and generate secure
random values for Directus's KEY and SECRET, rather than placeholders.
Follow the skill's usual conventions for docker-compose structure, restart
policy, and file location on the VPS. Once it's running, confirm both
containers are healthy and give me the Tailscale URL/hostname to access
Directus from.
```

The reason I use Claude Code instead of Hostinger's one-click Directus install from its Docker catalog is consistency. Claude follows the same naming conventions and structure I already use for every other container on that VPS, and it checks the setup end to end rather than just deploying and walking away.

Under the hood, this creates a `docker-compose.yml` with two services: Postgres, with a named volume so your data survives container updates, and Directus, pointed at that database with its own named volume for uploaded files.

```yaml
services:
  directus-db:
    image: postgres:16
    container_name: directus-db
    restart: unless-stopped
    networks:
      - app-net
    environment:
      POSTGRES_USER: directus
      POSTGRES_PASSWORD: your_secure_password
      POSTGRES_DB: directus
    volumes:
      - directus_pg_data:/var/lib/postgresql/data

  directus:
    image: directus/directus:latest
    container_name: directus
    restart: unless-stopped
    depends_on:
      - directus-db
    networks:
      - app-net
    environment:
      KEY: "generate_a_random_value_here"
      SECRET: "generate_a_different_random_value_here"
      DB_CLIENT: "pg"
      DB_HOST: "directus-db"
      DB_PORT: "5432"
      DB_DATABASE: "directus"
      DB_USER: "directus"
      DB_PASSWORD: "your_secure_password"
      ADMIN_EMAIL: "you@example.com"
      ADMIN_PASSWORD: "your_admin_password"
    ports:
      - "8055:8055"
    volumes:
      - directus_uploads:/directus/uploads

networks:
  app-net:
    external: true

volumes:
  directus_pg_data:
    name: directus_pg_data
  directus_uploads:
    name: directus_uploads
```

Swap in real values for the passwords, and generate `KEY` and `SECRET` with something like `openssl rand -hex 32`. These aren't passwords you type in, they're internal values Directus uses to sign session tokens, so think of them as the lock cylinders behind the scenes. Never skip the named volumes: without them, tearing down the containers wipes your database and any uploaded files along with it.

## Step 3: Verify Both Containers Are Healthy

Once Claude reports the deploy finished, check it yourself:

```bash
docker ps
```

You should see `directus-db` and `directus` both listed with a status of `Up`. If you want the compose-specific view instead, `docker compose ps` works too. Directus takes a few extra seconds on first boot while it creates its database tables and your admin account, so don't panic if the port isn't answering immediately.

## Step 4: Log In to Directus Over Tailscale

Unlike most self-hosted tools, Directus doesn't have a signup screen. It creates your admin user automatically on first boot using the `ADMIN_EMAIL` and `ADMIN_PASSWORD` you set in the compose file.

Confirm Tailscale is connected with `tailscale status`, then open your browser to your VPS's Tailscale hostname on port 8055, for example `http://your-hostinger-vps:8055`. Log in with the same admin email and password from the environment values.

If you set this up through the Hostinger dashboard instead of Claude Code, those values live under **Docker Manager → Projects → Manage → YAML Editor**, below the Docker Compose file, in the environment box (also shown as a `.env` file).

## Step 5: Choose Your License

On first login, Directus asks which plan you're on. Select the free self-hosted **Core** plan and save. Before you do, read the paragraph above that option: if your business makes under $5 million a year, you may qualify for Directus's Open Innovation Grant. I applied, got approved instantly, and received a license key that unlocks unlimited everything for free.

## Step 6: Create Your First Collection and See the API Instantly

This is the moment Directus earns its keep. Create a new **Collection** (Directus's word for a table), something simple like a list of blog post ideas. Add a couple of fields and save one item.

Now open your browser to that collection's endpoint, something like `https://your-directus-url/items/your_collection_name`. You'll get real JSON straight from the database, with zero code written. That's the exact same endpoint your Astro site, an AI agent, or an n8n workflow would call to read or write that data.

## Step 7: Migrate Your Airtable Data

Importing a CSV into Directus is straightforward, but there's no built-in one-click Airtable importer the way there was with NocoDB or Baserow. The workaround: ask an AI assistant like Claude, Codex, or Gemini to connect the Airtable API to the Directus API and handle the migration for you. Codex handled my entire migration, and the resulting data in Directus matched my original Airtable tables field for field, just sitting behind an API instead of a subscription.

## Troubleshooting

| Problem | Fix |
|---|---|
| Can't load Directus in the browser | Confirm your device is connected to Tailscale and you're using the Tailscale hostname, not a public IP, on port 8055 |
| Login fails | Double-check `ADMIN_EMAIL` and `ADMIN_PASSWORD` exactly match the compose file. There's no separate password reset wizard |
| Containers won't start or stay healthy | Run `docker compose logs -f directus` to see what's failing, usually a database connection issue |
| Data disappeared after an update | Confirm you're using named volumes for both Postgres and uploads. Without them, container teardown wipes your data |

## Commands Reference

```bash
# Check status
docker ps
docker compose ps

# Tail logs
docker compose logs -f directus

# Update Directus without touching your data
docker compose pull directus
docker compose up -d directus

# Confirm Tailscale is connected
tailscale status
```

## What This Unlocks Next

- A full walkthrough of migrating an entire Airtable base into Directus
- Connecting Directus to my Astro rebuild of mikemurphy.ai so the site reads content directly from the API
- Using Directus Flows (its built-in automation system) alongside n8n
- Wiring Directus into AI agents that read and write content through its REST and GraphQL API

## Links

- [Directus documentation](https://directus.io/docs)
- Hostinger VPS: https://www.hostg.xyz/SHIDN
- Tailscale setup tutorial: https://youtu.be/3UePiR7_AFg
- If you want to compare self-hosted Airtable alternatives yourself, search your Hostinger Docker catalog for Baserow, Grist, or NocoDB, all available as free one-click deploys
