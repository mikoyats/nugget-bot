import {
    ActionRowBuilder,
    ModalSubmitFields,
    MessageActionRowComponentBuilder,
} from 'discord.js';
import { actionComponents, ActionComponentNames } from './actions';
import {
    modalComponents,
    modalComponentInputs,
    ModalComponentNames,
    ModalComponentParameters,
    ModalComponentFields,
} from './modals';

const createModalFromTemplate = <T extends ModalComponentNames>(
    name: T,
    params?: ModalComponentParameters<T>
) => {
    const componentBuilder = modalComponents[name];

    const component = componentBuilder.call(params);

    return component;
};

const extractModalFieldValues = <T extends ModalComponentNames>(
    name: T,
    fields: ModalSubmitFields
) => {
    const modalInputs: ModalComponentFields<T> = modalComponentInputs[name];

    const modalFieldCustomIDs = Object.keys(modalInputs);

    const modalFieldValues = modalFieldCustomIDs.reduce(
        (acc, cur) => ({
            ...acc,
            [cur]: fields.getTextInputValue(cur),
        }),
        {} as Record<keyof typeof modalInputs, string>
    );

    return modalFieldValues;
};

const createActionRowFromTemplates = (
    components: [
        ActionComponentNames | MessageActionRowComponentBuilder,
        ...(ActionComponentNames | MessageActionRowComponentBuilder)[]
    ]
) => {
    const componentBuilders = components.map((component) => {
        if (typeof component === 'string') {
            return actionComponents[component].builder;
        } else {
            return component;
        }
    });

    const actionRow = new ActionRowBuilder<MessageActionRowComponentBuilder>({
        components: componentBuilders,
    });

    return actionRow;
};

export {
    createModalFromTemplate,
    extractModalFieldValues,
    createActionRowFromTemplates,
};
