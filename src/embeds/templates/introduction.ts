import { EmbedData, User } from 'discord.js';
import { getRole } from '../../services/roleService';
import { GeneralRoles } from '../../types/Role';

interface IntroductionTemplate {
    user: User;
    name: string;
    source: string;
    timezone: string;
    interests: string;
    introduction: string;
}

const buildIntroductionTemplate = async (
    params: IntroductionTemplate
): Promise<EmbedData> => {
    const { user, name, source, timezone, interests, introduction } = params;

    const nuggetRole = await getRole(GeneralRoles.NUGGETS);

    return {
        title: `${name}'s Introduction`,
        author: {
            name: `${user.username}#${user.discriminator}`,
            iconURL: user.avatarURL() || user.defaultAvatarURL,
        },
        color: user.accentColor || nuggetRole.color,
        thumbnail: { url: user.avatarURL() || user.defaultAvatarURL },
        fields: [
            {
                name: 'Introduction',
                value: introduction,
            },
            {
                name: 'Interests',
                value: interests,
            },
            {
                name: 'Source/Referrer',
                value: source,
                inline: true,
            },
            {
                name: 'Timezone',
                value: timezone,
                inline: true,
            },
        ],
    };
};

export { buildIntroductionTemplate, IntroductionTemplate };
