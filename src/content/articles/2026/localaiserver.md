---
title: "How To Set Up a Local AI Server on Mac Using Open WebUI and Ollama"
description: "Set up a private local AI server on Mac with Open WebUI and Ollama so you can run models, chat with files, and access the setup from other devices."
pubDate: "2026-05-27T06:30:03"
updatedDate: "2026-05-26T22:45:04"
draft: false
type: "post"
slug: "localaiserver"
permalink: "/localaiserver/"
legacyPermalink: "https://www.mikemurphy.co/localaiserver/"
canonicalUrl: "https://mikemurphy.ai/tutorials/localaiserver/"
contentEra: "ai"
visibility: "public"
author: "Mike Murphy"
featuredImage: "/assets/media/2026/05/open-web-local-ai.png"
featuredImageSource: "https://www.mikemurphy.co/wp-content/uploads/2026/05/open-web-local-ai.png"
categories:
  - "MacOS Terminal"
  - "Ollama"
  - "Open WebUI"
  - "Python"
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
  id: "215658"
  postType: "post"
  rawWordCount: 2515
seo:
  legacyTitle: "How To Set Up a Local AI Server on Mac Using Open WebUI and Ollama - Mike Murphy Co"
  legacyH1: "How To Set Up a Local AI Server on Mac Using Open WebUI and Ollama"
  legacyCanonical: "https://www.mikemurphy.co/localaiserver/"
  robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  liveWordCount: 4349
youtube:
  - "https://youtu.be/0-bpqRzXN7g"
---

https://youtu.be/0-bpqRzXN7g

- Open WebUI is one of those tools that looks simple at first glance. You open it in a browser, pick a model, and start chatting. That alone is useful.
- But the bigger idea is more interesting: you can turn your Mac into a private local AI server.
- With Open WebUI and Ollama, you can run large language models on your own machine, chat with local files and documents, and access that local AI setup from other devices on the same network. For anyone learning AI tools, building automations, or experimenting with private knowledge workflows, this is a great foundation.

In this tutorial, you will install Open WebUI on macOS using Python. The setup keeps everything contained inside a Python virtual environment, so your Mac stays clean and you can remove the whole thing later without hunting down scattered dependencies.

## What You Will Build

By the end, you will have:

- Open WebUI installed locally on your Mac
- A clean Python virtual environment for the installation
- A simple Terminal shortcut to launch Open WebUI anytime
- A browser-based local AI chat interface at `http://localhost:8080`
- A setup that can automatically talk to Ollama models running on your Mac
- The option to connect another device on your home network, such as an iPhone or iPad

This is not just about installing another chat app. This is the start of a local AI workspace you control.

## Why This Matters

- Most people experience AI through hosted tools like ChatGPT, Claude, Gemini, or Perplexity. Those tools are powerful, but they run on someone else’s servers.
- A local AI setup gives you a different kind of workspace.
- You can run models on your own computer. You can experiment without sending everything to a cloud service. You can use your own files and documents. You can build toward a private RAG system, where your AI assistant can search and reason over your local knowledge.
- Open WebUI is useful because it gives you a friendly interface for that local system. Ollama handles the local models. Open WebUI gives you the browser interface, chat history, settings, file features, admin tools, and a growing set of connection points.
- Think of Ollama as the engine. Open WebUI is the dashboard.

## Before You Start

You will need:

- A Mac
- Python 3 installed
- Terminal access
- Ollama installed and running if you want local models available immediately
- Basic comfort copying and pasting commands

This tutorial uses the Python installation method for Open WebUI. You can also install Open WebUI with Docker, but Python is a clean option for Mac users who want a straightforward local setup without creating a container first.

## Step 1: Create a Folder for Open WebUI

Open Terminal on your Mac.

First, create a dedicated folder in your Home directory:

```bash
mkdir ~/open-webui-app
```

Now move into that folder:

```bash
cd ~/open-webui-app
```

This folder will hold the Python virtual environment and everything Open WebUI needs to run. Keeping the install in one obvious place makes the setup easier to understand and easier to remove later.

## Step 2: Create a Python Virtual Environment

Next, create a Python virtual environment:

```bash
python3 -m venv venv
```

