import {
    ModalBuilder,
    ComponentType,
    TextInputStyle,
    ActionRowBuilder,
    TextInputBuilder,
    ModalComponentData,
    TextInputComponentData,
    ModalActionRowComponentBuilder,
} from 'discord.js';

const customId = 'guestRegistration';
const fieldCustomIds = {
    referrer: 'referrer',
};

const modalData: Partial<ModalComponentData> = {
    title: 'Guest Registration',
    customId: customId,
};

const modalInputs: TextInputComponentData[] = [
    {
        customId: fieldCustomIds.referrer,
        label: 'Who invited you to the discord server?',
        style: TextInputStyle.Short,
        type: ComponentType.TextInput,
        required: true,
    },
];

const create = () => {
    const inputs = modalInputs.map((input) => {
        const textInput = new TextInputBuilder(input);
        return new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
            textInput
        );
    });

    const modal = new ModalBuilder(modalData).addComponents(inputs);

    return modal;
};

export { customId, fieldCustomIds, modalData, modalInputs, create };
