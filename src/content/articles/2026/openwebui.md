---
title: "Run a Private AI Chatbot on Your Hostinger VPS (Tailscale + Ollama + Open WebUI)"
description: "Set up a private, self-hosted AI chat interface on your Hostinger VPS using Tailscale, Ollama, and Open WebUI."
pubDate: "2026-05-22T06:30:32"
updatedDate: "2026-05-21T22:53:55"
draft: false
type: "post"
slug: "openwebui"
permalink: "/openwebui/"
legacyPermalink: "https://www.mikemurphy.co/openwebui/"
canonicalUrl: "https://mikemurphy.ai/tutorials/openwebui/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2026/05/OPEN-WEB-UI.png"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2026/05/OPEN-WEB-UI.png"
categories:
  - "AI"
  - "Hostinger VPS"
  - "Ollama"
  - "Open WebUI"
  - "Tailscale"
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
  id: "215652"
  postType: "post"
  rawWordCount: 2041
seo:
  legacyTitle: "Run a Private AI Chatbot on Your Hostinger VPS (Tailscale + Ollama + Open WebUI) - Mike Murphy Co"
  legacyH1: "Run a Private AI Chatbot on Your Hostinger VPS (Tailscale + Ollama + Open WebUI)"
  legacyCanonical: "https://www.mikemurphy.co/openwebui/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 2847
youtube:
  - "https://youtu.be/QWxkbtLJcHk"
---

https://youtu.be/QWxkbtLJcHk

**Description:**
In this tutorial, you will learn how to set up a private, self-hosted AI chat interface on your Hostinger VPS using Tailscale, Ollama, and Open WebUI. This is Part 2 of the Tailscale series. Once it is set up, you will have a ChatGPT-style chat interface running 24/7 on your own server, accessible from any device on your Tailscale network, completely private, secure, and free (beyond your existing VPS subscription).

**🧠 What You Will Learn**

- Open WebUI… deploy it as a Docker container on your Hostinger VPS
- Ollama… install it as the AI engine powering your chat interface
- Docker networks: confirm both containers are on the same network
- Claude Code: use it to deploy Docker containers on your VPS via SS
- YAML config: set ports correctly and keep services internal only
- Tailscale MagicDNS: connect to Open WebUI from any device on your network
- Model management: pull new Ollama models and switch between them in Open WebUI

------------------------------------------------------------------------

🔗 **Links**

**🌐 Hostinger VPS (Affiliate Link):**\
<a href="https://www.hostg.xyz/SHIDN" class="external-link" target="_blank" rel="noopener nofollow">https://www.hostg.xyz/SHIDN</a>

**Tailscale:**\
<a href="https://tailscale.com" class="external-link" target="_blank" rel="noopener nofollow">https://tailscale.com</a>

**Open WebUI**
<a href="http://&#39;" data-wplink-url-error="true">https://openwebui.com</a>

**Ollama:**
<https://ollama.com>

**⏱️ Timestamps**

00:00 Intro: About The Tutorial\
01:11 Tools Used\
02:05 Tools Overview\
02:54 VPS: Docker Catalog\
04:10 Claude Code SSH\
05:20 VPS Skills\
06:57 Confirm Ollama & Open WebUI\
07:43 Docker Network\
09:45 Open WebUI Docker Compose\
11:26 Check Tailscale Network\
12:22 Tailscale: Magic DNS\
12:59 Connect to Open WebUI\
14:31 Connect to Open WebUI in Browser\
15:08 Open WebUI Overview\
16:41 Download Ollama Models

### What We’re Building

- **Ollama** — runs local AI models (like Gemma, Qwen, Kimi, etc) on your VPS
- **Open WebUI** — a polished ChatGPT-style browser interface that talks to Ollama
- **Tailscale** — a free private network that connects all your devices securely without opening ports to the public internet
- Both Ollama and Open WebUI are running in **Docker containers on your VPS**
- This tutorial focuses on the **wiring and the connection** — not spinning up the containers from scratch

------------------------------------------------------------------------

