---
title: How To Deploy an Astro Website to Cloudflare Workers From GitHub
description: Push a local Astro project to GitHub, deploy it to Cloudflare Workers with Wrangler and CI/CD, then connect a custom domain to go live.
pubDate: 2026-09-01
draft: false
type: tutorial
slug: astrocloudflare
permalink: /astrocloudflare/
canonicalUrl: https://mikemurphy.ai/tutorials/astrocloudflare/
contentEra: ai
visibility: public
author: Mike Murphy
featuredImage: /assets/media/2026/09/ASTRO_CLOUDFLARE.jpg
featuredImageSource: ""
categories:
  - Tutorials
  - Astro
  - Cloudflare
tags: []
topics:
  - astro
  - cloudflare
  - github
  - wrangler
  - ci-cd
  - custom-domain
youtube:
  - https://youtu.be/gBd3XsYidpk
search:
  include: true
  boost: 1
---

Building an Astro site locally is only half the job. This tutorial picks up right where the last one left off: pushing that local project to GitHub, deploying it to Cloudflare Workers, and connecting a real domain name so it is live on the internet, not just running on `localhost`.

I am using my own site, Murphy Concierge, as the example: a local freelance tech support business I rebuilt on Astro after moving it off WordPress.

## What You Will Build

By the end of this tutorial, you will have:

- A GitHub repository that mirrors your local Astro project
- A Cloudflare Worker wired to that repo through CI/CD
- A live Astro site with a working Cloudflare URL
- A custom domain pointed at the new site
- An automatic pipeline that rebuilds and redeploys the site every time you push a change to GitHub

## Why This Matters

A local dev server is great for building, but it only exists on your computer. GitHub gives your project a real backup and a single source of truth, and Cloudflare Workers gives it a fast, free place to actually live on the internet.

The part that makes this worth setting up properly is the CI/CD connection between the two. Once GitHub and Cloudflare are linked, you stop thinking about "deploying" as a separate step. You just edit the site locally, push to GitHub, and Cloudflare rebuilds and republishes it automatically in the background.

## Before You Start

You need:

- **An Astro project** already built and running locally. I cover that from scratch in [How To Build Your First Website With Astro](https://youtu.be/6twAecA1oJ0)
- **A code editor**. I use VS Code
- **A free GitHub account**
- **A free Cloudflare account**
- **A domain name** you want to point at the finished site, either already registered on Cloudflare or with another registrar

An AI coding assistant in your editor (I use Claude Code, Codex works the same way) is optional but makes the GitHub steps a lot faster, since it can run all the git commands for you.

## Step 1: Install Wrangler and Add a Config File

Wrangler is Cloudflare's command line tool, and it is what actually knows how to build and ship your site to a Worker. Install it as a dev dependency from your project's terminal in VS Code:

```bash
npm install --save-dev wrangler
```

Next, add a config file so Cloudflare knows where your build output lives and what to name the Worker. Right click your project folder next to `package.json`, create a new file called `wrangler.jsonc`, and paste in:

```jsonc
{
  "name": "murphy-concierge",
  "compatibility_date": "2026-08-30",
  "assets": {
    "directory": "./dist"
  }
}
```

Change `name` to whatever you want your Worker to be called, and set `compatibility_date` to today's date. Save the file (**File → Save All**) before moving on. The full, current version of this config always lives on the [Astro Cloudflare deployment guide](https://docs.astro.build/en/guides/deploy/cloudflare/), worth a quick check since Cloudflare's setup steps do shift over time.

## Step 2: Push the Project to a New GitHub Repository

Create the repo first. Sign into GitHub, go to **Repositories → New repository**, give it a name and a short description, leave the rest of the settings as is, and click **Create repository**. Copy the repository URL it gives you.

There are several ways to push a local folder to that repo. The fastest is to hand it to an AI coding assistant: open the Claude Code or Codex extension in VS Code and say something like "please commit and push this local directory to a new GitHub repo," then paste the URL when it asks. It handles `git init`, the remote, the commit, and the push in one shot.

If you would rather do it by hand, the same result comes from:

```bash
git init
git remote add origin <your-repo-url>
git add .
git commit -m "Initial commit"
git push -u origin main
```

Either way, refresh the repository page on GitHub afterward and you should see your project files sitting there.

## Step 3: Keep Local and GitHub in Sync

Once a project is connected to GitHub, VS Code tracks the difference between your local folder and the repo. Every local change needs to be pushed up, and anything changed on GitHub needs to be pulled back down, so the two stay mirrored.

To push a change: click the **Source Control** icon in VS Code, click the **+** next to a changed file to stage it, type a short commit message describing the change, then use the dropdown next to the commit button to choose **Commit & Push**. In my case I had an AI assistant generate a `README.md` for the project, staged it, committed it with the message "add README file," and pushed. That is the same loop you will use for every future change.

## Step 4: Deploy the Repo on Cloudflare Workers

In the Cloudflare dashboard, open the left sidebar and under **Build**, click **Compute (Workers & Pages)**, then **Create application**. Choose **Continue with GitHub**, connect or select your GitHub account, and pick the repository you just pushed. Click **Next**.

Fill in the build settings:

- **Build command**: `npx astro build`
- **Deploy command**: `npx wrangler deploy` (Cloudflare usually fills this one in for you)

If your Astro project is not sitting in the root of the repo, for example if it lives inside a subfolder like `astro/murphy-concierge`, open **Advanced settings** and set the **Path** field to that subfolder. Cloudflare needs the exact path to wherever your `package.json` file lives, since that is what tells it where to run the build.

Click **Deploy**. Cloudflare will build the project, and a green checkmark with a "Success: Build completed" message means it is live. Cloudflare gives you a working URL right away, something like `murphy-concierge.<yourname>.workers.dev`.

## Step 5: Connect a Custom Domain

The auto-generated Workers URL works, but you will want your real domain on it. From your project in **Workers & Pages**, click **Domains** at the top, then **+ Add domain**.

If your domain already lives on Cloudflare, just type it in and click **Add domain**. If it is registered elsewhere (GoDaddy, Namecheap, and so on), search for it from the same screen and follow Cloudflare's prompts to connect it.

If the domain lives on Cloudflare, double check its DNS records afterward: the CNAME record pointing at your Worker should have the orange cloud icon turned on (proxied). That is what routes traffic for your domain through Cloudflare instead of straight to the origin. Once it is set, visit your domain in a browser to confirm the live site loads.

## Step 6: Confirm Auto-Deploy Works

This is the payoff for wiring up CI/CD. Make a small change locally, for example editing a line of text in `index.astro`, save the file, then stage, commit, and push it exactly as in Step 3.

Because the GitHub repo is linked to a Cloudflare Worker, that push automatically kicks off a new build. Go to **Workers & Pages → your project → Deployments** and you will see a build in progress within seconds of pushing. Once it finishes (usually well under a minute for a small static site), refresh your live domain and the change is there. No manual deploy step required, ever again.

## Troubleshooting

| Problem | Likely Cause | Fix |
| --- | --- | --- |
| Build fails right away, can't find `package.json` | The project isn't in the repo root and the Path setting is missing | In **Advanced settings**, set **Path** to the subfolder that contains `package.json` |
| Deploy succeeds but the live site shows old content | Browser or CDN caching | Hard refresh the page, and confirm the latest build shows in the **Deployments** tab |
| Domain is added but the site won't load | The DNS record isn't proxied through Cloudflare | In DNS settings, toggle the record's cloud icon to orange (proxied) |
| AI assistant can't push to GitHub | The repo doesn't exist yet, or the wrong URL was pasted | Create the repository on GitHub first, then retry with the correct URL |
| A local push never triggers a new build | Cloudflare Worker isn't actually linked to that GitHub repo, or you pushed to a different branch | Confirm the Worker's CI/CD source repo and branch under its Cloudflare settings |

## Commands Reference

```bash
npm install --save-dev wrangler
npx astro build
npx wrangler deploy
```

```bash
git init
git remote add origin <your-repo-url>
git add .
git commit -m "Initial commit"
git push -u origin main
```

## What This Unlocks Next

With GitHub and Cloudflare wired together, shipping changes is just: edit, save, commit, push. If your domain needs a www to root redirect once it is live, [How To Redirect www to Your Root Domain in Cloudflare](/tutorials/canonicalurl/) walks through setting that up as a 301 so you are not splitting SEO signals across two versions of your site.

And if you are moving an existing WordPress site through this same process, start with [How To Migrate WordPress to Astro Without Losing SEO](/tutorials/wordpresstoastro/), which covers the domain cutover in more depth before you get to this deploy step.

## Links

- [Astro: Deploy Your Site to Cloudflare](https://docs.astro.build/en/guides/deploy/cloudflare/)
- [Astro.build](https://astro.build)
- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
- [How To Build Your First Website With Astro](/tutorials/astro/)
- [How To Migrate WordPress to Astro Without Losing SEO](/tutorials/wordpresstoastro/)
- [How To Redirect www to Your Root Domain in Cloudflare](/tutorials/canonicalurl/)