A virtual environment is a contained Python workspace. Instead of installing Open WebUI and its dependencies across your Mac, you install them inside this folder.

That matters because AI tools often bring a lot of dependencies with them. A virtual environment keeps the install cleaner and safer. If you ever want to remove this setup, you can delete the `open-webui-app` folder instead of trying to unwind packages from your system Python.

After the command runs, you should have a new folder named `venv` inside `open-webui-app`.

## Step 3: Activate the Virtual Environment

Before installing Open WebUI, activate the virtual environment:

```bash
source venv/bin/activate
```

When it works, you should see something like this at the beginning of your Terminal prompt:

```text
(venv)
```

That tells you the virtual environment is active. Any Python packages you install now will go into this contained environment.

## Step 4: Install Open WebUI

With the virtual environment active, install Open WebUI:

```bash
pip install open-webui
```

This may take a few minutes. It might look quiet or stalled at certain points. Let it finish until your command prompt returns.

When the install is done, deactivate the virtual environment:

```bash
deactivate
```

You only needed to activate the environment for the installation step. In the next step, you will create a shortcut so you do not have to manually activate it every time you want to run Open WebUI.

## Step 5: Create a Terminal Shortcut

Without a shortcut, launching Open WebUI would mean going back into the folder, activating the virtual environment, and running the server command.

That works, but it is annoying.

Instead, add an alias to your `.zshrc` file:

```bash
echo "alias start-webui='~/open-webui-app/venv/bin/open-webui serve'" >> ~/.zshrc
```

Now reload your shell configuration:

```bash
source ~/.zshrc
```

This creates a new Terminal command:

```bash
start-webui
```

From now on, you can open any Terminal window, type `start-webui`, and launch your local Open WebUI server.

## Step 6: Launch Open WebUI

Run your new shortcut:

```bash
start-webui
```

The Open WebUI server will start in that Terminal window.

Do not close this Terminal window while you are using Open WebUI. The server is running inside that active session. If you close the window or stop the process, Open WebUI will stop responding in the browser.

Once the server is running, open a web browser and go to:

```text
http://localhost:8080
```

That address means you are connecting to a service running locally on your own computer. You are not opening a normal website on the public internet. You are opening the Open WebUI interface being served from your Mac.

## Step 7: Create the First Admin Account

The first time you open Open WebUI, you will be asked to create an admin account.

This can feel a little strange if you already have accounts for other AI tools. But this account is local to your Open WebUI install. It is not pulling a cloud login from somewhere else.

That is part of the point.

This setup is designed to run locally. Your local Open WebUI instance needs its own admin user so you can manage settings, models, files, and connections inside your private setup.

Create the account, sign in, and you should land inside the Open WebUI interface.

## Step 8: Connect Open WebUI to Ollama

If Ollama is already installed and running on your Mac, Open WebUI will often detect it automatically.

Ollama is the tool that runs local large language models. Open WebUI is the interface you use to talk to them.

Once Open WebUI sees Ollama, you should be able to choose from your local models in the model picker. For example, you might see models like:

- `llama3.1`
- `mistral`
- `gemma`
- `phi`

Your exact list depends on what you have downloaded with Ollama.

If you do not see any models, make sure Ollama is running and that you have downloaded at least one model.

For example:

```bash
ollama pull llama3.1:8b
```

Then try refreshing Open WebUI.

## Step 9: Try a Local Chat

Start a new chat and choose one of your Ollama models.

Try a simple prompt:

```text
Give me three practical ways I could use Open WebUI locally on my Mac.
```

This is where the setup starts to feel real. You are using a browser-based AI interface, but the model can be running locally on your own Mac.

That gives you a private place to experiment with:

- Writing
- Research
- Code help
- Learning notes
- Local file workflows
- Private document chat
- Prompt testing

Open WebUI can grow into much more than a simple chat screen. It can become a local AI control center.

## Step 10: Connect Another Device on Your Network

Because Open WebUI runs as a local server, other devices on the same network may be able to connect to it.

For example, if Open WebUI is running on your MacBook Pro, you can connect from your iPhone or iPad using your Mac’s local IP address.

On a Mac, a quick way to find your local IP address is:

