import { CommandInteraction } from 'discord.js';
import { Discord, Slash } from 'discordx';
import { createActionRowFromTemplates } from '../../components';

@Discord()
export class TestMemberLogging {
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
