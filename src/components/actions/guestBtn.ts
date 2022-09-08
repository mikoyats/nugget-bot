import {
    ButtonStyle,
    ButtonBuilder,
    ComponentType,
    ButtonComponentData,
} from 'discord.js';

const customId = 'guestBtn';

const componentData: ButtonComponentData = {
    type: ComponentType.Button,
    customId: customId,
    label: 'Guest',
    style: ButtonStyle.Primary,
};

const builder = new ButtonBuilder(componentData);

export { customId, componentData, builder };