## The Big Picture (Why This Setup is Worth Understanding)

I know it sounds like a lot of moving parts — but think of it like this:

> “Ollama is the engine. Open WebUI is the dashboard. Tailscale is the private road that lets you drive from anywhere.”

| Layer | Tool | Job |
|----|----|----|
| AI model runner | Ollama (Docker container) | Runs the actual AI models on your VPS |
| Chat interface | Open WebUI (Docker container) | Gives you a browser-based UI to talk to Ollama |
| Private access | Tailscale | Securely connects your devices to your VPS — no public ports needed |

**Why not just expose Open WebUI publicly?** You could — but then anyone could potentially reach it. Tailscale keeps it completely private to only your devices, with zero extra firewall configuration.

**Why run this on a VPS at all?** Your local machine doesn’t have to stay on. The VPS runs 24/7. Pull up your phone in the airport, open a browser, and your AI chat interface is just there.

------------------------------------------------------------------------

## Prerequisites

- A VPS running Ubuntu (Hostinger or similar)
- **Ollama already running in a Docker container** on that VPS *(link in description)*
- **Open WebUI already running in a Docker container** on that VPS *(link in description)*
- Both containers are on the **same Docker network**
- SSH access to your VPS (Termius or terminal)
- A Tailscale account — free tier is all you need *(tailscale.com)*
- A device to test with (MacBook, iPhone, etc.)

> ⚠️ “I’m not going to walk through setting up Ollama or Open WebUI in Docker in this tutorial — I’ll link those in the description. If you’ve got both containers running, you’re in the right place.”

------------------------------------------------------------------------

## Connect to Your VPS

SSH into your VPS or open the terminal in your hosting dashboard.

------------------------------------------------------------------------

## Step 1: Confirm Both Containers Are Running and On the Same Docker Network

```bash
docker ps
```

You’re looking for two containers — one for Ollama, one for Open WebUI — both listed as `Up`.

```bash
docker network ls
```

Find the shared network name (something like `ai-network` or whatever you named it).

```bash
docker network inspect <your-network-name>
```

- Look for both container names listed under `Containers`
- If they’re both there — you’re good

> ⚠️ “If they’re on different networks, Open WebUI won’t be able to reach Ollama by container name. That’s the most common issue at this stage.”

------------------------------------------------------------------------

## Step 2: Confirm Open WebUI Can Reach Ollama

Inside Open WebUI, Ollama is referenced by its **container name**, not `localhost`. This is how Docker networking works — containers talk to each other by name on a shared network.

The connection string should look like:

```
http://ollama:11434
```

Where `ollama` is the container name for your Ollama container.

> 📝 You set this in Open WebUI’s environment variable — typically `OLLAMA_BASE_URL=http://ollama:11434` in your Docker Compose or run command.

- Open a browser on your local machine and navigate to your VPS IP on whatever port Open WebUI is running (e.g. `http://YOUR_VPS_IP:3000`)
- Log into Open WebUI
- Go to **Settings → Connections** and confirm Ollama URL is pointing to `http://ollama:11434`
- You should see your models listed — that’s your green light

> ⚠️ “If you see a connection error here, it almost always means the containers aren’t on the same Docker network, or the Ollama container name doesn’t match what you typed.”

------------------------------------------------------------------------

## Step 3: Install Tailscale on Your VPS

Tailscale installs on your VPS like any other package. One command.

```bash
curl -fsSL https://tailscale.com/install.sh | sh
```

This pulls the official Tailscale installer and sets it up on your server.

------------------------------------------------------------------------

## Step 4: Authenticate Your VPS to Your Tailscale Network

```bash
sudo tailscale up
```

- This outputs a URL — copy it and open it in your browser
- Log in with your Tailscale account (Google, GitHub, etc.)
- Your VPS will show up as a new device in your Tailscale dashboard

> 📝 You only do this once. After this, Tailscale starts automatically on reboot.

------------------------------------------------------------------------

## Step 5: Get Your VPS Tailscale IP

