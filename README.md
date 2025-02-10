# MeucciDiscordBOT

MeucciDiscordBOT is a Discord bot designed to manage the ITTS Meucci school server. It uses **Discord.js** and an **SQLite** database to handle roles and other functionalities.

## Features

- Automatic role assignment and removal based on a list stored in the SQLite database
- **Express** integration for API endpoints
- Modular command handler system
- Configurable and easy to extend

## Requirements

- [Google Authentication Panel setup](https://developers.google.com/identity/protocols/oauth2)

- Node.js 18+

- A Discord bot token

- An SQLite database

## Installation

```bash
git clone https://github.com/Lieno2/MeucciDiscordBOT.git
cd MeucciDiscordBOT
npm install
```

## Configuration

1. Create a `.env` file in the main directory and add the following variables:

```env
discordSecret= 'token'
discordAuthSecret= 'discord secret'
jwtSecret= 'your jwt secret'
```

2. Ensure the SQLite database is properly set up.

You can find all the info you need for the token and secret [here](https://discord.com/developers/applications)

## Starting the Bot

```bash
node .
```

## Project Structure

```
MeucciDiscordBOT/
├── commands/      # Bot commands
├── events/        # Discord events
├── database/      # SQLite database configuration
├── index.js       # Main file
├── config.json    # Bot configuration
├── .env           # Environment variables
└── README.md      # Documentation
```

## Contributing

If you want to contribute to the project:

1. Fork the repository
2. Create a new branch (`git checkout -b feature-new`)
3. Add your changes and commit (`git commit -m "Added new feature"`)
4. Push your changes (`git push origin feature-new`)
5. Open a Pull Request

Go [here](https://github.com/Lieno2/MeucciDiscordBOT/blob/main/CONTRIBUTING.md) for more info!

## License

This project is distributed under the GNU General Public License (GPL). See the `LICENSE` file for more details.

---

For any questions or issues, open an issue on [GitHub](https://github.com/Lieno2/MeucciDiscordBOT/issues).

