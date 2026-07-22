# Directus → Astro Setup Guide (plain-language walkthrough)

This is the one-time setup that connects your Directus CMS to your Astro website,
so that publishing a Field Note or Resource in Directus automatically updates the
live site.

**The big picture, in one paragraph:** Your Directus lives on your VPS and is only
reachable through Tailscale (your private network). Your website is built by a
robot on GitHub (called "GitHub Actions"). To let that robot read your Directus
content, we (1) give the robot a temporary pass onto your Tailscale network, (2)
give it a read-only password for Directus, and (3) tell Directus to poke the robot
whenever you publish something. That's the whole thing. The steps below set up
those three connections.

**You do NOT need to understand the code.** Just follow the clicks. Do the steps
in order — later ones need earlier ones. Check each box as you go.

**Don't have time for all of it?** The site already works right now using sample
content (built from committed snapshots). Nothing below is urgent — it's what turns
on the *live* Directus connection. Do it when you're ready.

---

## Step 1 — Fix two small things in Directus

Open your Directus admin, go to **Settings → Data Model → Field_Notes**.

- [ ] **Add an `excerpt` field.** Click "Create Field", choose **Input** → then set
  the interface to **Textarea**. Name it `excerpt`. Leave it optional. This is the
  1–2 sentence summary shown under each note and used for SEO. (If you forget to
  fill it in for a note, the site just uses the first line of the note body — so
  this won't break anything, it just gives you control.)

- [ ] **Make `slug` required and unique.** Click the existing `slug` field →
  in its settings, turn ON **Required**, and under the "Schema" tab turn ON
  **Unique**. The slug is the web address of the note (e.g. `/field-notes/my-slug/`),
  so two notes can't share one, and every note needs one.

That's all for the data model. (The main Resources page shows *all* your published
resources for now, so there's nothing to configure about shelves yet.)

---

## Step 2 — Give Directus a "read-only" login for the robot

The build robot needs to log into Directus to read your content — but only to
**read**, never change anything. So we make a limited role and a token (think of a
token as a long password).

- [ ] In Directus: **Settings → Access Policies → Create Policy.** Name it something
  like `Astro Read-Only`.
- [ ] Give that policy **Read** permission (and nothing else) on these collections:
  `Field_Notes`, `Resources`, `resource_categories`, `shelves`, `tags`, the tag
  junction tables (`Field_Notes_tags`, `resources_tags`), and `directus_files`
  (that last one is so logos can be read).
- [ ] Create a **user** assigned to that policy (e.g. `astro-bot`), open that user,
  scroll to **Token**, click to generate a **Static Access Token**, and **copy it
  somewhere safe** — you'll paste it into GitHub in Step 4. This is your
  `DIRECTUS_TOKEN`.
- [ ] Also write down your Directus web address on Tailscale — it looks like
  `http://YOUR-VPS-NAME.YOUR-TAILNET.ts.net:8055`. This is your `DIRECTUS_URL`.
  (If you're not sure of the exact name, you can find it in the Tailscale admin
  console under "Machines" — it's the VPS's name.)

---

## Step 3 — Give the robot a temporary pass onto Tailscale

The robot needs to get onto your private Tailscale network to reach Directus. We
create an "OAuth client" (a set of credentials the robot uses to join as a
temporary, throwaway device each build).

- [ ] Go to the **Tailscale admin console** → **Settings → OAuth clients** →
  **Generate OAuth client**.
- [ ] Give it the **`devices` → write** permission (a checkbox), and set its tag to
  **`tag:ci`** (you may need to create that tag — see next bullet). Generate it,
  then **copy the Client ID and the Secret** — you'll paste both into GitHub in
  Step 4.
- [ ] Now tell Tailscale what `tag:ci` is allowed to reach. Go to **Access Controls**
  (the ACL policy editor — it's a text/JSON editor). Add these two pieces so the
  robot can ONLY reach Directus and nothing else on your network:
  ```jsonc
  // add "tag:ci" to tagOwners (near the top):
  "tagOwners": {
    "tag:ci": ["autogroup:admin"]
  },

  // add this rule to the "acls" list:
  { "action": "accept", "src": ["tag:ci"], "dst": ["YOUR-VPS-NAME:8055"] }
  ```
  Replace `YOUR-VPS-NAME` with your VPS's Tailscale name. Save the policy.

> **What this bought you:** the build robot can reach Directus on port 8055 and
> literally nothing else on your tailnet. If the credentials ever leaked, that's
> the entire blast radius.

---

## Step 4 — Store all the passwords in GitHub ("secrets")

A GitHub "secret" is a password locker. The build robot reads from this locker so
we never write passwords into the code. You'll add six.

- [ ] Go to your repo on GitHub: **github.com/mikemurphyco/mikemurphy-ai**
- [ ] Click **Settings** (top menu of the repo) → in the left sidebar,
  **Secrets and variables** → **Actions**.
- [ ] Click **New repository secret** once for each of these (Name on the left,
  paste the Value):

  | Name | What to paste |
  |------|---------------|
  | `TS_OAUTH_CLIENT_ID` | Tailscale OAuth **Client ID** (Step 3) |
  | `TS_OAUTH_SECRET` | Tailscale OAuth **Secret** (Step 3) |
  | `DIRECTUS_URL` | e.g. `http://YOUR-VPS-NAME.YOUR-TAILNET.ts.net:8055` (Step 2) |
  | `DIRECTUS_TOKEN` | the read-only static token (Step 2) |
  | `CLOUDFLARE_API_TOKEN` | see next bullet |
  | `CLOUDFLARE_ACCOUNT_ID` | see next bullet |

- [ ] For the two Cloudflare ones: in the **Cloudflare dashboard**, your Account ID
  is on the right side of the Workers overview page. For the API token, go to
  **My Profile → API Tokens → Create Token → "Edit Cloudflare Workers"** template,
  create it, and copy the token. (This lets the robot publish your site.)

---

## Step 5 — Turn off Cloudflare's old auto-deploy

Right now Cloudflare rebuilds your site itself when you push to GitHub. But
Cloudflare's builder **can't reach your Tailscale-only Directus**, so from now on
the GitHub robot does the building and deploying. We need to switch Cloudflare's
own builder off so they don't both deploy and fight each other.

- [ ] In the **Cloudflare dashboard**, open your **mikemurphy-ai** Worker →
  **Settings** → find the **Build** / **Git integration** section →
  **disconnect** the GitHub connection.
- [ ] Test that the new path works: on GitHub, go to the **Actions** tab → click
  **Build & Deploy** → **Run workflow**. Watch it run. If it goes green and your
  site updates, the whole pipeline works. 🎉

---

## Step 6 — Make "Publish" in Directus trigger a rebuild

Last piece: so you don't have to touch GitHub at all. This tells Directus to poke
GitHub whenever you publish, which kicks off a rebuild automatically.

- [ ] In Directus: **Settings → Flows → Create Flow.**
- [ ] Trigger: **Event Hook**, **non-blocking**, on **items.create** and
  **items.update**, for collections **Field_Notes** and **Resources**.
- [ ] Add one operation: **Webhook / Request URL**, configured as:
  - Method: **POST**
  - URL: `https://api.github.com/repos/mikemurphyco/mikemurphy-ai/dispatches`
  - Headers:
    - `Authorization`: `Bearer YOUR_GITHUB_TOKEN`
    - `Accept`: `application/vnd.github+json`
    - `User-Agent`: `directus-flow`
  - Body: `{ "event_type": "directus-publish" }`
- [ ] For `YOUR_GITHUB_TOKEN`: on GitHub, **Settings (your profile, not the repo) →
  Developer settings → Personal access tokens → Fine-grained tokens → Generate**.
  Scope it to **only this repo**, with **Contents: read and write** permission.
  Copy it into the header above.
- [ ] (Optional, nice-to-have) In the Flow, add a condition so it only fires when
  `status` = `published`, to avoid rebuilding on every draft save.

---

## After all six steps — here's your new workflow

1. Write a Field Note or Resource in Directus. Set its status to **Published**.
2. That's it. Directus pokes GitHub, the robot rebuilds and deploys, and the change
   is live on mikemurphy.ai in a few minutes.

**If Directus is ever down or unreachable when a build runs,** the site still
deploys using the last-known-good content (a saved "snapshot"), and the build log
shows a warning so you know. Your site never breaks because Directus hiccuped.

---

## Working on the site locally (for reference)

- Running `npm run build` on your Mac **without** any Directus credentials uses the
  saved snapshots in `src/content/_snapshots/`. This is normal and how the site
  builds when it can't reach Directus.
- To pull live Directus content while working locally, get your Mac onto Tailscale
  and create a file named `.env` in the project with:
  ```
  DIRECTUS_URL=http://YOUR-VPS-NAME.YOUR-TAILNET.ts.net:8055
  DIRECTUS_TOKEN=your-read-only-token
  ```
  (`.env` is already ignored by git, so these stay off GitHub.)

---

**Feeling stuck on any single step?** Each one is self-contained — you can do Steps
1 and 2 (the Directus parts) today and come back for the rest. Ask me about any
individual step and I'll walk through just that one in more detail.
