const exceptionList = {};

module.exports = {
    /**
     * checkWhitelistStatus
     * Checks the whitelist status for users based on their Discord roles and voice channel presence
     */
    checkWhitelistStatus: async () => {
        // Get active players in the FiveM server
        const players = getPlayers(); // Assuming getPlayers() retrieves active players

        // Loop through each player
        for (const player of players) {
            // Get the Discord ID associated with the player
            const discordId = getPlayerDiscordId(player); // Assuming GetPlayerIdentifierByType() takes player and identifier type
            // Fetch the member using the Discord ID
            const member = await fetchDiscordMember(discordId);
            // If member is found
            if (member) {
                let isWhitelisted = false;
                let isAdmin = false; // Flag to check if the user is an admin
                let isExceptionuser = false; // Flag to check if the user is an admin

                // Check if the member is an admin
                if (isAdminFunc(member)) {
                    isAdmin = true;
                }

                if (isInExceptionList(discordId)) {
                    isExceptionuser = true;
                }else if (config.exceptionUserIds.includes(discordId)) {
                    isExceptionuser = true;
                }

                if (!isAdmin && !isExceptionuser) {
                    // Loop through each role-voice channel mapping
                    for (const [roleId, voiceChannels] of Object.entries(config.roleVoiceChannels)) {
                        // Check if the member has the role
                        if (member.roles.cache.has(roleId)) {
                            // Loop through each voice channel ID for the role
                            for (const voiceChannelId of voiceChannels) {
                                // Check if the member is in the voice channel
                                if (member.voice && member.voice.channel) {
                                    if (member.voice.channel.id === voiceChannelId) {
                                        console.log(`${member.user.tag} is whitelisted in voice channel.`);
                                        isWhitelisted = true;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    isWhitelisted = true;
                }

                // Trigger events based on whitelist status
                if (isWhitelisted) {
                    emitNet("ng-vc:togglefreeze", player, true);
                } else {
                    emitNet("ng-vc:togglefreeze", player, false);
                }
            }
        }
    },

    // Exceptioon Commands

    grantException: async (message, userId, duration) => {
        // Check if the user executing the command is an admin
        if (!isAdminFunc(message.member)) {
            return message.channel.send("You don't have permission to use this command.");
        }

        // Fetch the member using the provided user ID
        const member = await fetchDiscordMember(userId);
        if (!member) {
            return message.channel.send("User not found.");
        }

        // Grant exception by adding them to the exception list
        addToExceptionList(member, duration);

        message.channel.send(`Exception granted to ${member.user.tag} for ${duration} seconds.`);
    },
};

// Function to fetch Discord member using Discord ID
async function fetchDiscordMember(discordId) {
    const guild = client.guilds.resolve(config.guildId); // Replace guildId with your actual guild ID
    if (guild) {
        // Fetch the user using their Discord ID
        const member = guild.members.resolve(discordId);
        return member;
    } else {
        console.error("Guild not found.");
        return null;
    }
}

const getPlayerIdentifiers = (id) => {
    const ids = {};
    for (let i = 0; i < GetNumPlayerIdentifiers(id); i++) {
        const identifier = GetPlayerIdentifier(id, i).split(":");
        ids[identifier[0]] = identifier[1];
    }
    return ids;
};

const getPlayerDiscordId = (id) => {
    const ids = getPlayerIdentifiers(id);
    return ids["discord"] || false;
};

on("playerConnecting", async (name, setKickReason, deferrals) => {
    const player = source;
    deferrals.defer();
    deferrals.update(`Welcome, ${GetPlayerName(player)}. Checking your Discord voice channel connection state.`);
    const discordID = getPlayerDiscordId(player);
    const member = await fetchDiscordMember(discordID);
    if (member) {
        let isWhitelisted = false;
        let isAdmin = false; // Flag to check if the user is an admin
        let isExceptionuser = false; // Flag to check if the user is an exception

        if (isInExceptionList(discordID)) {
            isExceptionuser = true;
        }else if (config.exceptionUserIds.includes(discordID)) {
            isExceptionuser = true;
        }


        // Check if the member is an admin
        if (isAdminFunc(member)) {
            isAdmin = true;
        }

        if (!isAdmin && !isExceptionuser) {
            for (const [roleId, voiceChannels] of Object.entries(config.roleVoiceChannels)) {
                // Check if the member has the role
                if (member.roles.cache.has(roleId)) {
                    // Loop through each voice channel ID for the role
                    for (const voiceChannelId of voiceChannels) {
                        // Check if the member is in the voice channel
                        if (member.voice && member.voice.channel) {
                            if (member.voice.channel.id === voiceChannelId) {
                                console.log(`${member.user.tag} is whitelisted in voice channel.`);
                                isWhitelisted = true;
                            }
                        }
                    }
                }
            }
        } else {
            // Admins are always whitelisted
            isWhitelisted = true;
        }
        // Trigger events based on whitelist status
        if (isWhitelisted) {
            deferrals.done()
        } else {
            deferrals.done("Join SIRP Discord VC According to Your Role");
        }
    } else {
        deferrals.done("Join SIRP Discord Server");
    }
});


// Exception



// Function to check if a member is an admin
function isAdminFunc(member) {
    // Check if the member has the admin role
    return member.roles.cache.has(config.adminRoleId);
}

// Function to add a member to the exception list
// Define a global object to store exceptions


// Function to add a member to the exception list
function addToExceptionList(member, duration) {
    // Calculate the expiration time based on the current time and duration
    const expirationTime = Date.now() + (duration * 1000); // Convert seconds to milliseconds

    // Add the member to the exception list with the expiration time
    exceptionList[member.id] = expirationTime;

    console.log(`Grant exception to ${member.user.tag} for ${duration} seconds.`);
    // You can add code here to handle storing exceptions in your application
}

// Function to check if a user is in the exception list
function isInExceptionList(userId) {
    // Check if the user ID exists in the exception list and if the exception has not expired
    return exceptionList.hasOwnProperty(userId) && exceptionList[userId] > Date.now();
}

// Function to remove expired exceptions from the list
function removeExpiredExceptions() {
    for (const userId in exceptionList) {
        if (exceptionList.hasOwnProperty(userId) && exceptionList[userId] <= Date.now()) {
            delete exceptionList[userId];
        }
    }
}

// Periodically check for and remove expired exceptions (e.g., every hour)
setInterval(removeExpiredExceptions, 3600000); // 3600000 milliseconds = 1 hour
