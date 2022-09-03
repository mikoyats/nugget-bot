import { EmbedBuilder, EmbedData } from 'discord.js';
import {
    embedTemplates,
    EmbedTemplateNames,
    EmbedTemplateParameters,
} from './templates';

const buildEmbedTemplate = async <EmbedTemplateName extends EmbedTemplateNames>(
    embedName: EmbedTemplateName,
    params: EmbedTemplateParameters<EmbedTemplateNames>
) => {
    const getEmbedTemplateData = embedTemplates[embedName];

    const embedData: EmbedData = await getEmbedTemplateData(params);

    const embedBuilder = new EmbedBuilder(embedData);

    return embedBuilder;
};

export { buildEmbedTemplate };
