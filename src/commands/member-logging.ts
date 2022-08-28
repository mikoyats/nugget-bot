import {
    ButtonStyle,
    ModalBuilder,
    ButtonBuilder,
    TextInputStyle,
    TextInputBuilder,
    ActionRowBuilder,
    ButtonInteraction,
    CommandInteraction,
    ModalSubmitInteraction,
    ModalActionRowComponentBuilder,
    MessageActionRowComponentBuilder,
} from 'discord.js';
import { ButtonComponent, Discord, ModalComponent, Slash } from 'discordx';
import { addRole } from '../services/roleService';
import { addGuest, addMember } from '../services/userService';
import { GeneralRoles } from '../types/Role';

@Discord()
export class MemberLogging {
    @ButtonComponent({ id: 'member' })
    async handleMember(interaction: ButtonInteraction): Promise<unknown> {
        const input1 = new TextInputBuilder()
            .setCustomId('name')
            .setLabel('What is your name in FFXIV?')
            .setPlaceholder('First Last')
            .setStyle(TextInputStyle.Short)
            .setRequired();

        const input2 = new TextInputBuilder()
            .setCustomId('source')
            .setLabel('How did you know about the FC?')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired();

        const input3 = new TextInputBuilder()
            .setCustomId('timezone')
            .setLabel('What is your timezone?')
            .setPlaceholder('For example, "GMT+8"')
            .setStyle(TextInputStyle.Short)
            .setRequired();

        const input4 = new TextInputBuilder()
            .setCustomId('interests')
            .setLabel('Any interests within the game?')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired();

        const input5 = new TextInputBuilder()
            .setCustomId('introduction')
            .setLabel('Can you give an introduction of yourself?')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired();

        const modal = new ModalBuilder()
            .setCustomId('memberRegistration')
            .setTitle('Member Registration')
            .addComponents(
                new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                    input1
                ),
                new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                    input2
                ),
                new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                    input3
                ),
                new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                    input4
                ),
                new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                    input5
                )
            );

        await interaction.showModal(modal);

        return;
    }

    @ModalComponent({ id: 'memberRegistration' })
    async handleSubmitMember(interaction: ModalSubmitInteraction) {
        const { user, fields, message } = interaction;

        if (!interaction.user) throw Error('Member not found');

        await message?.edit({
            content: "You're now registered!",
            components: [],
        });

        await addMember(user.id, {
            name: fields.getTextInputValue('name'),
            source: fields.getTextInputValue('source'),
            timezone: fields.getTextInputValue('timezone'),
            interests: fields.getTextInputValue('interests'),
            introduction: fields.getTextInputValue('introduction'),
        });

        await addRole(user.id, GeneralRoles.NUGGETS);

        await interaction.reply({
            content: 'Thanks for answering!',
        });
    }

    @ButtonComponent({ id: 'guest' })
    async handleGuest(interaction: ButtonInteraction): Promise<unknown> {
        const input1 = new TextInputBuilder()
            .setCustomId('referrer')
            .setLabel('Who invited you to the discord server?')
            .setStyle(TextInputStyle.Short)
            .setRequired();

        const modal = new ModalBuilder()
            .setCustomId('guestRegistration')
            .setTitle('Guest Registration')
            .addComponents(
                new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
                    input1
                )
            );

        await interaction.showModal(modal);

        return;
    }

    @ModalComponent({ id: 'guestRegistration' })
    async handleSubmitGuest(interaction: ModalSubmitInteraction) {
        const { user, fields, message } = interaction;

        await message?.edit({
            content: "You're now registered!",
            components: [],
        });

        await addGuest(user.id, {
            referrer: fields.getTextInputValue('referrer'),
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
