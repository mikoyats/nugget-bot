import { ModalSubmitFields } from 'discord.js';
import {
    modalComponents,
    modalComponentInputs,
    ModalComponentNames,
    ModalComponentParameters,
    ModalComponentFields,
} from './modals';

const components = {
    modal: modalComponents,
};

const createComponentFromTemplate = <T extends ModalComponentNames>(
    type: keyof typeof components,
    name: ModalComponentNames,
    params?: ModalComponentParameters<T>
) => {
    const componentBuilder = components[type][name];

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

export { createComponentFromTemplate, extractModalFieldValues };
