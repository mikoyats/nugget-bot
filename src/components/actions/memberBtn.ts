import {
    ButtonBuilder,
    ComponentType,
    ButtonComponentData,
    ButtonStyle,
} from 'discord.js';

const customId = 'memberBtn';

const componentData: ButtonComponentData = {
    type: ComponentType.Button,
    customId: customId,
    label: 'FC Member',
    style: ButtonStyle.Primary,
};

const builder = new ButtonBuilder(componentData);

export { customId, componentData, builder };
