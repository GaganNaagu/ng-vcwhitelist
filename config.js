/**
 * Discord bot configuration
 * @typedef {Object} Config
 * @property {string} token - Discord bot token
 * @property {boolean} timeScheduleEnabled - Whether to enable time-based scheduling
 * @property {string} guildId - Discord guild ID
 * @property {string} adminRoleId - Discord role ID for admins
 * @property {Object<string, string[]>} roleVoiceChannels - Mapping of role IDs to voice channel IDs
 * @property {string[]} exceptionUserIds - List of user IDs to exempt from whitelisting
 */
module.exports = {
    token: 'BOTTOKENHERE', // Discord bot token (keep it secret)
    timeScheduleEnabled: false, // Whether to enable time-based scheduling  (true/false)
    guildId: 'SERVERGUILDID', // Discord guild ID (server ID)
    adminRoleId: 'ADMINROLEID', // Discord role ID for admins (they are always whitelisted)
    roleVoiceChannels: {
        'ROLEID': ['VOICECHANNELID', 'VOICECHANNELID', 'VOICECHANNELID', 'VOICECHANNELID', 'VOICECHANNELID'],
    },
    exceptionUserIds: [
        "USERIDHERE",
        "USERIDHERE",
    ],
};

