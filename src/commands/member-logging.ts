import {
    ChannelType,
    ButtonInteraction,
    CommandInteraction,
    ModalSubmitInteraction,
} from 'discord.js';
import { ButtonComponent, Discord, ModalComponent, Slash } from 'discordx';

// Services
import { addRole } from '../services/roleService';
import { findChannel } from '../services/channelService';
import { changeNickname } from '../services/memberService';
import { addGuest, addMember } from '../services/userService';

// Utils
import { buildEmbedTemplate } from '../embeds';
import {
    createActionRowFromTemplates,
    createModalFromTemplate,
    extractModalFieldValues,
} from '../components';
import { memberRegistration, guestRegistration } from '../components/modals';
import { guestBtn, memberBtn } from '../components/actions';

// Types
import { GeneralRoles } from '../types/Role';

const { customId: memberRegistrationModalID } = memberRegistration;
const { customId: guestRegistrationModalID } = guestRegistration;
const { customId: memberBtnID } = memberBtn;
const { customId: guestBtnID } = guestBtn;

@Discord()
export class MemberLogging {
    @ButtonComponent({ id: memberBtnID })
    async handleMember(interaction: ButtonInteraction): Promise<unknown> {
        const modal = createModalFromTemplate(memberRegistrationModalID);

        await interaction.showModal(modal);

        return;
    }

    @ModalComponent({ id: memberRegistrationModalID })
    async handleSubmitMember(interaction: ModalSubmitInteraction) {
        await interaction.deferReply();
        const { user, fields, message } = interaction;

        const { name, source, timezone, interests, introduction } =
            extractModalFieldValues(memberRegistrationModalID, fields);

        if (!interaction.user) throw Error('Member not found');

        const originalInteraction = await message?.fetch();

        originalInteraction?.edit({
            content: "You're now registered!",
            components: [],
        });

        await addMember(user.id, {
            name,
            source,
            timezone,
            interests,
            introduction,
        });

        await addRole(user.id, GeneralRoles.NUGGETS);

        await changeNickname(user.id, fields.getTextInputValue('name'));

        const embed = await buildEmbedTemplate('introduction', {
            user,
            name,
            source,
            timezone,
            interests,
            introduction,
        });

        const channel = await findChannel(
            'introduction',
            ChannelType.GuildText
        );

        await interaction.editReply({
            content:
                "Thanks for answering! Don't be shy and hang out with your new FC :kiss:",
        });

        const channelMessage = await channel.send({
            content: `Meet the new addition to the nugget box! ${user}`,
            embeds: [embed],
        });

        await channelMessage.startThread({
            name: `Get to know ${name}!`,
        });
    }

    @ButtonComponent({ id: guestBtnID })
    async handleGuest(interaction: ButtonInteraction): Promise<unknown> {
        const modal = createModalFromTemplate(guestRegistrationModalID);

        await interaction.showModal(modal);

        return;
    }

    @ModalComponent({ id: guestRegistrationModalID })
    async handleSubmitGuest(interaction: ModalSubmitInteraction) {
        await interaction.deferReply();
        const { user, fields, message } = interaction;

        const { referrer } = extractModalFieldValues(
            guestRegistrationModalID,
            fields
        );

        const originalInteraction = await message?.fetch();

        originalInteraction?.edit({
            content: "You're now registered!",
            components: [],
        });

        await addGuest(user.id, {
            referrer,
        });

        await addRole(user.id, GeneralRoles.GUEST);

        await interaction.editReply({
            content: 'Thanks for answering!',
        });
    }

    @Slash({ description: 'tests member interview', name: 'interview' })
    async myRoles(interaction: CommandInteraction): Promise<unknown> {
        await interaction.deferReply({ ephemeral: true });

        const memberTypeBtns = createActionRowFromTemplates([
            'memberBtn',
            'guestBtn',
        ]);

        await interaction.user.send({
            isInteraction: true,
            content:
                'Hey sexy! :wink: \nI just wanna ask, are you a Member or a Guest?',
            components: [memberTypeBtns],
        });

        // send it
        await interaction.editReply({
            content: 'Sent',
        });
        return;
    }
}
