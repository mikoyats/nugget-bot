import { Guild } from 'discord.js';
import config from '../constants/config';
import { bot } from '../main';

let guild: Guild;

bot.on('ready', (client) => {
    const guildInstance = client.guilds.cache.get(config.guildId);
    if (!guildInstance) throw Error('Guild not found');
    guild = guildInstance;
});

export { guild };
