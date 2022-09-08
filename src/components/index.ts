import { ModalSubmitFields } from 'discord.js';
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

export { createModalFromTemplate, extractModalFieldValues };
