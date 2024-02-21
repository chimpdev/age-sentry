![Header](https://socialify.git.ci/chimpdev/age-sentry/image?description=1&font=Jost&issues=1&language=1&name=1&owner=1&pattern=Circuit%20Board&stargazers=1&theme=Light)

## 🔗 Invite

Go to [this link](https://discord.com/api/oauth2/authorize?client_id=1129072741350379622&permissions=1024&scope=bot%20applications.commands) and add the bot to your server.

## 🖥️ Hosting

~~We are hosting Age Sentry bot on our own servers. Bot will be online 24/7~~ If you want to host the bot on your own server, you can follow the steps below.

### Prerequisites

- [Node.js](https://nodejs.org/en) (version 18 recommended)
- [Git](https://git-scm.com)
- [pnpm](https://pnpm.io) (optional)

### Installation

1. Clone the repository
```bash
git clone https://github.com/chimpdev/age-sentry.git
```

2. Go to the project directory
```bash
cd age-sentry
```

3. Install dependencies (you can use `npm` or `pnpm`)
```bash
pnpm i
```

5. Create a new application on [Discord Developer Portal](https://discord.com/developers/applications) and copy the bot token. Also don't forget to enable `MESSAGE CONTENT INTENT` in the bot settings.

6. Edit `.env` file (see below)

7~~. Start the bot (you can use `npm` or `pnpm`)
```bash
pnpm start
```

## `.env` file

This bot uses `.env` file to store sensitive data. You can create `.env` file in the root directory of the project and add the following variables to it.

| Variable | Description | Required
| - | - | -
| `DISCORD_TOKEN` | Discord bot token | ✅