import { buildIntroductionTemplate } from './introduction';

const embedTemplates = {
    introduction: buildIntroductionTemplate,
};

type EmbedTemplateNames = keyof typeof embedTemplates;
type EmbedTemplateParameters<T extends EmbedTemplateNames> = Parameters<
    typeof embedTemplates[T]
>[0];

export { embedTemplates, EmbedTemplateNames, EmbedTemplateParameters };
