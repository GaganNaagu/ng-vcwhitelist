# **ng-vcwhitelist**  

**ng-vcwhitelist** is a FiveM Discord bot designed to enforce a structured roleplay environment by ensuring players sit in the correct voice channels before joining the server. This system prevents excessive **Discord RP**, promotes in-game immersion, and ensures players remain in their designated voice channels.  

## 🎯 **Key Features**  

- 🛑 **Whitelist Enforcement**: Players must be in the correct VC to be allowed into the server.  
- 🔄 **Role-Based VC Access**: Different roles have different VC permissions.  
- ❄️ **Anti-Discord RP Mechanism**:  
  - If a player **leaves the required VC after joining the game**, their **game will freeze**.  
  - The game **unfreezes when they rejoin** the correct VC.  
  - This prevents players from using Discord RP to bypass in-game interactions.  

---

## 🔥 **How It Works**  

The bot enforces the following rules:  

- **Whitelist Players**: Must sit in a **designated whitelist voice channel** before joining the server.  
- **Police Department (PD) Players**:  
  - Can sit in **both the whitelist VC and an exclusive PD VC**.  
  - If they leave all designated VCs while in-game, their game **freezes** until they return.  
- **Other Roles (EMS, Staff, etc.)**: Can be configured similarly to enforce VC restrictions.  

---

## 🛠 **Installation**  

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/GaganNaagu/ng-vcwhitelist.git
   cd ng-vcwhitelist
   ```

2. **Edit Configuration**  
   Open `config.js` and update the following:  

   - `token`: Your **Discord bot token**.  
   - `guildId`: The **Discord server ID** where the bot will operate.  
   - `adminRoleId`: The **Discord role ID** for admins who can manage the bot.  
   - `roleVoiceChannels`: A mapping of role IDs to **designated voice channels**.  
   - `freezeCommand`: The **command to freeze/unfreeze players** if they leave their VC.  

3. **Ensure the Bot Has Permissions**  
   - `Read Messages` & `Send Messages`  
   - `Connect` & `Speak` in Voice Channels  
   - `Manage Roles`  
   - `Execute Commands` to **freeze/unfreeze players**  

4. **Start the Bot**  
   Add the following line to your **FiveM `server.cfg`**:  
   ```cfg
   ensure ng-vcwhitelist
   ```  

---

## 🔧 **Configuration Example**  

Your `config.js` should look like this:  

```js
module.exports = {
    token: "YOUR_DISCORD_BOT_TOKEN",
    guildId: "YOUR_DISCORD_SERVER_ID",
    adminRoleId: "ADMIN_ROLE_ID",
    roleVoiceChannels: {
        "WHITELIST_ROLE_ID": ["WHITELIST_VC_ID"],
        "PD_ROLE_ID": ["WHITELIST_VC_ID", "PD_VC_ID"],
        "EMS_ROLE_ID": ["WHITELIST_VC_ID", "EMS_VC_ID"]
    },
    freezeCommand: "freezePlayer"
};
```  

### **Game Freeze Mechanism**  
If a player **leaves their required VC**, the bot will run the `freezeCommand` on them until they return.  

---

## 🏗 **Planned Features**  

- ⏳ Support for **custom role hierarchies**  
- ⏳ **Webhook logs** to track whitelist attempts  
- ⏳ Option to **kick or auto-mute players** instead of freezing  

---
