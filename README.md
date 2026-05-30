<div align="center">

# ✦ Nexus-Sync CLI

**Develop locally, run in the cloud.**

A Full-Stack-as-a-Service CLI that mirrors your local dev environment to a live cloud container — your "Shadow Environment" — in real time.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)](LICENSE)
[![npm](https://img.shields.io/badge/npm-nexus--sync--cli-cb3837?style=flat-square&logo=npm&logoColor=white)](https://www.npmjs.com/package/nexus-sync-cli)

</div>

---

## 🚀 What is Nexus-Sync?

Nexus-Sync eliminates the gap between local development and production. When you save a file, it's instantly reflected in your **Shadow Environment** — a live cloud container that mirrors your full stack (frontend, backend, database, edge functions).

```
Local Machine                          Shadow Environment (Cloud)
┌──────────────────┐     real-time     ┌──────────────────────────┐
│  src/app/page.tsx │ ──── sync ────▶  │  https://my-app.nexus-   │
│  api/users.ts     │    (20-60ms)     │  sync.dev                │
│  db/schema.sql    │                  │                          │
└──────────────────┘                   │  ✔ Live preview          │
                                       │  ✔ Shared with team      │
                                       │  ✔ Full-stack sandbox    │
                                       └──────────────────────────┘
```

### Why?

- **No more "works on my machine"** — your Shadow Environment IS the deployed version
- **Instant feedback** — every save is live in ~35ms
- **Team collaboration** — invite teammates to your live environment
- **Safe database testing** — spin up anonymized DB sandboxes in seconds
- **One-command deploy** — push to production when you're ready

---

## 📦 Installation

### Global install (recommended)

```bash
npm install -g nexus-sync-cli
```

Then use `nexus-sync` from any project directory.

### Local install

```bash
npm install nexus-sync-cli
npx nexus-sync --help
```

### From source

```bash
git clone https://github.com/Adityareal/nexus-sync-cli.git
cd nexus-sync-cli
npm install
node bin/nexus-sync.js --help
```

> **Requirements:** Node.js 18 or higher

---

## ⚡ Quick Start

### 1. Initialize your project

```bash
nexus-sync init
```

This walks you through an interactive setup:

```
✦ Nexus-Sync

? Project name: my-app
? Framework: Next.js
? Preferred region: us-east-1

  ✔ Project initialized!
  Config written to .nexus/config.json
```

A `.nexus/config.json` file is created with your preferences:

```json
{
  "projectName": "my-app",
  "framework": "Next.js",
  "region": "us-east-1",
  "watchPaths": ["src/", "app/", "pages/", "api/"],
  "createdAt": "2026-05-30T12:00:00.000Z"
}
```

### 2. Start syncing

```bash
nexus-sync start
```

```
✦ Nexus-Sync

  Watching: src/, app/, pages/, api/
  ✦ Shadow live at: https://my-app.nexus-sync.dev

[12:04:31] ✔ Synced  src/app/page.tsx  →  shadow (38ms)
[12:04:45] ✔ Synced  api/users.ts      →  shadow (24ms)
[12:05:02] ✔ Added   src/lib/utils.ts   →  shadow (31ms)
```

The watcher monitors your source files in real time. Press `Ctrl+C` to stop.

### 3. Check status

```bash
nexus-sync status
```

```
✦ Nexus-Sync

  Shadow Environment
  ─────────────────────────────────
  Sync state  ● active
  Last synced src/app/page.tsx (2s ago)
  Uptime      00:14:32
  Live URL    https://my-app.nexus-sync.dev
  Latency     ⚡ 34ms
```

---

## 📖 All Commands

| Command | Description |
|---------|-------------|
| `nexus-sync init` | Interactive project setup → creates `.nexus/config.json` |
| `nexus-sync start` | Start real-time file sync to your Shadow Environment |
| `nexus-sync stop` | Stop the file watcher gracefully |
| `nexus-sync status` | Show sync state, uptime, latency, and live URL |
| `nexus-sync db sandbox` | Create an isolated database sandbox with anonymized data |
| `nexus-sync collab invite <email>` | Invite a teammate to your live environment |
| `nexus-sync test` | Run the test suite against your Shadow Environment |
| `nexus-sync deploy` | Deploy to production |
| `nexus-sync --help` | Show all available commands |

---

### `nexus-sync db sandbox`

Spin up an isolated database sandbox cloned from production with PII automatically anonymized:

```
✦ Nexus-Sync

  → Cloning production schema...   ████████████████  100%
  → Anonymizing PII fields...      ████████████████  100%

  ✔ Sandbox ready at: postgres://sandbox.nexus-sync.dev:5432/my-app_sandbox
```

---

### `nexus-sync collab invite <email>`

Share your Shadow Environment with teammates:

```bash
nexus-sync collab invite teammate@company.com
```

```
✦ Nexus-Sync

  ✔ Invite sent to teammate@company.com
  They can join at: https://my-app.nexus-sync.dev?collab=a1b2c3d4e5f6
```

---

### `nexus-sync test`

Run your test suite against the Shadow Environment:

```
✦ Nexus-Sync

  ✔ API route /api/users returns 200           (12ms)
  ✔ DB connection healthy                      (8ms)
  ✔ Auth middleware blocks unauthenticated      (5ms)
  ✔ Edge function /api/geo responds correctly   (19ms)
  ✗ Email service timeout                       (3001ms)

  ─────────────────────────────────
  4 passed, 1 failed
```

---

### `nexus-sync deploy`

Ship to production with a single command:

```
✦ Nexus-Sync

  ✔ ⚡ Building project...
  ✔ ⚡ Running pre-deploy tests...
  ✔ ⚡ Pushing to Shadow Environment...
  ✔ ⚡ Warming edge nodes...

  ✦ Production deploy complete: https://my-app.nexus-sync.dev
  ✦ Deploy time: 2.4s
```

---

## 🗂️ Project Structure

```
nexus-sync-cli/
├── bin/
│   └── nexus-sync.js           # CLI entry point
├── src/
│   ├── commands/
│   │   ├── init.js             # Interactive project setup
│   │   ├── start.js            # File watcher + sync
│   │   ├── stop.js             # Graceful shutdown
│   │   ├── status.js           # Status dashboard
│   │   ├── db.js               # Database sandbox
│   │   ├── collab.js           # Collaboration invites
│   │   ├── test.js             # Test runner
│   │   └── deploy.js           # Production deployment
│   └── utils/
│       ├── logger.js           # Shared chalk helpers
│       └── config.js           # .nexus/config.json I/O
├── package.json
├── README.md
└── .gitignore
```

---

## 🛠️ Tech Stack

| Package | Purpose |
|---------|---------|
| [commander](https://www.npmjs.com/package/commander) | Command parsing and help generation |
| [chalk](https://www.npmjs.com/package/chalk) | Terminal colors and styling |
| [ora](https://www.npmjs.com/package/ora) | Elegant terminal spinners |
| [cli-progress](https://www.npmjs.com/package/cli-progress) | Progress bars |
| [chokidar](https://www.npmjs.com/package/chokidar) | Cross-platform file watching |
| [inquirer](https://www.npmjs.com/package/inquirer) | Interactive command-line prompts |

---

## 🔧 Configuration

The `.nexus/config.json` file controls the CLI behavior:

| Field | Type | Description |
|-------|------|-------------|
| `projectName` | `string` | Your project's slug (used in URLs) |
| `framework` | `string` | `Next.js` \| `Remix` \| `SvelteKit` \| `Other` |
| `region` | `string` | Cloud region: `us-east-1` \| `eu-west-1` \| `ap-south-1` |
| `watchPaths` | `string[]` | Directories to watch for file changes |
| `createdAt` | `string` | ISO timestamp of initialization |

You can manually edit this file or re-run `nexus-sync init`.

---

## 📝 Note

This CLI is currently a **simulation/prototype**. All sync, deploy, and database operations produce realistic terminal output but don't connect to actual cloud infrastructure. It's designed to demonstrate the developer experience of a full-stack shadow environment platform.

---

## 📄 License

MIT © [Adityareal](https://github.com/Adityareal)
