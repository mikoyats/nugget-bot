import { guild } from './guildService';
import { AvailableRoles } from '../types/Role';

const getRole = async (role: AvailableRoles) => {
    const roleInstance = guild.roles.cache.find((item) => item.name === role);
    if (!roleInstance) throw Error('Role not found');
    return roleInstance;
};

const addRole = async (
    userId: string,
    roles: AvailableRoles | AvailableRoles[]
) => {
    const guildMember = await guild.members.fetch(userId);
    if (!guildMember) throw Error('Member not found');

    if (Array.isArray(roles)) {
        for (const role of roles) {
            const roleInstance = await getRole(role);
            await guildMember.roles.add(roleInstance);
        }
    } else {
        const roleInstance = await getRole(roles);
        await guildMember.roles.add(roleInstance);
    }
};

export { getRole, addRole };
