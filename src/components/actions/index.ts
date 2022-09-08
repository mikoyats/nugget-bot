import * as memberBtn from './memberBtn';
import * as guestBtn from './guestBtn';

const actionComponents = {
    guestBtn,
    memberBtn,
};

type ActionComponentNames = keyof typeof actionComponents;

export {
    actionComponents,
    ActionComponentNames,
    // Components
    memberBtn,
    guestBtn,
};
