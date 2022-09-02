import { GuildMember } from 'discord.js';
import { guild } from './guildService';

const getMember = (userId: string): GuildMember => {
    const member = guild.members.cache.find((user) => user.id === userId);

    if (!member) throw Error('Member not found');

    return member;
};

const changeNickname = (userId: string, name: string, reason?: string) => {
    const member = getMember(userId);

    member.setNickname(name, reason);
};

export { getMember, changeNickname };
