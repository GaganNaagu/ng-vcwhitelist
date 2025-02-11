---

# ng-vcwhitelist

**ng-vcwhitelist** is a Discord bot that automates the whitelisting process for a FiveM server. It verifies players based on their Discord roles and voice channel presence before granting them access.

## Features

- Automatically whitelist players in FiveM based on their Discord role and voice channel presence.
- Admin control using a specified Discord role.
- Easy configuration via `config.js`.
- Lightweight and efficient.

## Installation

Follow these steps to set up the bot:

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/GaganNaagu/ng-vcwhitelist.git
   cd ng-vcwhitelist
   ```

2. **Configure the Bot**  
   Open `config.js` and set the required values:
   - `token`: Your Discord bot token.
   - `guildId`: The ID of the Discord server where the bot will operate.
   - `adminRoleId`: The ID of the Discord role with admin privileges.
   - `roleVoiceChannels`: A mapping of role IDs to voice channel IDs.

3. **Add the Bot to Your Server**  
   Ensure the bot has the necessary permissions to read voice channel activity and manage roles.

4. **Start the Bot**  
   Run the script by adding the following line to your FiveM `server.cfg`:
   ```cfg
   ensure ng-vcwhitelist
   ```

## Usage

- When a player joins a designated voice channel, the bot checks their role and grants whitelisting permissions in FiveM.
- Admins can override settings if needed.

## Dependencies

Ensure you have the following installed:

- A FiveM server
- A Discord bot with proper permissions
