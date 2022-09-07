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

const customId = 'memberRegistration';
const fieldCustomIds = {
    name: 'name',
    source: 'source',
    timezone: 'timezone',
    interests: 'interests',
    introduction: 'introduction',
};

const modalData: Partial<ModalComponentData> = {
    title: 'Member Registration',
    customId: customId,
};

const modalInputs: TextInputComponentData[] = [
    {
        customId: fieldCustomIds.name,
        label: 'What is your name in FFXIV?',
        placeholder: 'First Last',
        style: TextInputStyle.Short,
        type: ComponentType.TextInput,
        required: true,
    },
    {
        customId: fieldCustomIds.source,
        label: 'How did you know about the FC?',
        placeholder:
            'I saw it in the Community Finder. \nI got referred by Mrs. Nuggy.',
        style: TextInputStyle.Short,
        type: ComponentType.TextInput,
        required: true,
    },
    {
        customId: fieldCustomIds.timezone,
        label: 'What is your timezone?',
        placeholder: 'Example: GMT+8 (or can say country)',
        style: TextInputStyle.Short,
        type: ComponentType.TextInput,
        required: true,
    },
    {
        customId: fieldCustomIds.interests,
        label: 'Any interests within the game?',
        placeholder: 'Example: MSQ, RP-ing, Raiding, Crafting, etc.',
        style: TextInputStyle.Paragraph,
        type: ComponentType.TextInput,
        required: true,
    },
    {
        customId: fieldCustomIds.introduction,
        label: 'Can you give an introduction of yourself?',
        style: TextInputStyle.Paragraph,
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
