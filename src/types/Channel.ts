import { GuildBasedChannel } from 'discord.js';

type GuildBasedChannelTypes = GuildBasedChannel['type'];

type GuildBasedChannels<T = GuildBasedChannelTypes> = Extract<
    GuildBasedChannel,
    { type: T }
>;

export { GuildBasedChannels, GuildBasedChannelTypes };