```bash
tailscale ip -4
```

This gives you something like `100.x.x.x` — your VPS’s private Tailscale IP address. **Write this down.**

> 📝 This is a private IP that only your Tailscale devices can see. It does not expose your server to the public internet.

------------------------------------------------------------------------

## Step 6: Install Tailscale on Your Other Devices

On your **MacBook**: download from <a href="https://tailscale.com/download" class="external-link" target="_blank" rel="noopener nofollow" data-tooltip-position="top" aria-label="https://tailscale.com/download">tailscale.com/download</a> and sign into the same account.

On your **iPhone/Android**: install from the App Store or Play Store, sign in with the same account.

Once installed and logged in — your devices are on the same private network. That’s it.

| Device             | Install Method                         |
|--------------------|----------------------------------------|
| MacBook            | Tailscale app — tailscale.com/download |
| iPhone             | App Store → Tailscale                  |
| Android            | Play Store → Tailscale                 |
| Another VPS/server | Same `curl` installer command          |

------------------------------------------------------------------------

## Step 7: Access Open WebUI From Any Device

On any device connected to Tailscale, open a browser and go to:

```
http://100.x.x.x:3000
```

Replace `100.x.x.x` with the Tailscale IP from Step 5. Replace `3000` with whatever port your Open WebUI container is mapped to.

- You should see your Open WebUI login screen
- Log in — pick a model — start chatting
- You’re talking to Ollama on your VPS, through your private Tailscale network, from any device in the world

> “And that’s pretty much it. Private AI chat, on your own server, from anywhere. Pretty cool.”

------------------------------------------------------------------------

## Step 8: Verify It All Works End-to-End

Quick sanity checklist before you call this done:

- [ ] Open WebUI loads in the browser via Tailscale IP
- [ ] Models are listed in the model dropdown (pulled by Ollama)
- [ ] You can send a message and get a response
- [ ] Test it from a second device (phone or laptop) — confirm both work
- [ ] Disconnect from your home WiFi on your phone, use cellular — it should still work via Tailscale

> ⚠️ “If it works on your laptop but not your phone, just double-check Tailscale is running on the phone and you’re signed into the same account.”

------------------------------------------------------------------------

## Core Commands Reference

### Docker checks

```bash
docker ps
docker network ls
docker network inspect <network-name>
```

### Tailscale on VPS

```bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo tailscale up
tailscale ip -4
tailscale status
```

### Confirm Tailscale is running after reboot

```bash
sudo systemctl status tailscaled
```

------------------------------------------------------------------------

## Complete Setup Summary (VPS Side)

```bash
# 1. Confirm containers are running
docker ps

# 2. Confirm they're on the same Docker network
docker network inspect <your-network-name>

# 3. Install Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# 4. Connect VPS to your Tailscale network
sudo tailscale up

# 5. Get your Tailscale IP
tailscale ip -4

# 6. Access Open WebUI from any Tailscale device
# http://100.x.x.x:3000
```

This is the clean wiring setup — Docker networking handles the Ollama connection, Tailscale handles the private remote access.

------------------------------------------------------------------------

## Wrap Up

You just turned your VPS into a private AI chat server you can reach from anywhere in the world — on your phone, MacBook, tablet, whatever — without opening a single public port. Ollama runs the models, Open WebUI gives you the interface, and Tailscale creates the private road between all your devices.

- Ollama and Open WebUI talk to each other inside Docker via container name ✓
- Tailscale creates a private network — no public exposure needed ✓
- Any device with Tailscale installed can reach Open WebUI from anywhere ✓
- Free tier covers everything shown in this tutorial ✓

*My name is Mike Murphy, your AI Handyman — cheers!*

**Questions, Comments, Feedback?**
<hello@mikemurphy.co>

**My Gear List:**
<https://mikemurphy.co/resources>

**My Amazon Store:**
<https://www.amazon.com/shop/mikemurphyco>

**My YouTube Channel:**
[https://youtube.com/mikemurphyco](https://mikemurphy.co/youtube)
