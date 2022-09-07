import {
    ChannelType,
    ButtonStyle,
    ButtonBuilder,
    ActionRowBuilder,
    ButtonInteraction,
    CommandInteraction,
    ModalSubmitInteraction,
    MessageActionRowComponentBuilder,
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
    createComponentFromTemplate,
    extractModalFieldValues,
} from '../components';
import { memberRegistration, guestRegistration } from '../components/modals';

// Types
import { GeneralRoles } from '../types/Role';

const { customId: memberRegistrationModalID } = memberRegistration;
const { customId: guestRegistrationModalID } = guestRegistration;

@Discord()
export class MemberLogging {
    @ButtonComponent({ id: 'member' })
    async handleMember(interaction: ButtonInteraction): Promise<unknown> {
        const modal = createComponentFromTemplate(
            'modal',
            memberRegistrationModalID
        );

        await interaction.showModal(modal);

        return;
    }

    @ModalComponent({ id: memberRegistrationModalID })
    async handleSubmitMember(interaction: ModalSubmitInteraction) {
        const { user, fields, message } = interaction;

        const { name, source, timezone, interests, introduction } =
            extractModalFieldValues(memberRegistrationModalID, fields);

        if (!interaction.user) throw Error('Member not found');

        await message?.edit({
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

        await interaction.reply({
            content: 'Thanks for answering!',
        });

        const channelMessage = await channel.send({
            content: `Meet the new addition to the nugget box! ${user}`,
            embeds: [embed],
        });

        await channelMessage.startThread({
            name: `Get to know ${name}!`,
        });
    }

    @ButtonComponent({ id: 'guest' })
    async handleGuest(interaction: ButtonInteraction): Promise<unknown> {
        const modal = createComponentFromTemplate(
            'modal',
            guestRegistrationModalID
        );

        await interaction.showModal(modal);

        return;
    }

    @ModalComponent({ id: guestRegistrationModalID })
    async handleSubmitGuest(interaction: ModalSubmitInteraction) {
        const { user, fields, message } = interaction;

        const { referrer } = extractModalFieldValues(
            guestRegistrationModalID,
            fields
        );

        await message?.edit({
            content: "You're now registered!",
            components: [],
        });

        await addGuest(user.id, {
            referrer,
        });

        await addRole(user.id, GeneralRoles.GUEST);

        await interaction.reply({
            content: 'Thanks for answering!',
        });
    }

    @Slash({ description: 'tests member interview', name: 'interview' })
    async myRoles(interaction: CommandInteraction): Promise<unknown> {
        await interaction.deferReply();

        // create menu for roles
        const memberBtn = new ButtonBuilder()
            .setCustomId('member')
            .setLabel('Member')
            .setStyle(ButtonStyle.Primary);

        const guestBtn = new ButtonBuilder()
            .setCustomId('guest')
            .setLabel('Guest')
            .setStyle(ButtonStyle.Secondary);

        // create a row for message actions
        const buttonRow =
            new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
                memberBtn,
                guestBtn
            );

        await interaction.user.send({
            isInteraction: true,
            content: 'Are you a Member or a Guest?',
            components: [buttonRow],
        });

        // send it
        interaction.editReply({
            content: 'Sent',
        });
        return;
    }
}
