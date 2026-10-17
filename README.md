<div align="center">

# ✦ Nexus-Sync CLI

**Develop locally, run in the cloud.**

A Full-Stack-as-a-Service CLI that mirrors your local dev environment to a live cloud container — your "Shadow Environment" — in real time.

[![npm version](https://img.shields.io/npm/v/nexus-sync-cli?style=flat-square&logo=npm&logoColor=white&color=cb3837)](https://www.npmjs.com/package/nexus-sync-cli)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)

</div>

> **Prototype notice:** Nexus-Sync is a working simulation of the developer experience. Every command prints realistic output, but nothing connects to real cloud infrastructure, so it is safe to try anywhere. The only file it ever writes is `.nexus/config.json`, in the folder you run it from.

---

## ⚡ Get started in 60 seconds

You need [Node.js](https://nodejs.org/) 18 or newer. Check with `node --version`.

### 1. Install

```bash
npm install -g nexus-sync-cli
```

Check that it worked:

```bash
nexus-sync --version
```

> **Rather not install anything?** Put `npx nexus-sync-cli` wherever this guide says `nexus-sync`. For example: `npx nexus-sync-cli init`.
>
> Update later with `npm install -g nexus-sync-cli@latest`. Uninstall with `npm uninstall -g nexus-sync-cli`.

### 2. Open a project folder

Use any project that has a `src/` folder, or make a throwaway one to play in:

```bash
mkdir nexus-demo
cd nexus-demo
mkdir src
```

### 3. Set it up

```bash
nexus-sync init
```

Answer three questions. Use ↑ / ↓ to choose and Enter to confirm, or just press Enter three times to accept the defaults.

```
? Project name: my-app
? Framework: Next.js
? Preferred region: us-east-1

  ✔ Project initialized!
  Config written to .nexus/config.json
```

The project name can only use lowercase letters, numbers and hyphens.

### 4. Start syncing

```bash
nexus-sync start
```

Leave this terminal open. Now create or edit any file inside `src/` and save it. Every save shows up as a line:

```
✦ Nexus-Sync

  Watching: src/, app/, pages/, api/
  ✦ Shadow live at: https://my-app.nexus-sync.example

[12:04:31] ✔ Added   src/index.js  →  shadow (31ms)
[12:04:45] ✔ Synced  src/index.js  →  shadow (38ms)
```

Press **Ctrl+C** to stop.

> **Nothing showing up when you save?** `start` only watches `src/`, `app/`, `pages/` and `api/`, and the folder must already exist when you run `start`. Details are in the Troubleshooting section below.

### 5. Try the other commands

Open a **second terminal** in the same folder (or press Ctrl+C to stop `start`) and run any of these:

```bash
nexus-sync status                        # sync state, uptime, latency, live URL
nexus-sync db sandbox                    # create an anonymized database sandbox
nexus-sync collab invite me@example.com  # invite a teammate to your live environment
nexus-sync test                          # run the test suite against the shadow environment
nexus-sync deploy                        # ship to production
```

That is everything you need to get going. The rest of this page is reference.

---

## 📖 Commands

| Command | What it does |
|---------|--------------|
| `nexus-sync init` | Asks three questions and creates `.nexus/config.json`. Run this first. |
| `nexus-sync start` | Watches your project folders and prints a line for every file you save, add or delete. Press Ctrl+C to stop. |
| `nexus-sync stop` | Prints a "stopped" message (simulated). To end a running `start`, press Ctrl+C in its terminal. |
| `nexus-sync status` | Shows the Shadow Environment's sync state, uptime, latency and live URL. |
| `nexus-sync db sandbox` | Creates an isolated database sandbox with anonymized data. |
| `nexus-sync collab invite <email>` | Prints a shareable invite link. No email is actually sent. |
| `nexus-sync test` | Runs a sample test suite. It always reports `4 passed, 1 failed`. |
| `nexus-sync deploy` | Runs a sample production deploy (about 2–3 seconds). |
| `nexus-sync --help` | Lists every command. Add `--help` after any command for details. |

`start`, `status`, `db sandbox`, `collab invite` and `deploy` need the `.nexus/config.json` file that `init` creates. They look for it in the folder you are currently in, so run them from your project folder.

<details>
<summary><b>See sample output for each command</b></summary>

&nbsp;

**`nexus-sync status`**

```
✦ Nexus-Sync

  Shadow Environment
  ─────────────────────────────────
  Sync state  ● active
  Last synced src/app/page.tsx (2s ago)
  Uptime      00:14:32
  Live URL    https://my-app.nexus-sync.example
  Latency     ⚡ 34ms
```

**`nexus-sync db sandbox`**

```
✦ Nexus-Sync

  → Cloning production schema...   ████████████████  100%
  → Anonymizing PII fields...      ████████████████  100%

  ✔ Sandbox ready at: postgres://sandbox.nexus-sync.example:5432/my-app_sandbox
```

**`nexus-sync collab invite teammate@company.com`**

```
✦ Nexus-Sync

  ✔ Invite sent to teammate@company.com
  They can join at: https://my-app.nexus-sync.example?collab=a1b2c3d4e5f6
```

**`nexus-sync test`**

```
✦ Nexus-Sync

  ✔ API route /api/users returns 200           (12ms)
  ✔ DB connection healthy                      (8ms)
  ✔ Auth middleware blocks unauthenticated     (5ms)
  ✔ Edge function /api/geo responds correctly  (19ms)
  ✗ Email service timeout                      (3001ms)

  ─────────────────────────────────
  4 passed, 1 failed
```

**`nexus-sync deploy`**

```
✦ Nexus-Sync

  ✔ ⚡ Building project...
  ✔ ⚡ Running pre-deploy tests...
  ✔ ⚡ Pushing to Shadow Environment...
  ✔ ⚡ Warming edge nodes...

  ✦ Production deploy complete: https://my-app.nexus-sync.example
  ✦ Deploy time: 2.4s
```

</details>

---

## 🩺 Troubleshooting

**`nexus-sync: command not found` (or `'nexus-sync' is not recognized`)**
Close the terminal and open a new one. If it still fails, npm's global folder is not on your `PATH`. Run `npm config get prefix` to find it (add that folder on Windows, or its `bin` subfolder on macOS/Linux). Or skip the problem entirely and use `npx nexus-sync-cli` instead of `nexus-sync`.

**`EACCES: permission denied` while installing (macOS/Linux)**
Do not use `sudo`. Use `npx nexus-sync-cli`, or follow npm's guide to [fix global install permissions](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally).

**PowerShell says "running scripts is disabled on this system" (Windows)**
Run this once, then try again: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`. Or use Command Prompt instead of PowerShell.

**`No config found. Run nexus-sync init first.`**
You are in a different folder from the one where you ran `init`. Commands look for `.nexus/config.json` in the current folder, so `cd` into your project, or run `nexus-sync init` there.

**`start` is running but nothing prints when I save a file**
`start` only watches the folders listed in `watchPaths` (default: `src/`, `app/`, `pages/`, `api/`). Files outside them, like a file in the project root, are ignored, and a folder has to exist *before* you run `start`: one created afterwards is not picked up. Create the folder, or change `watchPaths` in `.nexus/config.json` (for example `["lib/", "components/"]`), then stop `start` with Ctrl+C and run it again.

**I clicked the `nexus-sync.example` link and nothing loads**
Expected. The `*.nexus-sync.example` addresses are placeholders, and nothing is hosted there. (`.example` is a name the internet standards reserve for documentation, so nobody can register it.)

Still stuck? [Open an issue](https://github.com/Adityareal/nexus-sync-cli/issues) with the command you ran and what you saw.

---

## 🔧 Configuration

`nexus-sync init` writes `.nexus/config.json`, which controls how the CLI behaves:

```json
{
  "projectName": "my-app",
  "framework": "Next.js",
  "region": "us-east-1",
  "watchPaths": ["src/", "app/", "pages/", "api/"],
  "createdAt": "2026-05-30T12:00:00.000Z"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `projectName` | `string` | Your project's slug (used in URLs) |
| `framework` | `string` | `Next.js` \| `Remix` \| `SvelteKit` \| `Other` |
| `region` | `string` | Cloud region: `us-east-1` \| `eu-west-1` \| `ap-south-1` |
| `watchPaths` | `string[]` | Folders that `start` watches for changes |
| `createdAt` | `string` | ISO timestamp of initialization |

You can edit the file by hand, or re-run `nexus-sync init` (it asks before overwriting). Add `.nexus/` to your `.gitignore` if you do not want to commit it.

---

## 🚀 What is Nexus-Sync?

Nexus-Sync eliminates the gap between local development and production. When you save a file, it is instantly reflected in your **Shadow Environment**, a live cloud container that mirrors your full stack (frontend, backend, database, edge functions).

```
Local Machine                          Shadow Environment (Cloud)
┌───────────────────┐     real-time    ┌──────────────────────────┐
│  src/app/page.tsx │ ──── sync ────▶  │  https://my-app.nexus-   │
│  api/users.ts     │    (20-60ms)     │  sync.example            │
│  db/schema.sql    │                  │                          │
└───────────────────┘                  │  ✔ Live preview          │
                                       │  ✔ Shared with team      │
                                       │  ✔ Full-stack sandbox    │
                                       └──────────────────────────┘
```

### Why?

- **No more "works on my machine"**: your Shadow Environment IS the deployed version
- **Instant feedback**: every save is live in ~35ms
- **Team collaboration**: invite teammates to your live environment
- **Safe database testing**: spin up anonymized DB sandboxes in seconds
- **One-command deploy**: push to production when you are ready

### What is real and what is simulated

**Real:**

- Reading and writing `.nexus/config.json`
- `start` watching your local folders and reporting each change
- The command-line experience: prompts, spinners and progress bars

**Simulated:**

- Syncing to a Shadow Environment, and its live URLs, latency and uptime numbers
- Database sandboxes, collaborator invites, tests and deploys

The CLI makes no network requests and sends no data anywhere.

---

## 🧑‍💻 Development

Run it from source:

```bash
git clone https://github.com/Adityareal/nexus-sync-cli.git
cd nexus-sync-cli
npm install
node bin/nexus-sync.js --help
```

To get the `nexus-sync` command globally from your checkout, run `npm link`.

### Project structure

```
nexus-sync-cli/
├── bin/
│   └── nexus-sync.js           # CLI entry point
├── src/
│   ├── commands/
│   │   ├── init.js             # Interactive project setup
│   │   ├── start.js            # File watcher + sync
│   │   ├── stop.js             # Stop message
│   │   ├── status.js           # Status dashboard
│   │   ├── db.js               # Database sandbox
│   │   ├── collab.js           # Collaboration invites
│   │   ├── test.js             # Test runner
│   │   └── deploy.js           # Production deployment
│   └── utils/
│       ├── logger.js           # Shared chalk helpers
│       └── config.js           # .nexus/config.json I/O
├── package.json
├── LICENSE
└── README.md
```

### Tech stack

| Package | Purpose |
|---------|---------|
| [commander](https://www.npmjs.com/package/commander) | Command parsing and help generation |
| [chalk](https://www.npmjs.com/package/chalk) | Terminal colors and styling |
| [ora](https://www.npmjs.com/package/ora) | Elegant terminal spinners |
| [cli-progress](https://www.npmjs.com/package/cli-progress) | Progress bars |
| [chokidar](https://www.npmjs.com/package/chokidar) | Cross-platform file watching |
| [inquirer](https://www.npmjs.com/package/inquirer) | Interactive command-line prompts |

---

## 📄 License

MIT © [Adityareal](https://github.com/Adityareal)
