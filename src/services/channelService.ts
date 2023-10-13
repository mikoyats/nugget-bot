import {
    GuildBasedChannel,
    BaseMessageOptions,
    MessagePayload,
} from 'discord.js';
import { GuildBasedChannels } from '../types/Channel';
import { guild } from './guildService';

const getChannel = (channelId: string): GuildBasedChannel => {
    const channel = guild.channels.cache.get(channelId);

    if (!channel) throw Error('Channel not found');

    return channel;
};

const findChannel = <T extends GuildBasedChannel['type']>(
    name: string,
    type?: T
): GuildBasedChannels<T> => {
    const channel = guild.channels.cache.find((channel) => {
        const channelNameExists = channel.name === name;

        return type
            ? channelNameExists && channel.type === type
            : channelNameExists;
    });

    if (!channel) throw Error('Channel not found');

    return channel as GuildBasedChannels<T>;
};

const sendChannelMessage = async (
    name: string,
    message: string | MessagePayload | BaseMessageOptions
) => {
    const channel = findChannel(name);

    if (channel.isTextBased()) {
        return await channel.send(message);
    } else {
        throw Error('Channel is not text based');
    }
};

export { getChannel, findChannel, sendChannelMessage };
