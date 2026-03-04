# 🚀 SESD CLI Tool

A CLI tool built with **Node.js + TypeScript** using OOP, 10+ commands, and 5 free API integrations.

---

## ⚙️ Setup

```bash
npm install
npm run build
npm link
```

---

## 📦 Commands

| Command | Description |
|---|---|
| `mycli greet <name>` | Greet someone by name |
| `mycli init-ts <folder>` | Initialize a TypeScript project |
| `mycli github user <username>` | GitHub user profile |
| `mycli github repos <username>` | List public repos |
| `mycli weather <city>` | Current weather |
| `mycli quote random` | Random inspirational quote |
| `mycli quote today` | Quote of the day |
| `mycli fileinfo <file>` | File stats |
| `mycli calc "<expr>"` | Evaluate math expression |
| `mycli passgen` | Generate secure password |
| `mycli joke` | Random joke |
| `mycli sysinfo` | System information |
| `mycli timer <seconds>` | Countdown timer |
| `mycli translate <text>` | Translate between languages |

---

## 💡 Example Usage

```bash
mycli greet Kshitij --loud       # HELLO, KSHITIJ!
mycli weather London
mycli github user torvalds
mycli calc "2^10"                # 1024
mycli passgen --length 32
mycli translate "Hello" --to hi  # नमस्ते
mycli quote random
mycli timer 30 --message "Done!"
```

---

## 🌐 APIs Used

| API | Command | Key? |
|---|---|---|
| GitHub REST | `github` | No |
| Open-Meteo | `weather` | No |
| ZenQuotes | `quote` | No |
| JokeAPI v2 | `joke` | No |
| MyMemory | `translate` | No |