1.  Hold the Option key.
2.  Click the Wi-Fi icon in the macOS menu bar.
3.  Look for your IP address.

It will usually look something like this:

```text
10.0.0.176
```

From another device on the same Wi-Fi network, open a browser and enter:

```text
http://YOUR-MAC-IP:8080
```

For example:

```text
http://10.0.0.176:8080
```

If it loads, you are now accessing your Mac’s local Open WebUI server from another device.

That is a big deal. Your Mac is doing the AI work, but your phone or tablet can become the interface.

## Step 11: Stop Open WebUI

When you are done using Open WebUI, go back to the Terminal window where it is running.

Press:

```text
Control + C
```

That stops the server.

If you refresh the browser, Open WebUI will no longer load. That is expected. To start it again later, open Terminal and run:

```bash
start-webui
```

##

Commands Reference

Here is the complete command sequence from the tutorial.

Create the folder:

```bash
mkdir ~/open-webui-app
cd ~/open-webui-app
```

Create the virtual environment:

```bash
python3 -m venv venv
```

Activate it:

```bash
source venv/bin/activate
```

Install Open WebUI:

```bash
pip install open-webui
```

Deactivate the virtual environment:

```bash
deactivate
```

Create the shortcut:

```bash
echo "alias start-webui='~/open-webui-app/venv/bin/open-webui serve'" >> ~/.zshrc
source ~/.zshrc
```

Launch Open WebUI:

```bash
start-webui
```

Open it in your browser:

```text
http://localhost:8080
```

Stop the server:

```text
Control + C
```

##

Troubleshooting

| Problem | What It Usually Means | What To Try |
|----|----|----|
| `localhost:8080` does not load | Open WebUI is not running | Go back to Terminal and run `start-webui` |
| Terminal says `command not found: start-webui` | The alias did not load | Run `source ~/.zshrc` or open a new Terminal window |
| You do not see Ollama models | Ollama is not running or no models are installed | Start Ollama and pull a model with `ollama pull llama3.1:8b` |
| Your phone cannot connect | Wrong IP address, different Wi-Fi, or firewall/network issue | Confirm both devices are on the same network and use the Mac’s local IP |
| You closed Terminal and Open WebUI stopped | The server was running inside that Terminal session | Restart it with `start-webui` |

## What This Unlocks Next

Once Open WebUI is running locally, you can start exploring more advanced local AI workflows:

- Chat with local documents
- Build a private RAG workflow
- Test different Ollama models
- Use Open WebUI as a local interface for writing and coding help
- Connect devices on your network to the same AI workspace
- Experiment with local-first AI before adding cloud APIs

This is why I like thinking about Open WebUI as infrastructure, not just another chat interface.

The first install gets the server running. The real value comes from what you connect to it next.

##

Final Thoughts

If you are learning AI tools, setting up Open WebUI locally is a great milestone. It gives you a private place to experiment, a clean way to use local models, and a foundation for more advanced workflows later.

You do not need to understand every part of local AI infrastructure on day one. Start with the basics:

1.  Install Open WebUI.
2.  Connect it to Ollama.
3.  Run it locally.
4.  Try it from another device.
5.  Build from there.

That is enough to start turning your Mac into a useful local AI workspace.

##

Links

- <a href="https://openwebui.com/" class="external-link" target="_blank" rel="noopener nofollow" data-tooltip-position="top" aria-label="https://openwebui.com">Open WebUI</a>
- <a href="https://github.com/open-webui/open-webui" class="external-link" target="_blank" rel="noopener nofollow" data-tooltip-position="top" aria-label="https://github.com/open-webui/open-webui">Open WebUI GitHub</a>
- <a href="https://ollama.ai/" class="external-link" target="_blank" rel="noopener nofollow" data-tooltip-position="top" aria-label="https://ollama.ai">Ollama</a>

**Questions, Comments, Feedback?**
<hello@mikemurphy.co>

**My Gear List:**
<https://mikemurphy.co/resources>

**My Amazon Store:**
<https://www.amazon.com/shop/mikemurphyco>

**My YouTube Channel:**
[https://youtube.com/mikemurphyco](https://mikemurphy.co/youtube)
