const { Client } = require('discord.js');
const client = new Client;
const { updatePlayerCount } = require("./utils/")
const { checkWhitelistStatus } = require("./utils/")
const { grantException } = require("./utils/")
global.config = require("./config")

// Specify the start time and end time in hours, minutes, and seconds (24-hour format)
const startTimeHours = 19; // 7 PM
const startTimeMinutes = 43; // 12 minutes
const startTimeSeconds = 0; // 0 seconds

const endTimeHours = 19; // 7 PM
const endTimeMinutes = 44; // 13 minutes
const endTimeSeconds = 0; // 0 seconds

client.on('ready', async () => {
    console.log(`Discord Bot logged in as ${client.user.tag}`);

    // Calculate the time until the specified start time
    const now = new Date();
    const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), startTimeHours, startTimeMinutes, startTimeSeconds);
    let timeUntilStart = startTime - now;


    if (timeUntilStart < 0) {
        // If the specified start time has already passed today, add 1 day to the time
        timeUntilStart += 24 * 60 * 60 * 1000; // 24 hours in milliseconds
    }
    if (config.timeScheduleEnabled) {
    // Wait until the specified start time
        setTimeout(async () => {
            // Check if time schedule is enabled

                // Run checkWhitelistStatus every 2 seconds until the specified end time
                const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endTimeHours, endTimeMinutes, endTimeSeconds);
                const duration = endTime - now;

                if (duration > 0) {
                    const intervalId = setInterval(async () => {
                        await checkWhitelistStatus();
                        const now = new Date();
                        if (now >= endTime) {
                            // End the interval if the current time exceeds the end time
                            clearInterval(intervalId);
                            const players = getPlayers();
                            for (const player of players) {
                                emitNet("ng-vc:togglefreeze", player, true);
                            }
                        }
                    }, 2 * 1000); // 2 seconds converted to milliseconds
                }
        }, timeUntilStart);
    } else {
        // Run checkWhitelistStatus every 2 seconds if time schedule is disabled
        setInterval(async () => {
            await checkWhitelistStatus();
        }, 2 * 1000); // 2 seconds converted to milliseconds
    }
});

client.on('message', async (message) => {
    // Check if the message starts with the prefix and the author is not a bot
    if (!message.content.startsWith('!') || message.author.bot) return;

    // Extract the command and arguments from the message content
    const args = message.content.slice(1).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    // Check which command was issued
    if (command === 'grantexception') {
        // Usage: !grantexception <user_id> <duration_seconds>
        const userId = args[0];
        const duration = parseInt(args[1]);

        // Check if both user ID and duration are provided
        if (!userId || isNaN(duration)) {
            return message.channel.send("Invalid command usage. Usage: !grantexception <user_id> <duration_seconds>");
        }

        // Call the grantException command
        grantException(message, userId, duration);
    }
});

client.login(config.token);
