import * as memberRegistration from './memberRegistration';
import * as guestRegistration from './guestRegistration';

const modalComponents = {
    [memberRegistration.customId]: memberRegistration.create,
    [guestRegistration.customId]: guestRegistration.create,
};

const modalComponentInputs = {
    [memberRegistration.customId]: memberRegistration.fieldCustomIds,
    [guestRegistration.customId]: guestRegistration.fieldCustomIds,
};

type ModalComponentNames = keyof typeof modalComponents;
type ModalComponentParameters<T extends ModalComponentNames> = Parameters<
    typeof modalComponents[T]
>[0];
type ModalComponentFields<T extends ModalComponentNames> =
    typeof modalComponentInputs[T];

export {
    modalComponents,
    modalComponentInputs,
    ModalComponentNames,
    ModalComponentParameters,
    ModalComponentFields,
    // Components
    memberRegistration,
    guestRegistration,
};
